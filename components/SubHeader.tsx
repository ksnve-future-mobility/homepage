import Image from "next/image";
import Link from "next/link";

export default function SubHeader() {
  return (
    <header className="sub-header">
      <Link className="sub-logo" href="/" aria-label="홈으로 이동">
        <Image
          className="sub-society-logo"
          src="/images/ksnve_logo_wide.png"
          alt="한국소음진동공학회"
          width={2918}
          height={571}
        />
        <Image
          className="sub-division-logo"
          src="/images/division-logo.png"
          alt="미래모빌리티 부문회"
          width={1644}
          height={524}
        />
      </Link>
      <Link className="home-button" href="/">Home</Link>
    </header>
  );
}
