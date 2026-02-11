import { useState } from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin, Send, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import logoJain from "@/assets/logoJain.jpg";

const quickLinks = [

  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Events", href: "/events" },
  // { name: "Temple Services", href: "/services" },
  { name: "Resources ", href: "/resources" },
  // { name: "Community", href: "/about#board" },
  { name: "Visitors", href: "/visitor" },
];


export function Footer() {
  const { toast } = useToast();
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Subscribed!",
      description: "Thank you for subscribing to our newsletter.",
    });
    setEmail("");
  };

  return (
    <footer id="contact" className="bg-secondary text-secondary-foreground">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* About */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-saffron to-gold flex items-center justify-center">
                <img
                  src={logoJain}
                  alt="JSOT Logo"
                  className="w-12 h-12 rounded-full object-cover shadow-lg border border-gold/20"
                />

              </div>
              <div>
                <span className="font-serif text-xl font-bold block">JSOT</span>
                <span className="text-xs text-gold-light">Jain Society of Toronto</span>
              </div>
            </div>
            <p className="text-secondary-foreground/80 text-sm mb-4">
              Preserving Jain values and traditions while building a strong, connected community in the Greater Toronto Area since 1985.
            </p>

            <div className="flex gap-3">
              <a
                href="https://www.facebook.com/jsotcanada/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-card/10 hover:bg-gold/20 flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/jainsocietyoftoronto/?hl=en"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-card/10 hover:bg-gold/20 flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://www.youtube.com/@jainsocietyoftoronto-media131"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-card/10 hover:bg-gold/20 flex items-center justify-center transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links - Mobile: Left Aligned, Desktop: Centered Block/Left Text */}
          <div className="flex flex-col items-start md:items-center">
            <div className="w-full md:w-fit">
              <h4 className="font-serif text-lg font-semibold text-gold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-secondary-foreground/80 hover:text-gold transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-gold mb-4">Contact Us</h4>
            <div className="space-y-3 text-sm text-secondary-foreground/80">
              <a
                href="https://maps.google.com/?q=441+Ellesmere+Rd,+Scarborough,+ON+M1R+4E5"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 hover:text-gold transition-colors"
              >
                <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5" />
                <span>441 Ellesmere Rd<br />Scarborough, ON M1R 4E5</span>
              </a>
              <a href="tel:+14165551234" className="flex items-center gap-2 hover:text-gold transition-colors">
                <Phone className="h-4 w-4" />
                +1 (416) 555-1234
              </a>
              <a href="mailto:info@jsot.ca" className="flex items-center gap-2 hover:text-gold transition-colors">
                <Mail className="h-4 w-4" />
                info@jsot.ca
              </a>
            </div>

            {/* Newsletter */}
            <div className="mt-6">
              <h5 className="font-semibold text-gold-light mb-2">Newsletter</h5>
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-card/10 border-gold/30 text-secondary-foreground placeholder:text-secondary-foreground/50"
                />
                <Button type="submit" variant="gold" size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="mt-12 rounded-lg overflow-hidden border border-gold/20">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d11526.134626821879!2d-79.297638!3d43.76178!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d4d2191c06747f%3A0xb276a3614cd9b804!2s441%20Ellesmere%20Rd!5e0!3m2!1sen!2sus!4v1770360106924!5m2!1sen!2sus"
            width="100%"
            height="200"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="JSOT Location"
            className="grayscale hover:grayscale-0 transition-all duration-500"
          />


        </div>
      </div>

      {/* Bottom Bar */}
      <p className="text-sm text-secondary-foreground/60 flex items-center gap-1">
        Made with
        <Heart className="h-4 w-4 text-saffron" />
        <a
          href="https://cloudgenz.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-primary transition-colors"
        >
          CloudGenz
        </a>
        {' '}
      </p>

    </footer>
  );
}