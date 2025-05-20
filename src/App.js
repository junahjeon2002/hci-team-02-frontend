import React from 'react';
import './App.css';
import NewsFeed from './NewsFeed';
import ArticleDetail from './ArticleDetail';
import AnalogyView from './AnalogyView';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<NewsFeed />} />
        <Route path="/article/:id" element={<ArticleDetail />} />
        <Route path="/article/:id/analogy" element={<AnalogyView />} />
      </Routes>
    </div>
  );
}

export default App;
