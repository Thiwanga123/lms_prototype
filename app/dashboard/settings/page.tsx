const SettingsPage = () => {
  return (
    <div className="space-y-4 lg:space-y-6 xl:space-y-8">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-1 lg:mb-2">Settings</h1>
        <p className="text-sm lg:text-base text-gray-600">Manage your account and platform settings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        {/* Profile Settings */}
        <div className="bg-white/80 backdrop-blur-sm rounded-lg lg:rounded-xl p-4 lg:p-5 xl:p-6 shadow-lg border border-purple-200/50">
          <h2 className="text-lg lg:text-xl font-bold text-gray-800 mb-3 lg:mb-4">Profile Settings</h2>
          <div className="space-y-3 lg:space-y-4">
            <div>
              <label className="block text-xs lg:text-sm font-medium text-gray-700 mb-1.5 lg:mb-2">Full Name</label>
              <input
                type="text"
                defaultValue="Admin User"
                className="w-full px-3 lg:px-4 py-2 lg:py-2.5 xl:py-3 rounded-lg border border-purple-200 focus:ring-2 focus:ring-purple-300 focus:border-transparent outline-none bg-white/50 text-sm lg:text-base"
              />
            </div>
            <div>
              <label className="block text-xs lg:text-sm font-medium text-gray-700 mb-1.5 lg:mb-2">Email Address</label>
              <input
                type="email"
                defaultValue="admin@ausilms.com"
                className="w-full px-3 lg:px-4 py-2 lg:py-2.5 xl:py-3 rounded-lg border border-purple-200 focus:ring-2 focus:ring-purple-300 focus:border-transparent outline-none bg-white/50 text-sm lg:text-base"
              />
            </div>
            <button className="w-full bg-gradient-to-r from-blue-400 to-purple-500 text-white py-2.5 lg:py-3 rounded-lg text-sm lg:text-base font-semibold hover:from-blue-500 hover:to-purple-600 transition-all">
              Save Changes
            </button>
          </div>
        </div>

        {/* Platform Settings */}
        <div className="bg-white/80 backdrop-blur-sm rounded-lg lg:rounded-xl p-4 lg:p-5 xl:p-6 shadow-lg border border-purple-200/50">
          <h2 className="text-lg lg:text-xl font-bold text-gray-800 mb-3 lg:mb-4">Platform Settings</h2>
          <div className="space-y-3 lg:space-y-4">
            <div className="flex items-center justify-between p-3 lg:p-4 bg-purple-50 rounded-lg">
              <div>
                <p className="font-semibold text-sm lg:text-base text-gray-800">Email Notifications</p>
                <p className="text-xs lg:text-sm text-gray-600">Receive email updates</p>
              </div>
              <input type="checkbox" defaultChecked className="w-4 h-4 lg:w-5 lg:h-5 rounded border-purple-300 text-purple-500" />
            </div>
            <div className="flex items-center justify-between p-3 lg:p-4 bg-blue-50 rounded-lg">
              <div>
                <p className="font-semibold text-sm lg:text-base text-gray-800">SMS Notifications</p>
                <p className="text-xs lg:text-sm text-gray-600">Receive SMS updates</p>
              </div>
              <input type="checkbox" className="w-4 h-4 lg:w-5 lg:h-5 rounded border-purple-300 text-purple-500" />
            </div>
            <div className="flex items-center justify-between p-3 lg:p-4 bg-purple-50 rounded-lg">
              <div>
                <p className="font-semibold text-sm lg:text-base text-gray-800">Auto-save</p>
                <p className="text-xs lg:text-sm text-gray-600">Automatically save changes</p>
              </div>
              <input type="checkbox" defaultChecked className="w-4 h-4 lg:w-5 lg:h-5 rounded border-purple-300 text-purple-500" />
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-white/80 backdrop-blur-sm rounded-lg lg:rounded-xl p-4 lg:p-5 xl:p-6 shadow-lg border border-purple-200/50">
          <h2 className="text-lg lg:text-xl font-bold text-gray-800 mb-3 lg:mb-4">Security</h2>
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

        {/* System Info */}
        <div className="bg-white/80 backdrop-blur-sm rounded-lg lg:rounded-xl p-4 lg:p-5 xl:p-6 shadow-lg border border-purple-200/50">
          <h2 className="text-lg lg:text-xl font-bold text-gray-800 mb-3 lg:mb-4">System Information</h2>
          <div className="space-y-2 lg:space-y-3">
            <div className="flex justify-between p-2.5 lg:p-3 bg-purple-50 rounded-lg">
              <span className="text-xs lg:text-sm text-gray-600">Platform Version</span>
              <span className="font-semibold text-xs lg:text-sm text-gray-800">v1.0.0</span>
            </div>
            <div className="flex justify-between p-2.5 lg:p-3 bg-blue-50 rounded-lg">
              <span className="text-xs lg:text-sm text-gray-600">Last Updated</span>
              <span className="font-semibold text-xs lg:text-sm text-gray-800">2025-11-10</span>
            </div>
            <div className="flex justify-between p-2.5 lg:p-3 bg-purple-50 rounded-lg">
              <span className="text-xs lg:text-sm text-gray-600">Total Users</span>
              <span className="font-semibold text-xs lg:text-sm text-gray-800">1,234</span>
            </div>
            <div className="flex justify-between p-2.5 lg:p-3 bg-blue-50 rounded-lg">
              <span className="text-xs lg:text-sm text-gray-600">Storage Used</span>
              <span className="font-semibold text-xs lg:text-sm text-gray-800">45%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;

