import React from 'react';

type Props = {
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
  className?: string;
  variant?: 'dark' | 'light';
};

export default function Card({ title, subtitle, children, className = '', variant = 'dark' }: Props) {
  // padrão: dark (integra com o tema do seu app)
  const base = variant === 'dark'
    ? 'bg-neutral-800 rounded-lg border border-neutral-700 p-4 shadow-card text-gray-100'
    : 'bg-white rounded-lg border border-gray-200 p-4 shadow-sm text-gray-900';

  return (
    <div className={`${base} ${className}`}>
      {(title || subtitle) && (
        <div className="mb-2">
          {title && <h3 className="text-lg font-semibold">{title}</h3>}
          {subtitle && <p className="text-sm text-neutral-400 mt-1">{subtitle}</p>}
        </div>
      )}

      {children && <div className="mt-2 text-sm text-gray-200">{children}</div>}
    </div>
  );
}
