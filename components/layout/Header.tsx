import { User } from 'lucide-react';

interface HeaderProps {
  title?: string;
}

export default function Header({ title = 'Dashboard' }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-[60px] items-center justify-between border-b border-(--pale-gray) bg-white px-6">
      <h2 className="text-lg font-semibold text-(--font-color)">{title}</h2>
      
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-(--pale-gray)">
          <User className="h-4 w-4 text-(--deep-gray)" />
        </div>
      </div>
    </header>
  );
}

