import React from 'react';

const StatsBar = ({ books }) => {
  const total = books.length;
  const completed = books.filter(b => b.status === 'completed').length;
  const reading = books.filter(b => b.status === 'reading').length;
  const totalPages = books.reduce((sum, b) => sum + (parseInt(b.pages) || 0), 0);
  const avgRating = total > 0
    ? (books.reduce((sum, b) => sum + (parseInt(b.rating) || 0), 0) / total).toFixed(1)
    : '—';

  const stats = [
    { label: 'Toplam', value: total, icon: '📚' },
    { label: 'Okudum', value: completed, icon: '✅' },
    { label: 'Okuyorum', value: reading, icon: '📖' },
    { label: 'Toplam Sayfa', value: totalPages > 0 ? totalPages.toLocaleString('tr-TR') : '—', icon: '📄' },
    { label: 'Ort. Puan', value: avgRating, icon: '⭐' },
  ];

  return (
    <div className="grid grid-cols-5 gap-3 mb-6">
      {stats.map(({ label, value, icon }) => (
        <div key={label} className="bg-white border border-[#EDE0C8] rounded-xl px-3 py-3 text-center">
          <div className="text-lg mb-0.5">{icon}</div>
          <div className="font-serif text-lg text-[#1A1611] leading-tight">{value}</div>
          <div className="text-xs text-[#A09A94] mt-0.5">{label}</div>
        </div>
      ))}
    </div>
  );
};

export default StatsBar;
