import { useState } from "react";
import { BookOpen, Video, MessageSquare, ExternalLink, Play } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const tabs = [
  { id: "articles", label: "Articles", icon: BookOpen },
  { id: "videos", label: "Video Discourses", icon: Video }
];

const articles = [
  {
    title: "Understanding Ahimsa in Daily Life",
    author: "Dr. Pratik Shah",
    date: "Dec 15, 2024",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
    excerpt: "Exploring how the principle of non-violence can be applied in modern everyday situations.",
  },
  {
    title: "The Five Great Vows (Mahavrats)",
    author: "Acharya Vidyanand Ji",
    date: "Dec 10, 2024",
    image: "https://images.unsplash.com/photo-1544928147-79a2dbc1f389?w=400&h=300&fit=crop",
    excerpt: "A comprehensive guide to the five fundamental vows that form the foundation of Jain ethics.",
  },
  {
    title: "Jain Festivals and Their Significance",
    author: "Sadhvi Prabhavati",
    date: "Dec 5, 2024",
    image: "https://images.unsplash.com/photo-1593085512500-5d55148d6f0d?w=400&h=300&fit=crop",
    excerpt: "Understanding the spiritual meaning behind major Jain festivals celebrated throughout the year.",
  },
];

const videos = [
  {
    title: "Navkar Mantra - Complete Explanation",
    speaker: "Gurudev Sri Chitrabhanu",
    duration: "45:30",
    views: "12.5K",
    thumbnail: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=400&h=300&fit=crop",
  },
  {
    title: "Meditation Techniques for Beginners",
    speaker: "Acharya Mahapragya",
    duration: "32:15",
    views: "8.2K",
    thumbnail: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=300&fit=crop",
  },
  {
    title: "Jain Philosophy: Anekantavada",
    speaker: "Dr. Kumarpal Desai",
    duration: "58:45",
    views: "6.8K",
    thumbnail: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=300&fit=crop",
  },
];

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
            Explore our collection of articles, video discourses, and community discussions to deepen your understanding of Jain philosophy.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-muted rounded-lg p-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-md font-medium transition-all ${
                  activeTab === tab.id
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
          {/* Articles */}
          {activeTab === "articles" && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
              {articles.map((article, index) => (
                <Card key={index} className="overflow-hidden border-gold/20 hover:shadow-xl transition-all duration-300 group">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-secondary/60 to-transparent" />
                  </div>
                  <CardContent className="p-5">
                    <h3 className="font-serif text-lg font-semibold text-secondary mb-2 line-clamp-2 group-hover:text-saffron transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{article.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{article.author}</span>
                      <span>{article.date}</span>
                    </div>
                    <Button variant="link" className="p-0 mt-3 text-saffron">
                      Read More <ExternalLink className="h-3 w-3 ml-1" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Videos */}
          {activeTab === "videos" && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
              {videos.map((video, index) => (
                <Card key={index} className="overflow-hidden border-gold/20 hover:shadow-xl transition-all duration-300 group">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-secondary/40 flex items-center justify-center group-hover:bg-secondary/50 transition-colors">
                      <div className="w-16 h-16 rounded-full bg-saffron/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Play className="h-8 w-8 text-primary-foreground ml-1" />
                      </div>
                    </div>
                    <span className="absolute bottom-2 right-2 bg-secondary/80 text-secondary-foreground text-xs px-2 py-1 rounded">
                      {video.duration}
                    </span>
                  </div>
                  <CardContent className="p-5">
                    <h3 className="font-serif text-lg font-semibold text-secondary mb-2 line-clamp-2 group-hover:text-saffron transition-colors">
                      {video.title}
                    </h3>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{video.speaker}</span>
                      <span>{video.views} views</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Forums */}
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
                <Button variant="maroon">
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
