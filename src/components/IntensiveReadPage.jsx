import React, { useState, useEffect } from "react";
import "./Analog.css"; 
import { Link, useNavigate, useParams } from "react-router-dom"; // Link, useNavigate, useParams 모두 필요
import axios from "axios"


const IntensiveReadPage = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // 기사 ID를 URL에서 가져옴
  const [article, setArticle] = useState(null);  // API 응답 저장
  function highlightToHtml(text) {
    const parts = text.split(/\[\[highlight\]\]|\[\[\/highlight\]\]/);
    let result = '';
    for (let i = 0; i < parts.length; i++) {
      if (i % 2 === 1) {
        // 하이라이트 구간
        result += `<strong>${parts[i]}</strong>`;
      } else {
        // 일반 구간
        result += `<span class="dimmed">${parts[i]}</span>`;
      }
    }
    return result;
  }

  useEffect(() => {
    const fetchArticleWithHighlight = async () => {
      try {
        // 1. article 본문 가져오기
        const articleRes = await axios.get(`http://3.36.74.61:8080/article/view/${id}`);
        const articleData = articleRes.data;

        // 2. highlight된 버전 가져오기
        const highlightRes = await axios.get(`http://3.36.74.61:8080/article/highlight/${id}`);
        const highlightedText = highlightToHtml(highlightRes.data.highlighted);

        // 3. highlight 내용을 article에 반영
        const updatedArticle = {
          ...articleData,
          content: highlightedText,  // 기존 content 덮어쓰기
        };

        setArticle(updatedArticle);
      } catch (err) {
        console.error("Failed to fetch article or highlight", err);
      }
    };

    fetchArticleWithHighlight();
  }, [id]);

if (!article) {
    return <div>Loading...</div>;
  }

  // "홈" 아이콘 클릭 시 메인 페이지로 이동
  const handleGoHome = () => {
    navigate('/'); // 메인 페이지 경로로 이동
  };

  return (
    <div className="analog-card">
      {/* Top bar */}
      <div className="analog-topbar">
        <Link to="/">
          <img src="/home.svg" alt="홈" className="analog-homeicon" />
        </Link>
        <img src="/VEWSLogo.svg" alt="VEWS" className="analog-vewslogo" />
      </div>
      {/* Title */}
      <div className="analog-title">{article.title}</div>
      <div className="analog-warning">주의: 가짜 뉴스의 위험이 있습니다.</div>
      {/* Info row */}
      <div style={{display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between'}}>
        <span className="analog-reporter">{article["author"]["name"]} 기자</span>
        <img src={article["author"]["press"]?.logo_img_src} alt="한겨레" className="analog-logo" />
      </div>
      <div className="analog-dates">
        <span className="analog-date">수정 {article.edited_at}</span>
        <span className="analog-date">등록 {article.published_at}</span>
        </div>
        <hr className="analog-divider" />
      {/* Button row */}
      <div className="analog-btnrow">
      </div>
      {/* Article Container for relative positioning */}
      <div style={{ position: 'relative' }}>
        {/* Article */}
        <div className="analog-article-analog">
          <div
            style={{ lineHeight: "1.6", fontSize: "16px" }}
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </div>
        {/* Dictionary Popup */}
      </div>
    </div>
  );
};

export default IntensiveReadPage; 