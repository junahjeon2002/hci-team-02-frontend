import React, { useState, useEffect } from "react";
import "./Analog.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios"

export default function Analog() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);  // API 응답 저장
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipContent, setTooltipContent] = useState('');
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    axios.get(`http://3.36.74.61:8080/article/view/${id}`)
      .then(res => {
        setArticle(res.data);
      })
      .catch(err => {
        console.error("failed to fetch article", err);
      })
  }, [id])

  const handleWordClick = (e, originalWord) => {
    const rect = e.target.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

    setTooltipPosition({
      top: rect.top + scrollTop,
      left: rect.right + scrollLeft + 5,
    });
    setTooltipContent(originalWord);
    setShowTooltip(true);
  };

  const handleCloseTooltip = () => {
    setShowTooltip(false);
    setTooltipContent('');
  };

  if (!article) {
    return <div>Loading...</div>;
  }

  // 비유된 단어를 원본 단어로 매핑
  const dictionary = article["story_summary"]?.dictionary || {};
  
  // 비유된 단어를 찾아서 클릭 가능한 스팬으로 변환하는 함수
  const replaceWordsWithClickableSpans = (text) => {
    let result = text;
    Object.entries(dictionary).forEach(([analogWord, originalWord]) => {
      const regex = new RegExp(analogWord, 'g');
      result = result.replace(regex, `<span class="clickable-word" data-original="${originalWord}">${analogWord}</span>`);
    });
    return result;
  };

  return (
    <div className="analog-card">
      {/* Top bar */}
      <div className="analog-topbar">
        <Link to="/">
          <img src="/home.svg" alt="홈" className="analog-homeicon" />
        </Link>
        <Link to="/">
          <img src="/VEWS%20로고.png" alt="VEWS" className="analog-vewslogo" />
        </Link>
      </div>
      {/* Title */}
      <div className="analog-title">{article?.title}</div>
      <div className="analog-warning">주의: 가짜 뉴스의 위험이 있습니다.</div>
      {/* Info row */}
      <div style={{display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between'}}>
        <span className="analog-reporter">{article["author"]?.name} 기자</span>
        <img src={article["author"]["press"]?.logo_img_src} alt="한겨레" className="analog-logo" />
      </div>
      <div className="analog-dates">
        <span className="analog-date">수정 {article?.edited_at}</span>
        <span className="analog-date">등록 {article?.published_at}</span>
      </div>

      <hr className="analog-divider" />
      {/* Button row */}
      <div className="analog-btnrow">
        <Link to={`/article/${id}/talk`} style={{ textDecoration: 'none' }}>
          <button className="analog-btn">
            <img src="/talkbox.svg" alt="톡" className="analog-btnicon" />
            톡 보기
          </button>
        </Link>
        <Link to={`/article/${id}/original`} style={{ textDecoration: 'none' }}>
          <button className="analog-btn">
            원문보기
            <img src="/script.svg" alt="원문보기" className="analog-btnicon" />
          </button>
        </Link>
      </div>
      {/* Article */}
      <div className="analog-article-analog">
        {article["story_summary"]?.story.split('\n').map((line, idx) => (
          <React.Fragment key={idx}>
            <div
              dangerouslySetInnerHTML={{
                __html: replaceWordsWithClickableSpans(line)
              }}
              onClick={(e) => {
                if (e.target.classList.contains('clickable-word')) {
                  handleWordClick(e, e.target.dataset.original);
                }
              }}
            />
            <br />
          </React.Fragment>
        ))}
      </div>

      {/* Tooltip */}
      {showTooltip && (
        <div
          className="tooltip"
          style={{
            position: 'absolute',
            top: tooltipPosition.top,
            left: tooltipPosition.left,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            color: 'white',
            padding: '5px 10px',
            borderRadius: '4px',
            fontSize: '14px',
            zIndex: 1000,
          }}
          onClick={handleCloseTooltip}
        >
          {tooltipContent}
        </div>
      )}
    </div>
  );
}
