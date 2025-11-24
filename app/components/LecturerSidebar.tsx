'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  BookOpen,
  FileText,
  HelpCircle,
  Upload,
  Settings,
  LogOut,
  Menu,
  X,
  Calendar,
} from 'lucide-react';
import { useUser } from '../context/UserContext';

interface SidebarItem {
  name: string;
  href: string;
  icon: React.ReactNode;
}

const sidebarItems: SidebarItem[] = [
  { name: 'Dashboard', href: '/lecturer/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
  { name: 'My Courses', href: '/lecturer/courses', icon: <BookOpen className="w-4 h-4" /> },
  { name: 'Materials', href: '/lecturer/materials', icon: <FileText className="w-4 h-4" /> },
  { name: 'Quizzes', href: '/lecturer/quizzes', icon: <HelpCircle className="w-4 h-4" /> },
  { name: 'Assignments', href: '/lecturer/assignments', icon: <FileText className="w-4 h-4" /> },
  { name: 'Grading', href: '/lecturer/grading', icon: <Upload className="w-4 h-4" /> },
  { name: 'Calendar', href: '/lecturer/calendar', icon: <Calendar className="w-4 h-4" /> },
  { name: 'Settings', href: '/lecturer/settings', icon: <Settings className="w-4 h-4" /> },
];

export default function LecturerSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useUser();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white/90 backdrop-blur-sm border border-purple-200/50 shadow-lg"
        aria-label="Toggle menu"
      >
        {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-screen bg-white/90 backdrop-blur-sm border-r border-purple-200/50 overflow-y-auto z-40 transition-transform duration-300 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 w-64`}
      >
        <div className="p-4 lg:p-6">
          <div className="mb-6 lg:mb-8">
            <h1 className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Ausi LMS
            </h1>
            <p className="text-xs text-gray-500 mt-1">Lecturer Portal</p>
          </div>

          <nav className="space-y-1 lg:space-y-2">
            {sidebarItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={`flex items-center space-x-2 lg:space-x-3 px-3 lg:px-4 py-2 lg:py-2.5 rounded-lg transition-all text-sm lg:text-base ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-400/20 to-purple-500/20 text-purple-700 font-semibold border-l-4 border-purple-500'
                      : 'text-gray-700 hover:bg-purple-50 hover:text-purple-600'
                  }`}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          <div className="mt-6 lg:mt-8 pt-6 lg:pt-8 border-t border-purple-200">
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-2 lg:space-x-3 px-3 lg:px-4 py-2 lg:py-2.5 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all text-sm lg:text-base"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

