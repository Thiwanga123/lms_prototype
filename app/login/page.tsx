'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useUser } from '../context/UserContext';
import Lottie from 'lottie-react';
import educationAnimation from '../../public/education.json';

export default function LoginPage() {
  const router = useRouter();
  const { setUser } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'admin' | 'lecturer' | 'student'>('admin');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Set user based on role
    const userData = {
      id: '1',
      name: role === 'admin' ? 'Admin User' : role === 'lecturer' ? 'Dr. Sarah Johnson' : 'John Doe',
      email: email || `${role}@ausilms.com`,
      role: role,
    };
    
    setUser(userData);
    
    // Redirect based on role
    if (role === 'admin') {
      router.push('/dashboard');
    } else if (role === 'lecturer') {
      router.push('/lecturer/dashboard');
    } else {
      router.push('/student/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/80 backdrop-blur-sm rounded-xl lg:rounded-2xl shadow-xl p-6 lg:p-8 border border-purple-200/50">
          <div className="text-center mb-6 lg:mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-24 h-24 lg:w-32 lg:h-32">
                <Lottie 
                  animationData={educationAnimation} 
                  loop={true}
                  autoplay={true}
                  style={{ width: '100%', height: '100%' }}
                />
              </div>
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">
              Learning Management System
            </h1>
            <p className="text-gray-600 text-xs lg:text-sm">Australian Advanced AI Integrated Platform</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 lg:space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Login As
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setRole('admin')}
                  className={`py-2 px-3 rounded-lg text-xs lg:text-sm font-semibold transition-all ${
                    role === 'admin'
                      ? 'bg-gradient-to-r from-blue-400 to-purple-500 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Admin
                </button>
                <button
                  type="button"
                  onClick={() => setRole('lecturer')}
                  className={`py-2 px-3 rounded-lg text-xs lg:text-sm font-semibold transition-all ${
                    role === 'lecturer'
                      ? 'bg-gradient-to-r from-blue-400 to-purple-500 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Lecturer
                </button>
                <button
                  type="button"
                  onClick={() => setRole('student')}
                  className={`py-2 px-3 rounded-lg text-xs lg:text-sm font-semibold transition-all ${
                    role === 'student'
                      ? 'bg-gradient-to-r from-blue-400 to-purple-500 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Student
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 lg:px-4 py-2.5 lg:py-3 rounded-lg border border-purple-200 focus:ring-2 focus:ring-purple-300 focus:border-transparent outline-none transition-all bg-white/50 text-sm lg:text-base"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 lg:px-4 py-2.5 lg:py-3 rounded-lg border border-purple-200 focus:ring-2 focus:ring-purple-300 focus:border-transparent outline-none transition-all bg-white/50 text-sm lg:text-base"
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-purple-300 text-purple-500 focus:ring-purple-300" />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <a href="#" className="text-sm text-purple-600 hover:text-purple-700">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-400 to-purple-500 text-white py-2.5 lg:py-3 rounded-lg text-sm lg:text-base font-semibold hover:from-blue-500 hover:to-purple-600 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Sign In as {role.charAt(0).toUpperCase() + role.slice(1)}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link href="/signup" className="text-purple-600 font-semibold hover:text-purple-700">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
