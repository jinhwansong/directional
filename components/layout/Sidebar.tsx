'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {  FileText, BarChart3 } from 'lucide-react';
import { cn } from '@/utils/helpers';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const menuItems = [
  { label: '게시글 관리', href: '/dashboard/posts', icon: FileText },
  { label: '데이터 분석', href: '/dashboard/charts', icon: BarChart3 },
];

export default function Sidebar({ isOpen = true, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          'fixed left-0 top-0 z-50 h-screen w-[240px] border-r border-(--pale-gray) bg-white transition-transform lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex h-full flex-col">
          <div className="flex h-[60px] items-center border-b border-(--pale-gray) px-6">
            <h1 className="text-lg font-bold text-(--font-color)">
              Directional
            </h1>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 space-y-1 p-4">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-4 py-3 text-sm transition-colors',
                    'text-(--font-color) hover:bg-(--light-gray)',
                    isActive
                      ? 'bg-(--sbl-pink) font-semibold text-white hover:bg-(--sbl-pink)'
                      : 'font-normal'
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
}

