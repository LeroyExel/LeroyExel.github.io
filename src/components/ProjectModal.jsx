// components/ProjectModal.jsx
import { useState, useEffect, useRef } from 'react';

function ProjectModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [modKey, setModKey] = useState(null);
  const modalRef = useRef(null);

  const modDetails = {
    longdrive: {
      title: 'The Long Drive – Custom Car',
      engine: 'Unity · C# · AssetBundles',
      video: './Projects/fiverr/longdrive/endresult.mp4',
      reviewImage: './Projects/fiverr/longdrive/review.jpeg',
      description: `
        <p>For <strong>The Long Drive</strong> I made a fully working custom car. I used <strong>C#</strong>, <strong>Unity AssetBundles</strong> and <strong>stripped in-game scripts</strong> to get the car into the game.</p>
        <p>What I did:</p>
        <ul class="list-disc list-inside space-y-1 text-muted">
          <li><strong>AssetBundles</strong> — The car is packed as an AssetBundle so it can be loaded dynamically without modifying the game itself.</li>
          <li><strong>Stripped scripts</strong> — I stripped down the existing game scripts to the core and adapted them so the custom car just works with the game logic.</li>
          <li><strong>Physics</strong> — Chassis and wheels with custom colliders, mass distribution and suspension. Feels the same as the original cars.</li>
          <li><strong>Engine & sound</strong> — Torque, RPM and sound that reacts to speed and load.</li>
          <li><strong>Custom textures</strong> — You can add your own colors and parts.</li>
        </ul>
        <p>The mod is fully tested and works seamlessly in the game. No crashes, no weird bugs — just a working custom car.</p>
      `,
      tags: ['Unity', 'C#', 'AssetBundles', 'Physics', 'Vehicles'],
      extra: '⭐ 5.0 · 1 review · Commissioned for a single client',
    },
  };

  const openModal = (key) => {
    setModKey(key);
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsOpen(false);
    document.body.style.overflow = '';
    const vid = document.getElementById('modalVideo');
    if (vid) vid.pause();
  };

  const openLightboxFromModal = (type) => {
    if (!modKey) return;
    const data = modDetails[modKey];
    if (!data) return;

    const items = [];
    if (data.video) items.push({ src: data.video, isVideo: true, caption: '🎬 Final Result — The Long Drive Custom Car' });
    if (data.reviewImage)
      items.push({ src: data.reviewImage, isVideo: false, caption: '⭐ Review — 5.0 stars' });

    let idx = 0;
    if (type === 'video') idx = items.findIndex((item) => item.isVideo === true);
    else if (type === 'review') idx = items.findIndex((item) => item.isVideo === false);
    if (idx === -1) idx = 0;

    // Dispatch event to open lightbox
    const event = new CustomEvent('openLightbox', { detail: { items, index: idx } });
    document.dispatchEvent(event);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) closeModal();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    // Expose openModal globally for projects page
    window.openModal = openModal;
    window.closeModal = closeModal;
    window.openLightboxFromModal = openLightboxFromModal;
  }, []);

  if (!isOpen || !modKey) return null;

  const data = modDetails[modKey];
  if (!data) return null;

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-50 modal-overlay flex items-center justify-center p-4 transition-opacity duration-300"
      style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}
      onClick={(e) => {
        if (e.target === e.currentTarget) closeModal();
      }}
    >
      <div className="modal-content bg-[#0a1a45]/95 border border-white/10 rounded-2xl max-w-2xl w-full p-6 md:p-8 shadow-2xl backdrop-blur-sm relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-muted hover:text-white transition-colors text-2xl leading-none"
        >
          &times;
        </button>

        {data.video && (
          <div className="mb-4">
            <span className="media-label text-[10px] font-bold uppercase tracking-wider text-muted block mb-1">
              🎬 Final Result
            </span>
            <div
              onClick={() => openLightboxFromModal('video')}
              className="cursor-zoom-in group relative rounded-xl overflow-hidden border border-white/10 hover:border-accent/50 transition-colors"
            >
              <video
                id="modalVideo"
                autoPlay
                muted
                loop
                playsInline
                className="w-full rounded-xl border border-white/10 pointer-events-none"
              >
                <source src={data.video} type="video/mp4" />
              </video>
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-[#0a1530]/80 p-3 rounded-full border border-white/10 shadow-lg">
                  <svg className="w-8 h-8 text-accent" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-[#0a1530]/80 px-3 py-1.5 text-[10px] font-mono text-muted">
                Click to enlarge
              </div>
            </div>
          </div>
        )}

        {data.reviewImage && (
          <div className="mb-4">
            <span className="media-label text-[10px] font-bold uppercase tracking-wider text-muted block mb-1">
              ⭐ Review
            </span>
            <div
              onClick={() => openLightboxFromModal('review')}
              className="cursor-zoom-in group relative rounded-xl overflow-hidden border border-white/10 hover:border-accent/50 transition-colors"
            >
              <img
                id="modalReviewImage"
                src={data.reviewImage}
                alt="Review screenshot"
                className="w-full rounded-xl border border-white/10 pointer-events-none"
              />
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-[#0a1530]/80 p-3 rounded-full border border-white/10 shadow-lg">
                  <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-[#0a1530]/80 px-3 py-1.5 text-[10px] font-mono text-muted">
                Click to enlarge
              </div>
            </div>
          </div>
        )}

        <h2 className="text-2xl font-bold text-accent mb-2">{data.title}</h2>
        <div className="text-xs font-mono text-muted mb-4">{data.engine}</div>
        <div
          className="text-sm text-text leading-relaxed space-y-3"
          dangerouslySetInnerHTML={{ __html: data.description }}
        />
        <div className="flex flex-wrap gap-2 mt-4">
          {data.tags.map((tag) => (
            <span key={tag} className="text-[10px] px-2.5 py-1 bg-white/5 border border-white/10 rounded-full text-muted">
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-4 text-muted text-sm border-t border-white/10 pt-4">{data.extra}</div>
      </div>
    </div>
  );
}

export default ProjectModal;