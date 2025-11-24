'use client';

import { Award, TrendingUp, BookOpen, FileText, HelpCircle, CheckCircle, Clock } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

const GradesPage = () => {
  const grades = [
    { 
      id: 1, 
      course: 'Advanced AI', 
      assignment: 'AI Fundamentals Assignment', 
      type: 'assignment',
      score: 92, 
      maxScore: 100, 
      grade: 'A',
      date: '2025-11-10',
      aiScore: 92,
      plagiarismScore: 3,
      correctness: 88,
    },
    { 
      id: 2, 
      course: 'ML Basics', 
      assignment: 'Machine Learning Project', 
      type: 'assignment',
      score: 85, 
      maxScore: 100, 
      grade: 'B+',
      date: '2025-11-08',
      aiScore: 85,
      plagiarismScore: 5,
      correctness: 82,
    },
    { 
      id: 3, 
      course: 'Advanced AI', 
      assignment: 'AI Fundamentals Quiz', 
      type: 'quiz',
      score: 95, 
      maxScore: 100, 
      grade: 'A+',
      date: '2025-11-05',
    },
    { 
      id: 4, 
      course: 'ML Basics', 
      assignment: 'ML Concepts Quiz', 
      type: 'quiz',
      score: 88, 
      maxScore: 100, 
      grade: 'A',
      date: '2025-11-03',
    },
    { 
      id: 5, 
      course: 'Advanced AI', 
      assignment: 'Neural Networks Essay', 
      type: 'assignment',
      score: 90, 
      maxScore: 100, 
      grade: 'A',
      date: '2025-11-01',
      aiScore: 90,
      plagiarismScore: 2,
      correctness: 92,
    },
  ];

  const courseAverages = [
    { course: 'Advanced AI', average: 92.3, assignments: 2, quizzes: 1 },
    { course: 'ML Basics', average: 86.5, assignments: 1, quizzes: 1 },
  ];

  const gradeDistribution = [
    { grade: 'A+', count: 1, color: '#10b981' },
    { grade: 'A', count: 3, color: '#3b82f6' },
    { grade: 'B+', count: 1, color: '#8b5cf6' },
    { grade: 'B', count: 0, color: '#f59e0b' },
    { grade: 'C', count: 0, color: '#ef4444' },
  ];

  const getGradeColor = (grade: string) => {
    if (grade.includes('A+')) return 'text-green-600 bg-green-100';
    if (grade.includes('A')) return 'text-blue-600 bg-blue-100';
    if (grade.includes('B+')) return 'text-purple-600 bg-purple-100';
    if (grade.includes('B')) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const overallAverage = grades.reduce((sum, g) => sum + g.score, 0) / grades.length;

  return (
    <div className="space-y-4 lg:space-y-6 xl:space-y-8">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-1 lg:mb-2">My Grades</h1>
        <p className="text-sm lg:text-base text-gray-600">View your grades and academic performance</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 xl:gap-6">
        <div className="bg-white/80 backdrop-blur-sm rounded-lg lg:rounded-xl p-4 lg:p-5 shadow-lg border border-purple-200/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-xs lg:text-sm font-medium mb-1">Overall Average</p>
              <p className="text-2xl lg:text-3xl font-bold text-gray-800">{overallAverage.toFixed(1)}%</p>
            </div>
            <Award className="w-8 h-8 lg:w-10 lg:h-10 text-purple-500" />
          </div>
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-lg lg:rounded-xl p-4 lg:p-5 shadow-lg border border-purple-200/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-xs lg:text-sm font-medium mb-1">Total Grades</p>
              <p className="text-2xl lg:text-3xl font-bold text-gray-800">{grades.length}</p>
            </div>
            <FileText className="w-8 h-8 lg:w-10 lg:h-10 text-blue-500" />
          </div>
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-lg lg:rounded-xl p-4 lg:p-5 shadow-lg border border-purple-200/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-xs lg:text-sm font-medium mb-1">Assignments</p>
              <p className="text-2xl lg:text-3xl font-bold text-gray-800">
                {grades.filter(g => g.type === 'assignment').length}
              </p>
            </div>
            <FileText className="w-8 h-8 lg:w-10 lg:h-10 text-green-500" />
          </div>
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-lg lg:rounded-xl p-4 lg:p-5 shadow-lg border border-purple-200/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-xs lg:text-sm font-medium mb-1">Quizzes</p>
              <p className="text-2xl lg:text-3xl font-bold text-gray-800">
                {grades.filter(g => g.type === 'quiz').length}
              </p>
            </div>
            <HelpCircle className="w-8 h-8 lg:w-10 lg:h-10 text-yellow-500" />
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        <div className="bg-white/80 backdrop-blur-sm rounded-lg lg:rounded-xl p-4 lg:p-5 xl:p-6 shadow-lg border border-purple-200/50">
          <h2 className="text-lg lg:text-xl font-bold text-gray-800 mb-4">Grade Distribution</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={gradeDistribution}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="grade" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }} 
              />
              <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                {gradeDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-lg lg:rounded-xl p-4 lg:p-5 xl:p-6 shadow-lg border border-purple-200/50">
          <h2 className="text-lg lg:text-xl font-bold text-gray-800 mb-4">Course Averages</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={courseAverages}>
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
              <Bar dataKey="average" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Grades Table */}
      <div className="bg-white/80 backdrop-blur-sm rounded-lg lg:rounded-xl shadow-lg border border-purple-200/50 overflow-hidden">
        <div className="p-4 lg:p-5 xl:p-6">
          <h2 className="text-lg lg:text-xl font-bold text-gray-800 mb-4">All Grades</h2>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px]">
              <thead className="bg-gradient-to-r from-blue-50 to-purple-50">
                <tr>
                  <th className="px-3 lg:px-6 py-3 lg:py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Course</th>
                  <th className="px-3 lg:px-6 py-3 lg:py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Assignment/Quiz</th>
                  <th className="px-3 lg:px-6 py-3 lg:py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Type</th>
                  <th className="px-3 lg:px-6 py-3 lg:py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Score</th>
                  <th className="px-3 lg:px-6 py-3 lg:py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Grade</th>
                  <th className="px-3 lg:px-6 py-3 lg:py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-100">
                {grades.map((grade) => (
                  <tr key={grade.id} className="hover:bg-purple-50/50 transition-colors">
                    <td className="px-3 lg:px-6 py-3 lg:py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <BookOpen className="w-4 h-4 lg:w-5 lg:h-5 text-purple-600 mr-2" />
                        <span className="font-semibold text-sm lg:text-base text-gray-800">{grade.course}</span>
                      </div>
                    </td>
                    <td className="px-3 lg:px-6 py-3 lg:py-4 whitespace-nowrap text-sm lg:text-base text-gray-800">{grade.assignment}</td>
                    <td className="px-3 lg:px-6 py-3 lg:py-4 whitespace-nowrap">
                      {grade.type === 'assignment' ? (
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold flex items-center gap-1 w-fit">
                          <FileText className="w-3 h-3" />
                          Assignment
                        </span>
                      ) : (
                        <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold flex items-center gap-1 w-fit">
                          <HelpCircle className="w-3 h-3" />
                          Quiz
                        </span>
                      )}
                    </td>
                    <td className="px-3 lg:px-6 py-3 lg:py-4 whitespace-nowrap">
                      <span className="font-semibold text-sm lg:text-base text-gray-800">
                        {grade.score} / {grade.maxScore}
                      </span>
                      <span className="text-xs text-gray-500 ml-1">({((grade.score / grade.maxScore) * 100).toFixed(0)}%)</span>
                    </td>
                    <td className="px-3 lg:px-6 py-3 lg:py-4 whitespace-nowrap">
                      <span className={`px-2 lg:px-3 py-1 rounded-full text-xs font-semibold ${getGradeColor(grade.grade)}`}>
                        {grade.grade}
                      </span>
                    </td>
                    <td className="px-3 lg:px-6 py-3 lg:py-4 whitespace-nowrap text-xs lg:text-sm text-gray-600">
                      {new Date(grade.date).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Detailed Grades */}
      <div className="bg-white/80 backdrop-blur-sm rounded-lg lg:rounded-xl p-4 lg:p-5 xl:p-6 shadow-lg border border-purple-200/50">
        <h2 className="text-lg lg:text-xl font-bold text-gray-800 mb-4">Assignment Details</h2>
        <div className="space-y-3">
          {grades.filter(g => g.type === 'assignment' && g.aiScore !== null).map((grade) => (
            <div
              key={grade.id}
              className="p-4 rounded-lg bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-gray-800">{grade.assignment}</h3>
                  <p className="text-sm text-gray-600">{grade.course}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getGradeColor(grade.grade)}`}>
                  {grade.grade}
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-white/80 rounded-lg p-2">
                  <p className="text-xs text-gray-600 mb-1">AI Score</p>
                  <p className="text-lg font-bold text-blue-600">{grade.aiScore}%</p>
                </div>
                <div className="bg-white/80 rounded-lg p-2">
                  <p className="text-xs text-gray-600 mb-1">Plagiarism</p>
                  <p className="text-lg font-bold text-green-600">{grade.plagiarismScore}%</p>
                </div>
                <div className="bg-white/80 rounded-lg p-2">
                  <p className="text-xs text-gray-600 mb-1">Correctness</p>
                  <p className="text-lg font-bold text-purple-600">{grade.correctness}%</p>
                </div>
                <div className="bg-white/80 rounded-lg p-2">
                  <p className="text-xs text-gray-600 mb-1">Final Score</p>
                  <p className="text-lg font-bold text-indigo-600">{grade.score}%</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GradesPage;

