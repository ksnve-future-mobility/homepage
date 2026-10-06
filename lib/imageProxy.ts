// 구글드라이브 이미지 주소를 우리 서버를 거쳐가는 주소로 바꿔준다.
// 방문자의 브라우저가 구글에 직접 요청하지 않게 되어, 방문자의 구글 로그인
// 상태(쿠키)로 인해 이미지가 깨지는 문제를 막아준다.

// 드라이브에서 "링크 복사"로 받는 주소는 뷰어 페이지 주소라 이미지 태그에 바로 쓸 수 없다.
// 구글시트에는 복사한 주소를 그대로 붙여넣고, 여기서 파일 ID를 뽑아 이미지 주소로 바꿔준다.
const DRIVE_FILE_ID_PATTERNS = [
  /\/file\/d\/([A-Za-z0-9_-]+)/, // https://drive.google.com/file/d/FILE_ID/view?usp=sharing
  /[?&]id=([A-Za-z0-9_-]+)/, // https://drive.google.com/open?id=FILE_ID, .../uc?id=FILE_ID
];

function toDriveImageUrl(url: string): string {
  // 이미 이미지로 쓸 수 있는 주소면 그대로 둔다.
  if (url.includes("drive.google.com/thumbnail")) {
    return url;
  }

  for (const pattern of DRIVE_FILE_ID_PATTERNS) {
    const fileId = url.match(pattern)?.[1];
    if (fileId) {
      return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1600`;
    }
  }

  return url;
}

export function toProxiedImageSrc(url: string): string {
  if (!url) {
    return url;
  }

  if (url.includes("drive.google.com")) {
    return `/api/image-proxy?url=${encodeURIComponent(toDriveImageUrl(url))}`;
  }

  if (url.includes("googleusercontent.com")) {
    return `/api/image-proxy?url=${encodeURIComponent(url)}`;
  }

  return url;
}
