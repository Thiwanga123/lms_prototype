'use client';

import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const CalendarPage = () => {
  const [value, setValue] = useState<Value>(new Date());

  const handleDateChange = (newValue: Value, event?: React.MouseEvent<HTMLButtonElement>) => {
    setValue(newValue);
  };

  const events = [
    { date: new Date(2025, 10, 15), title: 'Assignment Due: Behaviour Observation', type: 'assignment' },
    { date: new Date(2025, 10, 20), title: 'Course: CHCECE045 - Foster Positive Interactions', type: 'course' },
    { date: new Date(2025, 10, 22), title: 'Final Assessment: CHC50121 Diploma', type: 'exam' },
    { date: new Date(2025, 10, 25), title: 'Holiday Break Starts', type: 'holiday' },
  ];

  const getEventsForDate = (date: Date) => {
    return events.filter(
      (event) =>
        event.date.getDate() === date.getDate() &&
        event.date.getMonth() === date.getMonth() &&
        event.date.getFullYear() === date.getFullYear()
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
                  event.type === 'assignment'
                    ? 'bg-blue-500'
                    : event.type === 'course'
                    ? 'bg-purple-500'
                    : event.type === 'exam'
                    ? 'bg-red-500'
                    : 'bg-green-500'
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

  return (
    <div className="space-y-4 lg:space-y-6 xl:space-y-8">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-1 lg:mb-2">Calendar</h1>
        <p className="text-sm lg:text-base text-gray-600">View and manage your schedule and events</p>
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

        {/* Events List */}
        <div className="bg-white/80 backdrop-blur-sm rounded-lg lg:rounded-xl p-4 lg:p-5 xl:p-6 shadow-lg border border-purple-200/50">
          <h2 className="text-lg lg:text-xl font-bold text-gray-800 mb-3 lg:mb-4">
            {value instanceof Date
              ? `Events on ${value.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`
              : 'Select a date'}
          </h2>

          {selectedDateEvents.length > 0 ? (
            <div className="space-y-2 lg:space-y-3">
              {selectedDateEvents.map((event, idx) => (
                <div
                  key={idx}
                  className={`p-3 lg:p-4 rounded-lg border-l-4 ${
                    event.type === 'assignment'
                      ? 'bg-blue-50 border-blue-500'
                      : event.type === 'course'
                      ? 'bg-purple-50 border-purple-500'
                      : event.type === 'exam'
                      ? 'bg-red-50 border-red-500'
                      : 'bg-green-50 border-green-500'
                  }`}
                >
                  <p className="font-semibold text-sm lg:text-base text-gray-800 break-words">{event.title}</p>
                  <p className="text-xs lg:text-sm text-gray-600 mt-1 capitalize">{event.type}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-6 lg:py-8 text-sm lg:text-base">No events scheduled for this date</p>
          )}

          <div className="mt-4 lg:mt-6 pt-4 lg:pt-6 border-t border-purple-200">
            <h3 className="font-semibold text-sm lg:text-base text-gray-800 mb-2 lg:mb-3">Upcoming Events</h3>
            <div className="space-y-1.5 lg:space-y-2">
              {events.slice(0, 5).map((event, idx) => (
                <div key={idx} className="flex items-center space-x-2 text-xs lg:text-sm">
                  <div
                    className={`w-2.5 h-2.5 lg:w-3 lg:h-3 rounded-full flex-shrink-0 ${
                      event.type === 'assignment'
                        ? 'bg-blue-500'
                        : event.type === 'course'
                        ? 'bg-purple-500'
                        : event.type === 'exam'
                        ? 'bg-red-500'
                        : 'bg-green-500'
                    }`}
                  />
                  <span className="text-gray-600 break-words">
                    {event.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {event.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;

