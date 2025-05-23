import React from 'react';
import './App.css';
import NewsFeed from './NewsFeed';
import ArticleDetail from './ArticleDetail';
import Analog from './components/Analog';
import TalkView from './TalkView';
import OriginalArticleView from './OriginalArticleView';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<NewsFeed />} />
        <Route path="/article/:id" element={<Analog />} />
        <Route path="/article/:id/analogy" element={<Analog />} />
        <Route path="/article/:id/talk" element={<TalkView />} />
        <Route path="/article/:id/original" element={<OriginalArticleView />} />
      </Routes>
    </div>
  );
}

export default App;
