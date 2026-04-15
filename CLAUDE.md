@AGENTS.md

# ecwid-gdpr-cookie-consent — 프로젝트 메모

**Vercel URL**: https://ecwid-gdpr-cookie-consent.vercel.app  
**GitHub**: https://github.com/liveforownhappiness/ecwid-gdpr-cookie-consent

---

## 앱 구조

- `app/page.tsx` — 랜딩 페이지
- `app/dashboard/page.tsx` — 머천트 대시보드 (iframe)
- `app/api/oauth/callback/route.ts` — OAuth callback
- `app/api/config/route.ts` — 배너 설정 CRUD
- `app/api/banner/route.ts` — **핵심** 배너 JS 서빙 (머천트 스토어에 삽입)
- `app/privacy/page.tsx` — 개인정보처리방침
- `app/preview/page.tsx` — 스크린샷용 프리뷰

---

## 핵심 아키텍처

배너는 `/api/banner?store_id=xxx`에서 JS로 서빙됨.  
머천트는 아래 스크립트 태그를 스토어 footer에 붙여넣기:

```html
<script src="https://ecwid-gdpr-cookie-consent.vercel.app/api/banner?store_id=STORE_ID" defer></script>
```

→ 방문자가 동의/거부 시 `gdpr_consent_{storeId}` 쿠키 설정 (365일)

---

## 가격

- Free: 기본 배너 (색상, 텍스트, Accept/Decline)
- Pro $3.99/월: Google Consent Mode v2, 다국어, 통계, 커스텀 만료일

---

## 개발 주의사항

- git commit 시 `liveforownhappiness@gmail.com` 계정 사용
- Prisma 7: `prisma.config.ts`에서 datasource url 관리
