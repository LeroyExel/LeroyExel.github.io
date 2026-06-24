// components/Lightbox.jsx
import { useState, useEffect, useRef } from 'react';

function Lightbox() {
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const mediaWrapRef = useRef(null);

  const renderContent = (index) => {
    const wrap = mediaWrapRef.current;
    if (!wrap) return;
    const info = items[index];
    if (!info) return;

    wrap.innerHTML = '';
    const cap = document.getElementById('lb-caption');
    const counter = document.getElementById('lb-counter');

    if (info.isVideo) {
      const video = document.createElement('video');
      video.src = info.src;
      video.autoplay = true;
      video.controls = true;
      video.muted = false;
      video.loop = true;
      video.className = 'w-full rounded-lg shadow-2xl border border-white/10 cursor-default object-contain';
      video.style.maxHeight = '84vh';
      wrap.appendChild(video);
    } else {
      const img = document.createElement('img');
      img.src = info.src;
      img.className = 'object-contain rounded-lg shadow-2xl border border-white/10 cursor-default mx-auto block';
      img.style.maxHeight = '84vh';
      img.style.maxWidth = '100%';
      wrap.appendChild(img);
    }

    if (cap) cap.textContent = info.caption || '';
    if (counter) counter.textContent = `${index + 1} / ${items.length}`;

    const prev = document.getElementById('lb-prev');
    const next = document.getElementById('lb-next');
    if (prev) prev.style.opacity = index === 0 ? '0.3' : '1';
    if (next) next.style.opacity = index === items.length - 1 ? '0.3' : '1';
  };

  const openLightbox = (detail) => {
    setItems(detail.items);
    setCurrentIndex(detail.index);
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setIsOpen(false);
    document.body.style.overflow = '';
    const wrap = mediaWrapRef.current;
    if (wrap) {
      const vid = wrap.querySelector('video');
      if (vid) vid.pause();
      wrap.innerHTML = '';
    }
  };

  const navigate = (dir) => {
    const next = currentIndex + dir;
    if (next < 0 || next >= items.length) return;
    setCurrentIndex(next);
    setTimeout(() => renderContent(next), 0);
  };

  useEffect(() => {
    const handleOpen = (e) => openLightbox(e.detail);
    document.addEventListener('openLightbox', handleOpen);

    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') navigate(-1);
      if (e.key === 'ArrowRight') navigate(1);
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('openLightbox', handleOpen);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, currentIndex, items]);

  useEffect(() => {
    if (isOpen && items.length > 0) {
      setTimeout(() => renderContent(currentIndex), 50);
    }
  }, [isOpen, currentIndex, items]);

  // Expose globals
  useEffect(() => {
    window.closeLightbox = closeLightbox;
    window.lbNav = navigate;
  }, [navigate]);

  if (!isOpen) return null;

  return (
    <div
      id="lightbox"
      className="fixed inset-0 z-[60] bg-black/92 backdrop-blur-sm flex items-center justify-center p-0"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeLightbox();
      }}
    >
      <div
        className="relative flex flex-col items-center"
        style={{ width: '100vw', maxWidth: '100vw', padding: '0 8px' }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={closeLightbox}
          className="fixed top-4 right-4 z-[70] text-white text-lg font-bold w-9 h-9 flex items-center justify-center leading-none rounded-full bg-red-600 hover:bg-red-500 border-2 border-white/30 shadow-lg transition-all duration-150 cursor-pointer"
          style={{ lineHeight: 1, paddingBottom: 1 }}
        >
          &times;
        </button>

        <div id="lb-counter" className="absolute -top-4 left-0 text-[10px] font-mono text-muted bg-black/50 px-2 py-1 rounded-full">
          {currentIndex + 1} / {items.length}
        </div>

        <div className="flex items-center gap-2 sm:gap-4 w-full">
          <button
            id="lb-prev"
            onClick={() => navigate(-1)}
            className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-accent/30 border border-white/20 text-white transition-all duration-150 cursor-pointer"
            title="Previous"
            style={{ opacity: currentIndex === 0 ? 0.3 : 1 }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div id="lb-media-wrap" ref={mediaWrapRef} className="flex-1 min-w-0 flex items-center justify-center rounded-lg overflow-hidden" />

          <button
            id="lb-next"
            onClick={() => navigate(1)}
            className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-accent/30 border border-white/20 text-white transition-all duration-150 cursor-pointer"
            title="Next"
            style={{ opacity: currentIndex === items.length - 1 ? 0.3 : 1 }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div id="lb-caption" className="mt-3 text-center text-xs font-mono text-muted max-w-2xl px-2">
          {items[currentIndex]?.caption || ''}
        </div>
      </div>
    </div>
  );
}

export default Lightbox;