import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Assumed you are using react-router
import { Calendar, Clock, Loader2, ArrowRight } from "lucide-react"; 
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import api from "@/utils/api";
import { isBefore, startOfDay, parseISO } from "date-fns";

const typeColors = {
  Festival: "bg-saffron text-primary-foreground",
  Puja: "bg-gold text-foreground",
  Education: "bg-secondary text-secondary-foreground",
  Celebration: "bg-saffron-light text-foreground",
  Community: "bg-maroon text-secondary-foreground",
};

export function CalendarSection() {
  const [events, setEvents] = useState([]);
  const [timings, setTimings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventsRes, darshanRes] = await Promise.all([
          api.get("/events"),
          api.get("/darshan")
        ]);

        const allEvents = eventsRes.data;
        const today = startOfDay(new Date());

        const upcomingEvents = allEvents.filter((event) => {
          const eventDate = event.fullDate 
            ? parseISO(event.fullDate) 
            : new Date(`${event.month} ${event.day}, ${event.year}`);

          return !isBefore(eventDate, today);
        });

        // Sort by date ascending (nearest first)
        upcomingEvents.sort((a, b) => {
          const dateA = a.fullDate ? parseISO(a.fullDate) : new Date(a.date);
          const dateB = b.fullDate ? parseISO(b.fullDate) : new Date(b.date);
          return dateA - dateB;
        });

        setEvents(upcomingEvents); 
        setTimings(darshanRes.data);
      } catch (error) {
        console.error("Error fetching schedule:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Select only the very next event
  const nextEvent = events.length > 0 ? events[0] : null;

  if (loading) {
    return (
      <section className="py-24 text-center">
        <Loader2 className="h-8 w-8 animate-spin mx-auto text-saffron" />
        <p className="text-muted-foreground mt-2">Loading Temple Schedule...</p>
      </section>
    );
  }

  return (
    <section id="calendar"className="pt-2 pb-6 md:pt-14 md:pb-8 bg-background">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <span className="text-gold font-medium uppercase tracking-wider">Temple Schedule</span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-secondary mt-2">
            Events & Darshan Timings
          </h2>
          <div className="section-divider w-32 mx-auto mt-4" />
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          
          {/* Upcoming Event (Single Entry) */}
          <div className="lg:col-span-2">
            <Card className="border-gold/20 shadow-lg h-full flex flex-col">
              <CardHeader className="border-b border-gold/20 bg-gradient-to-r from-saffron/10 to-gold/10 flex-shrink-0">
                <CardTitle className="flex items-center justify-between font-serif text-secondary">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-saffron" />
                    Next Upcoming Event
                  </div>
                </CardTitle>
              </CardHeader>
              
              <CardContent className="p-0 flex-grow">
                <div className="divide-y divide-border">
                  {nextEvent ? (
                    <div
                      className="flex items-center gap-4 p-6 hover:bg-muted/50 transition-colors animate-in fade-in slide-in-from-bottom-2 duration-300"
                    >
                      <div className="flex-shrink-0 w-20 text-center">
                        <div className="bg-secondary text-secondary-foreground rounded-t-md py-1 text-sm font-bold uppercase">
                          {nextEvent.day}
                        </div>
                        <div className="bg-card border border-t-0 border-gold/30 rounded-b-md py-3">
                          <span className="text-2xl font-bold text-secondary block leading-none">
                            {nextEvent.dateDisplay?.split(" ")[1]}
                          </span>
                          <span className="text-xs text-muted-foreground block uppercase font-bold mt-1">
                            {nextEvent.dateDisplay?.split(" ")[0]}
                          </span>
                        </div>
                      </div>
                      <div className="flex-grow">
                        <h4 className="text-lg font-semibold text-foreground">{nextEvent.title}</h4>
                        <p className="text-sm text-muted-foreground flex items-center gap-1 mt-2">
                          <Clock className="h-3 w-3" />
                          {nextEvent.time}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                          {nextEvent.description || "Join us for this auspicious occasion."}
                        </p>
                      </div>
                      <span className={`hidden md:inline-block flex-shrink-0 px-3 py-1 rounded-full text-xs font-medium ${typeColors[nextEvent.type] || 'bg-gray-100'}`}>
                        {nextEvent.type}
                      </span>
                    </div>
                  ) : (
                    <div className="p-8 text-center text-muted-foreground flex items-center justify-center">
                      No upcoming events scheduled at the moment.
                    </div>
                  )}
                </div>
              </CardContent>

              <div className="p-4 border-t border-border flex items-center justify-end bg-muted/10">
                <Button 
                  asChild
                  variant="default"
                  className="bg-secondary text-white hover:bg-secondary/90"
                >
                  <Link to="/events">
                    View All Events <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </Card>
          </div>

          {/* Darshan Timings */}
          <div className="h-fit">
            <Card className="border-gold/20 shadow-lg bg-gradient-to-br from-card to-saffron/5 h-fit">
              <CardHeader className="border-b border-gold/20 bg-gradient-to-r from-gold/20 to-saffron/20">
                <CardTitle className="flex items-center gap-2 font-serif text-secondary">
                  <Clock className="h-5 w-5 text-gold" />
                  Daily Darshan Timings
                </CardTitle>
              </CardHeader>
              
              <CardContent className="p-4 flex flex-col">
                <div className="space-y-4">
                  {timings.length > 0 ? (
                    timings.map((timing, index) => (
                      <div key={index} className="border-b border-gold/10 pb-4 last:border-0 last:pb-0">
                        <h4 className="font-semibold text-secondary mb-2">{timing.dayRange}</h4>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="bg-saffron/10 rounded-md p-2">
                            <span className="text-muted-foreground block text-xs uppercase font-bold">Start</span>
                            <span className="font-medium text-foreground"> {timing.startTime}</span>
                          </div>
                          <div className="bg-gold/10 rounded-md p-2">
                            <span className="text-muted-foreground block text-xs uppercase font-bold">End</span>
                            <span className="font-medium text-foreground"> {timing.endTime}</span>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                     <div className="text-center text-muted-foreground py-4">Timings not updated yet.</div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}