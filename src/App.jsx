// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import About from './pages/About';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import BPVProject from './pages/BPV_Project';
import Recoil from './pages/Recoil';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<About />} />
          <Route path="about" element={<About />} />
          <Route path="projects" element={<Projects />} />
          <Route path="contact" element={<Contact />} />
        </Route>
        <Route path="/Projects/BPV_Project.html" element={<BPVProject />} />
        <Route path="/Projects/recoil.html" element={<Recoil />} />
      </Routes>
    </Router>
  );
}

export default App;