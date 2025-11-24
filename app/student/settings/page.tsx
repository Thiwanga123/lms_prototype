'use client';

import { User, Mail, Phone, Lock, Bell, BookOpen, GraduationCap } from 'lucide-react';
import { useUser } from '../../context/UserContext';

const StudentSettingsPage = () => {
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
                defaultValue={user?.name || 'John Doe'}
                className="w-full px-3 lg:px-4 py-2 lg:py-2.5 xl:py-3 rounded-lg border border-purple-200 focus:ring-2 focus:ring-purple-300 focus:border-transparent outline-none bg-white/50 text-sm lg:text-base"
              />
            </div>
            <div>
              <label className="block text-xs lg:text-sm font-medium text-gray-700 mb-1.5 lg:mb-2">Email Address</label>
              <input
                type="email"
                defaultValue={user?.email || 'student@ausilms.com'}
                className="w-full px-3 lg:px-4 py-2 lg:py-2.5 xl:py-3 rounded-lg border border-purple-200 focus:ring-2 focus:ring-purple-300 focus:border-transparent outline-none bg-white/50 text-sm lg:text-base"
              />
            </div>
            <div>
              <label className="block text-xs lg:text-sm font-medium text-gray-700 mb-1.5 lg:mb-2">Phone Number</label>
              <input
                type="tel"
                defaultValue="+61 400 123 456"
                className="w-full px-3 lg:px-4 py-2 lg:py-2.5 xl:py-3 rounded-lg border border-purple-200 focus:ring-2 focus:ring-purple-300 focus:border-transparent outline-none bg-white/50 text-sm lg:text-base"
              />
            </div>
            <div>
              <label className="block text-xs lg:text-sm font-medium text-gray-700 mb-1.5 lg:mb-2">Student ID</label>
              <input
                type="text"
                defaultValue="STU2025001"
                className="w-full px-3 lg:px-4 py-2 lg:py-2.5 xl:py-3 rounded-lg border border-purple-200 focus:ring-2 focus:ring-purple-300 focus:border-transparent outline-none bg-white/50 text-sm lg:text-base"
                disabled
              />
            </div>
            <div>
              <label className="block text-xs lg:text-sm font-medium text-gray-700 mb-1.5 lg:mb-2">Enrollment Date</label>
              <input
                type="text"
                defaultValue="September 2025"
                className="w-full px-3 lg:px-4 py-2 lg:py-2.5 xl:py-3 rounded-lg border border-purple-200 focus:ring-2 focus:ring-purple-300 focus:border-transparent outline-none bg-white/50 text-sm lg:text-base"
                disabled
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
                <p className="font-semibold text-sm lg:text-base text-gray-800">Assignment Reminders</p>
                <p className="text-xs lg:text-sm text-gray-600">Get notified before assignment deadlines</p>
              </div>
              <input type="checkbox" defaultChecked className="w-4 h-4 lg:w-5 lg:h-5 rounded border-purple-300 text-purple-500" />
            </div>
            <div className="flex items-center justify-between p-3 lg:p-4 bg-blue-50 rounded-lg">
              <div>
                <p className="font-semibold text-sm lg:text-base text-gray-800">Grade Updates</p>
                <p className="text-xs lg:text-sm text-gray-600">Notifications when grades are posted</p>
              </div>
              <input type="checkbox" defaultChecked className="w-4 h-4 lg:w-5 lg:h-5 rounded border-purple-300 text-purple-500" />
            </div>
            <div className="flex items-center justify-between p-3 lg:p-4 bg-purple-50 rounded-lg">
              <div>
                <p className="font-semibold text-sm lg:text-base text-gray-800">Course Announcements</p>
                <p className="text-xs lg:text-sm text-gray-600">Updates from your courses</p>
              </div>
              <input type="checkbox" defaultChecked className="w-4 h-4 lg:w-5 lg:h-5 rounded border-purple-300 text-purple-500" />
            </div>
            <div className="flex items-center justify-between p-3 lg:p-4 bg-blue-50 rounded-lg">
              <div>
                <p className="font-semibold text-sm lg:text-base text-gray-800">Email Notifications</p>
                <p className="text-xs lg:text-sm text-gray-600">Receive notifications via email</p>
              </div>
              <input type="checkbox" defaultChecked className="w-4 h-4 lg:w-5 lg:h-5 rounded border-purple-300 text-purple-500" />
            </div>
            <div className="flex items-center justify-between p-3 lg:p-4 bg-purple-50 rounded-lg">
              <div>
                <p className="font-semibold text-sm lg:text-base text-gray-800">SMS Notifications</p>
                <p className="text-xs lg:text-sm text-gray-600">Receive notifications via SMS</p>
              </div>
              <input type="checkbox" className="w-4 h-4 lg:w-5 lg:h-5 rounded border-purple-300 text-purple-500" />
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

        {/* Academic Information */}
        <div className="bg-white/80 backdrop-blur-sm rounded-lg lg:rounded-xl p-4 lg:p-5 xl:p-6 shadow-lg border border-purple-200/50">
          <div className="flex items-center gap-2 mb-4">
            <GraduationCap className="w-5 h-5 text-purple-600" />
            <h2 className="text-lg lg:text-xl font-bold text-gray-800">Academic Information</h2>
          </div>
          <div className="space-y-3 lg:space-y-4">
            <div className="p-3 lg:p-4 bg-purple-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs lg:text-sm text-gray-600">Enrolled Courses</span>
                <span className="font-semibold text-sm lg:text-base text-gray-800">2</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs lg:text-sm text-gray-600">Completed Assignments</span>
                <span className="font-semibold text-sm lg:text-base text-gray-800">3</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs lg:text-sm text-gray-600">Pending Assignments</span>
                <span className="font-semibold text-sm lg:text-base text-gray-800">2</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs lg:text-sm text-gray-600">Overall Average</span>
                <span className="font-semibold text-sm lg:text-base text-gray-800">89.2%</span>
              </div>
            </div>
            <div className="p-3 lg:p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs lg:text-sm text-gray-600">Current Semester</span>
                <span className="font-semibold text-sm lg:text-base text-gray-800">Fall 2025</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs lg:text-sm text-gray-600">Academic Year</span>
                <span className="font-semibold text-sm lg:text-base text-gray-800">2025-2026</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs lg:text-sm text-gray-600">Status</span>
                <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentSettingsPage;

