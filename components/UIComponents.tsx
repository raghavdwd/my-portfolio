import React from "react";

// Minimalist Badge - Ghost style
export const Badge: React.FC<{
  children: React.ReactNode;
  variant?: "primary" | "outline" | "secondary";
}> = ({ children, variant = "primary" }) => {
  const baseClasses =
    "px-3 py-1 rounded-full text-xs font-medium transition-all duration-200";
  const variants = {
    primary: "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100",
    outline:
      "bg-transparent border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400",
    secondary:
      "bg-primary-50 text-primary-900 dark:bg-primary-900/20 dark:text-primary-100",
  };

  return (
    <span className={`${baseClasses} ${variants[variant]}`}>{children}</span>
  );
};

// Minimalist Card - Glassmorphism, no border, subtle shadow
export const Card: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = "" }) => {
  return (
    <div
      className={`p-6 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 ${className}`}
    >
      {children}
    </div>
  );
};

// Minimalist Skill Card - Icon predominant, clean text
export const SkillCard: React.FC<{
  name: string;
  icon: string | React.ReactNode;
  className?: string;
}> = ({ name, icon, className = "" }) => {
  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 bg-zinc-50 dark:bg-zinc-900/40 rounded-xl hover:bg-white dark:hover:bg-zinc-800 transition-colors duration-300 group ${className}`}
    >
      <div className="w-5 h-5 flex items-center justify-center shrink-0 opacity-70 group-hover:opacity-100 transition-opacity">
        {typeof icon === "string" ? (
          <img
            src={icon}
            alt={name}
            className={`w-full h-full object-contain ${
              name.includes("Express") ||
              name.includes("Next") ||
              name.includes("GitHub")
                ? "dark:invert"
                : ""
            }`}
          />
        ) : (
          <div className="text-zinc-500 dark:text-zinc-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
            {icon}
          </div>
        )}
      </div>
      <span className="font-sans text-sm font-medium text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors">
        {name}
      </span>
    </div>
  );
};

// Minimalist Section Header - Clean, tracking-wide
export const SectionTitle: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-6 ml-1">
      {children}
    </h2>
  );
};
