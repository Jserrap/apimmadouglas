import React from 'react';

type Props = {
  title: string;
  value: number | string;
  icon?: React.ReactNode;
  className?: string;
};

export default function StatCard({ title, value, icon, className = '' }: Props) {
  return (
    <div className={`bg-neutral-800 border border-neutral-700 rounded-lg p-4 flex items-center justify-between ${className}`}>
      <div>
        <div className="text-2xl font-semibold text-white">{value}</div>
        <div className="text-sm text-neutral-400">{title}</div>
      </div>
      <div className="ml-4">
        <div className="w-10 h-10 rounded-md flex items-center justify-center bg-neutral-700 text-white">
          {icon}
        </div>
      </div>
    </div>
  );
}
