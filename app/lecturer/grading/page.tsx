'use client';

import { FileText, Clock, CheckCircle, User, TrendingUp, Sparkles, Edit, X, CheckCircle2, XCircle, Settings } from 'lucide-react';
import { useState } from 'react';

interface Submission {
  id: number;
  course: string;
  assignment: string;
  student: string;
  submitted: string;
  status: 'pending' | 'graded' | 'ai-pending';
  aiScore: number | null;
  plagiarismScore: number | null;
  correctness: number | null;
  grade: string | null;
  feedback: string | null;
  aiStatus?: 'pending' | 'accepted' | 'rejected' | 'adjusted';
  originalAiScore?: number | null;
  originalPlagiarismScore?: number | null;
  originalCorrectness?: number | null;
  originalGrade?: string | null;
}

const GradingPage = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([
    {
      id: 1,
      course: 'CHC50121 Diploma',
      assignment: 'Practice Assignment: Behaviour Observation',
      student: 'Sarah Johnson',
      submitted: '2025-11-10T14:30:00',
      status: 'ai-pending',
      aiScore: 88,
      plagiarismScore: 4,
      correctness: 85,
      grade: 'A',
      feedback: null,
      aiStatus: 'pending',
      originalAiScore: 88,
      originalPlagiarismScore: 4,
      originalCorrectness: 85,
      originalGrade: 'A',
    },
    {
      id: 2,
      course: 'CHCECE045',
      assignment: 'Inclusion Plan Assignment',
      student: 'Michael Brown',
      submitted: '2025-11-09T10:15:00',
      status: 'graded',
      aiScore: 92,
      plagiarismScore: 3,
      correctness: 88,
      grade: 'A',
      feedback: 'Excellent work! Well-structured inclusion plan with practical strategies and strong understanding of inclusive practices.',
      aiStatus: 'accepted',
      originalAiScore: 92,
      originalPlagiarismScore: 3,
      originalCorrectness: 88,
      originalGrade: 'A',
    },
    {
      id: 3,
      course: 'CHC50121 Diploma',
      assignment: 'Practice Assignment: Behaviour Observation',
      student: 'Emma Wilson',
      submitted: '2025-11-10T16:45:00',
      status: 'ai-pending',
      aiScore: 75,
      plagiarismScore: 12,
      correctness: 72,
      grade: 'B',
      feedback: null,
      aiStatus: 'pending',
      originalAiScore: 75,
      originalPlagiarismScore: 12,
      originalCorrectness: 72,
      originalGrade: 'B',
    },
    {
      id: 4,
      course: 'CHCECE046',
      assignment: 'Final Assessment: Comprehensive Inclusion Strategy',
      student: 'David Lee',
      submitted: '2025-11-08T09:20:00',
      status: 'graded',
      aiScore: 82,
      plagiarismScore: 6,
      correctness: 80,
      grade: 'A-',
      feedback: 'Good effort with practical examples, but needs more depth in analysis of inclusion strategies and their implementation.',
      aiStatus: 'adjusted',
      originalAiScore: 78,
      originalPlagiarismScore: 8,
      originalCorrectness: 75,
      originalGrade: 'B+',
    },
  ]);

  const [isGradingModalOpen, setIsGradingModalOpen] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [gradingData, setGradingData] = useState({
    aiScore: 0,
    plagiarismScore: 0,
    correctness: 0,
    grade: '',
    feedback: '',
  });

  const handleOpenGradingModal = (submission: Submission) => {
    setSelectedSubmission(submission);
    if (submission.aiScore !== null) {
      setGradingData({
        aiScore: submission.aiScore,
        plagiarismScore: submission.plagiarismScore || 0,
        correctness: submission.correctness || 0,
        grade: submission.grade || '',
        feedback: submission.feedback || '',
      });
    } else {
      // Simulate AI analysis
      const aiScore = Math.floor(Math.random() * 20) + 80; // 80-100
      const plagiarismScore = Math.floor(Math.random() * 10); // 0-10
      const correctness = Math.floor(Math.random() * 20) + 75; // 75-95
      const grade = aiScore >= 90 ? 'A' : aiScore >= 80 ? 'B+' : aiScore >= 70 ? 'B' : 'C+';
      
      setGradingData({
        aiScore,
        plagiarismScore,
        correctness,
        grade,
        feedback: '',
      });
    }
    setIsGradingModalOpen(true);
  };

  const handleAcceptAI = (submissionId: number) => {
    const submission = submissions.find(s => s.id === submissionId);
    if (submission && submission.aiScore !== null) {
      setSubmissions(submissions.map(s => 
        s.id === submissionId 
          ? { 
              ...s, 
              status: 'graded' as const,
              aiStatus: 'accepted' as const,
              feedback: s.feedback || 'AI assessment accepted. Good work!'
            }
          : s
      ));
      alert('AI assessment accepted and grade finalized!');
    }
  };

  const handleRejectAI = (submissionId: number) => {
    const submission = submissions.find(s => s.id === submissionId);
    if (submission) {
      setSubmissions(submissions.map(s => 
        s.id === submissionId 
          ? { 
              ...s, 
              aiScore: null,
              plagiarismScore: null,
              correctness: null,
              grade: null,
              aiStatus: 'rejected' as const,
              status: 'pending' as const
            }
          : s
      ));
      handleOpenGradingModal({ ...submission, aiScore: null, plagiarismScore: null, correctness: null, grade: null });
      alert('AI assessment rejected. Please provide manual grading.');
    }
  };

  const handleAdjustAI = (submissionId: number) => {
    const submission = submissions.find(s => s.id === submissionId);
    if (submission) {
      handleOpenGradingModal(submission);
    }
  };

  const handleCloseGradingModal = () => {
    setIsGradingModalOpen(false);
    setSelectedSubmission(null);
    setGradingData({
      aiScore: 0,
      plagiarismScore: 0,
      correctness: 0,
      grade: '',
      feedback: '',
    });
  };

  const handleSubmitGrade = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedSubmission) {
      const submission = submissions.find(s => s.id === selectedSubmission.id);
      const isAdjusted = submission && submission.originalAiScore !== null && 
        (submission.originalAiScore !== gradingData.aiScore || 
         submission.originalPlagiarismScore !== gradingData.plagiarismScore ||
         submission.originalCorrectness !== gradingData.correctness);
      
      setSubmissions(submissions.map(s => 
        s.id === selectedSubmission.id 
          ? { 
              ...s, 
              ...gradingData, 
              status: 'graded' as const,
              aiStatus: isAdjusted ? 'adjusted' as const : (s.aiStatus === 'rejected' ? 'rejected' as const : 'accepted' as const),
              originalAiScore: s.originalAiScore || gradingData.aiScore,
              originalPlagiarismScore: s.originalPlagiarismScore || gradingData.plagiarismScore,
              originalCorrectness: s.originalCorrectness || gradingData.correctness,
              originalGrade: s.originalGrade || gradingData.grade,
            }
          : s
      ));
    }
    handleCloseGradingModal();
  };

  const handleDeleteGrade = (id: number) => {
    if (confirm('Are you sure you want to remove the grade for this submission?')) {
      setSubmissions(submissions.map(s => 
        s.id === id 
          ? { ...s, status: 'pending' as const, aiScore: null, plagiarismScore: null, correctness: null, grade: null, feedback: null }
          : s
      ));
    }
  };

  const pendingCount = submissions.filter(s => s.status === 'pending' || s.status === 'ai-pending').length;
  const gradedCount = submissions.filter(s => s.status === 'graded').length;

  return (
    <div className="space-y-4 lg:space-y-6 xl:space-y-8">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-1 lg:mb-2">Grading Center</h1>
        <p className="text-sm lg:text-base text-gray-600">Review and grade student submissions with AI-enhanced feedback</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 xl:gap-6">
        <div className="bg-white/80 backdrop-blur-sm rounded-lg lg:rounded-xl p-4 lg:p-5 shadow-lg border border-purple-200/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-xs lg:text-sm font-medium mb-1">Total Submissions</p>
              <p className="text-2xl lg:text-3xl font-bold text-gray-800">{submissions.length}</p>
            </div>
            <FileText className="w-8 h-8 lg:w-10 lg:h-10 text-blue-500" />
          </div>
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-lg lg:rounded-xl p-4 lg:p-5 shadow-lg border border-purple-200/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-xs lg:text-sm font-medium mb-1">Pending</p>
              <p className="text-2xl lg:text-3xl font-bold text-yellow-600">{pendingCount}</p>
            </div>
            <Clock className="w-8 h-8 lg:w-10 lg:h-10 text-yellow-500" />
          </div>
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-lg lg:rounded-xl p-4 lg:p-5 shadow-lg border border-purple-200/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-xs lg:text-sm font-medium mb-1">Graded</p>
              <p className="text-2xl lg:text-3xl font-bold text-green-600">{gradedCount}</p>
            </div>
            <CheckCircle className="w-8 h-8 lg:w-10 lg:h-10 text-green-500" />
          </div>
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-lg lg:rounded-xl p-4 lg:p-5 shadow-lg border border-purple-200/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-xs lg:text-sm font-medium mb-1">Avg. Grade</p>
              <p className="text-2xl lg:text-3xl font-bold text-purple-600">A-</p>
            </div>
            <TrendingUp className="w-8 h-8 lg:w-10 lg:h-10 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Submissions List */}
      <div className="space-y-3 lg:space-y-4">
        {submissions.map((submission) => (
          <div
            key={submission.id}
            className="bg-white/80 backdrop-blur-sm rounded-lg lg:rounded-xl p-4 lg:p-5 xl:p-6 shadow-lg border border-purple-200/50 hover:shadow-xl transition-all"
          >
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
              <div className="flex-1 min-w-0">
                <h3 className="text-lg lg:text-xl font-bold text-gray-800 mb-1 break-words">{submission.assignment}</h3>
                <div className="flex flex-wrap items-center gap-3 text-xs lg:text-sm">
                  <span className="text-gray-600">{submission.course}</span>
                  <span className="text-gray-400">•</span>
                  <div className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-gray-600" />
                    <span className="text-gray-600">{submission.student}</span>
                  </div>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-600">
                    Submitted: {new Date(submission.submitted).toLocaleString()}
                  </span>
                </div>
              </div>
              <span className={`px-3 py-1.5 rounded-lg text-xs lg:text-sm font-semibold whitespace-nowrap ${
                submission.status === 'graded'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-yellow-100 text-yellow-700'
              }`}>
                {submission.status === 'graded' ? 'Graded' : 'Pending'}
              </span>
            </div>

            {(submission.status === 'graded' || submission.status === 'ai-pending') && submission.aiScore !== null ? (
              <div className="mt-4 p-4 rounded-lg bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-purple-600" />
                    <h4 className="font-semibold text-gray-800">AI-Enhanced Grading Results</h4>
                    {submission.aiStatus && (
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        submission.aiStatus === 'accepted' ? 'bg-green-100 text-green-700' :
                        submission.aiStatus === 'rejected' ? 'bg-red-100 text-red-700' :
                        submission.aiStatus === 'adjusted' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {submission.aiStatus === 'accepted' ? 'Accepted' :
                         submission.aiStatus === 'rejected' ? 'Rejected' :
                         submission.aiStatus === 'adjusted' ? 'Adjusted' : 'Pending Review'}
                      </span>
                    )}
                  </div>
                </div>
                
                {/* Show original AI scores if adjusted */}
                {submission.aiStatus === 'adjusted' && submission.originalAiScore !== null && (
                  <div className="mb-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                    <p className="text-xs font-semibold text-yellow-800 mb-2">Original AI Assessment:</p>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div>
                        <span className="text-gray-600">AI Score: </span>
                        <span className="font-semibold">{submission.originalAiScore}%</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Plagiarism: </span>
                        <span className="font-semibold">{submission.originalPlagiarismScore}%</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Correctness: </span>
                        <span className="font-semibold">{submission.originalCorrectness}%</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Grade: </span>
                        <span className="font-semibold">{submission.originalGrade}</span>
                      </div>
                    </div>
                  </div>
                )}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
                  <div className="bg-white/80 rounded-lg p-3">
                    <p className="text-xs text-gray-600 mb-1">AI Score</p>
                    <p className="text-xl font-bold text-blue-600">{submission.aiScore}%</p>
                  </div>
                  <div className="bg-white/80 rounded-lg p-3">
                    <p className="text-xs text-gray-600 mb-1">Plagiarism</p>
                    <p className="text-xl font-bold text-green-600">{submission.plagiarismScore}%</p>
                    <p className="text-xs text-gray-500">(Lower is better)</p>
                  </div>
                  <div className="bg-white/80 rounded-lg p-3">
                    <p className="text-xs text-gray-600 mb-1">Correctness</p>
                    <p className="text-xl font-bold text-purple-600">{submission.correctness}%</p>
                  </div>
                  <div className="bg-white/80 rounded-lg p-3">
                    <p className="text-xs text-gray-600 mb-1">Final Grade</p>
                    <p className="text-xl font-bold text-indigo-600">{submission.grade}</p>
                  </div>
                </div>
                {submission.feedback && (
                  <div className="bg-white/80 rounded-lg p-3">
                    <p className="text-xs text-gray-600 mb-1">Feedback</p>
                    <p className="text-sm text-gray-800">{submission.feedback}</p>
                  </div>
                )}
                
                {/* Action Buttons for AI Assessment */}
                {submission.status === 'ai-pending' && (
                  <div className="mt-4 pt-4 border-t border-purple-200">
                    <p className="text-xs font-semibold text-gray-700 mb-3">Review AI Assessment:</p>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => handleAcceptAI(submission.id)}
                        className="px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-semibold hover:bg-green-200 transition-all flex items-center gap-2"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        Accept AI Assessment
                      </button>
                      <button
                        onClick={() => handleAdjustAI(submission.id)}
                        className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-lg text-sm font-semibold hover:bg-yellow-200 transition-all flex items-center gap-2"
                      >
                        <Settings className="w-4 h-4" />
                        Adjust Scores
                      </button>
                      <button
                        onClick={() => handleRejectAI(submission.id)}
                        className="px-4 py-2 bg-red-100 text-red-700 rounded-lg text-sm font-semibold hover:bg-red-200 transition-all flex items-center gap-2"
                      >
                        <XCircle className="w-4 h-4" />
                        Reject & Grade Manually
                      </button>
                    </div>
                  </div>
                )}
                
                {/* Edit buttons for graded submissions */}
                {submission.status === 'graded' && (
                  <div className="mt-4 pt-4 border-t border-purple-200 flex gap-2">
                    <button
                      onClick={() => handleAdjustAI(submission.id)}
                      className="px-3 py-1.5 bg-purple-100 text-purple-700 rounded-lg text-xs font-semibold hover:bg-purple-200 transition-all flex items-center gap-1"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      Edit Grade
                    </button>
                    <button
                      onClick={() => handleDeleteGrade(submission.id)}
                      className="px-3 py-1.5 bg-red-100 text-red-700 rounded-lg text-xs font-semibold hover:bg-red-200 transition-all"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>Awaiting grading</span>
                </div>
                <button
                  onClick={() => handleOpenGradingModal(submission)}
                  className="bg-gradient-to-r from-blue-400 to-purple-500 text-white px-4 lg:px-6 py-2 lg:py-3 rounded-lg text-sm lg:text-base font-semibold hover:from-blue-500 hover:to-purple-600 transition-all shadow-lg flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 lg:w-5 lg:h-5" />
                  Grade with AI
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Grading Modal */}
      {isGradingModalOpen && selectedSubmission && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">Grade Assignment</h2>
              <button
                onClick={handleCloseGradingModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="mb-4 p-3 bg-purple-50 rounded-lg">
              <p className="text-sm font-semibold text-gray-800">{selectedSubmission.assignment}</p>
              <p className="text-xs text-gray-600">Course: {selectedSubmission.course} | Student: {selectedSubmission.student}</p>
            </div>
            {/* Show AI Assessment if available */}
            {selectedSubmission.aiScore !== null && selectedSubmission.originalAiScore !== null && (
              <div className="mb-4 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-5 h-5 text-purple-600" />
                  <h3 className="font-semibold text-gray-800">AI Assessment Results</h3>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                  <div>
                    <p className="text-xs text-gray-600">AI Score</p>
                    <p className="font-bold text-blue-600">{selectedSubmission.originalAiScore}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Plagiarism</p>
                    <p className="font-bold text-green-600">{selectedSubmission.originalPlagiarismScore}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Correctness</p>
                    <p className="font-bold text-purple-600">{selectedSubmission.originalCorrectness}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Suggested Grade</p>
                    <p className="font-bold text-indigo-600">{selectedSubmission.originalGrade}</p>
                  </div>
                </div>
              </div>
            )}
            
            <form onSubmit={handleSubmitGrade} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {selectedSubmission.aiScore !== null ? 'Adjust Scores (or keep AI scores)' : 'Enter Scores'}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">AI Score (%)</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={gradingData.aiScore}
                      onChange={(e) => setGradingData({ ...gradingData, aiScore: parseInt(e.target.value) || 0 })}
                      className="w-full px-4 py-2 rounded-lg border border-purple-200 focus:ring-2 focus:ring-purple-300 outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Plagiarism (%)</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={gradingData.plagiarismScore}
                      onChange={(e) => setGradingData({ ...gradingData, plagiarismScore: parseInt(e.target.value) || 0 })}
                      className="w-full px-4 py-2 rounded-lg border border-purple-200 focus:ring-2 focus:ring-purple-300 outline-none"
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">Lower is better</p>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Correctness (%)</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={gradingData.correctness}
                      onChange={(e) => setGradingData({ ...gradingData, correctness: parseInt(e.target.value) || 0 })}
                      className="w-full px-4 py-2 rounded-lg border border-purple-200 focus:ring-2 focus:ring-purple-300 outline-none"
                      required
                    />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Final Grade</label>
                <select
                  value={gradingData.grade}
                  onChange={(e) => setGradingData({ ...gradingData, grade: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-purple-200 focus:ring-2 focus:ring-purple-300 outline-none"
                  required
                >
                  <option value="">Select Grade</option>
                  <option value="A+">A+</option>
                  <option value="A">A</option>
                  <option value="B+">B+</option>
                  <option value="B">B</option>
                  <option value="C+">C+</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                  <option value="F">F</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Feedback</label>
                <textarea
                  value={gradingData.feedback}
                  onChange={(e) => setGradingData({ ...gradingData, feedback: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-purple-200 focus:ring-2 focus:ring-purple-300 outline-none"
                  rows={4}
                  placeholder="Enter feedback for the student..."
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleCloseGradingModal}
                  className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-400 to-purple-500 text-white rounded-lg font-semibold hover:from-blue-500 hover:to-purple-600 transition-all"
                >
                  {selectedSubmission.status === 'graded' ? 'Update Grade' : 'Submit Grade'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GradingPage;
