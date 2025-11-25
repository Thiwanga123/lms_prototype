'use client';

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex items-center space-x-1 lg:space-x-2 text-sm lg:text-base mb-4 lg:mb-6" aria-label="Breadcrumb">
      <Link 
        href="/dashboard" 
        className="text-gray-500 hover:text-purple-600 transition-colors flex items-center"
      >
        <Home className="w-4 h-4 lg:w-5 lg:h-5" />
      </Link>
      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-1 lg:space-x-2">
          <ChevronRight className="w-4 h-4 text-gray-400" />
          {item.href && index < items.length - 1 ? (
            <Link
              href={item.href}
              className="text-gray-500 hover:text-purple-600 transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className={`${index === items.length - 1 ? 'text-gray-800 font-semibold' : 'text-gray-500'}`}>
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  );
}

