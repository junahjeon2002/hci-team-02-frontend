import React from "react";
import "./components/Analog.css"; // Corrected import path
import { Link, useNavigate, useParams } from "react-router-dom"; // Link, useNavigate, useParams 모두 필요

const IntensiveReadView = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // 기사 ID를 URL에서 가져옴

  // Original.jsx의 샘플 기사 데이터
  const article = {
    title: "영화 '승부'에서 이병헌은 왜 한겨레 신문을 봤을까요?", // Original.jsx 내용 반영
    author: "김준영 기자", // Original.jsx 내용 반영
    수정시간: "2025-05-16 09:09", // Original.jsx 내용 반영
    등록시간: "2025-05-15 07:35", // Original.jsx 내용 반영
    warning: "주의: 가짜 뉴스의 위험이 있습니다.", // Original.jsx 내용 반영
    content: "최근 개봉해 좋은 성적을 거두고 있는 한국 영화 ‘승부’, ‘야당’, ‘거룩한 밤: 데몬 헌터스’의 공통점은 무엇일까요? 바로 종이신문 한겨레가 등장한다는 점입니다.<br/>\n한겨레는 일간지 가운데 유독 실명으로 스크린에 자주 등장하는 소품입니다. 진실보다 시청률이나 조회수에 집착하는 미디어의 폐해를 그린 '특종: 량첸살인기'(2015), 아이엠에프(IMF) 구제금융 요청 당시의 한국 사회를 복기한 '국가부도의 날'(2018) 등 가볍지 않은 주제 의식을 지닌 영화들에서 한겨레신문은 자주 호출됐습니다. 올해 최고 흥행작 '야당'에서는 부패한 대권 주자의 아들이 부패한 검사에게 심각한 표정으로 건네는 신문이 한겨레였죠.", // Original.jsx 내용 반영
  };

  // "홈" 아이콘 클릭 시 메인 페이지로 이동
  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="analog-card" style={{ width: '300px', margin: 'auto' }}> {/* width를 300px으로 유지 */}
      {/* 홈 화면으로 돌아가는 아이콘 - 좌측 상단에 절대 위치로 다시 배치 */}
      <span onClick={handleGoHome} style={{ cursor: 'pointer', position: 'absolute', top: '10px', left: '10px', zIndex: 10 }}>
        <img src="/home.svg" alt="홈" style={{ width: '24px' }} />
      </span>

      {/* VIEWS 로고 - 홈 화면과 동일하게 중앙 상단에 배치 유지 */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '20px', marginBottom: '15px' }}>
         <img src="/VEWS 로고.png" alt="VIEWS Logo" style={{ width: '50px' }} />
      </div>

      {/* 구분선 - 홈 화면과 동일한 스타일 유지 */}
      <hr style={{ borderColor: '#555', margin: '15px 10px 0 10px' }}/>

      {/* 기사 제목 */}
      <div className="analog-title" style={{ fontSize: '18px' }}>{article.title}</div>
      {/* 가짜 뉴스 경고 */}
      <div className="analog-warning" style={{ fontSize: '12px' }}>{article.warning}</div> {/* Original.jsx 스타일 및 내용 반영 */}
      {/* Info row */}
      <div style={{display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between', fontSize: '12px' }}>
        <span className="analog-reporter">{article.author}</span> {/* Original.jsx 스타일 및 내용 반영 */}
        <img src="/한겨레.png" alt="한겨레" className="analog-logo" /> {/* Original.jsx 이미지 반영 */}
      </div>
      <div className="analog-dates"> {/* Original.jsx 스타일 반영 */}
        <span className="analog-date" style={{ fontSize: '9px' }}>수정 {article.수정시간}</span> {/* Original.jsx 스타일 및 내용 반영 */}
        <span className="analog-date" style={{ fontSize: '9px' }}>등록 {article.등록시간}</span> {/* Original.jsx 스타일 및 내용 반영 */}
       </div>
       <hr className="analog-divider" /> {/* Original.jsx 스타일 반영 */}
      {/* Button row 제거 - 첫 번째 이미지와 동일하게 버튼 없음 */}

      {/* Article */}
      <div className="analog-article" style={{ fontSize: '14px' }}> {/* Original.jsx 스타일 및 내용 반영 */}
      {article.content}
      </div>
    </div>
  );
};

export default IntensiveReadView;