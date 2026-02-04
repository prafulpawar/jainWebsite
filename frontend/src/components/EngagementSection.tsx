import { useState } from "react";
import { Check, Users, Heart, BookOpen, Calendar, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import membershipPdf from "@/assets/pdf/JSOT-Member-Application-Form-2020-Janv2.pdf";

const benefits = [
  { icon: Calendar, text: "Priority booking for all temple events and ceremonies" },
  { icon: BookOpen, text: "Free access to Pathshala classes for children" },
  { icon: Users, text: "Exclusive member-only community gatherings" },
  { icon: Heart, text: "Discounts on puja services and temple hall rentals" },
  { icon: Star, text: "Voting rights in annual general meetings" },
];

export function EngagementSection() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    membershipType: "family",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Application Submitted!",
      description: "Thank you for your interest. We will contact you shortly.",
    });
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      membershipType: "family",
    });
  };

 const handleApplyClick = () => {
  window.open(membershipPdf, "_blank", "noopener,noreferrer");
};

  return (
    <section id="engagement" className="py-16 md:py-24 bg-gradient-to-br from-secondary via-secondary to-maroon">
      <div className="container mx-auto px-4">
        {/* Changed from grid to flex/centered layout with max-width */}
        <div className="max-w-3xl mx-auto text-center">

          <div className="text-secondary-foreground">
            <span className="text-gold font-medium uppercase tracking-wider">Join Us</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold mt-2 mb-6">
              Become a Member or Volunteer
            </h2>
            <p className="text-secondary-foreground/80 mb-8 text-lg">
              Join our vibrant community and be part of something meaningful. As a member, you'll help preserve our
              traditions while building lasting connections with fellow devotees.
            </p>

            {/* Added max-w, mx-auto, and text-left to keep the list icons aligned nicely in the center */}
            <div className="space-y-4 max-w-lg mx-auto text-left">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="h-5 w-5 text-gold" />
                  </div>
                  <div className="flex items-center gap-2 pt-2">
                    <Check className="h-4 w-4 text-gold" />
                    <span className="text-secondary-foreground/90">{benefit.text}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-card/10 backdrop-blur-sm rounded-lg border border-gold/20">
              <h4 className="font-serif text-xl font-semibold text-gold mb-2">Membership Options</h4>
              <div className="grid grid-cols-2 gap-4 text-secondary-foreground/90">
                <div>
                  <span className="text-2xl font-bold text-gold">$150</span>
                  <span className="text-sm block">Individual / Year</span>
                </div>
                <div>
                  <span className="text-2xl font-bold text-gold">$250</span>
                  <span className="text-sm block">Family / Year</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <Button
              onClick={handleApplyClick}
              size="lg"
              className="bg-gold hover:bg-gold/90 text-secondary font-bold text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              Apply For Membership
            </Button>
          </div>

        </div>
    </div>
    </section >
  );
}