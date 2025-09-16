const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a course title'],
    trim: true,
    maxlength: [100, 'Course title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please provide a course description'],
    maxlength: [1000, 'Description cannot be more than 1000 characters']
  },
  thumbnail: {
    type: String,
    default: ''
  },
  instructor: {
    type: String,
    required: [true, 'Please provide instructor name'],
    trim: true
  },
  duration: {
    type: Number, // in hours
    required: [true, 'Please provide course duration']
  },
  level: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    required: [true, 'Please provide course level']
  },
  category: {
    type: String,
    required: [true, 'Please provide course category'],
    trim: true
  },
  price: {
    type: Number,
    default: 0,
    min: [0, 'Price cannot be negative']
  },
  isPublished: {
    type: Boolean,
    default: false
  },
  lessons: [{
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    videoUrl: {
      type: String,
      default: ''
    },
    duration: {
      type: Number, // in minutes
      required: true
    },
    order: {
      type: Number,
      required: true
    },
    isFree: {
      type: Boolean,
      default: false
    }
  }],
  enrolledUsers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
courseSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Virtual for total lessons count
courseSchema.virtual('totalLessons').get(function() {
  return this.lessons.length;
});

// Virtual for total duration in minutes
courseSchema.virtual('totalDurationMinutes').get(function() {
  return this.lessons.reduce((total, lesson) => total + lesson.duration, 0);
});

// Ensure virtual fields are serialized
courseSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Course', courseSchema);
