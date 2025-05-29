import React, { useState, useEffect } from "react";
import "./Analog.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

export default function Original() {
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState('');
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  const [article, setArticle] = useState(null);  // API 응답 저장
  const { id } = useParams();

  const handleWordClick = (e, content) => {
    setShowPopup(true);
    setPopupContent(content);
    
    const rect = e.target.getBoundingClientRect();
    // Adjusted calculation to position next to the word
    // Get the scroll position of the window
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    
    // Calculate the position relative to the viewport, then adjust for scroll
    setPopupPosition({
      top: rect.top + scrollTop, // Position below the word initially
      left: rect.right + scrollLeft + 5, // Position to the right of the word + small margin
    });
  };

  useEffect(() => {
    axios.get(`http://3.36.74.61:8080/article/${id}`)
      .then(res => {
        setArticle(res.data);
      })
      .catch(err => {
        console.error("failed to fetch article", err);
      })
  }, [ ])

  const handleClosePopup = () => {
    setShowPopup(false);
    setPopupContent('');
  };
  if (!article) {
    return <div>loading</div>
  }

  return (
    <div className="analog-card">
      {/* Top bar */}
      <div className="analog-topbar">
        <Link to="/">
          <img src="/home.svg" alt="홈" className="analog-homeicon" />
        </Link>
        <img src="/VEWS%20로고.png" alt="VEWS" className="analog-vewslogo" />
      </div>
      {/* Title */}
      <div className="analog-title">{article.title}</div>
      <div className="analog-warning">주의: 가짜 뉴스의 위험이 있습니다.</div>
      {/* Info row */}
      <div style={{display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between'}}>
        <span className="analog-reporter">{article["author"]["name"]} 기자</span>
        <img src="/한겨레.png" alt="한겨레" className="analog-logo" />
      </div>
      <div className="analog-dates">
        <span className="analog-date">수정 {article.edited_at}</span>
        <span className="analog-date">등록 {article.published_at}</span>
       </div>
       <hr className="analog-divider" />
      {/* Button row */}
      <div className="analog-btnrow">
        <Link to={`/article/${id}/analogy`} style={{ textDecoration: 'none' }}>
          <button className="analog-btn">
            <img src="/analog.svg" alt="비유" className="analog-btnicon" />
            비유 보기
          </button>
        </Link>
      </div>
      {/* Article Container for relative positioning */}
      <div style={{ position: 'relative' }}>
        {/* Article */}
        <div className="analog-article-origin">
          {article.content}
        </div>
        {/* Dictionary Popup */}
        {showPopup && (
          <div
            style={{
              position: 'absolute',
              top: popupPosition.top,
              left: popupPosition.left,
              backgroundColor: '#fff',
              border: '1px solid #ccc',
              borderRadius: '80px',
              padding: '10px',
              boxShadow: '2px 2px 8px rgba(0, 0, 0, 0.2)',
              zIndex: 100,
              width: '150px',
              maxWidth: 'unset',
              transform: 'translate(-100%, -550%)' // Adjust to position above
            }}
          >
            <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>사전</div>
            <div>{popupContent}</div>
            <button
              onClick={handleClosePopup}
              style={{
                position: 'absolute',
                top: '5px',
                right: '5px',
                border: 'none',
                background: 'none',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 'bold',
              }}
            >
              X
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
