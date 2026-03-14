import React from 'react';

const Header = ({ totalBooks, onAddBook, onAddCategory }) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FDFAF5]/90 backdrop-blur-sm border-b border-[#EDE0C8]">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <span className="text-2xl">📚</span>
          <div>
            <h1 className="font-serif text-xl text-[#1A1611] leading-tight">Kütüphanem</h1>
            <p className="text-xs text-[#A09A94] font-mono">{totalBooks} kitap</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={onAddCategory}
            className="btn-secondary flex items-center gap-2"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12h14" />
            </svg>
            Kategori
          </button>
          <button
            onClick={onAddBook}
            className="btn-primary flex items-center gap-2"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12h14" />
            </svg>
            Kitap Ekle
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
