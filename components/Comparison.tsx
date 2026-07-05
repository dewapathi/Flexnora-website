const bad = [
  'High developer salaries ($60k–$150k/yr)',
  'Months of recruitment & interviews',
  'Expensive onboarding & training',
  'Annual leave & sick days affect delivery',
  'Equipment, software, and licenses costs',
  'HR management & employment compliance',
  'Limited to one or two skill sets',
  'Knowledge lost when staff leave',
];

const good = [
  'Predictable monthly investment',
  'Ready-to-work experts, start within days',
  'No onboarding — we hit the ground running',
  'Continuous delivery, no interruptions',
  'No overhead costs whatsoever',
  'Zero HR burden — we handle everything',
  'Full team: dev, design, cloud, AI, QA',
  'Institutional knowledge stays with your system',
];

export default function Comparison() {
  return (
    <section className="cmp-sec" id="compare" aria-labelledby="cmp-h">
      <div className="container zi">
        <div className="sec-hd">
          <p className="lbl">The smarter choice</p>
          <h2 id="cmp-h" className="rv">
            Hiring internally vs<br /><span className="g">partnering with FLEXNORA.</span>
          </h2>
          <p className="rv d1">
            The numbers speak for themselves. See why smart businesses outsource their technology.
          </p>
        </div>
        <div className="cmp-wrap rv d1">
          <div className="cmp-col">
            <div className="cmp-head">
              <div className="cmp-head-ttl">
                <span className="cmp-dot r"></span>Traditional In-House Hiring
              </div>
              <div className="cmp-head-sub">The expensive, slow, and unpredictable way</div>
            </div>
            {bad.map((row, i) => (
              <div key={i} className="cmp-row">
                <div className="cmp-ic n"><i className="fa-solid fa-xmark"></i></div>
                {row}
              </div>
            ))}
          </div>
          <div className="cmp-col good">
            <div className="cmp-head">
              <div className="cmp-head-ttl">
                <span className="cmp-dot g"></span>FLEXNORA Technology Partner
              </div>
              <div className="cmp-head-sub">The smart, scalable, and cost-effective way</div>
            </div>
            {good.map((row, i) => (
              <div key={i} className="cmp-row">
                <div className="cmp-ic y"><i className="fa-solid fa-check"></i></div>
                {row}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
