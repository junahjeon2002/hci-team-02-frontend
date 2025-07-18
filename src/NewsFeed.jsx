import React, { useState, useEffect, useRef } from 'react';
// import viewsLogo from '../VEWS 로고.png'; // public 폴더에 있으므로 제거
// import fakeNewsWarningImage from '../가짜뉴스경고.png'; // public 폴더에 있으므로 제거
import { Link, useParams } from 'react-router-dom'; // Link import
import { useKeywords } from './contexts/KeywordContext';
import axios from "axios"

const NewsFeed = () => {
  const [isKeywordsBoxOpen, setIsKeywordsBoxOpen] = useState(true); // 키워드 상자 상태 관리
  const [selectedCategory, setSelectedCategory] = useState('정치'); // 선택된 카테고리 상태 추가
  const [articles, setArticles] = useState([]); // 백엔드에서 받아올 기사 목록
  const [keywords, setKeywords] = useState([]); // 키워드 상태 추가
  const [isTalkMode, setIsTalkMode] = useState(false); // 토글 상태: false=비유보기, true=톡보기
  const id = useParams()
  const articleCacheRef = useRef({});

  useEffect(() => {
    console.log("📌 Updated keywords:", keywords);
  }, [keywords]);

  useEffect(() => {
    // API 호출 함수
    const fetchKeywords = async () => {
      try {
        const response = await axios.post('http://3.36.74.61:8080/article/keywords', {}, {
          headers: {}
        });
        console.log('API Response:', response.data);
        // 서버 응답 형식에 맞게 데이터 처리
        if (response.data) {
          // 객체를 배열로 변환
          setKeywords(response.data);
        } else {
          console.error('Invalid response format:', response.data);
          setKeywords([]);
        }
      } catch (error) {
        console.error('Error fetching keywords:', error);
        setKeywords([]);
      }
    };

    fetchKeywords();
  }, []);

  useEffect(() => {
    const fetchArticlesWithIndicators = async () => {
      if (articleCacheRef.current[selectedCategory]) {
        setArticles(articleCacheRef.current[selectedCategory]);
        return;
      }
      try {
        // 1. 기사 리스트 가져오기
        const res = await axios.get(`http://3.36.74.61:8080/article/genre/${selectedCategory}`);
        const baseArticles = res.data.slice(0, 10);

        // 2. 각 기사에 대해 indicator 가져오기
        const enrichedArticles = await Promise.all(
          baseArticles.map(async (article) => {
            try {
              const indicatorRes = await axios.get(`http://3.36.74.61:8080/article/bias/${article.id}`);
              if (indicatorRes.data.reporting_bias === "있음") { return { ...article, indicator: true }; }
              else { return { ...article, indicator: false }; }
            } catch (err) {
              console.warn(`Indicator fetch failed for article ${article.id}`, err);
              return { ...article, indicator: null };
            }
          })
        );

        articleCacheRef.current[selectedCategory] = enrichedArticles;
        console.log(enrichedArticles)
        setArticles(enrichedArticles);
      } catch (err) {
        console.error("Failed to fetch articles:", err);
      }
    };

    fetchArticlesWithIndicators();
  }, [selectedCategory]);

  const toggleKeywordsBox = () => {
    setIsKeywordsBoxOpen(!isKeywordsBoxOpen);
  };

  const categories = ["정치", "경제", "사회", "생활", "IT", "세계"]

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleToggleChange = () => {
    setIsTalkMode(!isTalkMode);
  };

  const getArticleLink = (articleId) => {
    return isTalkMode ? `/article/${articleId}/talk` : `/article/${articleId}/analogy`;
  };

  return (
    <div style={{ padding: '10px', paddingTop: '5vh', border: '1px solid #ccc', width: '95%', margin: 'auto' }}>
      <img src="/VEWS 로고.png" alt="VIEWS Logo" style={{ maxWidth: '100px' }} /> {/* public 폴더 경로 사용 */}
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
        {/* API로부터 가져온 키워드를 사용 */}
        {isKeywordsBoxOpen && keywords && (
          <div style={{ width: '100%', height: '100%', position: 'relative' }}> {/* position: relative 설정 */}
            {keywords.map((item, index) => ( // 처음 5개의 키워드만 사용
              <Link to={`/article/${item.article_id}/intensive`}> 
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
                    // TODO: API 응답 데이터에 위치 정보가 없다면, 위치 지정 로직 수정 필요
                    top: index === 0 ? '10%' : index === 1 ? '0%' : index === 2 ? '50%' : index === 3 ? '10%' : '45%', // 인덱스에 따라 임의의 위치 지정 (사진 및 5개 키워드 고려)
                    left: index === 0 ? '2%' : index === 1 ? '40%' : index === 2 ? '30%' : index === 3 ? '75%' : '60%', // 위치 간격 조정
                  }}
                >
                  {/* "트럼프" 키워드 클릭 시 집중 읽기 페이지로 이동, 다른 키워드는 현재 기능 없음 */}
                  {/* TODO: 키워드 클릭 시 동작 정의 필요 */}
                  {item.keyword} {/* item.keyword로 키워드 텍스트 표시 */}
                </span>
              </Link>
            ))}
          </div>
         )}
      </div>
      <hr style={{ marginTop: '15px', marginBottom: '15px' }}/>
      <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '10px', marginTop: '10px' }}>
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

      {/* 토글 버튼 추가 */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        marginBottom: '25px',
        marginTop: '25px',
        padding: '10px',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        border: '1px solid #dee2e6'
      }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '10px',
          fontSize: '0.9em'
        }}>
          <span style={{ color: isTalkMode ? '#666' : '#5e3bed', fontWeight: 'bold' }}>비유 보기</span>
          <div 
            onClick={handleToggleChange}
            style={{
              width: '50px',
              height: '25px',
              backgroundColor: '#5e3bed',
              borderRadius: '25px',
              cursor: 'pointer',
              position: 'relative',
              transition: 'background-color 0.3s ease'
            }}
          >
            <div style={{
              width: '21px',
              height: '21px',
              backgroundColor: '#fff',
              borderRadius: '50%',
              position: 'absolute',
              top: '2px',
              left: isTalkMode ? '27px' : '2px',
              transition: 'left 0.3s ease'
            }} />
          </div>
          <span style={{ color: isTalkMode ? '#5e3bed' : '#666', fontWeight: 'bold' }}>톡 보기</span>
        </div>
      </div>

      <div>
        {articles.map((article, index) => (
          <Link key={index} to={getArticleLink(article.id)} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{ border: '1px solid #ccc', padding: '15px 10px', marginBottom: '10px', display: 'flex', alignItems: 'center', position: 'relative' }}>
              {/* 로고 */}
              <div style={{ marginRight: '15px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <img src={article.author.press.logo_img_src} alt={article.author.press.name} style={{ width: '60px', marginBottom: '5px' }} />
              </div>
              {/* 텍스트 */}
              <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', textAlign: 'left', fontWeight: 'bold' }}>
                <div style={{ fontWeight: 'bold', fontSize: '0.75em', marginBottom: '3px' }}>{article.title}</div>
                <div style={{ fontSize: '0.5em', color: '#777' }}>{article.edited_at?.slice(0, 10)} {article.author.name} 기자</div>
              </div>

              {/* 가짜뉴스 경고 (조건부 렌더링) */}
              {/* {article.indicator === 'warning' && (
                <div style={{ position: 'absolute', bottom: '0px', right: '10px', textAlign: 'center' }}> 
                  <img src="/가짜뉴스경고.png" alt="가짜뉴스 경고" style={{ width: '30px' }} /> 
                </div>
              )} */}

              {/* 편향 경고 (조건부 렌더링) */}
              {article.indicator && (
                <div style={{ position: 'absolute', bottom: '0px', right: '10px', textAlign: 'center' }}> {/* 절대 위치 지정 및 조정 */}
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