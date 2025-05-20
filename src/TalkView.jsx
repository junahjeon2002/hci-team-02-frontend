import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const TalkView = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // 기사 ID를 URL에서 가져옴

  // 샘플 톡 읽기 데이터 (이미지 내용을 바탕으로 작성)
  const talkData = {
    title: "「트럼프, 무역 협정 발표 예고...중국 겨냥한 선제 압박?」", // 기사 제목 (이미지)
    author: "xx 기자", // 작성자 (이미지)
    입력시간: "2025.XX.XX 오전 XX:XX", // 입력 시간 (이미지)
    수정시간: "2025.XX.XX 오전 XX:XX", // 수정 시간 (이미지)
    sections: [
      {
        title: "[트럼프 대통령]",
        content: "내일 오전 10시, 오벌 오피스에서 중요한 기자회견을 할 예정입니다. 매우 크고, 매우 존경받는 국가의 대표들과의 주요 무역 협정에 대한 발표가 있을 거예요. 이건 시작일 뿐입니다. 앞으로도 많은 협정이 이어질 겁니다.",
      },
      {
        title: "[정치 소식통]",
        content: "(속보) 트럼프 대통령, 아마도 영국과의 협정을 발표할 계획이래요.",
      },
       {
        title: "[FT]",
        content: "영국은 이번 주 안으로 미국과 관세 협정을 체결할 예정이라고 보도했습니다.\n디지털세·자동차·농산물 관련 세금을 조정하는 내용이에요.",
      },
       {
        title: "[CNN]",
        content: "트럼프는 어떤 국가인지는 말하지 않았지만, 미국 정부는 최근 인도, 영국, 한국, 일본과 협상을 하고 있다고 알려왔죠. 다만 이번 '협상'은 정식 계약서보다는 양해각서일 가능성이 높습니다.",
      },
       {
        title: "[무역 분석가]",
        content: "미국과 영국의 무역수지는 거의 균형 상태라 트럼프는 영국과는 협상이 가능하다고 여기는 반면, 무역 적자가 큰 EU에 대해서는 강경한 입장을 취하고 있어요.",
      },
       {
        title: "[국제 관계 전문가]",
        content: "이번 발표가 미중 고위급 협상(10일 예정)을 앞두고 중국을 압박하려는 포석일 수도 있다는 해석도 있습니다.",
      },
    ],
     question: "이런 내용의 기사외에 더 궁금한 내용 있어?"
  };

  // "돌아가기" 클릭 시 메인 페이지로 이동
  const handleGoBackToMain = () => {
    navigate('/'); // 메인 페이지 경로로 이동
  };

  // 기사 상세 페이지로 이동 (새로운 이미지에는 없지만 필요하다면 추가)
  const handleGoToOriginal = () => {
    navigate(`/article/${id}/original`);
  };

    // 비유 읽기 페이지로 이동 (새로운 이미지에는 없지만 필요하다면 추가)
    const handleGoToAnalogy = () => {
      navigate(`/article/${id}/analogy`);
    };

  return (
    <div style={{ padding: '10px', paddingTop: '5vh', border: '1px solid #ccc', width: '300px', margin: 'auto' }}>
      {/* 상단 돌아가기 및 언론사 버튼 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <button onClick={handleGoBackToMain} style={{ padding: '5px 10px', border: '1px solid #000', background: '#fff', cursor: 'pointer' }}>
          ＜ 돌아가기
        </button>
        <button style={{ padding: '5px 10px', border: '1px solid #000', background: '#fff' }}>
          언론사
        </button>
      </div>

      <hr /> {/* 상단 구분선 */}

      <h2 style={{ marginBottom: '5px' }}>{talkData.title}</h2> {/* 기사 제목 */}
      <div style={{ fontSize: '14px', marginBottom: '5px' }}>{talkData.author}</div> {/* 작성자 */}
      <div style={{ fontSize: '12px', color: '#555', marginBottom: '10px' }}> {/* 시간 */}
        입력 {talkData.입력시간} 수정 {talkData.수정시간}
      </div>
      <hr /> {/* 구분선 */}

      {/* 톡 읽기 섹션 제목 - 이미지에는 없지만 구조상 추가 */}
      {/* <div style={{ fontWeight: 'bold', marginBottom: '10px' }}>톡 읽기</div> */}

      <div> {/* 톡 내용 */}
        {talkData.sections.map((section, index) => (
          <div key={index} style={{ marginBottom: '15px', border: '1px solid #eee', padding: '10px' }}> {/* 각 섹션 테두리 및 여백 */}
            <div style={{ fontWeight: 'bold', marginBottom: '5px'}}>{section.title}</div>
            {section.content.split('\n').map((paragraph, pIndex) => (
              <p key={pIndex} style={{ marginBottom: '5px', lineHeight: '1.4' }}>
                {paragraph}
              </p>
            ))}
          </div>
        ))}
      </div>

      {/* 하단 질문 섹션 */}
      <div style={{ border: '1px solid #000', padding: '10px', marginTop: '20px' }}>
          <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>{talkData.question}</div>
          {/* 여기에 사용자 입력 필드나 버튼 추가 가능 */}
      </div>

       {/* 하단 원문 읽기/비유 읽기 버튼 */}
       <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-around'}}>
          <button onClick={handleGoToOriginal} style={{ padding: '5px 10px', border: 'none', background: 'none', color: 'blue', textDecoration: 'underline', cursor: 'pointer'}}>
           &lt; 원문 읽기
          </button>
          <button onClick={handleGoToAnalogy} style={{ padding: '5px 10px', border: 'none', background: 'none', color: 'blue', textDecoration: 'underline', cursor: 'pointer'}}>
            &lt; 비유 읽기
          </button>
        </div>

    </div>
  );
};

export default TalkView; 