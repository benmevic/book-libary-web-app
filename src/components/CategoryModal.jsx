import React, { useState, useEffect } from 'react';

const CATEGORY_COLORS = [
  '#C8913A', '#4A7C9E', '#7A6A52', '#6B5E8E', '#4A8E6B',
  '#9E4A4A', '#4A6E9E', '#8E7A4A', '#4A9E8E', '#9E4A7A',
];

const CATEGORY_ICONS = ['📖', '🚀', '🏛️', '💭', '🌱', '🎭', '🔬', '🗺️', '🎨', '🧠', '💡', '🌍', '⚔️', '🧪', '🎵'];

const EMPTY = { name: '', color: '#C8913A', icon: '📖' };

const CategoryModal = ({ isOpen, onClose, onSave, category }) => {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (category) setForm({ ...EMPTY, ...category });
    else setForm(EMPTY);
    setErrors({});
  }, [category, isOpen]);

  const handleSubmit = () => {
    if (!form.name.trim()) { setErrors({ name: 'Kategori adı gerekli' }); return; }
    onSave(form);
  };

  if (!isOpen) return null;

  return (
    <div
      className="modal-backdrop fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1A1611]/40 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="modal-content bg-[#FDFAF5] rounded-2xl w-full max-w-sm shadow-2xl border border-[#EDE0C8]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-[#EDE0C8]">
          <h2 className="font-serif text-xl text-[#1A1611]">
            {category ? 'Kategoriyi Düzenle' : 'Yeni Kategori'}
          </h2>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-[#F7F0E3] text-[#A09A94] hover:text-[#1A1611] transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="px-6 py-5 space-y-4">
          {/* Preview */}
          <div className="flex items-center justify-center py-4">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full text-white text-sm font-medium" style={{ backgroundColor: form.color }}>
              <span className="text-lg">{form.icon}</span>
              <span>{form.name || 'Kategori Adı'}</span>
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="block text-xs font-medium text-[#3D3830] mb-1.5">Kategori Adı *</label>
            <input
              type="text"
              value={form.name}
              onChange={e => { setForm(p => ({ ...p, name: e.target.value })); setErrors({}); }}
              placeholder="Örn: Polisiye"
              className={`input-field ${errors.name ? 'border-red-400' : ''}`}
            />
            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
          </div>

          {/* Icon */}
          <div>
            <label className="block text-xs font-medium text-[#3D3830] mb-2">İkon</label>
            <div className="flex flex-wrap gap-1.5">
              {CATEGORY_ICONS.map(icon => (
                <button
                  key={icon}
                  type="button"
                  onClick={() => setForm(p => ({ ...p, icon }))}
                  className={`w-9 h-9 rounded-lg text-lg flex items-center justify-center transition-all
                    ${form.icon === icon ? 'bg-[#1A1611] shadow-sm scale-105' : 'hover:bg-[#F7F0E3]'}`}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* Color */}
          <div>
            <label className="block text-xs font-medium text-[#3D3830] mb-2">Renk</label>
            <div className="flex flex-wrap gap-2">
              {CATEGORY_COLORS.map(color => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setForm(p => ({ ...p, color }))}
                  className={`w-8 h-8 rounded-full transition-transform ${form.color === color ? 'scale-125 ring-2 ring-[#1A1611] ring-offset-1' : 'hover:scale-110'}`}
                  style={{ backgroundColor: color }}
                />
              ))}
              {/* Custom color */}
              <div className="relative">
                <input
                  type="color"
                  value={form.color}
                  onChange={e => setForm(p => ({ ...p, color: e.target.value }))}
                  className="w-8 h-8 rounded-full cursor-pointer opacity-0 absolute inset-0"
                />
                <div className="w-8 h-8 rounded-full border-2 border-dashed border-[#A09A94] flex items-center justify-center text-[#A09A94] text-xs pointer-events-none">
                  +
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 px-6 pb-6 pt-2">
          <button onClick={onClose} className="btn-secondary flex-1">İptal</button>
          <button onClick={handleSubmit} className="btn-primary flex-1">
            {category ? 'Güncelle' : 'Oluştur'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryModal;
