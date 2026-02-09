import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom"; // Added useLocation

// Page Imports
import Index from "./pages/Index";
import Events from "./pages/Events";
import Services from "./pages/Services";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import ResourcesPage from "./pages/ResourcesPage";
import ContactPage from "./pages/ContactPage";
import Visit from "./pages/Visit";
import Pathshala from "./pages/PathshalaPage";

// --- 1. Create the ScrollToTop Component ---
// This ensures that whenever the URL changes, the window scrolls up.
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Jab bhi URL change hoga, page turant upar jayega
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem("adminToken");
  
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        {/* --- 2. Add ScrollToTop inside BrowserRouter --- */}
        <ScrollToTop />
        
        <Routes>
          {/* --- Public Routes --- */}
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} /> 
          <Route path="/events" element={<Events />} />
          <Route path="/pathshala" element={<Pathshala />} /> 
          <Route path="/services" element={<Services />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          
          {/* Note: In your Footer you had "/Visitor" (Capital V). 
              Routes are case-sensitive. I changed this to lowercase 
              to match standard web practices. Ensure Footer matches "/visitor" */}
          <Route path="/visitor" element={<Visit/>} />
          

          {/* --- Admin Routes --- */}
          <Route path="/admin/login" element={<AdminLogin />} />
          
          <Route 
            path="/admin/dashboard" 
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />

          {/* --- Catch-All Route --- */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;