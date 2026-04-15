'use client'

import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'next/navigation'

interface BannerConfig {
  bgColor: string
  textColor: string
  accentColor: string
  position: string
  messageEn: string
  acceptLabel: string
  declineLabel: string
  policyUrl: string
  showDecline: boolean
  blockScripts: boolean
  enabled: boolean
}

const DEFAULT_CONFIG: BannerConfig = {
  bgColor: '#1f2937',
  textColor: '#f9fafb',
  accentColor: '#3b82f6',
  position: 'bottom',
  messageEn: 'We use cookies to improve your experience. By continuing, you agree to our cookie policy.',
  acceptLabel: 'Accept',
  declineLabel: 'Decline',
  policyUrl: '',
  showDecline: true,
  blockScripts: false,
  enabled: true,
}

export default function Dashboard() {
  const searchParams = useSearchParams()
  const storeId = searchParams.get('store_id') ?? ''

  const [config, setConfig] = useState<BannerConfig>(DEFAULT_CONFIG)
  const [plan, setPlan] = useState('free')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ro = new ResizeObserver(() => {
      window.parent.postMessage({ type: 'resize', height: document.body.scrollHeight }, '*')
    })
    if (containerRef.current) ro.observe(containerRef.current)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    if (!storeId) return
    fetch(`/api/config?store_id=${storeId}`)
      .then(r => r.json())
      .then(d => {
        if (d.config) setConfig({ ...DEFAULT_CONFIG, ...d.config })
        if (d.plan) setPlan(d.plan)
      })
  }, [storeId])

  function update<K extends keyof BannerConfig>(key: K, value: BannerConfig[K]) {
    setConfig(prev => ({ ...prev, [key]: value }))
  }

  async function save() {
    setSaving(true)
    setSaved(false)
    await fetch('/api/config', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ storeId, ...config }),
    })
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const snippetUrl = `https://ecwid-gdpr-cookie-consent.vercel.app/api/banner?store_id=${storeId}`
  const snippet = `<script src="${snippetUrl}" defer></script>`

  if (!storeId) {
    return <div className="p-8 text-center text-gray-500">Invalid access. Please install the app from the Ecwid App Market.</div>
  }

  return (
    <div ref={containerRef} className="max-w-3xl mx-auto p-6 space-y-8 bg-white min-h-screen">
      {/* Header */}
      <div className="border-b pb-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">GDPR Cookie Consent</h1>
          <p className="text-sm text-gray-500 mt-1">Customize your cookie consent banner for GDPR compliance.</p>
        </div>
        <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded font-medium">
          {plan === 'pro' ? 'Pro' : 'Free'}
        </span>
      </div>

      {/* Enable toggle */}
      <section className="flex items-center justify-between border rounded p-4">
        <div>
          <p className="font-medium text-gray-800 text-sm">Banner Status</p>
          <p className="text-xs text-gray-500 mt-0.5">Show or hide the cookie consent banner on your store</p>
        </div>
        <button
          onClick={() => update('enabled', !config.enabled)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${config.enabled ? 'bg-blue-600' : 'bg-gray-200'}`}
        >
          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${config.enabled ? 'translate-x-6' : 'translate-x-1'}`} />
        </button>
      </section>

      {/* Appearance */}
      <section className="space-y-4">
        <h2 className="font-medium text-gray-800">Appearance</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-gray-500 block mb-1">Position</label>
            <select
              value={config.position}
              onChange={e => update('position', e.target.value)}
              className="w-full border rounded px-3 py-2 text-sm"
            >
              <option value="bottom">Bottom</option>
              <option value="top">Top</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-500 block mb-1">Colors</label>
            <div className="flex items-center gap-2">
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5">
                  <input type="color" value={config.bgColor} onChange={e => update('bgColor', e.target.value)} className="w-8 h-7 rounded border cursor-pointer" />
                  <span className="text-xs text-gray-400">Background</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <input type="color" value={config.textColor} onChange={e => update('textColor', e.target.value)} className="w-8 h-7 rounded border cursor-pointer" />
                  <span className="text-xs text-gray-400">Text</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <input type="color" value={config.accentColor} onChange={e => update('accentColor', e.target.value)} className="w-8 h-7 rounded border cursor-pointer" />
                  <span className="text-xs text-gray-400">Button</span>
                </div>
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
          <textarea
            value={config.messageEn}
            onChange={e => update('messageEn', e.target.value)}
            rows={2}
            className="w-full border rounded px-3 py-2 text-sm"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-gray-500 block mb-1">Accept Button Label</label>
            <input
              type="text"
              value={config.acceptLabel}
              onChange={e => update('acceptLabel', e.target.value)}
              className="w-full border rounded px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="text-xs text-gray-500 block mb-1">Decline Button Label</label>
            <input
              type="text"
              value={config.declineLabel}
              onChange={e => update('declineLabel', e.target.value)}
              disabled={!config.showDecline}
              className="w-full border rounded px-3 py-2 text-sm disabled:opacity-40"
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="showDecline"
            checked={config.showDecline}
            onChange={e => update('showDecline', e.target.checked)}
            className="rounded"
          />
          <label htmlFor="showDecline" className="text-sm text-gray-600">Show Decline button</label>
        </div>
        <div>
          <label className="text-xs text-gray-500 block mb-1">Privacy Policy URL <span className="text-gray-400">(optional, adds "Learn more" link)</span></label>
          <input
            type="url"
            value={config.policyUrl}
            onChange={e => update('policyUrl', e.target.value)}
            placeholder="https://yourstore.com/privacy"
            className="w-full border rounded px-3 py-2 text-sm"
          />
        </div>
      </section>

      {/* Pro: Script Blocking */}
      <section className="border rounded p-4 space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-gray-800 text-sm">Script Blocking <span className="text-xs text-blue-600 font-normal ml-1">Pro</span></p>
            <p className="text-xs text-gray-500 mt-0.5">Block analytics scripts until the user gives consent (Google Consent Mode v2)</p>
          </div>
          <button
            onClick={() => plan === 'pro' && update('blockScripts', !config.blockScripts)}
            disabled={plan !== 'pro'}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${config.blockScripts && plan === 'pro' ? 'bg-blue-600' : 'bg-gray-200'} disabled:opacity-40`}
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${config.blockScripts && plan === 'pro' ? 'translate-x-6' : 'translate-x-1'}`} />
          </button>
        </div>
        {plan !== 'pro' && (
          <p className="text-xs text-gray-400">Upgrade to Pro to unlock script blocking.</p>
        )}
      </section>

      {/* Preview */}
      <section className="space-y-2">
        <h2 className="font-medium text-gray-800">Preview</h2>
        <div className="relative h-32 border rounded bg-gray-100 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center text-gray-300 text-sm">Your Store</div>
          <div
            className="absolute left-0 right-0 flex items-center justify-between gap-3 px-4 py-3 flex-wrap"
            style={{
              [config.position === 'top' ? 'top' : 'bottom']: 0,
              backgroundColor: config.bgColor,
              color: config.textColor,
            }}
          >
            <span className="text-xs flex-1 min-w-0 truncate">{config.messageEn}</span>
            <span className="flex gap-2 flex-shrink-0">
              {config.showDecline && (
                <span className="text-xs px-2 py-1 rounded border" style={{ borderColor: config.textColor, color: config.textColor }}>{config.declineLabel}</span>
              )}
              <span className="text-xs px-2 py-1 rounded font-semibold text-white" style={{ backgroundColor: config.accentColor }}>{config.acceptLabel}</span>
            </span>
          </div>
        </div>
      </section>

      {/* Save */}
      <button
        onClick={save}
        disabled={saving}
        className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {saving ? 'Saving…' : saved ? 'Saved!' : 'Save Settings'}
      </button>

      {/* Install Instructions */}
      <section className="border rounded p-5 bg-gray-50 space-y-3">
        <h3 className="font-medium text-gray-800">Install the Banner</h3>
        <p className="text-sm text-gray-500">
          Paste this script tag into your Ecwid store&apos;s custom footer HTML
          (<strong>Settings → Design → Custom JavaScript</strong> or the store footer field):
        </p>
        <div className="bg-gray-900 rounded p-3 overflow-x-auto">
          <code className="text-xs text-green-400 whitespace-nowrap">{snippet}</code>
        </div>
        <button
          onClick={() => navigator.clipboard.writeText(snippet)}
          className="text-xs text-blue-600 hover:underline"
        >
          Copy to clipboard
        </button>
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
        <a
          href={`https://50×10.lemonsqueezy.com/checkout/buy/a828b8a0-cf9f-40ee-9d63-575d18133180?checkout[custom][store_id]=${storeId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-2 px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
        >
          Upgrade to Pro
        </a>
      </section>
    </div>
  )
}
