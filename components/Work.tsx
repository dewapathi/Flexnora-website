const projects = [
  {
    bg: 'linear-gradient(135deg,#1e1b4b,#312e81)',
    overlay: 'linear-gradient(135deg,rgba(99,102,241,0.4),rgba(139,92,246,0.2))',
    tag: 'Web App',
    icon: 'fa-globe',
    title: 'High-Converting Websites',
    desc: 'Fast, SEO-optimized landing pages that turn visitors into customers — built for speed and results.',
    tags: ['Next.js', 'Tailwind', 'SEO'],
    delay: '',
  },
  {
    bg: 'linear-gradient(135deg,#0c1a2e,#0f2d4a)',
    overlay: 'linear-gradient(135deg,rgba(6,182,212,0.3),rgba(99,102,241,0.2))',
    tag: 'SaaS Platform',
    icon: 'fa-layer-group',
    title: 'Admin Dashboards & SaaS',
    desc: 'Complex data interfaces designed to be powerful and intuitive at the same time — scalable architecture included.',
    tags: ['React', 'Django', 'PostgreSQL'],
    delay: 'd1',
  },
  {
    bg: 'linear-gradient(135deg,#0a1f1a,#0d2c22)',
    overlay: 'linear-gradient(135deg,rgba(16,185,129,0.3),rgba(6,182,212,0.2))',
    tag: 'Mobile',
    icon: 'fa-mobile-screen',
    title: 'Production Mobile Apps',
    desc: 'Cross-platform apps with native performance, published to App Store and Google Play — including AdMob monetization.',
    tags: ['Flutter', 'Firebase', 'AdMob'],
    delay: 'd2',
  },
];

export default function Work() {
  return (
    <section className="wk" id="work" aria-labelledby="wk-h">
      <div className="container zi">
        <div className="sec-hd">
          <p className="lbl">Our work</p>
          <h2 id="wk-h" className="rv">
            Selected <span className="g">Projects.</span>
          </h2>
          <p className="rv d1">
            A curated look at what we build. Every project starts with a real problem — we make it
            beautiful and make it work.
          </p>
        </div>
        <div className="wkg">
          {projects.map((p, i) => (
            <div key={i} className={`wkc rv${p.delay ? ` ${p.delay}` : ''}`}>
              <div className="wkt" style={{ background: p.bg }}>
                <div className="wktb" style={{ background: p.overlay }}></div>
                <div className="wktt">{p.tag}</div>
                <div className="wkti"><i className={`fa-solid ${p.icon}`}></i></div>
              </div>
              <div className="wkb">
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
                <div className="wktags">
                  {p.tags.map((t) => <span key={t} className="wtag">{t}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
