import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Ticker from '@/components/Ticker';
import WhyFlexnora from '@/components/WhyFlexnora';
import ItPartnership from '@/components/ItPartnership';
import Services from '@/components/Services';
import Comparison from '@/components/Comparison';
import Stats from '@/components/Stats';
import Work from '@/components/Work';
import Process from '@/components/Process';
import Testimonials from '@/components/Testimonials';
import TechStack from '@/components/TechStack';
import HireDevelopers from '@/components/HireDevelopers';
import Faq from '@/components/Faq';
import FinalCta from '@/components/FinalCta';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import ClientInit from '@/components/ClientInit';

export default function Home() {
  return (
    <>
      <ClientInit />
      <Navbar />
      <main>
        <Hero />
        <Ticker />
        <WhyFlexnora />
        <ItPartnership />
        <Services />
        <Comparison />
        <Stats />
        <Work />
        <Process />
        <Testimonials />
        <TechStack />
        <HireDevelopers />
        <Faq />
        <FinalCta />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
