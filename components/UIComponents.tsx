import React from "react";

export const Card: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = "" }) => {
  return (
    <div
      className={`p-5 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-100 dark:border-zinc-800 ${className}`}
    >
      {children}
    </div>
  );
};

export const SkillCard: React.FC<{
  name: string;
  className?: string;
}> = ({ name, className = "" }) => {
  return (
    <span
      className={`inline-block px-3 py-1.5 text-sm text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800/60 rounded-md ${className}`}
    >
      {name}
    </span>
  );
};

export const SectionTitle: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-5">
      {children}
    </h2>
  );
};
