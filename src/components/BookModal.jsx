import React, { useState, useEffect } from 'react';
import { BOOK_STATUS_LABELS } from '../interfaces';

const EMPTY_BOOK = {
  title: '',
  author: '',
  categoryId: '',
  year: '',
  pages: '',
  status: 'want',
  rating: '0',
  notes: '',
};

const BookModal = ({ isOpen, onClose, onSave, book, categories }) => {
  const [form, setForm] = useState(EMPTY_BOOK);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (book) {
      setForm({ ...EMPTY_BOOK, ...book });
    } else {
      setForm(EMPTY_BOOK);
    }
    setErrors({});
  }, [book, isOpen]);

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = 'Kitap adı gerekli';
    if (!form.author.trim()) e.author = 'Yazar adı gerekli';
    if (!form.categoryId) e.categoryId = 'Kategori seçin';
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    onSave(form);
  };

  const set = (key, value) => {
    setForm(prev => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors(prev => ({ ...prev, [key]: undefined }));
  };

  if (!isOpen) return null;

  return (
    <div
      className="modal-backdrop fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1A1611]/40 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="modal-content bg-[#FDFAF5] rounded-2xl w-full max-w-lg shadow-2xl border border-[#EDE0C8] max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-[#EDE0C8]">
          <h2 className="font-serif text-xl text-[#1A1611]">
            {book ? 'Kitabı Düzenle' : 'Yeni Kitap Ekle'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-[#F7F0E3] text-[#A09A94] hover:text-[#1A1611] transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <div className="px-6 py-5 space-y-4">
          {/* Title */}
          <div>
            <label className="block text-xs font-medium text-[#3D3830] mb-1.5">Kitap Adı *</label>
            <input
              type="text"
              value={form.title}
              onChange={e => set('title', e.target.value)}
              placeholder="Örn: Suç ve Ceza"
              className={`input-field ${errors.title ? 'border-red-400 bg-red-50' : ''}`}
            />
            {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}
          </div>

          {/* Author */}
          <div>
            <label className="block text-xs font-medium text-[#3D3830] mb-1.5">Yazar *</label>
            <input
              type="text"
              value={form.author}
              onChange={e => set('author', e.target.value)}
              placeholder="Örn: Fyodor Dostoyevski"
              className={`input-field ${errors.author ? 'border-red-400 bg-red-50' : ''}`}
            />
            {errors.author && <p className="text-xs text-red-500 mt-1">{errors.author}</p>}
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs font-medium text-[#3D3830] mb-1.5">Kategori *</label>
            <select
              value={form.categoryId}
              onChange={e => set('categoryId', e.target.value)}
              className={`input-field cursor-pointer ${errors.categoryId ? 'border-red-400 bg-red-50' : ''}`}
            >
              <option value="">Kategori seç...</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.icon} {cat.name}</option>
              ))}
            </select>
            {errors.categoryId && <p className="text-xs text-red-500 mt-1">{errors.categoryId}</p>}
          </div>

          {/* Status */}
          <div>
            <label className="block text-xs font-medium text-[#3D3830] mb-2">Durum</label>
            <div className="flex gap-2">
              {Object.entries(BOOK_STATUS_LABELS).map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => set('status', key)}
                  className={`flex-1 py-2 px-3 rounded-lg text-xs font-medium border transition-all
                    ${form.status === key
                      ? 'bg-[#1A1611] text-white border-[#1A1611]'
                      : 'bg-transparent text-[#6B6560] border-[#EDE0C8] hover:bg-[#F7F0E3]'
                    }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Year + Pages */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-[#3D3830] mb-1.5">Yayın Yılı</label>
              <input
                type="number"
                value={form.year}
                onChange={e => set('year', e.target.value)}
                placeholder="2024"
                min="1000" max="2099"
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#3D3830] mb-1.5">Sayfa Sayısı</label>
              <input
                type="number"
                value={form.pages}
                onChange={e => set('pages', e.target.value)}
                placeholder="320"
                min="1"
                className="input-field"
              />
            </div>
          </div>

          {/* Rating */}
          <div>
            <label className="block text-xs font-medium text-[#3D3830] mb-2">Puanım</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map(star => (
                <button
                  key={star}
                  type="button"
                  onClick={() => set('rating', form.rating === String(star) ? '0' : String(star))}
                  className="text-2xl transition-transform hover:scale-110"
                >
                  <span className={parseInt(form.rating) >= star ? 'text-[#C8913A]' : 'text-[#EDE0C8]'}>★</span>
                </button>
              ))}
              {parseInt(form.rating) > 0 && (
                <span className="ml-2 text-xs text-[#A09A94] self-center font-mono">{form.rating}/5</span>
              )}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-medium text-[#3D3830] mb-1.5">Notlarım</label>
            <textarea
              value={form.notes}
              onChange={e => set('notes', e.target.value)}
              placeholder="Bu kitap hakkında düşünceleriniz..."
              rows={3}
              className="input-field resize-none"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 px-6 pb-6 pt-2">
          <button onClick={onClose} className="btn-secondary flex-1">İptal</button>
          <button onClick={handleSubmit} className="btn-primary flex-1">
            {book ? 'Güncelle' : 'Ekle'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookModal;
