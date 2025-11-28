import { ReactNode } from 'react';

interface PageWrapperProps {
  children: ReactNode;
}

export default function PageWrapper({ children }: PageWrapperProps) {
  return (
    <div className="mx-auto w-full max-w-[1280px] px-8 py-8">{children}</div>
  );
}
