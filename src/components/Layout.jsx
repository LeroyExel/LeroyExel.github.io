// components/Layout.jsx
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ParticlesBackground from './ParticlesBackground';
import ProjectModal from './ProjectModal';
import Lightbox from './Lightbox';

function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const closeMenu = () => setMobileMenuOpen(false);

  useEffect(() => {
    closeMenu();
  }, [location]);

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-b from-[#0f2b72] to-[#071025] text-text font-sans relative">
      <ParticlesBackground />

      {/* Mobile Menu Button */}
      <button
        onClick={toggleMenu}
        className="fixed top-4 left-4 z-50 md:hidden bg-white/10 border border-white/10 rounded-xl p-2 backdrop-blur-md text-accent"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Mobile Overlay */}
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
        <button
          onClick={toggleMenu}
          className="absolute top-4 right-4 md:hidden text-muted hover:text-white transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="space-y-8">
          <div>
            <h2 className="text-[11px] font-bold uppercase tracking-widest text-muted mb-4">Menu</h2>
            <nav className="flex flex-col space-y-1 text-sm">
              <Link
                to="/about"
                className={`nav-link px-3 py-2.5 rounded-lg hover:bg-white/5 hover:text-accent transition-colors ${
                  isActive('/about') ? 'text-accent bg-white/5' : 'text-text'
                }`}
              >
                About
              </Link>
              <Link
                to="/projects"
                className={`nav-link px-3 py-2.5 rounded-lg hover:bg-white/5 hover:text-accent transition-colors ${
                  isActive('/projects') ? 'text-accent bg-white/5' : 'text-text'
                }`}
              >
                Projects
              </Link>
              <Link
                to="/contact"
                className={`nav-link px-3 py-2.5 rounded-lg hover:bg-white/5 hover:text-accent transition-colors ${
                  isActive('/contact') ? 'text-accent bg-white/5' : 'text-text'
                }`}
              >
                Contact
              </Link>
            </nav>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="border-t border-white/10 pt-4">
            <p className="text-[11px] font-bold uppercase tracking-widest text-muted mb-3">Projects</p>
            <div className="flex flex-col gap-2.5">
              <Link
                to="/Projects/recoil.html"
                className="project-link block text-center text-sm font-extrabold px-3 py-2.5 rounded-xl border border-accent/30 bg-accent/12 text-accent hover:bg-accent/25 hover:border-accent hover:-translate-x-1 transition-all duration-200"
              >
                Recoil
              </Link>
              <Link
                to="/Projects/BPV_Project.html"
                className="project-link block text-center text-sm font-extrabold px-3 py-2.5 rounded-xl border border-accent/30 bg-accent/12 text-accent hover:bg-accent/25 hover:border-accent hover:-translate-x-1 transition-all duration-200"
              >
                BPV Report
              </Link>
            </div>
          </div>
          <div className="text-[11px] text-muted font-bold uppercase tracking-widest mt-1">
            Leroy Exel &copy; 2026
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-6 md:p-12 relative z-20">
        <div className="w-full max-w-3xl">
          <Outlet />
        </div>
      </main>

      {/* Global Modals */}
      <ProjectModal />
      <Lightbox />
    </div>
  );
}

export default Layout;