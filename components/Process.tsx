const steps = [
  { num: '01', icon: 'fa-comments', title: 'Discovery', desc: 'Deep dive into your goals, audience, and landscape — defining exactly what we\'re building and why it matters.', delay: '' },
  { num: '02', icon: 'fa-map', title: 'Design', desc: 'Wireframes and high-fidelity prototypes — reviewed and approved before a single line of code is written.', delay: 'd1' },
  { num: '03', icon: 'fa-code', title: 'Development', desc: 'Sprint-based development with weekly demos. Clean architecture, performance optimization, and thorough QA testing.', delay: 'd2' },
  { num: '04', icon: 'fa-rocket', title: 'Launch & Scale', desc: 'Seamless deployment, zero downtime. Post-launch monitoring, support, and iteration based on real user data.', delay: 'd3' },
];

export default function Process() {
  return (
    <section id="process" aria-labelledby="proc-h">
      <div className="container zi">
        <div className="sec-hd">
          <p className="lbl">How we work</p>
          <h2 id="proc-h" className="rv">
            Your journey from<br /><span className="g">idea to launch.</span>
          </h2>
          <p className="rv d1">
            A clear, repeatable process that keeps projects on track and stakeholders aligned at every step.
          </p>
        </div>
        <div className="ps">
          {steps.map((s, i) => (
            <div key={i} className={`pstep rv${s.delay ? ` ${s.delay}` : ''}`}>
              <div className="pn">{s.num}</div>
              <div className="pic"><i className={`fa-solid ${s.icon}`}></i></div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
