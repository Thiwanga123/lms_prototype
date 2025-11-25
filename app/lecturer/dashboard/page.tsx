'use client';

import { BookOpen, Users, FileText, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { useUser } from '../../context/UserContext';

const LecturerDashboard = () => {
  const { user } = useUser();

  const myCourses = [
    { id: 1, name: 'CHC50121 Diploma Early Childhood Education and Care', students: 45, assignments: 8, materials: 12, status: 'Active' },
    { id: 2, name: 'CHCECE045 - Foster Positive Interactions', students: 32, assignments: 6, materials: 10, status: 'Active' },
  ];

  const pendingGrading = [
    { id: 1, course: 'CHC50121 Diploma', assignment: 'Practice Assessment: Behaviour Observation', student: 'Sarah Johnson', submitted: '2 hours ago' },
    { id: 2, course: 'CHCECE045', assignment: 'Inclusion Plan Assignment', student: 'Michael Brown', submitted: '5 hours ago' },
  ];

  const stats = [
    { title: 'My Courses', value: '2', icon: <BookOpen className="w-5 h-5 lg:w-6 lg:h-6" />, color: 'from-blue-400 to-blue-500' },
    { title: 'Total Students', value: '77', icon: <Users className="w-5 h-5 lg:w-6 lg:h-6" />, color: 'from-purple-400 to-purple-500' },
    { title: 'Assignments', value: '14', icon: <FileText className="w-5 h-5 lg:w-6 lg:h-6" />, color: 'from-green-400 to-green-500' },
    { title: 'Pending Grading', value: '8', icon: <Clock className="w-5 h-5 lg:w-6 lg:h-6" />, color: 'from-yellow-400 to-yellow-500' },
  ];

  return (
    <div className="space-y-4 lg:space-y-6 xl:space-y-8">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-1 lg:mb-2">
          Welcome, {user?.name || 'Lecturer'}
        </h1>
        <p className="text-sm lg:text-base text-gray-600">Manage your courses, materials, and student assignments</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 xl:gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white/80 backdrop-blur-sm rounded-lg lg:rounded-xl p-4 lg:p-5 xl:p-6 shadow-lg border border-purple-200/50 hover:shadow-xl transition-all"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-xs lg:text-sm font-medium mb-1">{stat.title}</p>
                <p className="text-xl lg:text-2xl xl:text-3xl font-bold text-gray-800">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 lg:w-14 lg:h-14 xl:w-16 xl:h-16 rounded-full bg-gradient-to-br ${stat.color} flex items-center justify-center text-white shadow-lg`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        {/* My Courses */}
        <div className="bg-white/80 backdrop-blur-sm rounded-lg lg:rounded-xl p-4 lg:p-5 xl:p-6 shadow-lg border border-purple-200/50">
          <h2 className="text-lg lg:text-xl font-bold text-gray-800 mb-4">My Courses</h2>
          <div className="space-y-3">
            {myCourses.map((course) => (
              <div
                key={course.id}
                className="p-4 rounded-lg bg-gradient-to-r from-purple-50/50 to-blue-50/50 border border-purple-100 hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-800">{course.name}</h3>
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                    {course.status}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs lg:text-sm">
                  <div>
                    <span className="text-gray-600">Students:</span>
                    <span className="font-semibold text-gray-800 ml-1">{course.students}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Assignments:</span>
                    <span className="font-semibold text-gray-800 ml-1">{course.assignments}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Materials:</span>
                    <span className="font-semibold text-gray-800 ml-1">{course.materials}</span>
                  </div>
                </div>
                <div className="mt-3 flex gap-2">
                  <button className="flex-1 bg-purple-100 text-purple-700 py-2 rounded-lg text-xs lg:text-sm font-semibold hover:bg-purple-200 transition-all">
                    Manage
                  </button>
                  <button className="flex-1 bg-blue-100 text-blue-700 py-2 rounded-lg text-xs lg:text-sm font-semibold hover:bg-blue-200 transition-all">
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Grading */}
        <div className="bg-white/80 backdrop-blur-sm rounded-lg lg:rounded-xl p-4 lg:p-5 xl:p-6 shadow-lg border border-purple-200/50">
          <h2 className="text-lg lg:text-xl font-bold text-gray-800 mb-4">Pending Grading</h2>
          <div className="space-y-3">
            {pendingGrading.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-lg bg-yellow-50 border border-yellow-200 hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800 text-sm lg:text-base">{item.assignment}</p>
                    <p className="text-xs lg:text-sm text-gray-600">{item.course}</p>
                  </div>
                  <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs lg:text-sm text-gray-600">Student: <span className="font-semibold text-gray-800">{item.student}</span></p>
                    <p className="text-xs text-gray-500 mt-1">Submitted {item.submitted}</p>
                  </div>
                  <button className="px-3 py-1.5 bg-yellow-100 text-yellow-700 rounded-lg text-xs lg:text-sm font-semibold hover:bg-yellow-200 transition-all">
                    Grade
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LecturerDashboard;

