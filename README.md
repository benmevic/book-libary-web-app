# 📚 Kütüphanem — Kişisel Kitap Kütüphanesi

Kişisel kitap koleksiyonunu yönetmek için modern, minimalist bir web uygulaması. React + Tailwind CSS ile geliştirilmiştir.


## ✨ Özellikler

- **Kitap Yönetimi** — Ekle, düzenle, sil (CRUD)
- **Kategori Sistemi** — Özel renk ve ikonlu kategoriler oluştur
- **Okuma Durumu** — "Okumak İstiyorum", "Okuyorum", "Okudum"
- **Puanlama** — 1–5 yıldız derecelendirme
- **Arama** — Başlık veya yazara göre anlık arama
- **Sıralama** — Tarihe, isme, yazara ve puana göre sırala
- **İstatistikler** — Toplam kitap, sayfa ve puan özeti
- **LocalStorage** — Veriler tarayıcıda kalıcı olarak saklanır
- **Responsive** — Mobil ve masaüstü uyumlu

## 🛠️ Teknolojiler

- [React 18](https://react.dev/)
- [Tailwind CSS 3](https://tailwindcss.com/)
- [uuid](https://www.npmjs.com/package/uuid)

## 📁 Proje Yapısı

```
src/
├── components/
│   ├── Header.jsx
│   ├── Sidebar.jsx
│   ├── BookCard.jsx
│   ├── SearchAndFilter.jsx
│   ├── StatsBar.jsx
│   ├── BookModal.jsx
│   ├── CategoryModal.jsx
│   ├── ConfirmModal.jsx
│   └── EmptyState.jsx
├── pages/
│   └── LibraryPage.jsx
├── interfaces/
│   └── index.js
├── App.js
├── index.js
└── index.css
```

## 🚀 Kurulum

```bash
git clone https://github.com/benmevic/book-library-app.git
cd book-library-app
npm install
npm start
```

## 🌐 Canlı Demo

[Netlify'da Görüntüle](https://meric-aytas-book-lib-app.netlify.app/)

## 📄 Lisans

MIT
