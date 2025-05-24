import React from 'react';
import './App.css';
import NewsFeed from './NewsFeed';
import ArticleDetail from './ArticleDetail';
import Analog from './components/Analog';
import Original from './components/Original';
import TalkView from './TalkView';
import Talk from './components/Talk';
import OriginalArticleView from './OriginalArticleView';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<NewsFeed />} />
        {<Route path="/article/:id" element={<Analog />} />}
        <Route path="/article/:id/analogy" element={<Analog />} />
        <Route path="/article/:id/talk" element={<Talk />} />
        <Route path="/article/:id/original" element={<Original />} />
      </Routes>
    </div>
  );
}

export default App;
