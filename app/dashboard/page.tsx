'use client';

import { Users, BookOpen, FileText, TrendingUp, Calendar, BarChart3, Plus, GraduationCap } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const DashboardPage = () => {
  const stats = [
    { title: 'Total Students', value: '1,234', icon: <Users className="w-5 h-5 lg:w-6 lg:h-6" />, color: 'from-blue-400 to-blue-500' },
    { title: 'Active Courses', value: '24', icon: <BookOpen className="w-5 h-5 lg:w-6 lg:h-6" />, color: 'from-purple-400 to-purple-500' },
    { title: 'Lecturers', value: '18', icon: <GraduationCap className="w-5 h-5 lg:w-6 lg:h-6" />, color: 'from-green-400 to-green-500' },
    { title: 'Assignments', value: '156', icon: <FileText className="w-5 h-5 lg:w-6 lg:h-6" />, color: 'from-pink-400 to-pink-500' },
    { title: 'Completion Rate', value: '87%', icon: <TrendingUp className="w-5 h-5 lg:w-6 lg:h-6" />, color: 'from-yellow-400 to-yellow-500' },
    { title: 'Avg. Grade', value: '85%', icon: <BarChart3 className="w-5 h-5 lg:w-6 lg:h-6" />, color: 'from-indigo-400 to-indigo-500' },
  ];

  const enrollmentData = [
    { month: 'Jan', students: 400, courses: 240 },
    { month: 'Feb', students: 300, courses: 139 },
    { month: 'Mar', students: 500, courses: 280 },
    { month: 'Apr', students: 450, courses: 290 },
    { month: 'May', students: 600, courses: 380 },
    { month: 'Jun', students: 700, courses: 430 },
  ];

  const gradeDistribution = [
    { name: 'A+ (90-100)', value: 25, color: '#10b981' },
    { name: 'A (80-89)', value: 35, color: '#3b82f6' },
    { name: 'B (70-79)', value: 20, color: '#8b5cf6' },
    { name: 'C (60-69)', value: 15, color: '#f59e0b' },
    { name: 'Below 60', value: 5, color: '#ef4444' },
  ];

  const coursePerformance = [
    { course: 'CHC50121 Diploma', enrolled: 45, completed: 38, avgGrade: 87 },
    { course: 'CHCECE045', enrolled: 32, completed: 28, avgGrade: 82 },
    { course: 'CHCECE046', enrolled: 28, completed: 24, avgGrade: 85 },
    { course: 'CHCECE047', enrolled: 56, completed: 50, avgGrade: 89 },
  ];

  const assignmentStatus = [
    { status: 'Submitted', count: 120, color: '#3b82f6' },
    { status: 'Graded', count: 95, color: '#10b981' },
    { status: 'Pending', count: 36, color: '#f59e0b' },
    { status: 'Overdue', count: 15, color: '#ef4444' },
  ];

  const recentActivities = [
    { id: 1, activity: 'New student enrolled in "CHC50121 Diploma"', time: '2 hours ago', type: 'enrollment' },
    { id: 2, activity: 'Assignment "Behaviour Observation" submitted by Sarah Johnson', time: '4 hours ago', type: 'assignment' },
    { id: 3, activity: 'New course "CHCECE048 - Plan and Implement Children\'s Education" created', time: '1 day ago', type: 'course' },
    { id: 4, activity: 'Grade updated for Michael Brown in "Inclusion Plan Assignment"', time: '2 days ago', type: 'grade' },
  ];

  const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444'];

  return (
    <div className="space-y-4 lg:space-y-6 xl:space-y-8">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-1 lg:mb-2">Dashboard Overview</h1>
        <p className="text-sm lg:text-base text-gray-600">Welcome back! Here's what's happening with your LMS.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 lg:gap-4 xl:gap-6">
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

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        {/* Enrollment Trend */}
        <div className="bg-white/80 backdrop-blur-sm rounded-lg lg:rounded-xl p-4 lg:p-5 xl:p-6 shadow-lg border border-purple-200/50">
          <h2 className="text-lg lg:text-xl font-bold text-gray-800 mb-4">Enrollment Trend</h2>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={enrollmentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }} 
              />
              <Legend />
              <Area type="monotone" dataKey="students" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
              <Area type="monotone" dataKey="courses" stackId="1" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.6} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Grade Distribution */}
        <div className="bg-white/80 backdrop-blur-sm rounded-lg lg:rounded-xl p-4 lg:p-5 xl:p-6 shadow-lg border border-purple-200/50">
          <h2 className="text-lg lg:text-xl font-bold text-gray-800 mb-4">Grade Distribution</h2>
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

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        {/* Course Performance */}
        <div className="bg-white/80 backdrop-blur-sm rounded-lg lg:rounded-xl p-4 lg:p-5 xl:p-6 shadow-lg border border-purple-200/50">
          <h2 className="text-lg lg:text-xl font-bold text-gray-800 mb-4">Course Performance</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={coursePerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="course" stroke="#6b7280" fontSize={10} angle={-45} textAnchor="end" height={80} />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }} 
              />
              <Legend />
              <Bar dataKey="enrolled" fill="#3b82f6" name="Enrolled" />
              <Bar dataKey="completed" fill="#10b981" name="Completed" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Assignment Status */}
        <div className="bg-white/80 backdrop-blur-sm rounded-lg lg:rounded-xl p-4 lg:p-5 xl:p-6 shadow-lg border border-purple-200/50">
          <h2 className="text-lg lg:text-xl font-bold text-gray-800 mb-4">Assignment Status</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={assignmentStatus} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis type="number" stroke="#6b7280" fontSize={12} />
              <YAxis dataKey="status" type="category" stroke="#6b7280" fontSize={12} width={80} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }} 
              />
              <Bar dataKey="count" radius={[0, 8, 8, 0]}>
                {assignmentStatus.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
        {/* Recent Activities */}
        <div className="lg:col-span-2 bg-white/80 backdrop-blur-sm rounded-lg lg:rounded-xl p-4 lg:p-5 xl:p-6 shadow-lg border border-purple-200/50">
          <h2 className="text-lg lg:text-xl font-bold text-gray-800 mb-3 lg:mb-4">Recent Activities</h2>
          <div className="space-y-2 lg:space-y-3 xl:space-y-4">
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start space-x-3 lg:space-x-4 p-3 lg:p-4 rounded-lg bg-gradient-to-r from-purple-50/50 to-blue-50/50 border border-purple-100 hover:shadow-md transition-all"
              >
                <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-gradient-to-br from-purple-400 to-blue-400 flex items-center justify-center text-white font-bold flex-shrink-0 text-sm lg:text-base">
                  {activity.id}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm lg:text-base text-gray-800 font-medium break-words">{activity.activity}</p>
                  <p className="text-xs lg:text-sm text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white/80 backdrop-blur-sm rounded-lg lg:rounded-xl p-4 lg:p-5 xl:p-6 shadow-lg border border-purple-200/50">
          <h2 className="text-lg lg:text-xl font-bold text-gray-800 mb-3 lg:mb-4">Quick Actions</h2>
          <div className="space-y-2 lg:space-y-3">
            <button className="w-full bg-gradient-to-r from-blue-400 to-purple-500 text-white py-2.5 lg:py-3 rounded-lg text-sm lg:text-base font-semibold hover:from-blue-500 hover:to-purple-600 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2">
              <Plus className="w-4 h-4 lg:w-5 lg:h-5" />
              Create New Course
            </button>
            <button className="w-full bg-white border-2 border-purple-300 text-purple-700 py-2.5 lg:py-3 rounded-lg text-sm lg:text-base font-semibold hover:bg-purple-50 transition-all flex items-center justify-center gap-2">
              <Plus className="w-4 h-4 lg:w-5 lg:h-5" />
              Add Student
            </button>
            <button className="w-full bg-white border-2 border-blue-300 text-blue-700 py-2.5 lg:py-3 rounded-lg text-sm lg:text-base font-semibold hover:bg-blue-50 transition-all flex items-center justify-center gap-2">
              <Calendar className="w-4 h-4 lg:w-5 lg:h-5" />
              View Calendar
            </button>
            <button className="w-full bg-white border-2 border-pink-300 text-pink-700 py-2.5 lg:py-3 rounded-lg text-sm lg:text-base font-semibold hover:bg-pink-50 transition-all flex items-center justify-center gap-2">
              <BarChart3 className="w-4 h-4 lg:w-5 lg:h-5" />
              Generate Report
            </button>
          </div>
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="bg-white/80 backdrop-blur-sm rounded-lg lg:rounded-xl p-4 lg:p-5 xl:p-6 shadow-lg border border-purple-200/50">
        <h2 className="text-lg lg:text-xl font-bold text-gray-800 mb-3 lg:mb-4">Upcoming Events</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
          {[
            { date: 'Tomorrow', event: 'Assignment Due: AI Fundamentals', time: '11:59 PM' },
            { date: 'Nov 20', event: 'Course: Machine Learning Basics', time: '10:00 AM' },
            { date: 'Nov 22', event: 'Final Exam: Advanced AI', time: '2:00 PM' },
          ].map((event, index) => (
            <div
              key={index}
              className="p-3 lg:p-4 rounded-lg bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-200 hover:shadow-md transition-all"
            >
              <p className="text-xs lg:text-sm font-semibold text-purple-700 mb-1">{event.date}</p>
              <p className="text-sm lg:text-base text-gray-800 font-medium mb-1">{event.event}</p>
              <p className="text-xs lg:text-sm text-gray-600">{event.time}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
