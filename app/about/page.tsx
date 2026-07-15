const introParagraphs = [
  "전동화, 자율주행, SDV, PBV, UAM 등 미래 모빌리티 기술이 빠르게 확산되면서, 소음·진동·음향 분야의 연구 범위도 전통적인 차량 중심 NVH를 넘어 다양한 모빌리티 환경으로 점차 확대되고 있습니다.",
  "차량 소음·진동·음향 분야에서는 소음과 진동을 저감하는 전통적인 NVH 기술을 넘어, AI 활용 기술, 자율주행 환경에서의 탑승자 경험, SDV 기반 소음·진동·음향 기술, 감성 품질, 사용자 경험(UX), HMI/HCI 등 관련 연구 분야의 중요성이 더욱 증대되고 있습니다.",
  "특히 미래 모빌리티 환경에서는 인간공학, 의공학, 소프트웨어 및 데이터 기반 기술, HCI, 나아가 예술 분야까지 다양한 영역이 소음·진동·음향 연구와 긴밀하게 연결되고 있습니다. 또한 가상 개발 및 검증 기술이 고도화되면서, 개발 초기 단계부터 소음·진동·음향 성능과 사용자 경험을 통합적으로 예측하고 평가하는 접근의 중요성도 커지고 있습니다. 이에 따라 다양한 학문 분야와 기술 영역의 전문성을 연계하는 다학제적 접근과 융합연구가 더욱 중요해지고 있습니다.",
  "미래모빌리티 부문회는 이러한 변화에 대응하여, 기존 NVH 연구의 전문성을 바탕으로 미래 모빌리티 환경에서 요구되는 다학제 연구와 융합연구를 활성화하고, 산학연 협력과 국내외 연구자 교류를 체계적으로 추진하기 위해 신설되었습니다.",
  "학술대회 기획세션, 정기 세미나, 워크숍, 국내외 연구자 교류 등을 통해 미래 모빌리티 소음·진동·음향 분야의 연구 주제를 발굴하고, 관련 분야 연구자들과 지속적인 논의와 협력을 만들어가고자 합니다.",
];

const committeeMembers = [
  { role: "부문회장", name: "김성현", affiliation: "현대자동차" },
  { role: "부회장", name: "김용대", affiliation: "현대자동차" },
  { role: "부회장", name: "문소연", affiliation: "하만인터내셔널" },
  { role: "부회장", name: "정은주", affiliation: "이화여자대학교" },
  { role: "이사", name: "곽기욱", affiliation: "비햅틱스" },
  { role: "이사", name: "곽규열", affiliation: "현대로템(주)" },
  { role: "이사", name: "김성영", affiliation: "KAIST" },
  { role: "이사", name: "김용훈", affiliation: "한국타이어" },
  { role: "이사", name: "김진균", affiliation: "경희대학교" },
  { role: "이사", name: "김중관", affiliation: "한서대학교" },
  { role: "이사", name: "박당희", affiliation: "현대자동차" },
  { role: "이사", name: "안지훈", affiliation: "라온엑스솔루션즈" },
  { role: "이사", name: "이동주", affiliation: "QNX" },
  { role: "이사", name: "이정환", affiliation: "뮬러비비엠코리아" },
  { role: "이사", name: "이정환", affiliation: "하만인터내셔널" },
  { role: "이사", name: "이효진", affiliation: "방재시험연구원" },
  { role: "이사", name: "정정호", affiliation: "방재시험연구원" },
  { role: "이사", name: "조정현", affiliation: "현대자동차" },
  { role: "(대외협력)이사", name: "M. Ercan Altinsoy", affiliation: "드레스덴공과대학교" },
  { role: "(대외협력)이사", name: "Katsuya Yamauchi", affiliation: "큐슈대학교" },
];

export const metadata = {
  title: "부문회 및 임원진 소개 | 미래모빌리티 부문회",
};

export default function AboutPage() {
  return (
    <main className="sub-shell">
      <header className="sub-header">
        <a className="sub-logo" href="/" aria-label="홈으로 이동">
          <img src="/images/ksnve_logo_wide.png" alt="한국소음진동공학회" />
          <span>미래모빌리티 부문회</span>
        </a>
        <a className="home-button" href="/">Home</a>
      </header>

      <section className="board-hero about-hero">
        <p>DIVISION & COMMITTEE</p>
        <h1>부문회 및 임원진 소개</h1>
        <span>미래 모빌리티 소음·진동·음향 분야의 다학제 연구와 산학연 교류를 이끌어갑니다.</span>
      </section>

      <section className="about-section" aria-labelledby="division-intro-title">
        <div className="section-title">
          <span>01</span>
          <h2 id="division-intro-title">부문회 소개</h2>
        </div>
        <div className="intro-copy">
          {introParagraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className="about-section committee-section" aria-labelledby="committee-title">
        <div className="section-title">
          <span>02</span>
          <h2 id="committee-title">2026년 임원진</h2>
        </div>
        <div className="committee-table" role="table" aria-label="2026년 임원진">
          <div className="committee-row committee-head" role="row">
            <span role="columnheader">구분</span>
            <span role="columnheader">성명</span>
            <span role="columnheader">소속</span>
          </div>
          {committeeMembers.map((member) => (
            <div className="committee-row" role="row" key={`${member.role}-${member.name}-${member.affiliation}`}>
              <span role="cell">{member.role}</span>
              <strong role="cell">{member.name}</strong>
              <span role="cell">{member.affiliation}</span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
