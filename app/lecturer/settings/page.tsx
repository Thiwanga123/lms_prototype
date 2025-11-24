'use client';

import { User, Mail, Building, BookOpen, Bell, Lock } from 'lucide-react';
import { useUser } from '../../context/UserContext';

const LecturerSettingsPage = () => {
  const { user } = useUser();

  return (
    <div className="space-y-4 lg:space-y-6 xl:space-y-8">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-1 lg:mb-2">Settings</h1>
        <p className="text-sm lg:text-base text-gray-600">Manage your account and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        {/* Profile Settings */}
        <div className="bg-white/80 backdrop-blur-sm rounded-lg lg:rounded-xl p-4 lg:p-5 xl:p-6 shadow-lg border border-purple-200/50">
          <div className="flex items-center gap-2 mb-4">
            <User className="w-5 h-5 text-purple-600" />
            <h2 className="text-lg lg:text-xl font-bold text-gray-800">Profile Settings</h2>
          </div>
          <div className="space-y-3 lg:space-y-4">
            <div>
              <label className="block text-xs lg:text-sm font-medium text-gray-700 mb-1.5 lg:mb-2">Full Name</label>
              <input
                type="text"
                defaultValue={user?.name || 'Dr. Sarah Johnson'}
                className="w-full px-3 lg:px-4 py-2 lg:py-2.5 xl:py-3 rounded-lg border border-purple-200 focus:ring-2 focus:ring-purple-300 focus:border-transparent outline-none bg-white/50 text-sm lg:text-base"
              />
            </div>
            <div>
              <label className="block text-xs lg:text-sm font-medium text-gray-700 mb-1.5 lg:mb-2">Email Address</label>
              <input
                type="email"
                defaultValue={user?.email || 'sarah@ausilms.com'}
                className="w-full px-3 lg:px-4 py-2 lg:py-2.5 xl:py-3 rounded-lg border border-purple-200 focus:ring-2 focus:ring-purple-300 focus:border-transparent outline-none bg-white/50 text-sm lg:text-base"
              />
            </div>
            <div>
              <label className="block text-xs lg:text-sm font-medium text-gray-700 mb-1.5 lg:mb-2">Department</label>
              <input
                type="text"
                defaultValue="Computer Science"
                className="w-full px-3 lg:px-4 py-2 lg:py-2.5 xl:py-3 rounded-lg border border-purple-200 focus:ring-2 focus:ring-purple-300 focus:border-transparent outline-none bg-white/50 text-sm lg:text-base"
              />
            </div>
            <div>
              <label className="block text-xs lg:text-sm font-medium text-gray-700 mb-1.5 lg:mb-2">Title</label>
              <input
                type="text"
                defaultValue="Associate Professor"
                className="w-full px-3 lg:px-4 py-2 lg:py-2.5 xl:py-3 rounded-lg border border-purple-200 focus:ring-2 focus:ring-purple-300 focus:border-transparent outline-none bg-white/50 text-sm lg:text-base"
              />
            </div>
            <button className="w-full bg-gradient-to-r from-blue-400 to-purple-500 text-white py-2.5 lg:py-3 rounded-lg text-sm lg:text-base font-semibold hover:from-blue-500 hover:to-purple-600 transition-all">
              Save Changes
            </button>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white/80 backdrop-blur-sm rounded-lg lg:rounded-xl p-4 lg:p-5 xl:p-6 shadow-lg border border-purple-200/50">
          <div className="flex items-center gap-2 mb-4">
            <Bell className="w-5 h-5 text-purple-600" />
            <h2 className="text-lg lg:text-xl font-bold text-gray-800">Notifications</h2>
          </div>
          <div className="space-y-3 lg:space-y-4">
            <div className="flex items-center justify-between p-3 lg:p-4 bg-purple-50 rounded-lg">
              <div>
                <p className="font-semibold text-sm lg:text-base text-gray-800">New Assignment Submissions</p>
                <p className="text-xs lg:text-sm text-gray-600">Get notified when students submit assignments</p>
              </div>
              <input type="checkbox" defaultChecked className="w-4 h-4 lg:w-5 lg:h-5 rounded border-purple-300 text-purple-500" />
            </div>
            <div className="flex items-center justify-between p-3 lg:p-4 bg-blue-50 rounded-lg">
              <div>
                <p className="font-semibold text-sm lg:text-base text-gray-800">Quiz Attempts</p>
                <p className="text-xs lg:text-sm text-gray-600">Notifications for quiz completions</p>
              </div>
              <input type="checkbox" defaultChecked className="w-4 h-4 lg:w-5 lg:h-5 rounded border-purple-300 text-purple-500" />
            </div>
            <div className="flex items-center justify-between p-3 lg:p-4 bg-purple-50 rounded-lg">
              <div>
                <p className="font-semibold text-sm lg:text-base text-gray-800">Course Updates</p>
                <p className="text-xs lg:text-sm text-gray-600">Updates about your courses</p>
              </div>
              <input type="checkbox" className="w-4 h-4 lg:w-5 lg:h-5 rounded border-purple-300 text-purple-500" />
            </div>
            <div className="flex items-center justify-between p-3 lg:p-4 bg-blue-50 rounded-lg">
              <div>
                <p className="font-semibold text-sm lg:text-base text-gray-800">Email Notifications</p>
                <p className="text-xs lg:text-sm text-gray-600">Receive notifications via email</p>
              </div>
              <input type="checkbox" defaultChecked className="w-4 h-4 lg:w-5 lg:h-5 rounded border-purple-300 text-purple-500" />
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-white/80 backdrop-blur-sm rounded-lg lg:rounded-xl p-4 lg:p-5 xl:p-6 shadow-lg border border-purple-200/50">
          <div className="flex items-center gap-2 mb-4">
            <Lock className="w-5 h-5 text-purple-600" />
            <h2 className="text-lg lg:text-xl font-bold text-gray-800">Security</h2>
          </div>
          <div className="space-y-3 lg:space-y-4">
            <div>
              <label className="block text-xs lg:text-sm font-medium text-gray-700 mb-1.5 lg:mb-2">Current Password</label>
              <input
                type="password"
                className="w-full px-3 lg:px-4 py-2 lg:py-2.5 xl:py-3 rounded-lg border border-purple-200 focus:ring-2 focus:ring-purple-300 focus:border-transparent outline-none bg-white/50 text-sm lg:text-base"
              />
            </div>
            <div>
              <label className="block text-xs lg:text-sm font-medium text-gray-700 mb-1.5 lg:mb-2">New Password</label>
              <input
                type="password"
                className="w-full px-3 lg:px-4 py-2 lg:py-2.5 xl:py-3 rounded-lg border border-purple-200 focus:ring-2 focus:ring-purple-300 focus:border-transparent outline-none bg-white/50 text-sm lg:text-base"
              />
            </div>
            <div>
              <label className="block text-xs lg:text-sm font-medium text-gray-700 mb-1.5 lg:mb-2">Confirm New Password</label>
              <input
                type="password"
                className="w-full px-3 lg:px-4 py-2 lg:py-2.5 xl:py-3 rounded-lg border border-purple-200 focus:ring-2 focus:ring-purple-300 focus:border-transparent outline-none bg-white/50 text-sm lg:text-base"
              />
            </div>
            <button className="w-full bg-gradient-to-r from-blue-400 to-purple-500 text-white py-2.5 lg:py-3 rounded-lg text-sm lg:text-base font-semibold hover:from-blue-500 hover:to-purple-600 transition-all">
              Update Password
            </button>
          </div>
        </div>

        {/* Course Preferences */}
        <div className="bg-white/80 backdrop-blur-sm rounded-lg lg:rounded-xl p-4 lg:p-5 xl:p-6 shadow-lg border border-purple-200/50">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-purple-600" />
            <h2 className="text-lg lg:text-xl font-bold text-gray-800">Course Preferences</h2>
          </div>
          <div className="space-y-3 lg:space-y-4">
            <div>
              <label className="block text-xs lg:text-sm font-medium text-gray-700 mb-1.5 lg:mb-2">Default Assignment Duration (days)</label>
              <input
                type="number"
                defaultValue="7"
                className="w-full px-3 lg:px-4 py-2 lg:py-2.5 xl:py-3 rounded-lg border border-purple-200 focus:ring-2 focus:ring-purple-300 focus:border-transparent outline-none bg-white/50 text-sm lg:text-base"
              />
            </div>
            <div>
              <label className="block text-xs lg:text-sm font-medium text-gray-700 mb-1.5 lg:mb-2">Default Quiz Duration (minutes)</label>
              <input
                type="number"
                defaultValue="30"
                className="w-full px-3 lg:px-4 py-2 lg:py-2.5 xl:py-3 rounded-lg border border-purple-200 focus:ring-2 focus:ring-purple-300 focus:border-transparent outline-none bg-white/50 text-sm lg:text-base"
              />
            </div>
            <div className="flex items-center justify-between p-3 lg:p-4 bg-purple-50 rounded-lg">
              <div>
                <p className="font-semibold text-sm lg:text-base text-gray-800">Auto-grade Quizzes</p>
                <p className="text-xs lg:text-sm text-gray-600">Automatically grade multiple choice questions</p>
              </div>
              <input type="checkbox" defaultChecked className="w-4 h-4 lg:w-5 lg:h-5 rounded border-purple-300 text-purple-500" />
            </div>
            <div className="flex items-center justify-between p-3 lg:p-4 bg-blue-50 rounded-lg">
              <div>
                <p className="font-semibold text-sm lg:text-base text-gray-800">AI-Assisted Grading</p>
                <p className="text-xs lg:text-sm text-gray-600">Use AI to assist in assignment grading</p>
              </div>
              <input type="checkbox" defaultChecked className="w-4 h-4 lg:w-5 lg:h-5 rounded border-purple-300 text-purple-500" />
            </div>
            <button className="w-full bg-gradient-to-r from-blue-400 to-purple-500 text-white py-2.5 lg:py-3 rounded-lg text-sm lg:text-base font-semibold hover:from-blue-500 hover:to-purple-600 transition-all">
              Save Preferences
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LecturerSettingsPage;

