'use client';

import { useUser } from '../context/UserContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function StudentLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user || user.role !== 'student') {
      router.push('/login');
    }
  }, [user, router]);

  if (!user || user.role !== 'student') {
    return null;
  }

  return <>{children}</>;
}

