const roles = [
  { icon: 'fa-display', label: 'Frontend Developer' },
  { icon: 'fa-server', label: 'Backend Developer' },
  { icon: 'fa-code-branch', label: 'Full Stack Developer' },
  { icon: 'fa-mobile-screen', label: 'Mobile Developer' },
  { icon: 'fa-brands fa-figma', label: 'UI/UX Designer' },
  { icon: 'fa-vial', label: 'QA Engineer' },
  { icon: 'fa-gear', label: 'DevOps Engineer' },
  { icon: 'fa-brain', label: 'AI Engineer' },
  { icon: 'fa-brands fa-aws', label: 'Cloud Engineer' },
];

const engagements = [
  { icon: 'fa-clock', label: 'Full Time · 160 hrs/mo' },
  { icon: 'fa-hourglass-half', label: 'Part Time · 80 hrs/mo' },
  { icon: 'fa-list-check', label: 'Project Based' },
  { icon: 'fa-users', label: 'Dedicated Team' },
  { icon: 'fa-handshake', label: 'Long-Term Contract' },
];

export default function HireDevelopers() {
  return (
    <section className="hire-sec" id="hire" aria-labelledby="hire-h">
      <div className="container zi">
        <div className="hire-top">
          <div>
            <p className="lbl rv">Dedicated developers</p>
            <h2 id="hire-h" className="rv d1">
              Hire expert developers<br /><span className="g">that work as your own.</span>
            </h2>
            <p className="rv d2" style={{ marginBottom: '28px' }}>
              Need a specific expert embedded in your team? Hire dedicated developers from FLEXNORA —
              they integrate seamlessly with your workflow, communicate on your channels, and deliver
              as if they&apos;re sitting in your office.
            </p>
            <ul className="wl rv d3">
              <li className="wli"><i className="fa-solid fa-check"></i>Start within 48 hours — no long recruitment cycles</li>
              <li className="wli"><i className="fa-solid fa-check"></i>Deeply vetted engineers with proven track records</li>
              <li className="wli"><i className="fa-solid fa-check"></i>Flexible engagement — part-time, full-time, or project-based</li>
              <li className="wli"><i className="fa-solid fa-check"></i>Daily standups, your tools, your timezone</li>
            </ul>
            <div style={{ marginTop: '32px' }} className="rv d4">
              <a href="#contact" className="btn btn-p">
                Hire a Developer <i className="fa-solid fa-arrow-right"></i>
              </a>
            </div>
          </div>
          <div className="role-grid rv d2">
            {roles.map((r, i) => (
              <div key={i} className="role-card">
                <div className="role-ic"><i className={`fa-solid ${r.icon}`}></i></div>
                <div className="role-nm">{r.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="eng-wrap rv">
          <p className="lbl" style={{ marginBottom: '8px' }}>Engagement models</p>
          <h3 style={{ marginBottom: '6px' }}>Work the way that suits your business.</h3>
          <p style={{ maxWidth: '580px', margin: '0 auto 20px' }}>
            From a few hours a week to a fully embedded full-time team — we flex to your needs.
          </p>
          <div className="eng-types">
            {engagements.map((e, i) => (
              <div key={i} className="eng-type">
                <i className={`fa-solid ${e.icon}`}></i>{e.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
