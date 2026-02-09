import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { format, parseISO, isPast, isSameDay, parse } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  CalendarIcon, Clock, LogOut, MapPin, Loader2, Trash2,
  Pencil, X, Upload, Image as ImageIcon, FileImage, History, AlertTriangle,
  ChevronLeft, ChevronRight, Search, FilterX, Plus, CheckCircle, AlertCircle,
  BookOpen, Video, Link as LinkIcon, User, PlayCircle, Library, Star, Users
} from "lucide-react";
import { cn } from "@/lib/utils";
import api from '@/utils/api';

import DeleteConfirmationModal from './DeleteConfirmationModal';

// ... (Keep your color constants and helper functions here) ...
const typeColors = {
  Festival: "bg-saffron text-primary-foreground",
  Puja: "bg-gold text-foreground",
  Education: "bg-secondary text-secondary-foreground",
  Celebration: "bg-saffron-light text-foreground",
  Community: "bg-maroon text-secondary-foreground",
};
const dynamicPalette = [
  "bg-blue-100 text-blue-800 border-blue-200",
  "bg-emerald-100 text-emerald-800 border-emerald-200",
  "bg-violet-100 text-violet-800 border-violet-200",
  "bg-amber-100 text-amber-800 border-amber-200",
  "bg-rose-100 text-rose-800 border-rose-200",
  "bg-cyan-100 text-cyan-800 border-cyan-200",
  "bg-lime-100 text-lime-800 border-lime-200",
  "bg-fuchsia-100 text-fuchsia-800 border-fuchsia-200",
  "bg-indigo-100 text-indigo-800 border-indigo-200",
];
const getTypeColor = (typeName) => {
  if (!typeName) return "bg-slate-100 text-slate-800";
  if (typeColors[typeName]) return typeColors[typeName];
  let hash = 0;
  for (let i = 0; i < typeName.length; i++) {
    hash = typeName.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % dynamicPalette.length;
  return `border ${dynamicPalette[index]}`;
};

const IMAGE_BASE_URL = "http://localhost:5000";
const ITEMS_PER_PAGE = 4;

const AdminDashboard = () => {
  const navigate = useNavigate();

  // --- TABS & VIEW STATES ---
  const [activeTab, setActiveTab] = useState('events'); 
  const [eventView, setEventView] = useState('upcoming');
  const [resourceView, setResourceView] = useState('articles');

  // --- COMMON STATES ---
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDate, setFilterDate] = useState(null);

  // PAGINATION STATES
  const [currentPage, setCurrentPage] = useState(1);
  const [currentResourcePage, setCurrentResourcePage] = useState(1);

  const [loading, setLoading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);

  // --- DATA LISTS ---
  const [eventsList, setEventsList] = useState([]);
  const [darshanList, setDarshanList] = useState([]);
  // Visitor list state removed
  const [articlesList, setArticlesList] = useState([]);
  const [videosList, setVideosList] = useState([]);

  // --- METADATA ---
  const [availableTypes, setAvailableTypes] = useState([]);

  // --- EDIT IDS ---
  const [editEventId, setEditEventId] = useState(null);
  const [editDarshanId, setEditDarshanId] = useState(null);
  // Edit Visitor ID state removed

  // --- TOAST & MODALS ---
  const [toast, setToast] = useState({ show: false, message: '', type: 'info' });
  const [isTypeModalOpen, setIsTypeModalOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, type: null, id: null });
  const [warningModal, setWarningModal] = useState({ isOpen: false, targetView: null });

  // --- FORM DATA STATES ---
  const [date, setDate] = useState();

  const [eventData, setEventData] = useState({
    title: '', time: '', type: '', description: '', location: 'Main Temple Hall'
  });

  const [darshanData, setDarshanData] = useState({
    dayRange: '', startTime: '', endTime: ''
  });

  // Visitor Data state removed

  const [articleData, setArticleData] = useState({
    title: '', author: '', date: '', excerpt: '', externalLink: ''
  });

  const [videoData, setVideoData] = useState({
    title: '', speaker: '', duration: '', videoLink: ''
  });

  // --- HELPER FUNCTION: Convert 24h to 12h AM/PM ---
  const formatTime = (timeString) => {
    if (!timeString) return "";
    if (timeString.toLowerCase().includes("am") || timeString.toLowerCase().includes("pm")) {
      return timeString;
    }
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours, 10);
    if (isNaN(hour)) return timeString;
    
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minutes} ${ampm}`;
  };

  // --- DERIVED LOGIC FOR PAST EVENTS ---
  const showUploadSection = (() => {
    if (!date) return false;
    if (!isSameDay(date, new Date())) return isPast(date);
    if (!eventData.time) return false;
    try {
      const timeFormats = ['h:mm aa', 'hh:mm aa', 'HH:mm', 'h:mm a', 'h:mma'];
      let parsedDateTime = null;
      for (const fmt of timeFormats) {
        const result = parse(eventData.time, fmt, date);
        if (!isNaN(result.getTime())) {
          parsedDateTime = result;
          break;
        }
      }
      if (parsedDateTime) return isPast(parsedDateTime);
    } catch (error) { console.log("Time parse error", error); }
    return false;
  })();

  const isFieldLocked = !!editEventId && showUploadSection;

  // --- INITIAL DATA FETCH ---
  useEffect(() => {
    fetchEvents();
    fetchDarshan();
    // fetchVisitors removed
    fetchEventTypes();
    fetchArticles();
    fetchVideos();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
    setCurrentResourcePage(1);
    setSelectedFiles([]);
  }, [searchQuery, filterDate, activeTab, resourceView]);

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast((prev) => ({ ...prev, show: false })), 3000);
  };

  // --- API CALLS ---
  const fetchEvents = async () => {
    try { const res = await api.get('/events'); setEventsList(res.data); }
    catch (err) { console.error("Failed to fetch events", err); }
  };
  const fetchDarshan = async () => {
    try { const res = await api.get('/darshan'); setDarshanList(res.data); }
    catch (err) { console.error("Failed to fetch darshan", err); }
  };
  // fetchVisitors removed
  const fetchEventTypes = async () => {
    try {
      const res = await api.get('/event-types');
      setAvailableTypes(res.data);
      if (res.data.length > 0 && !eventData.type) setEventData(prev => ({ ...prev, type: res.data[0].name }));
    } catch (err) { console.error("Failed to fetch types", err); setAvailableTypes([{ name: 'Festival' }, { name: 'Puja' }]); }
  };
  const fetchArticles = async () => {
    try { const res = await api.get('/articles'); setArticlesList(res.data); }
    catch (err) { console.error("Failed to fetch articles", err); }
  };
  const fetchVideos = async () => {
    try { const res = await api.get('/videos'); setVideosList(res.data); }
    catch (err) { console.error("Failed to fetch videos", err); }
  };

  // --- LOGOUT ---
  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/admin/login');
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFiles(Array.from(e.target.files));
    }
  };

  // ... (Event Logic) ...
  const handleViewSwitchRequest = (targetView) => {
    if (eventView === targetView) return;
    if (editEventId) setWarningModal({ isOpen: true, targetView });
    else { setEventView(targetView); setSearchQuery(""); setFilterDate(null); setCurrentPage(1); }
  };
  const confirmSwitchView = () => {
    resetEventForm();
    setEventView(warningModal.targetView);
    setSearchQuery("");
    setFilterDate(null);
    setCurrentPage(1);
    setWarningModal({ isOpen: false, targetView: null });
  };
  const cancelSwitchView = () => { setWarningModal({ isOpen: false, targetView: null }); };
  
  const resetEventForm = () => {
    const defaultType = availableTypes.length > 0 ? availableTypes[0].name : '';
    setEventData({ title: '', time: '', type: defaultType, description: '', location: 'Main Temple Hall' });
    setDate(undefined);
    setEditEventId(null);
    setSelectedFiles([]);
    setPreviewImages([]);
  };

  const handleEditEvent = (event) => {
    setEventData({
      title: event.title, time: event.time, type: event.type, description: event.description, location: event.location
    });
    if (event.fullDate) setDate(parseISO(event.fullDate));
    let images = [];
    if (event.galleryImages) {
      images = typeof event.galleryImages === 'string' ? JSON.parse(event.galleryImages) : event.galleryImages;
    }
    setPreviewImages(images || []);
    setSelectedFiles([]);
    setEditEventId(event.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddNewType = async (newTypeName) => {
    try {
      const res = await api.post('/add-event-type', { name: newTypeName });
      const newTypeObj = res.data;
      setAvailableTypes(prev => [...prev, newTypeObj]);
      setEventData(prev => ({ ...prev, type: newTypeObj.name }));
      setIsTypeModalOpen(false);
      showToast(`Category "${newTypeName}" added!`, "success");
    } catch (err) { console.error(err); showToast("Failed to add category", "error"); }
  };

  const handleEventSubmit = async (e) => {
    e.preventDefault();
    if (!date) { showToast("Please select a date", "error"); return; }
    if (!eventData.type) { showToast("Select a category type", "error"); return; }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('title', eventData.title);
      formData.append('time', eventData.time);
      formData.append('type', eventData.type);
      formData.append('description', eventData.description);
      formData.append('location', eventData.location);
      formData.append('fullDate', format(date, "yyyy-MM-dd"));
      formData.append('dateDisplay', format(date, "MMM dd"));
      formData.append('day', format(date, "EEE"));
      formData.append('month', format(date, "MMMM"));
      formData.append('year', format(date, "yyyy"));
      if (showUploadSection) selectedFiles.forEach((file) => formData.append('images', file));
      const config = { headers: { 'Content-Type': 'multipart/form-data' } };
      if (editEventId) { await api.put(`/update-event/${editEventId}`, formData, config); showToast("Event updated!"); }
      else { await api.post('/add-event', formData, config); showToast("Event created!"); }
      resetEventForm();
      fetchEvents();
    } catch (err) { console.error(err); showToast("Operation failed", "error"); }
    finally { setLoading(false); }
  };

  const handleCalendarSelect = (day) => {
    if (!day) return;
    if (filterDate && isSameDay(day, filterDate)) { setFilterDate(null); return; }
    if (editEventId) { showToast("Save changes before filtering", "error"); return; }
    setFilterDate(day);
    setCurrentPage(1);
    const isStrictlyPast = isPast(day) && !isSameDay(day, new Date());
    if (isStrictlyPast && eventView !== 'past') setEventView('past');
    else if (!isStrictlyPast && eventView !== 'upcoming') setEventView('upcoming');
  };

  // --- DARSHAN LOGIC ---
  const resetDarshanForm = () => { setDarshanData({ dayRange: '', startTime: '', endTime: '' }); setEditDarshanId(null); };
  const handleEditDarshan = (timing) => { setDarshanData({ dayRange: timing.dayRange, startTime: timing.startTime, endTime: timing.endTime }); setEditDarshanId(timing.id); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const handleDarshanSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editDarshanId) { await api.put(`/update-darshan/${editDarshanId}`, darshanData); showToast("Schedule updated!"); }
      else { await api.post('/add-darshan', darshanData); showToast("New schedule added!"); }
      resetDarshanForm();
      fetchDarshan();
    } catch (err) { console.error(err); showToast("Error saving timing", "error"); }
    finally { setLoading(false); }
  };

  // Visitor Logic functions removed (resetVisitorForm, handleEditVisitor, handleVisitorSubmit)

  // ... (Resources Logic) ...
  const handleArticleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('title', articleData.title);
      formData.append('author', articleData.author);
      formData.append('date', articleData.date);
      formData.append('excerpt', articleData.excerpt);
      formData.append('externalLink', articleData.externalLink);
      if (selectedFiles.length > 0) formData.append('image', selectedFiles[0]);

      await api.post('/add-article', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      showToast("Article added successfully!");
      setArticleData({ title: '', author: '', date: '', excerpt: '', externalLink: '' });
      setSelectedFiles([]);
      fetchArticles();
    } catch (err) { console.error(err); showToast("Failed to add article", "error"); }
    finally { setLoading(false); }
  };

  const handleVideoSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('title', videoData.title);
      formData.append('speaker', videoData.speaker);
      // formData.append('duration', videoData.duration);
      formData.append('videoLink', videoData.videoLink);
      if (selectedFiles.length > 0) formData.append('thumbnail', selectedFiles[0]);

      await api.post('/add-video', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      showToast("Video resource added!");
      setVideoData({ title: '', speaker: '', duration: '', videoLink: '' });
      setSelectedFiles([]);
      fetchVideos();
    } catch (err) { console.error(err); showToast("Failed to add video", "error"); }
    finally { setLoading(false); }
  };

  const handleToggleFeature = async (type, item) => {
    const isCurrentlyFeatured = item.isFeatured;
    const list = type === 'article' ? articlesList : videosList;
    if (!isCurrentlyFeatured) {
      const featuredCount = list.filter(i => i.isFeatured).length;
      if (featuredCount >= 3) {
        showToast(`You can only select 3 ${type}s to feature.`, "error");
        return;
      }
    }
    try {
      const endpoint = type === 'article'
        ? `/toggle-featured-article/${item.id}`
        : `/toggle-featured-video/${item.id}`;
      await api.put(endpoint);
      if (type === 'article') fetchArticles();
      else fetchVideos();
      showToast(`${type === 'article' ? 'Article' : 'Video'} ${isCurrentlyFeatured ? 'removed from' : 'added to'} featured list.`);
    } catch (err) {
      console.error(err);
      showToast(err.response?.data?.error || "Failed to update status", "error");
    }
  };

  // --- DELETE LOGIC ---
  const initiateDelete = (type, id) => { setDeleteModal({ isOpen: true, type, id }); };
  const confirmDelete = async () => {
    if (!deleteModal.id) return;
    setLoading(true);
    try {
      if (deleteModal.type === 'event') {
        await api.delete(`/delete-event/${deleteModal.id}`);
        if (editEventId === deleteModal.id) resetEventForm();
        fetchEvents();
        showToast("Event deleted.");
      } else if (deleteModal.type === 'darshan') {
        await api.delete(`/delete-darshan/${deleteModal.id}`);
        if (editDarshanId === deleteModal.id) resetDarshanForm();
        fetchDarshan();
        showToast("Schedule deleted.");
      } 
      // Visitor delete logic removed
      else if (deleteModal.type === 'article') {
        await api.delete(`/delete-article/${deleteModal.id}`);
        fetchArticles();
        showToast("Article deleted.");
      } else if (deleteModal.type === 'video') {
        await api.delete(`/delete-video/${deleteModal.id}`);
        fetchVideos();
        showToast("Video deleted.");
      }
      setDeleteModal({ isOpen: false, type: null, id: null });
    } catch (err) { console.error("Error deleting", err); showToast("Failed to delete", "error"); }
    finally { setLoading(false); }
  };

  // ... (Pagination Logic) ...
  const upcomingDates = eventsList.filter(ev => ev.fullDate && !isPast(parseISO(ev.fullDate))).map(ev => parseISO(ev.fullDate));
  const pastDates = eventsList.filter(ev => ev.fullDate && isPast(parseISO(ev.fullDate))).map(ev => parseISO(ev.fullDate));
  const activeEventsList = eventView === 'upcoming'
    ? eventsList.filter(ev => !isPast(parseISO(ev.fullDate))).sort((a, b) => new Date(a.fullDate) - new Date(b.fullDate))
    : eventsList.filter(ev => isPast(parseISO(ev.fullDate))).sort((a, b) => new Date(b.fullDate) - new Date(a.fullDate));

  const filteredEvents = activeEventsList.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDate = filterDate ? isSameDay(parseISO(event.fullDate), filterDate) : true;
    return matchesSearch && matchesDate;
  });

  const totalItems = filteredEvents.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE));
  useEffect(() => { if (currentPage > totalPages && totalPages > 0) setCurrentPage(totalPages); }, [totalItems, totalPages, currentPage]);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedEvents = filteredEvents.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  const goToNextPage = () => { if (currentPage < totalPages) setCurrentPage(p => p + 1); };
  const goToPrevPage = () => { if (currentPage > 1) setCurrentPage(p => p - 1); };

  const activeResourceList = resourceView === 'articles' ? articlesList : videosList;
  const totalResourceItems = activeResourceList.length;
  const totalResourcePages = Math.max(1, Math.ceil(totalResourceItems / ITEMS_PER_PAGE));
  useEffect(() => { if (currentResourcePage > totalResourcePages && totalResourcePages > 0) setCurrentResourcePage(totalResourcePages); }, [totalResourceItems, totalResourcePages, currentResourcePage]);
  const startResourceIndex = (currentResourcePage - 1) * ITEMS_PER_PAGE;
  const paginatedResources = activeResourceList.slice(startResourceIndex, startResourceIndex + ITEMS_PER_PAGE);
  const goToNextResourcePage = () => { if (currentResourcePage < totalResourcePages) setCurrentResourcePage(p => p + 1); };
  const goToPrevResourcePage = () => { if (currentResourcePage > 1) setCurrentResourcePage(p => p - 1); };


  return (
    <div className="min-h-screen bg-gray-50/50 relative">
      <ToastPopup show={toast.show} message={toast.message} type={toast.type} onClose={() => setToast(prev => ({ ...prev, show: false }))} />
      <DeleteConfirmationModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ ...deleteModal, isOpen: false })}
        onConfirm={confirmDelete}
        loading={loading}
        title={`Delete ${deleteModal.type ? deleteModal.type.charAt(0).toUpperCase() + deleteModal.type.slice(1) : 'Item'}`}
        description="Are you sure? This action cannot be undone."
      />
      <UnsavedChangesModal isOpen={warningModal.isOpen} onClose={cancelSwitchView} onConfirm={confirmSwitchView} />
      <AddTypeModal isOpen={isTypeModalOpen} onClose={() => setIsTypeModalOpen(false)} onConfirm={handleAddNewType} />

      <header className="bg-secondary text-white p-4 shadow-md sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold font-serif tracking-wide text-gold">Temple Admin</h1>
          </div>
          <Button variant="destructive" size="sm" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" /> Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto p-6 space-y-6">

        {/* --- TOP NAV TABS --- */}
        <div className="flex gap-2 md:gap-4 border-b border-gray-200 pb-4 overflow-x-auto">
          <Button
            variant={activeTab === 'events' ? "default" : "ghost"}
            onClick={() => setActiveTab('events')}
            className={activeTab === 'events' ? "bg-saffron text-secondary font-bold hover:bg-saffron/90" : "text-gray-500"}
          >
            <CalendarIcon className="w-4 h-4 mr-2" /> <span className="hidden md:inline">Manage </span>Events
          </Button>
          <Button
            variant={activeTab === 'darshan' ? "default" : "ghost"}
            onClick={() => setActiveTab('darshan')}
            className={activeTab === 'darshan' ? "bg-saffron text-secondary font-bold hover:bg-saffron/90" : "text-gray-500"}
          >
            <Clock className="w-4 h-4 mr-2" /> Darshan<span className="hidden md:inline"> Timings</span>
          </Button>
          {/* Visitor Tab Button Removed */}
          <Button
            variant={activeTab === 'resources' ? "default" : "ghost"}
            onClick={() => setActiveTab('resources')}
            className={activeTab === 'resources' ? "bg-saffron text-secondary font-bold hover:bg-saffron/90" : "text-gray-500"}
          >
            <Library className="w-4 h-4 mr-2" /> Resources
          </Button>
        </div>

        {/* --- EVENTS TAB --- */}
        {activeTab === 'events' && (
            <div className="grid lg:grid-cols-3 gap-8 ">
            <Card className="border-gold/20 shadow-lg lg:col-span-1 h-fit sticky top-24">
              <CardHeader className="border-b border-gold/20 bg-secondary/5 flex flex-row items-center justify-between">
                <CardTitle className="text-secondary font-serif">
                  {editEventId ? "Edit Event" : "Create Event"}
                </CardTitle>
                {editEventId && (
                  <Button variant="ghost" size="sm" onClick={resetEventForm} className="h-8 text-xs text-muted-foreground">
                    <X className="h-3 w-3 mr-1" /> Cancel
                  </Button>
                )}
              </CardHeader>
              <CardContent className="pt-6">
                <form onSubmit={handleEventSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-500 uppercase">Event Title</label>
                    <Input placeholder="e.g. Mahavir Jayanti" value={eventData.title} onChange={e => setEventData({ ...eventData, title: e.target.value })} required />
                  </div>
                  <div className="space-y-2 flex flex-col">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-semibold text-gray-500 uppercase">Date</label>
                      {isFieldLocked && <span className="text-[10px] text-red-500 font-bold">Locked</span>}
                    </div>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                          disabled={isFieldLocked}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <CalendarComponent
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                          className="bg-white border rounded-md"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <label className="text-xs font-semibold text-gray-500 uppercase">Time</label>
                        {isFieldLocked && <span className="text-[10px] text-red-500 font-bold">Locked</span>}
                      </div>
                      <Input
                        type="time"
                        placeholder="e.g. 10:00 AM"
                        value={eventData.time}
                        onChange={e => setEventData({ ...eventData, time: e.target.value })}
                        required
                        disabled={isFieldLocked}
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <label className="text-xs font-semibold text-gray-500 uppercase">Type</label>
                        {isFieldLocked && <span className="text-[10px] text-red-500 font-bold">Locked</span>}
                      </div>
                      <div className="flex gap-2">
                        <Select
                          value={eventData.type}
                          onValueChange={(val) => setEventData({ ...eventData, type: val })}
                          disabled={isFieldLocked}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            {availableTypes.map((t) => (
                              <SelectItem key={t.id || t.name} value={t.name}>
                                {t.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Button
                          type="button" variant="outline" size="icon" className="shrink-0"
                          onClick={() => setIsTypeModalOpen(true)} disabled={isFieldLocked} title="Add Category"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-semibold text-gray-500 uppercase">Location</label>
                      {isFieldLocked && <span className="text-[10px] text-red-500 font-bold">Locked</span>}
                    </div>
                    <Input
                      placeholder="e.g. Main Temple Hall"
                      value={eventData.location}
                      onChange={e => setEventData({ ...eventData, location: e.target.value })}
                      disabled={isFieldLocked}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-500 uppercase">Description</label>
                    <Textarea placeholder="Details..." value={eventData.description} onChange={e => setEventData({ ...eventData, description: e.target.value })} />
                  </div>
                  {showUploadSection && (
                    <div className="space-y-2 pt-2 border-t border-dashed animate-in fade-in duration-300">
                      <div className="flex justify-between items-center">
                        <label className="text-xs font-semibold text-gray-500 uppercase flex items-center gap-2">
                          <ImageIcon className="w-4 h-4" /> Event Photos (Gallery)
                        </label>
                        <span className="text-[10px] bg-blue-100 text-blue-600 px-2 py-0.5 rounded border border-blue-200">
                          Past Event
                        </span>
                      </div>
                      {previewImages.length > 0 && (
                        <div className="grid grid-cols-4 gap-2 mb-2">
                          {previewImages.map((img, idx) => (
                            <a key={idx} href={`${IMAGE_BASE_URL}${img}`} target="_blank" rel="noreferrer" className="block relative group">
                              <img src={`${IMAGE_BASE_URL}${img}`} alt="Gallery" className="w-full h-12 object-cover rounded border border-gray-200" />
                            </a>
                          ))}
                        </div>
                      )}
                      <div className="flex items-center justify-center w-full">
                        <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="w-6 h-6 text-gray-400 mb-1" />
                            <p className="text-xs text-gray-500"><span className="font-semibold">Click to upload</span> photos</p>
                          </div>
                          <input type="file" className="hidden" multiple accept="image/*" onChange={handleFileChange} />
                        </label>
                      </div>
                      {selectedFiles.length > 0 && (
                        <p className="text-xs text-green-600 font-medium">{selectedFiles.length} new file(s) selected</p>
                      )}
                    </div>
                  )}
                  <Button
                    type="submit" disabled={loading}
                    className={cn("w-full text-black disabled:text-white", editEventId ? "bg-blue-600 hover:bg-blue-700 text-black" : "")}
                  >
                    {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin text-white" /> : (editEventId ? "Save Changes" : (showUploadSection ? "Save Past Event" : "Publish Upcoming Event"))}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card className="border-gold/20 shadow-lg lg:col-span-2 flex flex-col h-[800px]">
              <CardHeader className="border-b border-gold/20 bg-gradient-to-r from-saffron/10 to-gold/10 flex-shrink-0">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 w-full">
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <CardTitle className="font-serif text-secondary whitespace-nowrap">Event List</CardTitle>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="ghost" size="icon" className={cn("hover:bg-saffron/20 text-saffron transition-colors", filterDate && "bg-saffron/20")}>
                          <CalendarIcon className="h-5 w-5" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 border-gold/20 shadow-xl" align="start">
                        <CalendarComponent
                          mode="single" selected={filterDate} onSelect={handleCalendarSelect}
                          className="rounded-md border bg-white"
                          modifiers={{ upcoming: upcomingDates, past: pastDates }}
                          modifiersClassNames={{
                            upcoming: "bg-saffron/20 text-secondary font-bold hover:bg-saffron hover:text-white cursor-pointer",
                            past: "bg-gray-200 text-gray-500 font-medium hover:bg-gray-300 cursor-pointer"
                          }}
                        />
                        <div className="p-2 bg-gray-50 text-xs text-center text-gray-500 border-t flex justify-between items-center">
                          <span>Filter list by date</span>
                          {filterDate && (
                            <Button variant="ghost" size="sm" className="h-5 text-[10px] text-red-500 hover:text-red-700 p-0" onClick={() => setFilterDate(null)}>Clear Filter</Button>
                          )}
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="relative w-1/2 mx-2">
                    <Input
                      type="search" placeholder={`Search ${eventView} events...`}
                      className="pl-3 h-9 bg-white/80 border-gold/20 focus:border-gold focus:ring-gold"
                      value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="flex bg-white p-1 rounded-lg border shadow-sm flex-shrink-0">
                    <button onClick={() => handleViewSwitchRequest('upcoming')} className={cn("px-3 py-1 text-sm font-medium rounded-md transition-all flex items-center gap-2", eventView === 'upcoming' ? "bg-secondary text-white shadow-sm" : "text-gray-500 hover:text-gray-900")}>Upcoming</button>
                    <button onClick={() => handleViewSwitchRequest('past')} className={cn("px-3 py-1 text-sm font-medium rounded-md transition-all flex items-center gap-2", eventView === 'past' ? "bg-secondary text-white  shadow-sm" : "text-gray-500 hover:text-gray-900")}>Past</button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0 overflow-y-auto flex-grow bg-gray-50/30 flex flex-col justify-between">
                {filterDate && (
                  <div className="bg-blue-50 border-b border-blue-100 p-2 text-xs text-blue-700 flex justify-between items-center px-4">
                    <span className="font-semibold">Filtered by date: {format(filterDate, "MMMM dd, yyyy")}</span>
                    <Button variant="ghost" size="sm" className="h-5 w-5 p-0" onClick={() => setFilterDate(null)}><X className="h-3 w-3" /></Button>
                  </div>
                )}
                <div className="divide-y divide-gray-100 flex-grow">
                  {paginatedEvents.length > 0 ? (
                    paginatedEvents.map((event) => (
                      eventView === 'upcoming' ? (
                        <UpcomingEventItem key={event.id} event={event} onEdit={handleEditEvent} onDelete={() => initiateDelete('event', event.id)} activeId={editEventId} />
                      ) : (
                        <PastEventItem key={event.id} event={event} onEdit={handleEditEvent} onDelete={() => initiateDelete('event', event.id)} activeId={editEventId} />
                      )
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-gray-400 py-12">
                      <div className="bg-gray-100 p-4 rounded-full mb-3">
                        {filterDate ? <FilterX className="h-6 w-6" /> : (eventView === 'upcoming' ? <CalendarIcon className="h-6 w-6" /> : <History className="h-6 w-6" />)}
                      </div>
                      <p className="font-medium text-gray-500">No events found</p>
                      <p className="text-sm">
                        {filterDate ? `No events scheduled on ${format(filterDate, "MMM dd")}` : (searchQuery ? `No matches for "${searchQuery}"` : `No ${eventView} events`)}
                      </p>
                    </div>
                  )}
                </div>
                {totalItems > 0 && (
                  <div className="p-4 border-t border-gray-100 bg-white flex items-center justify-between sticky bottom-0">
                    <Button variant="outline" size="sm" onClick={goToPrevPage} disabled={currentPage === 1} className="w-24 gap-1"><ChevronLeft className="h-4 w-4" /> Prev</Button>
                    <span className="text-sm font-medium text-gray-600">Page {currentPage} of {totalPages}</span>
                    <Button variant="outline" size="sm" onClick={goToNextPage} disabled={currentPage === totalPages} className="w-24 gap-1">Next <ChevronRight className="h-4 w-4" /></Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* --- DARSHAN TAB --- */}
        {activeTab === 'darshan' && (
          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="border-gold/20 shadow-lg h-fit">
              <CardHeader className="border-b border-gold/20 bg-secondary/5 flex flex-row items-center justify-between">
                <CardTitle className="text-secondary font-serif">{editDarshanId ? "Edit Timing" : "Add Timing"}</CardTitle>
                {editDarshanId && (
                  <Button variant="ghost" size="sm" onClick={resetDarshanForm} className="h-8 text-xs text-muted-foreground"><X className="h-3 w-3 mr-1" /> Cancel</Button>
                )}
              </CardHeader>
              <CardContent className="pt-6">
                <form onSubmit={handleDarshanSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-500 uppercase">Day Range</label>
                    <Input placeholder="e.g. Mon - Fri" value={darshanData.dayRange} onChange={e => setDarshanData({ ...darshanData, dayRange: e.target.value })} required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-500 uppercase">Start Time</label>
                    <Input type="time" placeholder="e.g. 06:00 AM" value={darshanData.startTime} onChange={e => setDarshanData({ ...darshanData, startTime: e.target.value })} required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-500 uppercase">End Time</label>
                    <Input type="time" placeholder="e.g. 09:00 PM" value={darshanData.endTime} onChange={e => setDarshanData({ ...darshanData, endTime: e.target.value })} required />
                  </div>
                  <Button type="submit" className={cn("w-full text-black", editDarshanId ? "bg-blue-600 hover:bg-blue-700" : "")} disabled={loading}>
                    {loading ? <Loader2 className="animate-spin mr-2" /> : (editDarshanId ? "Update Timing" : "Save Timing")}
                  </Button>
                </form>
              </CardContent>
            </Card>
            <Card className="border-gold/20 shadow-lg lg:col-span-2 bg-gradient-to-br from-card to-saffron/5">
              <CardHeader className="border-b border-gold/20 bg-gradient-to-r from-gold/20 to-saffron/20">
                <CardTitle className="flex items-center gap-2 font-serif text-secondary"><Clock className="h-5 w-5 text-gold" /> Current Schedule</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {darshanList.map((timing, index) => (
                    <div key={index} className={cn("border-b border-gold/10 pb-4 last:border-0 bg-white/60 p-4 rounded-lg", editDarshanId === timing.id && "ring-2 ring-blue-400 bg-blue-50")}>
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-semibold text-secondary text-lg">{timing.dayRange}</h4>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" className="text-blue-500 hover:bg-blue-50" onClick={() => handleEditDarshan(timing)}><Pencil className="h-4 w-4" /></Button>
                          <Button variant="ghost" size="icon" className="text-red-500 hover:bg-red-50" onClick={() => initiateDelete('darshan', timing.id)}><Trash2 className="h-4 w-4" /></Button>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm mt-2">
                        <div className="bg-white/80 rounded-md px-4 py-2 border border-gold/20 flex items-center gap-3 w-full shadow-sm">
                          <Clock className="w-4 h-4 text-saffron" />
                          <div className="flex flex-col">
                            <span className="text-[10px] font-bold text-muted-foreground uppercase">Opening Hours</span>
                             {/* Darshan time format applied here if needed, but your request was specific to visitors */}
                            <span className="font-medium text-foreground text-base">{timing.startTime} - {timing.endTime}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  {darshanList.length === 0 && <p className="text-center text-gray-500">No timings configured.</p>}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Visitor Tab Content Removed */}

        {/* --- RESOURCES TAB --- */}
        {activeTab === 'resources' && (
          <div className="grid lg:grid-cols-3 gap-8">

            {/* TOGGLE & FORM CARD */}
            <Card className="border-gold/20 shadow-lg lg:col-span-1 h-fit sticky top-24">
              <CardHeader className="border-b border-gold/20 bg-secondary/5">
                <div className="flex justify-center bg-gray-100 p-1 rounded-lg mb-4">
                  <button
                    onClick={() => { setResourceView('articles'); setSelectedFiles([]); }}
                    className={cn("flex-1 px-3 py-1.5 text-sm font-medium rounded-md transition-all flex items-center justify-center gap-2", resourceView === 'articles' ? "bg-white text-secondary shadow-sm" : "text-gray-500 hover:text-gray-900")}
                  >
                    <BookOpen className="w-4 h-4" /> Articles
                  </button>
                  <button
                    onClick={() => { setResourceView('videos'); setSelectedFiles([]); }}
                    className={cn("flex-1 px-3 py-1.5 text-sm font-medium rounded-md transition-all flex items-center justify-center gap-2", resourceView === 'videos' ? "bg-white text-secondary shadow-sm" : "text-gray-500 hover:text-gray-900")}
                  >
                    <Video className="w-4 h-4" /> Videos
                  </button>
                </div>
                <CardTitle className="text-secondary font-serif text-center">
                  {resourceView === 'articles' ? "Add New Article" : "Add New Video"}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">

                {/* ARTICLE FORM */}
                {resourceView === 'articles' && (
                  <form onSubmit={handleArticleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-gray-500 uppercase">Article Title</label>
                      <Input placeholder="e.g. The Path of Dharma" value={articleData.title} onChange={e => setArticleData({ ...articleData, title: e.target.value })} required />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <label className="text-xs font-semibold text-gray-500 uppercase">Author</label>
                        <Input placeholder="e.g. Guru Ji" value={articleData.author} onChange={e => setArticleData({ ...articleData, author: e.target.value })} required />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-semibold text-gray-500 uppercase">Date</label>
                        <Input placeholder="e.g. Dec 15, 2024" value={articleData.date} onChange={e => setArticleData({ ...articleData, date: e.target.value })} required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-gray-500 uppercase">External Link (Optional)</label>
                      <Input placeholder="https://..." value={articleData.externalLink} onChange={e => setArticleData({ ...articleData, externalLink: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-gray-500 uppercase">Excerpt</label>
                      <Textarea placeholder="Short summary..." value={articleData.excerpt} onChange={e => setArticleData({ ...articleData, excerpt: e.target.value })} />
                    </div>
                    <div className="space-y-2 pt-2 border-t border-dashed">
                      <label className="text-xs font-semibold text-gray-500 uppercase flex items-center gap-2"><ImageIcon className="w-4 h-4" /> Cover Image</label>
                      <Input type="file" accept="image/*" onChange={handleFileChange} className="text-xs" />
                    </div>
                    <Button type="submit" disabled={loading} className="w-full text-black">
                      {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin text-white" /> : "Publish Article"}
                    </Button>
                  </form>
                )}

                {/* VIDEO FORM */}
                {resourceView === 'videos' && (
                  <form onSubmit={handleVideoSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-gray-500 uppercase">Video Title</label>
                      <Input placeholder="e.g. Morning Aarti" value={videoData.title} onChange={e => setVideoData({ ...videoData, title: e.target.value })} required />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-gray-500 uppercase">Speaker / Channel</label>
                      <Input placeholder="e.g. Temple Channel" value={videoData.speaker} onChange={e => setVideoData({ ...videoData, speaker: e.target.value })} />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-gray-500 uppercase">Video Link</label>
                      <Input placeholder="https://youtube.com/..." value={videoData.videoLink} onChange={e => setVideoData({ ...videoData, videoLink: e.target.value })} />
                    </div>
                    <div className="space-y-2 pt-2 border-t border-dashed">
                      <label className="text-xs font-semibold text-gray-500 uppercase flex items-center gap-2"><ImageIcon className="w-4 h-4" /> Thumbnail Image</label>
                      <Input type="file" accept="image/*" onChange={handleFileChange} className="text-xs" />
                    </div>
                    <Button type="submit" disabled={loading} className="w-full text-black">
                      {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin text-white" /> : "Add Video Resource"}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>

            {/* LIST AREA */}
            <Card className="border-gold/20 shadow-lg lg:col-span-2 flex flex-col h-[800px]">
              <CardHeader className="border-b border-gold/20 bg-gradient-to-r from-saffron/10 to-gold/10">
                <CardTitle className="font-serif text-secondary whitespace-nowrap">
                  {resourceView === 'articles' ? "Published Articles" : "Video Library"}
                </CardTitle>
                <p className="text-xs text-muted-foreground mt-1">Select up to 3 items to feature on the homepage.</p>
              </CardHeader>
              <CardContent className="p-0 overflow-y-auto flex-grow bg-gray-50/30 flex flex-col justify-between">
                <div className="divide-y divide-gray-100 flex-grow">

                  {/* ARTICLES LIST (PAGINATED) */}
                  {resourceView === 'articles' && (
                    paginatedResources.length > 0 ? (
                      paginatedResources.map((article) => (
                        <div key={article.id} className={cn("flex gap-4 p-4 hover:bg-white transition-colors", article.isFeatured && "bg-yellow-50/50")}>
                          <div className="w-24 h-24 bg-gray-200 rounded-md overflow-hidden flex-shrink-0 border">
                            {article.image ? (
                              <img src={`${IMAGE_BASE_URL}${article.image}`} alt={article.title} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-400"><BookOpen className="w-8 h-8" /></div>
                            )}
                          </div>
                          <div className="flex-grow">
                            <div className="flex justify-between items-start">
                              <div>
                                  <h4 className="font-semibold text-foreground text-lg leading-tight flex items-center gap-2">
                                  {article.title}
                                </h4>
                                <div className="flex gap-3 text-xs text-muted-foreground mt-1 mb-2">
                                  <span className="flex items-center gap-1"><User className="w-3 h-3" /> {article.author}</span>
                                  <span className="flex items-center gap-1"><CalendarIcon className="w-3 h-3" /> {article.date}</span>
                                </div>
                              </div>
                              <div className="flex gap-1">
                                
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="text-gray-400 hover:text-yellow-500 hover:bg-yellow-50 h-8 w-8"
                                  onClick={() => handleToggleFeature('article', article)}
                                  title={article.isFeatured ? "Un-feature" : "Feature this article"}
                                >
                               
                                  <Star
                                    className="h-4 w-4 stroke-black"
                                    fill={article.isFeatured ? "yellow" : "none"}
                                  />

                                </Button>
                                <Button variant="ghost" size="icon" className="text-red-500 hover:bg-red-50 h-8 w-8" onClick={() => initiateDelete('article', article.id)}>
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                            <p className="text-sm text-gray-600 line-clamp-2 mb-2">{article.excerpt}</p>
                            {article.externalLink && (
                              <a href={article.externalLink} target="_blank" rel="noreferrer" className="text-xs text-blue-600 hover:underline flex items-center gap-1">
                                <LinkIcon className="w-3 h-3" /> Read Full
                              </a>
                            )}
                          </div>
                        </div>
                      ))
                    ) : <div className="p-8 text-center text-gray-500">No articles found.</div>
                  )}

                  {/* VIDEOS LIST (PAGINATED) */}
                  {resourceView === 'videos' && (
                    paginatedResources.length > 0 ? (
                      paginatedResources.map((video) => (
                        <div key={video.id} className={cn("flex gap-4 p-4 hover:bg-white transition-colors", video.isFeatured && "bg-yellow-50/50")}>
                          <div className="w-32 h-20 bg-black rounded-md overflow-hidden flex-shrink-0 relative group">
                            {video.thumbnail ? (
                              <img src={`${IMAGE_BASE_URL}${video.thumbnail}`} alt={video.title} className="w-full h-full object-cover opacity-80" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-500"><Video className="w-8 h-8" /></div>
                            )}
                            <div className="absolute inset-0 flex items-center justify-center">
                              <PlayCircle className="w-8 h-8 text-white opacity-80" />
                            </div>
                            <div className="absolute bottom-1 right-1 bg-black/70 text-white text-[10px] px-1 rounded">
                              {video.duration || "00:00"}
                            </div>
                          </div>
                          <div className="flex-grow">
                            <div className="flex justify-between items-start">
                              <h4 className="font-semibold text-foreground text-lg leading-tight flex items-center gap-2">
                                {video.title}
                              </h4>
                              <div className="flex gap-1">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="text-gray-400 hover:text-yellow-500 hover:bg-yellow-50 h-8 w-8"
                                  onClick={() => handleToggleFeature('video', video)}
                                  title={video.isFeatured ? "Un-feature" : "Feature this video"}
                                >
                                  <Star
                                    className="h-4 w-4 stroke-black"
                                    fill={video.isFeatured ? "yellow" : "none"}
                                  />

                                </Button>
                                <Button variant="ghost" size="icon" className="text-red-500 hover:bg-red-50 h-8 w-8" onClick={() => initiateDelete('video', video.id)}>
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">{video.speaker}</p>
                            <div className="flex items-center gap-4 mt-2">
                              {video.videoLink && (
                                <a href={video.videoLink} target="_blank" rel="noreferrer" className="text-xs text-blue-600 hover:underline flex items-center gap-1">
                                  <LinkIcon className="w-3 h-3" /> Watch Link
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      ))
                    ) : <div className="p-8 text-center text-gray-500">No videos found.</div>
                  )}

                </div>

                {/* RESOURCE PAGINATION FOOTER */}
                {totalResourceItems > 0 && (
                  <div className="p-4 border-t border-gray-100 bg-white flex items-center justify-between sticky bottom-0">
                    <Button variant="outline" size="sm" onClick={goToPrevResourcePage} disabled={currentResourcePage === 1} className="w-24 gap-1"><ChevronLeft className="h-4 w-4" /> Prev</Button>
                    <span className="text-sm font-medium text-gray-600">Page {currentResourcePage} of {totalResourcePages}</span>
                    <Button variant="outline" size="sm" onClick={goToNextResourcePage} disabled={currentResourcePage === totalResourcePages} className="w-24 gap-1">Next <ChevronRight className="h-4 w-4" /></Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

      </main>
    </div>
  );
};
// ... (Sub components like ToastPopup, UnsavedChangesModal, etc. remain here) ...
const ToastPopup = ({ show, message, type, onClose }) => {
  if (!show) return null;
  const isSuccess = type === 'success';
  return (
    <div className="fixed top-4 right-4 z-[100] animate-in slide-in-from-top-2 fade-in duration-300">
      <div className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-lg shadow-xl border-l-4 min-w-[300px] backdrop-blur-sm",
        isSuccess ? "bg-green-600 text-white border-green-800" : "bg-red-600 text-white border-red-800"
      )}>
        {isSuccess ? <CheckCircle className="h-5 w-5 text-white" /> : <AlertCircle className="h-5 w-5 text-white" />}
        <div className="flex-grow">
          <p className="text-sm font-semibold">{isSuccess ? "Success" : "Error"}</p>
          <p className="text-xs text-white/90">{message}</p>
        </div>
        <button onClick={onClose} className="text-white/70 hover:text-white"><X className="h-4 w-4" /></button>
      </div>
    </div>
  );
};

const UnsavedChangesModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md p-6 m-4 scale-100 animate-in zoom-in-95 duration-200">
        <div className="flex flex-col items-center text-center">
          <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center mb-4"><AlertTriangle className="h-6 w-6 text-orange-600" /></div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Unsaved Changes</h3>
          <p className="text-sm text-gray-500 mb-6">Switching views now will discard your changes.</p>
          <div className="flex w-full gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1">Keep Editing</Button>
            <Button onClick={onConfirm} className="flex-1 bg-orange-600 hover:bg-orange-700 text-black">Discard & Switch</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const AddTypeModal = ({ isOpen, onClose, onConfirm }) => {
  const [typeName, setTypeName] = useState("");
  if (!isOpen) return null;
  const handleSubmit = (e) => { e.preventDefault(); if (typeName.trim()) { onConfirm(typeName.trim()); setTypeName(""); } };
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-lg shadow-2xl max-w-sm w-[90%]  p-6 m-4 animate-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-gray-900">Add New Category</h3>
          <Button variant="ghost" size="sm" onClick={onClose} className="h-6 w-6 p-0 rounded-full"><X className="h-4 w-4" /></Button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-500 uppercase">Category Name</label>
            <Input placeholder="e.g. Charity, Yoga" value={typeName} onChange={(e) => setTypeName(e.target.value)} autoFocus required />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit" className="bg-saffron text-secondary hover:bg-saffron/90">Add Category</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

const UpcomingEventItem = ({ event, onEdit, onDelete, activeId }) => (
  <div className={cn("flex items-center gap-4 p-4 hover:bg-white transition-colors border-b last:border-0", activeId === event.id && "bg-blue-50/50 border-blue-100")}>
    <div className="flex-shrink-0 w-16 text-center">
      <div className="bg-secondary text-secondary-foreground rounded-t-md py-1 text-xs font-bold uppercase">{event.day}</div>
      <div className="bg-card border border-t-0 border-gold/30 rounded-b-md py-2 shadow-sm bg-white">
        <span className="text-xl font-bold text-secondary block leading-none">{event.dateDisplay?.split(" ")[1]}</span>
        <span className="text-[10px] text-muted-foreground uppercase font-bold">{event.dateDisplay?.split(" ")[0]}</span>
      </div>
    </div>
    <div className="flex-grow">
      <h4 className="font-semibold text-foreground text-lg">{event.title}</h4>
      <div className="text-sm text-muted-foreground flex flex-wrap gap-x-4 gap-y-1 mt-1">
        <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {event.time}</span>
        <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {event.location}</span>
      </div>
    </div>
    <div className="flex flex-col items-end gap-2">
      <span className={cn("px-3 py-1 rounded-full text-xs font-medium", getTypeColor(event.type))}>{event.type}</span>
      <div className="flex gap-1">
        <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-500 hover:bg-blue-50" onClick={() => onEdit(event)}><Pencil className="h-4 w-4" /></Button>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:bg-red-50" onClick={onDelete}><Trash2 className="h-4 w-4" /></Button>
      </div>
    </div>
  </div>
);

const PastEventItem = ({ event, onEdit, onDelete, activeId }) => {
  let imageCount = 0;
  if (event.galleryImages) {
    imageCount = typeof event.galleryImages === 'string' ? JSON.parse(event.galleryImages).length : event.galleryImages.length;
  }
  return (
    <div className={cn("flex items-center gap-4 p-4 hover:bg-white transition-colors border-b last:border-0", activeId === event.id && "bg-blue-50/50 border-blue-100")}>
      <div className="flex-shrink-0 w-16 text-center grayscale opacity-80">
        <div className="bg-gray-500 text-white rounded-t-md py-1 text-xs font-bold uppercase">{event.day}</div>
        <div className="bg-white border border-t-0 border-gray-300 rounded-b-md py-2 shadow-sm">
          <span className="text-xl font-bold text-gray-600 block leading-none">{event.dateDisplay?.split(" ")[1]}</span>
          <span className="text-[10px] text-muted-foreground uppercase font-bold">{event.dateDisplay?.split(" ")[0]}</span>
        </div>
      </div>
      <div className="flex-grow">
        <div className="flex items-center gap-2">
          <h4 className="font-semibold text-gray-700 decoration-gray-400">{event.title}</h4>
          <span className="text-[10px] bg-gray-200 text-gray-600 px-1.5 py-0.5 rounded uppercase">Expired</span>
        </div>
        <div className="flex items-center gap-3 mt-1.5">
          {imageCount > 0 ? (
            <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-md flex items-center gap-1 font-medium border border-green-200"><ImageIcon className="w-3 h-3" /> {imageCount} Photos</span>
          ) : (
            <span className="text-xs bg-orange-50 text-orange-600 px-2 py-0.5 rounded-md flex items-center gap-1 font-medium border border-orange-200"><FileImage className="w-3 h-3" /> Gallery empty</span>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" className="text-blue-600 border-blue-200 h-8 text-xs font-medium" onClick={() => onEdit(event)}><Upload className="h-3 w-3 mr-1.5" /> {imageCount > 0 ? "Edit Photos" : "Add Photos"}</Button>
        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-red-600 h-8 w-8" onClick={onDelete}><Trash2 className="h-4 w-4" /></Button>
      </div>
    </div>
  );
};
export default AdminDashboard;