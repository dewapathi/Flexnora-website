import Link from 'next/link';

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="fg">
          <div className="fb">
            <a href="#top" className="nl" style={{ display: 'inline-flex' }}>
              <div className="nl-icon">
                <img src="/images/logo1.png" alt="FLEXNORA" loading="lazy" />
              </div>
              <div className="nl-name">FLEXNORA<span>Digital</span></div>
            </a>
            <p>
              We build digital products that drive real business growth — for founders and companies
              who demand the very best.
            </p>
            <div className="fso">
              <a href="https://wa.me/94779400291" className="fsl" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                <i className="fa-brands fa-whatsapp"></i>
              </a>
              <a href="mailto:pradeepa@flexnora.com" className="fsl" aria-label="Email">
                <i className="fa-solid fa-envelope"></i>
              </a>
              <a href="tel:+94779400291" className="fsl" aria-label="Phone">
                <i className="fa-solid fa-phone"></i>
              </a>
            </div>
          </div>
          <div className="fc">
            <h4>Solutions</h4>
            <ul>
              <li><a href="#itp">Tech Partnership</a></li>
              <li><a href="#services">Software Development</a></li>
              <li><a href="#services">Cloud & Infrastructure</a></li>
              <li><a href="#services">AI & Automation</a></li>
              <li><a href="#services">Managed IT</a></li>
              <li><a href="#hire">Hire Developers</a></li>
            </ul>
          </div>
          <div className="fc">
            <h4>Company</h4>
            <ul>
              <li><a href="#why">Why FLEXNORA</a></li>
              <li><a href="#work">Our Work</a></li>
              <li><a href="#process">Our Process</a></li>
              <li><a href="#testimonials">Testimonials</a></li>
              <li><a href="#faq">FAQ</a></li>
            </ul>
          </div>
          <div className="fc">
            <h4>Contact</h4>
            <ul>
              <li><a href="https://wa.me/94779400291" target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
              <li><a href="mailto:pradeepa@flexnora.com">Email Us</a></li>
              <li><a href="tel:+94779400291">+94 77 9400 291</a></li>
              <li><a href="#contact">Get a Quote</a></li>
            </ul>
          </div>
        </div>
        <div className="fbot">
          <p className="fcp">&copy; 2025 FLEXNORA Digital. All rights reserved. · Colombo, Sri Lanka</p>
          <div className="flg">
            <Link href="/ball-sort-game/privacy-policy">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
