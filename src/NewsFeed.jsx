import React from 'react';
// import viewsLogo from '../VEWS 로고.png'; // public 폴더에 있으므로 제거
// import fakeNewsWarningImage from '../가짜뉴스경고.png'; // public 폴더에 있으므로 제거
import { Link } from 'react-router-dom'; // Link import

const NewsFeed = () => {
  // 샘플 데이터
  const categories = ["정치", "경제", "사회", "연예", "스포츠"];
  const keywords = ["트럼프", "한덕수", "김문수", "대선"]; // '방' 제거
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
    <div style={{ padding: '10px', border: '1px solid #ccc', width: '300px', margin: 'auto' }}>
      <img src="/VEWS 로고.png" alt="VIEWS Logo" style={{ maxWidth: '100px' }} /> {/* public 폴더 경로 사용 */}
      <hr />
      <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '10px' }}>
        {categories.map((cat, index) => (
          <button key={index} style={{ flexGrow: 1, padding: '5px', margin: '0 2px', border: '1px solid #000', background: cat === '정치' ? '#ddd' : '#fff' }}>
            {cat}
          </button>
        ))}
      </div>
      <div style={{ border: '1px solid #000', padding: '10px', marginBottom: '10px' }}>
        <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>정치 분야 키워드</div>
        <div style={{ display: 'flex', gap: '10px' }}>
          {keywords.map((kw, index) => (
            <span key={index} style={{ textDecoration: 'underline', color: 'blue', cursor: 'pointer' }}>
              {/* "트럼프" 키워드 클릭 시 비유 읽기 페이지로 이동 */}
              {kw === '트럼프' ? (
                <Link to={`/article/${kw}/analogy`} style={{ textDecoration: 'underline', color: 'blue' }}>{kw}</Link>
              ) : (
                kw
              )}
            </span>
          ))}
        </div>
      </div>
      <div>
        {articles.map((article, index) => (
          <div key={index} style={{ border: '1px solid #000', padding: '10px', marginBottom: '10px', display: 'flex' }}>
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
        ))}
      </div>
    </div>
  );
};

export default NewsFeed; 