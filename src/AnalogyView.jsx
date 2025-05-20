import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const AnalogyView = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // 기사 ID를 URL에서 가져옴

  // 샘플 비유 읽기 데이터 (이미지 내용을 바탕으로 작성)
  const analogyData = {
    title: "「트럼프, 무역 협정 발표 예고...중국 겨냥한 선제 압박?」", // 기사 제목 (일관성을 위해 추가)
    author: "xx 기자", // 작성자 (일관성을 위해 추가)
    입력시간: "2025.XX.XX 오전 XX:XX", // 입력 시간 (일관성을 위해 추가)
    수정시간: "2025.XX.XX 오전 XX:XX", // 수정 시간 (일관성을 위해 추가)
    analogyTitle: "친구들 간 \"간식 협정\" 이야기로 바꿔 보기",
    warning: "주: 가짜 뉴스일 위험이 있습니다.",
    content: [
      {
        title: "1. 지난달의 '간식 관세' 소통",
        details: [
          "동네에서 제일 영향력 있는 지훈이가 \"외국 과자엔 145% 세금!\"이라며 친구들이 가져오는 간식값을 확 올려놓았어요. 그래도 바로 시행하진 않고 \"90일 동안 시험 삼아 미뤄 볼게\"라고 했죠.",
        ]
      },
      {
        title: "2. '큰 발표' 예고",
        details: [
          "7일 밤, 지훈이는 자기 SNS에 \"내일 오전 10시에 초대형 간식 거래 발표할 거야! 아주 크고, 모두가 존경하는 친구랑 말이야\"라고 올렸어요.",
        ]
      },
      {
        title: "3. 상대는 누구일까?",
        details: [
          "소문에 따르면 그 상대는 전학 온 유나라라는 친구래요. 유나라는 놀이터에 인기 많은 초코자동차 과자(자동차)와 농장 쿠키(농산물)를 들고 올 거고, 대신 지훈이는 그동안 높게 매겨 둔 **절제 장난감 세금(25%)**을 조금 깎아 줄 거래요. 두 사람은 원래 간식 주고받기가 비슷해서 서로 큰 손해가 없으니, 지훈이는 \"협상할 만하다!\"며 좋아했대요. 연합뉴스",
        ]
      },
      {
        title: "4. 관람객 선생님의 걱정",
        details: [
          "하지만 선생님은 \"정식 계약서는 시간이 오래 걸리니, 내일 발표는 '서로 이렇대 해 보자' 정도의 **양해각서**일 가능성이 크다\"며 고개를 갸웃했어요. WSJ",
        ]
      },
      {
        title: "5. 진우 압박 카드?",
        details: [
          "이를 뒤 진우와의 큰 간식 협상이 예정돼 있어서, 일부 친구들은 \"지훈이가 유나라와 먼저 손을 잡아 진우에게 압박을 주려는 걸 수도 있어!\"하고 수군거렸답니다. WSJ",
        ]
      },
    ]
  };

  // "원문 읽기" 클릭 시 기사 상세 페이지로 이동
  const handleGoToOriginal = () => {
    navigate(`/article/${id}/original`); // 원문 읽기 페이지 경로로 이동
  };

  // "돌아가기" 클릭 시 메인 페이지로 이동
  const handleGoBackToMain = () => {
    navigate('/'); // 메인 페이지 경로로 이동
  };

  // "톡 읽기" 클릭 시 톡 읽기 페이지로 이동 (새로 추가)
  const handleGoToTalk = () => {
    navigate(`/article/${id}/talk`); // 톡 읽기 페이지 경로로 이동
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

      <hr /> {/* 상단 구분선 추가 */}

      {/* "원문 읽기" 제목 및 경고 문구 배치 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
         {/* "비유 읽기" 제목을 "원문 읽기" 버튼으로 변경 */}
         <button onClick={handleGoToOriginal} style={{ fontWeight: 'bold', border: 'none', background: 'none', color: 'black', cursor: 'pointer' }}>
           &lt; 원문 읽기
         </button>
         {/* 톡 읽기 버튼 추가 */}
         <button onClick={handleGoToTalk} style={{ fontWeight: 'bold', border: 'none', background: 'none', color: 'black', cursor: 'pointer', marginLeft: '10px' }}>
            &lt; 톡 읽기
         </button>
         <div style={{ color: 'red', fontSize: '12px' }}>{analogyData.warning}</div> {/* 경고 문구 */}
      </div>

      <hr /> {/* 구분선 추가 */}

       <h2 style={{ marginBottom: '5px' }}>{analogyData.title}</h2> {/* 기사 제목 추가 */}
      <div style={{ fontSize: '14px', marginBottom: '5px' }}>{analogyData.author}</div> {/* 작성자 추가 */}
      <div style={{ fontSize: '12px', color: '#555', marginBottom: '10px' }}> {/* 시간 추가 */}
        입력 {analogyData.입력시간} 수정 {analogyData.수정시간}
      </div>
      <hr /> {/* 구분선 추가 */}

      <div style={{ border: '1px solid blue', padding: '10px', marginTop: '10px'}}> {/* 파란색 테두리, 상단 여백 추가 */}
         <div style={{ fontWeight: 'bold', marginBottom: '10px'}}>{analogyData.analogyTitle}</div>
         <div> {/* 비유 내용 */}
            {analogyData.content.map((section, index) => (
              <div key={index} style={{ marginBottom: '10px'}}>
                 <div style={{ fontWeight: 'bold', marginBottom: '5px'}}>{section.title}</div>
                 <ul>
                    {section.details.map((detail, detailIndex) => (
                       <li key={detailIndex} style={{ marginBottom: '5px'}}>{detail}</li>
                    ))}
                 </ul>
              </div>
            ))}
         </div>
      </div>

    </div>
  );
};

export default AnalogyView; 