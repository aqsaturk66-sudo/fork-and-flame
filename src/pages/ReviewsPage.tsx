import React, { useState } from 'react';
import { Star, MessageSquarePlus, Check, X, ShieldCheck } from 'lucide-react';
import { Review } from '../types';

interface ReviewsPageProps {
  reviews: Review[];
  onReviewSubmitted: (newReview: Review) => void;
}

export const ReviewsPage: React.FC<ReviewsPageProps> = ({ reviews, onReviewSubmitted }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState(false);

  // Calculations
  const totalReviews = reviews.length;
  const avgRating =
    totalReviews > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews).toFixed(1)
      : '5.0';

  const starCounts = [5, 4, 3, 2, 1].map((s) => {
    const count = reviews.filter((r) => r.rating === s).length;
    const percentage = totalReviews > 0 ? Math.round((count / totalReviews) * 100) : 0;
    return { stars: s, count, percentage };
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!customerName.trim() || !comment.trim()) {
      setErrorMsg('Please enter your name and review message.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: customerName.trim(),
          rating,
          comment: comment.trim(),
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to submit review');
      }

      const created: Review = await res.json();
      onReviewSubmitted(created);
      setSuccessMsg(true);

      setTimeout(() => {
        setSuccessMsg(false);
        setIsModalOpen(false);
        setCustomerName('');
        setComment('');
        setRating(5);
      }, 1500);
    } catch (err) {
      setErrorMsg('Could not submit review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#faf6ee] tracking-tight">
          Customer Reviews & Ratings
        </h1>
        <p className="text-xs sm:text-sm text-[#9e907e]">
          Read authentic dining feedback from guests or share your own experience at Fork & Flame Badin.
        </p>
      </div>

      {/* Rating Breakdown Scorecard */}
      <div className="bg-[#14100d] border border-[#2b2118] rounded-2xl p-6 sm:p-8 shadow-xl max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Average Rating Big Display */}
          <div className="md:col-span-4 text-center md:border-r border-[#261d16] md:pr-8 space-y-2">
            <div className="font-serif text-6xl font-bold text-[#f5ecd8]">
              {avgRating}
            </div>
            <div className="flex items-center justify-center gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  className={`w-5 h-5 ${
                    s <= Math.round(Number(avgRating))
                      ? 'text-[#d4a343] fill-[#d4a343]'
                      : 'text-[#3d2e23]'
                  }`}
                />
              ))}
            </div>
            <p className="text-xs text-[#8c7d6b]">
              Based on {totalReviews} customer feedback submissions
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="w-full py-2.5 px-4 text-xs font-bold uppercase tracking-wider bg-[#c9922c] hover:bg-[#d4a343] text-[#0f0c0a] rounded-lg transition-all shadow-md flex items-center justify-center gap-2"
              >
                <MessageSquarePlus className="w-4 h-4" />
                <span>Write a Review</span>
              </button>
            </div>
          </div>

          {/* Star Breakdown Bars */}
          <div className="md:col-span-8 space-y-2.5">
            {starCounts.map((sc) => (
              <div key={sc.stars} className="flex items-center gap-3 text-xs">
                <span className="w-12 text-[#a89680] flex items-center gap-1 font-medium">
                  <span>{sc.stars}</span>
                  <Star className="w-3.5 h-3.5 text-[#d4a343] fill-[#d4a343]" />
                </span>
                <div className="flex-1 h-2 bg-[#211a14] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#d4a343] rounded-full transition-all duration-500"
                    style={{ width: `${sc.percentage}%` }}
                  />
                </div>
                <span className="w-10 text-right text-[#7d6e5d] text-[11px] font-semibold">
                  {sc.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="max-w-4xl mx-auto space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-[#241c16]">
          <h2 className="font-serif text-xl font-bold text-[#faf6ee]">
            All Feedback ({totalReviews})
          </h2>
          <span className="text-xs text-[#8c7d6b] flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            Verified Customer Reviews
          </span>
        </div>

        {reviews.length === 0 ? (
          <div className="p-8 text-center bg-[#14100d] border border-[#241c16] rounded-xl text-sm text-[#8c7d6b]">
            No reviews published yet. Be the first to review Fork & Flame!
          </div>
        ) : (
          reviews.map((rev) => (
            <div
              key={rev.id}
              className="p-5 bg-[#14100d] border border-[#261d16] rounded-xl space-y-3 hover:border-[#382b20] transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-serif text-base font-bold text-[#faf6ee]">
                      {rev.customerName}
                    </span>
                    {rev.isDemo && (
                      <span className="text-[10px] text-[#7d6e5d] uppercase tracking-wider px-1.5 py-0.5 rounded bg-[#1f1812] border border-[#2e2319]">
                        Demo Content
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className={`w-3.5 h-3.5 ${
                          s <= rev.rating
                            ? 'text-[#d4a343] fill-[#d4a343]'
                            : 'text-[#382b20]'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <span className="text-xs text-[#736554]">{rev.date}</span>
              </div>

              <p className="text-xs sm:text-sm text-[#cfc1af] leading-relaxed">
                "{rev.comment}"
              </p>
            </div>
          ))
        )}
      </div>

      {/* Review Submission Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#14100d] border border-[#33261d] w-full max-w-md rounded-2xl p-6 shadow-2xl relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-[#9e907e] hover:text-white hover:bg-[#211a14] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif text-xl font-bold text-[#faf6ee] mb-1">
              Rate Fork & Flame
            </h3>
            <p className="text-xs text-[#8c7d6b] mb-4">
              Your honest feedback helps us serve Badin better every day.
            </p>

            {successMsg ? (
              <div className="p-6 text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-emerald-950/60 border border-emerald-600/40 text-emerald-400 mx-auto flex items-center justify-center">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="font-serif text-lg font-bold text-[#faf6ee]">
                  Thank You for Your Feedback!
                </h4>
                <p className="text-xs text-[#8c7d6b]">
                  Your review has been successfully submitted.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                {errorMsg && (
                  <div className="p-2.5 rounded bg-red-950/50 border border-red-800 text-red-300">
                    {errorMsg}
                  </div>
                )}

                {/* Star selection */}
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#9e907e] font-semibold mb-2">
                    Rating (1 to 5 Stars) *
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button
                        key={s}
                        type="button"
                        onMouseEnter={() => setHoverRating(s)}
                        onMouseLeave={() => setHoverRating(null)}
                        onClick={() => setRating(s)}
                        className="p-1 focus:outline-none transition-transform hover:scale-110"
                      >
                        <Star
                          className={`w-7 h-7 ${
                            s <= (hoverRating ?? rating)
                              ? 'text-[#d4a343] fill-[#d4a343]'
                              : 'text-[#382b20]'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs font-bold text-[#f5ecd8] ml-2">
                      {hoverRating ?? rating} / 5 Stars
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#9e907e] font-semibold mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Asadullah Memon"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#1c1511] border border-[#2e2319] text-[#f5ecd8] placeholder-[#5c5042] focus:outline-none focus:border-[#d4a343] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#9e907e] font-semibold mb-1">
                    Your Review *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Tell us what you enjoyed (e.g. food taste, spices, delivery speed, ambiance)..."
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#1c1511] border border-[#2e2319] text-[#f5ecd8] placeholder-[#5c5042] focus:outline-none focus:border-[#d4a343] transition-colors text-xs"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 text-xs font-medium text-[#a39480] hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider bg-[#c9922c] hover:bg-[#d4a343] text-[#0f0c0a] rounded-lg shadow-md transition-all active:scale-95 disabled:opacity-50"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Review'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
