'use client';

import { BookOpen, Users, Clock, Plus, CheckCircle, X } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Course {
  id: number | string;
  name: string;
  lecturer: string;
  students: number;
  duration: string;
  enrolled: boolean;
  progress?: number;
  description?: string;
}

const CoursesPage = () => {
  const router = useRouter();
  const [courses, setCourses] = useState<Course[]>([
    { 
      id: '1', 
      name: 'CHC50121 Diploma Early Childhood Education and Care', 
      lecturer: 'Chris Sadea', 
      students: 45, 
      duration: '12 weeks', 
      enrolled: true, 
      progress: 65,
      description: 'Comprehensive diploma program covering early childhood education and care principles, practices, and strategies. This course provides essential knowledge and skills for working with children in childcare settings.'
    },
    { 
      id: 2, 
      name: 'CHCECE045 - Foster Positive and Respectful Interactions', 
      lecturer: 'Chris Sadea', 
      students: 32, 
      duration: '8 weeks', 
      enrolled: true, 
      progress: 80,
      description: 'Learn strategies for fostering positive and respectful interactions with children. This unit covers behaviour support, communication techniques, and creating positive learning environments.'
    },
    { 
      id: 3, 
      name: 'CHCECE046 - Implement Strategies for Inclusion', 
      lecturer: 'Chris Sadea', 
      students: 28, 
      duration: '10 weeks', 
      enrolled: false,
      description: 'Develop skills to implement inclusive practices in early childhood settings. Learn to support all children, including those with diverse needs and backgrounds.'
    },
    { 
      id: 4, 
      name: 'CHCECE047 - Use Information About Children', 
      lecturer: 'Chris Sadea', 
      students: 35, 
      duration: '8 weeks', 
      enrolled: false,
      description: 'Learn how to gather, document, and use information about children to support their learning and development. Includes observation techniques and assessment methods.'
    },
    { 
      id: 5, 
      name: 'CHCECE048 - Plan and Implement Children\'s Education', 
      lecturer: 'Chris Sadea', 
      students: 40, 
      duration: '10 weeks', 
      enrolled: false,
      description: 'Develop skills in planning and implementing educational programs for children. Learn curriculum development, activity planning, and evaluation techniques.'
    },
    { 
      id: 6, 
      name: 'CHCECE049 - Embed Environmental Responsibility', 
      lecturer: 'Chris Sadea', 
      students: 30, 
      duration: '6 weeks', 
      enrolled: false,
      description: 'Learn how to embed environmental responsibility in early childhood programs. Includes sustainability practices and environmental education for children.'
    },
  ]);

  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEnroll = (courseId: number | string) => {
    setCourses((prev) =>
      prev.map((course) =>
        course.id === courseId
          ? { ...course, enrolled: true, progress: 0 }
          : course
      )
    );
    alert('Successfully enrolled in the course!');
  };

  const handleUnenroll = (courseId: number | string) => {
    if (confirm('Are you sure you want to unenroll from this course?')) {
      setCourses((prev) =>
        prev.map((course) =>
          course.id === courseId
            ? { ...course, enrolled: false, progress: undefined }
            : course
        )
      );
      alert('Successfully unenrolled from the course.');
    }
  };

  const handleViewDetails = (course: Course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  const enrolledCourses = courses.filter((c) => c.enrolled);
  const availableCourses = courses.filter((c) => !c.enrolled);

  return (
    <div className="space-y-4 lg:space-y-6 xl:space-y-8">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-1 lg:mb-2">Courses</h1>
        <p className="text-sm lg:text-base text-gray-600">Browse and enroll in available courses</p>
      </div>

      {/* Enrolled Courses */}
      {enrolledCourses.length > 0 && (
        <div>
          <h2 className="text-lg lg:text-xl font-bold text-gray-800 mb-4">My Enrolled Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
            {enrolledCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white/80 backdrop-blur-sm rounded-lg lg:rounded-xl p-4 lg:p-5 xl:p-6 shadow-lg border border-purple-200/50 hover:shadow-xl transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg lg:text-xl font-bold text-gray-800 mb-1">{course.name}</h3>
                    <p className="text-sm lg:text-base text-gray-600">By {course.lecturer}</p>
                  </div>
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                    Enrolled
                  </span>
                </div>
                <div className="space-y-2 text-xs lg:text-sm mb-4">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-gray-600" />
                    <span className="text-gray-600">{course.students} students</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-600" />
                    <span className="text-gray-600">{course.duration}</span>
                  </div>
                  {course.progress !== undefined && (
                    <div>
                      <div className="flex items-center justify-between text-xs lg:text-sm mb-1">
                        <span className="text-gray-600">Progress</span>
                        <span className="font-semibold text-gray-800">{course.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-blue-400 to-purple-500 h-2 rounded-full"
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => router.push(`/student/courses/${course.id}`)}
                    className="flex-1 bg-purple-100 text-purple-700 py-2.5 rounded-lg text-sm lg:text-base font-semibold hover:bg-purple-200 transition-all"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => handleUnenroll(course.id)}
                    className="px-4 py-2.5 bg-red-100 text-red-700 rounded-lg text-sm lg:text-base font-semibold hover:bg-red-200 transition-all"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Available Courses */}
      {availableCourses.length > 0 && (
        <div>
          <h2 className="text-lg lg:text-xl font-bold text-gray-800 mb-4">Available Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {availableCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white/80 backdrop-blur-sm rounded-lg lg:rounded-xl p-4 lg:p-5 xl:p-6 shadow-lg border border-purple-200/50 hover:shadow-xl transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg lg:text-xl font-bold text-gray-800 mb-1">{course.name}</h3>
                    <p className="text-sm lg:text-base text-gray-600">By {course.lecturer}</p>
                  </div>
                </div>
                <div className="space-y-2 text-xs lg:text-sm mb-4">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-gray-600" />
                    <span className="text-gray-600">{course.students} students enrolled</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-600" />
                    <span className="text-gray-600">{course.duration}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleViewDetails(course)}
                    className="flex-1 bg-blue-100 text-blue-700 py-2.5 rounded-lg text-sm lg:text-base font-semibold hover:bg-blue-200 transition-all"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => handleEnroll(course.id)}
                    className="flex-1 bg-gradient-to-r from-blue-400 to-purple-500 text-white py-2.5 rounded-lg text-sm lg:text-base font-semibold hover:from-blue-500 hover:to-purple-600 transition-all shadow-lg flex items-center justify-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Enroll
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Course Details Modal */}
      {isModalOpen && selectedCourse && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">{selectedCourse.name}</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Lecturer</h3>
                <p className="text-gray-600">{selectedCourse.lecturer}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Description</h3>
                <p className="text-gray-600">{selectedCourse.description || 'No description available.'}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Duration</h3>
                  <p className="text-gray-600">{selectedCourse.duration}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Students</h3>
                  <p className="text-gray-600">{selectedCourse.students} enrolled</p>
                </div>
              </div>
              {selectedCourse.enrolled && selectedCourse.progress !== undefined && (
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Your Progress</h3>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-600">Completion</span>
                    <span className="font-semibold text-gray-800">{selectedCourse.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-400 to-purple-500 h-2 rounded-full"
                      style={{ width: `${selectedCourse.progress}%` }}
                    />
                  </div>
                </div>
              )}
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-all"
                >
                  Close
                </button>
                {!selectedCourse.enrolled ? (
                  <button
                    onClick={() => {
                      handleEnroll(selectedCourse.id);
                      setIsModalOpen(false);
                    }}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-400 to-purple-500 text-white rounded-lg font-semibold hover:from-blue-500 hover:to-purple-600 transition-all"
                  >
                    Enroll Now
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setIsModalOpen(false);
                      router.push(`/student/courses/${selectedCourse.id}`);
                    }}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-400 to-purple-500 text-white rounded-lg font-semibold hover:from-blue-500 hover:to-purple-600 transition-all"
                  >
                    Continue Learning
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoursesPage;
