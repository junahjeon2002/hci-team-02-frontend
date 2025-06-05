import React, { useState, useEffect, useRef } from "react";
import "./Analog.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios"

export default function Analog() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipContent, setTooltipContent] = useState('');
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const tooltipRef = useRef(null);

  useEffect(() => {
    axios.get(`http://3.36.74.61:8080/article/view/${id}`)
      .then(res => {
        setArticle(res.data);
      })
      .catch(err => {
        console.error("failed to fetch article", err);
      });
  }, [id]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target)) {
        setShowTooltip(false);
        setTooltipContent('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleWordClick = (e, originalWord) => {
    const rect = e.target.getBoundingClientRect();
    const containerRect = document.querySelector('.analog-card')?.getBoundingClientRect() ?? { top: 0, left: 0 };
    
    const estimatedTooltipWidth = tooltipRef.current ? tooltipRef.current.offsetWidth : 200;
    const estimatedTooltipHeight = tooltipRef.current ? tooltipRef.current.offsetHeight : 50;
    const PADDING = 10;

    let top = rect.top - containerRect.top - estimatedTooltipHeight + 25;
    let left = rect.left - containerRect.left + (rect.width / 2) - (estimatedTooltipWidth / 2) + 20;

    const containerWidth = containerRect.width ?? window.innerWidth;
    if (left < PADDING) {
      left = PADDING;
    } else if (left + estimatedTooltipWidth > containerWidth - PADDING) {
      left = containerWidth - estimatedTooltipWidth - PADDING;
    }

    if (top < PADDING) {
      top = rect.bottom - containerRect.top + 5;
    }

    setTooltipPosition({ top, left });
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

  const dictionary = article["story_summary"]?.dictionary || {};

  const replaceWordsWithClickableSpans = (text) => {
    let result = text;
    Object.entries(dictionary).forEach(([analogWord, originalWord]) => {
      const regex = new RegExp(analogWord, 'g');
      result = result.replace(regex, `<span class="clickable-word" data-original="${originalWord}">${analogWord}</span>`);
    });
    return result;
  };

  return (
    <div className="analog-card" style={{ position: 'relative' }}>
      <div className="analog-topbar">
        <Link to="/">
          <img src="/home.svg" alt="홈" className="analog-homeicon" />
        </Link>
        <Link to="/">
          <img src="/VEWS%20로고.png" alt="VEWS" className="analog-vewslogo" />
        </Link>
      </div>
      <div className="analog-title">{article?.title}</div>
      <div style={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
        <span className="analog-reporter">{article["author"]?.name} 기자</span>
        <img src={article["author"]["press"]?.logo_img_src} alt="press" className="analog-logo" />
      </div>
      <div className="analog-dates">
        <span className="analog-date">수정 {article?.edited_at}</span>
        <span className="analog-date">등록 {article?.published_at}</span>
      </div>

      <hr className="analog-divider" />

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

      {showTooltip && (
        <div
          ref={tooltipRef}
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
        >
          {tooltipContent}
        </div>
      )}
    </div>
  );
}
