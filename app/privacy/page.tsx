export default function PrivacyPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-12 bg-white min-h-screen">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Privacy Policy</h1>
      <p className="text-sm text-gray-400 mb-10">Last updated: April 15, 2026</p>

      <div className="space-y-8 text-sm text-gray-600 leading-relaxed">
        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-2">1. Introduction</h2>
          <p>
            liveforownhappiness ("we", "our", "us") operates GDPR Cookie Consent for Ecwid and other
            applications on the Shopify, BigCommerce, Wix, Ecwid, and WooCommerce platforms.
            This Privacy Policy explains how we collect, use, and protect information when you
            use our apps and services.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-2">2. Information We Collect</h2>
          <ul className="list-disc list-inside space-y-1 text-gray-500">
            <li>Store information (store ID, access token) provided during app installation</li>
            <li>Banner configuration settings you create in the dashboard</li>
            <li>Cookie consent events from your store visitors (accepted/declined, anonymized)</li>
            <li>Technical data including browser type and device information</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-2">3. How We Use Your Information</h2>
          <ul className="list-disc list-inside space-y-1 text-gray-500">
            <li>To serve the configured cookie consent banner to your store visitors</li>
            <li>To store and retrieve your banner customization settings</li>
            <li>To provide consent analytics (Pro plan)</li>
            <li>To improve our apps and develop new features</li>
            <li>To comply with legal obligations</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-2">4. Data Sharing</h2>
          <p>
            We do not sell, trade, or rent your personal information to third parties.
            We may share data with service providers (Vercel hosting, Neon database)
            solely to operate our apps. All third-party providers are bound by data protection agreements.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-2">5. Data Storage & Security</h2>
          <p>
            Your data is stored securely using industry-standard encryption. We use PostgreSQL
            databases hosted on Neon with automatic backups. Access to personal data is restricted
            to authorized personnel only.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-2">6. Data Retention</h2>
          <p>
            We retain your data for as long as your app is installed and active. Upon uninstallation,
            we delete your store data within 30 days unless retention is required by law.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-2">7. Your Rights</h2>
          <ul className="list-disc list-inside space-y-1 text-gray-500">
            <li>Access the personal data we hold about you</li>
            <li>Request correction of inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Withdraw consent at any time by uninstalling the app</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-2">8. Ecwid Platform</h2>
          <p>
            Our app operates within the Ecwid ecosystem. Your use of Ecwid is governed by
            Ecwid&apos;s own privacy policy. We only access data permitted by the scopes you
            authorize during installation via Ecwid OAuth 2.0.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-2">9. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Changes will be posted
            on this page with an updated revision date.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-2">10. Contact</h2>
          <p>
            If you have questions about this Privacy Policy, contact us at:{' '}
            <a href="mailto:liveforownhappiness@gmail.com" className="text-blue-600 hover:underline">
              liveforownhappiness@gmail.com
            </a>
          </p>
        </section>
      </div>
    </main>
  )
}
