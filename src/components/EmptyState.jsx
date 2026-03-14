import React from 'react';

const EmptyState = ({ selectedCategory, categories, onAddBook, searchQuery }) => {
  const category = categories.find(c => c.id === selectedCategory);

  if (searchQuery) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
        <div className="text-4xl mb-4">🔍</div>
        <h3 className="font-serif text-lg text-[#1A1611] mb-1">Sonuç bulunamadı</h3>
        <p className="text-sm text-[#A09A94]">
          "<span className="text-[#6B6560]">{searchQuery}</span>" için eşleşen kitap yok.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
      <div className="text-5xl mb-4">{category ? category.icon : '📚'}</div>
      <h3 className="font-serif text-xl text-[#1A1611] mb-2">
        {category ? `${category.name} kategorisinde kitap yok` : 'Kütüphanen boş'}
      </h3>
      <p className="text-sm text-[#A09A94] mb-6 max-w-xs leading-relaxed">
        {category
          ? `Bu kategoriye ilk kitabını ekleyerek başla.`
          : 'İlk kitabını ekleyerek kütüphaneni oluşturmaya başla.'}
      </p>
      <button onClick={onAddBook} className="btn-primary flex items-center gap-2">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 5v14M5 12h14" />
        </svg>
        Kitap Ekle
      </button>
    </div>
  );
};

export default EmptyState;
