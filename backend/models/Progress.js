const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  lessonsCompleted: [{
    lessonId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    completedAt: {
      type: Date,
      default: Date.now
    },
    timeSpent: {
      type: Number, // in minutes
      default: 0
    }
  }],
  currentLesson: {
    type: mongoose.Schema.Types.ObjectId,
    default: null
  },
  progressPercentage: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  totalTimeSpent: {
    type: Number, // in minutes
    default: 0
  },
  lastAccessed: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['enrolled', 'in-progress', 'completed', 'paused'],
    default: 'enrolled'
  },
  completedAt: {
    type: Date
  },
  certificateIssued: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Compound index to ensure one progress record per user per course
progressSchema.index({ user: 1, course: 1 }, { unique: true });

// Update the updatedAt field before saving
progressSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  
  // Update progress percentage
  if (this.course) {
    // This will be calculated when course is populated
    this.lastAccessed = new Date();
  }
  
  next();
});

// Method to calculate progress percentage
progressSchema.methods.calculateProgress = async function() {
  const Course = mongoose.model('Course');
  const course = await Course.findById(this.course);
  
  if (course && course.lessons.length > 0) {
    const completedLessons = this.lessonsCompleted.length;
    const totalLessons = course.lessons.length;
    this.progressPercentage = Math.round((completedLessons / totalLessons) * 100);
    
    // Update status based on progress
    if (this.progressPercentage === 100) {
      this.status = 'completed';
      this.completedAt = new Date();
    } else if (this.progressPercentage > 0) {
      this.status = 'in-progress';
    }
  }
  
  return this.progressPercentage;
};

// Method to mark lesson as completed
progressSchema.methods.markLessonCompleted = function(lessonId, timeSpent = 0) {
  // Check if lesson is already completed
  const alreadyCompleted = this.lessonsCompleted.some(
    lesson => lesson.lessonId.toString() === lessonId.toString()
  );
  
  if (!alreadyCompleted) {
    this.lessonsCompleted.push({
      lessonId: lessonId,
      completedAt: new Date(),
      timeSpent: timeSpent
    });
    
    this.totalTimeSpent += timeSpent;
    this.lastAccessed = new Date();
  }
  
  return this;
};

// Method to get completed lessons count
progressSchema.methods.getCompletedLessonsCount = function() {
  return this.lessonsCompleted.length;
};

// Static method to get user's progress summary
progressSchema.statics.getUserProgressSummary = async function(userId) {
  const progressRecords = await this.find({ user: userId })
    .populate('course', 'title thumbnail instructor duration level category')
    .sort({ lastAccessed: -1 });
  
  const summary = {
    totalCourses: progressRecords.length,
    completedCourses: progressRecords.filter(p => p.status === 'completed').length,
    inProgressCourses: progressRecords.filter(p => p.status === 'in-progress').length,
    totalTimeSpent: progressRecords.reduce((total, p) => total + p.totalTimeSpent, 0),
    courses: progressRecords
  };
  
  return summary;
};

module.exports = mongoose.model('Progress', progressSchema);
