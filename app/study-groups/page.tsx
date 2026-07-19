import Image from "next/image";
import SubHeader from "@/components/SubHeader";

const studyGroups = [
  // {
  //   title: "(검토 중) 멀미 연구회",
  //   period: "2026.08 ~ 2027.12",
  //   topic: "전기차, 자율주행차 탑승객의 멀미 완화 기술 연구",
  //   secretary: "미정",
  //   affiliation: "",
  //   members: "",
  //   imageUrl: "/images/motion-sickness-study-group.png",
  // },
  {
    title: "ANC (Active Noise Control) 연구회",
    period: "2026.07 ~ ",
    topic: "능동소음제어 기술연구 및 성능 평가방법 국제표준개발 연구",
    secretary: "미정",
    affiliation: "",
    members: "",
    imageUrl: "/images/ANC-study-group.png",
    imageWidth: 1672,
    imageHeight: 941,
  },
  {
    title: "(검토 중) 버추얼개발 연구회",
    period: "2026.08 ~",
    topic: "시뮬레이션과 AI기반 버추얼 개발 기술 연구",
    secretary: "미정",
    affiliation: "",
    members: "",
    imageUrl: "/images/virtual-development-study-group.png",
  },
  {
    title: "(검토 중) 차량 오디오 연구회",
    period: "2026.08~",
    topic: "차량 오디오 시스템의 설계, 튜닝 및 음향 기술을 연구",
    secretary: "미정",
    affiliation: "",
    members: "",
    imageUrl: "/images/vehicle-audio-study-group.png",
  },
];

type StudyGroupStatus = "예정" | "운영 중" | "종료";

function getStudyGroupStatus(period: string): StudyGroupStatus {
  const monthTokens = [...period.matchAll(/(\d{4})\.(\d{2})/g)];
  if (monthTokens.length === 0) {
    return "운영 중";
  }

  const toMonthStart = (token: RegExpMatchArray) => new Date(Number(token[1]), Number(token[2]) - 1, 1);
  const now = new Date();
  const start = toMonthStart(monthTokens[0]);

  if (monthTokens.length >= 2) {
    const end = toMonthStart(monthTokens[1]);
    const endOfEndMonth = new Date(end.getFullYear(), end.getMonth() + 1, 0);
    if (now > endOfEndMonth) {
      return "종료";
    }
  }

  return now < start ? "예정" : "운영 중";
}

const statusBadgeClass: Record<StudyGroupStatus, string> = {
  예정: "study-badge-upcoming",
  "운영 중": "study-badge-active",
  종료: "study-badge-ended",
};

export const metadata = {
  title: "연구회 | 미래모빌리티 부문회",
};

export default function StudyGroupsPage() {
  return (
    <main className="sub-shell">
      <SubHeader />

      <section className="board-hero study-hero">
        <p>STUDY GROUP</p>
        <h1>연구회</h1>
        <span>
          관심 주제를 함께 연구하고 교류하기 위한 연구회입니다. 미래모빌리티 부문회 회원은 누구나 자유롭게 연구회에 참여할 수 있습니다.
        </span>
      </section>

      <section className="study-section" aria-label="연구회 목록">
        <div className="study-list">
          {studyGroups.map((group) => {
            const status = getStudyGroupStatus(group.period);

            return (
              <article className="study-card" key={group.title}>
                {group.imageUrl ? (
                  <div className="study-card-image">
                    <Image
                      src={group.imageUrl}
                      alt={`${group.title} 소개 이미지`}
                      width={group.imageWidth || 1536}
                      height={group.imageHeight || 1024}
                    />
                  </div>
                ) : null}
                <div className="study-card-main">
                  <div className="study-card-heading">
                    <h2>{group.title}</h2>
                    <span className={`study-badge ${statusBadgeClass[status]}`}>{status}</span>
                  </div>
                  <dl>
                    <div>
                      <dt>연구주제</dt>
                      <dd>{group.topic}</dd>
                    </div>
                    <div>
                      <dt>운영기간</dt>
                      <dd>{group.period}</dd>
                    </div>
                    <div>
                      <dt>간사</dt>
                      <dd>
                        {group.secretary}
                        <small>{group.affiliation}</small>
                      </dd>
                    </div>
                    {group.members ? (
                      <div>
                        <dt>회원</dt>
                        <dd>{group.members}</dd>
                      </div>
                    ) : null}
                  </dl>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
