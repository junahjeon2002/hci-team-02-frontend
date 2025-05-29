import React from "react";
import { Link, useParams } from "react-router-dom";
import "./Talk.css";

const avatars = [
  "/훈이.svg",
  "/유리.svg",
  "/맹구.svg",
  "/철수.svg",
  "/짱구.svg"
];

export default function Talk() {
  const { id } = useParams();
  return (
    <div className="talk-card">
      {/* 상단바 */}
      <div className="talk-topbar">
        <Link to="/">
          <img src="/home.svg" alt="홈" className="talk-homeicon" />
        </Link>
        <img src="/VEWSLogo.svg" alt="VEWS" className="talk-vewslogo" />
      </div>
      {/* 기사 제목/경고/기자/로고 */}
      <div className="talk-title">영화 '승부'에서 이병헌은 왜 한겨레 신문을 봤을까요?</div>
      <div className="talk-warning">주의: 가짜 뉴스의 위험이 있습니다.</div>
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
      {/* 비유 보기 버튼 */}
      <Link to={`/article/${id}/analogy`} style={{ textDecoration: 'none' }}>
        <button className="talk-btn">
            비유 보기 <img src="/analog.svg" alt="전구" className="talk-bulb" />
        </button>
      </Link>
      {/* 말풍선 리스트 */}
      <div className="talk-bubbles">
        {avatars.map((src, idx) => (
          <div className="talk-bubble-row" key={idx}>
            <img src={src} alt={`avatar${idx+1}`} className="talk-avatar" />
            <div className="talk-bubble">ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ</div>
          </div>
        ))}
      </div>
    </div>
  );
}
