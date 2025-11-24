'use client';

import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { AlertCircle, Clock, CheckCircle, FileText, HelpCircle, BookOpen, TrendingUp } from 'lucide-react';
import Link from 'next/link';

type Value = Date | [Date, Date] | null;

interface CalendarItem {
  id: number;
  date: Date;
  title: string;
  type: 'assignment' | 'quiz' | 'course' | 'exam';
  course: string;
  dueDate: Date;
  status: 'overdue' | 'due-soon' | 'upcoming' | 'completed';
  priority: 'high' | 'medium' | 'low';
  link?: string;
}

const StudentCalendarPage = () => {
  const [value, setValue] = useState<Value>(new Date());
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const handleDateChange = (newValue: Value, event?: React.MouseEvent<HTMLButtonElement>) => {
    setValue(newValue);
  };

  const calendarItems: CalendarItem[] = [
    {
      id: 1,
      date: new Date(2025, 10, 12), // Nov 12, 2025 (overdue)
      title: 'AI Fundamentals Assignment',
      type: 'assignment',
      course: 'Advanced AI',
      dueDate: new Date(2025, 10, 12),
      status: 'overdue',
      priority: 'high',
      link: '/student/assignments',
    },
    {
      id: 2,
      date: new Date(2025, 10, 15), // Nov 15, 2025 (due soon)
      title: 'Neural Networks Essay',
      type: 'assignment',
      course: 'Advanced AI',
      dueDate: new Date(2025, 10, 15),
      status: 'due-soon',
      priority: 'high',
      link: '/student/assignments',
    },
    {
      id: 3,
      date: new Date(2025, 10, 18), // Nov 18, 2025
      title: 'Machine Learning Project',
      type: 'assignment',
      course: 'ML Basics',
      dueDate: new Date(2025, 10, 18),
      status: 'upcoming',
      priority: 'medium',
      link: '/student/assignments',
    },
    {
      id: 4,
      date: new Date(2025, 10, 20), // Nov 20, 2025
      title: 'ML Concepts Quiz',
      type: 'quiz',
      course: 'ML Basics',
      dueDate: new Date(2025, 10, 20),
      status: 'upcoming',
      priority: 'medium',
      link: '/student/quizzes',
    },
    {
      id: 5,
      date: new Date(2025, 10, 25), // Nov 25, 2025
      title: 'Advanced AI Final Exam',
      type: 'exam',
      course: 'Advanced AI',
      dueDate: new Date(2025, 10, 25),
      status: 'upcoming',
      priority: 'high',
      link: '/student/courses',
    },
    {
      id: 6,
      date: new Date(2025, 10, 10), // Nov 10, 2025 (completed)
      title: 'Machine Learning Project',
      type: 'assignment',
      course: 'ML Basics',
      dueDate: new Date(2025, 10, 10),
      status: 'completed',
      priority: 'low',
      link: '/student/assignments',
    },
  ];

  const getItemsByStatus = (status: string) => {
    return calendarItems.filter(item => item.status === status);
  };

  const overdueItems = getItemsByStatus('overdue');
  const dueSoonItems = getItemsByStatus('due-soon');
  const upcomingItems = getItemsByStatus('upcoming');

  const getEventsForDate = (date: Date) => {
    return calendarItems.filter(
      (item) =>
        item.date.getDate() === date.getDate() &&
        item.date.getMonth() === date.getMonth() &&
        item.date.getFullYear() === date.getFullYear()
    );
  };

  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view === 'month') {
      const dayEvents = getEventsForDate(date);
      if (dayEvents.length > 0) {
        return (
          <div className="flex flex-wrap gap-1 justify-center mt-1">
            {dayEvents.map((event, idx) => (
              <div
                key={idx}
                className={`w-2 h-2 rounded-full ${
                  event.status === 'overdue'
                    ? 'bg-red-500'
                    : event.status === 'due-soon'
                    ? 'bg-orange-500'
                    : event.status === 'completed'
                    ? 'bg-green-500'
                    : 'bg-blue-500'
                }`}
                title={event.title}
              />
            ))}
          </div>
        );
      }
    }
    return null;
  };

  const selectedDateEvents = value instanceof Date ? getEventsForDate(value) : [];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'assignment':
        return <FileText className="w-4 h-4" />;
      case 'quiz':
        return <HelpCircle className="w-4 h-4" />;
      case 'exam':
        return <BookOpen className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusBadge = (item: CalendarItem) => {
    switch (item.status) {
      case 'overdue':
        return <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded-full text-xs font-semibold">Overdue</span>;
      case 'due-soon':
        return <span className="px-2 py-0.5 bg-orange-100 text-orange-700 rounded-full text-xs font-semibold">Due Soon</span>;
      case 'completed':
        return <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-semibold">Completed</span>;
      default:
        return <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">Upcoming</span>;
    }
  };

  const getDaysUntilDue = (dueDate: Date) => {
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays < 0) return `${Math.abs(diffDays)} days overdue`;
    if (diffDays === 0) return 'Due today';
    if (diffDays === 1) return 'Due tomorrow';
    return `Due in ${diffDays} days`;
  };

  return (
    <div className="space-y-4 lg:space-y-6 xl:space-y-8">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-1 lg:mb-2">Calendar</h1>
        <p className="text-sm lg:text-base text-gray-600">Track your assignments, quizzes, and deadlines</p>
      </div>

      {/* Status Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 lg:gap-4">
        <div className="bg-red-50 border-2 border-red-200 rounded-lg lg:rounded-xl p-4 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs lg:text-sm font-medium text-red-700 mb-1">Overdue</p>
              <p className="text-2xl lg:text-3xl font-bold text-red-800">{overdueItems.length}</p>
            </div>
            <AlertCircle className="w-8 h-8 lg:w-10 lg:h-10 text-red-500" />
          </div>
        </div>
        <div className="bg-orange-50 border-2 border-orange-200 rounded-lg lg:rounded-xl p-4 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs lg:text-sm font-medium text-orange-700 mb-1">Due Soon</p>
              <p className="text-2xl lg:text-3xl font-bold text-orange-800">{dueSoonItems.length}</p>
            </div>
            <Clock className="w-8 h-8 lg:w-10 lg:h-10 text-orange-500" />
          </div>
        </div>
        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg lg:rounded-xl p-4 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs lg:text-sm font-medium text-blue-700 mb-1">Upcoming</p>
              <p className="text-2xl lg:text-3xl font-bold text-blue-800">{upcomingItems.length}</p>
            </div>
            <TrendingUp className="w-8 h-8 lg:w-10 lg:h-10 text-blue-500" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2 bg-white/80 backdrop-blur-sm rounded-lg lg:rounded-xl p-4 lg:p-5 xl:p-6 shadow-lg border border-purple-200/50">
          <Calendar
            onChange={handleDateChange as any}
            value={value}
            tileContent={tileContent}
            className="w-full border-none bg-transparent"
          />
        </div>

        {/* Selected Date Events */}
        <div className="bg-white/80 backdrop-blur-sm rounded-lg lg:rounded-xl p-4 lg:p-5 xl:p-6 shadow-lg border border-purple-200/50">
          <h2 className="text-lg lg:text-xl font-bold text-gray-800 mb-4">
            {value instanceof Date ? value.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : 'Select a date'}
          </h2>
          {selectedDateEvents.length > 0 ? (
            <div className="space-y-3">
              {selectedDateEvents.map((item) => (
                <Link
                  key={item.id}
                  href={item.link || '#'}
                  className="block p-3 rounded-lg border-2 hover:shadow-md transition-all"
                  style={{
                    borderColor: item.status === 'overdue' ? '#fecaca' : item.status === 'due-soon' ? '#fed7aa' : '#bfdbfe',
                    backgroundColor: item.status === 'overdue' ? '#fef2f2' : item.status === 'due-soon' ? '#fff7ed' : '#eff6ff',
                  }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {getTypeIcon(item.type)}
                      <span className="font-semibold text-sm text-gray-800">{item.title}</span>
                    </div>
                    {getStatusBadge(item)}
                  </div>
                  <p className="text-xs text-gray-600 mb-1">{item.course}</p>
                  <p className="text-xs font-medium text-gray-700">{getDaysUntilDue(item.dueDate)}</p>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">No events on this date</p>
          )}
        </div>
      </div>

      {/* Overdue Items */}
      {overdueItems.length > 0 && (
        <div className="bg-white/80 backdrop-blur-sm rounded-lg lg:rounded-xl p-4 lg:p-5 xl:p-6 shadow-lg border-2 border-red-200">
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <h2 className="text-lg lg:text-xl font-bold text-red-800">Overdue Items</h2>
          </div>
          <div className="space-y-3">
            {overdueItems.map((item) => (
              <Link
                key={item.id}
                href={item.link || '#'}
                className="block p-4 rounded-lg bg-red-50 border-2 border-red-200 hover:bg-red-100 transition-all"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getTypeIcon(item.type)}
                    <span className="font-semibold text-gray-800">{item.title}</span>
                  </div>
                  {getStatusBadge(item)}
                </div>
                <p className="text-sm text-gray-600 mb-1">{item.course}</p>
                <p className="text-xs font-semibold text-red-700">{getDaysUntilDue(item.dueDate)}</p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Due Soon Items */}
      {dueSoonItems.length > 0 && (
        <div className="bg-white/80 backdrop-blur-sm rounded-lg lg:rounded-xl p-4 lg:p-5 xl:p-6 shadow-lg border-2 border-orange-200">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-orange-600" />
            <h2 className="text-lg lg:text-xl font-bold text-orange-800">Due Soon (Next 3 Days)</h2>
          </div>
          <div className="space-y-3">
            {dueSoonItems.map((item) => (
              <Link
                key={item.id}
                href={item.link || '#'}
                className="block p-4 rounded-lg bg-orange-50 border-2 border-orange-200 hover:bg-orange-100 transition-all"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getTypeIcon(item.type)}
                    <span className="font-semibold text-gray-800">{item.title}</span>
                  </div>
                  {getStatusBadge(item)}
                </div>
                <p className="text-sm text-gray-600 mb-1">{item.course}</p>
                <p className="text-xs font-semibold text-orange-700">{getDaysUntilDue(item.dueDate)}</p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Upcoming Items */}
      {upcomingItems.length > 0 && (
        <div className="bg-white/80 backdrop-blur-sm rounded-lg lg:rounded-xl p-4 lg:p-5 xl:p-6 shadow-lg border border-purple-200/50">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg lg:text-xl font-bold text-gray-800">Upcoming Items</h2>
          </div>
          <div className="space-y-3">
            {upcomingItems.map((item) => (
              <Link
                key={item.id}
                href={item.link || '#'}
                className="block p-4 rounded-lg bg-blue-50 border border-blue-200 hover:bg-blue-100 transition-all"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getTypeIcon(item.type)}
                    <span className="font-semibold text-gray-800">{item.title}</span>
                  </div>
                  {getStatusBadge(item)}
                </div>
                <p className="text-sm text-gray-600 mb-1">{item.course}</p>
                <p className="text-xs font-semibold text-blue-700">{getDaysUntilDue(item.dueDate)}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentCalendarPage;

