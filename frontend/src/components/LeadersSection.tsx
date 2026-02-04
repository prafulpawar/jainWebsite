import { Mail, Phone, Briefcase, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// --- BOARD OF DIRECTORS IMAGES ---
import mahendraImg from "@/assets/Mahendra-Jain-e1646620015678.jpg";
import manharImg from "@/assets/Manhar-Sheth-rotated-e1646620155108.jpg";
import devangImg from "@/assets/3DEVANG-SHAH-PHOTO-268x300-1.jpg";
import pareshImg from "@/assets/Paresh-Doshi-e1661222984255.png";
// Note: Surinder Jain has no image, handled in logic below.

// --- MANAGEMENT COMMITTEE IMAGES ---
import nikhilImg from "@/assets/Management/NikhilNagda.jpg";
import nirajImg from "@/assets/Management/Niraj-Shah-e1638313902487.jpg"; 
import naisargiImg from "@/assets/Management/2naisargi_shah_3495-e1750340985144.jpg"; 
import hiteshImg from "@/assets/Management/3Hitesh-Shah.jpg"; 
import jatinImg from "@/assets/Management/jatingandhi-e1752288627863.jpg";
import kevalImg from "@/assets/Management/kevalshah_new-e1752287489522.jpg";
import nikhileshImg from "@/assets/Management/Nikhilesh Modh.jpg";
import nimeshImg from "@/assets/Management/nimeshmehta-e1752288072526.jpg";
import rahiImg from "@/assets/Management/rahijain-e1752288328649.jpg";
import ronakImg from "@/assets/Management/roank-nagda-new-scaled-e1752286971676.jpg";
import viraagImg from "@/assets/Management/viraagpatni-e1752291960381.jpeg";
import viralImg from "@/assets/Management/viralshah-e1752991409945.jpg";

// --- DATA: BOARD OF DIRECTORS ---
// Updated based on provided text
const boardMembers = [
  {
    name: "Mahendra Jain",
    role: "BOD Chairperson",
    image: mahendraImg,
    email: "drjainkmc@gmail.com",
    phone: "+1 (416) 837-7166"
  },
  {
    name: "Surinder Jain",
    role: "BOD Secretary",
    image: null, // No photo provided
    email: "surinjain@yahoo.com",
    phone: "+1 (905) 462-9246"
  },
  {
    name: "Manhar Sheth",
    role: "BOD Past Chairperson",
    image: manharImg,
    email: "manharsheth@rogers.com",
    phone: "+1 (416) 895-9847"
  },
  {
    name: "Devangkumar Shah",
    role: "BOD",
    image: devangImg,
    email: "devangkumar.shah@gmail.com",
    phone: "+1 (416) 846-5837"
  },
  {
    name: "Paresh Doshi",
    role: "BOD",
    image: pareshImg,
    email: "doshihome@hotmail.com",
    phone: "+1 (416) 219-0000"
  },
   {
    name: "Nikhil Nagda",
    role: "President",
    email: "nikhil.jsot@gmail.com",
    phone: "+1 (647) 979-5953",
    image: nikhilImg,
  },
  {
    name: "Niraj Shah",
    role: "Vice President",
    email: "nirajshahjsot@gmail.com",
    phone: "+1 (416) 710-4746",
    image: nirajImg,
  },
  {
    name: "Naisargi Shah",
    role: "Secretary",
    email: "naisargishah.jsot@gmail.com",
    phone: "+1 (647) 704-6995",
    image: naisargiImg,
  },
  {
    name: "Hitesh Shah",
    role: "Treasurer",
    email: "hitesh.jsot@gmail.com",
    phone: "+1 (416) 520-7427",
    image: hiteshImg,
  },
];

// --- DATA: MANAGEMENT COMMITTEE ---
const managementCommittee = [
  {
    name: "Nikhil Nagda",
    role: "President",
    email: "nikhil.jsot@gmail.com",
    phone: "+1 (647) 979-5953",
    image: nikhilImg,
  },
  {
    name: "Niraj Shah",
    role: "Vice President",
    email: "nirajshahjsot@gmail.com",
    phone: "+1 (416) 710-4746",
    image: nirajImg,
  },
  {
    name: "Naisargi Shah",
    role: "Secretary",
    email: "naisargishah.jsot@gmail.com",
    phone: "+1 (647) 704-6995",
    image: naisargiImg,
  },
  {
    name: "Hitesh Shah",
    role: "Treasurer",
    email: "hitesh.jsot@gmail.com",
    phone: "+1 (416) 520-7427",
    image: hiteshImg,
  },
  {
    name: "Jatin Gandhi",
    role: "Management Committee",
    email: "jatin.jsot@gmail.com",
    phone: "+1 (416) 526-2879",
    image: jatinImg,
  },
  {
    name: "Keval Shah",
    role: "Management Committee",
    email: "keval.jsot@gmail.com",
    phone: "+1 (647) 270-7845",
    image: kevalImg,
  },
  {
    name: "Nikhilesh Modh",
    role: "Management Committee",
    email: "nikhilesh.jsot@gmail.com",
    phone: "+1 (647) 239-7237",
    image: nikhileshImg,
  },
  {
    name: "Nimesh Mehta",
    role: "Management Committee",
    email: "nimesh.jsot@gmail.com",
    phone: "+1 (647) 778-7783",
    image: nimeshImg,
  },
  {
    name: "Rahi Jain",
    role: "Management Committee",
    email: "rahi.jsot@gmail.com",
    phone: "+1 (437) 230-8231",
    image: rahiImg,
  },
  {
    name: "Ronak Nagda",
    role: "Management Committee",
    email: "ronakjsot@gmail.com",
    phone: "+1 (647) 308-4796",
    image: ronakImg,
  },
  {
    name: "Viraag Patni",
    role: "Management Committee",
    email: "viraag.jsot@gmail.com",
    phone: "+1 (647) 854-2766",
    image: viraagImg,
  },
  {
    name: "Viral Shah",
    role: "Management Committee",
    email: "viral.jsot@gmail.com",
    phone: "+1 (437) 777-2337",
    image: viralImg,
  },
];

// --- DATA: SERVICES (Community Directory) ---
const services = [
  {
    name: "Jain Accounting Services",
    owner: "Hemant Sheth, CPA",
    category: "Financial Services",
    phone: "(416) 555-0101",
  },
  {
    name: "Ahimsa Legal Consulting",
    owner: "Meera Jain, LLB",
    category: "Legal Services",
    phone: "(416) 555-0102",
  },
  {
    name: "Satvik Catering",
    owner: "Kiran Doshi",
    category: "Food & Catering",
    phone: "(416) 555-0103",
  },
  {
    name: "Jain Real Estate",
    owner: "Sanjay Parekh",
    category: "Real Estate",
    phone: "(416) 555-0104",
  },
];

// Helper Component for Member Card
const MemberCard = ({ member, showPhone = false }: { member: any, showPhone?: boolean }) => (
  <Card className="border-gold/20 overflow-hidden group hover:shadow-xl transition-all duration-300">
    <CardContent className="p-6 text-center">
      <div className="relative w-32 h-32 mx-auto mb-4">
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-saffron to-gold animate-glow opacity-20 group-hover:opacity-100 transition-opacity" />
        {member.image ? (
          <img
            src={member.image}
            alt={member.name}
            className="w-full h-full rounded-full object-cover border-4 border-card relative z-10 group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full rounded-full border-4 border-card relative z-10 group-hover:scale-105 transition-transform duration-300 bg-secondary/10 flex items-center justify-center text-secondary">
             {/* Placeholder for missing image */}
             <span className="text-3xl font-serif font-bold opacity-50">{member.name.charAt(0)}</span>
          </div>
        )}
      </div>
      <h3 className="font-serif text-lg font-bold text-secondary">{member.name}</h3>
      <p className="text-saffron font-medium text-sm mt-1 uppercase tracking-wide">{member.role}</p>
      
      <div className="mt-4 space-y-2 flex flex-col items-center justify-center text-sm text-muted-foreground">
        {member.email && (
          <a
            href={`mailto:${member.email}`}
            className="inline-flex items-center gap-2 hover:text-gold transition-colors"
          >
            <Mail className="h-3.5 w-3.5" />
            <span className="truncate max-w-[200px]">{member.email}</span>
          </a>
        )}
        {showPhone && member.phone && (
          <a
            href={`tel:${member.phone.replace(/\D/g, "")}`}
            className="inline-flex items-center gap-2 hover:text-gold transition-colors"
          >
            <Phone className="h-3.5 w-3.5" />
            <span>{member.phone}</span>
          </a>
        )}
      </div>
    </CardContent>
  </Card>
);

export function LeadersSection() {
  return (
    <section id="community" className="py-16 md:py-24 mandala-pattern relative">
      <div className="container mx-auto px-4 relative z-10">
        
        {/* --- LEADERSHIP TABS --- */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <span className="text-gold font-medium uppercase tracking-wider">Meet Our Team</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-secondary mt-2">
              Community Leaders
            </h2>
            <div className="section-divider w-32 mx-auto mt-4 mb-6" />
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The dedicated individuals serving on our Board and Management Committee.
            </p>
          </div>

          <Tabs defaultValue="management" className="w-full">
            <div className="flex justify-center mb-10">
              <TabsList className="grid w-full max-w-md grid-cols-2 bg-secondary/5 border border-gold/20">
                <TabsTrigger 
                  value="management" 
                  className="data-[state=active]:bg-gold data-[state=active]:text-white font-serif font-semibold"
                >
                  Management Committee
                </TabsTrigger>
                <TabsTrigger 
                  value="board" 
                  className="data-[state=active]:bg-gold data-[state=active]:text-white font-serif font-semibold"
                >
                  Board of Directors
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="management" className="animate-fade-in">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {managementCommittee.map((member, index) => (
                  <MemberCard key={`mgmt-${index}`} member={member} showPhone={true} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="board" className="animate-fade-in">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {boardMembers.map((member, index) => (
                  <MemberCard key={`board-${index}`} member={member} showPhone={true} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* --- COMMUNITY DIRECTORY --- */}
        <div className="pt-10 border-t border-gold/10">
          <div className="text-center mb-12">
            <span className="text-gold font-medium uppercase tracking-wider">Support Local</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-secondary mt-2">
              Community Business Directory
            </h2>
            <div className="section-divider w-32 mx-auto mt-4" />
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Connect with trusted businesses owned by our community members
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {services.map((service, index) => (
              <Card key={index} className="border-gold/20 hover:shadow-lg hover:border-saffron/30 transition-all duration-300">
                <CardContent className="p-5">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-saffron/20 to-gold/20 flex items-center justify-center mb-3">
                    <Briefcase className="h-6 w-6 text-saffron" />
                  </div>
                  <span className="text-xs font-medium text-gold bg-gold/10 px-2 py-0.5 rounded">
                    {service.category}
                  </span>
                  <h4 className="font-semibold text-foreground mt-2">{service.name}</h4>
                  <p className="text-sm text-muted-foreground">{service.owner}</p>
                  <p className="text-sm text-saffron font-medium mt-2">{service.phone}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button variant="outline" className="border-gold text-gold hover:bg-gold hover:text-white">
              View Full Directory
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}