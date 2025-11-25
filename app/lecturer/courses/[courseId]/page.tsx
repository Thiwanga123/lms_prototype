'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Folder, ChevronRight, Plus } from 'lucide-react';
import Breadcrumb from '../../../components/Breadcrumb';

interface Module {
  id: number;
  code: string;
  name: string;
  status: string;
}

const LecturerCourseDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const courseId = params?.courseId as string;

  const courses: Record<string, { id: string; name: string; code: string; modules: Module[] }> = {
    '1': {
      id: '1',
      name: 'CHC50121 Diploma Early Childhood Education and Care',
      code: 'CHC50121',
      modules: [
        {
          id: 1,
          code: 'CHCECE045',
          name: 'Foster positive and respectful interactions and behaviour in children (New) Aspire',
          status: 'Active',
        },
        {
          id: 2,
          code: 'CHCECE046',
          name: 'Implement strategies for the inclusion of all children (New) Aspire',
          status: 'Active',
        },
      ],
    },
  };

  const course = courses[courseId] || {
    id: courseId,
    name: 'Advanced AI',
    code: 'CS401',
    modules: [
      { id: 1, code: 'MOD001', name: 'Introduction to AI', status: 'Active' },
      { id: 2, code: 'MOD002', name: 'Machine Learning Fundamentals', status: 'Active' },
    ],
  };

  const handleModuleClick = (moduleId: number) => {
    router.push(`/lecturer/courses/${courseId}/modules/${moduleId}`);
  };

  return (
    <div className="space-y-4 lg:space-y-6">
      <Breadcrumb
        items={[
          { label: 'Courses and Units', href: '/lecturer/courses' },
          { label: course.name },
        ]}
      />

      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2">{course.name}</h1>
          <p className="text-sm lg:text-base text-gray-600">Course Code: {course.code}</p>
        </div>
        <button className="bg-gradient-to-r from-blue-400 to-purple-500 text-white px-4 lg:px-6 py-2 lg:py-3 rounded-lg text-sm lg:text-base font-semibold hover:from-blue-500 hover:to-purple-600 transition-all shadow-lg flex items-center gap-2">
          <Plus className="w-4 h-4 lg:w-5 lg:h-5" />
          Add Module
        </button>
      </div>

      <div className="bg-white/80 backdrop-blur-sm rounded-lg lg:rounded-xl shadow-lg border border-purple-200/50 p-4 lg:p-6">
        <h2 className="text-lg lg:text-xl font-bold text-gray-800 mb-4 lg:mb-6">Course Modules</h2>
        <div className="space-y-2 lg:space-y-3">
          {course.modules.map((module) => (
            <div
              key={module.id}
              onClick={() => handleModuleClick(module.id)}
              className="flex items-center justify-between p-3 lg:p-4 bg-white rounded-lg border border-purple-200/50 hover:border-purple-400 hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="flex items-center space-x-3 lg:space-x-4 flex-1">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Folder className="w-5 h-5 lg:w-6 lg:h-6 text-yellow-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm lg:text-base font-semibold text-gray-800 group-hover:text-purple-600 transition-colors">
                    {module.code} {module.name}
                  </h3>
                  <p className="text-xs lg:text-sm text-gray-500 mt-1">Status: {module.status}</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LecturerCourseDetailPage;

