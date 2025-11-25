'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Folder, FileText, User, Calendar, Video, Presentation, Link as LinkIcon, X, Plus, Upload, Edit, Trash2 } from 'lucide-react';
import Breadcrumb from '../../../../../components/Breadcrumb';

interface ContentItem {
  id: number;
  name: string;
  type: 'folder' | 'document';
  date: string;
  author: string;
  content?: FolderContent;
}

interface FolderContent {
  materials?: Material[];
  assignments?: Assignment[];
  quizzes?: Quiz[];
  documents?: Document[];
}

interface Material {
  id: number;
  title: string;
  type: 'pdf' | 'video' | 'image' | 'link' | 'presentation';
  url?: string;
  description: string;
}

interface Assignment {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  submissions: number;
  graded: number;
}

interface Quiz {
  id: number;
  title: string;
  questions: number;
  attempts: number;
  avgScore: number;
}

interface Document {
  id: number;
  name: string;
  type: string;
  size: string;
}

const LecturerModuleDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const courseId = params?.courseId as string;
  const moduleId = params?.moduleId as string;
  const [selectedFolder, setSelectedFolder] = useState<ContentItem | null>(null);

  const courses: Record<string, { name: string; code: string }> = {
    '1': {
      name: 'CHC50121 Diploma Early Childhood Education and Care',
      code: 'CHC50121',
    },
  };

  const modules: Record<string, Record<string, { code: string; name: string; content: ContentItem[] }>> = {
    '1': {
      '1': {
        code: 'CHCECE045',
        name: 'Foster positive and respectful interactions and behaviour in children (New) Aspire',
        content: [
          {
            id: 1,
            name: '1. Introduction',
            type: 'folder',
            date: 'March 6, 2025',
            author: 'Chris Sadea',
            content: {
              materials: [
                {
                  id: 1,
                  title: 'Introduction to Positive Behaviour Support',
                  type: 'pdf',
                  description: 'Overview of positive behaviour support strategies in early childhood settings',
                },
                {
                  id: 2,
                  title: 'Video: Building Respectful Relationships',
                  type: 'video',
                  description: 'Interactive video demonstrating respectful interaction techniques',
                },
                {
                  id: 3,
                  title: 'Understanding Child Development Stages',
                  type: 'link',
                  url: 'https://example.com/child-development',
                  description: 'External resource on child development milestones',
                },
              ],
            },
          },
          {
            id: 2,
            name: '2. Practice Assessment',
            type: 'folder',
            date: 'March 6, 2025',
            author: 'Chris Sadea',
            content: {
              assignments: [
                {
                  id: 1,
                  title: 'Practice Assignment: Behaviour Observation',
                  description: 'Observe and document positive interactions in a childcare setting.',
                  dueDate: '2025-11-15',
                  submissions: 42,
                  graded: 38,
                },
              ],
              quizzes: [
                {
                  id: 1,
                  title: 'Practice Quiz: Positive Interactions',
                  questions: 10,
                  attempts: 45,
                  avgScore: 85,
                },
              ],
            },
          },
          {
            id: 3,
            name: '3. Final Assessment',
            type: 'folder',
            date: 'March 6, 2025',
            author: 'Chris Sadea',
            content: {
              assignments: [
                {
                  id: 2,
                  title: 'Final Assessment: Behaviour Management Plan',
                  description: 'Develop a comprehensive behaviour management plan for a childcare setting.',
                  dueDate: '2025-11-30',
                  submissions: 0,
                  graded: 0,
                },
              ],
            },
          },
          {
            id: 4,
            name: '4. Mapping',
            type: 'folder',
            date: 'March 6, 2025',
            author: 'Chris Sadea',
            content: {
              documents: [
                {
                  id: 1,
                  name: 'Competency Mapping - CHCECE045',
                  type: 'PDF',
                  size: '2.3 MB',
                },
                {
                  id: 2,
                  name: 'Assessment Mapping Guide',
                  type: 'PDF',
                  size: '1.8 MB',
                },
              ],
            },
          },
          {
            id: 5,
            name: '5. PowerPoint and Learning Support',
            type: 'folder',
            date: 'March 6, 2025',
            author: 'Chris Sadea',
            content: {
              materials: [
                {
                  id: 4,
                  title: 'Positive Behaviour Support Strategies',
                  type: 'presentation',
                  description: 'PowerPoint presentation covering key strategies and techniques',
                },
                {
                  id: 5,
                  title: 'Case Studies: Real-world Applications',
                  type: 'pdf',
                  description: 'Collection of case studies demonstrating positive behaviour support',
                },
              ],
            },
          },
          { id: 6, name: 'CHCECE045DLG.docx', type: 'document', date: 'March 6, 2025', author: 'Chris Sadea' },
        ],
      },
      '2': {
        code: 'CHCECE046',
        name: 'Implement strategies for the inclusion of all children (New) Aspire',
        content: [
          {
            id: 1,
            name: '1. Introduction',
            type: 'folder',
            date: 'March 6, 2025',
            author: 'Chris Sadea',
            content: {
              materials: [
                {
                  id: 1,
                  title: 'Introduction to Inclusive Practices',
                  type: 'pdf',
                  description: 'Overview of inclusive education strategies in early childhood settings',
                },
                {
                  id: 2,
                  title: 'Video: Creating Inclusive Environments',
                  type: 'video',
                  description: 'Video demonstration of inclusive practices and adaptations',
                },
              ],
            },
          },
          {
            id: 2,
            name: '2. Practice Assessment',
            type: 'folder',
            date: 'March 6, 2025',
            author: 'Chris Sadea',
            content: {
              assignments: [
                {
                  id: 3,
                  title: 'Practice Assignment: Inclusion Plan',
                  description: 'Develop an inclusion plan for a child with specific needs.',
                  dueDate: '2025-11-20',
                  submissions: 40,
                  graded: 35,
                },
              ],
              quizzes: [
                {
                  id: 2,
                  title: 'Practice Quiz: Inclusion Strategies',
                  questions: 12,
                  attempts: 42,
                  avgScore: 82,
                },
              ],
            },
          },
          {
            id: 3,
            name: '3. Final Assessment',
            type: 'folder',
            date: 'March 6, 2025',
            author: 'Chris Sadea',
            content: {
              assignments: [
                {
                  id: 4,
                  title: 'Final Assessment: Comprehensive Inclusion Strategy',
                  description: 'Create a comprehensive inclusion strategy document for a childcare centre.',
                  dueDate: '2025-12-05',
                  submissions: 0,
                  graded: 0,
                },
              ],
            },
          },
          {
            id: 4,
            name: '4. Mapping',
            type: 'folder',
            date: 'March 6, 2025',
            author: 'Chris Sadea',
            content: {
              documents: [
                {
                  id: 3,
                  name: 'Competency Mapping - CHCECE046',
                  type: 'PDF',
                  size: '2.1 MB',
                },
              ],
            },
          },
          {
            id: 5,
            name: '5. PowerPoint and Learning Support',
            type: 'folder',
            date: 'March 6, 2025',
            author: 'Chris Sadea',
            content: {
              materials: [
                {
                  id: 7,
                  title: 'Inclusive Practices Presentation',
                  type: 'presentation',
                  description: 'Comprehensive PowerPoint on inclusive education strategies',
                },
                {
                  id: 8,
                  title: 'Resource Guide: Supporting All Children',
                  type: 'pdf',
                  description: 'Resource guide with tools and templates for inclusion',
                },
              ],
            },
          },
          { id: 6, name: 'GECECE046DLG.docx', type: 'document', date: 'March 6, 2025', author: 'Chris Sadea' },
        ],
      },
    },
  };

  const course = courses[courseId] || { name: 'Advanced AI', code: 'CS401' };
  const module = modules[courseId]?.[moduleId] || {
    code: 'MOD001',
    name: 'Introduction to AI',
    content: [
      { id: 1, name: '1. Introduction', type: 'folder', date: 'March 6, 2025', author: 'Dr. Sarah Johnson' },
    ],
  };

  const handleItemClick = (item: ContentItem) => {
    if (item.type === 'folder' && item.content) {
      setSelectedFolder(item);
    } else if (item.type === 'document') {
      alert(`Opening document: ${item.name}`);
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'folder':
        return <Folder className="w-5 h-5 lg:w-6 lg:h-6 text-yellow-600" />;
      case 'document':
        return <FileText className="w-5 h-5 lg:w-6 lg:h-6 text-blue-600" />;
      case 'video':
        return <Video className="w-5 h-5 lg:w-6 lg:h-6 text-red-600" />;
      case 'presentation':
        return <Presentation className="w-5 h-5 lg:w-6 lg:h-6 text-purple-600" />;
      case 'link':
        return <LinkIcon className="w-5 h-5 lg:w-6 lg:h-6 text-green-600" />;
      default:
        return <FileText className="w-5 h-5 lg:w-6 lg:h-6 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-4 lg:space-y-6">
      <Breadcrumb
        items={[
          { label: 'Courses and Units', href: '/lecturer/courses' },
          { label: course.name, href: `/lecturer/courses/${courseId}` },
          { label: `${module.code} ${module.name}` },
        ]}
      />

      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold text-gray-800 mb-2">
            {module.code} {module.name}
          </h1>
          <p className="text-sm lg:text-base text-gray-600">Course: {course.name}</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-blue-100 text-blue-700 px-3 lg:px-4 py-2 rounded-lg text-sm lg:text-base font-semibold hover:bg-blue-200 transition-all flex items-center gap-2">
            <Upload className="w-4 h-4" />
            Upload
          </button>
          <button className="bg-gradient-to-r from-blue-400 to-purple-500 text-white px-3 lg:px-4 py-2 rounded-lg text-sm lg:text-base font-semibold hover:from-blue-500 hover:to-purple-600 transition-all flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Content
          </button>
        </div>
      </div>

      <div className="bg-white/80 backdrop-blur-sm rounded-lg lg:rounded-xl shadow-lg border border-purple-200/50 p-4 lg:p-6">
        <h2 className="text-lg lg:text-xl font-bold text-gray-800 mb-4 lg:mb-6">Module Content</h2>
        <div className="space-y-0 divide-y divide-gray-200">
          {module.content.map((item) => (
            <div
              key={item.id}
              onClick={() => handleItemClick(item)}
              className="flex items-center justify-between p-3 lg:p-4 hover:bg-purple-50 transition-colors cursor-pointer group"
            >
              <div className="flex items-center space-x-3 lg:space-x-4 flex-1 min-w-0">
                <div className={`p-2 rounded-lg flex-shrink-0 ${
                  item.type === 'folder' 
                    ? 'bg-yellow-100' 
                    : 'bg-blue-100'
                }`}>
                  {getIcon(item.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm lg:text-base font-medium text-gray-800 group-hover:text-purple-600 transition-colors truncate">
                    {item.name}
                  </h3>
                </div>
                <div className="flex items-center space-x-4 flex-shrink-0">
                  <div className="flex items-center space-x-2 text-xs lg:text-sm text-gray-500">
                    <Calendar className="w-4 h-4" />
                    <span>{item.date}</span>
                  </div>
                  <div className="px-2 lg:px-3 py-1 bg-gray-100 rounded-lg text-xs lg:text-sm text-gray-700 flex items-center space-x-1">
                    <User className="w-3 h-3 lg:w-4 lg:h-4" />
                    <span>{item.author}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Folder Detail Modal */}
      {selectedFolder && selectedFolder.content && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">{selectedFolder.name}</h2>
              <button
                onClick={() => setSelectedFolder(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Materials Section */}
            {selectedFolder.content.materials && selectedFolder.content.materials.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-800">Learning Materials</h3>
                  <button className="px-3 py-1.5 bg-purple-100 text-purple-700 rounded-lg text-sm font-semibold hover:bg-purple-200 transition-all flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Add Material
                  </button>
                </div>
                <div className="space-y-3">
                  {selectedFolder.content.materials.map((material) => (
                    <div
                      key={material.id}
                      className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-purple-300 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3 flex-1">
                          <div className="p-2 bg-purple-100 rounded-lg">
                            {getIcon(material.type)}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-800 mb-1">{material.title}</h4>
                            <p className="text-sm text-gray-600 mb-2">{material.description}</p>
                            {material.url && (
                              <a
                                href={material.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-purple-600 hover:text-purple-700 font-medium"
                              >
                                Open Link →
                              </a>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-gray-600 hover:text-red-600 transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Assignments Section */}
            {selectedFolder.content.assignments && selectedFolder.content.assignments.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-800">Assignments</h3>
                  <button className="px-3 py-1.5 bg-purple-100 text-purple-700 rounded-lg text-sm font-semibold hover:bg-purple-200 transition-all flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Add Assignment
                  </button>
                </div>
                <div className="space-y-3">
                  {selectedFolder.content.assignments.map((assignment) => (
                    <div
                      key={assignment.id}
                      className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-purple-300 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-gray-800">{assignment.title}</h4>
                        <div className="flex gap-2">
                          <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-gray-600 hover:text-red-600 transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{assignment.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                          <span>Submissions: {assignment.submissions}</span>
                          <span>Graded: {assignment.graded}</span>
                        </div>
                        <button
                          onClick={() => router.push(`/lecturer/grading?assignment=${assignment.id}`)}
                          className="px-3 py-1.5 bg-purple-100 text-purple-700 rounded-lg text-sm font-semibold hover:bg-purple-200 transition-all"
                        >
                          Grade Submissions
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quizzes Section */}
            {selectedFolder.content.quizzes && selectedFolder.content.quizzes.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-800">Quizzes</h3>
                  <button className="px-3 py-1.5 bg-purple-100 text-purple-700 rounded-lg text-sm font-semibold hover:bg-purple-200 transition-all flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Add Quiz
                  </button>
                </div>
                <div className="space-y-3">
                  {selectedFolder.content.quizzes.map((quiz) => (
                    <div
                      key={quiz.id}
                      className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-purple-300 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-gray-800">{quiz.title}</h4>
                        <div className="flex gap-2">
                          <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-gray-600 hover:text-red-600 transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span>{quiz.questions} questions</span>
                          <span>Attempts: {quiz.attempts}</span>
                          <span>Avg Score: {quiz.avgScore}%</span>
                        </div>
                        <button
                          onClick={() => router.push(`/lecturer/quizzes?quiz=${quiz.id}`)}
                          className="px-3 py-1.5 bg-purple-100 text-purple-700 rounded-lg text-sm font-semibold hover:bg-purple-200 transition-all"
                        >
                          Manage Quiz
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Documents Section */}
            {selectedFolder.content.documents && selectedFolder.content.documents.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-800">Documents</h3>
                  <button className="px-3 py-1.5 bg-purple-100 text-purple-700 rounded-lg text-sm font-semibold hover:bg-purple-200 transition-all flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Add Document
                  </button>
                </div>
                <div className="space-y-3">
                  {selectedFolder.content.documents.map((doc) => (
                    <div
                      key={doc.id}
                      className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-purple-300 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <FileText className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-800">{doc.name}</h4>
                            <p className="text-sm text-gray-600">{doc.type} • {doc.size}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-sm font-semibold hover:bg-blue-200 transition-all">
                            Download
                          </button>
                          <button className="p-2 text-gray-600 hover:text-red-600 transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LecturerModuleDetailPage;
