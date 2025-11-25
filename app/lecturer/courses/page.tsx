'use client';

import { BookOpen, Users, FileText, HelpCircle, GraduationCap, Eye, Edit } from 'lucide-react';
import { useRouter } from 'next/navigation';

const LecturerCoursesPage = () => {
  const router = useRouter();
  const myCourses = [
    { 
      id: '1', 
      name: 'CHC50121 Diploma Early Childhood Education and Care', 
      code: 'CHC50121', 
      students: 45, 
      assignments: 8, 
      quizzes: 5, 
      materials: 12,
      status: 'Active',
      semester: 'Fall 2025'
    },
    { 
      id: 2, 
      name: 'CHCECE045 - Foster Positive and Respectful Interactions', 
      code: 'CHCECE045', 
      students: 32, 
      assignments: 6, 
      quizzes: 4, 
      materials: 10,
      status: 'Active',
      semester: 'Fall 2025'
    },
    { 
      id: 3, 
      name: 'CHCECE046 - Implement Strategies for Inclusion', 
      code: 'CHCECE046', 
      students: 28, 
      assignments: 7, 
      quizzes: 6, 
      materials: 15,
      status: 'Active',
      semester: 'Fall 2025'
    },
    { 
      id: 4, 
      name: 'CHCECE047 - Use Information About Children', 
      code: 'CHCECE047', 
      students: 35, 
      assignments: 5, 
      quizzes: 3, 
      materials: 8,
      status: 'Active',
      semester: 'Fall 2025'
    },
    { 
      id: 5, 
      name: 'CHCECE048 - Plan and Implement Children\'s Education', 
      code: 'CHCECE048', 
      students: 40, 
      assignments: 6, 
      quizzes: 4, 
      materials: 11,
      status: 'Active',
      semester: 'Fall 2025'
    },
  ];

  return (
    <div className="space-y-4 lg:space-y-6 xl:space-y-8">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-1 lg:mb-2">My Courses</h1>
        <p className="text-sm lg:text-base text-gray-600">Manage your assigned courses and course content</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        {myCourses.map((course) => (
          <div
            key={course.id}
            className="bg-white/80 backdrop-blur-sm rounded-lg lg:rounded-xl p-4 lg:p-5 xl:p-6 shadow-lg border border-purple-200/50 hover:shadow-xl transition-all"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="text-lg lg:text-xl font-bold text-gray-800 mb-1">{course.name}</h3>
                <p className="text-xs lg:text-sm text-gray-600">Code: {course.code}</p>
                <p className="text-xs lg:text-sm text-gray-600">{course.semester}</p>
              </div>
              <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold whitespace-nowrap">
                {course.status}
              </span>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-xs lg:text-sm">
                <Users className="w-4 h-4 text-gray-600" />
                <span className="text-gray-600">Students:</span>
                <span className="font-semibold text-gray-800">{course.students}</span>
              </div>
              <div className="flex items-center gap-2 text-xs lg:text-sm">
                <FileText className="w-4 h-4 text-gray-600" />
                <span className="text-gray-600">Assignments:</span>
                <span className="font-semibold text-gray-800">{course.assignments}</span>
              </div>
              <div className="flex items-center gap-2 text-xs lg:text-sm">
                <HelpCircle className="w-4 h-4 text-gray-600" />
                <span className="text-gray-600">Quizzes:</span>
                <span className="font-semibold text-gray-800">{course.quizzes}</span>
              </div>
              <div className="flex items-center gap-2 text-xs lg:text-sm">
                <BookOpen className="w-4 h-4 text-gray-600" />
                <span className="text-gray-600">Materials:</span>
                <span className="font-semibold text-gray-800">{course.materials}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button 
                onClick={() => router.push(`/lecturer/courses/${course.id}`)}
                className="flex-1 bg-purple-100 text-purple-700 py-2 rounded-lg text-xs lg:text-sm font-semibold hover:bg-purple-200 transition-all flex items-center justify-center gap-1.5"
              >
                <Eye className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                View
              </button>
              <button 
                onClick={() => router.push(`/lecturer/courses/${course.id}`)}
                className="flex-1 bg-blue-100 text-blue-700 py-2 rounded-lg text-xs lg:text-sm font-semibold hover:bg-blue-200 transition-all flex items-center justify-center gap-1.5"
              >
                <Edit className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                Manage
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LecturerCoursesPage;

