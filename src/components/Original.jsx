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
      <Link to="/article/:id/analogy" style={{ textDecoration: 'none' }}>
        <div className="analog-btnrow">
          <button className="analog-btn">
            <img src="/analog.svg" alt="비유" className="analog-btnicon" />
            비유 보기
          </button>
        </div>
      </Link>
      {/* Article */}
      <div className="analog-article">
      최근 개봉해 좋은 성적을 거두고 있는 한국 영화 ‘승부’, ‘야당’, ‘거룩한 밤: 데몬 헌터스’의 공통점은 무엇일까요? 바로 종이신문 한겨레가 등장한다는 점입니다.<br/>
      한겨레는 일간지 가운데 유독 실명으로 스크린에 자주 등장하는 소품입니다. 진실보다 시청률이나 조회수에 집착하는 미디어의 폐해를 그린 ‘특종: 량첸살인기’(2015), 아이엠에프(IMF) 구제금융 요청 당시의 한국 사회를 복기한 ‘국가부도의 날’(2018) 등 가볍지 않은 주제 의식을 지닌 영화들에서 한겨레신문은 자주 호출됐습니다. 올해 최고 흥행작 ‘야당’에서는 부패한 대권 주자의 아들이 부패한 검사에게 심각한 표정으로 건네는 신문이 한겨레였죠.
      </div>
    </div>
  );
}
