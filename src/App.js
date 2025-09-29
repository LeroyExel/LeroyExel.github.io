import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import logo from "./assets/profile.jpg";
import "./App.css";

function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const response = await fetch("projects.json");
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error("Error loading projects:", error);
      }
    };

    loadProjects();
  }, []);

  return (
    <div className="App">
      {/* Navigation */}
      <motion.nav
        className="TopBar"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        <div className="TopBar-content">
          <span className="Brand">Leroy Exel</span>
          <ul className="Nav-links">
            {["Home", "Projects", "Contact"].map((link) => (
              <li key={link}>
                <motion.a
                  href={`#${link.toLowerCase()}`}
                  whileHover={{ scale: 1.1, rotate: -2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {link}
                </motion.a>
              </li>
            ))}
          </ul>
        </div>
      </motion.nav>

      {/* Header */}
      <header className="App-header">
        <motion.section
          className="Text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          {/* Profile Image */}
          <motion.img
            src={logo}
            alt="Profile"
            className="App-logo"
            whileHover={{
              scale: 1.1,
              rotate: 5,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
          />
          <motion.section
            className="Text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 10,
            }}
          >
            <h1>Portfolio</h1>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 1 }}
            >
              Hi, I’m <strong>Leroy Exel</strong>, a 17-year-old developer from
              the Netherlands.
            </motion.p>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 1 }}
            >
              I started coding when I was just 11 years old and quickly found my
              passion for creating interactive experiences.
            </motion.p>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9, duration: 1 }}
            >
              My main focus is <strong>game development</strong> with Unity
              (C#), but I also enjoy working with{" "}
              <strong>HTML, CSS, and Python</strong>.
            </motion.p>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.2, duration: 1 }}
            >
              Building games and engaging digital worlds is what drives me every
              day.
            </motion.p>
          </motion.section>
        </motion.section>

        {/* Projects Section */}
        <motion.h1
          className="Text"
          style={{ fontSize: "2rem", marginBottom: "20px" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          Projects
        </motion.h1>

        <div id="project-list" className="">
          {projects.map((project) => (
            <div
              key={project.title}
              className=""
            >
              <h3 className="">
                {project.title}
              </h3>
              <p className="">{project.description}</p>
              <img
                src={project.Image}
                alt={project.title}
                className=""
              />
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className=""
              >
                View Project
              </a>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <motion.h1
          className="Text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          Contact Me
          
        </motion.h1>
        <motion.p
          className="Text"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
        >
          Feel free to reach out via email at:{" "}
          <a
            href="mailto:Leroyexell@gmail.com"
            className="linker"
          >
            Leroyexell@gmail.com
          </a>
        </motion.p>
      </header>
    </div>
  );
}

export default App;
