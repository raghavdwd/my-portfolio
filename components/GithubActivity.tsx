import React, { useEffect, useState, useMemo } from "react";
import { ExternalLink } from "lucide-react";

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

  const weeks = useMemo(() => {
    if (!data?.contributions) return [];

    const days = data.contributions;
    const weeksArray: Contribution[][] = [];
    let currentWeek: Contribution[] = [];

    const firstDate = new Date(days[0].date);
    const dayOfWeek = firstDate.getDay();

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

    if (currentWeek.length > 0) {
      weeksArray.push(currentWeek);
    }

    return weeksArray;
  }, [data]);

  const getLevelColor = (level: number) => {
    const colors = [
      "bg-zinc-100 dark:bg-zinc-800",
      "bg-emerald-200 dark:bg-emerald-900",
      "bg-emerald-300 dark:bg-emerald-700",
      "bg-emerald-400 dark:bg-emerald-600",
      "bg-emerald-500 dark:bg-emerald-500",
    ];
    if (level === -1) return "bg-transparent";
    return colors[level] || colors[0];
  };

  if (loading) {
    return (
      <div className="h-28 bg-zinc-100 dark:bg-zinc-900 rounded-lg animate-pulse" />
    );
  }

  if (error || !data) {
    return (
      <div className="p-4 bg-zinc-100 dark:bg-zinc-900 rounded-lg text-center text-sm text-zinc-500">
        Unable to load activity.{" "}
        <a
          href="https://github.com/raghavdwd"
          target="_blank"
          rel="noreferrer"
          className="text-zinc-900 dark:text-white hover:underline"
        >
          View on GitHub
        </a>
      </div>
    );
  }

  const totalContributions = data.total.lastYear || 0;

  return (
    <div className="p-4 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-100 dark:border-zinc-800">
      <div className="w-full overflow-x-auto">
        <div className="min-w-max">
          <div className="flex gap-[2px]">
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-[2px]">
                {week.map((day, dayIndex) => (
                  <div
                    key={`${weekIndex}-${dayIndex}`}
                    className={`w-[10px] h-[10px] rounded-sm ${getLevelColor(
                      day.level
                    )}`}
                    title={day.date ? `${day.count} on ${day.date}` : ""}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between mt-3 text-xs text-zinc-500">
        <span>{totalContributions} contributions last year</span>
        <a
          href="https://github.com/raghavdwd"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1 hover:text-zinc-900 dark:hover:text-white transition-colors"
        >
          @raghavdwd <ExternalLink size={10} />
        </a>
      </div>
    </div>
  );
};
