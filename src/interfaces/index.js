// src/interfaces/index.js
// Proje veri modelleri

/**
 * @typedef {Object} Book
 * @property {string} id - Benzersiz kitap ID'si
 * @property {string} title - Kitap başlığı
 * @property {string} author - Yazar adı
 * @property {string} categoryId - Bağlı kategori ID'si
 * @property {string} year - Yayın yılı
 * @property {string} pages - Sayfa sayısı
 * @property {string} status - 'reading' | 'completed' | 'want'
 * @property {string} rating - 1-5 arası puan
 * @property {string} notes - Notlar
 * @property {string} createdAt - Oluşturma tarihi
 */

/**
 * @typedef {Object} Category
 * @property {string} id - Benzersiz kategori ID'si
 * @property {string} name - Kategori adı
 * @property {string} color - Renk kodu (hex)
 * @property {string} icon - Emoji ikon
 * @property {string} createdAt - Oluşturma tarihi
 */

export const BOOK_STATUS = {
  WANT: "want",
  READING: "reading",
  COMPLETED: "completed",
};

export const BOOK_STATUS_LABELS = {
  want: "Okumak İstiyorum",
  reading: "Okuyorum",
  completed: "Okudum",
};

export const SORT_OPTIONS = [
  { value: "createdAt_desc", label: "En Yeni" },
  { value: "createdAt_asc", label: "En Eski" },
  { value: "title_asc", label: "Başlık A→Z" },
  { value: "title_desc", label: "Başlık Z→A" },
  { value: "author_asc", label: "Yazar A→Z" },
  { value: "rating_desc", label: "En Yüksek Puan" },
];

export const DEFAULT_CATEGORIES = [
  { id: "cat-1", name: "Roman", color: "#C8913A", icon: "📖", createdAt: new Date().toISOString() },
  { id: "cat-2", name: "Bilim Kurgu", color: "#4A7C9E", icon: "🚀", createdAt: new Date().toISOString() },
  { id: "cat-3", name: "Tarih", color: "#7A6A52", icon: "🏛️", createdAt: new Date().toISOString() },
  { id: "cat-4", name: "Felsefe", color: "#6B5E8E", icon: "💭", createdAt: new Date().toISOString() },
  { id: "cat-5", name: "Kişisel Gelişim", color: "#4A8E6B", icon: "🌱", createdAt: new Date().toISOString() },
];
