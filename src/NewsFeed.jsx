import React, { useState } from 'react';
// import viewsLogo from '../VEWS 로고.png'; // public 폴더에 있으므로 제거
// import fakeNewsWarningImage from '../가짜뉴스경고.png'; // public 폴더에 있으므로 제거
import { Link } from 'react-router-dom'; // Link import

const NewsFeed = () => {
  const [isKeywordsBoxOpen, setIsKeywordsBoxOpen] = useState(true); // 키워드 상자 상태 관리
  const [selectedCategory, setSelectedCategory] = useState('정치'); // 선택된 카테고리 상태 추가

  const toggleKeywordsBox = () => {
    setIsKeywordsBoxOpen(!isKeywordsBoxOpen);
  };

  // 샘플 데이터
  const categories = ["정치", "경제", "사회", "연예", "스포츠", "기타"];
  const keywords = ["트럼프", "대선", "화재", "전쟁", "커피"]; // "커피" 키워드 추가
  const articles = [
    {
      media: "한겨레",
      indicator: "normal",
      title: "영화 '승부'에서 이병헌은 왜 한겨레신문을 봤을까요?",
      preview: "",
      date: "2025.05.15",
      reporter: "김은형기자"
    },
    {
      media: "한겨레",
      indicator: "normal",
      title: "영화 '승부'에서 이병헌은 왜 한겨레신문을 봤을까요?",
      preview: "",
      date: "2025.05.15",
      reporter: "김은형기자"
    },
    {
      media: "한겨레",
      indicator: "bias",
      title: "영화 '승부'에서 이병헌은 왜 한겨레신문을 봤을까요?",
      preview: "",
      date: "2025.05.15",
      reporter: "김은형기자"
    },
    {
      media: "한겨레",
      indicator: "warning",
      title: "영화 '승부'에서 이병헌은 왜 한겨레신문을 봤을까요?",
      preview: "",
      date: "2025.05.15",
      reporter: "김은형기자"
    },
    {
      media: "한겨레",
      indicator: "bias",
      title: "기사 제목 5",
      preview: "기사 내용 프리뷰 5",
      date: "2025.05.15",
      reporter: "김은형기자"
    },
    {
      media: "한겨레",
      indicator: "normal",
      title: "기사 제목 6",
      preview: "기사 내용 프리뷰 6",
      date: "2025.05.15",
      reporter: "김은형기자"
    },
    {
      media: "한겨레",
      indicator: "warning",
      title: "기사 제목 7",
      preview: "기사 내용 프리뷰 7",
      date: "2025.05.15",
      reporter: "김은형기자"
    },
    {
      media: "한겨레",
      indicator: "normal",
      title: "기사 제목 8",
      preview: "기사 내용 프리뷰 8",
      date: "2025.05.15",
      reporter: "김은형기자"
    },
  ];

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div style={{ padding: '10px', paddingTop: '5vh', border: '1px solid #ccc', width: '300px', margin: 'auto' }}>
      <img src="/VEWS 로고.png" alt="VIEWS Logo" style={{ maxWidth: '100px' }} /> {/* public 폴더 경로 사용 */}
      <hr />
      {/* 이미지와 같은 스타일로 키워드 섹션 배치 및 디자인 수정 */}
      <div style={{ padding: '10px', marginBottom: '8px', borderRadius: '8px', backgroundColor: '#f0eaff', position: 'relative', height: isKeywordsBoxOpen ? '80px' : '30px', overflow: 'hidden' }}> {/* 전체적인 크기 축소 및 스타일 조정 */}
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <span onClick={toggleKeywordsBox} style={{ cursor: 'pointer', fontWeight: 'bold' }}>
            <span style={{ fontSize: '0.9em' }}>{isKeywordsBoxOpen ? '∧' : '∨'}</span> {/* 화살표 크기 축소 */}
          </span>
        </div>
        {/* 접혀 있는 상태일 때 "오늘의 키워드" 텍스트 표시 */}
        {!isKeywordsBoxOpen && (
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontWeight: 'bold' }}>오늘의 키워드</div>
        )}
        {isKeywordsBoxOpen && (
           <div style={{ width: '100%', height: '100%', position: 'relative' }}> {/* position: relative 설정 */}
             {keywords.map((kw, index) => (
               <span
                 key={index}
                 style={{
                   position: 'absolute', // 절대 위치 적용
                   color: '#000',
                   cursor: 'pointer',
                   textDecoration: 'none',
                   fontSize: '0.8em', // 키워드 글씨 크기 추가 축소
                   border: '1px solid #000', // 얇은 검은색 테두리 추가
                   padding: '3px 6px', // 테두리와 글씨 사이 간격 추가
                   borderRadius: '15px', // 동그라미 모양을 만들기 위해 충분히 큰 값 설정
                   // 인덱스에 따라 임의의 위치 지정 (사진 및 5개 키워드 고려)
                   top: index === 0 ? '10px' : index === 1 ? '1px' : index === 2 ? '40px' : index === 3 ? '30px' : '10px', // 트럼프, 대선, 화재, 전쟁, 커피 순서대로 1, 2번째 줄 배치
                   left: index === 0 ? '1px' : index === 1 ? '80px' : index === 2 ? '50px' : index === 3 ? '150px' : '200px', // 위치 간격 조정
                 }}
               >
                 {/* "트럼프" 키워드 클릭 시 집중 읽기 페이지로 이동, 다른 키워드는 현재 기능 없음 */}
                 {kw === '트럼프' ? (
                   <Link to={`/article/${kw}`} style={{ color: '#000', textDecoration: 'none' }}>{kw}</Link>
                 ) : (
                   kw
                 )}
               </span>
             ))}
           </div>
         )}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '10px' }}>
        {categories.map((cat, index) => (
          <button
            key={index}
            style={{
              flexGrow: 1,
              padding: '5px',
              margin: '0 2px',
              border: `1px solid #5e3bed`, // 보라색 테두리
              background: cat === selectedCategory ? '#5e3bed' : '#fff', // 선택 시 보라색 배경
              color: cat === selectedCategory ? '#fff' : '#5e3bed', // 선택 시 흰색 글자, 미선택 시 보라색 글자
              cursor: 'pointer', // 클릭 가능한 커서 모양
              borderRadius: '5px' // 약간의 둥근 모서리 추가 (선택 사항)
            }}
            onClick={() => handleCategoryClick(cat)} // 클릭 이벤트 핸들러 추가
          >
            {cat}
          </button>
        ))}
      </div>
      <div>
        {articles.map((article, index) => (
          <Link key={index} to={`/article/${article.title}/analogy`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{ border: '1px solid #ccc', padding: '15px 10px', marginBottom: '10px', display: 'flex', alignItems: 'center', position: 'relative' }}> {/* position: relative 추가 */}
              {/* 왼쪽 섹션: 로고와 지표 */}
              <div style={{ marginRight: '15px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <img src="/한겨레.png" alt="한겨레" style={{ width: '60px', marginBottom: '5px' }} /> {/* 언론사 로고 이미지 */}
              </div>

              {/* 오른쪽 섹션: 제목, 날짜, 기자 */}
              <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontWeight: 'bold', fontSize: '0.75em', marginBottom: '3px' }}>{article.title}</div> {/* 기사 제목 */}
                <div style={{ fontSize: '0.5em', color: '#777' }}>{article.date} {article.reporter}</div> {/* 날짜 및 기자 */}
              </div>

              {/* 가짜뉴스 경고 (조건부 렌더링) */}
              {article.indicator === 'warning' && (
                <div style={{ position: 'absolute', bottom: '10px', right: '10px', textAlign: 'center' }}> {/* 절대 위치 지정 및 조정 */}
                  <img src="/가짜뉴스경고.png" alt="가짜뉴스 경고" style={{ width: '30px' }} /> {/* 가짜뉴스 경고 이미지 */}
                </div>
              )}

              {/* 편향 경고 (조건부 렌더링) */}
              {article.indicator === 'bias' && (
                <div style={{ position: 'absolute', bottom: '10px', right: '10px', textAlign: 'center' }}> {/* 절대 위치 지정 및 조정 */}
                  <img src="/편향 경고.png" alt="편향 경고" style={{ width: '30px' }} /> {/* 편향 경고 이미지 */}
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default NewsFeed; 