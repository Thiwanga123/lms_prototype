import { Plus, Eye, Edit, GraduationCap } from 'lucide-react';

const CoursesPage = () => {
  const courses = [
    { id: 1, name: 'CHC50121 Diploma Early Childhood Education and Care', students: 45, status: 'Active', progress: 78, lecturer: 'Chris Sadea' },
    { id: 2, name: 'CHCECE045 - Foster Positive and Respectful Interactions', students: 32, status: 'Active', progress: 65, lecturer: 'Chris Sadea' },
    { id: 3, name: 'CHCECE046 - Implement Strategies for Inclusion', students: 28, status: 'Active', progress: 52, lecturer: 'Chris Sadea' },
    { id: 4, name: 'CHCECE047 - Use Information About Children', students: 56, status: 'Active', progress: 89, lecturer: 'Chris Sadea' },
    { id: 5, name: 'CHCECE048 - Plan and Implement Children\'s Education', students: 40, status: 'Active', progress: 72, lecturer: 'Chris Sadea' },
    { id: 6, name: 'CHCECE049 - Embed Environmental Responsibility', students: 30, status: 'Active', progress: 68, lecturer: 'Chris Sadea' },
  ];

  return (
    <div className="space-y-4 lg:space-y-6 xl:space-y-8">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-1 lg:mb-2">Courses</h1>
          <p className="text-sm lg:text-base text-gray-600">Manage and track all your courses</p>
        </div>
        <button className="bg-gradient-to-r from-blue-400 to-purple-500 text-white px-4 lg:px-6 py-2 lg:py-3 rounded-lg text-sm lg:text-base font-semibold hover:from-blue-500 hover:to-purple-600 transition-all shadow-lg flex items-center justify-center gap-2">
          <Plus className="w-4 h-4 lg:w-5 lg:h-5" />
          Create Course
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white/80 backdrop-blur-sm rounded-lg lg:rounded-xl p-4 lg:p-5 xl:p-6 shadow-lg border border-purple-200/50 hover:shadow-xl transition-all"
          >
            <div className="flex items-start justify-between mb-3 lg:mb-4">
              <h3 className="text-lg lg:text-xl font-bold text-gray-800 pr-2">{course.name}</h3>
              <span className="px-2 lg:px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold whitespace-nowrap">
                {course.status}
              </span>
            </div>
            <div className="space-y-2 lg:space-y-3">
              <div className="flex items-center justify-between text-xs lg:text-sm">
                <span className="text-gray-600">Students</span>
                <span className="font-semibold text-gray-800">{course.students}</span>
              </div>
              <div className="flex items-center gap-2 text-xs lg:text-sm">
                <GraduationCap className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-purple-600" />
                <span className="text-gray-600">Lecturer:</span>
                <span className="font-semibold text-gray-800">{course.lecturer}</span>
              </div>
              <div>
                <div className="flex items-center justify-between text-xs lg:text-sm mb-1">
                  <span className="text-gray-600">Progress</span>
                  <span className="font-semibold text-gray-800">{course.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5 lg:h-2">
                  <div
                    className="bg-gradient-to-r from-blue-400 to-purple-500 h-1.5 lg:h-2 rounded-full"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
              </div>
            </div>
            <div className="mt-3 lg:mt-4 flex space-x-2">
              <button className="flex-1 bg-purple-100 text-purple-700 py-2 rounded-lg text-xs lg:text-sm font-semibold hover:bg-purple-200 transition-all flex items-center justify-center gap-1.5 lg:gap-2">
                <Eye className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                View
              </button>
              <button className="flex-1 bg-blue-100 text-blue-700 py-2 rounded-lg text-xs lg:text-sm font-semibold hover:bg-blue-200 transition-all flex items-center justify-center gap-1.5 lg:gap-2">
                <Edit className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoursesPage;
