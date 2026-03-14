import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import LibraryPage from './pages/LibraryPage';
import BookModal from './components/BookModal';
import CategoryModal from './components/CategoryModal';
import ConfirmModal from './components/ConfirmModal';
import { DEFAULT_CATEGORIES } from './interfaces';

const STORAGE_BOOKS = 'kutuphanem_books';
const STORAGE_CATS = 'kutuphanem_categories';

// Sample initial books for demo
const SAMPLE_BOOKS = [
  {
    id: uuidv4(),
    title: 'Suç ve Ceza',
    author: 'Fyodor Dostoyevski',
    categoryId: 'cat-1',
    year: '1866',
    pages: '671',
    status: 'completed',
    rating: '5',
    notes: 'Psikolojik derinliğiyle sarsıcı bir başyapıt.',
    createdAt: new Date(Date.now() - 5 * 86400000).toISOString(),
  },
  {
    id: uuidv4(),
    title: 'Dune',
    author: 'Frank Herbert',
    categoryId: 'cat-2',
    year: '1965',
    pages: '896',
    status: 'reading',
    rating: '4',
    notes: 'Ekoloji ve güç siyasetini ustalıkla işliyor.',
    createdAt: new Date(Date.now() - 3 * 86400000).toISOString(),
  },
  {
    id: uuidv4(),
    title: 'Sapiens',
    author: 'Yuval Noah Harari',
    categoryId: 'cat-3',
    year: '2011',
    pages: '443',
    status: 'completed',
    rating: '4',
    notes: 'İnsanlık tarihine bakış açısı değiştiriyor.',
    createdAt: new Date(Date.now() - 10 * 86400000).toISOString(),
  },
  {
    id: uuidv4(),
    title: 'Varlık ve Hiçlik',
    author: 'Jean-Paul Sartre',
    categoryId: 'cat-4',
    year: '1943',
    pages: '628',
    status: 'want',
    rating: '0',
    notes: '',
    createdAt: new Date(Date.now() - 1 * 86400000).toISOString(),
  },
];

function App() {
  const [books, setBooks] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_BOOKS);
      return saved ? JSON.parse(saved) : SAMPLE_BOOKS;
    } catch { return SAMPLE_BOOKS; }
  });

  const [categories, setCategories] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_CATS);
      return saved ? JSON.parse(saved) : DEFAULT_CATEGORIES;
    } catch { return DEFAULT_CATEGORIES; }
  });

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [bookModal, setBookModal] = useState({ open: false, book: null });
  const [categoryModal, setCategoryModal] = useState({ open: false, category: null });
  const [confirmModal, setConfirmModal] = useState({ open: false, title: '', message: '', onConfirm: null });

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_BOOKS, JSON.stringify(books));
  }, [books]);

  useEffect(() => {
    localStorage.setItem(STORAGE_CATS, JSON.stringify(categories));
  }, [categories]);

  // ---- Book CRUD ----
  const handleSaveBook = (formData) => {
    if (bookModal.book) {
      // Update
      setBooks(prev => prev.map(b =>
        b.id === bookModal.book.id ? { ...b, ...formData } : b
      ));
    } else {
      // Create
      setBooks(prev => [...prev, {
        ...formData,
        id: uuidv4(),
        createdAt: new Date().toISOString(),
      }]);
    }
    setBookModal({ open: false, book: null });
  };

  const handleDeleteBook = (id) => {
    setConfirmModal({
      open: true,
      title: 'Kitabı sil',
      message: 'Bu kitabı kütüphanenden kaldırmak istediğine emin misin?',
      onConfirm: () => setBooks(prev => prev.filter(b => b.id !== id)),
    });
  };

  // ---- Category CRUD ----
  const handleSaveCategory = (formData) => {
    if (categoryModal.category) {
      setCategories(prev => prev.map(c =>
        c.id === categoryModal.category.id ? { ...c, ...formData } : c
      ));
    } else {
      setCategories(prev => [...prev, {
        ...formData,
        id: uuidv4(),
        createdAt: new Date().toISOString(),
      }]);
    }
    setCategoryModal({ open: false, category: null });
  };

  const handleDeleteCategory = (id) => {
    const bookCount = books.filter(b => b.categoryId === id).length;
    setConfirmModal({
      open: true,
      title: 'Kategoriyi sil',
      message: bookCount > 0
        ? `Bu kategoride ${bookCount} kitap var. Kategoriyi silersen bu kitaplar kategorisiz kalır. Devam etmek istiyor musun?`
        : 'Bu kategoriyi silmek istediğine emin misin?',
      onConfirm: () => {
        setCategories(prev => prev.filter(c => c.id !== id));
        if (selectedCategory === id) setSelectedCategory('all');
      },
    });
  };

  return (
    <div className="min-h-screen bg-[#FDFAF5]">
      <Header
        totalBooks={books.length}
        onAddBook={() => setBookModal({ open: true, book: null })}
        onAddCategory={() => setCategoryModal({ open: true, category: null })}
      />

      <main className="max-w-6xl mx-auto px-6 py-8 flex gap-8">
        {/* Sidebar */}
        <Sidebar
          categories={categories}
          books={books}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onEditCategory={(cat) => setCategoryModal({ open: true, category: cat })}
          onDeleteCategory={handleDeleteCategory}
        />

        {/* Main content */}
        <LibraryPage
          books={books}
          categories={categories}
          selectedCategory={selectedCategory}
          onEditBook={(book) => setBookModal({ open: true, book })}
          onDeleteBook={handleDeleteBook}
          onAddBook={() => setBookModal({ open: true, book: null })}
        />
      </main>

      {/* Modals */}
      <BookModal
        isOpen={bookModal.open}
        onClose={() => setBookModal({ open: false, book: null })}
        onSave={handleSaveBook}
        book={bookModal.book}
        categories={categories}
      />

      <CategoryModal
        isOpen={categoryModal.open}
        onClose={() => setCategoryModal({ open: false, category: null })}
        onSave={handleSaveCategory}
        category={categoryModal.category}
      />

      <ConfirmModal
        isOpen={confirmModal.open}
        onClose={() => setConfirmModal(prev => ({ ...prev, open: false }))}
        onConfirm={confirmModal.onConfirm}
        title={confirmModal.title}
        message={confirmModal.message}
      />
    </div>
  );
}

export default App;
