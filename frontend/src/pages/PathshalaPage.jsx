import React from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ExternalLink, CheckCircle, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

// Importing the image
// Make sure the image exists in src/assets/ folder
import pathshalaImg from "@/assets/JsotaPathshala.jpg"; 

const PathshalaPage = () => {
  const googleFormLink = "https://docs.google.com/forms/d/e/1FAIpQLScFhbx7UE3RVzkZsJvNQfq5_WcPs3o6PFQ7_-qmcCz_UlN7Gw/viewform";

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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Side: Image */}
            <div className="relative rounded-xl overflow-hidden shadow-2xl border-4 border-gold/20">
              <img 
                src={pathshalaImg} 
                alt="JSOT Pathshala Class" 
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* Right Side: Content */}
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

      <Footer />
    </div>
  );
};

export default PathshalaPage;