import ThreeBackground from '@/components/ThreeBackground';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import TimelineSection from '@/components/TimelineSection';
import JudgesSection from '@/components/JudgesSection';
import FAQSection from '@/components/FAQSection';
import Footer from '@/components/Footer';
import EventTicker from '@/components/EventTicker';

const Index = () => {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <ThreeBackground />
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <TimelineSection />
        <JudgesSection />
        <FAQSection />
      </main>
      <Footer />
      <EventTicker />
    </div>
  );
};

export default Index;
