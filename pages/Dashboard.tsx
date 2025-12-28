import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  listShortUrls,
  deleteShortUrl,
  getShortUrlLink,
  getAnalyticsSummary,
} from "../services/shortUrlApi";
import { ShortUrl, AnalyticsSummary } from "../types";
import CreateUrlModal from "../components/CreateUrlModal";
import Pagination from "../components/Pagination";

const ITEMS_PER_PAGE = 10;

type SortOption = "date-desc" | "date-asc" | "visits-desc" | "name-asc";

const Dashboard: React.FC = () => {
  const [urls, setUrls] = useState<ShortUrl[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [deletingSlug, setDeletingSlug] = useState<string | null>(null);

  // search and filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("date-desc");

  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const { isAuthenticated, token, logout } = useAuth();
  const navigate = useNavigate();

  // redirecting to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const fetchData = useCallback(async () => {
    if (!token) return;

    setIsLoading(true);
    setError("");

    try {
      // fetching URLs and analytics in parallel
      const [urlsResponse, analyticsResponse] = await Promise.all([
        listShortUrls(token),
        getAnalyticsSummary(token),
      ]);

      if (urlsResponse.success && urlsResponse.data) {
        setUrls(urlsResponse.data);
      } else {
        setError(urlsResponse.message || "Failed to fetch URLs");
      }

      if (analyticsResponse.success && analyticsResponse.data) {
        setAnalytics(analyticsResponse.data);
      }
    } catch (err) {
      setError("Network error. Please try again.");
      console.error("Fetch data error:", err);
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (isAuthenticated && token) {
      fetchData();
    }
  }, [isAuthenticated, token, fetchData]);

  // filtering and sorting logic
  const filteredAndSortedUrls = useMemo(() => {
    let result = [...urls];

    // search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (url) =>
          url.slug.toLowerCase().includes(query) ||
          url.content.toLowerCase().includes(query)
      );
    }

    // sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case "date-asc":
          return (
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
        case "date-desc":
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        case "name-asc":
          return a.slug.localeCompare(b.slug);
        default:
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
      }
    });

    return result;
  }, [urls, searchQuery, sortBy]);

  // resetting pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, sortBy]);

  const handleDelete = async (slug: string) => {
    if (!token) return;
    if (!confirm("Are you sure you want to delete this URL?")) return;

    setDeletingSlug(slug);
    try {
      const response = await deleteShortUrl(token, slug);
      if (response.success) {
        setUrls((prev) => prev.filter((url) => url.slug !== slug));
        // updating analytics after deletion
        if (analytics) {
          setAnalytics({
            ...analytics,
            totalLinks: analytics.totalLinks - 1,
          });
        }
        showNotification("success", "URL deleted successfully");
      } else {
        showNotification("error", response.message || "Failed to delete URL");
      }
    } catch (err) {
      showNotification("error", "Network error. Please try again.");
      console.error("Delete URL error:", err);
    } finally {
      setDeletingSlug(null);
    }
  };

  const handleUrlCreated = () => {
    fetchData();
    setIsModalOpen(false);
    showNotification("success", "Short URL created successfully!");
  };

  const showNotification = (type: "success" | "error", message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      showNotification("success", "Copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // pagination calculations
  const totalPages = Math.ceil(filteredAndSortedUrls.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedUrls = filteredAndSortedUrls.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#020617" }}>
      {/* background blur effects */}
      <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-900/5 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-cyan-900/5 rounded-full blur-[150px]"></div>
      </div>

      {/* notification toast */}
      {notification && (
        <div
          className={`fixed top-4 right-4 left-4 sm:left-auto z-50 px-4 py-3 rounded-lg shadow-lg transition-all transform ${
            notification.type === "success"
              ? "bg-emerald-500/90 text-white"
              : "bg-red-500/90 text-white"
          }`}
        >
          {notification.message}
        </div>
      )}

      {/* header */}
      <header
        className="sticky top-0 z-40 border-b"
        style={{
          background: "rgba(2, 6, 23, 0.8)",
          backdropFilter: "blur(12px)",
          borderColor: "rgba(255, 255, 255, 0.08)",
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-emerald-600/20 flex items-center justify-center">
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                />
              </svg>
            </div>
            <h1 className="text-base sm:text-xl font-bold text-white">
              Dashboard
            </h1>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => navigate("/analytics")}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="View Analytics"
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
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-3 sm:px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs sm:text-sm transition-all transform hover:-translate-y-0.5 flex items-center gap-1 sm:gap-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              <span className="hidden sm:inline">New URL</span>
              <span className="sm:hidden">Add</span>
            </button>
            <button
              onClick={logout}
              className="px-3 sm:px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-xs sm:text-sm transition-colors"
            >
              <span className="hidden sm:inline">Logout</span>
              <svg
                className="w-4 h-4 sm:hidden"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* main content */}
      <main className="container mx-auto px-4 sm:px-6 py-4 sm:py-8">
        {/* analytics cards */}
        {analytics && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
            {/* total links card */}
            <div
              className="p-4 sm:p-5 rounded-xl"
              style={{
                background: "rgba(15, 23, 42, 0.6)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
              }}
            >
              <div className="flex items-center gap-2 sm:gap-3 mb-2">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                    />
                  </svg>
                </div>
                <span className="text-xs sm:text-sm text-slate-400">
                  Total Links
                </span>
              </div>
              <p className="text-xl sm:text-3xl font-bold text-white">
                {analytics.totalLinks}
              </p>
            </div>

            {/* total visits card */}
            <div
              className="p-4 sm:p-5 rounded-xl"
              style={{
                background: "rgba(15, 23, 42, 0.6)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
              }}
            >
              <div className="flex items-center gap-2 sm:gap-3 mb-2">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </div>
                <span className="text-xs sm:text-sm text-slate-400">
                  Total Visits
                </span>
              </div>
              <p className="text-xl sm:text-3xl font-bold text-white">
                {analytics.totalVisits}
              </p>
            </div>

            {/* top link card */}
            {analytics.topLinks.length > 0 && (
              <div
                className="p-4 sm:p-5 rounded-xl col-span-2"
                style={{
                  background: "rgba(15, 23, 42, 0.6)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                }}
              >
                <div className="flex items-center gap-2 sm:gap-3 mb-2">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                      />
                    </svg>
                  </div>
                  <span className="text-xs sm:text-sm text-slate-400">
                    Top Performing Link
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm sm:text-base font-mono text-emerald-400 truncate">
                      /{analytics.topLinks[0].slug}
                    </p>
                    <p className="text-xs text-slate-500 truncate">
                      {analytics.topLinks[0].content}
                    </p>
                  </div>
                  <div className="text-right ml-3">
                    <p className="text-lg sm:text-2xl font-bold text-white">
                      {analytics.topLinks[0].visits}
                    </p>
                    <p className="text-xs text-slate-500">visits</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* search and filter bar - compact design */}
        <div className="mb-4 flex flex-col sm:flex-row gap-3 items-center">
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-800/80 border border-slate-700/50 rounded-lg focus:outline-none focus:border-emerald-500/50 text-slate-300 placeholder-slate-500 text-sm transition-all"
            />
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto ml-auto">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="px-3 py-2 bg-slate-800/80 border border-slate-700/50 rounded-lg focus:outline-none focus:border-emerald-500/50 text-slate-300 text-sm w-full sm:w-auto appearance-none cursor-pointer"
            >
              <option value="date-desc">Newest</option>
              <option value="date-asc">Oldest</option>
              <option value="name-asc">A-Z</option>
            </select>
            {/* stats count - integrated into filter row */}
            <div className="text-slate-500 text-xs px-2 whitespace-nowrap hidden sm:block">
              {filteredAndSortedUrls.length} total
            </div>
          </div>
        </div>

        {/* content */}
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
              Loading...
            </div>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <div className="text-red-400 mb-4">{error}</div>
            <button
              onClick={fetchData}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-sm transition-colors"
            >
              Retry
            </button>
          </div>
        ) : filteredAndSortedUrls.length === 0 ? (
          <div className="text-center py-20">
            {searchQuery ? (
              <>
                <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 rounded-2xl bg-slate-800/50 flex items-center justify-center">
                  <svg
                    className="w-8 h-8 sm:w-10 sm:h-10 text-slate-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-white mb-2">
                  No matching URLs
                </h3>
                <p className="text-slate-500">
                  Try adjusting your search query
                </p>
              </>
            ) : (
              <>
                <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 rounded-2xl bg-slate-800/50 flex items-center justify-center">
                  <svg
                    className="w-8 h-8 sm:w-10 sm:h-10 text-slate-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-white mb-2">
                  No URLs yet
                </h3>
                <p className="text-slate-500 mb-6 text-sm sm:text-base">
                  Create your first short URL to get started
                </p>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium transition-all transform hover:-translate-y-0.5"
                >
                  Create Short URL
                </button>
              </>
            )}
          </div>
        ) : (
          <>
            {/* stats bar - updated with filtered count */}
            <div className="mb-4 flex items-center gap-4 text-slate-400 text-sm px-1">
              <span>
                {searchQuery ? "Found" : "Total"} URLs:{" "}
                <span className="text-emerald-500 font-semibold">
                  {filteredAndSortedUrls.length}
                </span>
              </span>
              {totalPages > 1 && (
                <span>
                  Page {currentPage} of {totalPages}
                </span>
              )}
            </div>

            {/* mobile card layout */}
            <div className="sm:hidden space-y-3">
              {paginatedUrls.map((url) => (
                <div
                  key={url.slug}
                  className="p-4 rounded-xl"
                  style={{
                    background: "rgba(15, 23, 42, 0.6)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                  }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 text-sm font-mono">
                      /{url.slug}
                    </span>
                    <button
                      onClick={() => handleDelete(url.slug)}
                      disabled={deletingSlug === url.slug}
                      className="p-1.5 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors disabled:opacity-50"
                    >
                      {deletingSlug === url.slug ? (
                        <svg
                          className="w-4 h-4 animate-spin"
                          viewBox="0 0 24 24"
                        >
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
                      ) : (
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                  <p
                    className="text-slate-400 text-xs truncate mb-2"
                    title={url.content}
                  >
                    {url.content}
                  </p>
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => copyToClipboard(getShortUrlLink(url.slug))}
                      className="flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                      <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                        />
                      </svg>
                      Copy Link
                    </button>
                    <span className="text-xs text-slate-500">
                      {formatDate(url.createdAt)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* desktop table layout */}
            <div
              className="hidden sm:block rounded-2xl overflow-hidden"
              style={{
                background: "rgba(15, 23, 42, 0.6)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
              }}
            >
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-700/50">
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        Slug
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        Original URL
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        Short URL
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        Created
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/30">
                    {paginatedUrls.map((url) => (
                      <tr
                        key={url.slug}
                        className="hover:bg-slate-800/30 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 text-sm font-mono">
                            {url.slug}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div
                            className="max-w-xs truncate text-slate-300 text-sm"
                            title={url.content}
                          >
                            {url.content}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() =>
                              copyToClipboard(getShortUrlLink(url.slug))
                            }
                            className="flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
                          >
                            <span className="truncate max-w-[200px]">
                              {getShortUrlLink(url.slug)}
                            </span>
                            <svg
                              className="w-4 h-4 flex-shrink-0"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                              />
                            </svg>
                          </button>
                        </td>
                        <td className="px-6 py-4 text-slate-500 text-sm whitespace-nowrap">
                          {formatDate(url.createdAt)}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => handleDelete(url.slug)}
                            disabled={deletingSlug === url.slug}
                            className="p-2 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors disabled:opacity-50"
                            title="Delete URL"
                          >
                            {deletingSlug === url.slug ? (
                              <svg
                                className="w-5 h-5 animate-spin"
                                viewBox="0 0 24 24"
                              >
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
                            ) : (
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
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                            )}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* pagination */}
            {totalPages > 1 && (
              <div className="mt-6">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}
          </>
        )}
      </main>

      {/* create URL modal */}
      <CreateUrlModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleUrlCreated}
      />
    </div>
  );
};

export default Dashboard;
