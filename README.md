# KSNVE Future Mobility Division

한국소음진동공학회 미래모빌리티 부문회 홈페이지입니다.

## 운영 구조

- 홈페이지 코드는 GitHub 저장소에 보관합니다.
- 공개 배포는 Vercel을 사용합니다.
- 공지사항은 Google Sheets에서 관리하고 홈페이지가 자동으로 읽어옵니다.

## Google Sheets 공지사항 형식

첫 번째 시트의 1행에는 아래 컬럼을 순서대로 넣습니다.

| date | tag | title | link | visible |
| --- | --- | --- | --- | --- |
| 2026.07.15 | 공지 | 미래모빌리티 부문위원회 홈페이지를 준비 중입니다. |  | TRUE |
| 2026.07.10 | 안내 | 2026년도 부문위원회 활동 계획 안내 |  | TRUE |

- `date`: 홈페이지에 표시할 날짜입니다.
- `tag`: 공지, 안내, 행사처럼 짧은 분류를 넣습니다.
- `title`: 공지사항 제목입니다.
- `link`: 연결할 주소가 있으면 넣고, 없으면 비워둡니다.
- `visible`: 숨기려면 `FALSE` 또는 `NO`를 넣습니다. 비워두거나 `TRUE`면 표시됩니다.

## Google Sheets 연결 방법

1. Google Sheets에서 `파일 > 공유 > 웹에 게시`를 선택합니다.
2. 형식은 `쉼표로 구분된 값(.csv)`를 선택합니다.
3. 생성된 CSV 주소를 복사합니다.
4. Vercel 프로젝트의 Environment Variables에 아래 값을 추가합니다.

```text
NOTICES_CSV_URL=복사한_Google_Sheets_CSV_주소
```

환경값을 넣지 않으면 홈페이지에는 기본 임시 공지사항이 표시됩니다.

## 개발 및 확인

```bash
npm install
npm run dev
npm run build
```

로컬 확인 주소는 보통 `http://localhost:3000`입니다.

## 배포 흐름

1. GitHub에 새 저장소를 만듭니다.
2. 이 프로젝트 코드를 저장소에 올립니다.
3. Vercel에서 해당 GitHub 저장소를 가져옵니다.
4. Environment Variables에 `NOTICES_CSV_URL`을 추가합니다.
5. Vercel에서 배포하면 공개 주소가 생성됩니다.

추후 학회 도메인을 연결하려면 Vercel의 Domains 메뉴에서 예를 들어 `futuremobility.ksnve.or.kr` 같은 서브도메인을 연결하면 됩니다.
