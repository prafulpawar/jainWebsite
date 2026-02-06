import { useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { 
  MapPin, 
  Clock, 
  Mail, 
  Car, 
  Shirt, 
  Footprints, 
  CameraOff, 
  UtensilsCrossed, 
  Smartphone, 
  CigaretteOff, 
  VolumeX, 
  Users, 
  Baby, 
  HeartHandshake, 
  ShieldCheck, 
  Dog,
  Navigation
} from "lucide-react";
import { useLocation } from "react-router-dom";

const Visit = () => {
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

  const guidelines = [
    {
      icon: Car,
      title: "Parking",
      desc: "Free parking is available. The management does not assume any responsibility for vehicles parked on the premises."
    },
    {
      icon: Shirt,
      title: "Dress Code",
      desc: "Casual attire. No sleeveless tops, shorts, or skirts shorter than knee length. Please dress modestly."
    },
    {
      icon: Footprints,
      title: "Shoes",
      desc: "Visitors are required to remove their footwear before entering the premises or any part of the complex. Shoe racks are provided at the front door."
    },
    {
      icon: Users,
      title: "Seating Arrangements",
      desc: "There are designated areas for men and women during the Aarti ceremony and other religious rituals. Please adhere to these arrangements."
    },
    {
      icon: CameraOff,
      title: "Photography",
      desc: "JSOT is a sacred place. Please refrain from taking photos or videos inside the premises, including inside the temple."
    },
    {
      icon: UtensilsCrossed,
      title: "Food & Drink",
      desc: "No outside food or drinks allowed. Only Jain food is allowed to be cooked or consumed. Please discard chewing gum before entering."
    },
    {
      icon: Smartphone,
      title: "Cell Phones",
      desc: "Please switch off all cell phones prior to entering. Cell phones with cameras must not be used to take photographs inside."
    },
    {
      icon: CigaretteOff,
      title: "Smoking & Alcohol",
      desc: "Smoking, tobacco, alcohol, and drugs are strictly prohibited anywhere within the complex."
    },
    {
      icon: Dog,
      title: "Pets",
      desc: "No pets allowed within the complex. Service dogs are allowed in most areas except sacred spaces used for prayer and meditation."
    },
    {
      icon: VolumeX,
      title: "Conduct",
      desc: "Please maintain silence during your visit to JSOT to preserve the spiritual atmosphere."
    },
    {
      icon: Baby,
      title: "Children",
      desc: "All visitors aged 14 or under must be accompanied by an adult at all times, otherwise entry may be refused."
    },
    {
      icon: HeartHandshake,
      title: "Donations",
      desc: "Please utilize donation boxes or contact the Management Committee. Cheques payable to ‘JSOT’. Tax receipts will be issued."
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-gold/30">
      <Header />

      {/* Hero Banner */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden bg-secondary">
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/50 to-secondary z-10" />
        {/* Placeholder for Temple Image */}
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1545231494-06d15a5f9790?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center" />
        
        <div className="container relative z-20 text-center px-4">
          <span className="text-gold font-medium uppercase tracking-wider block mb-2 animate-fade-in">
            Plan Your Visit
          </span>
          <h1 className="font-serif text-4xl md:text-6xl font-bold text-primary-foreground animate-fade-in-up">
            Visitor Information
          </h1>
          <p className="mt-4 text-primary-foreground/80 max-w-2xl mx-auto text-lg animate-fade-in-up animation-delay-200">
            Hours, Directions, and Guidelines for a peaceful experience.
          </p>
        </div>
      </section>

      <main className="pb-20">
        
        {/* --- SECTION: INFO & MAP --- */}
        <section className="py-16 container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            
            {/* Contact Card */}
            <Card className="border-gold/20 shadow-lg h-full">
              <CardHeader>
                <CardTitle className="font-serif text-2xl text-secondary">Temple Hours & Contact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-secondary/5 p-3 rounded-full">
                    <Clock className="w-6 h-6 text-saffron" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-secondary">Opening Hours</h3>
                    <p className="text-muted-foreground">Everyday (Mon – Sun)</p>
                    <p className="text-xl font-medium text-gold">9:00 AM – 6:00 PM</p>
                  </div>
                </div>

                <Separator className="bg-gold/20" />

                <div className="flex items-start gap-4">
                  <div className="bg-secondary/5 p-3 rounded-full">
                    <MapPin className="w-6 h-6 text-saffron" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-secondary">Address</h3>
                    <p className="text-muted-foreground">Jain Society of Toronto Inc.</p>
                    <p className="text-muted-foreground">441 Ellesmere Road,</p>
                    <p className="text-muted-foreground">Scarborough, ON M1R 4E5 Canada</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-secondary/5 p-3 rounded-full">
                    <Mail className="w-6 h-6 text-saffron" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-secondary">Email</h3>
                    <a href="mailto:info@jsotcanada.org" className="text-gold hover:underline">
                      info@jsotcanada.org
                    </a>
                  </div>
                </div>

                <div className="pt-4">
                  <Button className="w-full bg-secondary text-white hover:bg-secondary/90 gap-2">
                    <Navigation className="w-4 h-4" /> Get Driving Directions
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Map Embed (Placeholder for Google Maps Iframe) */}
            <div className="h-[400px] lg:h-full w-full rounded-xl overflow-hidden border border-gold/20 shadow-lg bg-gray-100 relative group">
               {/* Replace src below with actual Google Maps Embed URL for 441 Ellesmere Road */}
               <iframe 
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d11526.134626821879!2d-79.297638!3d43.76178!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d4d2191c06747f%3A0xb276a3614cd9b804!2s441%20Ellesmere%20Rd!5e0!3m2!1sen!2sus!4v1770360106924!5m2!1sen!2sus" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy"
                title="Google Map JSOT"
                className="grayscale group-hover:grayscale-0 transition-all duration-500"
              ></iframe>
            </div>
          </div>
        </section>

        <Separator className="my-8 opacity-50 bg-gold/30 max-w-6xl mx-auto" />

        {/* --- SECTION: GUIDELINES --- */}
        <section id="guidelines" className="py-16 container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <ShieldCheck className="w-10 h-10 text-saffron mx-auto mb-4" />
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-secondary mb-4">
              Visitor Guidelines
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6" />
            <p className="text-muted-foreground max-w-2xl mx-auto">
              JSOT is a very sacred place. All visitors are required to abide by the following rules and regulations applicable to all areas including the Mandir, Haveli, and the Exhibition.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {guidelines.map((item, index) => (
              <Card key={index} className="border-gold/10 hover:border-gold/40 hover:shadow-md transition-all group bg-card/50">
                <CardContent className="p-6">
                  <div className="mb-4 inline-block p-3 rounded-full bg-secondary/5 text-secondary group-hover:bg-saffron/10 group-hover:text-saffron transition-colors">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-secondary mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Security & Disclaimer Notice */}
          <div className="mt-12 p-6 bg-secondary/5 rounded-xl border border-secondary/10">
            <h4 className="font-bold text-secondary mb-2 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-gold" /> Security & Policy
            </h4>
            <p className="text-sm text-muted-foreground mb-4">
              Activities in the complex are monitored and recorded by video surveillance. Please respect all security procedures.
            </p>
            <Separator className="bg-secondary/10 my-4" />
            <p className="text-xs text-muted-foreground italic">
              <strong>Please Note:</strong> The Management reserves the right to refuse admission to those who do not follow the listed guidelines. The Management also reserves the right to cancel or alter any visit or close the complex or part of the premises without prior notice. Every effort will be made to avoid any inconvenience. The Management is not responsible or liable for any loss or damage of any personal belongings of the visitors during their visit to JSOT.
            </p>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default Visit;