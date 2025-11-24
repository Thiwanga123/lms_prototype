import { Edit, User } from 'lucide-react';

const GradesPage = () => {
  const gradeData = [
    { student: 'John Doe', course: 'Advanced AI', assignment: 'AI Fundamentals Quiz', grade: 92, maxGrade: 100 },
    { student: 'Jane Smith', course: 'Machine Learning Basics', assignment: 'ML Project', grade: 98, maxGrade: 100 },
    { student: 'Bob Johnson', course: 'Deep Learning', assignment: 'DL Assignment', grade: 85, maxGrade: 100 },
    { student: 'Alice Williams', course: 'Data Science Fundamentals', assignment: 'Data Analysis', grade: 94, maxGrade: 100 },
    { student: 'Charlie Brown', course: 'Advanced AI', assignment: 'AI Fundamentals Quiz', grade: 78, maxGrade: 100 },
    { student: 'Diana Prince', course: 'Machine Learning Basics', assignment: 'ML Project', grade: 96, maxGrade: 100 },
  ];

  const getGradeColor = (percentage: number) => {
    if (percentage >= 90) return 'text-green-600 bg-green-100';
    if (percentage >= 80) return 'text-blue-600 bg-blue-100';
    if (percentage >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className="space-y-4 lg:space-y-6 xl:space-y-8">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-1 lg:mb-2">Grades</h1>
        <p className="text-sm lg:text-base text-gray-600">View and manage student grades</p>
      </div>

      <div className="bg-white/80 backdrop-blur-sm rounded-lg lg:rounded-xl shadow-lg border border-purple-200/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px]">
            <thead className="bg-gradient-to-r from-blue-50 to-purple-50">
              <tr>
                <th className="px-3 lg:px-6 py-3 lg:py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Student</th>
                <th className="px-3 lg:px-6 py-3 lg:py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider hidden md:table-cell">Course</th>
                <th className="px-3 lg:px-6 py-3 lg:py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider hidden lg:table-cell">Assignment</th>
                <th className="px-3 lg:px-6 py-3 lg:py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Grade</th>
                <th className="px-3 lg:px-6 py-3 lg:py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Percentage</th>
                <th className="px-3 lg:px-6 py-3 lg:py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-100">
              {gradeData.map((item, idx) => {
                const percentage = Math.round((item.grade / item.maxGrade) * 100);
                return (
                  <tr key={idx} className="hover:bg-purple-50/50 transition-colors">
                    <td className="px-3 lg:px-6 py-3 lg:py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white mr-2 lg:mr-3">
                          <User className="w-4 h-4 lg:w-5 lg:h-5" />
                        </div>
                        <div className="min-w-0">
                          <span className="font-semibold text-sm lg:text-base text-gray-800 block truncate">{item.student}</span>
                          <span className="text-xs text-gray-500 md:hidden">{item.course}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 lg:px-6 py-3 lg:py-4 whitespace-nowrap text-gray-600 text-sm hidden md:table-cell">{item.course}</td>
                    <td className="px-3 lg:px-6 py-3 lg:py-4 whitespace-nowrap text-gray-600 text-sm hidden lg:table-cell">{item.assignment}</td>
                    <td className="px-3 lg:px-6 py-3 lg:py-4 whitespace-nowrap">
                      <span className="font-semibold text-sm lg:text-base text-gray-800">
                        {item.grade} / {item.maxGrade}
                      </span>
                    </td>
                    <td className="px-3 lg:px-6 py-3 lg:py-4 whitespace-nowrap">
                      <span className={`px-2 lg:px-3 py-1 rounded-full text-xs font-semibold ${getGradeColor(percentage)}`}>
                        {percentage}%
                      </span>
                    </td>
                    <td className="px-3 lg:px-6 py-3 lg:py-4 whitespace-nowrap text-xs lg:text-sm">
                      <button className="text-purple-600 hover:text-purple-800 font-semibold flex items-center gap-1">
                        <Edit className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                        <span className="hidden sm:inline">Edit</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GradesPage;

