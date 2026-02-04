import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Clock, Users, Heart, BookOpen, Calendar, Phone, Mail, Star, Sparkles, Home, Music, Utensils } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const services = [
  {
    id: "darshan",
    icon: Sparkles,
    title: "Daily Darshan",
    subtitle: "Morning & Evening Worship",
    description: "Experience the divine presence with our daily darshan sessions. The temple is open for worship with morning and evening aarti ceremonies.",
    timings: [
      { day: "Monday - Friday", time: "6:30 AM - 8:30 AM & 6:00 PM - 8:00 PM" },
      { day: "Saturday", time: "7:00 AM - 12:00 PM & 5:00 PM - 8:00 PM" },
      { day: "Sunday", time: "7:00 AM - 1:00 PM & 5:00 PM - 8:30 PM" },
    ],
    highlight: "Special extended hours during festivals",
    color: "from-saffron to-saffron-light",
  },
  {
    id: "puja",
    icon: Star,
    title: "Puja Services",
    subtitle: "Sacred Rituals & Ceremonies",
    description: "Book personalized puja services for special occasions including birthdays, anniversaries, and auspicious days. Our trained priests perform traditional Jain rituals.",
    offerings: [
      "Navkar Mantra Puja",
      "Snatra Puja",
      "Shantipath",
      "Siddhachakra Puja",
      "Special Abhishek",
    ],
    price: "Starting from $101",
    color: "from-gold to-gold-light",
  },
  {
    id: "pathshala",
    icon: BookOpen,
    title: "Pathshala Classes",
    subtitle: "Religious Education for Youth",
    description: "Comprehensive religious education program for children and youth. Learn about Jain philosophy, rituals, Prakrit language, and cultural values.",
    schedule: [
      { class: "Junior (Ages 5-8)", time: "Sundays 10:00 AM - 11:30 AM" },
      { class: "Intermediate (Ages 9-12)", time: "Sundays 10:00 AM - 12:00 PM" },
      { class: "Senior (Ages 13-17)", time: "Sundays 11:00 AM - 1:00 PM" },
    ],
    highlight: "Annual enrollment fee: $50 per child",
    color: "from-secondary to-maroon",
  },
  {
    id: "wedding",
    icon: Heart,
    title: "Wedding Services",
    subtitle: "Traditional Jain Weddings",
    description: "Celebrate your union with a beautiful traditional Jain wedding ceremony. Our experienced priests and team ensure every ritual is performed with devotion and precision.",
    includes: [
      "Pre-wedding ceremonies (Mandap Mahurat)",
      "Main wedding ceremony with Saptapadi",
      "Priest services & religious guidance",
      "Coordination with temple schedule",
    ],
    price: "Contact for customized packages",
    color: "from-maroon to-maroon-light",
  },
  {
    id: "hall",
    icon: Home,
    title: "Hall Rental",
    subtitle: "Community & Event Space",
    description: "Our spacious community hall is available for rent for religious functions, community gatherings, and celebrations. Fully equipped with modern amenities.",
    facilities: [
      "Capacity: 300 guests",
      "Full kitchen facilities",
      "Audio-visual equipment",
      "Parking for 100 vehicles",
      "Wheelchair accessible",
    ],
    price: "Half Day: $500 | Full Day: $900",
    color: "from-saffron to-gold",
  },
  {
    id: "catering",
    icon: Utensils,
    title: "Satvik Catering",
    subtitle: "Pure Vegetarian Cuisine",
    description: "Authentic Jain satvik food prepared following strict guidelines - no onion, no garlic, fresh ingredients only. Perfect for your religious and social functions.",
    options: [
      "Traditional Gujarati Thali",
      "Rajasthani Cuisine",
      "South Indian Options",
      "Festival Special Menus",
    ],
    price: "Starting from $15 per person",
    color: "from-gold to-saffron",
  },
];

const ServicesPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Banner */}
        <section className="relative py-20 bg-gradient-to-r from-secondary via-maroon to-secondary">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27100%27 height=%27100%27 viewBox=%270 0 100 100%27%3E%3Ccircle cx=%2750%27 cy=%2750%27 r=%2740%27 fill=%27none%27 stroke=%27%23D4AF37%27 stroke-width=%270.5%27/%3E%3C/svg%3E')] bg-repeat" />
          </div>
          <div className="container mx-auto px-4 relative z-10 text-center">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-secondary-foreground mb-4">
              Temple Services
            </h1>
            <p className="text-secondary-foreground/80 text-lg max-w-2xl mx-auto">
              Explore our comprehensive range of religious services, educational programs, and community facilities
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16 mandala-pattern relative">
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid md:grid-cols-2 gap-8">
              {services.map((service) => (
                <Card 
                  key={service.id} 
                  id={service.id}
                  className="border-gold/20 overflow-hidden hover:shadow-2xl transition-all duration-300 scroll-mt-32"
                >
                  <CardHeader className={`bg-gradient-to-r ${service.color} text-primary-foreground`}>
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-full bg-card/20 flex items-center justify-center">
                        <service.icon className="h-7 w-7" />
                      </div>
                      <div>
                        <CardTitle className="font-serif text-2xl">{service.title}</CardTitle>
                        <p className="text-primary-foreground/80 text-sm">{service.subtitle}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <p className="text-muted-foreground mb-4">{service.description}</p>

                    {/* Darshan Timings */}
                    {service.timings && (
                      <div className="space-y-2 mb-4">
                        <h4 className="font-semibold text-secondary flex items-center gap-2">
                          <Clock className="h-4 w-4 text-saffron" />
                          Darshan Timings
                        </h4>
                        {service.timings.map((timing, i) => (
                          <div key={i} className="flex justify-between text-sm bg-muted/50 rounded-lg px-3 py-2">
                            <span className="text-muted-foreground">{timing.day}</span>
                            <span className="font-medium text-foreground">{timing.time}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Puja Offerings */}
                    {service.offerings && (
                      <div className="mb-4">
                        <h4 className="font-semibold text-secondary mb-2">Available Pujas</h4>
                        <ul className="grid grid-cols-2 gap-2">
                          {service.offerings.map((item, i) => (
                            <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                              <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Pathshala Schedule */}
                    {service.schedule && (
                      <div className="space-y-2 mb-4">
                        <h4 className="font-semibold text-secondary flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-saffron" />
                          Class Schedule
                        </h4>
                        {service.schedule.map((item, i) => (
                          <div key={i} className="bg-muted/50 rounded-lg px-3 py-2">
                            <span className="font-medium text-foreground block">{item.class}</span>
                            <span className="text-sm text-muted-foreground">{item.time}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Wedding Includes */}
                    {service.includes && (
                      <div className="mb-4">
                        <h4 className="font-semibold text-secondary mb-2">Services Include</h4>
                        <ul className="space-y-1">
                          {service.includes.map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <span className="w-1.5 h-1.5 rounded-full bg-maroon mt-1.5" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Hall Facilities */}
                    {service.facilities && (
                      <div className="mb-4">
                        <h4 className="font-semibold text-secondary mb-2">Facilities</h4>
                        <ul className="grid grid-cols-2 gap-2">
                          {service.facilities.map((item, i) => (
                            <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                              <span className="w-1.5 h-1.5 rounded-full bg-saffron" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Catering Options */}
                    {service.options && (
                      <div className="mb-4">
                        <h4 className="font-semibold text-secondary mb-2">Menu Options</h4>
                        <ul className="grid grid-cols-2 gap-2">
                          {service.options.map((item, i) => (
                            <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                              <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Highlight */}
                    {service.highlight && (
                      <p className="text-sm text-saffron font-medium bg-saffron/10 rounded-lg px-3 py-2 mb-4">
                        ✨ {service.highlight}
                      </p>
                    )}

                    {/* Price & CTA */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-border">
                      {service.price && (
                        <span className="text-lg font-semibold text-secondary">{service.price}</span>
                      )}
                      <Button variant="saffron">
                        Book Now / Inquire
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-16 bg-gradient-to-r from-gold/20 via-saffron/20 to-gold/20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-serif text-3xl font-bold text-secondary mb-4">
              Need More Information?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Our temple office is happy to assist you with any questions about our services, bookings, or facilities.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button variant="saffron" size="lg">
                <Phone className="h-4 w-4 mr-2" />
                Call: +1 (416) 555-1234
              </Button>
              <Button variant="outline" size="lg">
                <Mail className="h-4 w-4 mr-2" />
                Email: services@jsot.ca
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ServicesPage;
