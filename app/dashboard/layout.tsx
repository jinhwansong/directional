'use client';

import { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import { Menu, X } from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-(--light-gray)">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex flex-1 flex-col lg:ml-[240px]">
        <div className="sticky top-0 z-30 flex h-[60px] items-center gap-4 border-b border-(--pale-gray) bg-white px-4 lg:hidden">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-(--font-color) hover:bg-(--light-gray)"
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>

        <div className="hidden lg:block">
          <Header />
        </div>

        <main className="lg:flex-1">
          <div className="mx-auto w-full lg:max-w-[1280px] px-8 py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

