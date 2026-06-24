// pages/BPV_Project.jsx
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

function BPVProject() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [gameScore, setGameScore] = useState(0);
  const [gameRunning, setGameRunning] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [tasksUnlocked, setTasksUnlocked] = useState(false);
  const [activeNodes, setActiveNodes] = useState([]);
  const [openSections, setOpenSections] = useState({});
  const [openFolders, setOpenFolders] = useState({});

  const gameIntervalRef = useRef(null);
  const boardRef = useRef(null);

  const toggleMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const closeMenu = () => setMobileMenuOpen(false);

  const toggleSection = (id) => {
    setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleFolder = (id) => {
    setOpenFolders((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const startMiniGame = () => {
    setGameScore(0);
    setGameOver(false);
    setGameWon(false);
    setTasksUnlocked(false);
    setActiveNodes([]);
    setGameRunning(true);
    clearInterval(gameIntervalRef.current);

    if (boardRef.current) {
      boardRef.current.innerHTML = '';
    }

    gameIntervalRef.current = setInterval(() => {
      if (!gameRunning) return;
      if (activeNodes.length >= 3) {
        endGame(false);
        return;
      }
      spawnBugNode();
    }, 850);
  };

  const spawnBugNode = () => {
    const board = boardRef.current;
    if (!board) return;

    const bugTypes = [
      { text: 'New Bug', color: 'bg-red-900/80' },
      { text: 'Merge Conflict', color: 'bg-amber-900/80' },
      { text: 'Crash', color: 'bg-rose-950/80' },
    ];
    const bugType = bugTypes[Math.floor(Math.random() * bugTypes.length)];

    const btn = document.createElement('button');
    btn.className = `absolute px-2.5 py-1 text-white text-[11px] font-mono border border-white/20 rounded cursor-pointer transition-transform active:scale-95 shadow-sm ${bugType.color}`;
    btn.innerText = bugType.text;

    const maxW = board.clientWidth - 110;
    const maxH = board.clientHeight - 35;
    btn.style.left = `${Math.max(6, Math.floor(Math.random() * maxW))}px`;
    btn.style.top = `${Math.max(6, Math.floor(Math.random() * maxH))}px`;

    btn.onclick = (e) => {
      e.stopPropagation();
      if (!gameRunning) return;
      btn.remove();
      setActiveNodes((prev) => prev.filter((n) => n !== btn));
      setGameScore((prev) => {
        const newScore = prev + 1;
        if (newScore >= 5) endGame(true);
        return newScore;
      });
    };

    board.appendChild(btn);
    setActiveNodes((prev) => [...prev, btn]);
  };

  const endGame = (won) => {
    setGameRunning(false);
    clearInterval(gameIntervalRef.current);
    activeNodes.forEach((n) => n.remove());
    setActiveNodes([]);
    setGameOver(true);
    setGameWon(won);

    if (won) {
      setTasksUnlocked(true);
    }
  };

  const skipGame = () => {
    endGame(true);
  };

  // Reset game state when component unmounts
  useEffect(() => {
    return () => {
      clearInterval(gameIntervalRef.current);
    };
  }, []);

  // Open lightbox for media
  useEffect(() => {
    window.openLightbox = (element) => {
      // Find the media element
      const mediaEl = element.querySelector('img, video');
      if (!mediaEl) return;

      let isVideo = mediaEl.tagName.toLowerCase() === 'video';
      let src = '';
      if (isVideo) {
        const source = mediaEl.querySelector('source');
        src = source ? source.getAttribute('src') : mediaEl.getAttribute('src') || '';
      } else {
        src = mediaEl.getAttribute('src') || '';
      }
      if (!src) return;

      const captionEl = element.querySelector('p');
      const caption = captionEl ? captionEl.textContent.trim() : '';

      const items = [{ src, isVideo, caption }];
      const event = new CustomEvent('openLightbox', { detail: { items, index: 0 } });
      document.dispatchEvent(event);
    };
  }, []);

  return (
    <div className="min-h-screen flex bg-gradient-to-b from-[#0f2b72] to-[#071025] text-text antialiased relative">
      {/* Particles */}
      <div id="particles-js" className="fixed inset-0 z-0 pointer-events-none opacity-90" />

      {/* Mobile Menu Button */}
      <button
        onClick={toggleMenu}
        className="fixed top-4 left-4 z-50 md:hidden bg-white/10 border border-white/10 rounded-xl p-2 backdrop-blur-md text-accent"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <div
        onClick={toggleMenu}
        className={`fixed inset-0 z-30 bg-black/60 backdrop-blur-sm md:hidden transition-opacity duration-200 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Sidebar */}
      <aside
        className={`fixed md:sticky top-0 left-0 z-40 h-screen w-64 bg-[#0a1a45]/95 border-r border-white/10 p-6 flex flex-col justify-between transform transition-transform duration-200 ease-in-out md:translate-x-0 backdrop-blur-md md:bg-white/5 overflow-y-auto ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="space-y-8">
          <div>
            <a href="#algemeen" onClick={closeMenu}>
              <svg viewBox="0 0 1141.4 272.5" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto mb-5 opacity-80 hover:opacity-100 transition-opacity">
                <polygon fill="#FFFFFF" points="227.1,132.6 226.7,132.6 96.3,2 6.6,2 141.5,132.8 142.5,134.3 0,271.2 91.2,271.2 " />
                <path fill="#FFFFFF" d="M385.5,173.5C385.5,173.5,385.5,173.5,385.5,173.5L385.5,173.5c32.8-9.2,53.7-32.6,58.3-65.1C452.2,50,409.3,2,350.3,2H157.5c0,0-0.1,0,0,0.1L220,63.9h127.2c18.9,0,35,15.4,34.8,34.3c0,5.8-1.5,11.2-4.1,15.9c-5.8,10.7-17,17.9-30,17.9h-78.4c0,0,0,0,0,0.1l124.6,139.1h80.5L385.5,173.5L385.5,173.5z" />
                <path fill="#FFFFFF" d="M577.2,69.7c4.5,1.6,9.6,2.4,15.2,2.4h0c4.9,0,9.4-0.9,13.5-2.6s7.4-4.3,9.8-7.5s3.7-7.1,3.7-11.5c0-4-1.3-7.3-4-10c-2.7-2.7-6.8-4.8-12.3-6.3l-13.5-3.6c-3.3-0.9-6-2.4-8-4.3s-3-4.1-3-6.5c0-2.1,0.6-4.1,1.9-5.8s3.2-3.2,5.8-4.2s5.8-1.6,9.6-1.6c3,0,5.8,0.4,8.5,1.1c2.7,0.7,5.2,2,7.3,3.9s3.7,4.7,4.7,8.4l9.1-4.1c-2.1-5.8-5.7-10.1-10.6-12.9C610,1.4,603.8,0,596.5,0c-5.5,0-10.3,0.9-14.4,2.8c-4.1,1.9-7.2,4.4-9.5,7.6s-3.4,6.7-3.4,10.6c0,2.8,0.7,5.3,2.1,7.6c1.4,2.3,3.5,4.3,6.2,6s6,3.1,9.8,4.1l12.2,3.2c3.4,0.9,6,2.1,7.8,3.6c1.8,1.5,2.7,3.5,2.7,6.2c0,2.1-0.6,4.1-1.9,6s-3.1,3.4-5.6,4.6s-5.6,1.8-9.3,1.8c-4,0-7.6-0.5-11-1.7c-3.4-1.1-6.4-2.9-8.9-5.4s-4.4-5.8-5.7-9.9l-9.1,4.2c1.7,4.5,4.1,8.3,7.2,11.4S572.7,68.1,577.2,69.7L577.2,69.7z" />
                <path fill="#FFFFFF" d="M621.8,71.2H632l12.9-20.1h32.7l3.2,20.1h9l-10.9-70h-11.3L621.8,71.2L621.8,71.2z M671.3,10.3l5.1,32.9h-26.3L671.3,10.3z" />
                <polygon fill="#FFFFFF" points="692.8,71.2 703.8,71.2 731.3,41.8 744.1,71.2 753.7,71.2 738,35.5 770.1,1.2 759.5,1.2 734.5,28.2 723,1.2 712.9,1.2 727.6,34.4 692.8,71.2 " />
                <polygon fill="#FFFFFF" points="778,71.2 795.5,1.2 786.3,1.2 768.9,71.2 " />
                <path fill="#FFFFFF" d="M821.9,68.7c4.7,2.4,9.9,3.6,15.5,3.6c6.2,0,11.7-1.1,16.4-3.4c4.7-2.3,8.7-5.3,12-9.2c3.2-3.9,5.7-8.3,7.3-13.3c1.6-5,2.5-10.1,2.5-15.5c0-6.6-1.4-12.1-4.2-16.7s-6.5-8-11.2-10.4c-4.7-2.4-9.8-3.6-15.4-3.6c-6.2,0-11.7,1.1-16.6,3.4s-8.8,5.3-12.1,9.2c-3.2,3.9-5.7,8.3-7.3,13.2s-2.5,10.1-2.5,15.6c0,6.6,1.4,12.2,4.3,16.8C813.4,62.9,817.2,66.3,821.9,68.7z M817.6,28.9c1.2-3.9,2.9-7.4,5.3-10.5s5.3-5.6,8.7-7.4s7.5-2.8,12-2.8s8.4,0.9,11.7,2.8c3.3,1.8,6,4.5,7.8,8c1.9,3.5,2.8,7.6,2.8,12.5c0,4.1-0.6,8.1-1.8,12c-1.2,3.9-2.9,7.4-5.2,10.6s-5.2,5.6-8.6,7.5c-3.4,1.8-7.4,2.8-12,2.8l0,0c-4.5,0-8.5-0.9-11.9-2.8s-6-4.5-7.9-8c-1.9-3.5-2.8-7.6-2.8-12.5C815.8,36.8,816.4,32.8,817.6,28.9L817.6,28.9z" />
                <polygon fill="#FFFFFF" points="837.5,72.3 837.4,72.3 837.4,72.3 " />
                <polygon fill="#FFFFFF" points="907.3,21.8 909.7,10.5 909.8,10.5 914.5,24.3 933.5,71.2 944.3,71.2 961.7,1.2 953.1,1.2 940.8,50.6 938.4,61.9 938.3,61.9 933.4,47.9 914.7,1.2 903.8,1.2 886.4,71.2 886.4,71.2 895,71.2 " />
                <polygon fill="#FFFFFF" points="683.5,215.3 703.7,190.5 716.8,215.3 741.3,215.3 718.1,176.9 751.9,138.5 726.4,138.5 707.9,162.7 696.1,138.5 671.4,138.5 692.9,175.8 656.4,215.3 " />
                <path fill="#FFFFFF" d="M768.5,215.3l10.1-60.3h11c4.7,0,8.2,0.7,10.5,2.1s3.5,4.1,3.5,8.1c0,2-0.3,3.9-1,5.7s-1.6,3.3-2.8,4.7c-1.2,1.3-2.8,2.4-4.6,3.2c-1.8,0.8-3.9,1.2-6.3,1.2h-10l18.2,35.4h23l-15.8-26.5c4-0.8,7.4-2.2,10.2-4.1s4.9-4.1,6.6-6.5s2.9-5,3.6-7.7c0.7-2.7,1.1-5.3,1.1-7.7c0-8.5-2.6-14.7-7.9-18.5s-13.6-5.7-25-5.7h-33.3l-13,76.8L768.5,215.3L768.5,215.3z" />
                <polygon fill="#FFFFFF" points="918.6,197.5 877.1,197.5 887.3,138.5 865.2,138.5 852.1,215.3 915.5,215.3 " />
                <path fill="#FFFFFF" d="M949,204.2h29.3l2,11.1h23.1L984,138.6h-19.4l-45.4,76.8h23.9L949,204.2L949,204.2z M970.8,163.1l5,27.6h-19.7L970.8,163.1z" />
                <path fill="#FFFFFF" d="M1068.4,213.4c3.3-1.3,6-3,8-5.1c2.1-2.1,3.6-4.4,4.5-7.1c0.9-2.7,1.4-5.4,1.4-8.1c0-4.7-1.2-8.4-3.5-11.1c-2.3-2.7-5.8-4.5-10.3-5.5v-1.1c5.1-1,9.1-3,11.9-6.2s4.3-7.2,4.3-11.9c0-6.2-2.1-10.8-6.4-14s-11.2-4.7-20.6-4.7h-36.2l-13,76.8h47.7C1061,215.4,1065.1,214.7,1068.4,213.4L1068.4,213.4z M1040.6,155h13.1c3.4,0,5.9,0.5,7.4,1.6s2.3,2.8,2.3,5.1s-0.8,4.2-2.4,5.8s-4.3,2.3-8.1,2.3h-14.8L1040.6,155L1040.6,155z M1033.2,198.9l2.6-15.5h15.1c3.6,0,6.1,0.6,7.6,1.7s2.3,3,2.3,5.5s-0.8,4.6-2.6,6.1c-1.7,1.4-4.3,2.2-7.9,2.2L1033.2,198.9L1033.2,198.9z" />
                <path fill="#FFFFFF" d="M1141.4,184.2c0-48.7-39.6-88.3-88.3-88.3H696.7c-48.7,0-88.3,39.6-88.3,88.3s39.6,88.3,88.3,88.3h356.4C1101.8,272.5,1141.4,232.9,1141.4,184.2z M696.7,263.5c-43.7,0-79.3-35.6-79.3-79.3s35.6-79.3,79.3-79.3h356.4c43.7,0,79.3,35.6,79.3,79.3s-35.6,79.3-79.3,79.3H696.7L696.7,263.5z" />
              </svg>
            </a>
            <h2 className="text-xs font-bold tracking-widest text-muted uppercase mb-4">BPV Documentatie</h2>
            <nav className="flex flex-col space-y-1 text-sm font-medium">
              {[
                { id: 'algemeen', label: 'Start' },
                { id: 'voorwoord', label: 'Voorwoord' },
                { id: 'inleiding', label: 'Inleiding' },
                { id: 'bedrijf', label: 'Bedrijfsinformatie' },
                { id: 'personeel', label: 'Personeel' },
                { id: 'taken', label: 'BPV-Taken (Minigame)' },
                { id: 'dag', label: 'Dag bij XR Lab' },
                { id: 'leerdoelen', label: 'Leerdoelen' },
                { id: 'conclusie', label: 'Conclusie' },
                { id: 'reflectie', label: 'Reflectie' },
                { id: 'slotwoord', label: 'Slotwoord' },
                { id: 'media', label: 'Videos/Foto\'s' },
              ].map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={closeMenu}
                  className="px-3 py-2 rounded-lg hover:bg-white/5 hover:text-accent transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Link
            to="/projects"
            className="block text-center text-sm font-extrabold px-3 py-2.5 rounded-xl border border-red-500/40 bg-red-500/10 text-red-400 hover:bg-red-500/25 hover:border-red-500 hover:-translate-x-1 transition-all duration-200"
          >
            ← Back
          </Link>
          <div className="text-xs text-muted font-mono uppercase tracking-widest">Leroy Exel &copy; 2026</div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl mx-auto px-6 py-12 md:px-12 space-y-16 relative z-10">
        {/* ... BPV content ... */}
        {/* This is a large page, I'll include the full content but simplified */}
        <header id="algemeen" className="space-y-6 pt-6">
          <div className="space-y-2">
            <span className="inline-block px-3 py-1 text-xs font-bold tracking-widest text-accent bg-accent/10 border border-accent/20 rounded-lg uppercase">
              Opleiding Software Development
            </span>
            <h1 className="text-4xl font-extrabold text-white tracking-tight sm:text-5xl">BPV Verslag</h1>
            <p className="text-lg text-muted">Saxion XR Lab Enschede &bull; Leroy Exel</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 shadow-xl backdrop-blur-sm grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-accent block text-xs font-semibold uppercase tracking-wider mb-0.5">Stagiair</span>
              <span className="font-medium text-white">Leroy Exel</span>
            </div>
            <div>
              <span className="text-accent block text-xs font-semibold uppercase tracking-wider mb-0.5">Studentnummer</span>
              <span className="font-medium text-white">1365701</span>
            </div>
            <div>
              <span className="text-accent block text-xs font-semibold uppercase tracking-wider mb-0.5">Leeftijd</span>
              <span className="font-medium text-white">17 jaar</span>
            </div>
            <div>
              <span className="text-accent block text-xs font-semibold uppercase tracking-wider mb-0.5">Woonplaats</span>
              <span className="font-medium text-white">Almelo</span>
            </div>
            <div>
              <span className="text-accent block text-xs font-semibold uppercase tracking-wider mb-0.5">Praktijkopleider</span>
              <span className="font-medium text-white">Bram Scholten</span>
            </div>
            <div>
              <span className="text-accent block text-xs font-semibold uppercase tracking-wider mb-0.5">Stagebedrijf</span>
              <span className="font-medium text-white">Saxion XR Lab Enschede</span>
            </div>
            <div>
              <span className="text-accent block text-xs font-semibold uppercase tracking-wider mb-0.5">Opleiding</span>
              <span className="font-medium text-white">MBO Niveau 4 ROC van Twente</span>
            </div>
            <div className="sm:col-span-2 pt-3 border-t border-white/5 text-muted italic text-xs">
              Stageperiode: 2 februari 2026 tot 26 juni 2026
            </div>
          </div>
        </header>

        <hr className="border-white/10" />

        <section id="voorwoord" className="space-y-4">
          <h2 className="text-2xl font-bold text-white tracking-tight border-l-4 border-accent pl-4">Voorwoord</h2>
          <div className="text-muted space-y-4 leading-relaxed">
            <p>Voor je ligt mijn BPV verslag over mijn stage bij het Saxion XR Lab in Enschede. Ik loop hier sinds 2 februari 2026 stage voor mijn MBO-opleiding Software Development op het ROC van Twente.</p>
            <p>In dit verslag vertel ik over het stagebedrijf en de projecten waar ik de afgelopen maanden aan heb gewerkt. Ook kijk ik goed terug op mijn eigen ontwikkeling als developer.</p>
            <p>Het schrijven van dit verslag was een goed moment om eens te kijken wat ik allemaal heb geleerd, wat er goed ging en waar ik de komende tijd nog aan moet werken. Ik hoop dat dit verslag een goed en realistisch beeld geeft van mijn stageperiode.</p>
          </div>
        </section>

        <section id="inleiding" className="space-y-4">
          <h2 className="text-2xl font-bold text-white tracking-tight border-l-4 border-accent pl-4">Inleiding</h2>
          <div className="text-muted space-y-4 leading-relaxed">
            <p>Dit verslag laat zien hoe het er dagelijks aan toe gaat binnen het Saxion XR Lab en wat er allemaal komt kijken bij het maken van software in een serieuze omgeving.</p>
            <p>Na de bedrijfsinformatie heb ik twee belangrijke BPV-taken helemaal uitgewerkt volgens de acht procesfasen van school: oriëntatie, definitie, ontwerp, keuze, voorbereiding, uitvoering, presentatie en evaluatie.</p>
            <p>De twee taken die ik heb uitgewerkt zijn:</p>
            <ol className="list-decimal list-inside space-y-2 pl-2 text-text">
              <li>Het fixen van een medication fluid visuals bug in Blueprint voor de LUMC Department of Anaesthesiology Unreal Engine Showcase.</li>
              <li>De implementatie van het interactieve Sticky Notes notificatiesysteem binnen Unreal Engine voor het project Reintegration.</li>
            </ol>
            <p>Daarnaast zit er een interactieve mini-game in dit verslag om te simuleren wat er op een dag gebeurt. Los 5 binnenkomende runtime issues op om de rest van de procesfasen te zien, of klik gewoon op skip.</p>
          </div>
        </section>

        <section id="bedrijf" className="space-y-6">
          <h2 className="text-2xl font-bold text-white tracking-tight border-l-4 border-accent pl-4">Bedrijfsinformatie</h2>
          <div className="space-y-6 text-muted leading-relaxed">
            <div>
              <h3 className="text-sm font-bold text-accent uppercase tracking-wider mb-2">Geschiedenis &amp; Huidige Situatie</h3>
              <p>Het Saxion XR Lab zit in Enschede aan het Ariënsplein 1. Het lab is opgericht op 28 november 2019 door Matthijs van Veen, nadat hij in 2018 al begon met het idee omdat VR brillen steeds beter werden. Het is een gave werkomgeving waar studenten, docenten en professionals samenwerken aan projecten met Virtual Reality en interactieve media.</p>
            </div>
            <div>
              <h3 className="text-sm font-bold text-accent uppercase tracking-wider mb-2">Producten &amp; Klanten</h3>
              <p>In het lab bouwen we verschillende interactieve producten, zoals medische simulaties, Leerzame VR games en Moderne Prototypes. De klanten zijn vooral onderwijsinstellingen, de zorg en externe bedrijven. Een groot voorbeeld is onze samenwerking met het LUMC Department of Anaesthesiology, waar we VR simulaties voor maken.</p>
            </div>
            <div>
              <h3 className="text-sm font-bold text-accent uppercase tracking-wider mb-2">Organisatie &amp; Samenwerking</h3>
              <p>Binnen het lab werk ik samen met projectgenoten, andere stagiairs en medewerkers. Mijn begeleider is Bram Scholten. Bij hem kan ik altijd terecht voor vragen en ik lever mijn code ook bij hem in. De kwaliteitscontrole doen we via code reviews op GitLab en door alles goed te testen.</p>
            </div>
          </div>
          <div className="pt-4">
            <h3 className="text-xs font-bold text-muted uppercase tracking-widest mb-3">Gebruikte Software &amp; Hardware</h3>
            <div className="flex flex-wrap gap-2 text-xs font-mono">
              {['Unreal Engine 5', 'C++ / Blueprints', 'Visual Studio', 'GitFork / GitLab', 'Meta Quest 3', 'Jira', 'ClickUp'].map(
                (tool) => (
                  <span key={tool} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-white">
                    {tool}
                  </span>
                )
              )}
            </div>
          </div>
        </section>

        <section id="personeel" className="space-y-6">
          <h2 className="text-2xl font-bold text-white tracking-tight border-l-4 border-accent pl-4">Personeel</h2>
          <p className="text-sm text-muted">Overzicht van het team binnen het Saxion XR Lab (18 personen in totaal, bestaande uit 9 vaste medewerkers en 9 actieve stagiairs)</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              'Matthijs van Veen — Head of Saxion XR Lab',
              'Bram Scholten — Software Engineer / Praktijkopleider',
              'Andreas — Artist',
              'Stefan Talman — Lab Admin',
              'Trim Vezvesja — Software Engineer',
              'Marloes Bekhuis — Game Designer',
              'Mirjam — Teacher / Researcher',
              'Rob Maas — Teacher / Researcher',
              'Daniel Valente de Macedo — Teacher / Researcher',
            ].map((person, i) => {
              const [name, role] = person.split(' — ');
              return (
                <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-sm flex justify-between items-center">
                  <div>
                    <h3 className="text-white font-medium text-sm">{name}</h3>
                    <span className="text-xs text-muted">{role}</span>
                  </div>
                </div>
              );
            })}
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-sm flex justify-between items-center border-l-2 border-emerald-500/40">
              <div>
                <h3 className="text-white font-medium text-sm">Leroy Exel</h3>
                <span className="text-xs text-muted">Stagiair Software Engineer</span>
              </div>
              <span className="px-2 py-0.5 text-[10px] font-mono bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded">
                Stagiair
              </span>
            </div>
          </div>
        </section>

        <section id="taken" className="space-y-8">
          <h2 className="text-2xl font-bold text-white tracking-tight border-l-4 border-accent pl-4">BPV-Taken (Minigame)</h2>

          <div className="bg-[#0a1530] border border-white/10 rounded-xl p-5 shadow-xl relative">
            <div className="mb-4 flex items-center justify-between border-b border-white/5 pb-3">
              <div>
                <span className="text-[10px] font-mono font-bold tracking-wider text-accent uppercase">Visual Studio Console</span>
                <h3 className="text-sm font-bold text-white">Dagelijkse Problemen (Minigame)</h3>
              </div>
              <div className="flex items-center space-x-4 text-xs font-mono">
                <div>
                  Score: <span className="text-white font-bold">{gameScore}/5</span>
                </div>
                <button onClick={skipGame} className="text-red-500 hover:underline cursor-pointer font-semibold">
                  Skip minigame
                </button>
              </div>
            </div>

            <div className="bg-[#060d1f] border border-white/10 rounded-lg min-h-[180px] relative flex flex-col items-center justify-center p-4 overflow-hidden">
              {!gameRunning && !gameOver && (
                <div className="text-center space-y-3 z-10">
                  <p className="text-xs text-muted max-w-xs mx-auto">Voltooi de minigame om de taken te bekijken.</p>
                  <button
                    onClick={startMiniGame}
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-mono text-xs rounded transition-all"
                  >
                    Start Dag
                  </button>
                </div>
              )}

              {gameRunning && (
                <div className="w-full h-full absolute inset-0 p-2">
                  <div ref={boardRef} className="w-full h-full relative"></div>
                </div>
              )}

              {gameOver && (
                <div className="text-center space-y-2 z-10">
                  <div className={`text-xl font-bold ${gameWon ? 'text-emerald-400' : 'text-red-500'}`}>
                    {gameWon ? '✓' : '×'}
                  </div>
                  <h4 className={`text-xs font-bold uppercase tracking-wider ${gameWon ? 'text-emerald-400' : 'text-red-500'}`}>
                    {gameWon ? 'Voltooid' : 'Gefaald'}
                  </h4>
                  <p className="text-xs text-muted font-mono">
                    {gameWon
                      ? 'Ging het maar zo makkelijk in het echt...'
                      : 'De issues stapelden zich te snel op. Probeer het opnieuw of gebruik skip.'}
                  </p>
                  <button
                    onClick={startMiniGame}
                    className="px-3 py-1 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-mono text-xs rounded transition-all mt-1"
                  >
                    Herstarten
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Tasks content - only shown when unlocked */}
          <div
            className={`overflow-hidden transition-all duration-700 ease-in-out ${tasksUnlocked ? 'max-h-[9999px] opacity-100' : 'max-h-0 opacity-0'}`}
          >
            <div className="space-y-8">
              <div className="bg-white/5 border border-white/10 rounded-xl p-6 shadow-xl space-y-6 backdrop-blur-sm">
                <div>
                  <span className="text-xs font-bold font-mono tracking-wider text-accent uppercase">Taak 01</span>
                  <h3 className="text-xl font-bold text-white mt-0.5">Fix medication fluid visuals</h3>
                  <p className="text-sm text-muted mt-1">
                    Een hardnekkige bug gefixt in Blueprints waarbij de vloeistof in de medicatiespuit helemaal uitrekte zodra je hem gebruikte.
                  </p>
                </div>
                <div className="grid grid-cols-1 gap-4 pt-4 border-t border-white/5 text-sm">
                  <div>
                    <strong className="text-accent block font-semibold mb-0.5">1. Oriëntatiefase:</strong>
                    <span className="text-muted">
                      Bij de VR-showcase voor het LUMC moeten artsen medicatie toedienen met een virtuele bolus spuit. Tijdens het testen vonden
                      we een flinke bug: zodra de spuit geplaatst werd, raakte de liquid shader helemaal vervormd en schoot in de min. Zag er
                      echt niet uit en brak de hele immersie.
                    </span>
                  </div>
                  <div>
                    <strong className="text-accent block font-semibold mb-0.5">2. Definitiefase:</strong>
                    <span className="text-muted">
                      De eisen waren simpel: de vloeistof in de spuit moest gewoon netjes z'n volume behouden en soepel zakken tijdens het
                      inspuiten. Geen rare glitches of negatieve schaling. En ik moest de onderliggende fout in de blueprint fixen.
                    </span>
                  </div>
                  <div>
                    <strong className="text-accent block font-semibold mb-0.5">3. Ontwerpfase:</strong>
                    <span className="text-muted">
                      Ik ben in Unreal Engine gaan kijken en kwam erachter dat de variabele MaxSyringeValue (maximale inhoud) per ongeluk op 0
                      stond in de setup van de spuiten. Hierdoor probeerde de rekensom te delen door nul, waardoor de schaal de min in vloog. De
                      fix was dus zorgen dat die waarde nooit 0 kan zijn.
                    </span>
                  </div>
                  <div>
                    <strong className="text-accent block font-semibold mb-0.5">4. Keuzefase:</strong>
                    <span className="text-muted">
                      Ik kon de variabele gewoon terugzetten in de Unreal editor, maar als iemand hem dan weer op 0 zet, crasht de boel weer.
                      Dus koos ik ervoor om hem in de editor goed te zetten én in Blueprint een check (clamp)te bouwen zodat hij altijd hoger
                      dan 0 is.
                    </span>
                  </div>
                  <div>
                    <strong className="text-accent block font-semibold mb-0.5">5. Voorbereidingsfase:</strong>
                    <span className="text-muted">
                      In GitFork heb ik een aparte branch aangemaakt (feature/Fix-medication-fluid), want je mag hier niet zomaar in main
                      pushen je moet een merge request indienen.
                    </span>
                  </div>
                  <div>
                    <strong className="text-accent block font-semibold mb-0.5">6. Uitvoeringsfase:</strong>
                    <span className="text-muted">
                      In Unreal Engine heb ik de variabelen van de spuit aangepast naar de correcte waarden. Met de Quest 3 heb ik het getest en
                      het werkte perfect. De vloeistof nam netjes lineair af.
                    </span>
                  </div>
                  <div>
                    <strong className="text-accent block font-semibold mb-0.5">7. Presentatiefase:</strong>
                    <span className="text-muted">
                      Ik heb een merge request gemaakt van de gefixte spuit aan stagebegeleider Bram tijdens een code review op GitLab. En heb
                      uitgelegd hoe ik dat nou heb gefixt. Na goedkeuring is de branch gemerged in develop.
                    </span>
                  </div>
                  <div>
                    <strong className="text-accent block font-semibold mb-0.5">8. Evaluatiefase:</strong>
                    <span className="text-muted">
                      Bug succesvol gefixt! Gevaarlijk hoe zo'n kleine setup fout als delen door nul zulke extreme glitches kan veroorzaken ben
                      hier meerdere dagen mee bezig geweest. Ik heb wel echt geleerd waar ik eerst moet zoeken voor fouten.
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-6 shadow-xl space-y-6 backdrop-blur-sm">
                <div>
                  <span className="text-xs font-bold font-mono tracking-wider text-accent uppercase">Taak 02</span>
                  <h3 className="text-xl font-bold text-white mt-0.5">Sticky Notes System</h3>
                  <p className="text-sm text-muted mt-1">
                    Ontwerp en implementatie van een interactief, physics-gebaseerd notificatiesysteem binnen het project REINTEGRATION.
                  </p>
                </div>
                <div className="grid grid-cols-1 gap-4 pt-4 border-t border-white/5 text-sm">
                  <div>
                    <strong className="text-accent block font-semibold mb-0.5">1. Oriëntatiefase:</strong>
                    <span className="text-muted">
                      Voor het project REINTEGRATION zochten we een manier om binnenkomende meldingen en notificaties op een natuurlijke manier
                      aan de speler te laten zien. Het idee was om dit te doen met fysieke sticky notes die je kunt vastpakken en ophangen.
                    </span>
                  </div>
                  <div>
                    <strong className="text-accent block font-semibold mb-0.5">2. Definitiefase:</strong>
                    <span className="text-muted">
                      In overleg met Andreas zijn de functionele eisen bepaald. De briefjes moesten willekeurig spawnen op een dashboard-scherm
                      zodra er een melding binnenkomt. De speler moet ze kunnen pakken en weggooien met controllers en handden op basis van de
                      bestaande VR_Pawn. Ook moesten ze op alles blijven plakken.
                    </span>
                  </div>
                  <div>
                    <strong className="text-accent block font-semibold mb-0.5">3. Ontwerpfase:</strong>
                    <span className="text-muted">
                      Ik heb de logica uitgewerkt. Voor het spawnen moest de Blueprint-logica een random X/Y-positie berekenen binnen de
                      grenzen van het scherm. Voor het plakken moesten muren worden voorzien van een box collision component (hitbox). Zodra
                      een briefje deze raakt, moet de physics stoppen en een physics constraint component worden geactiveerd om de note star te
                      verankeren.
                    </span>
                  </div>
                  <div>
                    <strong className="text-accent block font-semibold mb-0.5">4. Keuzefase:</strong>
                    <span className="text-muted">
                      Ik heb gekozen voor Widget Components gerenderd in World Space, gecombineerd met Unreal Engine Physics. Om de interactie
                      realistisch te houden, moest de physics-simulatie actief blijven tijdens het werpen zodat het briefje met de juiste vaart
                      wegvliegt.
                    </span>
                  </div>
                  <div>
                    <strong className="text-accent block font-semibold mb-0.5">5. Voorbereidingsfase:</strong>
                    <span className="text-muted">
                      Ik heb de benodigde 3D-assets en materialen voor de sticky notes klaargezet in Unreal Engine. Ook heb ik een aparte
                      feature-branch aangemaakt in GitFork (`feature/sticky-notes-system`) zodat ik veilig kon experimenteren met de
                      physics-logica zonder de main branch te slopen.
                    </span>
                  </div>
                  <div>
                    <strong className="text-accent block font-semibold mb-0.5">6. Uitvoeringsfase:</strong>
                    <span className="text-muted">
                      Ik heb de Sticky Note Actor volledig opgebouwd in Unreal Engine. De eerste methode om de sticky note aan een oppervlak te
                      plakken werkte niet goed de note gedroeg zich raar en zat niet stabiel vast. Ik heb dit opgelost door over te stappen op
                      "Attach Component to Component", waardoor de note netjes en stabiel vastzit zodra hij een oppervlak raakt. Dit is ook te
                      zien in het bewijsmateriaal. Daarnaast krijgt elke sticky note bij het spawnen een willekeurige mesh uit drie varianten:
                      één met de linker onderhoek omgebogen, één met de rechter onderhoek omgebogen, en één die plat is. Dit zorgt voor een
                      natuurlijker en gevarieerder uiterlijk. De logica voor het grijpen, gooien en plakken via de hitbox functioneert stabiel
                      in de VR Preview zonder rare glitches of dat de briefjes door de muur heen clippen.
                    </span>
                  </div>
                  <div>
                    <strong className="text-accent block font-semibold mb-0.5">7. Presentatiefase:</strong>
                    <span className="text-muted">
                      Ik heb de werkende VR-build laten zien tijdens onze wekelijkse demo. Iedereen in het team heeft de sticky notes getest met
                      de Meta Quest 3 om te kijken of het gooien en plakken natuurlijk aanvoelde. Daarna heb ik een merge request aangemaakt op
                      GitLab.
                    </span>
                  </div>
                  <div>
                    <strong className="text-accent block font-semibold mb-0.5">8. Evaluatiefase:</strong>
                    <span className="text-muted">
                      Het notificatiesysteem werkt echt super goed en voegt veel interactiviteit toe aan de game. De opzet is flexibel en
                      herbruikbaar gemaakt, waardoor we dit systeem eventueel ook in andere projecten van het XR Lab kunnen gebruiken.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="dag" className="space-y-4">
          <h2 className="text-2xl font-bold text-white tracking-tight border-l-4 border-accent pl-4">Een dag bij het XR Lab</h2>
          <div className="border-l-2 border-white/10 space-y-6 pl-4 ml-2">
            {[
              {
                time: '09:00 - 10:00',
                desc: 'Mijn werkdag bij het Saxion XR Lab begint rond 09:00 uur. Ik start direct mijn pc op, open GitFork en doe als eerste een <code class="text-accent font-mono">git pull</code> om de nieuwste updates en code van mijn projectgenoten binnen te halen.',
              },
              {
                time: '10:00 - 12:00',
                desc: 'Rond 10:00 uur sluit ik aan bij de gezamenlijke stand-up met het hele team. Hierin bespreken we kort wat we de dag ervoor hebben gedaan, zoals het oplossen van patiënt-spawning bugs, en wat we vandaag gaan oppakken, zoals het toevoegen van knoppen aan het host-menu. Openstaande taken beheren we in ClickUp. De rest van de ochtend zit ik lekker in de flow te developen in Visual Studio en Unreal Engine.',
              },
              {
                time: '12:00 - 13:00',
                desc: 'Om <span class="text-white">12:00 uur</span> neem ik een uurtje pauze om te lunchen en rust te nemen, waarna ik weer met veel energie en motivatie verder kan.',
              },
              {
                time: '13:00 - 17:00',
                desc: 'In de middag ben ik eigenlijk de hele tijd bezig met het uitwerken van mijn features. Tussendoor test ik de builds door de <span class="text-white">Meta Quest 3</span> op te zetten om te controleren of de controllers, haptische feedback en hand-tracking logica goed werken. Als er iets af is, pak ik in ClickUp/Jira meteen een nieuwe taak op. Aan het einde van de middag zorg ik dat mijn code netjes is opgeruimd en voeg ik comments toe waar dat nodig is. Ik maak kleine, logische commits aan met een duidelijke omschrijving en push de boel naar mijn feature-branch op GitLab. Daarna lever ik het op aan <span class="text-white">Bram Scholten</span> voor een code review.',
              },
            ].map((item, i) => (
              <div key={i} className="relative">
                <div className="absolute -left-[21px] top-1 bg-[#0f1724] border-2 border-accent rounded-full w-2 h-2"></div>
                <span className="text-xs font-mono font-bold text-accent bg-accent/10 border border-accent/20 px-2 py-0.5 rounded">
                  {item.time}
                </span>
                <p className="text-sm text-muted mt-2" dangerouslySetInnerHTML={{ __html: item.desc }} />
              </div>
            ))}
          </div>
        </section>

        <section id="leerdoelen" className="space-y-8">
          <h2 className="text-2xl font-bold text-white tracking-tight border-l-4 border-accent pl-4">Leerdoelen</h2>
          <p className="text-sm text-muted">Vier leerdoelen die ik heb opgesteld en uitgevoerd tijdens mijn stageperiode bij het Saxion XR Lab.</p>

          {[
            {
              id: 'ld1',
              title: 'VR Implementatie in Unreal Engine',
              status: 'Afgerond',
              period: 'Week 1–2',
              tech: 'Unreal Engine 5, OpenXR',
              details: [
                { label: 'Doelstelling', content: 'Het opzetten van een technische VR-omgeving in Unreal Engine 5 waarbij de basisfunctionaliteiten (headtracking en controller input) via de OpenXR standaard gewoon goed werken.' },
                { label: 'Technische aanpak', content: 'In plaats van een standaard Character Blueprint heb ik een eigen <code class="text-accent font-mono">VR_Pawn</code> gebouwd met physics zodat de handen niet door muren heen kunnen. De hiërarchie werkt via een Scene Component als nulpunt, een Camera gekoppeld aan de HMD, en twee Skeletal Mesh handen (links en rechts) die elk via een MotionController input binnenkrijgen.' },
                { label: 'Testresultaten', content: '✓ Headtracking reageert direct op fysieke beweging van de headset. ✓ Hand meshes volgen de controllers nauwkeurig. ✓ Speler staat op de correcte hoogte ten opzichte van de virtuele vloer.' },
              ],
            },
            {
              id: 'ld2',
              title: 'VR User Experience (UX) & Feedback',
              status: 'Afgerond',
              period: 'Week 1–12',
              tech: 'UE5 Blueprints, Unity 2D',
              details: [
                { label: 'Doelstelling', content: 'De gebruiksvriendelijkheid van de VR-applicatie optimaliseren door feedbacksystemen te bouwen die de gebruiker sturen, duidelijkheid geven over interacties en motion sickness helpen verminderen.' },
                { label: 'Geïmplementeerde feedbacksystemen', content: 'Haptische feedback (controllers trillen bij oppakken), Visuele feedback (objecten lichten op), Audiofeedback (ademhalingsgeluiden via stethoscoop), UI feedback (Unity 2D geluidsfeedback).' },
                { label: 'Resultaten', content: '✓ Minimaal twee feedbacksystemen geïmplementeerd. ✓ Gebruiker kan interacties uitvoeren zonder uitleg. ✓ Feedback verwerkt na review met Bram.' },
              ],
            },
            {
              id: 'ld3',
              title: 'Interactieve VR systemen bouwen',
              status: 'Afgerond',
              period: 'Project REINTEGRATION',
              tech: 'UE5 Blueprints, Physics',
              details: [
                { label: 'SMART doelstelling', content: 'Ik bouw een sticky notes systeem voor het project REINTEGRATION. De briefjes spawnen op een random positie op het dashboard-scherm zodra er een melding binnenkomt. De gebruiker kan ze oppakken met de VR-controllers, ermee gooien, en als zo\'n briefje een hitbox van een muur raakt plakt ie er direct aan vast via een physics constraint.' },
                { label: 'Technische logica', content: '01 Random Spawning: Zodra er een melding binnenkomt triggert de Blueprint een random X/Y-positie. 02 Grabbing & Throwing: Physics-simulatie blijft actief tijdens het vastgrijpen. 03 Hitbox & Plakken: Box Collision Component triggert Physics Constraint.' },
                { label: 'Testresultaten', content: '✓ Briefjes spawnen vloeiend zonder overlap bugs. ✓ Oppakken, gooien en plakken werkt stabiel. ✓ Geen clipping of rare glitches. ✓ Systeem is flexibel en herbruikbaar.' },
              ],
            },
            {
              id: 'ld4',
              title: 'Teamsamenwerking & Versiebeheer',
              status: 'Afgerond',
              period: 'Week 1–7',
              tech: 'GitFork, GitLab, ClickUp',
              details: [
                { label: 'Git-workflow', content: 'Binnen het project gebruiken we GitFork voor versiebeheer. Mijn vaste routine: git pull elke ochtend, git checkout -b feature/wat-ik-ga-doen, nooit direct in main. Commit voorbeeld: "Added NavMesh bounds in OK_Room_FixedNavmesh".' },
                { label: 'Daily Stand-ups', content: 'Elke ochtend neem ik deel aan de gezamenlijke stand-up. Twee vragen: wat heb ik gisteren gedaan en wat ga ik vandaag doen. Simpel maar echt nuttig om het team op één lijn te houden.' },
                { label: 'Reflectie', content: '"Ik merk dat mijn begrip van Git-conflicten een stuk beter is geworden. Waar ik in week 1 nog moeite had met merges, weet ik nu hoe ik conflicten rustig oplos door zorgvuldig met branches te werken en te overleggen met collega\'s."' },
              ],
            },
          ].map((ld) => (
            <div key={ld.id} className="bg-white/5 border border-white/10 rounded-xl overflow-hidden shadow-xl backdrop-blur-sm">
              <button
                onClick={() => toggleSection(ld.id)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-white/5 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-mono font-bold tracking-wider text-accent bg-accent/10 border border-accent/20 px-2 py-0.5 rounded uppercase">
                    {ld.id}
                  </span>
                  <h3 className="text-sm font-bold text-white">{ld.title}</h3>
                </div>
                <svg
                  className={`w-4 h-4 text-muted transition-transform duration-200 ${openSections[ld.id] ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openSections[ld.id] && (
                <div className="border-t border-white/10 p-5 space-y-4 text-sm text-muted leading-relaxed">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
                    <div className="bg-white/5 rounded-lg px-3 py-2">
                      <span className="text-accent block mb-0.5 uppercase tracking-wider">Periode</span>
                      {ld.period}
                    </div>
                    <div className="bg-white/5 rounded-lg px-3 py-2">
                      <span className="text-accent block mb-0.5 uppercase tracking-wider">Tech</span>
                      {ld.tech}
                    </div>
                    <div className="bg-white/5 rounded-lg px-3 py-2">
                      <span className="text-accent block mb-0.5 uppercase tracking-wider">Status</span>
                      <span className="text-emerald-400">{ld.status}</span>
                    </div>
                  </div>
                  {ld.details.map((detail, i) => (
                    <div key={i}>
                      <strong className="text-accent block font-semibold mb-1">{detail.label}</strong>
                      <p dangerouslySetInnerHTML={{ __html: detail.content }} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </section>

        <section id="conclusie" className="space-y-4">
          <h2 className="text-2xl font-bold text-white tracking-tight border-l-4 border-accent pl-4">Conclusie</h2>
          <div className="text-muted space-y-4 leading-relaxed">
            <p>
              Sinds ik op 2 Februari 2026 begon met mijn stage bij het Saxion XR Lab, Ben heel erg gegroeid als Software Developer. Omdat ik
              direct mocht meebouwen aan echte projecten, ben ik veel handiger geworden met C++/Blueprints en het fixen van lastige technische
              bugs samen met het team.
            </p>
            <p>
              Vooraf wilde ik vooral leren hoe je in je eentje een groot softwareproject een beetje netjes opzet en structureert. Ook wilde ik
              af van het gedoe met Git en gewoon professioneel leren werken met branches, zodat je niet continu problemen hebt met merge
              conflicts. Als ik nu kijk naar hoeveel ik de afgelopen tijd in de praktijk heb gedaan, durf ik wel te zeggen dat dat helemaal is
              gelukt.
            </p>
          </div>
        </section>

        <section id="reflectie" className="space-y-4">
          <h2 className="text-2xl font-bold text-white tracking-tight border-l-4 border-accent pl-4">Reflectie</h2>
          <div className="text-muted space-y-4 leading-relaxed">
            <blockquote className="border-l-4 border-accent pl-4 italic text-text bg-white/5 py-3 pr-3 rounded-r-lg backdrop-blur-sm">
              "Ik werk nu een stuk zelfstandiger, vind sneller de oorzaak van bugs en lever schone code op die voldoet aan professionele
              standaarden."
            </blockquote>
            <p>
              Als ik terugkijk op de afgelopen maanden, merk ik pas hoeveel ik ben gegroeid in mijn manier van werken. In het begin vond ik
              grote codebases soms best wel onoverzichtelijk en lastig te begrijpen. Nu pak ik een feature-verzoek op, breek het op in kleine
              sub-taken en bouw ik het stap voor stap op.
            </p>
            <p>
              Mijn begrip van Git en merge-conflicten is ook flink verbeterd; complexe situaties in de repository los ik nu rustig op door
              nauwkeurig branch-beheer en overleg. Een belangrijk verbeterpunt is wel dat ik soms nog sneller aan de bel moet trekken: in
              plaats van te lang zelf te blijven zoeken naar een vage bug, leer ik nu sneller te sparren met Bram Scholten zodat het proces
              lekker doorloopt.
            </p>
          </div>
        </section>

        <section id="slotwoord" className="space-y-4">
          <h2 className="text-2xl font-bold text-white tracking-tight border-l-4 border-accent pl-4">Slotwoord</h2>
          <div className="text-muted space-y-4 leading-relaxed">
            <p>
              Als laatste wil ik echt iedereen bedanken die me heeft geholpen tijdens deze super leerzame tijd. In het bijzonder wil ik mijn
              praktijkopleider Bram Scholten bedanken voor de fijne begeleiding. Dankzij jouw feedback op mijn code en de ruimte die ik kreeg
              binnen het Saxion XR Lab, ben ik echt gegroeid.
            </p>
            <div className="pt-4 text-xs font-mono uppercase tracking-wider text-accent">Leroy Exel &mdash; Almelo, 2026</div>
          </div>
        </section>

        <section id="media" className="space-y-6 pb-12">
          <h2 className="text-2xl font-bold text-white tracking-tight border-l-4 border-accent pl-4">Videos/Foto's</h2>

          {/* Folders */}
          {[
            { id: 'folder-lumc', label: 'LUMC Anaesthesiology Showcase', count: "12 video's · 2 foto's", icon: '📁' },
            { id: 'folder-reintegration', label: 'REINTEGRATION', count: '1 video · 1 foto', icon: '📁' },
            { id: 'folder-2dgame', label: '2D Quantum Delta', count: '3 video\'s · 2 foto\'s', icon: '📁' },
            { id: 'folder-taken', label: 'BPV-Taken Bewijsmateriaal', count: '4 video\'s · 5 foto\'s', icon: '📁' },
            { id: 'folder-leerdoelen', label: 'Leerdoelen Bewijsmateriaal', count: '4 video\'s · 18 foto\'s', icon: '📁' },
          ].map((folder) => (
            <div key={folder.id} className="rounded-xl border border-white/10 overflow-hidden">
              <button
                onClick={() => toggleFolder(folder.id)}
                className="w-full flex items-center justify-between px-5 py-4 bg-white/5 hover:bg-white/8 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">{folder.icon}</span>
                  <div className="text-left">
                    <p className="text-sm font-bold text-white">{folder.label}</p>
                    <p className="text-[10px] text-muted font-mono mt-0.5">{folder.count}</p>
                  </div>
                </div>
                <svg
                  className={`w-4 h-4 text-muted transition-transform duration-200 ${openFolders[folder.id] ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openFolders[folder.id] && (
                <div className="border-t border-white/10 bg-[#070e20] p-5">
                  <p className="text-xs text-muted font-mono">Media content for {folder.label} would go here.</p>
                  <p className="text-xs text-muted font-mono mt-2">(Video and image galleries)</p>
                </div>
              )}
            </div>
          ))}
        </section>

        <footer className="text-center p-6 mt-10 text-gray-500">
          <p>&copy; 2026 - BPV Verslag - Software Development</p>
        </footer>
      </main>
    </div>
  );
}

export default BPVProject;