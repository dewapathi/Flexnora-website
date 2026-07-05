export default function ItPartnership() {
  return (
    <section className="itp" id="itp" aria-labelledby="itp-h">
      <div className="container zi">
        <div className="itp-top">
          <div>
            <p className="lbl rv">Your Outsourced IT Department</p>
            <h2 id="itp-h" className="rv d1">
              We don&apos;t just build software.<br />
              <span className="g">We become your technology team.</span>
            </h2>
            <p className="rv d2" style={{ marginBottom: '32px' }}>
              Growing businesses shouldn&apos;t need to hire expensive in-house developers, manage HR,
              or worry about technology. Partner with FLEXNORA and get a complete, expert technology
              department — at a fraction of the cost.
            </p>
            <ul className="wl rv d3">
              <li className="wli"><i className="fa-solid fa-check"></i> No recruitment, no HR, no onboarding delays</li>
              <li className="wli"><i className="fa-solid fa-check"></i> Ready-to-work experts across every discipline</li>
              <li className="wli"><i className="fa-solid fa-check"></i> Scale your team up or down instantly</li>
              <li className="wli"><i className="fa-solid fa-check"></i> One partner for everything — from websites to AI</li>
              <li className="wli"><i className="fa-solid fa-check"></i> Continuous support — we don&apos;t disappear after launch</li>
            </ul>
            <div style={{ marginTop: '32px' }} className="rv d4">
              <a href="#cta-fin" className="btn btn-p">
                Book Free Consultation <i className="fa-solid fa-arrow-right"></i>
              </a>
            </div>
          </div>
          <div className="rv d2">
            <div style={{
              borderRadius: 'var(--r-lg)',
              background: 'linear-gradient(145deg,#0e0c2e,#0a1228)',
              border: '1px solid var(--border)',
              padding: '28px',
              position: 'relative',
              overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', inset: 0,
                backgroundImage: 'radial-gradient(rgba(99,102,241,0.06) 1px,transparent 1px)',
                backgroundSize: '22px 22px',
                pointerEvents: 'none',
              }}></div>
              <p className="lbl" style={{ marginBottom: '20px', position: 'relative' }}>Everything we cover</p>
              <div className="itp-cats" style={{ position: 'relative' }}>
                {[
                  { icon: 'fa-code', label: 'Software Development' },
                  { icon: 'fa-brands fa-aws', label: 'Cloud & Infrastructure' },
                  { icon: 'fa-robot', label: 'AI & Automation' },
                  { icon: 'fa-shield-halved', label: 'Security & Updates' },
                  { icon: 'fa-users', label: 'Dedicated Teams' },
                  { icon: 'fa-wrench', label: 'Managed IT Services' },
                  { icon: 'fa-chart-line', label: 'Performance & SEO' },
                  { icon: 'fa-headset', label: '24/7 Tech Support' },
                ].map((cat, i) => (
                  <div key={i} className="itp-cat">
                    <div className="itp-cat-ic"><i className={`fa-solid ${cat.icon}`}></i></div>
                    <div className="itp-cat-nm">{cat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="itp-cards">
          {[
            { icon: 'fa-user-slash', title: 'No Hiring Needed', desc: 'Skip the months-long recruitment process, interviews, and onboarding. Our experts are ready to start immediately.' },
            { icon: 'fa-layer-group', title: 'Full-Stack Coverage', desc: 'From frontend to backend, mobile to cloud, AI to security — one partner covers every layer of your technology.' },
            { icon: 'fa-arrows-up-down', title: 'Scale On Demand', desc: 'Need more developers for a big launch? Scaling down after? Adjust your team size instantly with no lock-in.' },
            { icon: 'fa-piggy-bank', title: 'Lower Cost', desc: 'Get senior-level expertise at a fraction of the cost of in-house hiring — no salaries, benefits, or equipment costs.' },
          ].map((card, i) => (
            <div key={i} className={`itp-card rv${i > 0 ? ` d${i}` : ''}`}>
              <div className="itp-card-ic"><i className={`fa-solid ${card.icon}`}></i></div>
              <h3>{card.title}</h3>
              <p>{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
