import React from 'react';

const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    <div
      className="modal-backdrop fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1A1611]/40 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="modal-content bg-[#FDFAF5] rounded-2xl w-full max-w-sm shadow-2xl border border-[#EDE0C8] p-6">
        <div className="text-center mb-5">
          <div className="w-12 h-12 rounded-full bg-red-50 border border-red-100 flex items-center justify-center mx-auto mb-4">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
              <path d="M10 11v6M14 11v6" />
              <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
            </svg>
          </div>
          <h3 className="font-serif text-lg text-[#1A1611] mb-1">{title}</h3>
          <p className="text-sm text-[#6B6560]">{message}</p>
        </div>
        <div className="flex gap-3">
          <button onClick={onClose} className="btn-secondary flex-1">İptal</button>
          <button
            onClick={() => { onConfirm(); onClose(); }}
            className="flex-1 bg-red-500 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-red-600 transition-colors active:scale-[0.98]"
          >
            Sil
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
