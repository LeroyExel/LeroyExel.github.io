// pages/Recoil.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Recoil() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedScript, setSelectedScript] = useState('');
  const [scriptOutput, setScriptOutput] = useState('');

  const toggleMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const closeMenu = () => setMobileMenuOpen(false);

  const scripts = {
    script1: {
      color: '#60a5fa',
      code: `using UnityEngine;\n\npublic class BounceCounter : MonoBehaviour\n{\n    int bounceCounter;\n    [SerializeField] int maxBounces;\n\n    private void OnCollisionEnter2D(Collision2D collision)\n    {\n        bounceCounter++;\n        if (bounceCounter > maxBounces)\n        {\n            Destroy(gameObject);\n        }\n    }\n}`,
    },
    script2: {
      color: '#60a5fa',
      code: `using UnityEngine;\n\npublic class CoinPickup : MonoBehaviour\n{\n    [SerializeField] int amount;\n    private void OnTriggerEnter2D(Collider2D other)\n    {\n        if (other.CompareTag("Player"))\n        {\n            Debug.Log($"Add Coins {amount}");\n            SFXManager.instance.PlaySound("coin");\n            CoinManager.Instance.AddCoins(amount);\n            Destroy(gameObject);\n        }\n    }\n}`,
    },
    script3: {
      color: '#60a5fa',
      code: `using UnityEngine;\n\npublic class Weapon : MonoBehaviour\n{\n    public WeaponObject Config;\n    [SerializeField] GameObject bullet;\n    [SerializeField] Transform shootPoint;\n    [SerializeField] LineRenderer lineRenderer;\n    public bool aiming;\n    Rigidbody2D rb;\n\n    protected virtual void Start()\n    {\n        rb = GetComponentInParent<Rigidbody2D>();\n    }\n\n    public virtual void Shoot(Vector2 dir, float dragDistance)\n    {\n        float t = Mathf.Clamp01(dragDistance / 3);\n        float finalForce = Mathf.Lerp(Config.minForce, Config.maxForce, t);\n        SFXManager.instance.PlaySound("shoot");\n        if (GroundCheck.Instance.Grounded)\n            rb.AddForce(-dir * finalForce, ForceMode2D.Impulse);\n        else\n            rb.AddForce(-dir * Config.minForce, ForceMode2D.Impulse);\n        Instantiate(bullet, shootPoint.position, shootPoint.rotation);\n    }\n}`,
    },
  };

  useEffect(() => {
    // Particles
    if (window.particlesJS) {
      window.particlesJS('particles-js', {
        particles: {
          number: { value: 80, density: { enable: true, value_area: 800 } },
          color: { value: '#60a5fa' },
          shape: { type: 'circle' },
          opacity: { value: 0.5 },
          size: { value: 3, random: true },
          line_linked: { enable: true, distance: 150, color: '#60a5fa', opacity: 0.4, width: 1 },
          move: { enable: true, speed: 2, out_mode: 'out' },
        },
        interactivity: {
          detect_on: 'canvas',
          events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' } },
        },
        retina_detect: true,
      });
    }
  }, []);

  const handleScriptChange = (e) => {
    const val = e.target.value;
    setSelectedScript(val);
    if (val && scripts[val]) {
      setScriptOutput(scripts[val].code);
    } else {
      setScriptOutput('');
    }
  };

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
            <h2 className="text-xs font-bold tracking-widest text-muted uppercase mb-4">Recoil — Project</h2>
            <nav className="flex flex-col space-y-1 text-sm font-medium">
              {[
                { id: 'hero', label: 'Intro' },
                { id: 'game', label: 'Gameplay Trailer' },
                { id: 'info', label: 'Over Recoil' },
                { id: 'bijdrage', label: 'Mijn Bijdrage' },
                { id: 'team', label: 'Teamgenoten' },
                { id: 'scripts', label: 'C# Scripts' },
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
        <header id="hero" className="space-y-6 pt-6">
          <div className="space-y-2">
            <span className="inline-block px-3 py-1 text-xs font-bold tracking-widest text-accent bg-accent/10 border border-accent/20 rounded-lg uppercase">
              School Project
            </span>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold recoil-font bg-gradient-to-r from-blue-400 to-blue-300 text-transparent bg-clip-text drop-shadow-lg mb-2 tracking-widest animate-pulseGlow">
              RECOIL
            </h1>
            <p className="text-lg text-muted">
              Een <span className="text-accent">2D pixel-shooter</span> waarin je beweegt door de terugslag van je eigen wapen.
            </p>
          </div>
          <a
            href="#game"
            className="inline-block px-5 py-2 bg-accent/20 border border-accent text-accent rounded-xl hover:bg-accent/30 transition font-bold"
          >
            Bekijk het spel ↓
          </a>
        </header>

        <hr className="border-white/10" />

        <section id="game" className="space-y-4">
          <h2 className="text-2xl font-bold text-white tracking-tight border-l-4 border-accent pl-4">Gameplay Trailer</h2>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-sm flex flex-col items-center overflow-hidden w-full sm:w-[60%] mx-auto">
            <video autoPlay muted loop playsInline className="w-full h-auto rounded-lg border border-accent/30 shadow-lg">
              <source src="/RecoilAssets/Trailer.mp4" type="video/mp4" />
              Je browser ondersteunt het video-element niet.
            </video>
          </div>
        </section>

        <hr className="border-white/10" />

        <section id="info" className="space-y-4">
          <h2 className="text-2xl font-bold text-white tracking-tight border-l-4 border-accent pl-4">Over Recoil</h2>
          <div className="text-muted space-y-4 leading-relaxed">
            <p>
              <span className="text-accent">Recoil</span> is een 2D actieplatformer met een unieke twist: je beweegt niet door te lopen, maar
              door de terugslag van je wapen te gebruiken. Elk schot telt — zowel om vijanden te verslaan als om jezelf door uitdagende levels
              te verplaatsen.
            </p>
            <p>
              Ontwikkeld als schoolproject, is Recoil het resultaat van een gepassioneerde samenwerking tussen programmeurs en ontwerpers die
              hun vaardigheden wilden testen en verbeteren.
            </p>
          </div>
        </section>

        <hr className="border-white/10" />

        <section id="bijdrage" className="space-y-4">
          <h2 className="text-2xl font-bold text-white tracking-tight border-l-4 border-accent pl-4">Mijn Bijdrage</h2>
          <div className="text-muted space-y-4 leading-relaxed">
            <p>
              <span className="text-accent">Recoil</span> was een geweldige kans om mijn programmeerskills te verbeteren en samen te werken in
              een team. Ik was verantwoordelijk voor het implementeren van de CoreMechanic van het spel, waaronder het schiet- en
              terugslagsysteem. Ook heb ik bijgedragen aan de Art en leveldesign.
            </p>
          </div>
        </section>

        <hr className="border-white/10" />

        <section id="team" className="space-y-6">
          <h2 className="text-2xl font-bold text-white tracking-tight border-l-4 border-accent pl-4">Teamgenoten</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'Leroy Exel', role: 'Programmeur & Realisatie', img: '/Assets/Profile.jpg' },
              { name: 'Markian Tsypuk', role: 'Teamleider & Ontwikkelaar', img: '/RecoilAssets/Markian.jpeg' },
              { name: 'Jeroen Verboom', role: 'Sound Designer & Programmeur', img: '/RecoilAssets/Jeroen.jpeg' },
              { name: 'Jasper Schipper', role: 'Pixel Art Designer', img: '/RecoilAssets/Jasper.jpeg' },
              { name: 'Ricardo Finke', role: 'Programmeur', img: '/RecoilAssets/Ricardo.jpeg' },
            ].map((member, i) => (
              <div
                key={i}
                className="bg-white/5 border border-white/10 rounded-xl p-5 backdrop-blur-sm hover:border-accent/40 hover:bg-white/8 transition-all"
              >
                <img src={member.img} alt={member.name} className="w-20 h-20 mx-auto rounded-full object-cover mb-3 border border-accent/50" />
                <h3 className="text-base font-bold text-accent text-center">{member.name}</h3>
                <p className="text-muted text-sm text-center">{member.role}</p>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/10" />

        <section id="scripts" className="space-y-4 pb-12">
          <h2 className="text-2xl font-bold text-white tracking-tight border-l-4 border-accent pl-4">C# Script Selectie</h2>
          <p className="text-muted">Kies een C# script om de code te bekijken:</p>

          <select
            onChange={handleScriptChange}
            className="bg-[#1a2538] border border-accent/40 text-text rounded-lg px-3 py-2 w-full sm:w-96 focus:outline-none focus:ring-2 focus:ring-accent transition hover:bg-[#22324b] shadow-md"
          >
            <option value="">-- Selecteer een script --</option>
            <option value="script1">BounceCounter.cs</option>
            <option value="script2">CoinPickup.cs</option>
            <option value="script3">Weapon.cs</option>
          </select>

          {selectedScript && scriptOutput && (
            <pre className="p-5 bg-[#0b1220]/80 border border-white/10 rounded-xl text-left text-sm font-mono text-accent overflow-x-auto backdrop-blur-sm">
              <code>{scriptOutput}</code>
            </pre>
          )}
        </section>
      </main>
    </div>
  );
}

export default Recoil;