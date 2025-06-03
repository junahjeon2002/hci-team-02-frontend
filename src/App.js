import React from 'react';
import './App.css';
import NewsFeed from './NewsFeed';
import Analog from './components/Analog';
import Original from './components/Original';
import Talk from './components/Talk';
import OriginalArticleView from './OriginalArticleView';
import IntensiveReadPage from './components/IntensiveReadPage';
import { Routes, Route } from 'react-router-dom';
import { KeywordProvider } from './contexts/KeywordContext';

function App() {
  return (
    <KeywordProvider>
      <div className="App">
        <Routes>
          <Route path="/" element={<NewsFeed />} />
          <Route path="/article/:id/intensive" element={<IntensiveReadPage />} />
          <Route path="/article/:id" element={<Analog />} />
          <Route path="/article/:id/analogy" element={<Analog />} />
          <Route path="/article/:id/talk" element={<Talk />} />
          <Route path="/article/:id/original" element={<Original />} />
        </Routes>
      </div>
    </KeywordProvider>
  );
}

export default App;
