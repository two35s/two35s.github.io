import { useState, useEffect, lazy, Suspense } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CursorifyProvider } from '@cursorify/react';
import { PhingerCursor } from '@cursorify/cursors';
import Header from './components/Header';
import ClickSpark from './components/ClickSpark';
import './App.css';

const Home = lazy(() => import('./pages/Home'));
const Projects = lazy(() => import('./pages/Projects'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const About = lazy(() => import('./pages/About'));
const AboutContact = lazy(() => import('./components/AboutContact'));
const Admin = lazy(() => import('./pages/Admin'));

function AppContent({ theme, toggleTheme }) {
  const location = useLocation();
  const isAdmin = location.pathname === '/admin';
  const sparkColor = theme === 'dark' ? '#d4ff36' : '#9bbf00';

  return (
    <ClickSpark sparkColor={sparkColor} sparkSize={10} sparkRadius={15} sparkCount={8} duration={400}>
      <div className="app">
        {!isAdmin && <Header theme={theme} toggleTheme={toggleTheme} />}
        <Suspense fallback={<main className="route-loading container">Loading...</main>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </Suspense>
        {!isAdmin && (
          <Suspense fallback={null}>
            <AboutContact />
          </Suspense>
        )}
      </div>
    </ClickSpark>
  );
}

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <CursorifyProvider cursor={<PhingerCursor />}>
      <Router>
        <AppContent theme={theme} toggleTheme={toggleTheme} />
      </Router>
    </CursorifyProvider>
  );
}

export default App;
