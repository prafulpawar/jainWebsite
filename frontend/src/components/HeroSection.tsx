import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
// Import images
import heroTemple from "@/assets/hero-temple.jpg";
import heroCommunity from "@/assets/hero-community.jpg";
import heroPuja from "@/assets/hero-puja.webp";
// 1. Import the PDF file here
import membershipPdf from "@/assets/pdf/JSOT-Member-Application-Form-2020-Janv2.pdf";

const slides = [
  {
    image: heroTemple,
    title: "Welcome to Jain Society of Toronto",
    subtitle: "Preserving Values, Uniting Community",
    cta: "Join Our Community",
    // 2. Use the imported PDF variable and add an 'isExternal' flag
    link: membershipPdf, 
    isExternal: true 
  },
  {
    image: heroCommunity,
    title: "A Home for Every Family",
    subtitle: "Building bonds through faith, culture, and togetherness",
    cta: "Plan a Visit",
    link: "/Visitor",
    isExternal: false
  },
  {
    image: heroPuja,
    title: "Sacred Traditions, Timeless Wisdom",
    subtitle: "Experience the peace of Jain rituals and ceremonies",
    cta: "View Events",
    link: "/events#upcoming",
    isExternal: false
  },
];

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-scroll logic
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section id="home" className="relative h-[70vh] min-h-[500px] overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide 
              ? "opacity-100 z-10 pointer-events-auto" 
              : "opacity-0 z-0 pointer-events-none"
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-secondary/80 via-secondary/50 to-transparent" />
          
          {/* Content */}
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4">
              <div className="max-w-2xl">
                <h1 
                  className={`font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-4 text-shadow transition-all duration-700 ${
                    index === currentSlide ? "animate-fade-in-up" : ""
                  }`}
                >
                  {slide.title}
                </h1>
                <p 
                  className={`text-xl md:text-2xl text-primary-foreground/90 mb-8 font-light transition-all duration-700 animation-delay-200 ${
                    index === currentSlide ? "animate-fade-in-up" : ""
                  }`}
                >
                  {slide.subtitle}
                </p>
                
                {/* 3. Conditional Rendering: External (PDF) vs Internal (Router) */}
                {slide.isExternal ? (
                  // External Link (For PDF)
                  <a 
                    href={slide.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <Button 
                      variant="gold" 
                      size="xl"
                      className={`transition-all duration-700 animation-delay-400 ${
                        index === currentSlide ? "animate-fade-in-up" : ""
                      }`}
                    >
                      {slide.cta}
                    </Button>
                  </a>
                ) : (
                  // Internal Link (React Router)
                  <Link to={slide.link}>
                    <Button 
                      variant="gold" 
                      size="xl"
                      className={`transition-all duration-700 animation-delay-400 ${
                        index === currentSlide ? "animate-fade-in-up" : ""
                      }`}
                    >
                      {slide.cta}
                    </Button>
                  </Link>
                )}

              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-card/30 hover:bg-card/50 backdrop-blur-sm p-3 rounded-full transition-all z-20"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6 text-primary-foreground" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-card/30 hover:bg-card/50 backdrop-blur-sm p-3 rounded-full transition-all z-20"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6 text-primary-foreground" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide ? "bg-gold w-8" : "bg-card/50 hover:bg-card/80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Decorative Bottom Border */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-maroon via-gold to-maroon z-20" />
    </section>
  );
}