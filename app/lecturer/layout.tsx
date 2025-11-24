import LecturerSidebar from '../components/LecturerSidebar';
import LecturerLayoutClient from './LecturerLayoutClient';

export default function LecturerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LecturerLayoutClient>
      <div className="flex min-h-screen">
        <LecturerSidebar />
        <main className="flex-1 lg:ml-64 p-4 lg:p-6 xl:p-8 pt-16 lg:pt-8">
          {children}
        </main>
      </div>
    </LecturerLayoutClient>
  );
}
