import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const TalkView = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // URL에서 기사 ID 추출

  // API로 불러올 데이터 상태 관리
  const [talkData, setTalkData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 컴포넌트 마운트 시 API 요청
  useEffect(() => {
    const fetchTalkData = async () => {
      try {
        const response = await axios.post('http://3.36.74.61:8080/article/talk', {}, {
          headers: {
          }
        });
        setTalkData(response.data);
      } catch (error) {
        console.error('Error fetching talk data:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTalkData();
  }, [id]);

  const handleGoBackToMain = () => navigate('/');
  const handleGoToOriginal = () => navigate(`/article/${id}/original`);
  const handleGoToAnalogy = () => navigate(`/article/${id}/analogy`);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>오류 발생: {error.message}</div>;
  if (!talkData) return <div>데이터 없음</div>;

  return (
    <div style={{ padding: '10px', paddingTop: '5vh', border: '1px solid #ccc', width: '300px', margin: 'auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <button onClick={handleGoBackToMain} style={{ padding: '5px 10px', border: '1px solid #000', background: '#fff', cursor: 'pointer' }}>
          ＜ 돌아가기
        </button>
        <button style={{ padding: '5px 10px', border: '1px solid #000', background: '#fff' }}>
          {talkData.author?.press?.name || '언론사'}
        </button>
      </div>

      <hr />

      <h2>{talkData.title}</h2>
      <div style={{ fontSize: '14px' }}>{talkData.author?.name}</div>
      <div style={{ fontSize: '12px', color: '#555', marginBottom: '10px' }}>
        입력 {new Date(talkData.published_at).toLocaleString()} 수정 {new Date(talkData.edited_at).toLocaleString()}
      </div>

      <hr />

      <div>
        {talkData.chat_lines?.map((line, index) => (
          <div key={line.id} style={{ marginBottom: '15px', border: '1px solid #eee', padding: '10px' }}>
            <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>{line.speaker_name}</div>
            <p style={{ marginBottom: '5px', lineHeight: '1.4' }}>
              {line.content}
            </p>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-around' }}>
        <button onClick={handleGoToOriginal} style={{ padding: '5px 10px', border: 'none', background: 'none', color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}>
          &lt; 원문 읽기
        </button>
        <button onClick={handleGoToAnalogy} style={{ padding: '5px 10px', border: 'none', background: 'none', color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}>
          &lt; 비유 읽기
        </button>
      </div>
    </div>
  );
};

export default TalkView;
