import { Plus, Edit, Trash2, User } from 'lucide-react';

const AnnouncementsPage = () => {
  const announcements = [
    { id: 1, title: 'Holiday Break Schedule', content: 'The LMS will be on holiday break from November 28th to December 2nd.', date: '2025-11-10', author: 'Admin' },
    { id: 2, title: 'New Course Available', content: 'We are excited to announce our new "CHCECE049 - Embed Environmental Responsibility" course starting next month!', date: '2025-11-08', author: 'Admin' },
    { id: 3, title: 'Assignment Submission Reminder', content: 'Please remember to submit your childcare assignments (Behaviour Observation, Inclusion Plans) before the due date to avoid penalties.', date: '2025-11-05', author: 'Admin' },
    { id: 4, title: 'System Maintenance', content: 'Scheduled maintenance will occur on November 15th from 2 AM to 4 AM.', date: '2025-11-01', author: 'Admin' },
  ];

  return (
    <div className="space-y-4 lg:space-y-6 xl:space-y-8">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-1 lg:mb-2">Announcements</h1>
          <p className="text-sm lg:text-base text-gray-600">Create and manage platform announcements</p>
        </div>
        <button className="bg-gradient-to-r from-blue-400 to-purple-500 text-white px-4 lg:px-6 py-2 lg:py-3 rounded-lg text-sm lg:text-base font-semibold hover:from-blue-500 hover:to-purple-600 transition-all shadow-lg flex items-center justify-center gap-2">
          <Plus className="w-4 h-4 lg:w-5 lg:h-5" />
          Create Announcement
        </button>
      </div>

      <div className="space-y-3 lg:space-y-4">
        {announcements.map((announcement) => (
          <div
            key={announcement.id}
            className="bg-white/80 backdrop-blur-sm rounded-lg lg:rounded-xl p-4 lg:p-5 xl:p-6 shadow-lg border border-purple-200/50 hover:shadow-xl transition-all"
          >
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
              <div className="flex-1 min-w-0">
                <h3 className="text-lg lg:text-xl font-bold text-gray-800 mb-2 break-words">{announcement.title}</h3>
                <p className="text-sm lg:text-base text-gray-600 mb-3 lg:mb-4">{announcement.content}</p>
              </div>
              <span className="px-2 lg:px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold whitespace-nowrap self-start sm:self-auto">
                {new Date(announcement.date).toLocaleDateString()}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center space-x-2">
                <div className="w-7 h-7 lg:w-8 lg:h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white">
                  <User className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                </div>
                <span className="text-xs lg:text-sm text-gray-600">By {announcement.author}</span>
              </div>
              <div className="flex space-x-2">
                <button className="px-3 lg:px-4 py-2 bg-purple-100 text-purple-700 rounded-lg text-xs lg:text-sm font-semibold hover:bg-purple-200 transition-all flex items-center gap-1.5 lg:gap-2">
                  <Edit className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                  Edit
                </button>
                <button className="px-3 lg:px-4 py-2 bg-red-100 text-red-700 rounded-lg text-xs lg:text-sm font-semibold hover:bg-red-200 transition-all flex items-center gap-1.5 lg:gap-2">
                  <Trash2 className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnnouncementsPage;

