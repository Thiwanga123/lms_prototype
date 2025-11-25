'use client';

import { BookOpen, FileText, CheckCircle, Clock, TrendingUp, Award, Sparkles, BarChart3 } from 'lucide-react';
import { useUser } from '../../context/UserContext';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';

const StudentDashboard = () => {
  const { user } = useUser();

  const enrolledCourses = [
    { id: 1, name: 'CHC50121 Diploma Early Childhood Education and Care', progress: 65, assignments: 3, quizzes: 2, grade: 'A', completed: 8, total: 12 },
    { id: 2, name: 'CHCECE045 - Foster Positive Interactions', progress: 80, assignments: 2, quizzes: 1, grade: 'A+', completed: 10, total: 12 },
  ];

  const upcomingDeadlines = [
    { id: 1, course: 'CHC50121 Diploma', task: 'Assignment: Behaviour Observation', due: 'Tomorrow, 11:59 PM', type: 'assignment' },
    { id: 2, course: 'CHCECE045', task: 'Quiz: Positive Interactions', due: 'Nov 20, 2:00 PM', type: 'quiz' },
  ];

  const stats = [
    { title: 'Enrolled Courses', value: '2', icon: <BookOpen className="w-5 h-5 lg:w-6 lg:h-6" />, color: 'from-blue-400 to-blue-500' },
    { title: 'Assignments', value: '5', icon: <FileText className="w-5 h-5 lg:w-6 lg:h-6" />, color: 'from-purple-400 to-purple-500' },
    { title: 'Completed', value: '3', icon: <CheckCircle className="w-5 h-5 lg:w-6 lg:h-6" />, color: 'from-green-400 to-green-500' },
    { title: 'Pending', value: '2', icon: <Clock className="w-5 h-5 lg:w-6 lg:h-6" />, color: 'from-yellow-400 to-yellow-500' },
    { title: 'Avg. Grade', value: 'A', icon: <TrendingUp className="w-5 h-5 lg:w-6 lg:h-6" />, color: 'from-indigo-400 to-indigo-500' },
  ];

  // Progress data for charts
  const progressData = [
    { week: 'Week 1', 'CHC50121 Diploma': 20, 'CHCECE045': 25 },
    { week: 'Week 2', 'CHC50121 Diploma': 35, 'CHCECE045': 40 },
    { week: 'Week 3', 'CHC50121 Diploma': 45, 'CHCECE045': 55 },
    { week: 'Week 4', 'CHC50121 Diploma': 55, 'CHCECE045': 70 },
    { week: 'Week 5', 'CHC50121 Diploma': 65, 'CHCECE045': 80 },
  ];

  const gradeDistribution = [
    { name: 'A+', value: 1, color: '#10b981' },
    { name: 'A', value: 2, color: '#3b82f6' },
    { name: 'B+', value: 1, color: '#8b5cf6' },
    { name: 'B', value: 0, color: '#f59e0b' },
    { name: 'C', value: 0, color: '#ef4444' },
  ];

  const assignmentStatus = [
    { name: 'Completed', value: 3, color: '#10b981' },
    { name: 'Pending', value: 2, color: '#f59e0b' },
    { name: 'Overdue', value: 0, color: '#ef4444' },
  ];

  const overallProgress = enrolledCourses.reduce((sum, course) => sum + course.progress, 0) / enrolledCourses.length;

  return (
    <div className="space-y-4 lg:space-y-6 xl:space-y-8">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-1 lg:mb-2">
          Welcome, {user?.name || 'Student'}
        </h1>
        <p className="text-sm lg:text-base text-gray-600">Track your learning progress and achievements</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 lg:gap-4 xl:gap-6">
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

      {/* Overall Progress Card */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg lg:rounded-xl p-6 lg:p-8 shadow-xl text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl lg:text-2xl font-bold mb-2">Overall Learning Progress</h2>
            <p className="text-blue-100 text-sm lg:text-base">You're making great progress!</p>
          </div>
          <Sparkles className="w-12 h-12 lg:w-16 lg:h-16 text-white/80" />
        </div>
        <div className="mb-4">
          <div className="flex items-center justify-between text-sm lg:text-base mb-2">
            <span className="text-blue-100">Overall Completion</span>
            <span className="font-bold text-2xl lg:text-3xl">{overallProgress.toFixed(0)}%</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-4 lg:h-5">
            <div
              className="bg-white rounded-full h-4 lg:h-5 transition-all duration-500"
              style={{ width: `${overallProgress}%` }}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-blue-100 mb-1">Total Modules</p>
            <p className="text-2xl font-bold">{enrolledCourses.reduce((sum, c) => sum + c.total, 0)}</p>
          </div>
          <div>
            <p className="text-blue-100 mb-1">Completed</p>
            <p className="text-2xl font-bold">{enrolledCourses.reduce((sum, c) => sum + c.completed, 0)}</p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        {/* Progress Trend */}
        <div className="bg-white/80 backdrop-blur-sm rounded-lg lg:rounded-xl p-4 lg:p-5 xl:p-6 shadow-lg border border-purple-200/50">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-purple-600" />
            <h2 className="text-lg lg:text-xl font-bold text-gray-800">Progress Trend</h2>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={progressData}>
              <defs>
                <linearGradient id="colorAdvancedAI" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorMLBasics" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="week" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }} 
              />
              <Legend />
              <Area type="monotone" dataKey="Advanced AI" stroke="#3b82f6" fillOpacity={1} fill="url(#colorAdvancedAI)" />
              <Area type="monotone" dataKey="ML Basics" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorMLBasics)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Grade Distribution */}
        <div className="bg-white/80 backdrop-blur-sm rounded-lg lg:rounded-xl p-4 lg:p-5 xl:p-6 shadow-lg border border-purple-200/50">
          <div className="flex items-center gap-2 mb-4">
            <Award className="w-5 h-5 text-purple-600" />
            <h2 className="text-lg lg:text-xl font-bold text-gray-800">Grade Distribution</h2>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={gradeDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${((percent || 0) * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {gradeDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        {/* My Courses with Enhanced Progress */}
        <div className="bg-white/80 backdrop-blur-sm rounded-lg lg:rounded-xl p-4 lg:p-5 xl:p-6 shadow-lg border border-purple-200/50">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-purple-600" />
            <h2 className="text-lg lg:text-xl font-bold text-gray-800">My Courses</h2>
          </div>
          <div className="space-y-3">
            {enrolledCourses.map((course) => (
              <div
                key={course.id}
                className="p-4 rounded-lg bg-gradient-to-r from-purple-50/50 to-blue-50/50 border border-purple-100 hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 mb-1">{course.name}</h3>
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <span>{course.completed}/{course.total} modules completed</span>
                    </div>
                  </div>
                  <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold">
                    {course.grade}
                  </span>
                </div>
                <div className="mb-3">
                  <div className="flex items-center justify-between text-xs lg:text-sm mb-2">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-semibold text-gray-800">{course.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 relative overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-blue-400 to-purple-500 h-3 rounded-full transition-all duration-500 relative"
                      style={{ width: `${course.progress}%` }}
                    >
                      <div className="absolute inset-0 bg-white/30 animate-pulse" />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs lg:text-sm mb-3">
                  <div className="flex items-center gap-1">
                    <FileText className="w-3 h-3 text-blue-600" />
                    <span className="text-gray-600">Assignments:</span>
                    <span className="font-semibold text-gray-800">{course.assignments}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BarChart3 className="w-3 h-3 text-purple-600" />
                    <span className="text-gray-600">Quizzes:</span>
                    <span className="font-semibold text-gray-800">{course.quizzes}</span>
                  </div>
                </div>
                <button className="w-full bg-purple-100 text-purple-700 py-2 rounded-lg text-xs lg:text-sm font-semibold hover:bg-purple-200 transition-all">
                  Continue Learning
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Deadlines */}
        <div className="bg-white/80 backdrop-blur-sm rounded-lg lg:rounded-xl p-4 lg:p-5 xl:p-6 shadow-lg border border-purple-200/50">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-purple-600" />
            <h2 className="text-lg lg:text-xl font-bold text-gray-800">Upcoming Deadlines</h2>
          </div>
          <div className="space-y-3">
            {upcomingDeadlines.map((item) => (
              <div
                key={item.id}
                className={`p-4 rounded-lg border hover:shadow-md transition-all ${
                  item.type === 'assignment'
                    ? 'bg-red-50 border-red-200'
                    : 'bg-blue-50 border-blue-200'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800 text-sm lg:text-base">{item.task}</p>
                    <p className="text-xs lg:text-sm text-gray-600">{item.course}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    item.type === 'assignment'
                      ? 'bg-red-100 text-red-700'
                      : 'bg-blue-100 text-blue-700'
                  }`}>
                    {item.type}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-500">Due: {item.due}</p>
                  <button className={`px-3 py-1.5 rounded-lg text-xs lg:text-sm font-semibold transition-all ${
                    item.type === 'assignment'
                      ? 'bg-red-100 text-red-700 hover:bg-red-200'
                      : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                  }`}>
                    {item.type === 'assignment' ? 'Submit' : 'Take Quiz'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Assignment Status Chart */}
      <div className="bg-white/80 backdrop-blur-sm rounded-lg lg:rounded-xl p-4 lg:p-5 xl:p-6 shadow-lg border border-purple-200/50">
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className="w-5 h-5 text-purple-600" />
          <h2 className="text-lg lg:text-xl font-bold text-gray-800">Assignment Status Overview</h2>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={assignmentStatus}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="name" stroke="#6b7280" fontSize={12} />
            <YAxis stroke="#6b7280" fontSize={12} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                border: '1px solid #e5e7eb',
                borderRadius: '8px'
              }} 
            />
            <Bar dataKey="value" radius={[8, 8, 0, 0]}>
              {assignmentStatus.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StudentDashboard;
