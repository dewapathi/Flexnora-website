export default function Contact() {
  return (
    <section className="ctsec" id="contact" aria-labelledby="ct-h">
      <div
        className="orb"
        style={{ width: '400px', height: '400px', background: 'rgba(99,102,241,0.1)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}
        aria-hidden="true"
      ></div>
      <div className="container zi">
        <div className="ctg">
          <div className="ctl">
            <p className="lbl">Get in touch</p>
            <h2 id="ct-h" className="rv">
              Let&apos;s build<br /><span className="g">something great.</span>
            </h2>
            <p className="rv d1" style={{ marginBottom: '40px' }}>
              Tell us about your project. We&apos;ll reply with a plan, timeline, and cost estimate —
              usually within 24 hours.
            </p>
            <div className="cms">
              <a href="https://wa.me/94779400291" className="cm rv d1" target="_blank" rel="noopener noreferrer">
                <div className="cmi"><i className="fa-brands fa-whatsapp"></i></div>
                <div>
                  <div className="cml">WhatsApp (Fastest)</div>
                  <div className="cmv">+94 77 9400 291</div>
                </div>
              </a>
              <a href="mailto:pradeepa@flexnora.com" className="cm rv d2">
                <div className="cmi"><i className="fa-solid fa-envelope"></i></div>
                <div>
                  <div className="cml">Email</div>
                  <div className="cmv">pradeepa@flexnora.com</div>
                </div>
              </a>
              <a href="tel:+94779400291" className="cm rv d3">
                <div className="cmi"><i className="fa-solid fa-phone"></i></div>
                <div>
                  <div className="cml">Phone</div>
                  <div className="cmv">+94 77 9400 291</div>
                </div>
              </a>
              <div className="cm rv d4" style={{ cursor: 'default' }}>
                <div className="cmi"><i className="fa-solid fa-location-dot"></i></div>
                <div>
                  <div className="cml">Location</div>
                  <div className="cmv">Colombo, Sri Lanka</div>
                </div>
              </div>
            </div>
          </div>
          <div className="ctb rv d2">
            <div className="badge" style={{ marginBottom: '24px' }}>
              <span className="dot"></span>Available for new projects
            </div>
            <h3>Start Your Project Today.</h3>
            <p style={{ marginBottom: '32px' }}>
              The fastest way to kick things off is a quick WhatsApp message. We&apos;ll schedule a
              call, understand your vision, and deliver a detailed proposal — no obligation.
            </p>
            <div className="ctbs">
              <a
                href="https://wa.me/94779400291?text=Hi%20FLEXNORA!%20I%20want%20to%20discuss%20a%20project."
                className="ctbtn wa"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa-brands fa-whatsapp"></i>
                <div className="ctbt">WhatsApp Now<small>Typical reply in under 1 hour</small></div>
              </a>
              <a href="tel:+94779400291" className="ctbtn ph">
                <i className="fa-solid fa-phone"></i>
                <div className="ctbt">Call Us<small>+94 77 9400 291</small></div>
              </a>
              <a
                href="mailto:pradeepa@flexnora.com?subject=Project%20Inquiry%20-%20FLEXNORA"
                className="ctbtn em"
              >
                <i className="fa-solid fa-envelope"></i>
                <div className="ctbt">Send an Email<small>pradeepa@flexnora.com</small></div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
