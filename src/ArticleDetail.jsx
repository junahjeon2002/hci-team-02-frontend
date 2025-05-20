import React from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Outlet 제거

const ArticleDetail = () => {
  const navigate = useNavigate(); // useNavigate 훅 사용
  const { id } = useParams();

  // 샘플 기사 데이터 (이미지 내용을 바탕으로 작성)
  const article = {
    title: "「트럼프, 무역 협정 발표 예고...중국 겨냥한 선제 압박?」",
    author: "xx 기자",
    입력시간: "2025.XX.XX 오전 XX:XX",
    수정시간: "2025.XX.XX 오전 XX:XX",
    content: [
      "도널드 트럼프 미국 대통령이 8일 무역 협정 관련 주요 기자회견을 예고했다. 지난달 2일 트럼프가 전 세계를 상대로 발표한 상호 관세를 다음 날 90일간 유예하고, 중국산 제품에 145% 관세를 부과한 지 거의 한 달 만이다.",
      "트럼프는 7일 밤 자신의 소셜미디어 트루스소셜에 \"내일(8일) 오전 10시, 오벌 오피스(백악관 집무실)에서 중요한 기자회견이 있다\"며 \"매우 크고, 매우 존경받는 국가의 대표들과의 주요 무역 협정에 관한 것\"이라고 했다. 그러면서 \"이는 첫 번째 사례일 뿐이며, 앞으로도 많은 협정이 이어질 것\"이라고 했다.",
      "이와 관련 정치전문매체 폴리티코는 이날 익명의 소식통을 인용해 \"트럼프가 영국과의 중대한 무역 협정의 세부 사항을 발표할 계획\"이라고 보도했다. 앞서 영국 파이낸셜타임스(FT)는 \"영국이 이번 주 내로 미국과 관세 협정을 체결할 예정\"이라고 보도했다. FT는 영국이 미국산 자동차와 농산물에 부과하는 관세와 디지털세를 감면해주고, 미국은 철강·자동차에 적용되는 25%의 품목별 관세에 대해 일부 할당량(쿼터)을 정해 영국의 관세를 감면해주는 내용의 협정을 논의하고 있다고 전했다.",
      "통계에 따라 차이가 있지만, 미국과 영국은 서로 소폭의 무역 적자 또는 흑자를 기록하는 것으로 나타나 영국 무역수지가 거의 균형을 이루고 있는 것으로 알려졌다. 이 때문에 특정 국가에 대한 미국의 수출이 수입보다 적은 것을 싫어하는 트럼프는 지난 2월 유럽연합(EU)에 대해서는 \"미국을 갈취하기 위해 만들어졌다\"며 \"관세가 확실히 부과될 것\"이라고 하면서도 미국과의 무역 불균형이 두드러지지 않는 영국에 대해서는 \"협상이 가능할 것\"이라며 유화적 태도를 보였다.",
      "CNN은 \"트럼프는 어떤 국가와의 협정인지는 명시하지 않았지만 트럼프 행정부는 인도, 영국, 한국, 일본 등 수많은 국가들과의 협상이 진행 중임을 시사해왔다\"며 \"트럼프 행정부가 수많은 국가들과 고도화된 무역 협상을 진행 중이라고 말하고 있음에도, 실제 무역 협정은 출범 수년이 걸리는 복잡한 협상 과정을 필요로 하기 때문에 트럼프가 예고한 이번 '협상'은 실제로는 양해각서(MOU)일 가능성이 높다\"고 보도했다.",
      "오는 10일 스위스 제네바에서 예정돼 있는 가운데, 미국이 특정 국가와 무역 협정을 선제적으로 발표할 경우, 중국에 대한 협상 압박 수단으로도 작용할 수 있다는 전망이 나온다."
    ]
  };

  // "돌아가기" 클릭 시 메인 페이지로 이동
  const handleGoBackToMain = () => {
    navigate('/'); // 메인 페이지 경로로 이동
  };

  // "비유 읽기" 섹션 클릭 시 비유 읽기 페이지로 이동 (경로 유지)
  const handleGoToAnalogy = () => {
    navigate(`/article/${id}/analogy`);
  };

  return (
    <div style={{ padding: '10px', border: '1px solid #ccc', width: '300px', margin: 'auto' }}>
      <div style={{ textAlign: 'right', fontSize: '12px', marginBottom: '10px' }}>원본 보기</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <button onClick={handleGoBackToMain} style={{ padding: '5px 10px', border: '1px solid #000', background: '#fff', cursor: 'pointer' }}>
          ＜ 돌아가기
        </button>
        <button style={{ padding: '5px 10px', border: '1px solid #000', background: '#fff' }}>
          언론사
        </button>
      </div>
      <hr />
      <h2 style={{ marginBottom: '5px' }}>{article.title}</h2>
      <div style={{ fontSize: '14px', marginBottom: '5px' }}>{article.author}</div>
      <div style={{ fontSize: '12px', color: '#555', marginBottom: '10px' }}>
        입력 {article.입력시간} 수정 {article.수정시간}
      </div>
      <hr />
      {/* 비유 읽기 섹션에 클릭 이벤트 추가 */}
      <div
        style={{ fontWeight: 'bold', marginBottom: '10px', cursor: 'pointer' }} // cursor: 'pointer' 추가하여 클릭 가능한 느낌
        onClick={handleGoToAnalogy}
      >
        &lt; 비유 읽기
      </div>
      <div>
        {article.content.map((paragraph, index) => (
          <p key={index} style={{ marginBottom: '10px', lineHeight: '1.5' }}>
            {paragraph}
          </p>
        ))}
      </div>

      {/* 중첩 라우트가 렌더링될 위치 - Outlet 제거 */}
      {/* <Outlet /> */}

    </div>
  );
};

export default ArticleDetail; 