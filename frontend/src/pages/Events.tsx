import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  Calendar, Clock, MapPin, Loader2, History, ChevronLeft, ChevronRight,
  Users, BookOpen, Heart, Globe, GraduationCap, Briefcase, X, ImageIcon,
  ExternalLink, Filter
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import api from "@/utils/api";
import {
  isBefore, parseISO, startOfDay, startOfMonth, endOfMonth,
  startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth,
  isSameDay, addMonths, subMonths, format
} from "date-fns";

const typeColors = {
  Festival: "bg-saffron text-primary-foreground",
  Puja: "bg-gold text-foreground",
  Education: "bg-secondary text-secondary-foreground",
  Celebration: "bg-saffron-light text-foreground",
  Community: "bg-maroon text-secondary-foreground",
};

const affiliatedGroups = [
  {
    title: "Pathshala",
    icon: BookOpen,
    description: "In the last 40 years, Toronto has seen a rapid growth of Jains. Pathshala instills spiritual development, self-awareness, moral consciousness, and Jain identity in students aged 5 to 18.",
    details: ["Classes run September to June", "Basic Jain principles", "Moral consciousness & social well-being"],
    internalLink: "/pathshala"
  },
  {
    title: "Youth Jains of Toronto",
    icon: Users,
    description: "Fostering and strengthening local Jain youth groups through sports, outdoor trips, retreats, and seminars to instill pride in Jain heritage.",
    details: ["Sports, retreats & seminars", "Leadership development", "Charitable community activities", "Young Jains of America participation"]
  },
  {
    title: "Seniors Group",
    icon: Heart,
    description: "Started in 2000, this group has over 200 members including retired locals and new arrivals. They meet monthly for social interaction and wellness.",
    details: ["Health & wellness talks", "Light exercises & Yoga", "Outdoor trips", "Singing competitions"]
  },
  {
    title: "Ladies Group",
    icon: GraduationCap,
    description: "Created in the early 90s to provide a platform for women to develop leadership skills. The group organizes workshops, health talks, and cultural activities.",
    details: ["Leadership workshops", "Health & Nutrition talks", "Financial Management", "Cooking demonstrations"]
  },
  {
    title: "Interfaith Activities",
    icon: Globe,
    description: "Providing and exchanging religious views with other major religions to promote harmony, tolerance, and peace while sharing Jain principles.",
    details: ["Member of Ontario Multifaith Council", "Peel District School Board representation", "Multifaith alliance to end homelessness", "Campus Chaplains (UofT)"]
  },
  {
    title: "Jain Professional Group",
    icon: Briefcase,
    description: "A network created to help the influx of new immigrant families and professionals receive guidance from Jains living here for a long time.",
    details: ["Professional networking", "Guidance for new immigrants", "Mentorship", "Career support"]
  }
];

const ITEMS_PER_PAGE = 3;

const EventsPage = () => {
  const [loading, setLoading] = useState(true);
  const [darshanTimings, setDarshanTimings] = useState([]);
  const location = useLocation();

  // Data States
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const [allEvents, setAllEvents] = useState([]);

  // UI States
  const [categories, setCategories] = useState(["All"]);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [currentCalendarDate, setCurrentCalendarDate] = useState(new Date());

  // *** NEW STATE: Track specifically selected date from calendar ***
  const [selectedDate, setSelectedDate] = useState(null);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);

  // Gallery States
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const getImageUrl = (path) => {
    if (!path) return null;
    if (path.startsWith('http')) return path;
    return `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}${path}`;
  };

  const getEventDate = (event) => {
    if (event.fullDate) return parseISO(event.fullDate);
    try {
      const dateString = `${event.month} ${event.dateDisplay.split(" ")[1]}, ${event.year}`;
      return new Date(dateString);
    } catch (e) {
      return new Date();
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventsRes, darshanRes] = await Promise.all([
          api.get("/events"),
          api.get("/darshan")
        ]);

        const eventsData = eventsRes.data;
        setAllEvents(eventsData);
        const today = startOfDay(new Date());

        const upcoming = [];
        const past = [];

        eventsData.forEach((event) => {
          const eventDate = getEventDate(event);
          if (isBefore(eventDate, today)) {
            let images = event.galleryImages || [];
            if (typeof images === 'string') {
              try { images = JSON.parse(images); } catch (e) { images = []; }
            }
            past.push({ ...event, galleryImages: images });
          } else {
            upcoming.push(event);
          }
        });

        upcoming.sort((a, b) => getEventDate(a).getTime() - getEventDate(b).getTime());
        past.sort((a, b) => getEventDate(b).getTime() - getEventDate(a).getTime());

        setUpcomingEvents(upcoming);
        setPastEvents(past);
        setDarshanTimings(darshanRes.data);

        if (eventsData.length > 0) {
          const uniqueTypes = new Set(
            eventsData
              .map((event) => event.type)
              .filter((type) => type)
          );
          setCategories(["All", ...Array.from(uniqueTypes).sort()]);
        } else {
          setCategories(["All"]);
        }

      } catch (error) {
        console.error("Error loading events page data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedFilter, selectedDate]);

  useEffect(() => {
    if (!loading && location.hash) {
      const id = location.hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    }
  }, [loading, location]);

  const handlePrevMonth = () => setCurrentCalendarDate(subMonths(currentCalendarDate, 1));
  const handleNextMonth = () => setCurrentCalendarDate(addMonths(currentCalendarDate, 1));

  const calendarDays = eachDayOfInterval({
    start: startOfWeek(startOfMonth(currentCalendarDate)),
    end: endOfWeek(endOfMonth(currentCalendarDate)),
  });

  const getEventsForDate = (date) => {
    return allEvents.filter(event => isSameDay(getEventDate(event), date));
  };

  const getDisplayEvents = () => {
    if (selectedDate) {
      return allEvents.filter(event => isSameDay(getEventDate(event), selectedDate));
    }

    return selectedFilter === "All"
      ? upcomingEvents
      : upcomingEvents.filter(e => e.type === selectedFilter);
  };

  const filteredEvents = getDisplayEvents();

  const totalPages = Math.ceil(filteredEvents.length / ITEMS_PER_PAGE);
  const paginatedEvents = filteredEvents.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      document.getElementById('upcoming-list-top')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDateClick = (day) => {
    setSelectedDate(day);
    document.getElementById('upcoming-list-top')?.scrollIntoView({ behavior: 'smooth' });
  };

  const clearDateSelection = () => {
    setSelectedDate(null);
  };

  const openGallery = (event) => {
    if (event.galleryImages && event.galleryImages.length > 0) {
      setSelectedEvent(event);
      setCurrentImageIndex(0);
      setIsGalleryOpen(true);
      document.body.style.overflow = 'hidden';
    }
  };

  const closeGallery = () => {
    setIsGalleryOpen(false);
    setSelectedEvent(null);
    document.body.style.overflow = 'unset';
  };

  const nextImage = useCallback((e) => {
    e?.stopPropagation();
    if (selectedEvent?.galleryImages) {
      setCurrentImageIndex((prev) =>
        prev === selectedEvent.galleryImages.length - 1 ? 0 : prev + 1
      );
    }
  }, [selectedEvent]);

  const prevImage = useCallback((e) => {
    e?.stopPropagation();
    if (selectedEvent?.galleryImages) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? selectedEvent.galleryImages.length - 1 : prev - 1
      );
    }
  }, [selectedEvent]);

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

  // *** UPDATE: Filter past events to only show those with photos ***
  const pastEventsWithPhotos = pastEvents.filter(
    (event) => event.galleryImages && event.galleryImages.length > 0
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Banner */}
        <section className="relative py-16 md:py-20 bg-gradient-to-r from-secondary via-maroon to-secondary">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-repeat" />
          </div>
          <div className="container mx-auto px-4 relative z-10 text-center">
            <h1 className="font-serif text-3xl md:text-5xl font-bold text-secondary-foreground mb-4 leading-tight">
              Events & Calendar
            </h1>
            <p className="text-secondary-foreground/80 text-base md:text-lg max-w-2xl mx-auto px-2">
              Join us for spiritual gatherings, festivals, educational programs, and community celebrations
            </p>
          </div>
        </section>

        {/* UPCOMING EVENTS SECTION */}
        <section id="upcoming" className="py-12 md:py-16 mandala-pattern relative scroll-mt-20">
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

              {/* Left Column: Events List */}
              <div className="lg:col-span-2 order-1">

                <div className="flex flex-col gap-4 mb-6" id="upcoming-list-top">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <h2 className="font-serif text-2xl font-bold text-secondary flex items-center gap-2 whitespace-nowrap">
                      <Calendar className="h-6 w-6 text-saffron" />
                      {selectedDate ? (
                        <span className="flex items-center gap-2">
                          Events for {format(selectedDate, "MMM d, yyyy")}
                          <button
                            onClick={clearDateSelection}
                            className="text-xs bg-muted text-foreground px-2 py-1 rounded-full border hover:bg-muted/80 flex items-center gap-1 ml-2 font-sans font-normal"
                          >
                            <X className="h-3 w-3" /> Clear Date
                          </button>
                        </span>
                      ) : "Upcoming Events"}
                    </h2>

                    {/* Scrollable Filters - Only show if NO date is selected */}
                    {!selectedDate && (
                      <div className="w-full md:w-auto overflow-x-auto pb-2 category-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
                        <div className="flex gap-2 min-w-max">
                          {categories.map((filter) => (
                            <button
                              key={filter}
                              onClick={() => setSelectedFilter(filter)}
                              className={`flex-shrink-0 whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium transition-all border border-transparent ${selectedFilter === filter
                                ? "bg-saffron text-primary-foreground shadow-md"
                                : "bg-muted text-muted-foreground hover:bg-muted/80 hover:border-gold/20"
                                }`}
                            >
                              {filter}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {loading ? (
                  <div className="flex justify-center py-20"><Loader2 className="animate-spin h-10 w-10 text-saffron" /></div>
                ) : (
                  <div className="space-y-6 md:space-y-4">
                    {paginatedEvents.length > 0 ? (
                      <>
                        {paginatedEvents.map((event, index) => (
                          <Card key={index} className="border-gold/20 hover:shadow-xl transition-all duration-300 overflow-hidden group">
                            <CardContent className="p-0">
                              <div className="flex flex-col sm:flex-row h-full">
                                {/* Date Block */}
                                <div className="w-full sm:w-32 flex-shrink-0 bg-gradient-to-r sm:bg-gradient-to-br from-secondary to-maroon text-secondary-foreground p-3 sm:p-4 flex flex-row sm:flex-col justify-between sm:justify-center items-center">
                                  <div className="flex flex-row sm:flex-col items-baseline sm:items-center gap-2 sm:gap-0">
                                    <span className="text-2xl sm:text-3xl font-bold">{event.dateDisplay?.split(" ")[1]}</span>
                                    <span className="text-sm sm:text-base font-medium uppercase tracking-wider">{event.month}</span>
                                  </div>
                                  <span className="text-xs sm:text-sm font-medium text-gold/90">{event.day}, {event.year}</span>
                                </div>

                                <div className="flex-grow p-4 sm:p-5">
                                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
                                    <div>
                                      <span className={`inline-block px-3 py-1 rounded-full text-[10px] sm:text-xs font-medium mb-2 ${typeColors[event.type] || 'bg-gray-200 text-gray-800'}`}>
                                        {event.type}
                                      </span>
                                      <h3 className="font-serif text-lg sm:text-xl font-semibold text-secondary group-hover:text-saffron transition-colors leading-tight">
                                        {event.title}
                                      </h3>
                                    </div>
                                  </div>

                                  <p className="text-muted-foreground text-sm line-clamp-2 mb-3">{event.description}</p>

                                  <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs sm:text-sm text-muted-foreground pt-2 border-t border-gray-100">
                                    <span className="flex items-center gap-1.5">
                                      <Clock className="h-3.5 w-3.5 text-saffron flex-shrink-0" />
                                      {event.time}
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                      <MapPin className="h-3.5 w-3.5 text-saffron flex-shrink-0" />
                                      {event.location || "Temple Hall"}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}

                        {/* Pagination Controls */}
                        {totalPages > 1 && (
                          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 mt-8 pt-4 border-t border-gold/10">
                            <button
                              onClick={() => handlePageChange(currentPage - 1)}
                              disabled={currentPage === 1}
                              className="flex items-center gap-1 px-3 py-2 text-sm rounded-lg bg-white border border-gold/30 hover:bg-saffron/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                              <ChevronLeft className="h-4 w-4" /> <span className="hidden sm:inline">Previous</span>
                            </button>
                            <span className="text-sm font-medium text-secondary whitespace-nowrap px-2">
                              Page {currentPage} of {totalPages}
                            </span>
                            <button
                              onClick={() => handlePageChange(currentPage + 1)}
                              disabled={currentPage === totalPages}
                              className="flex items-center gap-1 px-3 py-2 text-sm rounded-lg bg-white border border-gold/30 hover:bg-saffron/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                              <span className="hidden sm:inline">Next</span> <ChevronRight className="h-4 w-4" />
                            </button>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="text-center py-12 text-muted-foreground bg-muted/20 rounded-lg flex flex-col items-center gap-3">
                        <Calendar className="h-10 w-10 text-muted-foreground/50" />
                        <div>
                          <p className="font-semibold text-lg">No events found</p>
                          <p className="text-sm">
                            {selectedDate
                              ? `There are no events scheduled for ${format(selectedDate, "MMMM d, yyyy")}.`
                              : `No upcoming events found for "${selectedFilter}".`
                            }
                          </p>
                          {selectedDate && (
                            <button
                              onClick={clearDateSelection}
                              className="mt-4 text-saffron hover:underline text-sm font-medium"
                            >
                              View all upcoming events
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Sidebar & Calendar */}
              <div className="space-y-6 order-2">
                <div id="calendar" className="scroll-mt-24">
                  <Card className="border-gold/20 shadow-lg">
                    <CardHeader className="border-b border-gold/20 bg-gradient-to-r from-saffron/10 to-gold/10 p-4">
                      <div className="flex items-center justify-between">
                        <span className="font-serif font-bold text-secondary text-sm sm:text-base">
                          {format(currentCalendarDate, "MMMM yyyy")}
                        </span>
                        <div className="flex gap-1">
                          <button onClick={handlePrevMonth} className="p-1 hover:bg-white rounded border border-transparent hover:border-gold/30 transition-colors">
                            <ChevronLeft className="h-4 w-4 text-secondary" />
                          </button>
                          <button onClick={handleNextMonth} className="p-1 hover:bg-white rounded border border-transparent hover:border-gold/30 transition-colors">
                            <ChevronRight className="h-4 w-4 text-secondary" />
                          </button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-2 sm:p-4">
                      <div className="grid grid-cols-7 gap-1 text-center text-[10px] sm:text-xs mb-2">
                        {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                          <span key={i} className="font-semibold text-muted-foreground">{d}</span>
                        ))}
                      </div>
                      <div className="grid grid-cols-7 gap-1 text-center text-sm">
                        {calendarDays.map((day, i) => {
                          const dayEvents = getEventsForDate(day);
                          const hasEvent = dayEvents.length > 0;
                          const isCurrentMonth = isSameMonth(day, currentCalendarDate);
                          const isToday = isSameDay(day, new Date());
                          const isPastDay = isBefore(day, startOfDay(new Date()));
                          // Check if this specific day is selected
                          const isSelected = selectedDate && isSameDay(day, selectedDate);

                          return (
                            <div key={i} className="relative group aspect-square flex items-center justify-center">
                              <button
                                onClick={() => handleDateClick(day)}
                                className={`
                                  w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs transition-all relative
                                  ${!isCurrentMonth ? "text-muted-foreground/30" : "text-foreground"}
                                  
                                  /* Selection styling */
                                  ${isSelected
                                    ? "ring-2 ring-secondary ring-offset-2 z-10"
                                    : ""
                                  }
                                  
                                  /* Today styling */
                                  ${isToday && !isSelected ? "border border-saffron font-bold text-saffron" : ""}
                                  
                                  /* Event indicator styling */
                                  ${hasEvent
                                    ? isPastDay
                                      ? "bg-gray-400 text-white font-medium hover:bg-gray-500 shadow-sm"
                                      : "bg-saffron text-white font-bold hover:bg-saffron/90 shadow-sm"
                                    : "hover:bg-muted"
                                  }
                                `}
                              >
                                {format(day, "d")}
                              </button>

                              {/* Hover Tooltip */}
                              {hasEvent && (
                                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 z-50 hidden md:group-hover:block w-max max-w-[150px]">
                                  <div className="bg-secondary text-secondary-foreground text-[10px] rounded p-2 shadow-lg border border-gold/20">
                                    {dayEvents.map((e, idx) => (
                                      <div key={idx} className="mb-1 last:mb-0 border-b border-white/10 last:border-0 pb-1 last:pb-0">
                                        <p className="font-bold truncate">{e.title}</p>
                                        <p className="opacity-80 text-[9px]">{e.time}</p>
                                      </div>
                                    ))}
                                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-secondary"></div>
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* --- NEW DAILY DARSHAN DESIGN --- */}
                <Card className="border-gold/20 shadow-lg bg-gradient-to-br from-card to-saffron/5 h-fit">
                  <CardHeader className="border-b border-gold/20 bg-gradient-to-r from-gold/20 to-saffron/20">
                    <CardTitle className="flex items-center gap-2 font-serif text-secondary">
                      <Clock className="h-5 w-5 text-gold" />
                      Daily Darshan Timings
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="p-4 flex flex-col">
                    <div className="space-y-4">
                      {darshanTimings.length > 0 ? (
                        darshanTimings.map((timing, index) => (
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
                 {/* --- END NEW DAILY DARSHAN DESIGN --- */}

              </div>
            </div>
          </div>
        </section>

        {/* Affiliated Groups Section */}
        <section id="groups" className="py-16 bg-muted/30 border-t border-gold/20 scroll-mt-16">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-secondary mb-4">Affiliated Groups & Community</h2>
              <div className="w-20 h-1 bg-saffron mx-auto mb-6 rounded-full"></div>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                At JSOT, we strongly believe community interaction is very important. Through our vibrant spiritual and social life, we seek to grow & strengthen our Jain community by fostering a sense of belonging.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {affiliatedGroups.map((group, index) => {
                const Icon = group.icon;
                return (
                  <Card key={index} className="group hover:shadow-2xl transition-all duration-300 border-gold/10 bg-card h-full flex flex-col">
                    <CardHeader className="bg-gradient-to-r from-secondary/5 to-transparent pb-4">
                      <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 border border-gold/20">
                        <Icon className="h-6 w-6 text-saffron" />
                      </div>
                      <CardTitle className="font-serif text-xl text-secondary group-hover:text-maroon transition-colors">{group.title}</CardTitle>
                    </CardHeader>

                    <CardContent className="pt-4 flex-grow flex flex-col">
                      <p className="text-muted-foreground text-sm mb-6 leading-relaxed">{group.description}</p>
                      <ul className="space-y-2 mb-6">
                        {group.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs font-medium text-secondary/80">
                            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-gold shrink-0" />
                            {detail}
                          </li>
                        ))}
                      </ul>

                      <div className="mt-auto pt-4 border-t border-gold/10">
                        {group.internalLink ? (
                          <Link
                            to={group.internalLink}
                            className="inline-flex items-center justify-center w-full px-4 py-2.5 text-sm font-medium text-white transition-all bg-secondary hover:bg-secondary/90 rounded-md shadow-sm hover:shadow group-hover:translate-y-[-2px]"
                          >
                            View More<ChevronRight className="w-4 h-4 ml-2" />
                          </Link>
                        ) : group.registrationLink ? (
                          <a
                            href={group.registrationLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center w-full px-4 py-2.5 text-sm font-medium text-white transition-all bg-saffron hover:bg-saffron/90 rounded-md shadow-sm hover:shadow group-hover:translate-y-[-2px]"
                          >
                            Register Now <ExternalLink className="w-4 h-4 ml-2" />
                          </a>
                        ) : null}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* ---------------- PAST EVENTS SECTION (Horizontal Scroll) ---------------- */}
        {pastEventsWithPhotos.length > 0 && (
          <section id="past" className="py-16 bg-card border-t border-gold/10 scroll-mt-16">
            <div className="container mx-auto px-4">
              <div className="text-center mb-10">
                <span className="text-gold font-medium uppercase tracking-wider text-sm">Memories</span>
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-secondary mt-2 flex items-center justify-center gap-2">
                  <History className="h-6 w-6 md:h-8 md:w-8 text-secondary/50" /> Past Events Gallery
                </h2>
                <div className="section-divider w-24 mx-auto mt-4" />
              </div>

              {/* Scroll Container */}
              <div className="flex overflow-x-auto pb-8 gap-4 md:gap-6 snap-x snap-mandatory -mx-4 px-4 md:mx-0 md:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {pastEventsWithPhotos.map((event, index) => {
                  const coverImage = getImageUrl(event.galleryImages[0]);

                  return (
                    <div key={index} className="snap-center shrink-0 w-[85vw] sm:w-[350px]">
                      <Card
                        onClick={() => openGallery(event)}
                        className={`overflow-hidden border-gold/20 group hover:shadow-xl transition-all bg-muted/30 h-full flex flex-col cursor-pointer hover:ring-2 ring-saffron/50`}
                      >
                        {/* Image Preview */}
                        <div className="relative h-48 overflow-hidden bg-secondary/10 flex items-center justify-center group shrink-0">
                          <img
                            src={coverImage}
                            alt={event.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <ImageIcon className="h-8 w-8 text-white drop-shadow-lg" />
                          </div>
                          <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
                            {event.galleryImages.length} Photos
                          </div>

                          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white pointer-events-none">
                            <h3 className="font-serif text-lg font-semibold truncate">{event.title}</h3>
                            <p className="text-xs opacity-80">{event.dateDisplay}, {event.year}</p>
                          </div>
                        </div>

                        <CardContent className="p-4 flex-grow">
                          <div className="flex justify-between items-center text-sm mb-2">
                            <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold border ${event.type === 'Festival' ? 'border-saffron text-saffron' : 'border-gray-400 text-gray-500'
                              }`}>
                              {event.type}
                            </span>
                            <span className="text-muted-foreground text-xs">Completed</span>
                          </div>
                          <p className="text-muted-foreground text-sm line-clamp-2">{event.description}</p>
                        </CardContent>
                      </Card>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

      </main>

      {/* ---------------- GALLERY MODAL ---------------- */}
      {isGalleryOpen && selectedEvent && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center animate-in fade-in duration-300">

          <button
            onClick={closeGallery}
            className="absolute top-4 right-4 z-[110] p-2 bg-black/50 hover:bg-white/20 rounded-full text-white transition-colors"
          >
            <X className="h-6 w-6 md:h-8 md:w-8" />
          </button>

          <div className="relative w-full h-full flex flex-col items-center justify-center px-4 md:px-20 py-10">

            <div className="absolute top-4 left-4 md:left-10 text-white z-[105] pointer-events-none pr-12">
              <h3 className="text-lg md:text-xl font-serif font-bold line-clamp-1">{selectedEvent.title}</h3>
              <p className="text-xs md:text-sm opacity-80">{currentImageIndex + 1} / {selectedEvent.galleryImages.length}</p>
            </div>

            <div className="relative w-full h-full flex items-center justify-center">
              <img
                src={getImageUrl(selectedEvent.galleryImages[currentImageIndex])}
                alt={`Gallery ${currentImageIndex}`}
                className="max-w-full max-h-[80vh] md:max-h-[85vh] object-contain shadow-2xl rounded-sm transition-opacity duration-300"
              />
            </div>

            {selectedEvent.galleryImages.length > 1 && (
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

            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 px-4 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {selectedEvent.galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(idx); }}
                  className={`relative w-10 h-10 md:w-16 md:h-16 flex-shrink-0 rounded overflow-hidden border-2 transition-all ${currentImageIndex === idx ? 'border-saffron scale-110 opacity-100' : 'border-transparent opacity-50 hover:opacity-100'
                    }`}
                >
                  <img
                    src={getImageUrl(img)}
                    className="w-full h-full object-cover"
                    alt="thumb"
                  />
                </button>
              ))}
            </div>

          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default EventsPage;