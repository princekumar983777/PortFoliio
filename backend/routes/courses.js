const express = require('express');
const router = express.Router();
const {
  getCourses,
  getCourse,
  enrollInCourse,
  getMyCourses,
  getCourseProgress,
  updateLessonProgress,
  getDashboard
} = require('../controllers/courseController');
const { protect, optionalAuth } = require('../middleware/auth');
const { validateObjectId, validateProgressUpdate } = require('../middleware/validation');

// Public routes
router.get('/', optionalAuth, getCourses);
router.get('/:id', optionalAuth, validateObjectId('id'), getCourse);

// Protected routes
router.use(protect); // All routes below this line are protected

// Dashboard and user courses
router.get('/dashboard', getDashboard);
router.get('/my-courses', getMyCourses);

// Course enrollment
router.post('/:id/enroll', validateObjectId('id'), enrollInCourse);

// Course progress
router.get('/:id/progress', validateObjectId('id'), getCourseProgress);
router.put('/:id/lessons/:lessonId/progress', 
  validateObjectId('id'), 
  validateObjectId('lessonId'),
  validateProgressUpdate,
  updateLessonProgress
);

module.exports = router;
