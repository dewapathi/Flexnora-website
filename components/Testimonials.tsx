const testimonials = [
  {
    quote: 'FLEXNORA transformed our online presence with a stunning website that perfectly represents our brand. The quality and attention to detail was far beyond what I expected.',
    name: 'Ranuli Shalinya',
    role: 'Teacher · Nexora Institute of Education',
    avatar: '/images/ranuli.png',
    delay: '',
  },
  {
    quote: 'The mobile app FLEXNORA built helped us increase customer engagement significantly. Professional, fast, and exactly what we envisioned — delivered on time, no compromises.',
    name: 'Aloka Harshana',
    role: 'Marketing Director · TMR (True Man Racing)',
    avatar: '/images/aloka.png',
    delay: 'd1',
  },
  {
    quote: 'Their automation solutions saved us countless hours every week. FLEXNORA truly understands how technology can transform the way a business operates day to day.',
    name: 'Theekshani Aloka',
    role: 'Teacher · St Mary\'s College Negombo',
    avatar: '/images/theekshani.png',
    delay: 'd2',
  },
];

export default function Testimonials() {
  return (
    <section className="tsg" id="testimonials" aria-labelledby="ts-h">
      <div className="container zi">
        <div className="sec-hd">
          <p className="lbl">Client love</p>
          <h2 id="ts-h" className="rv">
            Don&apos;t take our word<br /><span className="g">for it.</span>
          </h2>
          <p className="rv d1">
            Real feedback from real clients who&apos;ve seen the difference FLEXNORA makes.
          </p>
        </div>
        <div className="tcg">
          {testimonials.map((t, i) => (
            <div key={i} className={`tc rv${t.delay ? ` ${t.delay}` : ''}`}>
              <div className="ts">
                {[...Array(5)].map((_, j) => <i key={j} className="fa-solid fa-star"></i>)}
              </div>
              <p className="tq">&ldquo;{t.quote}&rdquo;</p>
              <div className="tau">
                <img src={t.avatar} alt={t.name} className="tav" loading="lazy" />
                <div>
                  <div className="tn">{t.name}</div>
                  <div className="tr">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
