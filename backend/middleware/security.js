const rateLimit = require('rate-limiter-flexible');
const helmet = require('helmet');

// Rate limiting configuration
const createRateLimiter = (windowMs, maxRequests, message) => {
  return new rateLimit.RateLimiterMemory({
    keyPrefix: 'middleware',
    points: maxRequests,
    duration: Math.floor(windowMs / 1000), // Convert to seconds
  });
};

// General API rate limiter
const generalLimiter = createRateLimiter(
  parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 900000, // 15 minutes
  parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  'Too many requests from this IP, please try again later.'
);

// Auth endpoints rate limiter (more restrictive)
const authLimiter = createRateLimiter(
  900000, // 15 minutes
  5, // 5 requests per 15 minutes
  'Too many authentication attempts, please try again later.'
);

// Rate limiting middleware
const rateLimitMiddleware = (limiter) => {
  return async (req, res, next) => {
    try {
      const key = req.ip || req.connection.remoteAddress;
      const result = await limiter.consume(key);
      
      res.set({
        'X-RateLimit-Limit': limiter.points,
        'X-RateLimit-Remaining': result.remainingPoints,
        'X-RateLimit-Reset': new Date(Date.now() + result.msBeforeNext)
      });
      
      next();
    } catch (rejRes) {
      res.status(429).json({
        success: false,
        message: rejRes.message || 'Too many requests, please try again later.',
        retryAfter: Math.round(rejRes.msBeforeNext / 1000) || 1
      });
    }
  };
};

// Security headers middleware
const securityHeaders = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'"],
      fontSrc: ["'self'"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"],
    },
  },
  crossOriginEmbedderPolicy: false,
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }
});

// CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : ['http://localhost:3000'];
    
    // Allow requests with no origin (mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  exposedHeaders: ['X-RateLimit-Limit', 'X-RateLimit-Remaining', 'X-RateLimit-Reset']
};

// Request sanitization middleware
const sanitizeInput = (req, res, next) => {
  // Remove any potential XSS attempts
  const sanitize = (obj) => {
    if (typeof obj === 'string') {
      return obj.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    }
    if (typeof obj === 'object' && obj !== null) {
      for (let key in obj) {
        obj[key] = sanitize(obj[key]);
      }
    }
    return obj;
  };

  if (req.body) {
    req.body = sanitize(req.body);
  }
  if (req.query) {
    req.query = sanitize(req.query);
  }
  if (req.params) {
    req.params = sanitize(req.params);
  }

  next();
};

// Request logging middleware
const requestLogger = (req, res, next) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    const logData = {
      method: req.method,
      url: req.url,
      status: res.statusCode,
      duration: `${duration}ms`,
      ip: req.ip || req.connection.remoteAddress,
      userAgent: req.get('User-Agent'),
      timestamp: new Date().toISOString()
    };
    
    console.log(`${logData.method} ${logData.url} - ${logData.status} - ${logData.duration} - ${logData.ip}`);
  });
  
  next();
};

module.exports = {
  rateLimitMiddleware,
  generalLimiter,
  authLimiter,
  securityHeaders,
  corsOptions,
  sanitizeInput,
  requestLogger
};
