// pages/About.jsx
function About() {
  return (
    <>
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
        <img
          src="/Assets/Profile.jpg"
          alt="Leroy Exel"
          className="w-32 h-32 rounded-full border-2 border-accent object-cover shrink-0"
        />
        <div className="text-center md:text-left">
          <h1 className="text-3xl font-bold text-white">Leroy Exel</h1>
          <p className="text-accent font-medium">Software Developer</p>
          <p className="text-muted text-sm mt-1">17 years old · Almelo</p>
          <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-2">
            <span className="text-xs px-2 py-1 bg-accent/20 rounded-full text-accent">MBO Level 4</span>
            <span className="text-xs px-2 py-1 bg-accent/20 rounded-full text-accent">ROC van Twente</span>
            <span className="text-xs px-2 py-1 bg-accent/20 rounded-full text-accent">Saxion XR Lab</span>
            <span className="text-xs px-2 py-1 bg-green-500/20 rounded-full text-green-400 border border-green-500/30">
              Fiverr Freelancer
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-6">
        <h2 className="text-sm font-bold text-accent uppercase tracking-wider mb-3">About Me</h2>
        <p className="text-muted text-sm leading-relaxed">
          I'm a motivated software developer with a strong interest in game development and interactive technologies.
          I'm currently studying Software Development (MBO Level 4) at ROC van Twente and doing an internship
          at <span className="text-white">Saxion XR Lab</span> in Enschede.
        </p>
        <p className="text-muted text-sm leading-relaxed mt-2">
          Besides my studies and internship, I work as a freelancer on <span className="text-green-400">Fiverr</span> under the name
          <span className="text-white font-semibold"> Gorvert S</span>. Since 2018 I've been building mods and games in
          <span className="text-accent"> Unreal Engine</span> and <span className="text-accent">Unity</span>. With over
          35 reviews and a strong reputation, I help clients worldwide with a variety of projects.
        </p>
        <p className="text-muted text-sm leading-relaxed mt-2">
          My passion is building physics-driven systems, developing VR interactions, and finding creative solutions
          to complex technical challenges. I enjoy working with
          <span className="text-accent"> Unreal Engine</span> and <span className="text-accent">Unity</span>, but I'm also
          open to other technologies and frameworks.
        </p>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-6">
        <h2 className="text-sm font-bold text-accent uppercase tracking-wider mb-3">Technical Skills</h2>
        <div className="flex flex-wrap gap-2">
          {['C#', 'C++', 'Python', 'HTML / CSS', 'Unreal Engine 5', 'Unity 2D', 'Blueprints', 'Git / GitLab', 'Visual Studio', 'Jira', 'ClickUp'].map(
            (skill) => (
              <span
                key={skill}
                className="skill-tag text-xs px-3 py-1.5 bg-white/10 rounded-lg border border-white/10 text-white hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(96,165,250,0.25)] transition-all"
              >
                {skill}
              </span>
            )
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <h2 className="text-sm font-bold text-accent uppercase tracking-wider mb-3">Internship Experience</h2>
          <div className="space-y-4">
            <div>
              <div className="flex items-start justify-between flex-wrap">
                <div>
                  <p className="text-white text-sm font-semibold">Saxion XR Lab</p>
                  <p className="text-muted text-xs">Software Developer Intern</p>
                </div>
                <span className="text-muted text-xs">Feb 2026 - present</span>
              </div>
              <ul className="text-muted text-sm list-disc list-inside mt-2 space-y-1">
                <li>VR development in Unreal Engine 5 using Blueprints and C++</li>
              </ul>
            </div>
            <div className="border-t border-white/5 pt-4">
              <p className="text-white text-sm font-semibold">Projects</p>
              <ul className="text-muted text-sm list-disc list-inside mt-2 space-y-1">
                <li>
                  <span className="text-accent">LUMC Anaesthesiology VR Showcase</span> — Medical VR simulation for doctors
                </li>
                <li>
                  <span className="text-accent">REINTEGRATION</span> — Interactive Sticky Notes notification system in VR
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white/5 border border-green-500/30 rounded-xl p-6 hover:border-green-400 transition-colors">
          <h2 className="text-sm font-bold text-green-400 uppercase tracking-wider mb-3">Freelance (Fiverr)</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-white font-semibold text-sm">Gorvert S</span>
              <span className="text-xs text-muted">— Modding Specialist</span>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="text-yellow-400">★★★★★</span>
              <span className="text-muted">(35+ reviews)</span>
            </div>
            <p className="text-muted text-sm leading-relaxed">
              As an experienced freelancer on Fiverr, I specialize in developing mods and games in
              <span className="text-accent"> Unreal Engine</span> and <span className="text-accent">Unity</span>.
              With a strong reputation, I help clients worldwide.
            </p>
            <div>
              <p className="text-white text-xs font-semibold uppercase tracking-wider mb-1.5">Services offered</p>
              <ul className="text-muted text-sm list-disc list-inside space-y-0.5">
                <li>
                  <span className="text-accent">Unreal Engine mods</span> — From simple tweaks to complex mechanics
                </li>
                <li>
                  <span className="text-accent">Unity mods</span> — Custom mods for various games
                </li>
                <li>
                  <span className="text-accent">Bonelab mods</span> — Avatars, items, and full levels
                </li>
              </ul>
            </div>
            <div className="border-t border-white/5 pt-3 mt-2">
              <a
                href="https://www.fiverr.com/gorvert"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 text-sm transition-colors"
              >
                <span>View my Fiverr profile</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;