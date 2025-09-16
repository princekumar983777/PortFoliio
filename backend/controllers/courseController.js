const Course = require('../models/Course');
const Progress = require('../models/Progress');
const { protect, optionalAuth } = require('../middleware/auth');

// @desc    Get all courses
// @route   GET /api/courses
// @access  Public
const getCourses = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      category,
      level,
      search,
      sort = 'createdAt',
      order = 'desc'
    } = req.query;

    // Build filter object
    const filter = { isPublished: true };
    
    if (category) {
      filter.category = { $regex: category, $options: 'i' };
    }
    
    if (level) {
      filter.level = level;
    }
    
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { instructor: { $regex: search, $options: 'i' } }
      ];
    }

    // Build sort object
    const sortOrder = order === 'desc' ? -1 : 1;
    const sortObj = { [sort]: sortOrder };

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Execute query
    const courses = await Course.find(filter)
      .select('-lessons.videoUrl') // Exclude video URLs for listing
      .sort(sortObj)
      .skip(skip)
      .limit(parseInt(limit))
      .lean();

    const total = await Course.countDocuments(filter);

    res.json({
      success: true,
      data: {
        courses,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(total / parseInt(limit)),
          totalCourses: total,
          hasNext: skip + courses.length < total,
          hasPrev: parseInt(page) > 1
        }
      }
    });
  } catch (error) {
    console.error('Get courses error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching courses'
    });
  }
};

// @desc    Get single course
// @route   GET /api/courses/:id
// @access  Public
const getCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    if (!course.isPublished) {
      return res.status(404).json({
        success: false,
        message: 'Course not available'
      });
    }

    // If user is authenticated, check enrollment status
    let enrollmentStatus = null;
    if (req.user) {
      const progress = await Progress.findOne({
        user: req.user.id,
        course: course._id
      });
      
      if (progress) {
        enrollmentStatus = {
          isEnrolled: true,
          progressPercentage: progress.progressPercentage,
          status: progress.status,
          currentLesson: progress.currentLesson,
          lastAccessed: progress.lastAccessed
        };
      }
    }

    res.json({
      success: true,
      data: {
        course,
        enrollmentStatus
      }
    });
  } catch (error) {
    console.error('Get course error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching course'
    });
  }
};

// @desc    Enroll in course
// @route   POST /api/courses/:id/enroll
// @access  Private
const enrollInCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    if (!course.isPublished) {
      return res.status(400).json({
        success: false,
        message: 'Course is not available for enrollment'
      });
    }

    // Check if already enrolled
    const existingProgress = await Progress.findOne({
      user: req.user.id,
      course: course._id
    });

    if (existingProgress) {
      return res.status(400).json({
        success: false,
        message: 'You are already enrolled in this course'
      });
    }

    // Create progress record
    const progress = await Progress.create({
      user: req.user.id,
      course: course._id,
      status: 'enrolled'
    });

    // Add user to course's enrolled users
    course.enrolledUsers.push(req.user.id);
    await course.save();

    res.status(201).json({
      success: true,
      message: 'Successfully enrolled in course',
      data: {
        progress
      }
    });
  } catch (error) {
    console.error('Enroll course error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while enrolling in course'
    });
  }
};

// @desc    Get user's enrolled courses
// @route   GET /api/courses/my-courses
// @access  Private
const getMyCourses = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      status
    } = req.query;

    // Build filter
    const filter = { user: req.user.id };
    if (status) {
      filter.status = status;
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Get progress records with course details
    const progressRecords = await Progress.find(filter)
      .populate({
        path: 'course',
        select: 'title description thumbnail instructor duration level category price'
      })
      .sort({ lastAccessed: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Progress.countDocuments(filter);

    res.json({
      success: true,
      data: {
        courses: progressRecords,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(total / parseInt(limit)),
          totalCourses: total,
          hasNext: skip + progressRecords.length < total,
          hasPrev: parseInt(page) > 1
        }
      }
    });
  } catch (error) {
    console.error('Get my courses error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching your courses'
    });
  }
};

// @desc    Get course progress
// @route   GET /api/courses/:id/progress
// @access  Private
const getCourseProgress = async (req, res) => {
  try {
    const progress = await Progress.findOne({
      user: req.user.id,
      course: req.params.id
    }).populate('course', 'title lessons');

    if (!progress) {
      return res.status(404).json({
        success: false,
        message: 'Course progress not found. You may not be enrolled in this course.'
      });
    }

    // Calculate detailed progress
    await progress.calculateProgress();
    await progress.save();

    // Get course lessons for detailed progress
    const course = await Course.findById(req.params.id).select('lessons');
    
    const detailedProgress = {
      courseId: progress.course._id,
      courseTitle: progress.course.title,
      totalLessons: course.lessons.length,
      completedLessons: progress.lessonsCompleted.length,
      progressPercentage: progress.progressPercentage,
      totalTimeSpent: progress.totalTimeSpent,
      status: progress.status,
      currentLesson: progress.currentLesson,
      lastAccessed: progress.lastAccessed,
      completedAt: progress.completedAt,
      lessons: course.lessons.map(lesson => {
        const isCompleted = progress.lessonsCompleted.some(
          completed => completed.lessonId.toString() === lesson._id.toString()
        );
        
        return {
          _id: lesson._id,
          title: lesson.title,
          duration: lesson.duration,
          order: lesson.order,
          isCompleted,
          completedAt: isCompleted ? progress.lessonsCompleted.find(
            completed => completed.lessonId.toString() === lesson._id.toString()
          ).completedAt : null
        };
      })
    };

    res.json({
      success: true,
      data: {
        progress: detailedProgress
      }
    });
  } catch (error) {
    console.error('Get course progress error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching course progress'
    });
  }
};

// @desc    Update lesson progress
// @route   PUT /api/courses/:id/lessons/:lessonId/progress
// @access  Private
const updateLessonProgress = async (req, res) => {
  try {
    const { timeSpent = 0 } = req.body;

    const progress = await Progress.findOne({
      user: req.user.id,
      course: req.params.id
    });

    if (!progress) {
      return res.status(404).json({
        success: false,
        message: 'Course progress not found'
      });
    }

    // Mark lesson as completed
    progress.markLessonCompleted(req.params.lessonId, timeSpent);
    
    // Update current lesson to next one
    const course = await Course.findById(req.params.id);
    const currentLessonIndex = course.lessons.findIndex(
      lesson => lesson._id.toString() === req.params.lessonId.toString()
    );
    
    if (currentLessonIndex < course.lessons.length - 1) {
      progress.currentLesson = course.lessons[currentLessonIndex + 1]._id;
    } else {
      progress.currentLesson = null; // Course completed
    }

    // Calculate progress percentage
    await progress.calculateProgress();
    await progress.save();

    res.json({
      success: true,
      message: 'Lesson progress updated successfully',
      data: {
        progress: {
          progressPercentage: progress.progressPercentage,
          completedLessons: progress.lessonsCompleted.length,
          totalLessons: course.lessons.length,
          status: progress.status,
          currentLesson: progress.currentLesson
        }
      }
    });
  } catch (error) {
    console.error('Update lesson progress error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating lesson progress'
    });
  }
};

// @desc    Get user dashboard data
// @route   GET /api/courses/dashboard
// @access  Private
const getDashboard = async (req, res) => {
  try {
    // Get user's progress summary
    const progressSummary = await Progress.getUserProgressSummary(req.user.id);

    // Get recent courses (last 5)
    const recentCourses = await Progress.find({ user: req.user.id })
      .populate('course', 'title thumbnail instructor')
      .sort({ lastAccessed: -1 })
      .limit(5);

    // Get courses by status
    const coursesByStatus = {
      enrolled: await Progress.countDocuments({ user: req.user.id, status: 'enrolled' }),
      inProgress: await Progress.countDocuments({ user: req.user.id, status: 'in-progress' }),
      completed: await Progress.countDocuments({ user: req.user.id, status: 'completed' })
    };

    res.json({
      success: true,
      data: {
        summary: {
          totalCourses: progressSummary.totalCourses,
          completedCourses: progressSummary.completedCourses,
          inProgressCourses: progressSummary.inProgressCourses,
          totalTimeSpent: progressSummary.totalTimeSpent,
          coursesByStatus
        },
        recentCourses
      }
    });
  } catch (error) {
    console.error('Get dashboard error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching dashboard data'
    });
  }
};

module.exports = {
  getCourses,
  getCourse,
  enrollInCourse,
  getMyCourses,
  getCourseProgress,
  updateLessonProgress,
  getDashboard
};
