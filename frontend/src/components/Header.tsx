import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Facebook, Instagram, Youtube, Sun, Moon, Calendar, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import logoJain from "@/assets/logoJain.jpg";
import SunCalc from "suncalc";

const navItems = [
  { name: "Home", href: "/" },
  {
    name: "About",
    href: "/about",
    submenu: [
      { name: "About Jainism", href: "/about#jainism" },
      { name: "About JSOT", href: "/about#jsot" },
      { name: "Board of Directors", href: "/about#board" },
      { name: "Management Committee", href: "/about#management" },
    ]
  },
  {
    name: "Events",
    href: "/events",
    // Added Submenu for Events here
    submenu: [
      { name: "Upcoming Events", href: "/events#upcoming" },
      { name: "Calendar", href: "/events#calendar" },
      { name: "Affiliated Groups", href: "/events#groups" },
      { name: "Past Events Gallery", href: "/events#past" },
    ]
  },
  { name: "Resources", href: "/resources" },
  // { name: "Contact", href: "/contact" },
  { name: "Visitors", href: '/Visitor' }
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // State to track which mobile submenu is open
  const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState<string | null>(null);

  const location = useLocation();

  const isExternalLink = (href: string) => href.startsWith("#");

  const toggleMobileSubmenu = (name: string) => {
    setMobileSubmenuOpen(mobileSubmenuOpen === name ? null : name);
  };

  const formatTime = (date: Date) =>
    date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone: "America/Toronto", 
    });

  const addMinutes = (date: Date, minutes: number) =>
    new Date(date.getTime() + minutes * 60000);


  const getPanchangData = () => {
    const today = new Date();

    const moonPhases = ["🌑", "🌒", "🌓", "🌔", "🌕", "🌖", "🌗", "🌘"];
    const tithis = [
      "Pratipada", "Dwitiya", "Tritiya", "Chaturthi", "Panchami",
      "Shashthi", "Saptami", "Ashtami", "Navami", "Dashami",
      "Ekadashi", "Dwadashi", "Trayodashi", "Chaturdashi", "Purnima", "Amavasya"
    ];

    const dayOfMonth = today.getDate();
    const tithiIndex = (dayOfMonth - 1) % 16;
    const moonIndex = Math.floor((dayOfMonth / 30) * 8) % 8;

    // 🌞 Sun times for Toronto
    const sunTimes = SunCalc.getTimes(
      today,
      43.6532,
      -79.3832
    );

    const sunrise = sunTimes.sunrise;
    const sunset = sunTimes.sunset;


     const navkarsi = addMinutes(sunrise, 48);
     const chovihar = sunset; 

      return {
      tithi: tithis[tithiIndex], // Note: Yeh mock tithi hai, real nahi
      moonPhase: moonPhases[moonIndex],
      sunrise: formatTime(sunrise),
      sunset: formatTime(sunset),
      navkarsi: formatTime(navkarsi),
      chovihar: formatTime(chovihar),
    };
  };

  const panchang = getPanchangData();

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm shadow-md border-b-2 border-gold/30">

      {/* Top Bar with Panchang Data */}
      <div className="bg-secondary text-secondary-foreground py-2 px-4">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-sm gap-2 md:gap-0">

          <div className="flex flex-wrap justify-center md:justify-start items-center gap-3 md:gap-4 text-xs md:text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="w-3 h-3 md:w-4 md:h-4 text-gold" />
              <span className="opacity-80 hidden sm:inline">Tithi:</span>
              <span className="font-semibold text-gold-light">{panchang.tithi}</span>
            </div>

            <span className="hidden sm:inline opacity-30">|</span>

            <div className="flex items-center gap-2">
              <Sun className="w-3 h-3 md:w-4 md:h-4 text-gold" />
              <span className="opacity-80 hidden sm:inline">Navkarsi:</span>
              <span className="font-semibold text-gold-light">{panchang.navkarsi}</span>
            </div>

            <span className="hidden sm:inline opacity-30">|</span>

            <div className="flex items-center gap-2">
              <Moon className="w-3 h-3 md:w-4 md:h-4 text-gold" />
              <span className="opacity-80 hidden sm:inline">Chovihar:</span>
              <span className="font-semibold text-gold-light">{panchang.chovihar}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden lg:inline text-gold-light font-medium text-xs">॥ Jai Jinendra ॥</span>
            <div className="flex gap-2">
              <a
                href="https://www.facebook.com/jsotcanada/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="hover:text-gold transition-colors"
              >
                <Facebook className="h-4 w-4" />
              </a>

              <a
                href="https://www.instagram.com/jainsocietyoftoronto/?hl=en"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="hover:text-gold transition-colors"
              >
                <Instagram className="h-4 w-4" />
              </a>

              <a
                href="https://www.youtube.com/@jainsocietyoftoronto-media131"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="hover:text-gold transition-colors"
              >
                <Youtube className="h-4 w-4" />
              </a>
            </div>

          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-saffron to-gold flex items-center justify-center shadow-lg">
              <img
                src={logoJain}
                alt="JSOT Logo"
                className="w-12 h-12 rounded-full object-cover shadow-lg border border-gold/20"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl font-bold text-secondary">JSOT</span>
              <span className="text-xs text-muted-foreground">Jain Society of Toronto</span>
            </div>
          </Link>

          {/* DESKTOP NAVIGATION */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              // Has Submenu?
              if (item.submenu) {
                return (
                  <div key={item.name} className="relative group px-3 py-2">
                    <button
                      className="flex items-center gap-1 text-foreground hover:text-primary font-medium transition-colors focus:outline-none"
                    >
                      {item.name}
                      <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                    </button>

                    {/* Dropdown Menu */}
                    <div className="absolute left-0 top-full pt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-50">
                      <div className="bg-card border border-gold/20 rounded-lg shadow-xl overflow-hidden">
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.name}
                            to={subItem.href}
                            className="block px-4 py-3 text-sm text-foreground/80 hover:bg-gold/10 hover:text-primary transition-colors border-b border-border last:border-0"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }

              // Normal Link
              if (isExternalLink(item.href)) {
                return (
                  <a key={item.name} href={item.href} className="px-4 py-2 text-foreground hover:text-primary font-medium transition-colors">
                    {item.name}
                  </a>
                );
              }
              return (
                <Link key={item.name} to={item.href} className="px-4 py-2 text-foreground hover:text-primary font-medium transition-colors">
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Donate Button & Hamburger */}
          <div className="flex items-center gap-3">
            <Button variant="default" size="lg" className="hidden sm:flex bg-gold hover:bg-gold/80 text-black font-semibold">
              DONATE NOW
            </Button>
            <button
              className="lg:hidden p-2 text-foreground hover:text-primary"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* MOBILE NAVIGATION */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-border pt-4 animate-in slide-in-from-top-2">
            {navItems.map((item) => (
              <div key={item.name}>
                {item.submenu ? (
                  // Mobile Submenu Logic
                  <div>
                    <button
                      onClick={() => toggleMobileSubmenu(item.name)}
                      className="flex items-center justify-between w-full py-2 text-foreground hover:text-primary font-medium"
                    >
                      {item.name}
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${mobileSubmenuOpen === item.name ? "rotate-180" : ""}`}
                      />
                    </button>

                    {mobileSubmenuOpen === item.name && (
                      <div className="pl-4 space-y-1 border-l-2 border-gold/20 ml-2 mb-2">
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.name}
                            to={subItem.href}
                            className="block py-2 text-sm text-muted-foreground hover:text-primary"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  // Mobile Standard Link
                  <Link
                    to={item.href}
                    className="block py-2 text-foreground hover:text-primary font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
            <Button className="w-full mt-4 bg-gold hover:bg-gold/80 text-black">
              DONATE NOW
            </Button>
          </div>
        )}
      </nav>
    </header>
  );
}