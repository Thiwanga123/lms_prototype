'use client';

import { Plus, FileText, Clock, Users, CheckCircle, Edit, Trash2, X, Paperclip, Sparkles, Loader2 } from 'lucide-react';
import { useState } from 'react';

interface Assignment {
  id: number;
  course: string;
  title: string;
  description: string;
  dueDate: string;
  submissions: number;
  total: number;
  status: string;
  file?: File | null;
}

const AssignmentsPage = () => {
  const [assignments, setAssignments] = useState<Assignment[]>([
    { 
      id: 1, 
      course: 'CHC50121 Diploma', 
      title: 'Practice Assignment: Behaviour Observation', 
      description: 'Observe and document positive interactions in a childcare setting. Submit a 500-word reflection on observed behaviours, including strategies used by educators and their effectiveness.',
      dueDate: '2025-11-15', 
      submissions: 42, 
      total: 45, 
      status: 'Active' 
    },
    { 
      id: 2, 
      course: 'CHCECE045', 
      title: 'Inclusion Plan Assignment', 
      description: 'Develop an inclusion plan for a child with specific needs. Include adaptations, support strategies, and how you would collaborate with families and other professionals.',
      dueDate: '2025-11-18', 
      submissions: 28, 
      total: 32, 
      status: 'Active' 
    },
    { 
      id: 3, 
      course: 'CHC50121 Diploma', 
      title: 'Final Assessment: Behaviour Management Plan', 
      description: 'Develop a comprehensive behaviour management plan for a childcare setting. Include strategies for fostering positive interactions, addressing challenging behaviours, and creating an inclusive environment. Submit a 2000-word report with supporting documentation.',
      dueDate: '2025-11-30', 
      submissions: 0, 
      total: 45, 
      status: 'Active' 
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAssignment, setEditingAssignment] = useState<Assignment | null>(null);
  const [isAIGenerating, setIsAIGenerating] = useState(false);
  const [aiGenerationProgress, setAiGenerationProgress] = useState(0);
  const [formData, setFormData] = useState({
    course: '',
    title: '',
    description: '',
    dueDate: '',
    status: 'Active',
    file: null as File | null,
  });

  const courses = ['CHC50121 Diploma Early Childhood Education and Care', 'CHCECE045 - Foster Positive Interactions', 'CHCECE046 - Inclusion Strategies'];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, file: file });
    }
  };

  const handleOpenModal = (assignment?: Assignment) => {
    if (assignment) {
      setEditingAssignment(assignment);
      setFormData({
        course: assignment.course,
        title: assignment.title,
        description: assignment.description,
        dueDate: assignment.dueDate,
        status: assignment.status,
        file: null,
      });
    } else {
      setEditingAssignment(null);
      setFormData({
        course: '',
        title: '',
        description: '',
        dueDate: '',
        status: 'Active',
        file: null,
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingAssignment(null);
    setFormData({
      course: '',
      title: '',
      description: '',
      dueDate: '',
      status: 'Active',
      file: null,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingAssignment) {
      setAssignments(assignments.map(a => 
        a.id === editingAssignment.id 
          ? { 
              ...editingAssignment, 
              course: formData.course,
              title: formData.title,
              description: formData.description,
              dueDate: formData.dueDate,
              status: formData.status,
              submissions: editingAssignment.submissions,
              total: editingAssignment.total
            }
          : a
      ));
    } else {
      const newAssignment: Assignment = {
        id: assignments.length + 1,
        course: formData.course,
        title: formData.title,
        description: formData.description,
        dueDate: formData.dueDate,
        status: formData.status,
        submissions: 0,
        total: 45, // Default total students
        file: formData.file,
      };
      setAssignments([...assignments, newAssignment]);
    }
    handleCloseModal();
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this assignment?')) {
      setAssignments(assignments.filter(a => a.id !== id));
    }
  };

  const handleAIGenerateAssignment = async () => {
    if (!formData.course || !formData.title) {
      alert('Please fill in course and title first');
      return;
    }

    setIsAIGenerating(true);
    setAiGenerationProgress(0);

    // Simulate AI generation with progress
    const progressInterval = setInterval(() => {
      setAiGenerationProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 300);

    // Simulate AI generating assignment description
    setTimeout(() => {
      clearInterval(progressInterval);
      setAiGenerationProgress(100);

      const aiGeneratedDescription = `This assignment focuses on ${formData.title} within the context of ${formData.course}. 

Students are required to:
1. Demonstrate a comprehensive understanding of early childhood education principles
2. Apply theoretical knowledge to practical childcare scenarios
3. Analyze and evaluate different approaches to supporting children's development
4. Present findings in a clear and structured format that reflects professional practice

The assignment should include:
- A detailed analysis of the topic relevant to early childhood settings
- Real-world applications and examples from childcare environments
- Critical evaluation of current practices and their impact on children
- Recommendations for improvement based on evidence-based practices
- Consideration of cultural diversity and inclusion

Submission Requirements:
- Minimum 1500-2000 words (for written assignments)
- Proper citations and references using academic standards
- Clear structure with introduction, body, and conclusion
- Professional formatting and presentation
- Reflection on practical implications for childcare practice

Assessment Criteria:
- Understanding of early childhood principles (30%)
- Application to practical scenarios (30%)
- Critical analysis and reflection (25%)
- Professional presentation and formatting (15%)`;

      setFormData({ ...formData, description: aiGeneratedDescription });
      setIsAIGenerating(false);
      setAiGenerationProgress(0);
      alert('AI has successfully generated assignment description and requirements!');
    }, 2000);
  };

  return (
    <div className="space-y-4 lg:space-y-6 xl:space-y-8">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-1 lg:mb-2">Assignments</h1>
          <p className="text-sm lg:text-base text-gray-600">Create and manage assignments for your courses</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-gradient-to-r from-blue-400 to-purple-500 text-white px-4 lg:px-6 py-2 lg:py-3 rounded-lg text-sm lg:text-base font-semibold hover:from-blue-500 hover:to-purple-600 transition-all shadow-lg flex items-center justify-center gap-2"
        >
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
                  <h3 className="text-lg lg:text-xl font-bold text-gray-800 mb-2 break-words">{assignment.title}</h3>
                  <p className="text-sm lg:text-base text-gray-600 mb-2">{assignment.course}</p>
                  <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg border border-gray-200">
                    {assignment.description}
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className={`px-3 lg:px-4 py-1.5 lg:py-2 rounded-lg text-xs lg:text-sm font-semibold whitespace-nowrap ${
                    assignment.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {assignment.status}
                  </span>
                  <span className="px-3 lg:px-4 py-1.5 lg:py-2 bg-blue-100 text-blue-700 rounded-lg text-xs lg:text-sm font-semibold whitespace-nowrap">
                    Due: {new Date(assignment.dueDate).toLocaleDateString()}
                  </span>
                </div>
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
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleOpenModal(assignment)}
                    className="px-3 lg:px-4 py-2 bg-purple-100 text-purple-700 rounded-lg text-xs lg:text-sm font-semibold hover:bg-purple-200 transition-all flex items-center gap-1.5 lg:gap-2"
                  >
                    <Edit className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(assignment.id)}
                    className="px-3 lg:px-4 py-2 bg-red-100 text-red-700 rounded-lg text-xs lg:text-sm font-semibold hover:bg-red-200 transition-all flex items-center gap-1.5 lg:gap-2"
                  >
                    <Trash2 className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                    Delete
                  </button>
                  <button className="px-3 lg:px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-xs lg:text-sm font-semibold hover:bg-blue-200 transition-all flex items-center gap-1.5 lg:gap-2">
                    <Users className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                    View Submissions
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                {editingAssignment ? 'Edit Assignment' : 'Create New Assignment'}
              </h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Course</label>
                <select
                  value={formData.course}
                  onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-purple-200 focus:ring-2 focus:ring-purple-300 outline-none"
                  required
                >
                  <option value="">Select Course</option>
                  {courses.map(course => (
                    <option key={course} value={course}>{course}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Assignment Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-purple-200 focus:ring-2 focus:ring-purple-300 outline-none"
                  placeholder="Enter assignment title"
                  required
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">Assignment Description</label>
                  <button
                    type="button"
                    onClick={handleAIGenerateAssignment}
                    disabled={isAIGenerating || !formData.course || !formData.title}
                    className="px-3 py-1.5 bg-gradient-to-r from-blue-400 to-purple-500 text-white rounded-lg text-xs font-semibold hover:from-blue-500 hover:to-purple-600 transition-all flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isAIGenerating ? (
                      <>
                        <Loader2 className="w-3 h-3 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3 h-3" />
                        AI Generate
                      </>
                    )}
                  </button>
                </div>
                {isAIGenerating && (
                  <div className="mb-2 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-purple-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="w-4 h-4 text-purple-600 animate-pulse" />
                      <span className="text-xs font-semibold text-gray-800">AI is generating assignment description...</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-400 to-purple-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${aiGenerationProgress}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-600 mt-1">{aiGenerationProgress}% complete</p>
                  </div>
                )}
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-purple-200 focus:ring-2 focus:ring-purple-300 outline-none"
                  rows={8}
                  placeholder="Provide detailed instructions for the assignment..."
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
                <input
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-purple-200 focus:ring-2 focus:ring-purple-300 outline-none"
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Attach Assignment Document (Optional)</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-purple-200 border-dashed rounded-lg hover:border-purple-300 transition-colors">
                  <div className="space-y-1 text-center">
                    <Paperclip className="mx-auto h-8 w-8 text-purple-400" />
                    <div className="flex text-sm text-gray-600">
                      <label className="relative cursor-pointer bg-white rounded-md font-medium text-purple-600 hover:text-purple-500">
                        <span>Upload a file</span>
                        <input
                          type="file"
                          className="sr-only"
                          onChange={handleFileChange}
                          accept=".pdf,.doc,.docx,.txt"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PDF, DOC, DOCX, TXT up to 10MB
                    </p>
                    {formData.file && (
                      <p className="text-xs text-green-600 mt-2">
                        Selected: {formData.file.name}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-purple-200 focus:ring-2 focus:ring-purple-300 outline-none"
                >
                  <option value="Active">Active</option>
                  <option value="Draft">Draft</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-400 to-purple-500 text-white rounded-lg font-semibold hover:from-blue-500 hover:to-purple-600 transition-all"
                >
                  {editingAssignment ? 'Update Assignment' : 'Create Assignment'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignmentsPage;
