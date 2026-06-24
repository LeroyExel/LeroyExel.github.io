// pages/Projects.jsx
import { useEffect } from 'react';

function Projects() {
  useEffect(() => {
    // Re-bind cards after render
    document.querySelectorAll('.mod-card[data-mod]').forEach((card) => {
      card.addEventListener('click', function (e) {
        if (e.target.closest('a')) return;
        const key = this.dataset.mod;
        if (window.openModal) window.openModal(key);
      });
    });
  }, []);

  return (
    <div className="w-full flex flex-col items-center gap-6">
      <h1 className="text-5xl font-bold mb-8">Projects</h1>

      <div className="w-full max-w-6xl grid grid-cols-1 gap-6">
        {/* Recoil */}
        <div className="bg-white/5 border border-white/10 rounded-lg p-6 hover:border-accent hover:bg-white/10 transition-all cursor-pointer">
          <div className="flex flex-col md:flex-row gap-4 md:items-start">
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-accent mb-2">Recoil</h3>
              <p className="text-muted text-sm">School project using bullet force to shoot yourself up and kill enemies</p>
              <p className="text-muted text-sm mt-4 mb-8">
                <a href="/Projects/recoil.html" className="text-sky-400 hover:underline">
                  See project →
                </a>
              </p>
            </div>
            <p className="font-bold recoil-font text-5xl md:text-5xl mt-8 text-blue-400 md:flex-shrink-0">RECOIL</p>
          </div>
        </div>

        {/* PhysicsGame */}
        <div className="bg-white/5 border border-white/10 rounded-lg p-6 hover:border-accent hover:bg-white/10 transition-all cursor-pointer">
          <div className="flex flex-col md:flex-row gap-4 md:items-start">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-accent mb-2">PhysicsGame</h3>
              <p className="text-muted text-sm">Fully physics driven characters using my own physics animation system.</p>
              <p className="text-muted text-sm mt-4">
                <a
                  href="https://github.com/LeroyExel/Physics-Based-Character/tree/main"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-400 hover:underline"
                >
                  See GitHub →
                </a>
              </p>
            </div>
            <img
              src="https://raw.githubusercontent.com/LeroyExel/Physics-Based-Character/main/ExamplePicture.png"
              alt="PhysicsGame Preview"
              className="rounded-md border border-white/10 w-full md:w-64 md:h-32 h-40 object-cover md:flex-shrink-0"
            />
          </div>
        </div>

        {/* GOPO */}
        <div className="bg-white/5 border border-white/10 rounded-lg p-6 hover:border-accent hover:bg-white/10 transition-all cursor-pointer">
          <div className="flex flex-col md:flex-row gap-4 md:items-start">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-accent mb-2">GOPO</h3>
              <p className="text-muted text-sm">Physics based Pogostick game.</p>
              <p className="text-muted text-sm mt-4">
                <a
                  href="https://github.com/LeroyExel/Gopo-PogoStick-"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-400 hover:underline"
                >
                  See GitHub →
                </a>
              </p>
            </div>
            <img
              src="https://raw.githubusercontent.com/LeroyExel/Gopo-PogoStick-/main/Example.png"
              alt="Project 3 Preview"
              className="rounded-md border border-white/10 w-full md:w-64 md:h-32 h-40 object-cover md:flex-shrink-0"
            />
          </div>
        </div>

        {/* FIVERR MODS SECTION */}
        <div className="w-full max-w-6xl mt-12">
          <div className="flex items-center flex-wrap gap-4 mb-2">
            <h2 className="text-3xl font-bold text-white">Fiverr Mods</h2>
            <span className="px-3 py-1 text-xs font-bold tracking-wider text-green-400 bg-green-500/10 border border-green-500/30 rounded-full uppercase">
              ★ 35+ Reviews
            </span>
            <span className="px-3 py-1 text-xs font-bold tracking-wider text-accent bg-accent/10 border border-accent/20 rounded-full uppercase">
              Commissioned
            </span>
          </div>
          <p className="text-muted text-sm mb-6">All mods were made for a single client — each with 1 unique review.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* The Long Drive */}
            <div
              className="mod-card bg-white/5 border border-white/10 rounded-xl p-6 hover:border-accent/60 transition-all group cursor-pointer"
              data-mod="longdrive"
            >
              <div className="flex items-start justify-between mb-3">
                <span className="text-xs font-mono font-bold text-accent bg-accent/10 px-2.5 py-1 rounded border border-accent/20">
                  Unity
                </span>
                <span className="text-xs text-muted">⭐ 5.0</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-1 group-hover:text-accent transition-colors">
                The Long Drive – Custom Car
              </h3>
              <p className="text-muted text-sm leading-relaxed">
                Fully working custom vehicles for The Long Drive: physics, suspension, and engine sound.
              </p>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {['Unity', 'Physics', 'Vehicles'].map((tag) => (
                  <span key={tag} className="mod-tag text-[10px] px-2 py-0.5 bg-white/5 border border-white/10 rounded text-muted">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Projects;