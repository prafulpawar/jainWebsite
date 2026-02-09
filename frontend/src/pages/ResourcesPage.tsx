import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Building2, Mail } from "lucide-react"; // Mail icon wapas add kiya

// Import your images here
import exteriorImg1 from "@/assets/EXTERIOR-VIEW-CAM-01-768x384.jpg";
import exteriorImg2 from "@/assets/EXTERIOR-VIEW-CAM-02-300x106.jpg";

const ResourcesPage = () => {
  const location = useLocation();

   useEffect(() => {
    // 1. Check if there is a hash (e.g. /resources#441-ellesmere)
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    } else {
      // 2. If NO hash (e.g. clicked "Resources" from Footer), scroll to Top
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Banner */}
        <section className="relative py-20 bg-gradient-to-r from-secondary via-maroon to-secondary">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-repeat" />
          </div>
          <div className="container mx-auto px-4 relative z-10 text-center">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-secondary-foreground mb-4">
              Resources
            </h1>
            <p className="text-secondary-foreground/80 text-lg max-w-2xl mx-auto">
              News, updates, and future plans for the Jain Society of Toronto.
            </p>
          </div>
        </section>

        {/* ---------------- 441-ELLESMERE (PROJECT) SECTION ---------------- */}
        <section id="441-ellesmere" className="py-16 scroll-mt-20">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-4 mb-10">
              <Building2 className="h-8 w-8 text-saffron" />
              <h2 className="font-serif text-3xl font-bold text-secondary">
                About the project
              </h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-10 items-start">
              {/* Image Column */}
              <div className="space-y-6">
                <div className="overflow-hidden rounded-lg shadow-xl border-4 border-gold/20">
                  <img 
                    src={exteriorImg1} 
                    alt="Exterior View 1" 
                    className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="overflow-hidden rounded-lg shadow-xl border-4 border-gold/20">
                  <img 
                    src={exteriorImg2} 
                    alt="Exterior View 2" 
                    className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>

              {/* Text Column */}
              <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
                <p>
                  Toronto, Canada is home to the largest population of Jains in North America. Demographic indications show that our population is continuing to grow and the needs of the community are expanding to include the social and religious needs of up to five living generations!
                </p>
                
                <div className="bg-secondary/5 p-6 rounded-lg border-l-4 border-saffron">
                  <p className="font-medium text-secondary">
                    In 2012, 4.1 acres of land with unfinished structure of 48,000 sq.ft. was bought in the City of Toronto.
                  </p>
                </div>

                <p>
                  It will have a 7000 sq.ft Auditorium. Four Classrooms for Pathshala, a Seniors Lounge, Children’s play area, Centre office, Board room. 3600 sq.ft. dining hall, modern Kitchen, Handicapped friendly modern washrooms, elevators. Most of all 300 cars parking and easy access to highway 401.
                </p>

                <p>
                  It will house Swetamber Ghabhara (2400 sq.ft), Digambar Ghabhara (1200 sq.ft.) until a Shikharbandhi temple is built on the site.
                </p>

                <p>
                  This landmark Jain cultural Centre will host visitors from all over the world and from various nationalities. A proposed museum will showcase and preserve rare art, tokens and memorabilia of Jain life and tradition.
                </p>

                <p className="font-serif text-xl text-secondary font-bold pt-4">
                  A Sikherbandhi Temple, that will encompass both Swetambar and Digambar Ghabaras, this will serve as the ultimate legacy of unity, togetherness and worship for all Jains.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------- NEWSLETTER SUBSCRIPTION SECTION ---------------- */}
        <section id="subscribe-to-newsletter" className="py-20 bg-muted/30 border-t border-gold/20 scroll-mt-20">
          <div className="container mx-auto px-4">
            <div className="w-full max-w-4xl mx-auto shadow-2xl rounded-lg bg-white overflow-hidden">
              
              {/* Header Section */}
              <div className="bg-gradient-to-r from-secondary to-maroon text-white p-8 text-center">
                <div className="mx-auto w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-4 backdrop-blur-sm">
                  <Mail className="h-8 w-8 text-gold" />
                </div>
                <h3 className="text-3xl font-serif font-bold">Subscribe to Newsletter</h3>
                <p className="text-white/80 mt-2">Subscribe to our mailing list to receive the latest updates</p>
              </div>

              {/* Iframe Section */}
              <div className="w-full overflow-hidden relative">
                <iframe 
                  src="https://jsotcanada.us5.list-manage.com/subscribe?u=e682257a4e2feef5d84bfa7cc&id=fccf434d13" 
                  title="JSOT Newsletter Subscription"
                  scrolling="no" 
                  className="w-full h-[850px] md:h-[1120px] border-none block"
                  style={{ 
                    overflow: 'hidden', 
                  }}
                />
              </div>

            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
};

export default ResourcesPage;