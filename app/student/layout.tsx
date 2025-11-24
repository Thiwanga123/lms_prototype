import StudentSidebar from '../components/StudentSidebar';
import StudentLayoutClient from './StudentLayoutClient';

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StudentLayoutClient>
      <div className="flex min-h-screen">
        <StudentSidebar />
        <main className="flex-1 lg:ml-64 p-4 lg:p-6 xl:p-8 pt-16 lg:pt-8">
          {children}
        </main>
      </div>
    </StudentLayoutClient>
  );
}
