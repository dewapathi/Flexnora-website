import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy – Ball Sort Game | FLEXNORA Digital',
  description: 'Privacy Policy for Ball Sort Game by FLEXNORA Digital.',
};

export default function PrivacyPolicy() {
  return (
    <>
      <style>{`
        *{margin:0;padding:0;box-sizing:border-box;}
        body{font-family:'Inter',system-ui,sans-serif;background:#0f172a;color:#f1f5f9;line-height:1.8;}
        header{background:#020617;border-bottom:1px solid #1e293b;padding:16px 0;}
        .container{max-width:800px;margin:0 auto;padding:0 24px;}
        header .container{display:flex;align-items:center;gap:12px;}
        header img{height:36px;}
        header a{color:#f1f5f9;text-decoration:none;font-weight:600;font-size:1.1rem;}
        main{padding:60px 0;}
        h1{font-size:2rem;font-weight:700;margin-bottom:8px;color:#fff;}
        .subtitle{color:#94a3b8;margin-bottom:40px;font-size:0.95rem;}
        h2{font-size:1.15rem;font-weight:600;color:#3b82f6;margin:36px 0 10px;}
        p{color:#cbd5e1;margin-bottom:12px;}
        ul{color:#cbd5e1;padding-left:20px;margin-bottom:12px;}
        ul li{margin-bottom:6px;}
        a.link{color:#3b82f6;text-decoration:none;}
        a.link:hover{text-decoration:underline;}
        footer{text-align:center;padding:32px 24px;color:#475569;font-size:0.85rem;border-top:1px solid #1e293b;}
      `}</style>

      <header>
        <div className="container">
          <Link href="/">
            <img src="/images/logo1.png" alt="FLEXNORA" />
          </Link>
          <Link href="/">FLEXNORA Digital</Link>
        </div>
      </header>

      <main>
        <div className="container">
          <h1>Privacy Policy</h1>
          <p className="subtitle">Ball Sort Game &nbsp;·&nbsp; Last updated: June 5, 2025</p>

          <p>
            This Privacy Policy describes how FLEXNORA Digital (&ldquo;we&rdquo;, &ldquo;us&rdquo;,
            or &ldquo;our&rdquo;) handles information in connection with the Ball Sort Game mobile
            application (&ldquo;the App&rdquo;).
          </p>

          <h2>Information We Collect</h2>
          <p>
            The App itself does not collect any personally identifiable information directly. However,
            the App uses third-party services that may collect information used to identify you.
          </p>

          <h2>Third-Party Services</h2>
          <p>
            The App uses <strong>Google AdMob</strong> to display advertisements. AdMob may collect
            device identifiers, IP addresses, and usage data to serve personalised ads. Please review
            Google&apos;s Privacy Policy for more information:
          </p>
          <ul>
            <li>
              <a className="link" href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
                Google Privacy Policy
              </a>
            </li>
            <li>
              <a className="link" href="https://support.google.com/admob/answer/6128543" target="_blank" rel="noopener noreferrer">
                AdMob – How it works
              </a>
            </li>
          </ul>

          <h2>Advertising</h2>
          <p>
            Advertisements in the App are provided by Google AdMob. AdMob uses the advertising ID on
            your device to show relevant ads. You can opt out of personalised advertising in your
            device settings:
          </p>
          <ul>
            <li><strong>Android:</strong> Settings → Google → Ads → Opt out of Ads Personalisation</li>
            <li><strong>iOS:</strong> Settings → Privacy → Tracking → disable &ldquo;Allow Apps to Request to Track&rdquo;</li>
          </ul>

          <h2>Data Retention</h2>
          <p>
            We do not store any personal data on our servers. Any data collected by third-party
            services (such as AdMob) is governed by their respective privacy policies.
          </p>

          <h2>Children&apos;s Privacy</h2>
          <p>
            The App is not directed at children under the age of 13. We do not knowingly collect
            personal information from children under 13. If you believe your child has provided
            personal information, please contact us so we can take appropriate action.
          </p>

          <h2>Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Changes will be reflected by updating
            the &ldquo;Last updated&rdquo; date at the top of this page. Continued use of the App
            after any changes constitutes your acceptance of the new policy.
          </p>

          <h2>Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us at:</p>
          <p>
            <a className="link" href="mailto:info@flexnora.com">info@flexnora.com</a>
          </p>
          <p>
            FLEXNORA Digital<br />flexnora.com
          </p>
        </div>
      </main>

      <footer>&copy; 2025 FLEXNORA Digital. All rights reserved.</footer>
    </>
  );
}
