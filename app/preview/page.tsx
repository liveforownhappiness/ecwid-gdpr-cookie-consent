// 스크린샷용 프리뷰 페이지 — 목데이터로 실제 대시보드 UI 렌더링

const MOCK_CONFIG = {
  bgColor: '#1f2937',
  textColor: '#f9fafb',
  accentColor: '#3b82f6',
  position: 'bottom',
  messageEn: 'We use cookies to improve your experience. By continuing, you agree to our cookie policy.',
  acceptLabel: 'Accept',
  declineLabel: 'Decline',
  showDecline: true,
  policyUrl: 'https://yourstore.com/privacy',
}

const snippet = `<script src="https://ecwid-gdpr-cookie-consent.vercel.app/api/banner?store_id=12345" defer></script>`

export default function PreviewPage() {
  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8 bg-white min-h-screen">
      {/* Header */}
      <div className="border-b pb-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">GDPR Cookie Consent</h1>
          <p className="text-sm text-gray-500 mt-1">Customize your cookie consent banner for GDPR compliance.</p>
        </div>
        <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded font-medium">Free</span>
      </div>

      {/* Enable toggle */}
      <section className="flex items-center justify-between border rounded p-4">
        <div>
          <p className="font-medium text-gray-800 text-sm">Banner Status</p>
          <p className="text-xs text-gray-500 mt-0.5">Show or hide the cookie consent banner on your store</p>
        </div>
        <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600">
          <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6" />
        </div>
      </section>

      {/* Appearance */}
      <section className="space-y-4">
        <h2 className="font-medium text-gray-800">Appearance</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-gray-500 block mb-1">Position</label>
            <select disabled defaultValue="bottom" className="w-full border rounded px-3 py-2 text-sm bg-gray-50 text-gray-700">
              <option value="bottom">Bottom</option>
              <option value="top">Top</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-500 block mb-1">Colors</label>
            <div className="space-y-1">
              <div className="flex items-center gap-1.5">
                <div className="w-8 h-7 rounded border" style={{ backgroundColor: MOCK_CONFIG.bgColor }} />
                <span className="text-xs text-gray-400">Background</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-8 h-7 rounded border bg-gray-50" style={{ backgroundColor: MOCK_CONFIG.textColor }} />
                <span className="text-xs text-gray-400">Text</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-8 h-7 rounded border" style={{ backgroundColor: MOCK_CONFIG.accentColor }} />
                <span className="text-xs text-gray-400">Button</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="space-y-3">
        <h2 className="font-medium text-gray-800">Banner Text</h2>
        <div>
          <label className="text-xs text-gray-500 block mb-1">Message</label>
          <div className="w-full border rounded px-3 py-2 text-sm bg-gray-50 text-gray-700">{MOCK_CONFIG.messageEn}</div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-gray-500 block mb-1">Accept Button Label</label>
            <div className="w-full border rounded px-3 py-2 text-sm bg-gray-50 text-gray-700">{MOCK_CONFIG.acceptLabel}</div>
          </div>
          <div>
            <label className="text-xs text-gray-500 block mb-1">Decline Button Label</label>
            <div className="w-full border rounded px-3 py-2 text-sm bg-gray-50 text-gray-700">{MOCK_CONFIG.declineLabel}</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded border-2 border-blue-600 bg-blue-600 flex items-center justify-center">
            <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 12 12"><path d="M10 3L5 8.5 2 5.5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/></svg>
          </div>
          <span className="text-sm text-gray-600">Show Decline button</span>
        </div>
        <div>
          <label className="text-xs text-gray-500 block mb-1">Privacy Policy URL</label>
          <div className="w-full border rounded px-3 py-2 text-sm bg-gray-50 text-gray-400">{MOCK_CONFIG.policyUrl}</div>
        </div>
      </section>

      {/* Preview */}
      <section className="space-y-2">
        <h2 className="font-medium text-gray-800">Preview</h2>
        <div className="relative h-36 border rounded bg-gray-100 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center text-gray-300 text-sm">Your Store</div>
          <div
            className="absolute left-0 right-0 bottom-0 flex items-center justify-between gap-3 px-4 py-3 flex-wrap"
            style={{ backgroundColor: MOCK_CONFIG.bgColor, color: MOCK_CONFIG.textColor }}
          >
            <span className="text-xs flex-1">{MOCK_CONFIG.messageEn} <span style={{ color: MOCK_CONFIG.accentColor, textDecoration: 'underline' }}>Learn more</span></span>
            <span className="flex gap-2 flex-shrink-0">
              <span className="text-xs px-2 py-1 rounded border" style={{ borderColor: MOCK_CONFIG.textColor, color: MOCK_CONFIG.textColor }}>{MOCK_CONFIG.declineLabel}</span>
              <span className="text-xs px-2 py-1 rounded font-semibold text-white" style={{ backgroundColor: MOCK_CONFIG.accentColor }}>{MOCK_CONFIG.acceptLabel}</span>
            </span>
          </div>
        </div>
      </section>

      {/* Install Instructions */}
      <section className="border rounded p-5 bg-gray-50 space-y-3">
        <h3 className="font-medium text-gray-800">Install the Banner</h3>
        <p className="text-sm text-gray-500">
          Paste this script tag into your Ecwid store&apos;s custom footer HTML:
        </p>
        <div className="bg-gray-900 rounded p-3 overflow-x-auto">
          <code className="text-xs text-green-400 whitespace-nowrap">{snippet}</code>
        </div>
      </section>

      {/* Upgrade CTA */}
      <section className="border rounded p-5 bg-gray-50 space-y-2">
        <h3 className="font-medium text-gray-800">Upgrade to Pro — $3.99/mo</h3>
        <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
          <li>Google Consent Mode v2 — block scripts until user consents</li>
          <li>Multi-language banners (auto-detect visitor language)</li>
          <li>Consent analytics dashboard</li>
          <li>Custom cookie expiry duration</li>
        </ul>
        <button className="mt-2 px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
          Upgrade to Pro
        </button>
      </section>
    </div>
  )
}
