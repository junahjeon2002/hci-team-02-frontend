import React, { useState } from 'react';
// import viewsLogo from '../VEWS 로고.png'; // public 폴더에 있으므로 제거
// import fakeNewsWarningImage from '../가짜뉴스경고.png'; // public 폴더에 있으므로 제거
import { Link } from 'react-router-dom'; // Link import

const NewsFeed = () => {
  const [isKeywordsBoxOpen, setIsKeywordsBoxOpen] = useState(true); // 키워드 상자 상태 관리

  const toggleKeywordsBox = () => {
    setIsKeywordsBoxOpen(!isKeywordsBoxOpen);
  };

  // 샘플 데이터
  const categories = ["정치", "경제", "사회", "연예", "스포츠"];
  const keywords = ["트럼프", "대선", "화재", "전쟁", "커피"]; // "커피" 키워드 추가
  const articles = [
    {
      media: "언론사",
      indicator: "blue", // 또는 다른 표시
      title: "기사 제목",
      preview: "기사 내용 프리뷰",
    },
    {
      media: "언론사",
      indicator: "red", // 또는 다른 표시
      title: "기사 제목",
      preview: "기사 내용 프리뷰",
    },
    {
      media: "언론사",
      indicator: "warning", // 또는 다른 표시 (예: 가짜뉴스 경고)
      title: "기사 제목",
      preview: "기사 내용 프리뷰",
    },
  ];

  return (
    <div style={{ padding: '10px', paddingTop: '5vh', border: '1px solid #ccc', width: '300px', margin: 'auto' }}>
      <img src="/VEWS 로고.png" alt="VIEWS Logo" style={{ maxWidth: '100px' }} /> {/* public 폴더 경로 사용 */}
      <hr />
      {/* 이미지와 같은 스타일로 키워드 섹션 배치 및 디자인 수정 */}
      <div style={{ padding: '15px', marginBottom: '10px', borderRadius: '10px', backgroundColor: '#f0eaff', position: 'relative', height: isKeywordsBoxOpen ? '100px' : '40px', overflow: 'hidden' }}> {/* 테두리 제거, relative 포지션, 상태에 따른 높이 조절, overflow hidden */}
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <span onClick={toggleKeywordsBox} style={{ cursor: 'pointer', fontWeight: 'bold' }}>
            {isKeywordsBoxOpen ? '∧' : '∨'} {/* 상태에 따라 아이콘 변경 */}
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
                   // 인덱스에 따라 임의의 위치 지정 (사진 및 5개 키워드 고려)
                   top: index === 0 ? '10px' : index === 1 ? '0px' : index === 2 ? '60px' : index === 3 ? '65px' : '5px', // 트럼프, 대선, 화재, 전쟁, 커피
                   left: index === 0 ? '15px' : index === 1 ? '200px' : index === 2 ? '50px' : index === 3 ? '200px' : '100px', // 트럼프, 대선, 화재, 전쟁, 커피
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
          <button key={index} style={{ flexGrow: 1, padding: '5px', margin: '0 2px', border: '1px solid #000', background: cat === '정치' ? '#ddd' : '#fff' }}>
            {cat}
          </button>
        ))}
      </div>
      <div>
        {articles.map((article, index) => (
          <Link key={index} to={`/article/${article.title}/analogy`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{ border: '1px solid #000', padding: '10px', marginBottom: '10px', display: 'flex' }}>
              <div style={{ marginRight: '10px', textAlign: 'center' }}>
                <div>{article.media}</div>
                <div style={{ display: 'flex', marginTop: '5px' }}>
                  {article.indicator === 'blue' && (
                    <>
                      <div style={{ width: '10px', height: '10px', background: 'blue', margin: '0 1px' }}></div>
                      <div style={{ width: '10px', height: '10px', background: 'blue', margin: '0 1px' }}></div>
                      <div style={{ width: '10px', height: '10px', background: 'blue', margin: '0 1px' }}></div>
                      <div style={{ width: '10px', height: '10px', background: 'blue', margin: '0 1px' }}></div>
                      <div style={{ width: '10px', height: '10px', background: 'blue', margin: '0 1px' }}></div>
                    </>
                  )}
                   {article.indicator === 'red' && (
                    <>
                      <div style={{ width: '10px', height: '10px', background: 'red', margin: '0 1px' }}></div>
                      <div style={{ width: '10px', height: '10px', background: 'red', margin: '0 1px' }}></div>
                      <div style={{ width: '10px', height: '10px', background: 'red', margin: '0 1px' }}></div>
                      <div style={{ width: '10px', height: '10px', background: 'red', margin: '0 1px' }}></div>
                      <div style={{ width: '10px', height: '10px', background: 'red', margin: '0 1px' }}></div>
                    </>
                  )}
                  {article.indicator === 'warning' && (
                      <div style={{ color: 'red', fontSize: '20px' }}>⚠️</div> // 경고 아이콘 예시
                  )}
                </div>
              </div>
              <div style={{ flexGrow: 1 }}>
                <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>{article.title}</div>
                <div>{article.preview}</div>
              </div>
              {article.indicator === 'warning' && (
                   <div style={{ marginLeft: '10px', textAlign: 'center', fontSize: '10px', color: 'red' }}>
                      <img src="/가짜뉴스경고.png" alt="가짜뉴스 경고" style={{ width: '50px' }} /> {/* public 폴더 경로 사용 */}
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