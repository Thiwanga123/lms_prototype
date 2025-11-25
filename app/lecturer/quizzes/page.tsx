'use client';

import { Plus, HelpCircle, Clock, Users, Edit, Trash2, X, Sparkles, Loader2 } from 'lucide-react';
import { useState } from 'react';

interface Question {
  id: number;
  question: string;
  type: 'multiple-choice' | 'true-false' | 'short-answer';
  options?: string[];
  correctAnswer: string;
  points: number;
}

interface Quiz {
  id: number;
  course: string;
  title: string;
  questions: Question[];
  duration: number;
  attempts: number;
  status: string;
}

const QuizzesPage = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([
    { 
      id: 1, 
      course: 'CHC50121 Diploma', 
      title: 'Positive Interactions Quiz', 
      questions: [
        { id: 1, question: 'What is the primary goal of positive behaviour support in early childhood?', type: 'multiple-choice', options: ['To control children', 'To foster respectful interactions', 'To minimize disruptions', 'To enforce rules'], correctAnswer: 'To foster respectful interactions', points: 10 },
        { id: 2, question: 'Positive reinforcement is more effective than punishment in childcare settings', type: 'true-false', correctAnswer: 'True', points: 5 },
      ],
      duration: 30, 
      attempts: 45, 
      status: 'Active' 
    },
    { 
      id: 2, 
      course: 'CHCECE045', 
      title: 'Child Development and Behaviour', 
      questions: [
        { id: 1, question: 'Explain the importance of understanding child development stages when managing behaviour', type: 'short-answer', correctAnswer: 'Understanding development stages helps educators set appropriate expectations and respond effectively to children\'s needs', points: 15 },
      ],
      duration: 45, 
      attempts: 32, 
      status: 'Active' 
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  const [editingQuiz, setEditingQuiz] = useState<Quiz | null>(null);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [currentQuizQuestions, setCurrentQuizQuestions] = useState<Question[]>([]);
  const [isAIGenerating, setIsAIGenerating] = useState(false);
  const [aiGenerationProgress, setAiGenerationProgress] = useState(0);
  const [formData, setFormData] = useState({
    course: '',
    title: '',
    duration: 30,
    status: 'Active',
  });
  const [questionData, setQuestionData] = useState({
    question: '',
    type: 'multiple-choice' as 'multiple-choice' | 'true-false' | 'short-answer',
    options: ['', '', '', ''],
    correctAnswer: '',
    points: 10,
  });

  const courses = ['CHC50121 Diploma Early Childhood Education and Care', 'CHCECE045 - Foster Positive Interactions', 'CHCECE046 - Inclusion Strategies'];

  const handleOpenModal = (quiz?: Quiz) => {
    if (quiz) {
      setEditingQuiz(quiz);
      setCurrentQuizQuestions(quiz.questions);
      setFormData({
        course: quiz.course,
        title: quiz.title,
        duration: quiz.duration,
        status: quiz.status,
      });
    } else {
      setEditingQuiz(null);
      setCurrentQuizQuestions([]);
      setFormData({
        course: '',
        title: '',
        duration: 30,
        status: 'Active',
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingQuiz(null);
    setCurrentQuizQuestions([]);
    setFormData({
      course: '',
      title: '',
      duration: 30,
      status: 'Active',
    });
  };

  const handleOpenQuestionModal = (question?: Question) => {
    if (question) {
      setEditingQuestion(question);
      setQuestionData({
        question: question.question,
        type: question.type,
        options: question.options || ['', '', '', ''],
        correctAnswer: question.correctAnswer,
        points: question.points,
      });
    } else {
      setEditingQuestion(null);
      setQuestionData({
        question: '',
        type: 'multiple-choice',
        options: ['', '', '', ''],
        correctAnswer: '',
        points: 10,
      });
    }
    setIsQuestionModalOpen(true);
  };

  const handleCloseQuestionModal = () => {
    setIsQuestionModalOpen(false);
    setEditingQuestion(null);
    setQuestionData({
      question: '',
      type: 'multiple-choice',
      options: ['', '', '', ''],
      correctAnswer: '',
      points: 10,
    });
  };

  const handleAddQuestion = () => {
    if (editingQuestion) {
      setCurrentQuizQuestions(currentQuizQuestions.map(q => 
        q.id === editingQuestion.id 
          ? { ...editingQuestion, ...questionData, id: editingQuestion.id }
          : q
      ));
    } else {
      const newQuestion: Question = {
        id: currentQuizQuestions.length + 1,
        ...questionData,
        options: questionData.type === 'multiple-choice' ? questionData.options.filter(o => o.trim() !== '') : undefined,
      };
      setCurrentQuizQuestions([...currentQuizQuestions, newQuestion]);
    }
    handleCloseQuestionModal();
  };

  const handleDeleteQuestion = (questionId: number) => {
    setCurrentQuizQuestions(currentQuizQuestions.filter(q => q.id !== questionId));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentQuizQuestions.length === 0) {
      alert('Please add at least one question to the quiz');
      return;
    }
    if (editingQuiz) {
      setQuizzes(quizzes.map(q => 
        q.id === editingQuiz.id 
          ? { ...editingQuiz, ...formData, questions: currentQuizQuestions, attempts: editingQuiz.attempts }
          : q
      ));
    } else {
      const newQuiz: Quiz = {
        id: quizzes.length + 1,
        ...formData,
        questions: currentQuizQuestions,
        attempts: 0,
      };
      setQuizzes([...quizzes, newQuiz]);
    }
    handleCloseModal();
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this quiz?')) {
      setQuizzes(quizzes.filter(q => q.id !== id));
    }
  };

  const handleAIGenerateQuiz = async () => {
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

    // Simulate AI generating questions
    setTimeout(() => {
      clearInterval(progressInterval);
      setAiGenerationProgress(100);

      // Generate AI questions based on course and title (childcare focused)
      const aiGeneratedQuestions: Question[] = [
        {
          id: 1,
          question: `What is the primary purpose of ${formData.title} in early childhood education?`,
          type: 'multiple-choice',
          options: [
            'To control children\'s behaviour',
            'To support children\'s development and learning',
            'To minimize classroom disruptions',
            'To enforce strict rules'
          ],
          correctAnswer: 'To support children\'s development and learning',
          points: 10
        },
        {
          id: 2,
          question: `${formData.title} is essential for creating positive learning environments in childcare settings.`,
          type: 'true-false',
          correctAnswer: 'True',
          points: 5
        },
        {
          id: 3,
          question: `Explain the key principles of ${formData.title} in early childhood education.`,
          type: 'short-answer',
          correctAnswer: 'Key principles include understanding child development, fostering positive relationships, creating inclusive environments, and supporting individual needs.',
          points: 15
        },
        {
          id: 4,
          question: `Which of the following best describes effective ${formData.title}?`,
          type: 'multiple-choice',
          options: [
            'A rigid set of rules',
            'A child-centered approach',
            'A one-size-fits-all method',
            'A disciplinary system'
          ],
          correctAnswer: 'A child-centered approach',
          points: 10
        },
        {
          id: 5,
          question: `How does ${formData.title} contribute to children's social and emotional development?`,
          type: 'short-answer',
          correctAnswer: 'It helps children develop self-regulation, empathy, communication skills, and positive relationships with peers and adults.',
          points: 15
        }
      ];

      setCurrentQuizQuestions(aiGeneratedQuestions);
      setIsAIGenerating(false);
      setAiGenerationProgress(0);
      alert('AI has successfully generated 5 quiz questions!');
    }, 2000);
  };

  return (
    <div className="space-y-4 lg:space-y-6 xl:space-y-8">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-1 lg:mb-2">Quizzes</h1>
          <p className="text-sm lg:text-base text-gray-600">Create and manage quizzes for your courses</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-gradient-to-r from-blue-400 to-purple-500 text-white px-4 lg:px-6 py-2 lg:py-3 rounded-lg text-sm lg:text-base font-semibold hover:from-blue-500 hover:to-purple-600 transition-all shadow-lg flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4 lg:w-5 lg:h-5" />
          Create Quiz
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
        {quizzes.map((quiz) => (
          <div
            key={quiz.id}
            className="bg-white/80 backdrop-blur-sm rounded-lg lg:rounded-xl p-4 lg:p-5 xl:p-6 shadow-lg border border-purple-200/50 hover:shadow-xl transition-all"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center text-white">
                  <HelpCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 text-sm lg:text-base">{quiz.title}</h3>
                  <p className="text-xs lg:text-sm text-gray-600">{quiz.course}</p>
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                quiz.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
              }`}>
                {quiz.status}
              </span>
            </div>
            <div className="space-y-2 text-xs lg:text-sm mb-4">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-gray-600" />
                <span className="text-gray-600">Questions:</span>
                <span className="font-semibold text-gray-800">{quiz.questions.length}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-600" />
                <span className="text-gray-600">Duration:</span>
                <span className="font-semibold text-gray-800">{quiz.duration} min</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-gray-600" />
                <span className="text-gray-600">Attempts:</span>
                <span className="font-semibold text-gray-800">{quiz.attempts}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => handleOpenModal(quiz)}
                className="flex-1 bg-purple-100 text-purple-700 py-2 rounded-lg text-xs lg:text-sm font-semibold hover:bg-purple-200 transition-all flex items-center justify-center gap-1"
              >
                <Edit className="w-4 h-4" />
                Edit
              </button>
              <button 
                onClick={() => handleDelete(quiz.id)}
                className="flex-1 bg-red-100 text-red-700 py-2 rounded-lg text-xs lg:text-sm font-semibold hover:bg-red-200 transition-all flex items-center justify-center gap-1"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Quiz Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                {editingQuiz ? 'Edit Quiz' : 'Create New Quiz'}
              </h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Duration (minutes)</label>
                  <input
                    type="number"
                    min="1"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 rounded-lg border border-purple-200 focus:ring-2 focus:ring-purple-300 outline-none"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Quiz Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-purple-200 focus:ring-2 focus:ring-purple-300 outline-none"
                  required
                />
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

              {/* Questions Section */}
              <div className="border-t border-purple-200 pt-4">
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-medium text-gray-700">Questions ({currentQuizQuestions.length})</label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={handleAIGenerateQuiz}
                      disabled={isAIGenerating || !formData.course || !formData.title}
                      className="px-3 py-1.5 bg-gradient-to-r from-blue-400 to-purple-500 text-white rounded-lg text-sm font-semibold hover:from-blue-500 hover:to-purple-600 transition-all flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isAIGenerating ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4" />
                          AI Generate Quiz
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleOpenQuestionModal()}
                      className="px-3 py-1.5 bg-purple-100 text-purple-700 rounded-lg text-sm font-semibold hover:bg-purple-200 transition-all flex items-center gap-1"
                    >
                      <Plus className="w-4 h-4" />
                      Add Question
                    </button>
                  </div>
                </div>
                {isAIGenerating && (
                  <div className="mb-3 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-purple-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="w-4 h-4 text-purple-600 animate-pulse" />
                      <span className="text-sm font-semibold text-gray-800">AI is generating quiz questions...</span>
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
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {currentQuizQuestions.map((q, idx) => (
                    <div key={q.id} className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-gray-800">
                            {idx + 1}. {q.question}
                          </p>
                          <p className="text-xs text-gray-600 mt-1">
                            Type: {q.type} | Points: {q.points} | Answer: {q.correctAnswer}
                          </p>
                        </div>
                        <div className="flex gap-1">
                          <button
                            type="button"
                            onClick={() => handleOpenQuestionModal(q)}
                            className="p-1 text-purple-600 hover:text-purple-800"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteQuestion(q.id)}
                            className="p-1 text-red-600 hover:text-red-800"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {currentQuizQuestions.length === 0 && (
                    <p className="text-sm text-gray-500 text-center py-4">No questions added yet. Click "Add Question" to get started.</p>
                  )}
                </div>
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
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-400 to-purple-500 text-white rounded-lg font-semibold hover:from-blue-500 hover:to-purple-600 transition-all"
                >
                  {editingQuiz ? 'Update Quiz' : 'Create Quiz'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Question Modal */}
      {isQuestionModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                {editingQuestion ? 'Edit Question' : 'Add New Question'}
              </h2>
              <button
                onClick={handleCloseQuestionModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); handleAddQuestion(); }} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Question</label>
                <textarea
                  value={questionData.question}
                  onChange={(e) => setQuestionData({ ...questionData, question: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-purple-200 focus:ring-2 focus:ring-purple-300 outline-none"
                  rows={3}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Question Type</label>
                <select
                  value={questionData.type}
                  onChange={(e) => setQuestionData({ 
                    ...questionData, 
                    type: e.target.value as 'multiple-choice' | 'true-false' | 'short-answer',
                    options: e.target.value === 'multiple-choice' ? ['', '', '', ''] : [],
                    correctAnswer: e.target.value === 'true-false' ? 'True' : ''
                  })}
                  className="w-full px-4 py-2 rounded-lg border border-purple-200 focus:ring-2 focus:ring-purple-300 outline-none"
                >
                  <option value="multiple-choice">Multiple Choice</option>
                  <option value="true-false">True/False</option>
                  <option value="short-answer">Short Answer</option>
                </select>
              </div>
              {questionData.type === 'multiple-choice' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Options</label>
                  {questionData.options.map((option, idx) => (
                    <input
                      key={idx}
                      type="text"
                      value={option}
                      onChange={(e) => {
                        const newOptions = [...questionData.options];
                        newOptions[idx] = e.target.value;
                        setQuestionData({ ...questionData, options: newOptions });
                      }}
                      className="w-full px-4 py-2 rounded-lg border border-purple-200 focus:ring-2 focus:ring-purple-300 outline-none mb-2"
                      placeholder={`Option ${idx + 1}`}
                    />
                  ))}
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Correct Answer
                  {questionData.type === 'true-false' && ' (True or False)'}
                  {questionData.type === 'multiple-choice' && ' (Enter the correct option text)'}
                  {questionData.type === 'short-answer' && ' (Expected answer)'}
                </label>
                {questionData.type === 'true-false' ? (
                  <select
                    value={questionData.correctAnswer}
                    onChange={(e) => setQuestionData({ ...questionData, correctAnswer: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-purple-200 focus:ring-2 focus:ring-purple-300 outline-none"
                    required
                  >
                    <option value="">Select Answer</option>
                    <option value="True">True</option>
                    <option value="False">False</option>
                  </select>
                ) : (
                  <input
                    type="text"
                    value={questionData.correctAnswer}
                    onChange={(e) => setQuestionData({ ...questionData, correctAnswer: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-purple-200 focus:ring-2 focus:ring-purple-300 outline-none"
                    required
                  />
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Points</label>
                <input
                  type="number"
                  min="1"
                  value={questionData.points}
                  onChange={(e) => setQuestionData({ ...questionData, points: parseInt(e.target.value) || 0 })}
                  className="w-full px-4 py-2 rounded-lg border border-purple-200 focus:ring-2 focus:ring-purple-300 outline-none"
                  required
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleCloseQuestionModal}
                  className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-400 to-purple-500 text-white rounded-lg font-semibold hover:from-blue-500 hover:to-purple-600 transition-all"
                >
                  {editingQuestion ? 'Update Question' : 'Add Question'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizzesPage;
