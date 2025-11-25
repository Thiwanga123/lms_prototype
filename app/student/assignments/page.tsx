'use client';

import { Upload, CheckCircle, Clock, FileText, Sparkles, Eye, Paperclip, X, Loader2, Brain } from 'lucide-react';
import { useState } from 'react';

interface Assignment {
  id: number;
  course: string;
  title: string;
  description: string;
  dueDate: string;
  status: 'pending' | 'submitted' | 'graded';
  submitted: boolean;
  submittedDate?: string;
  submittedFile?: File | null;
  aiScore: number | null;
  plagiarismScore: number | null;
  correctness: number | null;
  grade: string | null;
  feedback: string | null;
}

const AssignmentsPage = () => {
  const [assignments, setAssignments] = useState<Assignment[]>([
    { 
      id: 1, 
      course: 'CHC50121 Diploma', 
      title: 'Practice Assignment: Behaviour Observation', 
      description: 'Observe and document positive interactions in a childcare setting. Submit a 500-word reflection on observed behaviours, including strategies used by educators and their effectiveness. Include specific examples and your analysis of what makes interactions positive and respectful.',
      dueDate: '2025-11-15', 
      status: 'pending',
      submitted: false,
      aiScore: null,
      plagiarismScore: null,
      correctness: null,
      grade: null,
      feedback: null,
    },
    { 
      id: 2, 
      course: 'CHCECE045', 
      title: 'Inclusion Plan Assignment', 
      description: 'Develop an inclusion plan for a child with specific needs. Include adaptations, support strategies, and how you would collaborate with families and other professionals. Your plan should demonstrate understanding of inclusive practices and child-centered approaches.',
      dueDate: '2025-11-18', 
      status: 'graded',
      submitted: true,
      submittedDate: '2025-11-10',
      aiScore: 92,
      plagiarismScore: 3,
      correctness: 88,
      grade: 'A',
      feedback: 'Excellent work! Well-structured inclusion plan with practical strategies and strong understanding of inclusive practices. Your collaboration approach is well thought out.',
    },
    { 
      id: 3, 
      course: 'CHC50121 Diploma', 
      title: 'Final Assessment: Behaviour Management Plan', 
      description: 'Develop a comprehensive behaviour management plan for a childcare setting. Include strategies for fostering positive interactions, addressing challenging behaviours, and creating an inclusive environment. Submit a 2000-word report with supporting documentation.',
      dueDate: '2025-11-30', 
      status: 'submitted',
      submitted: true,
      submittedDate: '2025-11-12',
      aiScore: null,
      plagiarismScore: null,
      correctness: null,
      grade: null,
      feedback: null,
    },
  ]);

  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submissionFile, setSubmissionFile] = useState<File | null>(null);
  const [submissionText, setSubmissionText] = useState('');
  const [isAIMarking, setIsAIMarking] = useState(false);
  const [aiMarkingProgress, setAiMarkingProgress] = useState(0);
  const [aiMarkingStage, setAiMarkingStage] = useState('');

  const handleOpenAssignment = (assignment: Assignment) => {
    setSelectedAssignment(assignment);
    setSubmissionFile(assignment.submittedFile || null);
    setSubmissionText('');
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAssignment(null);
    setSubmissionFile(null);
    setSubmissionText('');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSubmissionFile(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!submissionFile && !submissionText.trim()) {
      alert('Please upload a file or provide text submission');
      return;
    }

    if (selectedAssignment) {
      // Start AI marking process
      setIsAIMarking(true);
      setAiMarkingProgress(0);
      setAiMarkingStage('Analyzing submission...');

      // Simulate AI marking stages with progress
      const markingStages = [
        { progress: 20, stage: 'Analyzing content structure...' },
        { progress: 40, stage: 'Evaluating correctness and accuracy...' },
        { progress: 60, stage: 'Checking for plagiarism...' },
        { progress: 80, stage: 'Assessing quality and depth...' },
        { progress: 100, stage: 'Generating final scores...' },
      ];

      let currentStage = 0;
      const progressInterval = setInterval(() => {
        if (currentStage < markingStages.length) {
          setAiMarkingProgress(markingStages[currentStage].progress);
          setAiMarkingStage(markingStages[currentStage].stage);
          currentStage++;
        } else {
          clearInterval(progressInterval);
        }
      }, 500);

      // Complete AI analysis after stages
      setTimeout(() => {
        clearInterval(progressInterval);
        
        // Generate realistic AI scores
        const aiScore = Math.floor(Math.random() * 25) + 75; // 75-100
        const plagiarismScore = Math.floor(Math.random() * 10) + 2; // 2-12 (lower is better)
        const correctness = Math.floor(Math.random() * 20) + 75; // 75-95
        
        // Calculate final grade based on scores
        let grade = 'F';
        const avgScore = (aiScore + correctness - plagiarismScore) / 2;
        if (avgScore >= 90) grade = 'A+';
        else if (avgScore >= 85) grade = 'A';
        else if (avgScore >= 80) grade = 'A-';
        else if (avgScore >= 75) grade = 'B+';
        else if (avgScore >= 70) grade = 'B';
        else if (avgScore >= 65) grade = 'B-';
        else if (avgScore >= 60) grade = 'C+';
        else if (avgScore >= 55) grade = 'C';
        else if (avgScore >= 50) grade = 'C-';
        else grade = 'F';

        const loadingScores = { aiScore, plagiarismScore, correctness, grade };
        
        // Update assignment with real-time AI scores
        setAssignments(assignments.map(a => 
          a.id === selectedAssignment.id 
            ? { 
                ...a, 
                submitted: true, 
                status: 'graded',
                submittedDate: new Date().toISOString(),
                submittedFile: submissionFile,
                aiScore: loadingScores.aiScore,
                plagiarismScore: loadingScores.plagiarismScore,
                correctness: loadingScores.correctness,
                grade: loadingScores.grade,
                feedback: `AI Analysis Complete: Your assignment has been thoroughly analyzed. AI Score: ${loadingScores.aiScore}%, Plagiarism: ${loadingScores.plagiarismScore}% (lower is better), Correctness: ${loadingScores.correctness}%.`
              }
            : a
        ));
        
        // Update selected assignment to show results
        setSelectedAssignment({
          ...selectedAssignment,
          submitted: true,
          status: 'graded',
          submittedDate: new Date().toISOString(),
          submittedFile: submissionFile,
          aiScore: loadingScores.aiScore,
          plagiarismScore: loadingScores.plagiarismScore,
          correctness: loadingScores.correctness,
          grade: loadingScores.grade,
          feedback: `AI Analysis Complete: Your assignment has been thoroughly analyzed. AI Score: ${loadingScores.aiScore}%, Plagiarism: ${loadingScores.plagiarismScore}% (lower is better), Correctness: ${loadingScores.correctness}%.`
        });
        
        setIsAIMarking(false);
        setAiMarkingProgress(0);
        setAiMarkingStage('');
      }, 3000);
    }
  };

  const handleDeleteSubmission = (id: number) => {
    if (confirm('Are you sure you want to delete your submission? You can resubmit before the due date.')) {
      setAssignments(assignments.map(a => 
        a.id === id 
          ? { 
              ...a, 
              submitted: false, 
              status: 'pending',
              submittedDate: undefined,
              submittedFile: null
            }
          : a
      ));
    }
  };

  return (
    <div className="space-y-4 lg:space-y-6 xl:space-y-8">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-1 lg:mb-2">My Assignments</h1>
        <p className="text-sm lg:text-base text-gray-600">View assignments, submit your work, and track your progress</p>
      </div>

      <div className="space-y-3 lg:space-y-4">
        {assignments.map((assignment) => {
          const isOverdue = new Date(assignment.dueDate) < new Date() && !assignment.submitted;
          return (
            <div
              key={assignment.id}
              className="bg-white/80 backdrop-blur-sm rounded-lg lg:rounded-xl p-4 lg:p-5 xl:p-6 shadow-lg border border-purple-200/50 hover:shadow-xl transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3 lg:mb-4">
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg lg:text-xl font-bold text-gray-800 mb-1 break-words">{assignment.title}</h3>
                  <p className="text-sm lg:text-base text-gray-600 mb-2">{assignment.course}</p>
                  <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg border border-gray-200 line-clamp-2">
                    {assignment.description}
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className={`px-3 lg:px-4 py-1.5 lg:py-2 rounded-lg text-xs lg:text-sm font-semibold whitespace-nowrap ${
                    assignment.status === 'graded'
                      ? 'bg-green-100 text-green-700'
                      : assignment.status === 'submitted'
                      ? 'bg-blue-100 text-blue-700'
                      : isOverdue
                      ? 'bg-red-100 text-red-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {assignment.status === 'graded' ? 'Graded' : assignment.status === 'submitted' ? 'Submitted' : isOverdue ? 'Overdue' : 'Pending'}
                  </span>
                  <span className="px-3 lg:px-4 py-1.5 lg:py-2 bg-purple-100 text-purple-700 rounded-lg text-xs lg:text-sm font-semibold whitespace-nowrap">
                    Due: {new Date(assignment.dueDate).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {assignment.submitted && assignment.submittedDate && (
                <div className="mb-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-2 text-sm text-blue-700">
                    <CheckCircle className="w-4 h-4" />
                    <span>Submitted on {new Date(assignment.submittedDate).toLocaleString()}</span>
                    {assignment.submittedFile && (
                      <span className="ml-2">• File: {assignment.submittedFile.name}</span>
                    )}
                  </div>
                </div>
              )}

              {assignment.status === 'graded' && assignment.aiScore !== null ? (
                <div className="mt-4 p-4 rounded-lg bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="w-5 h-5 text-purple-600" />
                    <h4 className="font-semibold text-gray-800">AI-Enhanced Feedback</h4>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                    <div className="bg-white/80 rounded-lg p-3">
                      <p className="text-xs text-gray-600 mb-1">AI Score</p>
                      <p className="text-2xl font-bold text-blue-600">{assignment.aiScore}%</p>
                    </div>
                    <div className="bg-white/80 rounded-lg p-3">
                      <p className="text-xs text-gray-600 mb-1">Plagiarism</p>
                      <p className="text-2xl font-bold text-green-600">{assignment.plagiarismScore}%</p>
                      <p className="text-xs text-gray-500">(Lower is better)</p>
                    </div>
                    <div className="bg-white/80 rounded-lg p-3">
                      <p className="text-xs text-gray-600 mb-1">Correctness</p>
                      <p className="text-2xl font-bold text-purple-600">{assignment.correctness}%</p>
                    </div>
                    <div className="bg-white/80 rounded-lg p-3">
                      <p className="text-xs text-gray-600 mb-1">Final Grade</p>
                      <p className="text-2xl font-bold text-indigo-600">{assignment.grade}</p>
                    </div>
                  </div>
                  {assignment.feedback && (
                    <div className="mt-3 bg-white/80 rounded-lg p-3">
                      <p className="text-xs text-gray-600 mb-1">Instructor Feedback</p>
                      <p className="text-sm text-gray-800">{assignment.feedback}</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    {assignment.submitted ? (
                      <>
                        <Clock className="w-4 h-4" />
                        <span>Awaiting grading</span>
                      </>
                    ) : (
                      <>
                        <FileText className="w-4 h-4" />
                        <span>Not submitted yet</span>
                      </>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleOpenAssignment(assignment)}
                      className="bg-purple-100 text-purple-700 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-purple-200 transition-all flex items-center gap-2"
                    >
                      <Eye className="w-4 h-4" />
                      {assignment.submitted ? 'View Details' : 'View & Submit'}
                    </button>
                    {assignment.submitted && assignment.status !== 'graded' && (
                      <button
                        onClick={() => handleDeleteSubmission(assignment.id)}
                        className="bg-red-100 text-red-700 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-200 transition-all"
                      >
                        Delete Submission
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Assignment Modal */}
      {isModalOpen && selectedAssignment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">{selectedAssignment.title}</h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <h3 className="font-semibold text-gray-800 mb-2">Assignment Details</h3>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-gray-600">Course:</span>
                    <span className="font-semibold text-gray-800 ml-2">{selectedAssignment.course}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Due Date:</span>
                    <span className="font-semibold text-gray-800 ml-2">
                      {new Date(selectedAssignment.dueDate).toLocaleDateString()} at 11:59 PM
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Status:</span>
                    <span className={`font-semibold ml-2 ${
                      selectedAssignment.status === 'graded' ? 'text-green-700' :
                      selectedAssignment.status === 'submitted' ? 'text-blue-700' :
                      'text-yellow-700'
                    }`}>
                      {selectedAssignment.status === 'graded' ? 'Graded' : 
                       selectedAssignment.status === 'submitted' ? 'Submitted' : 'Pending'}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Instructions</h3>
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-sm text-gray-700 whitespace-pre-wrap">{selectedAssignment.description}</p>
                </div>
              </div>

              {selectedAssignment.submitted && (
                <>
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h3 className="font-semibold text-gray-800 mb-2">Your Submission</h3>
                    <div className="text-sm text-gray-700">
                      <p>Submitted on: {selectedAssignment.submittedDate ? new Date(selectedAssignment.submittedDate).toLocaleString() : 'N/A'}</p>
                      {selectedAssignment.submittedFile && (
                        <p className="mt-1">File: {selectedAssignment.submittedFile.name}</p>
                      )}
                    </div>
                  </div>

                  {/* Real-time AI Scores - Shown immediately after submission */}
                  {selectedAssignment.status === 'graded' && selectedAssignment.aiScore !== null && (
                    <div className="p-4 rounded-lg bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-200 animate-pulse">
                      <div className="flex items-center gap-2 mb-3">
                        <Sparkles className="w-5 h-5 text-purple-600" />
                        <h3 className="font-semibold text-gray-800">AI-Enhanced Analysis (Real-time)</h3>
                        <span className="ml-auto px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                          ✓ Analyzed
                        </span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 mb-3">
                        <div className="bg-white/80 rounded-lg p-3 text-center">
                          <p className="text-xs text-gray-600 mb-1">AI Score</p>
                          <p className="text-2xl font-bold text-blue-600">{selectedAssignment.aiScore}%</p>
                        </div>
                        <div className="bg-white/80 rounded-lg p-3 text-center">
                          <p className="text-xs text-gray-600 mb-1">Plagiarism</p>
                          <p className="text-2xl font-bold text-green-600">{selectedAssignment.plagiarismScore}%</p>
                          <p className="text-xs text-gray-500">(Lower is better)</p>
                        </div>
                        <div className="bg-white/80 rounded-lg p-3 text-center">
                          <p className="text-xs text-gray-600 mb-1">Correctness</p>
                          <p className="text-2xl font-bold text-purple-600">{selectedAssignment.correctness}%</p>
                        </div>
                        <div className="bg-white/80 rounded-lg p-3 text-center">
                          <p className="text-xs text-gray-600 mb-1">Final Grade</p>
                          <p className="text-2xl font-bold text-indigo-600">{selectedAssignment.grade}</p>
                        </div>
                      </div>
                      {selectedAssignment.feedback && (
                        <div className="bg-white/80 rounded-lg p-3">
                          <p className="text-xs text-gray-600 mb-1">AI Feedback</p>
                          <p className="text-sm text-gray-800">{selectedAssignment.feedback}</p>
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}

              {/* AI Marking Progress */}
              {isAIMarking && (
                <div className="p-4 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-purple-200">
                  <div className="flex items-center gap-2 mb-3">
                    <Brain className="w-5 h-5 text-purple-600 animate-pulse" />
                    <h3 className="font-semibold text-gray-800">AI is Marking Your Assignment</h3>
                  </div>
                  <div className="mb-3">
                    <p className="text-sm text-gray-700 mb-2">{aiMarkingStage}</p>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-blue-400 to-purple-500 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${aiMarkingProgress}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-600 mt-1">{aiMarkingProgress}% complete</p>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Please wait while AI analyzes your submission...</span>
                  </div>
                </div>
              )}

              {!selectedAssignment.submitted && !isAIMarking && (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Upload Your Assignment File
                    </label>
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
                        {submissionFile && (
                          <p className="text-xs text-green-600 mt-2">
                            Selected: {submissionFile.name}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Or Type Your Answer Here (Optional)
                    </label>
                    <textarea
                      value={submissionText}
                      onChange={(e) => setSubmissionText(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border border-purple-200 focus:ring-2 focus:ring-purple-300 outline-none"
                      rows={6}
                      placeholder="Type your assignment answer here..."
                    />
                  </div>

                  <div className="flex gap-3 pt-4 border-t border-purple-200">
                    <button
                      type="button"
                      onClick={handleCloseModal}
                      className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-400 to-purple-500 text-white rounded-lg font-semibold hover:from-blue-500 hover:to-purple-600 transition-all flex items-center justify-center gap-2"
                    >
                      <Upload className="w-4 h-4" />
                      Submit Assignment
                    </button>
                  </div>
                </form>
              )}

              {selectedAssignment.status === 'graded' && (
                <div className="pt-4 border-t border-purple-200">
                  <button
                    onClick={handleCloseModal}
                    className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-all"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignmentsPage;
