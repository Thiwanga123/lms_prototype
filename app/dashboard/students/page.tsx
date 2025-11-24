import { Plus, Eye, Edit, User } from 'lucide-react';

const StudentsPage = () => {
  const students = [
    { id: 1, name: 'John Doe', email: 'john@example.com', courses: 3, status: 'Active', grade: 'A' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', courses: 2, status: 'Active', grade: 'A+' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', courses: 4, status: 'Active', grade: 'B+' },
    { id: 4, name: 'Alice Williams', email: 'alice@example.com', courses: 2, status: 'Active', grade: 'A' },
    { id: 5, name: 'Charlie Brown', email: 'charlie@example.com', courses: 3, status: 'Active', grade: 'B' },
    { id: 6, name: 'Diana Prince', email: 'diana@example.com', courses: 1, status: 'Active', grade: 'A+' },
  ];

  return (
    <div className="space-y-4 lg:space-y-6 xl:space-y-8">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-1 lg:mb-2">Students</h1>
          <p className="text-sm lg:text-base text-gray-600">Manage and monitor student progress</p>
        </div>
        <button className="bg-gradient-to-r from-blue-400 to-purple-500 text-white px-4 lg:px-6 py-2 lg:py-3 rounded-lg text-sm lg:text-base font-semibold hover:from-blue-500 hover:to-purple-600 transition-all shadow-lg flex items-center justify-center gap-2">
          <Plus className="w-4 h-4 lg:w-5 lg:h-5" />
          Add Student
        </button>
      </div>

      <div className="bg-white/80 backdrop-blur-sm rounded-lg lg:rounded-xl shadow-lg border border-purple-200/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px]">
            <thead className="bg-gradient-to-r from-blue-50 to-purple-50">
              <tr>
                <th className="px-3 lg:px-6 py-3 lg:py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Name</th>
                <th className="px-3 lg:px-6 py-3 lg:py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider hidden md:table-cell">Email</th>
                <th className="px-3 lg:px-6 py-3 lg:py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Courses</th>
                <th className="px-3 lg:px-6 py-3 lg:py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                <th className="px-3 lg:px-6 py-3 lg:py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider hidden sm:table-cell">Grade</th>
                <th className="px-3 lg:px-6 py-3 lg:py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-100">
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-purple-50/50 transition-colors">
                  <td className="px-3 lg:px-6 py-3 lg:py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white mr-2 lg:mr-3">
                        <User className="w-4 h-4 lg:w-5 lg:h-5" />
                      </div>
                      <div className="min-w-0">
                        <span className="font-semibold text-sm lg:text-base text-gray-800 block truncate">{student.name}</span>
                        <span className="text-xs text-gray-500 md:hidden">{student.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 lg:px-6 py-3 lg:py-4 whitespace-nowrap text-gray-600 text-sm hidden md:table-cell">{student.email}</td>
                  <td className="px-3 lg:px-6 py-3 lg:py-4 whitespace-nowrap">
                    <span className="px-2 lg:px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                      {student.courses}
                    </span>
                  </td>
                  <td className="px-3 lg:px-6 py-3 lg:py-4 whitespace-nowrap">
                    <span className="px-2 lg:px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                      {student.status}
                    </span>
                  </td>
                  <td className="px-3 lg:px-6 py-3 lg:py-4 whitespace-nowrap hidden sm:table-cell">
                    <span className="px-2 lg:px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold">
                      {student.grade}
                    </span>
                  </td>
                  <td className="px-3 lg:px-6 py-3 lg:py-4 whitespace-nowrap text-xs lg:text-sm">
                    <div className="flex items-center gap-2 lg:gap-4">
                      <button className="text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1">
                        <Eye className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                        <span className="hidden sm:inline">View</span>
                      </button>
                      <button className="text-purple-600 hover:text-purple-800 font-semibold flex items-center gap-1">
                        <Edit className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                        <span className="hidden sm:inline">Edit</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentsPage;

