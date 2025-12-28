import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getShortUrlBySlug } from "../services/shortUrlApi";

/**
 * handles redirect for short URLs
 * fetches the target URL from API and redirects the browser
 * shows loading state while fetching, redirects to home if not found
 */
const ShortUrlRedirect: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [status, setStatus] = useState<"loading" | "redirecting" | "not_found">(
    "loading"
  );

  useEffect(() => {
    const fetchAndRedirect = async () => {
      if (!slug) {
        navigate("/");
        return;
      }

      try {
        const response = await getShortUrlBySlug(slug);

        if (response.success && response.data) {
          setStatus("redirecting");
          // using window.location for full page redirect to external URL
          window.location.href = response.data.content;
        } else {
          // short URL not found - show portfolio
          setStatus("not_found");
          setTimeout(() => navigate("/"), 1500);
        }
      } catch (error) {
        console.error("Redirect error:", error);
        setStatus("not_found");
        setTimeout(() => navigate("/"), 1500);
      }
    };

    fetchAndRedirect();
  }, [slug, navigate]);

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: "#020617" }}
    >
      {/* background blur effects */}
      <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-900/5 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-cyan-900/5 rounded-full blur-[150px]"></div>
      </div>

      <div className="text-center">
        {status === "loading" && (
          <>
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-emerald-600/20 flex items-center justify-center animate-pulse">
              <svg
                className="w-8 h-8 text-emerald-500 animate-spin"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
            </div>
            <p className="text-slate-400">Loading...</p>
          </>
        )}

        {status === "redirecting" && (
          <>
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-emerald-600/20 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-emerald-500"
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
            <p className="text-emerald-400 font-medium">Redirecting...</p>
          </>
        )}

        {status === "not_found" && (
          <>
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-slate-800/50 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-slate-500"
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
            <p className="text-slate-400">Link not found</p>
            <p className="text-slate-500 text-sm mt-1">
              Redirecting to home...
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default ShortUrlRedirect;
