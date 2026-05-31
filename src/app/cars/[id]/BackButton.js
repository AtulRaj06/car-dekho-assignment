'use client';

export default function BackButton({ children, className }) {
  return (
    <button onClick={() => window.history.back()} className={className}>
      {children}
    </button>
  );
}
