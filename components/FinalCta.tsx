export default function FinalCta() {
  return (
    <section className="cta-fin" id="cta-fin" aria-labelledby="ctaf-h">
      <div className="container">
        <div className="cta-fin-inner">
          <p className="lbl rv">Ready to get started?</p>
          <h2 id="ctaf-h" className="rv d1">
            Need a reliable<br /><span className="g">technology partner?</span>
          </h2>
          <p className="rv d2">
            Let&apos;s build and grow your business together. Book a free 30-minute consultation — no
            obligation, no sales pitch. Just an honest conversation about your technology needs.
          </p>
          <div className="cta-btns rv d3">
            <a
              href="https://wa.me/94779400291?text=Hi%20FLEXNORA!%20I%20want%20to%20book%20a%20free%20consultation."
              className="btn btn-wa btn-lg"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-brands fa-whatsapp"></i> Talk on WhatsApp
            </a>
            <a
              href="mailto:flexnoradigital@gmail.com?subject=Free%20Consultation%20Request%20-%20FLEXNORA"
              className="btn btn-p btn-lg"
            >
              <i className="fa-solid fa-calendar-check"></i> Book Free Consultation
            </a>
            <a href="tel:+94779400291" className="btn btn-g btn-lg">
              <i className="fa-solid fa-phone"></i> Call Us Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
