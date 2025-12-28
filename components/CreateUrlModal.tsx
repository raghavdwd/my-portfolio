import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { createShortUrl } from "../services/shortUrlApi";

interface CreateUrlModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const CreateUrlModal: React.FC<CreateUrlModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [url, setUrl] = useState("");
  const [slug, setSlug] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    setError("");
    setIsLoading(true);

    try {
      // validating URL format before sending
      const urlPattern = /^https?:\/\/.+/i;
      if (!urlPattern.test(url)) {
        setError("Please enter a valid URL starting with http:// or https://");
        setIsLoading(false);
        return;
      }

      const response = await createShortUrl(token, {
        contentType: "url",
        content: url,
        slug: slug.trim() || undefined,
      });

      if (response.success) {
        setUrl("");
        setSlug("");
        onSuccess();
      } else {
        setError(response.message || "Failed to create short URL");
      }
    } catch (err) {
      setError("Network error. Please try again.");
      console.error("Create URL error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setUrl("");
    setSlug("");
    setError("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* backdrop overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* modal content */}
      <div
        className="relative w-full max-w-md mx-4 p-6 rounded-2xl animate-fade-up"
        style={{
          background: "rgba(15, 23, 42, 0.95)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        {/* close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* header */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-white">Create Short URL</h2>
          <p className="text-slate-400 text-sm mt-1">
            Shorten a long URL for easy sharing
          </p>
        </div>

        {/* form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* original URL input */}
          <div>
            <label
              htmlFor="original-url"
              className="block text-sm font-medium text-slate-300 mb-2"
            >
              Original URL <span className="text-red-400">*</span>
            </label>
            <input
              type="url"
              id="original-url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com/very-long-url"
              required
              className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
            />
          </div>

          {/* custom slug input */}
          <div>
            <label
              htmlFor="custom-slug"
              className="block text-sm font-medium text-slate-300 mb-2"
            >
              Custom Slug <span className="text-slate-500">(optional)</span>
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm">
                /
              </span>
              <input
                type="text"
                id="custom-slug"
                value={slug}
                onChange={(e) =>
                  setSlug(e.target.value.replace(/[^a-zA-Z0-9-_]/g, ""))
                }
                placeholder="my-custom-slug"
                className="w-full pl-7 pr-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors font-mono text-sm"
              />
            </div>
            <p className="mt-1.5 text-xs text-slate-500">
              Leave empty to auto-generate. Only letters, numbers, hyphens, and
              underscores allowed.
            </p>
          </div>

          {/* error message */}
          {error && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* action buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading || !url}
              className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
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
                  Creating...
                </>
              ) : (
                "Create URL"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUrlModal;
