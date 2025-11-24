import { Plus, Eye, FileCheck } from 'lucide-react';

const AssignmentsPage = () => {
  const assignments = [
    { id: 1, title: 'AI Fundamentals Quiz', course: 'Advanced AI', dueDate: '2025-11-15', submissions: 42, total: 45 },
    { id: 2, title: 'Machine Learning Project', course: 'Machine Learning Basics', dueDate: '2025-11-18', submissions: 28, total: 32 },
    { id: 3, title: 'Deep Learning Assignment', course: 'Deep Learning', dueDate: '2025-11-20', submissions: 25, total: 28 },
    { id: 4, title: 'Data Analysis Report', course: 'Data Science Fundamentals', dueDate: '2025-11-22', submissions: 50, total: 56 },
  ];

  return (
    <div className="space-y-4 lg:space-y-6 xl:space-y-8">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-1 lg:mb-2">Assignments</h1>
          <p className="text-sm lg:text-base text-gray-600">Manage and grade student assignments</p>
        </div>
        <button className="bg-gradient-to-r from-blue-400 to-purple-500 text-white px-4 lg:px-6 py-2 lg:py-3 rounded-lg text-sm lg:text-base font-semibold hover:from-blue-500 hover:to-purple-600 transition-all shadow-lg flex items-center justify-center gap-2">
          <Plus className="w-4 h-4 lg:w-5 lg:h-5" />
          Create Assignment
        </button>
      </div>

      <div className="space-y-3 lg:space-y-4">
        {assignments.map((assignment) => {
          const submissionRate = Math.round((assignment.submissions / assignment.total) * 100);
          return (
            <div
              key={assignment.id}
              className="bg-white/80 backdrop-blur-sm rounded-lg lg:rounded-xl p-4 lg:p-5 xl:p-6 shadow-lg border border-purple-200/50 hover:shadow-xl transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3 lg:mb-4">
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg lg:text-xl font-bold text-gray-800 mb-1 break-words">{assignment.title}</h3>
                  <p className="text-sm lg:text-base text-gray-600">{assignment.course}</p>
                </div>
                <span className="px-3 lg:px-4 py-1.5 lg:py-2 bg-red-100 text-red-700 rounded-lg text-xs lg:text-sm font-semibold whitespace-nowrap self-start sm:self-auto">
                  Due: {new Date(assignment.dueDate).toLocaleDateString()}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between text-xs lg:text-sm mb-2">
                    <span className="text-gray-600">Submissions</span>
                    <span className="font-semibold text-gray-800">
                      {assignment.submissions} / {assignment.total} ({submissionRate}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 lg:h-3">
                    <div
                      className="bg-gradient-to-r from-blue-400 to-purple-500 h-2 lg:h-3 rounded-full"
                      style={{ width: `${submissionRate}%` }}
                    />
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="px-3 lg:px-4 py-2 bg-purple-100 text-purple-700 rounded-lg text-xs lg:text-sm font-semibold hover:bg-purple-200 transition-all flex items-center gap-1.5 lg:gap-2">
                    <FileCheck className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                    Grade
                  </button>
                  <button className="px-3 lg:px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-xs lg:text-sm font-semibold hover:bg-blue-200 transition-all flex items-center gap-1.5 lg:gap-2">
                    <Eye className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                    View
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AssignmentsPage;

