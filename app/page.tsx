import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Ticker from '@/components/Ticker';
import WhyFlexnora from '@/components/WhyFlexnora';
import SolutionGallery from '@/components/SolutionGallery';
import Services from '@/components/Services';
import MobileShowcase from '@/components/MobileShowcase';
import AIInnovation from '@/components/AIInnovation';
import Process from '@/components/Process';
import TechStack from '@/components/TechStack';
import Comparison from '@/components/Comparison';
import Stats from '@/components/Stats';
import Testimonials from '@/components/Testimonials';
import ItPartnership from '@/components/ItPartnership';
import HireDevelopers from '@/components/HireDevelopers';
import Faq from '@/components/Faq';
import FinalCta from '@/components/FinalCta';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Ticker />
        <WhyFlexnora />
        <SolutionGallery />
        <Services />
        <MobileShowcase />
        <AIInnovation />
        <Process />
        <TechStack />
        <Comparison />
        <Stats />
        <Testimonials />
        <ItPartnership />
        <HireDevelopers />
        <Faq />
        <FinalCta />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
