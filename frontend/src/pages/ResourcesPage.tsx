import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import api from "@/utils/api"; // Using your API utility
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { 
  Building2, 
  Mail, 
  Newspaper, 
  Video as VideoIcon, 
  Calendar, 
  User, 
  ExternalLink, 
  PlayCircle,
  Loader2 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";

// Import your static images for the project section
import exteriorImg1 from "@/assets/EXTERIOR-VIEW-CAM-01-768x384.jpg";
import exteriorImg2 from "@/assets/EXTERIOR-VIEW-CAM-02-300x106.jpg";

const ResourcesPage = () => {
  const location = useLocation();
  const [articles, setArticles] = useState([]);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("articles");

  // --- 1. Helper: Image URL Handler ---
  const getImageUrl = (path) => {
    if (!path) return "https://placehold.co/600x400?text=JSOT+Media";
    if (path.startsWith('http')) return path;
    return `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}${path}`;
  };

  // --- 2. Helper: Date Formatter ---
  const formatDate = (dateString) => {
    if (!dateString) return "";
    try {
      return format(new Date(dateString), "MMMM d, yyyy");
    } catch (e) {
      return dateString;
    }
  };

  // --- 3. Scroll Logic ---
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      // Map hash to tab if needed
      if (id === "videos") setActiveTab("videos");
      if (id === "articles") setActiveTab("articles");

      const element = document.getElementById(id) || document.getElementById("media-section");
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  // --- 4. Fetch Data ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [articlesRes, videosRes] = await Promise.all([
          api.get("/articles"),
          api.get("/videos")
        ]);
        setArticles(articlesRes.data);
        setVideos(videosRes.data);
      } catch (error) {
        console.error("Error loading resources data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* --- HERO BANNER --- */}
        <section className="relative py-20 bg-gradient-to-r from-secondary via-maroon to-secondary">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-repeat" />
          </div>
          <div className="container mx-auto px-4 relative z-10 text-center">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-secondary-foreground mb-4">
              Resources
            </h1>
            <p className="text-secondary-foreground/80 text-lg max-w-2xl mx-auto">
              News, updates, multimedia, and future plans for the Jain Society of Toronto.
            </p>
          </div>
        </section>

        {/* ---------------- 441-ELLESMERE (PROJECT) SECTION ---------------- */}
        <section id="441-ellesmere" className="py-16 scroll-mt-20 border-b border-gold/10 mandala-pattern relative">
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col md:flex-row items-center gap-4 mb-10">
              <Building2 className="h-8 w-8 text-saffron" />
              <h2 className="font-serif text-3xl font-bold text-secondary">
                About the project
              </h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-10 items-start">
              <div className="space-y-6">
                <div className="overflow-hidden rounded-lg shadow-xl border-4 border-gold/20">
                  <img 
                    src={exteriorImg1} 
                    alt="Exterior View 1" 
                    className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="overflow-hidden rounded-lg shadow-xl border-4 border-gold/20">
                  <img 
                    src={exteriorImg2} 
                    alt="Exterior View 2" 
                    className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
              <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
                <p>
                  Toronto, Canada is home to the largest population of Jains in North America. Demographic indications show that our population is continuing to grow and the needs of the community are expanding to include the social and religious needs of up to five living generations!
                </p>
                <div className="bg-secondary/5 p-6 rounded-lg border-l-4 border-saffron">
                  <p className="font-medium text-secondary">
                    In 2012, 4.1 acres of land with unfinished structure of 48,000 sq.ft. was bought in the City of Toronto.
                  </p>
                </div>
                <p>
                  It will have a 7000 sq.ft Auditorium. Four Classrooms for Pathshala, a Seniors Lounge, Children’s play area, Centre office, Board room. 3600 sq.ft. dining hall, modern Kitchen, Handicapped friendly modern washrooms, elevators. Most of all 300 cars parking and easy access to highway 401.
                </p>
                <p>
                  It will house Swetamber Ghabhara (2400 sq.ft), Digambar Ghabhara (1200 sq.ft.) until a Shikharbandhi temple is built on the site.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------- MEDIA SECTION (Tabs Design) ---------------- */}
        <section id="media-section" className="py-16 md:py-24 bg-muted/20 scroll-mt-20">
          <div className="container mx-auto px-4">
            
            {/* Header */}
            <div className="text-center mb-10">
              <span className="text-gold font-medium uppercase tracking-wider">Knowledge & Wisdom</span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-secondary mt-2">
                Media Gallery
              </h2>
              <div className="section-divider w-32 mx-auto mt-4 mb-6 bg-saffron h-1 rounded-full" />
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Explore our collection of articles and video discourses.
              </p>
            </div>

            {/* TABS COMPONENT */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              
              <div className="flex justify-center mb-10">
                <TabsList className="grid w-full max-w-md grid-cols-2 bg-secondary/5 border border-gold/20">
                  <TabsTrigger 
                    value="articles" 
                    className="data-[state=active]:bg-gold data-[state=active]:text-white font-serif font-semibold gap-2"
                  >
                    <Newspaper className="h-4 w-4" /> Articles
                  </TabsTrigger>
                  <TabsTrigger 
                    value="videos" 
                    className="data-[state=active]:bg-gold data-[state=active]:text-white font-serif font-semibold gap-2"
                  >
                    <VideoIcon className="h-4 w-4" /> Videos
                  </TabsTrigger>
                </TabsList>
              </div>

              {loading ? (
                 <div className="flex justify-center py-20"><Loader2 className="animate-spin h-10 w-10 text-saffron" /></div>
              ) : (
                <>
                  {/* ARTICLES TAB CONTENT */}
                  <TabsContent value="articles" className="animate-fade-in focus-visible:ring-0">
                    {articles.length > 0 ? (
                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {articles.map((article) => (
                          <Card key={article.id} className="border-gold/20 overflow-hidden group hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                            {/* Image Section - Modified to fit 'Leaders' style (clean, bordered) */}
                            <div className="p-4 pb-0">
                              <div className="relative w-full h-48 overflow-hidden rounded-md border border-gold/10">
                                <img
                                  src={getImageUrl(article.image)}
                                  alt={article.title}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                  onError={(e) => { e.target.src = "https://placehold.co/600x400?text=Article"; }}
                                />
                                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur text-secondary text-xs px-2 py-1 rounded font-medium shadow-sm">
                                  {formatDate(article.date)}
                                </div>
                              </div>
                            </div>
                            
                            <CardContent className="p-6 text-center flex-1 flex flex-col">
                              <h3 className="font-serif text-lg font-bold text-secondary group-hover:text-gold transition-colors line-clamp-2">
                                {article.title}
                              </h3>
                              
                              <p className="text-saffron font-medium text-sm mt-2 uppercase tracking-wide flex items-center justify-center gap-1">
                                <User className="h-3 w-3" /> {article.author || "JSOT Team"}
                              </p>
                              
                              <p className="text-muted-foreground text-sm mt-3 line-clamp-3 mb-4 flex-1">
                                {article.excerpt}
                              </p>

                              {article.externalLink && (
                                <a
                                  href={article.externalLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2 text-secondary hover:text-gold transition-colors font-medium text-sm mt-auto justify-center"
                                >
                                  Read Article <ExternalLink className="h-3.5 w-3.5" />
                                </a>
                              )}
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-10 text-muted-foreground">No articles found.</div>
                    )}
                  </TabsContent>

                  {/* VIDEOS TAB CONTENT */}
                  <TabsContent value="videos" className="animate-fade-in focus-visible:ring-0">
                    {videos.length > 0 ? (
                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {videos.map((video) => (
                          <Card key={video.id} className="border-gold/20 overflow-hidden group hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                             {/* Video Thumbnail Section */}
                             <div className="p-4 pb-0">
                               <div 
                                 className="relative w-full h-48 overflow-hidden rounded-md border border-gold/10 cursor-pointer group/img"
                                 onClick={() => window.open(video.videoLink, "_blank")}
                               >
                                 <div className="absolute inset-0 bg-black/20 group-hover/img:bg-black/40 transition-colors z-10" />
                                 <img
                                   src={getImageUrl(video.thumbnail)}
                                   alt={video.title}
                                   className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
                                   onError={(e) => { e.target.src = "https://placehold.co/600x400?text=Video"; }}
                                 />
                                 <div className="absolute inset-0 flex items-center justify-center z-20">
                                   <div className="w-12 h-12 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center group-hover/img:scale-110 transition-transform">
                                      <PlayCircle className="h-8 w-8 text-white" />
                                   </div>
                                 </div>
                               </div>
                             </div>

                             <CardContent className="p-6 text-center flex-1 flex flex-col">
                               <h3 className="font-serif text-lg font-bold text-secondary group-hover:text-gold transition-colors line-clamp-2">
                                 {video.title}
                               </h3>
                               <p className="text-saffron font-medium text-sm mt-2 uppercase tracking-wide">
                                 {video.speaker || "Guest Speaker"}
                               </p>
                               
                               <div className="mt-4 pt-4 border-t border-gold/10 flex justify-center">
                                 <a
                                    href={video.videoLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-secondary hover:text-gold transition-colors text-sm font-medium"
                                  >
                                    <VideoIcon className="h-3.5 w-3.5" /> Watch Video
                                  </a>
                               </div>
                             </CardContent>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-10 text-muted-foreground">No videos found.</div>
                    )}
                  </TabsContent>
                </>
              )}
            </Tabs>
          </div>
        </section>

        {/* ---------------- NEWSLETTER SUBSCRIPTION SECTION ---------------- */}
        <section id="subscribe-to-newsletter" className="py-20 bg-muted/30 border-t border-gold/20 scroll-mt-20">
          <div className="container mx-auto px-4">
            <div className="w-full max-w-4xl mx-auto shadow-2xl rounded-lg bg-white overflow-hidden">
              <div className="bg-gradient-to-r from-secondary to-maroon text-white p-8 text-center">
                <div className="mx-auto w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-4 backdrop-blur-sm">
                  <Mail className="h-8 w-8 text-gold" />
                </div>
                <h3 className="text-3xl font-serif font-bold">Subscribe to Newsletter</h3>
                <p className="text-white/80 mt-2">Subscribe to our mailing list to receive the latest updates</p>
              </div>
              <div className="w-full overflow-hidden relative">
                <iframe 
                  src="https://jsotcanada.us5.list-manage.com/subscribe?u=e682257a4e2feef5d84bfa7cc&id=fccf434d13" 
                  title="JSOT Newsletter Subscription"
                  scrolling="no" 
                  className="w-full h-[850px] md:h-[1120px] border-none block"
                  style={{ overflow: 'hidden' }}
                />
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
};

export default ResourcesPage;