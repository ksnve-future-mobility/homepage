import SubHeader from "@/components/SubHeader";

export const metadata = {
  title: "미래모빌리티 토크 | 미래모빌리티 부문회",
};

export default function FutureMobilityTalkPage() {
  return (
    <main className="sub-shell">
      <SubHeader />

      <section className="board-hero talk-hero">
        <p>FUTURE MOBILITY TALK</p>
        <h1>미래모빌리티 토크</h1>
        <span>모빌리티 기술과 사람, 그리고 경험을 연결하는 전문가 온라인 오픈 토크입니다.</span>
      </section>
    </main>
  );
}
