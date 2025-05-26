import React, { useState } from "react";
import "./Analog.css";
import { Link } from "react-router-dom";

export default function Analog() {
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState('');
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });

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

  const handleClosePopup = () => {
    setShowPopup(false);
    setPopupContent('');
  };

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
      <div className="analog-title">영화 '승부'에서 이병헌은 왜 한겨레 신문을 봤을까요?</div>
      <div className="analog-warning">주의: 가짜 뉴스의 위험이 있습니다.</div>
      {/* Info row */}
      <div style={{display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between'}}>
        <span className="analog-reporter">김준영 기자</span>
        <img src="/한겨레.png" alt="한겨레" className="analog-logo" />
      </div>
      <div className="analog-dates">
        <span className="analog-date">수정 2025-05-16 09:09</span>
        <span className="analog-date">등록 2025-05-15 07:35</span>
       </div>
       <hr className="analog-divider" />
      {/* Button row */}
      <Link to="/article/:id/analogy" style={{ textDecoration: 'none' }}>
        <div className="analog-btnrow">
          <button className="analog-btn">
            <img src="/analog.svg" alt="비유" className="analog-btnicon" />
            비유 보기
          </button>
        </div>
      </Link>
      {/* Article Container for relative positioning */}
      <div style={{ position: 'relative' }}>
        {/* Article */}
        <div className="analog-article">
        최근 개봉해 좋은 성적을 거두고 있는 한국 영화 '승부', '야당', '거룩한 밤: 데몬 헌터스'의 공통점은 무엇일까요? 바로 종이신문 한겨레가 등장한다는 점입니다.<br/>
        한겨레는 일간지 가운데 유독 <span style={{ textDecoration: 'underline', cursor: 'pointer' }} onClick={(e) => handleWordClick(e, '명사) 진짜 이름')}>실명</span>으로 스크린에 자주 등장하는 소품입니다. 진실보다 시청률이나 조회수에 집착하는 미디어의 폐해를 그린 '특종: 량첸살인기'(2015), IMF(IMF) 구제금융 요청 당시의 한국 사회를 복기한 '국가부도의 날'(2018) 등 가볍지 않은 주제 의식을 지닌 영화들에서 한겨레신문은 자주 호출됐습니다. 올해 최고 흥행작 '야당'에서는 부패한 대권 주자의 아들이 부패한 검사에게 심각한 표정으로 건네는 신문이 한겨레였죠.
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
