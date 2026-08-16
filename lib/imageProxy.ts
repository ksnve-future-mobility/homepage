// 구글드라이브 이미지 주소를 우리 서버를 거쳐가는 주소로 바꿔준다.
// 방문자의 브라우저가 구글에 직접 요청하지 않게 되어, 방문자의 구글 로그인
// 상태(쿠키)로 인해 이미지가 깨지는 문제를 막아준다.
export function toProxiedImageSrc(url: string): string {
  if (!url) {
    return url;
  }

  if (url.includes("drive.google.com") || url.includes("googleusercontent.com")) {
    return `/api/image-proxy?url=${encodeURIComponent(url)}`;
  }

  return url;
}
