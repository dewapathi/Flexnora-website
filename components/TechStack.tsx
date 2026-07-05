const stack = [
  { icon: 'fa-brands fa-react', color: '#61dafb', label: 'React' },
  { icon: 'fa-solid fa-n', color: '#fff', label: 'Next.js' },
  { icon: 'fa-solid fa-mobile', color: '#54c5f8', label: 'Flutter' },
  { icon: 'fa-brands fa-react', color: '#61dafb', label: 'React Native' },
  { icon: 'fa-brands fa-python', color: '#ffd43b', label: 'Python' },
  { icon: 'fa-solid fa-server', color: '#44b78b', label: 'Django' },
  { icon: 'fa-brands fa-node-js', color: '#83cd29', label: 'Node.js' },
  { icon: 'fa-brands fa-aws', color: '#ff9900', label: 'AWS' },
  { icon: 'fa-brands fa-docker', color: '#2496ed', label: 'Docker' },
  { icon: 'fa-solid fa-database', color: '#336791', label: 'PostgreSQL' },
  { icon: 'fa-solid fa-fire', color: '#ff6d00', label: 'Firebase' },
  { icon: 'fa-solid fa-database', color: '#d82c20', label: 'Redis' },
  { icon: 'fa-solid fa-robot', color: '#10b981', label: 'Claude AI' },
  { icon: 'fa-solid fa-wand-magic-sparkles', color: '#a855f7', label: 'OpenAI' },
  { icon: 'fa-solid fa-bolt', color: '#3ecf8e', label: 'Supabase' },
  { icon: 'fa-brands fa-figma', color: '#f24e1e', label: 'Figma' },
];

export default function TechStack() {
  return (
    <section id="tech" aria-labelledby="tech-h">
      <div className="container zi">
        <div className="sec-hd">
          <p className="lbl">Tech stack</p>
          <h2 id="tech-h" className="rv">
            The tools we<br /><span className="g">trust to ship.</span>
          </h2>
          <p className="rv d1">
            Modern, proven technologies chosen for performance, scalability, and developer experience.
          </p>
        </div>
        <div className="tpg rv d1">
          {stack.map((t, i) => (
            <div key={i} className="tp">
              <i className={t.icon} style={{ color: t.color }}></i>
              {t.label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
