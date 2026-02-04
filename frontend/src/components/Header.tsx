import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Facebook, Instagram, Youtube, Sun, Moon, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

// 1. Removed submenu arrays from navItems
const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Events", href: "/events" },
  // { name: "Services", href: "/services" },
  { name: "Resources", href: "/resources" },
  { name: "Contact", href: "/contact" },
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // 2. Removed activeDropdown state as it's no longer needed

  const isExternalLink = (href: string) => href.startsWith("#");

  // 3. Simplified NavLink (removed ChevronDown and submenu checks)
  const NavLink = ({ item, className, onClick }: { item: typeof navItems[0]; className?: string; onClick?: () => void }) => {
    if (isExternalLink(item.href)) {
      return (
        <a href={item.href} className={className} onClick={onClick}>
          {item.name}
        </a>
      );
    }
    return (
      <Link to={item.href} className={className} onClick={onClick}>
        {item.name}
      </Link>
    );
  };

  // 4. Removed SubNavLink component entirely

  // Mock Panchang data logic (Unchanged)
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

    return {
      tithi: tithis[tithiIndex],
      moonPhase: moonPhases[moonIndex],
      sunrise: "6:45 AM",
      sunset: "5:32 PM",
      navkarsi: "7:33 AM",
      chovihar: "4:44 PM",
    };
  };

  const panchang = getPanchangData();

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm shadow-md border-b-2 border-gold/30">
      
      {/* Top Bar with Panchang Data (Unchanged) */}
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
            
            <span className="hidden sm:inline opacity-30">|</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden lg:inline text-gold-light font-medium text-xs">॥ Jai Jinendra ॥</span>
            <div className="flex gap-2">
              <a href="#" aria-label="Facebook" className="hover:text-gold transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" aria-label="Instagram" className="hover:text-gold transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" aria-label="YouTube" className="hover:text-gold transition-colors">
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
              <span className="text-2xl font-serif font-bold text-primary-foreground">॥</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl font-bold text-secondary">JSOT</span>
              <span className="text-xs text-muted-foreground">Jain Society of Toronto</span>
            </div>
          </Link>

          {/* 5. Simplified Desktop Navigation (Direct links only) */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                item={item}
                className="flex items-center gap-1 px-4 py-2 text-foreground hover:text-primary font-medium transition-colors"
              />
            ))}
          </div>

          {/* Donate Button & Mobile Menu */}

          <div className="flex items-center gap-3">
            <Button variant="donate" size="lg" className="hidden sm:flex">
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

        {/* 6. Simplified Mobile Navigation (Direct links only) */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-border pt-4 ">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                item={item}
                className="block py-2 text-foreground hover:text-primary font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              />
            ))}
            <Button variant="donate" className="w-full mt-4">
              DONATE NOW
            </Button>
          </div>
        )}
      </nav>
    </header>
  );
}