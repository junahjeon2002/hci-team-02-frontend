import React from "react";
import "./Analog.css";
import { Link } from "react-router-dom";

export default function Analog() {
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
      <div className="analog-btnrow">
        <button className="analog-btn">
          <img src="/talkbox.svg" alt="톡" className="analog-btnicon" />
          톡 보기
        </button>
        <Link to="/article/:id/original" style={{ textDecoration: 'none' }}>
          <button className="analog-btn">
            원문보기
            <img src="/script.svg" alt="원문보기" className="analog-btnicon" />
          </button>
        </Link>
      </div>
      {/* Article */}
      <div className="analog-article">
        옛날 어느 마을에 진실을 전하는 <span className="analog-highlight-blue">'푸른 나팔'</span>이 있었어요.<br/>
        이 나팔은 조용하지만 언제나 바른 소리를 냈고, 마을 사람들은 중요한 소식이 궁금할 땐 이 나팔을 찾았죠.<br/>
        시간이 흐르며 사람들은 <span className="analog-highlight-blue">화려한 복식</span>과 <span className="analog-highlight-blue">시끄러운 꽹과리</span>에 더 끌리게 되었지만, 중요한 순간마다 <span className="analog-highlight-blue">이야기꾼</span>들은 여전히 '푸른 나팔'을 꺼내들었어요.<br/>
        오래된 이야기는 새로운 이야기기도, 진짜 많이 필요할 때는 꼭 그 나팔이 등장했거든요.<br/>
        요즘 <span className="analog-highlight-blue">마을 연극</span>에서도 이 나팔은 조연처럼 자주 모습을 드러내며, 과거를 기억하게 하고 진실을 느끼게 해요.<br/>
        이제는 나팔을 드는 이들이 적어졌지만, 무대 위에서 울...
      </div>
    </div>
  );
}
