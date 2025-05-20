import React from 'react';
import './App.css';
import NewsFeed from './NewsFeed';
import ArticleDetail from './ArticleDetail';
import AnalogyView from './AnalogyView';
import TalkView from './TalkView';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<NewsFeed />} />
        <Route path="/article/:id" element={<ArticleDetail />} />
        <Route path="/article/:id/analogy" element={<AnalogyView />} />
        <Route path="/article/:id/talk" element={<TalkView />} />
      </Routes>
    </div>
  );
}

export default App;
