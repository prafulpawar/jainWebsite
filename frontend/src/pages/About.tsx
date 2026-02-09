import { useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LeadersSection } from "@/components/LeadersSection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator"; 
import { Leaf, History, Users, ArrowRight, Mail } from "lucide-react"; // Added Mail here
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
    { year: "1974", title: "Establishment", desc: "JSOT established by a few families to promote cultural services." },
    { year: "1992", title: "Rosemeade Era", desc: "Acquired Hall on Rosemeade Ave for $1M; membership ~250." },
    { year: "2012", title: "Scarborough Expansion", desc: "Acquired 4+ acres and building from Greek Community." },
    { year: "2023", title: "Shikharbandhi Derasar", desc: "First ever in Canada, encompassing Shwetambar & Digambar." },
    { year: "Today", title: "Community Growth", desc: "Community has grown to over 1200 families." },
  ];

  // Added Contact List Data for the new card
  const contactList = [
    { role: "General Inquiries", email: "info@jsot.ca" },
    { role: "President, Board of Directors", email: "president@jsot.ca" },
    { role: "Donations, Accounting", email: "treasurer@jsot.ca" },
    { role: "Facility Booking, Events", email: "bookings@jsot.ca" },
    { role: "Pathshala, Education", email: "education@jsot.ca" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-gold/30">
      <Header />

      {/* Hero Banner */}
      <section className="relative h-[10vh] min-h-[280px] flex items-center justify-center overflow-hidden bg-secondary">
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/50 to-secondary z-10" />
        {/* Background image */}
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
                 <div className="prose text-muted-foreground space-y-4">
                   <p>
                     In 1992 JSOT acquired another Community Hall on 48 Rosemeade Ave for One million dollars. At the time of acquisition the membership was around 250 members. Once again the work of the Community guided by its core principals of welcoming everyone resulted in need of a bigger Community Hall. In 2012 Society acquired just over 4 acres of land and a unfinished building, from the Greek Community, in Scarborough.
                   </p>
                   
                   <p>
                     After finishing construction, the building has a 7000 sq.ft Auditorium, Four Classrooms for Pathshala, a Seniors Lounge, Children’s play area, Centre office, Board room, 3600 sq.ft. dining hall, modern Kitchen, Handicapped friendly modern washrooms, elevators. Most of all 300 cars parking and easy access to highway 401.
                     This landmark Jain cultural Centre host visitors from all over the world and from various nationalities. A proposed museum will showcase and preserve rare art, tokens and memorabilia of Jain life and tradition.
                   </p>

                   <p className="font-medium text-secondary">
                     In 2023, we finished the construction of first ever Shikharbandhi Derasar in Canada, which encompasses both Shwetambar and Digambar Ghabaras. This will serve as the ultimate legacy of unity, togetherness and worship for all Jains.
                   </p>

                   <p>
                     From humble beginnings stated by a few families in 1974, with a vision to have a common community center to promote ideas, teaching and a place to gather and provide social support to both the adults and children coming into the Country the Community has now grown to over 1200 families.
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
        <section id="leadership" className="pt-8 relative">
           <div id="board" className="absolute -top-28 w-full h-1" />
           <div id="management" className="absolute -top-28 w-full h-1" />
           <LeadersSection />
        </section>
        {/* --- SECTION: DEPARTMENT DIRECTORY --- */}
        <section id="directory" className="py-1 pb-12 container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Right Column: Contact Directory */}
            <Card className="shadow-lg border-gold/20 bg-card h-full">
              <CardHeader className="bg-gradient-to-r from-secondary to-maroon text-white rounded-t-lg">
                <CardTitle className="font-serif text-2xl flex items-center gap-2">
                  <Mail className="h-6 w-6 text-gold" />
                  Department Directory
                </CardTitle>
                <p className="text-white/70 text-sm font-normal pt-1">
                  Please direct your inquiries to the appropriate department
                </p>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-border">
                  {contactList.map((item, index) => (
                    <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between p-5 hover:bg-muted/30 transition-colors gap-2">
                      <div className="sm:w-1/2">
                        <ul className="space-y-1">
                          {item.role.split(',').map((r, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-secondary/90 font-medium">
                              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-saffron shrink-0" />
                              {r.trim()}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="sm:w-1/2 sm:text-right mt-2 sm:mt-0">
                        <a 
                          href={`mailto:${item.email}`} 
                          className="text-saffron hover:text-maroon transition-colors font-medium break-all flex items-center sm:justify-end gap-2 group"
                        >
                          <Mail className="h-4 w-4 opacity-50 group-hover:opacity-100" />
                          {item.email}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default About;