'use client';

import { HelpCircle, Clock, CheckCircle, Play, X, ArrowRight, ArrowLeft } from 'lucide-react';
import { useState, useEffect, useRef, useCallback } from 'react';

interface Quiz {
  id: number;
  course: string;
  title: string;
  questions: Question[];
  duration: number; // in minutes
  status: 'available' | 'in-progress' | 'completed';
  score: number | null;
  completedDate?: string;
}

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  selectedAnswer?: number;
}

const QuizzesPage = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([
    { 
      id: 1, 
      course: 'CHC50121 Diploma', 
      title: 'Positive Interactions Quiz', 
      questions: [
        {
          id: 1,
          question: 'What is the primary goal of positive behaviour support in early childhood?',
          options: [
            'To control children\'s behaviour',
            'To foster respectful interactions and support development',
            'To minimize disruptions in the classroom',
            'To enforce strict rules'
          ],
          correctAnswer: 1
        },
        {
          id: 2,
          question: 'Which of the following is an effective strategy for fostering positive interactions?',
          options: [
            'Using time-out for all misbehaviour',
            'Modeling respectful communication and positive reinforcement',
            'Ignoring all challenging behaviours',
            'Punishing negative behaviours immediately'
          ],
          correctAnswer: 1
        },
        {
          id: 3,
          question: 'What is the importance of understanding child development stages?',
          options: [
            'It helps set appropriate expectations',
            'It allows for better behaviour management',
            'It supports responsive teaching practices',
            'All of the above'
          ],
          correctAnswer: 3
        }
      ],
      duration: 30, 
      status: 'available', 
      score: null 
    },
    { 
      id: 2, 
      course: 'CHCECE045', 
      title: 'Child Development and Behaviour', 
      questions: [
        {
          id: 1,
          question: 'What is the most effective approach to managing challenging behaviours?',
          options: [
            'Immediate punishment',
            'Understanding the underlying cause and responding appropriately',
            'Ignoring the behaviour',
            'Removing the child from the setting'
          ],
          correctAnswer: 1
        },
        {
          id: 2,
          question: 'Why is positive reinforcement preferred over punishment in childcare settings?',
          options: [
            'It is easier to implement',
            'It builds self-esteem and encourages desired behaviours',
            'It requires less time',
            'It is less expensive'
          ],
          correctAnswer: 1
        }
      ],
      duration: 45, 
      status: 'completed', 
      score: 85,
      completedDate: '2025-11-10'
    },
    { 
      id: 3, 
      course: 'CHCECE046', 
      title: 'Inclusion Strategies Quiz', 
      questions: [
        {
          id: 1,
          question: 'What is the primary goal of inclusive practices in early childhood?',
          options: [
            'To separate children with special needs',
            'To ensure all children can participate and learn together',
            'To focus only on typically developing children',
            'To minimize disruptions in the classroom'
          ],
          correctAnswer: 1
        },
        {
          id: 2,
          question: 'Which of the following is an effective inclusion strategy?',
          options: [
            'Using the same approach for all children',
            'Adapting activities to meet individual needs',
            'Limiting participation of children with disabilities',
            'Focusing only on academic outcomes'
          ],
          correctAnswer: 1
        },
        {
          id: 3,
          question: 'Why is collaboration with families important in inclusion?',
          options: [
            'To reduce workload for educators',
            'To ensure consistent support and understanding of the child',
            'To avoid legal issues',
            'To save time'
          ],
          correctAnswer: 1
        }
      ],
      duration: 35, 
      status: 'available', 
      score: null 
    },
  ]);

  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<{ [key: number]: number }>({});
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleSubmitQuiz = useCallback(() => {
    if (!selectedQuiz) return;

    let correctAnswers = 0;
    selectedQuiz.questions.forEach((question) => {
      if (quizAnswers[question.id] === question.correctAnswer) {
        correctAnswers++;
      }
    });

    const score = Math.round((correctAnswers / selectedQuiz.questions.length) * 100);
    
    setQuizzes((prev) =>
      prev.map((q) =>
        q.id === selectedQuiz.id
          ? {
              ...q,
              status: 'completed',
              score,
              completedDate: new Date().toISOString(),
            }
          : q
      )
    );

    setIsQuizModalOpen(false);
    setSelectedQuiz(null);
    setCurrentQuestionIndex(0);
    setQuizAnswers({});
    
    alert(`Quiz submitted! Your score: ${score}% (${correctAnswers}/${selectedQuiz.questions.length} correct)`);
  }, [selectedQuiz, quizAnswers]);

  // Timer effect
  useEffect(() => {
    if (!isQuizModalOpen || !selectedQuiz || selectedQuiz.status !== 'in-progress' || timeRemaining <= 0) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    timerRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isQuizModalOpen, selectedQuiz?.status, timeRemaining]);

  // Auto-submit when time reaches 0
  useEffect(() => {
    if (timeRemaining === 0 && isQuizModalOpen && selectedQuiz && selectedQuiz.status === 'in-progress') {
      handleSubmitQuiz();
    }
  }, [timeRemaining, isQuizModalOpen, selectedQuiz, handleSubmitQuiz]);

  const handleStartQuiz = (quiz: Quiz) => {
    setSelectedQuiz({ ...quiz, status: 'in-progress' });
    setTimeRemaining(quiz.duration * 60); // Convert to seconds
    setCurrentQuestionIndex(0);
    setQuizAnswers({});
    setIsQuizModalOpen(true);
  };

  const handleAnswerSelect = (questionId: number, answerIndex: number) => {
    setQuizAnswers((prev) => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const handleNextQuestion = () => {
    if (selectedQuiz && currentQuestionIndex < selectedQuiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const currentQuestion = selectedQuiz?.questions[currentQuestionIndex];

  return (
    <div className="space-y-4 lg:space-y-6 xl:space-y-8">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-1 lg:mb-2">My Quizzes</h1>
        <p className="text-sm lg:text-base text-gray-600">Take quizzes and track your progress</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
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
              {quiz.status === 'completed' && (
                <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                  Completed
                </span>
              )}
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
              {quiz.status === 'completed' && quiz.score !== null && (
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-gray-600">Score:</span>
                  <span className="font-semibold text-green-600">{quiz.score}%</span>
                </div>
              )}
            </div>
            <button
              onClick={() => handleStartQuiz(quiz)}
              className={`w-full py-2.5 rounded-lg text-xs lg:text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                quiz.status === 'completed'
                  ? 'bg-gray-100 text-gray-700 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-400 to-purple-500 text-white hover:from-blue-500 hover:to-purple-600 shadow-lg'
              }`}
              disabled={quiz.status === 'completed'}
            >
              {quiz.status === 'completed' ? (
                <>
                  <CheckCircle className="w-4 h-4" />
                  Completed
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  Start Quiz
                </>
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Quiz Modal */}
      {isQuizModalOpen && selectedQuiz && currentQuestion && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold text-gray-800">{selectedQuiz.title}</h2>
                <p className="text-sm text-gray-600">{selectedQuiz.course}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-red-50 px-3 py-1.5 rounded-lg border border-red-200">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-red-600" />
                    <span className="font-semibold text-red-600">{formatTime(timeRemaining)}</span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    if (confirm('Are you sure you want to exit? Your progress will be saved.')) {
                      setIsQuizModalOpen(false);
                    }
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                <span>Question {currentQuestionIndex + 1} of {selectedQuiz.questions.length}</span>
                <span>{Math.round(((currentQuestionIndex + 1) / selectedQuiz.questions.length) * 100)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-blue-400 to-purple-500 h-2 rounded-full transition-all"
                  style={{ width: `${((currentQuestionIndex + 1) / selectedQuiz.questions.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Question */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                {currentQuestion.question}
              </h3>
              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => (
                  <label
                    key={index}
                    className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      quizAnswers[currentQuestion.id] === index
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50/50'
                    }`}
                  >
                    <input
                      type="radio"
                      name={`question-${currentQuestion.id}`}
                      value={index}
                      checked={quizAnswers[currentQuestion.id] === index}
                      onChange={() => handleAnswerSelect(currentQuestion.id, index)}
                      className="w-4 h-4 text-purple-600 focus:ring-purple-500"
                    />
                    <span className="ml-3 text-gray-800">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <button
                onClick={handlePreviousQuestion}
                disabled={currentQuestionIndex === 0}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Previous
              </button>
              <div className="flex gap-2">
                {selectedQuiz.questions.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentQuestionIndex(index)}
                    className={`w-8 h-8 rounded-lg text-xs font-semibold transition-all ${
                      index === currentQuestionIndex
                        ? 'bg-purple-500 text-white'
                        : quizAnswers[selectedQuiz.questions[index].id] !== undefined
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
              {currentQuestionIndex < selectedQuiz.questions.length - 1 ? (
                <button
                  onClick={handleNextQuestion}
                  className="px-4 py-2 bg-gradient-to-r from-blue-400 to-purple-500 text-white rounded-lg font-semibold hover:from-blue-500 hover:to-purple-600 transition-all flex items-center gap-2"
                >
                  Next
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleSubmitQuiz}
                  className="px-4 py-2 bg-gradient-to-r from-green-400 to-green-500 text-white rounded-lg font-semibold hover:from-green-500 hover:to-green-600 transition-all flex items-center gap-2"
                >
                  <CheckCircle className="w-4 h-4" />
                  Submit Quiz
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizzesPage;
