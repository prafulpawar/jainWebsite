import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { CalendarSection } from "@/components/CalendarSection";
import { ResourceLibrary } from "@/components/ResourceLibrary";
// import { LeadersSection } from "@/components/LeadersSection";
import { EngagementSection } from "@/components/EngagementSection";
import {WelcomeSection} from "@/components/WelcomeSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
         <WelcomeSection/>
        <CalendarSection />
        <ResourceLibrary />
         {/* <LeadersSection />  */}
        
        <EngagementSection /> 
      </main>
      <Footer />
    </div>
  );
};

export default Index;
