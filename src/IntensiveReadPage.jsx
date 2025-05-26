import React from "react";
import "./components/Analog.css"; // Corrected import path
import { Link, useNavigate, useParams } from "react-router-dom"; // Link, useNavigate, useParams 모두 필요

const IntensiveReadPage = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // 기사 ID를 URL에서 가져옴

  // 이미지 내용을 기반으로 한 샘플 데이터 (텍스트 색상 반영)
  const articleData = {
    title: "영화 '승부'에서 이병헌은 왜 한겨레 신문을 봤을까요?",
    author: "김준영 기자",
    수정시간: "2025-05-16 09:09",
    등록시간: "2025-05-15 07:35",
    warning: "주의: 가짜 뉴스의 위험이 있습니다.",
    content: [
      `최근 개봉해 좋은 성적을 거두고 있는 한국 영화 ‘승부’, ‘야당’, ‘거룩한 밤: 데몬 헌터스의 공통점은 무엇일까요? <span style="color: #fff; font-weight: bold;">바로 종이신문 한겨레가 등장한다는 점입니다.</span>`,
      `한겨레는 일간지 가운데 유독 실명으로 스크린에 자주 등장하는 소품입니다. 진실보다 시청률이나 조회수에 집착하는 미디어의 폐해를 그린 '특종: 량첸살인기'(2015), 아이엠에프(IMF) 구제금융 요청 당시의 한국 사회를 복기한 '국가부도의 날'(2018) 등 <span style="color: #fff; font-weight: bold;">가볍지 않은 주제 의식을 지닌 영화들에서 한겨레신문은 자주 호출됐습니다.</span>`,
      `<span style="color: #aaa;">올해 최고 흥행작 '야당'에서는 부패한 대권 주자의 아들이 부패한 검사에게 심각한 표정으로 건네는 신문이 한겨레였죠.</span>`,
    ]
  };

  // "홈" 아이콘 클릭 시 메인 페이지로 이동
  const handleGoHome = () => {
    navigate('/'); // 메인 페이지 경로로 이동
  };

  return (
    <div style={{ padding: '10px', paddingTop: '5vh', border: '1px solid #ccc', width: '300px', margin: 'auto', backgroundColor: '#333', color: '#fff' }}> {/* 배경색을 어둡게, 기본 글씨색을 밝게 조정 */}
      {/* 상단 네비게이션 - 홈 아이콘, VIEWS 로고, 빈 공간 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', padding: '0 10px' }}>
        {/* 홈 아이콘 */}
        <span onClick={handleGoHome} style={{ cursor: 'pointer' }}>
          <img src="/home.svg" alt="홈" style={{ width: '24px' }} />
        </span>
        {/* VIEWS 로고 - 중앙에 배치 */}
        <div style={{ flexGrow: 1, textAlign: 'center' }}>
           <img src="/VEWS 로고.png" alt="VIEWS Logo" style={{ width: '50px' }} />
        </div>
        {/* 오른쪽 빈 공간 (홈 아이콘과 동일한 너비) */}
        <div style={{ width: '24px' }}></div>
      </div>

      {/* 구분선 */}
      <hr style={{ borderColor: '#555', margin: '0 10px' }}/>

      {/* 기사 제목 */}
      <h2 style={{ marginBottom: '5px', color: '#fff' }}>{articleData.title}</h2>

      {/* 가짜 뉴스 경고 */}
      <div style={{ color: 'red', fontSize: '12px', marginBottom: '10px', textAlign: 'right' }}>{articleData.warning}</div>

      {/* 기자 정보 및 시간 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '5px', color: '#ccc' }}>
         <span>{articleData.author}</span>
         <div style={{ fontSize: '12px', color: '#aaa' }}>
           수정 {articleData.수정시간} 등록 {articleData.등록시간}
         </div>
      </div>
      <hr style={{ borderColor: '#555' }}/>

      {/* 기사 내용 - 텍스트 색상 반영 */}
      <div className="analog-article"> {/* Original.jsx 스타일 및 내용 반영 */}
        {articleData.content.map((paragraph, index) => (
          <p key={index} style={{ marginBottom: '10px', lineHeight: '1.6', fontSize: '0.9em', color: '#aaa' }} dangerouslySetInnerHTML={{ __html: paragraph }}></p>
        ))}
      </div>

    </div>
  );
};

export default IntensiveReadPage; 