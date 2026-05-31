'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ReviewForm({ carId }) {
  const router = useRouter();
  const [author, setAuthor] = useState('');
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [comment, setComment] = useState('');
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [errorMsg, setErrorMsg] = useState('');

  const displayRating = hovered || rating;

  async function handleSubmit(e) {
    e.preventDefault();
    if (!rating) { setErrorMsg('Please select a star rating.'); return; }
    if (!author.trim()) { setErrorMsg('Please enter your name.'); return; }
    if (!comment.trim()) { setErrorMsg('Please write a comment.'); return; }

    setStatus('submitting');
    setErrorMsg('');

    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ carId, author: author.trim(), rating, comment: comment.trim() }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to submit review.');
      }

      setStatus('success');
      setAuthor('');
      setRating(0);
      setComment('');
      router.refresh();
    } catch (err) {
      setStatus('error');
      setErrorMsg(err.message || 'Something went wrong. Please try again.');
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center">
        <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
          <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h3 className="font-bold text-emerald-800 text-lg mb-1">Review submitted!</h3>
        <p className="text-emerald-600 text-sm mb-4">Thank you for sharing your experience.</p>
        <button
          onClick={() => setStatus('idle')}
          className="text-sm text-emerald-700 font-semibold hover:underline"
        >
          Write another review
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm space-y-5">
      <div>
        <h3 className="text-lg font-bold text-slate-900 mb-1">Write a review</h3>
        <p className="text-sm text-slate-500">Share your ownership experience with others.</p>
      </div>

      {/* Star rating picker */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">Your rating</label>
        <div
          className="flex items-center gap-1.5"
          onMouseLeave={() => setHovered(0)}
        >
          {[1, 2, 3, 4, 5].map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setRating(s)}
              onMouseEnter={() => setHovered(s)}
              className="transition-transform hover:scale-110 active:scale-95 focus:outline-none"
              aria-label={`Rate ${s} star${s > 1 ? 's' : ''}`}
            >
              <svg
                className={`w-8 h-8 transition-colors ${
                  s <= displayRating ? 'text-amber-400' : 'text-slate-200 hover:text-amber-200'
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </button>
          ))}
          {displayRating > 0 && (
            <span className="text-sm text-slate-500 ml-1">
              {['', 'Poor', 'Fair', 'Good', 'Very good', 'Excellent'][displayRating]}
            </span>
          )}
        </div>
      </div>

      {/* Name */}
      <div>
        <label htmlFor="author" className="block text-sm font-semibold text-slate-700 mb-1.5">Your name</label>
        <input
          id="author"
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="e.g. Rahul M."
          maxLength={60}
          className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        />
      </div>

      {/* Comment */}
      <div>
        <label htmlFor="comment" className="block text-sm font-semibold text-slate-700 mb-1.5">Your review</label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share what you liked, what could be better, and who this car suits best..."
          rows={4}
          maxLength={500}
          className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
        />
        <p className="text-xs text-slate-400 mt-1 text-right">{comment.length}/500</p>
      </div>

      {/* Error */}
      {(status === 'error' || errorMsg) && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
          {errorMsg}
        </p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full py-3 px-6 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-xl transition-all active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed shadow-sm"
      >
        {status === 'submitting' ? 'Submitting…' : 'Submit review'}
      </button>
    </form>
  );
}
