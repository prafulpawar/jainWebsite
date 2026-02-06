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
  // Note: Form state is kept here if you plan to add a contact form later, 
  // currently only used for the toast demo if needed.
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    membershipType: "family",
  });

  const handleApplyClick = () => {
    window.open(membershipPdf, "_blank", "noopener,noreferrer");
  };

  // New handler for the Update Information button
  const handleUpdateClick = () => {
    window.open(
      "https://jsotcanada.org/wp-content/uploads/2020/01/JSOT-Members-Update-Form-2020-Janv2.pdf", 
      "_blank", 
      "noopener,noreferrer"
    );
  };

  return (
    // Background color set to #F8F6F1
    <section id="engagement" className="py-16 md:py-24 bg-[#F8F6F1]">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">

          {/* Main text container color set to #8C1919 */}
          <div className="text-[#8C1919]">
            <span className="text-gold font-medium uppercase tracking-wider">Join Us</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold mt-2 mb-6">
              Become a Member or Volunteer
            </h2>
            
            {/* Paragraph text color updated */}
            <p className="text-[#8C1919]/80 mb-8 text-lg">
              Join our vibrant community and be part of something meaningful. As a member, you'll help preserve our
              traditions while building lasting connections with fellow devotees.
            </p>

            <div className="space-y-4 max-w-lg mx-auto text-left">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="h-5 w-5 text-gold" />
                  </div>
                  <div className="flex items-center gap-2 pt-2">
                    <Check className="h-4 w-4 text-gold" />
                    {/* List item text color updated */}
                    <span className="text-[#8C1919]">{benefit.text}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-white/50 backdrop-blur-sm rounded-lg border border-gold/20">
              <h4 className="font-serif text-xl font-semibold text-gold mb-2">Membership Options</h4>
              {/* Membership details text color updated */}
              <div className="grid grid-cols-2 gap-4 text-[#8C1919]">
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

          {/* Buttons Container */}
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center">
            {/* Apply Button */}
            <Button
              onClick={handleApplyClick}
              size="lg"
              className="bg-gold hover:bg-gold/90 text-secondary font-bold text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 w-full sm:w-auto"
            >
              Apply For Membership
            </Button>

            {/* Update Information Button */}
            <Button
              onClick={handleUpdateClick}
              size="lg"
              variant="outline"
              className="border-2 border-gold text-[#8C1919] hover:bg-gold hover:text-secondary font-bold text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 w-full sm:w-auto bg-transparent"
            >
              Update Your Information
            </Button>
          </div>

        </div>
      </div>
    </section>
  );
}