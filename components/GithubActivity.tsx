import React, { useEffect, useState, useMemo } from "react";
import { Github, ExternalLink, Loader2 } from "lucide-react";

interface Contribution {
  date: string;
  count: number;
  level: number;
}

interface ApiResponse {
  total: {
    [year: string]: number;
    lastYear: number;
  };
  contributions: Contribution[];
}

export const GithubActivity: React.FC = () => {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Fetch last year's contributions using a public proxy
    fetch("https://github-contributions-api.jogruber.de/v4/raghavdwd?y=last")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  // Process data into weeks for the grid
  const weeks = useMemo(() => {
    if (!data?.contributions) return [];

    const days = data.contributions;
    const weeksArray: Contribution[][] = [];
    let currentWeek: Contribution[] = [];

    // Calculate padding for the first week to align days correctly
    // GitHub weeks usually start on Sunday (0)
    const firstDate = new Date(days[0].date);
    const dayOfWeek = firstDate.getDay(); // 0 = Sunday

    // Add placeholders for days before the start date
    for (let i = 0; i < dayOfWeek; i++) {
      currentWeek.push({ date: "", count: 0, level: -1 });
    }

    days.forEach((day) => {
      currentWeek.push(day);
      if (currentWeek.length === 7) {
        weeksArray.push(currentWeek);
        currentWeek = [];
      }
    });

    // Push remaining days
    if (currentWeek.length > 0) {
      weeksArray.push(currentWeek);
    }

    return weeksArray;
  }, [data]);

  // GitHub specific colors
  const getLevelColor = (level: number) => {
    // Dark Mode Colors
    const darkColors = [
      "dark:bg-[#161b22]", // Level 0
      "dark:bg-[#0e4429]", // Level 1
      "dark:bg-[#006d32]", // Level 2
      "dark:bg-[#26a641]", // Level 3
      "dark:bg-[#39d353]", // Level 4
    ];

    // Light Mode Colors
    const lightColors = [
      "bg-[#ebedf0]", // Level 0
      "bg-[#9be9a8]", // Level 1
      "bg-[#40c463]", // Level 2
      "bg-[#30a14e]", // Level 3
      "bg-[#216e39]", // Level 4
    ];

    if (level === -1) return "bg-transparent"; // Placeholder
    return `${lightColors[level] || lightColors[0]} ${
      darkColors[level] || darkColors[0]
    }`;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
        <Loader2 className="animate-spin text-slate-400" size={24} />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center text-slate-500">
        Unable to load GitHub activity.
        <a
          href="https://github.com/raghavdwd"
          target="_blank"
          rel="noreferrer"
          className="text-primary-500 hover:underline ml-1"
        >
          View on GitHub
        </a>
      </div>
    );
  }

  const totalContributions =
    data.total.lastYear || Object.values(data.total).reduce((a, b) => a + b, 0);

  return (
    <div className="p-4 md:p-6 bg-white dark:bg-[#0d1117] rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="flex flex-col gap-4">
        {/* Graph Container with Scroll */}
        <div className="w-full overflow-x-auto pb-2 custom-scrollbar">
          <div className="min-w-max">
            {/* Weeks Row */}
            <div className="flex gap-[3px]">
              {weeks.map((week, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-[3px]">
                  {week.map((day, dayIndex) => (
                    <div
                      key={`${weekIndex}-${dayIndex}`}
                      className={`w-[10px] h-[10px] rounded-[2px] ${getLevelColor(
                        day.level
                      )}`}
                      title={
                        day.date
                          ? `${day.count} contributions on ${day.date}`
                          : ""
                      }
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer: Stats & Legend */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400 pt-2">
          <div className="flex items-center gap-4">
            <span className="font-medium text-slate-900 dark:text-slate-200">
              {totalContributions} contributions in the last year
            </span>
            <a
              href="https://github.com/raghavdwd"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 hover:text-primary-500 transition-colors"
            >
              raghavdwd <ExternalLink size={10} />
            </a>
          </div>

          <div className="flex items-center gap-2">
            <span>Less</span>
            <div className="flex gap-[3px]">
              {[0, 1, 2, 3, 4].map((level) => (
                <div
                  key={level}
                  className={`w-[10px] h-[10px] rounded-[2px] ${getLevelColor(
                    level
                  )}`}
                />
              ))}
            </div>
            <span>More</span>
          </div>
        </div>
      </div>
    </div>
  );
};
