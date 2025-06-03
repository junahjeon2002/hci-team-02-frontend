import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from 'axios';
import "./Talk.css";

const avatars = [
  { src: "/훈이.svg", name: "훈이" },
  { src: "/유리.svg", name: "유리" },
  { src: "/맹구.svg", name: "맹구" },
  { src: "/철수.svg", name: "철수" },
  { src: "/짱구.svg", name: "짱구" }
];

export default function Talk() {
  const { id } = useParams();
  const [chatLines, setChatLines] = useState([]);
  const [articleTitle, setArticleTitle] = useState('');
  const [author, setAuthor] = useState("");
  const [error, setError] = useState(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchTalkData = async () => {
      try {
        console.log('Fetching talk data for article ID:', id); // 디버깅용 로그
        // API 요청을 원래의 GET 방식으로 되돌리고 articleId를 URL에 포함
        const response = await axios.get(`http://3.36.74.61:8080/article/view/${id}`, {
          headers: {
            'accept': 'application/json'
          }
        });
        console.log('Response data:', response.data); // 디버깅용 로그
        setChatLines(response.data.chat_lines || []);
        setArticleTitle(response.data.title || '제목 없음');
        setAuthor(response.data.author.name)
        setImage(response.data["author"]["press"]?.logo_img_src)
        setError(null); // 성공 시 에러 초기화
      } catch (error) {
        console.error('Error fetching talk data:', error);
        setError(`데이터 로드 실패: ${error.message}`);
        setChatLines([]);
        setArticleTitle('데이터 로드 실패');
      }
    };

    if (id) {
      fetchTalkData();
    } else {
      console.error('No article ID provided');
      setError('기사 ID가 없습니다');
    }
  }, [id]);

  if (error) {
    return (
      <div className="talk-card">
        <div className="talk-topbar">
          <Link to="/">
            <img src="/home.svg" alt="홈" className="talk-homeicon" />
          </Link>
          <img src="/VEWS%20로고.png" alt="VEWS" className="talk-vewslogo" />
        </div>
        <div style={{ color: 'red', padding: '20px' }}>
          오류 발생: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="talk-card">
      {/* 상단바 */}
      <div className="talk-topbar">
        <Link to="/">
          <img src="/home.svg" alt="홈" className="talk-homeicon" />
        </Link>
        <Link to="/">
          <img src="/VEWSLogo.svg" alt="VEWS" className="talk-vewslogo" />
        </Link>
      </div>
      {/* 기사 제목/경고/기자/로고 */}
      <div className="talk-title">{articleTitle}</div>
      {/* Info row */}
      <div style={{display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between'}}>
        <span className="analog-reporter">{author} 기자</span>
        <img src={image} alt="한겨레" className="analog-logo" />
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
        {chatLines.map((line, idx) => (
          <div className="talk-bubble-row" key={idx}>
            <img className="talk-avatar" src="/basic.jpg" />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginRight: '10px' }}>
              <div style={{ fontSize: '0.7em', marginTop: '5px', marginBottom: '8px', marginLeft: '12px', textAlign: 'left', fontWeight: 'bold' }}>{line.speaker_name}</div>
              <div className="talk-bubble">{line.content}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
