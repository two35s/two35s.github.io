import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CursorifyProvider } from '@cursorify/react';
import { PhingerCursor } from '@cursorify/cursors';
import Header from './components/Header';
import Home from './pages/Home';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import AboutContact from './components/AboutContact';
import ClickSpark from './components/ClickSpark';
import './App.css';

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

  const sparkColor = theme === 'dark' ? '#d4ff36' : '#9bbf00';

  return (
    <CursorifyProvider cursor={<PhingerCursor />}>
      <ClickSpark sparkColor={sparkColor} sparkSize={10} sparkRadius={15} sparkCount={8} duration={400}>
        <Router>
          <div className="app">
            <Header theme={theme} toggleTheme={toggleTheme} />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/:id" element={<ProjectDetail />} />
            </Routes>
            <AboutContact />
          </div>
        </Router>
      </ClickSpark>
    </CursorifyProvider>
  );
}

export default App;
