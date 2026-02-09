import { useState, useEffect } from "react";
import { BookOpen, Video, MessageSquare, ExternalLink, Play, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import api from "@/utils/api";

// Helper to define backend base URL for images
const API_BASE_URL = "http://localhost:5000";

const tabs = [
  { id: "articles", label: "Featured Articles", icon: BookOpen },
  { id: "videos", label: "Featured Discourses", icon: Video },
];

// Forums remain hardcoded as requested
const forums = [
  {
    title: "How do you practice Jainism with young children?",
    author: "Priya M.",
    replies: 24,
    lastActive: "2 hours ago",
    category: "Family & Parenting",
  },
  {
    title: "Vegetarian recipes for Paryushana",
    author: "Amit S.",
    replies: 45,
    lastActive: "5 hours ago",
    category: "Food & Lifestyle",
  },
  {
    title: "Best resources for learning Prakrit?",
    author: "Neha K.",
    replies: 18,
    lastActive: "1 day ago",
    category: "Education",
  },
  {
    title: "Organizing youth study groups in GTA",
    author: "Rohan P.",
    replies: 32,
    lastActive: "2 days ago",
    category: "Community",
  },
];

export function ResourceLibrary() {
  const [activeTab, setActiveTab] = useState("articles");

  // State for dynamic data
  const [articles, setArticles] = useState([]);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch Data on Component Mount
  useEffect(() => {
    const fetchResources = async () => {
      try {
        setLoading(true);
        // Fetch both endpoints simultaneously
        const [articlesRes, videosRes] = await Promise.all([
          api.get('/articles'),
          api.get('/videos')
        ]);

        // --- FILTERING LOGIC ADDED HERE ---
        // Only keep items where isFeatured is true
        const featuredArticles = articlesRes.data.filter(item => item.isFeatured === true);
        const featuredVideos = videosRes.data.filter(item => item.isFeatured === true);

        setArticles(featuredArticles);
        setVideos(featuredVideos);
      } catch (err) {
        console.log(err)
        console.error("Error fetching resources:", err);
        setError("Failed to load resources. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, []);

  // Helper to handle image paths (uploads vs external URLs)
  const getImageUrl = (path) => {
    if (!path) return "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop";
    if (path.startsWith("http")) return path;
    return `${API_BASE_URL}${path}`;
  };

  return (
    <section id="resources" className="py-16 md:py-24 bg-card">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-gold font-medium uppercase tracking-wider">Knowledge Center</span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-secondary mt-2">
            Religious Resource Library
          </h2>
          <div className="section-divider w-32 mx-auto mt-4" />
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Explore our curated collection of featured articles and video discourses to deepen your understanding of Jain philosophy.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-muted rounded-lg p-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-md font-medium transition-all ${activeTab === tab.id
                  ? "bg-saffron text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:text-foreground"
                  }`}
              >
                <tab.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="max-w-6xl mx-auto">

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-saffron" />
            </div>
          )}

          {/* Error State */}
          {!loading && error && (
            <div className="text-center py-10 text-red-500">
              {error}
            </div>
          )}

          {/* Articles */}
          {!loading && !error && activeTab === "articles" && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
              {articles.length > 0 ? (
                articles.map((article) => (
                  <Card key={article.id} className="overflow-hidden border-gold/20 hover:shadow-xl transition-all duration-300 group">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={getImageUrl(article.image)}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop"; }}
                      />
                      <div className="absolute inset-0 from-secondary/60 to-transparent" />
                      {/* Featured Badge */}
                      <span className="absolute top-2 right-2 bg-yellow-500 text-black text-[10px] font-bold px-2 py-1 rounded shadow-sm">
                        FEATURED
                      </span>
                    </div>
                    <CardContent className="p-5">
                      <h3 className="font-serif text-lg font-semibold text-secondary mb-2 line-clamp-2 group-hover:text-saffron transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{article.author}</span>
                        <span>{article.date}</span>
                      </div>
                      {article.externalLink && (
                        <Button variant="link" className="p-0 mt-3 text-saffron" asChild>
                          <a

                            href={
                              article.externalLink.startsWith("http")
                                ? article.externalLink
                                : `https://${article.externalLink}`
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Read More <ExternalLink className="h-3 w-3 ml-1" />
                          </a>
                        </Button>
                      )}

                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="col-span-full text-center py-10">
                  <div className="bg-gray-50 inline-block p-4 rounded-full mb-3">
                    <BookOpen className="h-6 w-6 text-gray-400 mx-auto" />
                  </div>
                  <p className="text-muted-foreground">No featured articles selected yet.</p>
                </div>
              )}
            </div>
          )}

          {/* Videos */}
          {!loading && !error && activeTab === "videos" && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
              {videos.length > 0 ? (
                videos.map((video) => (
                  <Card
                    key={video.id}
                    className="overflow-hidden border-gold/20 hover:shadow-xl transition-all duration-300 group cursor-pointer"
                    onClick={() => {
                      if (video.videoLink) {
                        const url = video.videoLink.startsWith("http")
                          ? video.videoLink
                          : `https://${video.videoLink}`;
                        window.open(url, "_blank");
                      }
                    }}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={getImageUrl(video.thumbnail)}
                        alt={video.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=300&fit=crop"; }}
                      />
                      <div className="absolute inset-0  flex items-center justify-center group-hover:bg-secondary/50 transition-colors">
                        <div className="w-16 h-16 rounded-full bg-saffron/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                          <Play className="h-8 w-8 text-primary-foreground ml-1" />
                        </div>
                      </div>
                      {/* <span className="absolute bottom-2 right-2 bg-secondary/80 text-secondary-foreground text-xs px-2 py-1 rounded">
                        {video.duration}
                      </span> */}
                      {/* Featured Badge */}
                      <span className="absolute top-2 right-2 bg-yellow-500 text-black text-[10px] font-bold px-2 py-1 rounded shadow-sm">
                        FEATURED
                      </span>
                    </div>
                    <CardContent className="p-5">
                      <h3 className="font-serif text-lg font-semibold text-secondary mb-2 line-clamp-2 group-hover:text-saffron transition-colors">
                        {video.title}
                      </h3>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>{video.speaker}</span>
                        {/* <span>{video.views} views</span> */}
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="col-span-full text-center py-10">
                  <div className="bg-gray-50 inline-block p-4 rounded-full mb-3">
                    <Video className="h-6 w-6 text-gray-400 mx-auto" />
                  </div>
                  <p className="text-muted-foreground">No featured videos selected yet.</p>
                </div>
              )}
            </div>
          )}

          {/* Forums (Static) */}
          {activeTab === "forums" && (
            <div className="space-y-4 animate-fade-in">
              {forums.map((forum, index) => (
                <Card key={index} className="border-gold/20 hover:shadow-lg transition-all duration-300 hover:border-saffron/30">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-grow">
                        <span className="text-xs font-medium text-gold bg-gold/10 px-2 py-1 rounded">
                          {forum.category}
                        </span>
                        <h3 className="font-semibold text-foreground mt-2 hover:text-saffron cursor-pointer transition-colors">
                          {forum.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Started by {forum.author} • Last active {forum.lastActive}
                        </p>
                      </div>
                      <div className="flex-shrink-0 text-center">
                        <div className="bg-secondary/10 rounded-lg px-4 py-2">
                          <span className="text-2xl font-bold text-secondary">{forum.replies}</span>
                          <span className="text-xs text-muted-foreground block">replies</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              <div className="text-center mt-6">
                <Button variant="default">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Join the Discussion
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}