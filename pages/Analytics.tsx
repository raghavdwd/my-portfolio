import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";
import { useAuth } from "../context/AuthContext";
import { getAnalyticsSummary } from "../services/shortUrlApi";
import { AnalyticsSummary } from "../types";

const Analytics: React.FC = () => {
  const [data, setData] = useState<AnalyticsSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const { isAuthenticated, token, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      if (!token) return;

      try {
        const response = await getAnalyticsSummary(token);
        if (response.success && response.data) {
          setData(response.data);
        } else {
          setError(response.message || "Failed to load analytics");
        }
      } catch (err) {
        setError("Network error. Please try again.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (isAuthenticated && token) {
      fetchData();
    }
  }, [token, isAuthenticated]);

  const COLORS = ["#10b981", "#06b6d4", "#f59e0b", "#8b5cf6"];

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#020617" }}>
      {/* background effects */}
      <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-900/5 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-cyan-900/5 rounded-full blur-[150px]"></div>
      </div>

      {/* header */}
      <header
        className="sticky top-0 z-40 border-b"
        style={{
          background: "rgba(2, 6, 23, 0.8)",
          backdropFilter: "blur(12px)",
          borderColor: "rgba(255, 255, 255, 0.08)",
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/dashboard")}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
            </button>
            <h1 className="text-xl font-bold text-white">Analytics</h1>
          </div>
          <button
            onClick={logout}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-sm transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      {/* content */}
      <main className="container mx-auto px-4 sm:px-6 py-8">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="flex items-center gap-3 text-slate-400">
              <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              Loading analytics...
            </div>
          </div>
        ) : error || !data ? (
          <div className="text-center py-20 text-red-400">{error}</div>
        ) : (
          <div className="space-y-6">
            {/* overview cards */}
            <div className="grid grid-cols-2 gap-4">
              <div
                className="p-5 rounded-xl"
                style={{
                  background: "rgba(15, 23, 42, 0.6)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                }}
              >
                <p className="text-sm text-slate-400 mb-1">Total Visits</p>
                <p className="text-3xl font-bold text-white">
                  {data.totalVisits}
                </p>
              </div>
              <div
                className="p-5 rounded-xl"
                style={{
                  background: "rgba(15, 23, 42, 0.6)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                }}
              >
                <p className="text-sm text-slate-400 mb-1">Active Links</p>
                <p className="text-3xl font-bold text-white">
                  {data.totalLinks}
                </p>
              </div>
            </div>

            {/* charts grid */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* top links chart */}
              <div
                className="p-6 rounded-xl"
                style={{
                  background: "rgba(15, 23, 42, 0.6)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                }}
              >
                <h3 className="text-lg font-semibold text-white mb-6">
                  Top Performing Links
                </h3>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={data.topLinks}
                      layout="vertical"
                      margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
                    >
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#334155"
                        horizontal={false}
                      />
                      <XAxis type="number" stroke="#94a3b8" />
                      <YAxis
                        dataKey="slug"
                        type="category"
                        stroke="#94a3b8"
                        width={80}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#1e293b",
                          border: "none",
                          borderRadius: "8px",
                          color: "#fff",
                        }}
                        cursor={{ fill: "rgba(255,255,255,0.05)" }}
                      />
                      <Bar
                        dataKey="visits"
                        fill="#10b981"
                        radius={[0, 4, 4, 0]}
                        barSize={20}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* content type distribution */}
              <div
                className="p-6 rounded-xl"
                style={{
                  background: "rgba(15, 23, 42, 0.6)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                }}
              >
                <h3 className="text-lg font-semibold text-white mb-6">
                  Traffic by Type
                </h3>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={data.byType}
                        dataKey="visits"
                        nameKey="contentType"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        innerRadius={60}
                        fill="#8884d8"
                        paddingAngle={5}
                      >
                        {data.byType.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#1e293b",
                          border: "none",
                          borderRadius: "8px",
                          color: "#fff",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                {/* legend */}
                <div className="flex justify-center gap-4 mt-4">
                  {data.byType.map((entry, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{
                          backgroundColor: COLORS[index % COLORS.length],
                        }}
                      />
                      <span className="text-sm text-slate-300">
                        {entry.contentType} ({entry.visits})
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Analytics;
