import { useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LeadersSection } from "@/components/LeadersSection";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator"; // Ensure you have this or use standard hr
import { Leaf, History, Users, ArrowRight } from "lucide-react";
import { useLocation } from "react-router-dom";

const About = () => {
  const { hash } = useLocation();

  // Handle Scroll to Section on load
  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace("#", ""));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [hash]);

  const tattvas = [
    { name: "Jiva", desc: "All living beings. Every living being has a soul or consciousness." },
    { name: "Ajiva", desc: "All non-living material (Space, Time, Matter)." },
    { name: "Asvara", desc: "The cause of influx of karma due to actions/emotions." },
    { name: "Bandh", desc: "The actual bonding of karmic particles to the soul." },
    { name: "Punya", desc: "Positive karmic particles resulting from virtuous acts." },
    { name: "Paap", desc: "Negative karmic particles resulting from malice or violence." },
    { name: "Samvara", desc: "The act of stopping the karmic influx (Self-control)." },
    { name: "Nirjara", desc: "Removal of accumulated karma (Penance, Meditation)." },
    { name: "Moksha", desc: "Complete liberation of the soul from all karma." },
  ];

  const milestones = [
    { year: "1974", title: "Establishment", desc: "JSOT established to promote cultural and community services." },
    { year: "1983", title: "First Home", desc: "Acquired community hall on Parklawn Ave for $110,000." },
    { year: "1992", title: "Expansion", desc: "Acquired hall on Rosemeade Ave for $1M to serve 250 families." },
    { year: "2012", title: "Current Home", desc: "Acquired 4+ acres land and building in Scarborough." },
    { year: "Now", title: "Growth", desc: "Community has grown to over 1200 families." },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-gold/30">
      <Header />

      {/* Hero Banner */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden bg-secondary">
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/50 to-secondary z-10" />
        {/* You can add a background image here */}
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1604868189265-219fa7f13677?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center" />
        
        <div className="container relative z-20 text-center px-4">
          <span className="text-gold font-medium uppercase tracking-wider block mb-2 animate-fade-in">
            Discover Our Roots
          </span>
          <h1 className="font-serif text-4xl md:text-6xl font-bold text-primary-foreground animate-fade-in-up">
            About Us
          </h1>
          <p className="mt-4 text-primary-foreground/80 max-w-2xl mx-auto text-lg animate-fade-in-up animation-delay-200">
            From the ancient philosophy of Jainism to the history of our society in Toronto.
          </p>
        </div>
      </section>

      <main className="pb-20">
        
        {/* --- SECTION: ABOUT JAINISM --- */}
        <section id="jainism" className="py-16 md:py-24 container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <Leaf className="w-10 h-10 text-saffron mx-auto mb-4" />
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-secondary mb-4">
              About Jainism
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto" />
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start mb-16">
            <div className="prose prose-lg text-muted-foreground text-justify">
              <p className="mb-4">
                <span className="text-secondary font-bold text-xl block mb-2">Origins & Beliefs</span>
                Jainism is an ancient religion from India that teaches that the way to liberation and bliss is to live a life of harmlessness and renunciation. The aim of Jain life is to achieve liberation of the soul. 
              </p>
              <p className="mb-4">
                Jainism does not support belief in a creator deity. According to Jain doctrine, the universe and its constituents—soul, matter, space, time, and principles of motion—have always existed. The soul of each living being is unique and uncreated and has existed since beginningless time.
              </p>
            </div>
            <div className="bg-card border border-gold/20 rounded-xl p-6 shadow-lg relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-bl-full" />
               <h3 className="font-serif text-2xl font-bold text-secondary mb-4">Core Philosophy</h3>
               <ul className="space-y-3 text-muted-foreground">
                 {[
                   "Belief on independent existence of soul and matter.",
                   "Refutation of a supreme divine creator.",
                   "Potency of karma & eternal universe.",
                   "Relativity and multiple facets of truth (Anekantavada).",
                   "Morality and ethics based on Ahimsa (Non-violence)."
                 ].map((item, i) => (
                   <li key={i} className="flex items-start gap-3">
                     <span className="mt-1.5 w-2 h-2 rounded-full bg-saffron flex-shrink-0" />
                     {item}
                   </li>
                 ))}
               </ul>
            </div>
          </div>

          {/* Nine Tattvas */}
          <div className="mb-16">
            <h3 className="font-serif text-2xl md:text-3xl font-bold text-center text-secondary mb-8">
              The Nine Tattvas (Principles)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {tattvas.map((tattva, index) => (
                <Card key={index} className="border-gold/20 hover:border-gold hover:shadow-md transition-all group">
                  <CardContent className="p-6">
                    <h4 className="font-serif text-xl font-bold text-secondary mb-2 group-hover:text-saffron transition-colors">
                      {tattva.name}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {tattva.desc}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="bg-secondary/5 rounded-2xl p-8 md:p-12 text-center">
            <h3 className="font-serif text-2xl font-bold text-secondary mb-4">The Way of Life</h3>
            <p className="text-muted-foreground max-w-3xl mx-auto mb-6">
              Because common Jain followers do not go through the monastic measures of karmic removal, they go through their daily lives with great care in doing as little damage as possible. A vegetarian diet is crucial, stemming from the most important practice of all: <strong>Ahimsa (Non-injury)</strong>.
            </p>
          </div>
        </section>

        <Separator className="my-8 opacity-50 bg-gold/30" />

        {/* --- SECTION: ABOUT JSOT --- */}
        <section id="jsot" className="py-16 md:py-24 bg-card/50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <History className="w-10 h-10 text-gold mx-auto mb-4" />
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-secondary mb-4">
                About JSOT
              </h2>
              <p className="text-muted-foreground">
                The Jain Society of Toronto (JSOT) was established in 1974 with the aim of promoting cultural and community services.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 mb-16">
               {/* Timeline */}
               <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gold/50 before:to-transparent">
                  {milestones.map((item, index) => (
                    <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full border border-gold bg-background shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 text-xs font-bold text-gold">
                        {item.year}
                      </div>
                      <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-background p-4 rounded border border-gold/10 shadow hover:shadow-lg transition-all">
                        <div className="flex items-center justify-between space-x-2 mb-1">
                          <div className="font-bold text-secondary">{item.title}</div>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {item.desc}
                        </div>
                      </div>
                    </div>
                  ))}
               </div>

               {/* Description & Impact */}
               <div className="flex flex-col justify-center space-y-6">
                 <div className="prose text-muted-foreground">
                   <p>
                     JSOT is one of the first Jain organizations established in Canada and fifth in North America. Its mandate is not only to promote Jain principles and practice, but also to provide a place of worship for the Jain community in greater Toronto area.
                   </p>
                   <p>
                     From humble beginnings started by a few families in 1974, the community has now grown significantly. The hard work and dedication of all our members promoting a better society has been reflected over the years through many contributions.
                   </p>
                 </div>
                 
                 <div className="bg-saffron/10 border border-saffron/20 p-6 rounded-lg">
                   <h4 className="font-serif text-xl font-bold text-secondary mb-4 flex items-center gap-2">
                     <Users className="w-5 h-5 text-saffron" /> Key Contributions
                   </h4>
                   <ul className="space-y-2 text-sm text-foreground/80">
                     <li className="flex items-start gap-2">
                        <ArrowRight className="w-4 h-4 mt-1 text-saffron" /> Hosted Jaina Convention in 1989 & 1997.
                     </li>
                     <li className="flex items-start gap-2">
                        <ArrowRight className="w-4 h-4 mt-1 text-saffron" /> Raised funds for 2000 Earthquake victims in Kutch.
                     </li>
                     <li className="flex items-start gap-2">
                        <ArrowRight className="w-4 h-4 mt-1 text-saffron" /> Established Pathshala, Swadhyay, Seniors, and Youth groups.
                     </li>
                     <li className="flex items-start gap-2">
                        <ArrowRight className="w-4 h-4 mt-1 text-saffron" /> New Immigrants networking groups started in 2017.
                     </li>
                   </ul>
                 </div>
               </div>
            </div>
          </div>
        </section>

        {/* --- SECTION: LEADERSHIP (Board & Management) --- */}
        <section id="leadership" className="pt-8">
           {/* LeadersSection handles Board and Management Committee */}
           <LeadersSection />
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default About;