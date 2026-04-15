import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// GET /api/banner?store_id=xxx
// 머천트 스토어에 삽입되는 쿠키 배너 JavaScript 반환
export async function GET(req: NextRequest) {
  const storeId = req.nextUrl.searchParams.get('store_id')
  if (!storeId) {
    return new NextResponse('// Missing store_id', {
      headers: { 'Content-Type': 'application/javascript' },
    })
  }

  const store = await prisma.store.findUnique({
    where: { storeId },
    include: { config: true },
  })

  if (!store?.config || !store.config.enabled) {
    return new NextResponse('// GDPR banner disabled', {
      headers: { 'Content-Type': 'application/javascript' },
    })
  }

  const c = store.config
  const isPro = store.plan === 'pro'

  // 배너 JS 생성 (인라인 — 외부 의존성 없음)
  const script = `
(function() {
  var COOKIE_KEY = 'gdpr_consent_${storeId}';
  var COOKIE_DAYS = 365;

  function getCookie(name) {
    var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return v ? v[2] : null;
  }

  function setCookie(name, value, days) {
    var d = new Date();
    d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = name + '=' + value + ';expires=' + d.toUTCString() + ';path=/;SameSite=Lax';
  }

  // 이미 동의한 경우 종료
  if (getCookie(COOKIE_KEY)) return;

  // 배너 HTML 삽입
  var banner = document.createElement('div');
  banner.id = 'gdpr-cookie-banner';
  banner.style.cssText = [
    'position:fixed',
    '${c.position === 'top' ? 'top:0' : 'bottom:0'}',
    'left:0',
    'right:0',
    'z-index:999999',
    'background:${c.bgColor}',
    'color:${c.textColor}',
    'padding:14px 20px',
    'display:flex',
    'align-items:center',
    'justify-content:space-between',
    'gap:12px',
    'flex-wrap:wrap',
    'font-family:-apple-system,BlinkMacSystemFont,sans-serif',
    'font-size:13px',
    'line-height:1.5',
    'box-shadow:0 -2px 10px rgba(0,0,0,0.15)',
  ].join(';');

  var msg = '${c.messageEn.replace(/'/g, "\\'")}';
  var policyUrl = '${c.policyUrl}';
  var policyLink = policyUrl ? ' <a href="' + policyUrl + '" style="color:${c.accentColor};text-decoration:underline;" target="_blank">Learn more</a>' : '';

  banner.innerHTML = [
    '<span style="flex:1;min-width:200px">' + msg + policyLink + '</span>',
    '<span style="display:flex;gap:8px;flex-shrink:0">',
    ${c.showDecline ? `'<button id="gdpr-decline" style="background:transparent;border:1px solid ${c.textColor};color:${c.textColor};padding:6px 14px;border-radius:4px;cursor:pointer;font-size:13px">${c.declineLabel}</button>',` : ''}
    '<button id="gdpr-accept" style="background:${c.accentColor};border:none;color:#fff;padding:6px 14px;border-radius:4px;cursor:pointer;font-size:13px;font-weight:600">${c.acceptLabel}</button>',
    '</span>',
  ].join('');

  document.body.appendChild(banner);

  function dismiss(value) {
    setCookie(COOKIE_KEY, value, COOKIE_DAYS);
    banner.remove();
    ${isPro && c.blockScripts ? `
    if (value === 'accepted') {
      // 동의 후 차단된 스크립트 실행
      document.querySelectorAll('script[data-gdpr-src]').forEach(function(s) {
        var ns = document.createElement('script');
        ns.src = s.getAttribute('data-gdpr-src');
        document.head.appendChild(ns);
        s.remove();
      });
    }` : ''}
  }

  document.getElementById('gdpr-accept').addEventListener('click', function() { dismiss('accepted'); });
  ${c.showDecline ? `document.getElementById('gdpr-decline').addEventListener('click', function() { dismiss('declined'); });` : ''}
})();
`.trim()

  return new NextResponse(script, {
    headers: {
      'Content-Type': 'application/javascript',
      'Cache-Control': 'public, max-age=300',
    },
  })
}
