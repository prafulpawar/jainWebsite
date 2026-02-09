import React, { useState, useEffect, useCallback } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { 
  ExternalLink, 
  CheckCircle, 
  ArrowLeft, 
  ImageIcon, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Maximize2 
} from "lucide-react";
import { Link } from "react-router-dom";

// Importing the image
import pathshalaImg from "@/assets/JsotaPathshala.jpg"; 

const PathshalaPage = () => {
  const googleFormLink = "https://docs.google.com/forms/d/e/1FAIpQLScFhbx7UE3RVzkZsJvNQfq5_WcPs3o6PFQ7_-qmcCz_UlN7Gw/viewform";

  // --- GALLERY LOGIC START ---

  const galleryImages = [
    pathshalaImg,
    // Add more images here if needed
  ];

  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openGallery = () => {
    setCurrentImageIndex(0);
    setIsGalleryOpen(true);
    document.body.style.overflow = 'hidden'; 
  };

  const closeGallery = () => {
    setIsGalleryOpen(false);
    document.body.style.overflow = 'unset';
  };

  const nextImage = useCallback((e) => {
    e?.stopPropagation();
    setCurrentImageIndex((prev) => 
      prev === galleryImages.length - 1 ? 0 : prev + 1
    );
  }, [galleryImages.length]);

  const prevImage = useCallback((e) => {
    e?.stopPropagation();
    setCurrentImageIndex((prev) => 
      prev === 0 ? galleryImages.length - 1 : prev - 1
    );
  }, [galleryImages.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isGalleryOpen) return;
      if (e.key === 'Escape') closeGallery();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isGalleryOpen, nextImage, prevImage]);

  // --- GALLERY LOGIC END ---

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-secondary to-maroon text-white py-12">
          <div className="container mx-auto px-4">
            <Link to="/events" className="inline-flex items-center text-white/80 hover:text-white mb-4 transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Events
            </Link>
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">JSOT Pathshala</h1>
            <p className="text-xl opacity-90 max-w-2xl">
              Instilling spiritual development, self-awareness, and moral consciousness in the next generation.
            </p>
          </div>
        </section>

        <section className="py-12 md:py-16 container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* 
              LEFT SIDE: IMAGE CONTAINER
              - lg:h-auto -> Desktop par height auto hogi (Grid stretch karega).
              - relative -> Taki overlay iske andar hi rahe.
            */}
            <div 
              className="relative w-full lg:h-auto rounded-xl overflow-hidden shadow-2xl border-4 border-gold/20 group cursor-pointer bg-black"
              onClick={openGallery}
            >
              {/* 
                 IMAGE TAG FIX:
                 1. Mobile (Default): 'h-64 w-full object-cover'. (Fixed height, visible).
                 2. Desktop (lg): 'lg:absolute lg:inset-0 lg:h-full'. (Fills container matches text height).
              */}
              <img 
                src={galleryImages[0]} 
                alt="JSOT Pathshala Class" 
                className="w-full h-64 sm:h-80 lg:absolute lg:inset-0 lg:h-full object-cover transition-transform duration-700 group-hover:scale-105 group-hover:opacity-90"
              />

              {/* Hover Overlay Effect */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 flex flex-col items-center gap-2">
                  <div className="bg-white/20 backdrop-blur-md p-3 rounded-full border border-white/30">
                     <Maximize2 className="h-8 w-8 text-white" />
                  </div>
                  <span className="text-white font-medium tracking-wide text-sm bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm">
                    View Full Size
                  </span>
                </div>
              </div>

            </div>

            {/* RIGHT SIDE: CONTENT */}
            <div className="space-y-6">
              <h2 className="text-3xl font-serif font-bold text-secondary">About Our Pathshala</h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                In the last 40 years, Toronto has seen a rapid growth of Jains. Pathshala instills spiritual development, self-awareness, moral consciousness, and Jain identity in students aged 5 to 18.
              </p>
              
              <div className="bg-muted/30 p-6 rounded-lg border border-gold/20">
                <h3 className="font-bold text-secondary mb-4 text-lg">Program Highlights:</h3>
                <ul className="space-y-3">
                  {[
                    "Classes run September to June",
                    "Basic Jain principles & Philosophy",
                    "Moral consciousness & social well-being",
                    "Cultural activities and festivals",
                    "Language learning (Hindi/Gujarati)"
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-3 text-secondary/80">
                      <CheckCircle className="h-5 w-5 text-saffron flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4">
                <a 
                  href={googleFormLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all bg-saffron hover:bg-saffron/90 rounded-md shadow-lg hover:shadow-xl hover:-translate-y-1"
                >
                  Register Now <ExternalLink className="w-5 h-5 ml-2" />
                </a>
                <p className="mt-3 text-sm text-muted-foreground italic">
                  * Clicking above will open the registration form in a new tab.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ---------------- GALLERY MODAL ---------------- */}
      {isGalleryOpen && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center animate-in fade-in duration-300">
          
          {/* Close Button */}
          <button 
            onClick={closeGallery}
            className="absolute top-4 right-4 z-[110] p-2 bg-black/50 hover:bg-white/20 rounded-full text-white transition-colors"
          >
            <X className="h-6 w-6 md:h-8 md:w-8" />
          </button>

          <div className="relative w-full h-full flex flex-col items-center justify-center px-4 md:px-20 py-10">
            
            {/* Gallery Info Top Left */}
            <div className="absolute top-4 left-4 md:left-10 text-white z-[105] pointer-events-none pr-12">
              <h3 className="text-lg md:text-xl font-serif font-bold line-clamp-1">JSOT Pathshala</h3>
              <p className="text-xs md:text-sm opacity-80">{currentImageIndex + 1} / {galleryImages.length}</p>
            </div>

            {/* Main Large Image */}
            <div className="relative w-full h-full flex items-center justify-center">
              <img 
                src={galleryImages[currentImageIndex]} 
                alt={`Gallery ${currentImageIndex}`}
                className="max-w-full max-h-[90vh] object-contain shadow-2xl rounded-sm transition-opacity duration-300"
              />
            </div>

            {/* Navigation Arrows */}
            {galleryImages.length > 1 && (
              <>
                <button 
                  onClick={prevImage}
                  className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 p-2 md:p-3 bg-black/40 hover:bg-white/10 rounded-full text-white transition-all hover:scale-110"
                >
                  <ChevronLeft className="h-6 w-6 md:h-8 md:w-8" />
                </button>
                <button 
                  onClick={nextImage}
                  className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 p-2 md:p-3 bg-black/40 hover:bg-white/10 rounded-full text-white transition-all hover:scale-110"
                >
                  <ChevronRight className="h-6 w-6 md:h-8 md:w-8" />
                </button>
              </>
            )}

          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default PathshalaPage;