import React from 'react';

const Sidebar = ({ categories, books, selectedCategory, onSelectCategory, onEditCategory, onDeleteCategory }) => {
  const getBookCount = (categoryId) => {
    if (categoryId === 'all') return books.length;
    return books.filter(b => b.categoryId === categoryId).length;
  };

  const statusCounts = {
    all: books.length,
    want: books.filter(b => b.status === 'want').length,
    reading: books.filter(b => b.status === 'reading').length,
    completed: books.filter(b => b.status === 'completed').length,
  };

  return (
    <aside className="w-64 shrink-0">
      {/* All Books */}
      <div className="mb-6">
        <p className="text-xs font-mono text-[#A09A94] uppercase tracking-wider mb-2 px-1">Genel Bakış</p>
        <nav className="space-y-0.5">
          <button
            onClick={() => onSelectCategory('all')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all duration-150
              ${selectedCategory === 'all'
                ? 'bg-[#1A1611] text-[#FDFAF5]'
                : 'text-[#3D3830] hover:bg-[#F7F0E3]'
              }`}
          >
            <span className="flex items-center gap-2">
              <span>🗂️</span>
              <span className="font-medium">Tüm Kitaplar</span>
            </span>
            <span className={`text-xs font-mono px-1.5 py-0.5 rounded-md ${selectedCategory === 'all' ? 'bg-white/20 text-white' : 'bg-[#EDE0C8] text-[#6B6560]'}`}>
              {statusCounts.all}
            </span>
          </button>

          {/* Status filters */}
          {[
            { key: 'reading', label: 'Okuyorum', icon: '📖' },
            { key: 'want', label: 'Okumak İstiyorum', icon: '🔖' },
            { key: 'completed', label: 'Okudum', icon: '✅' },
          ].map(({ key, label, icon }) => (
            <button
              key={key}
              onClick={() => onSelectCategory(`status:${key}`)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all duration-150
                ${selectedCategory === `status:${key}`
                  ? 'bg-[#1A1611] text-[#FDFAF5]'
                  : 'text-[#3D3830] hover:bg-[#F7F0E3]'
                }`}
            >
              <span className="flex items-center gap-2">
                <span>{icon}</span>
                <span>{label}</span>
              </span>
              <span className={`text-xs font-mono px-1.5 py-0.5 rounded-md ${selectedCategory === `status:${key}` ? 'bg-white/20 text-white' : 'bg-[#EDE0C8] text-[#6B6560]'}`}>
                {statusCounts[key]}
              </span>
            </button>
          ))}
        </nav>
      </div>

      {/* Categories */}
      <div>
        <p className="text-xs font-mono text-[#A09A94] uppercase tracking-wider mb-2 px-1">Kategoriler</p>
        {categories.length === 0 ? (
          <p className="text-xs text-[#A09A94] px-3 py-2">Henüz kategori yok.</p>
        ) : (
          <nav className="space-y-0.5">
            {categories.map((category) => (
              <div key={category.id} className="group relative">
                <button
                  onClick={() => onSelectCategory(category.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all duration-150
                    ${selectedCategory === category.id
                      ? 'bg-[#1A1611] text-[#FDFAF5]'
                      : 'text-[#3D3830] hover:bg-[#F7F0E3]'
                    }`}
                >
                  <span className="flex items-center gap-2 min-w-0">
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: category.color }}
                    />
                    <span className="truncate">{category.icon} {category.name}</span>
                  </span>
                  <span className={`text-xs font-mono px-1.5 py-0.5 rounded-md shrink-0 ml-1 ${selectedCategory === category.id ? 'bg-white/20 text-white' : 'bg-[#EDE0C8] text-[#6B6560]'}`}>
                    {getBookCount(category.id)}
                  </span>
                </button>

                {/* Edit/Delete hover actions */}
                <div className="absolute right-1 top-1/2 -translate-y-1/2 hidden group-hover:flex gap-0.5 bg-white border border-[#EDE0C8] rounded-md shadow-sm p-0.5">
                  <button
                    onClick={(e) => { e.stopPropagation(); onEditCategory(category); }}
                    className="p-1 rounded hover:bg-[#F7F0E3] text-[#6B6560] hover:text-[#1A1611] transition-colors"
                    title="Düzenle"
                  >
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); onDeleteCategory(category.id); }}
                    className="p-1 rounded hover:bg-red-50 text-[#6B6560] hover:text-red-500 transition-colors"
                    title="Sil"
                  >
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                      <path d="M10 11v6M14 11v6" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </nav>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
