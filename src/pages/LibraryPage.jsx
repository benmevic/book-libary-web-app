import React, { useState, useMemo } from 'react';
import BookCard from '../components/BookCard';
import SearchAndFilter from '../components/SearchAndFilter';
import EmptyState from '../components/EmptyState';
import StatsBar from '../components/StatsBar';

const LibraryPage = ({
  books,
  categories,
  selectedCategory,
  onEditBook,
  onDeleteBook,
  onAddBook,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('createdAt_desc');

  const filteredAndSorted = useMemo(() => {
    let result = [...books];

    // Category / status filter
    if (selectedCategory !== 'all') {
      if (selectedCategory.startsWith('status:')) {
        const status = selectedCategory.replace('status:', '');
        result = result.filter(b => b.status === status);
      } else {
        result = result.filter(b => b.categoryId === selectedCategory);
      }
    }

    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        b =>
          b.title.toLowerCase().includes(q) ||
          b.author.toLowerCase().includes(q)
      );
    }

    // Sort
    const [field, dir] = sortBy.split('_');
    result.sort((a, b) => {
      let valA = a[field] || '';
      let valB = b[field] || '';
      if (field === 'rating') { valA = parseInt(valA) || 0; valB = parseInt(valB) || 0; }
      if (valA < valB) return dir === 'asc' ? -1 : 1;
      if (valA > valB) return dir === 'asc' ? 1 : -1;
      return 0;
    });

    return result;
  }, [books, selectedCategory, searchQuery, sortBy]);

  const getCategoryForBook = (book) => categories.find(c => c.id === book.categoryId);

  const isStatusFilter = selectedCategory.startsWith('status:');
  const isCategoryFilter = !isStatusFilter && selectedCategory !== 'all';
  const activeCategory = isCategoryFilter ? categories.find(c => c.id === selectedCategory) : null;

  return (
    <div className="flex-1 min-w-0">
      {/* Stats - only show on "all" */}
      {selectedCategory === 'all' && books.length > 0 && (
        <StatsBar books={books} />
      )}

      {/* Category header */}
      {activeCategory && (
        <div className="flex items-center gap-3 mb-5 pb-4 border-b border-[#EDE0C8]">
          <span className="text-3xl">{activeCategory.icon}</span>
          <div>
            <h2 className="font-serif text-xl text-[#1A1611]">{activeCategory.name}</h2>
            <p className="text-xs text-[#A09A94]">
              {filteredAndSorted.length} kitap bu kategoride
            </p>
          </div>
          <div
            className="ml-auto w-2 h-10 rounded-full"
            style={{ backgroundColor: activeCategory.color }}
          />
        </div>
      )}

      {/* Search & Filter */}
      {books.length > 0 && (
        <SearchAndFilter
          searchQuery={searchQuery}
          onSearch={setSearchQuery}
          sortBy={sortBy}
          onSort={setSortBy}
          resultCount={filteredAndSorted.length}
        />
      )}

      {/* Grid or Empty */}
      {filteredAndSorted.length === 0 ? (
        <EmptyState
          selectedCategory={selectedCategory}
          categories={categories}
          onAddBook={onAddBook}
          searchQuery={searchQuery}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAndSorted.map(book => (
            <BookCard
              key={book.id}
              book={book}
              category={getCategoryForBook(book)}
              onEdit={onEditBook}
              onDelete={onDeleteBook}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default LibraryPage;
