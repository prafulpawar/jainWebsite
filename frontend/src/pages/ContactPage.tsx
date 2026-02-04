import { useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Phone, Mail, Navigation } from "lucide-react";

const ContactPage = () => {
  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const contactList = [
    {
      role: "Event Ticket registrations, Volunteer requests",
      email: "events@jsotcanada.org"
    },
    {
      role: "Membership inquiries, Update forms",
      email: "membership@jsotcanada.org"
    },
    {
      role: "Accounts Payable, Donation Receipts",
      email: "treasurer@jsotcanada.org"
    },
    {
      role: "Inquiries, General Communication",
      email: "secretary@jsotcanada.org"
    },
    {
      role: "IT Administration, Catch-All",
      email: "info@jsotcanada.org"
    },
    {
      role: "Issues and Escalations",
      email: "president@jsotcanada.org"
    }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero Banner */}
        <section className="relative py-20 bg-gradient-to-r from-secondary via-maroon to-secondary">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-repeat" />
          </div>
          <div className="container mx-auto px-4 relative z-10 text-center">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-secondary-foreground mb-4">
              Contact Us
            </h1>
            <p className="text-secondary-foreground/80 text-lg max-w-2xl mx-auto">
              Get in touch with the Jain Society of Toronto
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            
            {/* Intro Text */}
            <div className="text-center mb-12 max-w-3xl mx-auto">
              <h2 className="font-serif text-3xl font-bold text-secondary mb-4">Need more info?</h2>
              <div className="w-24 h-1 bg-saffron mx-auto mb-6 rounded-full"></div>
              <p className="text-lg text-muted-foreground">
                You can contact us via email or write to any of the Managing Committee or Board members.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-10 items-start">
              
              {/* Left Column: Address & Map */}
              <div className="space-y-8">
                <Card className="shadow-lg border-gold/20 h-full">
                  <CardHeader className="bg-secondary/5 border-b border-gold/10 pb-4">
                    <CardTitle className="font-serif text-2xl text-secondary flex items-center gap-2">
                       <MapPin className="h-6 w-6 text-saffron" />
                       Address & Contact Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    <div className="space-y-2">
                      <h3 className="font-bold text-xl text-secondary">Jain Society of Toronto Inc.</h3>
                      <p className="text-muted-foreground flex items-start gap-3">
                         <MapPin className="h-5 w-5 text-gold shrink-0 mt-1" />
                         <span>
                           441 Ellesmere Road, Scarborough,<br />
                           ON M1R 4E5 Canada
                         </span>
                      </p>
                    </div>

                    <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-saffron/10 p-2 rounded-full">
                          <Phone className="h-5 w-5 text-saffron" />
                        </div>
                        <a href="tel:1-416-441-2211" className="text-foreground hover:text-saffron transition-colors font-medium">
                          1-416-441-2211
                        </a>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <div className="bg-saffron/10 p-2 rounded-full">
                          <Mail className="h-5 w-5 text-saffron" />
                        </div>
                        <a href="mailto:info@jsotcanada.org" className="text-foreground hover:text-saffron transition-colors font-medium">
                          info@jsotcanada.org
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Map / Driving Directions */}
                <div className="rounded-xl overflow-hidden shadow-lg border border-gold/20 relative group">
                  <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur px-4 py-2 rounded-full shadow-md flex items-center gap-2">
                    <Navigation className="h-4 w-4 text-saffron" />
                    <span className="text-xs font-bold uppercase tracking-wider text-secondary">Driving Directions</span>
                  </div>
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2882.357772746476!2d-79.29742668450123!3d43.76964177911746!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d4d23e673479f9%3A0xc391152a51276020!2sJain%20Society%20of%20Toronto!5e0!3m2!1sen!2sca!4v1620000000000!5m2!1sen!2sca" 
                    width="100%" 
                    height="300" 
                    style={{ border: 0 }} 
                    allowFullScreen={true} 
                    loading="lazy"
                    className="grayscale group-hover:grayscale-0 transition-all duration-500"
                    title="JSOT Location Map"
                  ></iframe>
                </div>
              </div>

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
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;