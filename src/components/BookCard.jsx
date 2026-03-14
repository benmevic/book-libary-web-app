import React from 'react';
import { BOOK_STATUS_LABELS } from '../interfaces';

const statusColors = {
  want: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-100' },
  reading: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-100' },
  completed: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-100' },
};

const BookCard = ({ book, category, onEdit, onDelete }) => {
  const status = statusColors[book.status] || statusColors.want;

  const renderStars = (rating) => {
    const r = parseInt(rating) || 0;
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < r ? 'text-[#C8913A]' : 'text-[#EDE0C8]'} style={{ fontSize: '11px' }}>
        ★
      </span>
    ));
  };

  return (
    <div className="card group animate-fade-in">
      {/* Top row */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="min-w-0">
          <h3 className="font-serif text-base text-[#1A1611] leading-snug truncate" title={book.title}>
            {book.title}
          </h3>
          <p className="text-sm text-[#6B6560] mt-0.5 truncate">{book.author}</p>
        </div>
        {/* Actions - always visible on mobile, hover on desktop */}
        <div className="flex gap-1 shrink-0 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(book)}
            className="p-1.5 rounded-lg hover:bg-[#F7F0E3] text-[#A09A94] hover:text-[#1A1611] transition-colors"
            title="Düzenle"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </button>
          <button
            onClick={() => onDelete(book.id)}
            className="p-1.5 rounded-lg hover:bg-red-50 text-[#A09A94] hover:text-red-500 transition-colors"
            title="Sil"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
              <path d="M10 11v6M14 11v6" />
            </svg>
          </button>
        </div>
      </div>

      {/* Tags row */}
      <div className="flex flex-wrap items-center gap-1.5 mb-3">
        <span className={`tag border ${status.bg} ${status.text} ${status.border}`}>
          {BOOK_STATUS_LABELS[book.status]}
        </span>
        {category && (
          <span
            className="tag text-white"
            style={{ backgroundColor: category.color + 'CC' }}
          >
            {category.icon} {category.name}
          </span>
        )}
      </div>

      {/* Bottom row */}
      <div className="flex items-center justify-between pt-3 border-t border-[#F7F0E3]">
        <div className="flex items-center gap-0.5">
          {renderStars(book.rating)}
        </div>
        <div className="flex items-center gap-3 text-xs text-[#A09A94] font-mono">
          {book.year && <span>{book.year}</span>}
          {book.pages && <span>{book.pages} sf.</span>}
        </div>
      </div>

      {/* Notes preview */}
      {book.notes && (
        <p className="mt-2 text-xs text-[#6B6560] italic line-clamp-2 leading-relaxed">
          "{book.notes}"
        </p>
      )}
    </div>
  );
};

export default BookCard;
