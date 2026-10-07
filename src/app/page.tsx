"use client";

import React, { useState, useEffect } from "react";
import {
  FileText,
  Building2,
  Receipt,
  CheckCircle2,
  ShieldCheck,
  BookOpen,
  GraduationCap,
  Briefcase,
  MessageSquare,
  Plus,
  Trash2,
  CheckCircle,
  Clock,
  User,
  Star,
  ExternalLink,
  Laptop,
  Smartphone,
  Settings,
  Globe,
  Sun,
  Moon,
  Loader2,
  X,
} from "lucide-react";

// Types & Data Structures
interface ServiceItem {
  id: string;
  titleEn: string;
  titleBn: string;
  categoryEn: string;
  categoryBn: string;
  price: string;
  deliveryEn: string;
  deliveryBn: string;
  descriptionEn: string;
  descriptionBn: string;
  rating: number;
  buyers: number;
}

interface QueryItem {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: "Pending" | "Resolved";
  date: string;
}

const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: "s1",
    titleEn: "Income Tax Return Filing & TIN",
    titleBn: "ইনকাম ট্যাক্স রিটার্ন ফাইল ও টিআইএন (TIN)",
    categoryEn: "Taxation",
    categoryBn: "কর ও আয়কর",
    price: "৳৩,৫০০ / $120",
    deliveryEn: "2-3 Business Days",
    deliveryBn: "২-৩ কার্যদিবস",
    descriptionEn:
      "Comprehensive individual & corporate income tax calculation, rebate optimization, and submission to NBR.",
    descriptionBn:
      "ব্যক্তিগত ও করপোরেট আয়কর গণনা, রেয়াত সুবিধা এবং এনবিআর (NBR) ই-রিটার্ন জমার সম্পূর্ণ সহায়তা।",
    rating: 4.9,
    buyers: 340,
  },
  {
    id: "s2",
    titleEn: "RJSC Company Incorporation",
    titleBn: "আরজেএসসি (RJSC) কোম্পানি রেজিস্ট্রেশন",
    categoryEn: "Registration",
    categoryBn: "কোম্পানি নিবন্ধন",
    price: "৳২৫,০০০ / $350",
    deliveryEn: "5-7 Business Days",
    deliveryBn: "৫-৭ কার্যদিবস",
    descriptionEn:
      "Full private limited company registration, name clearance, MOA, and AOA drafting.",
    descriptionBn:
      "প্রাইভেট লিমিটেড কোম্পানি রেজিস্ট্রেশন, নাম ছাড়পত্র, মেমোরেন্ডাম (MOA) এবং আর্টিক্যালস (AOA) ড্রাফটিং।",
    rating: 5.0,
    buyers: 180,
  },
  {
    id: "s3",
    titleEn: "VAT Registration & Monthly Return",
    titleBn: "ভ্যাট রেজিস্ট্রেশন (BIN) ও মাসিক রিটার্ন",
    categoryEn: "Taxation",
    categoryBn: "ভ্যাট ও কাস্টমস",
    price: "৳৪,৫০০০ / $150",
    deliveryEn: "3 Business Days",
    deliveryBn: "৩ কার্যদিবস",
    descriptionEn:
      "BIN acquisition, 9.1 VAT return filing, VDS compliance advisory, and bookkeeping support.",
    descriptionBn:
      "বিন (BIN) প্রদান, ৯.১ ভ্যাট রিটার্ন জমা, ভিডিএস (VDS) পরামর্শ ও বুককিপিং সেবা।",
    rating: 4.8,
    buyers: 290,
  },
  {
    id: "s4",
    titleEn: "BSTI Certification & Clearance",
    titleBn: "বিএসটিআই (BSTI) ক্লিয়ারেন্স ও সার্টিফাইড সাপোর্ট",
    categoryEn: "Compliance",
    categoryBn: "কমপ্লায়েন্স",
    price: "৳২০,০০০ / $280",
    deliveryEn: "10-14 Business Days",
    deliveryBn: "১০-১৪ কার্যদিবস",
    descriptionEn:
      "Mandatory quality approval, laboratory testing documentation, and import standard certification.",
    descriptionBn:
      "মাননিয়ন্ত্রণ ছাড়পত্র, ল্যাবরেটরি টেস্ট পেপার প্রস্তুত ও পণ্য আমদানির বিএসটিআই সনদ সহায়তা।",
    rating: 4.9,
    buyers: 110,
  },
];

const INITIAL_QUERIES: QueryItem[] = [
  {
    id: "q1",
    name: "Rahim Ahmed",
    email: "rahim@example.com",
    phone: "+8801700000000",
    subject: "Dual Citizen Tax Filing",
    message: "I have earnings abroad and in BD. How do I file tax returns?",
    status: "Pending",
    date: "Oct 06, 2026",
  },
];

export default function BusinessPassApp() {
  // Theme & Language States
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [lang, setLang] = useState<"en" | "bn">("bn");
  const [viewMode, setViewMode] = useState<"desktop" | "mobile" | "admin">(
    "desktop"
  );
  const [activeTab, setActiveTab] = useState("home");
  const [isLoading, setIsLoading] = useState(false);

  // Core Data States
  const [services, setServices] = useState<ServiceItem[]>(INITIAL_SERVICES);
  const [queries, setQueries] = useState<QueryItem[]>(INITIAL_QUERIES);

  // Interface Controls
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [selectedModalItem, setSelectedModalItem] = useState<ServiceItem | null>(
    null
  );

  // Form State
  const [queryForm, setQueryForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [newServiceForm, setNewServiceForm] = useState({
    titleEn: "",
    titleBn: "",
    categoryEn: "Taxation",
    categoryBn: "কর ও আয়কর",
    price: "৳৫,০০০ / $100",
    deliveryEn: "3 Days",
    deliveryBn: "৩ দিন",
    descriptionEn: "",
    descriptionBn: "",
  });

  // Handle Tab / View Loading Trigger
  const handleTabChange = (newTab: string) => {
    setIsLoading(true);
    setActiveTab(newTab);
    setTimeout(() => setIsLoading(false), 300);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleQuerySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!queryForm.name || !queryForm.email || !queryForm.message) {
      showToast(
        lang === "bn"
          ? "অনুগ্রহ করে বাধ্যতামূলক সকল তথ্য প্রদান করুন!"
          : "Please fill in all required fields!"
      );
      return;
    }
    const newQ: QueryItem = {
      id: "q" + (queries.length + 1),
      ...queryForm,
      status: "Pending",
      date: new Date().toLocaleDateString(),
    };
    setQueries([newQ, ...queries]);
    setQueryForm({ name: "", email: "", phone: "", subject: "", message: "" });
    showToast(
      lang === "bn"
        ? "আপনার বার্তাটি সফলভাবে গৃহীত হয়েছে! শীঘ্রই যোগাযোগ করা হবে।"
        : "Your query submitted successfully! We will contact you soon."
    );
  };

  const handleAddService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newServiceForm.titleEn && !newServiceForm.titleBn) return;

    const newS: ServiceItem = {
      id: "s" + (services.length + 1),
      titleEn: newServiceForm.titleEn || "New Compliance Service",
      titleBn: newServiceForm.titleBn || "নতুন কমপ্লায়েন্স সেবা",
      categoryEn: newServiceForm.categoryEn,
      categoryBn: newServiceForm.categoryBn,
      price: newServiceForm.price,
      deliveryEn: newServiceForm.deliveryEn,
      deliveryBn: newServiceForm.deliveryBn,
      descriptionEn: newServiceForm.descriptionEn || "Detailed service description",
      descriptionBn: newServiceForm.descriptionBn || "বিস্তারিত সেবার বিবরণ",
      rating: 5.0,
      buyers: 0,
    };

    setServices([...services, newS]);
    setNewServiceForm({
      titleEn: "",
      titleBn: "",
      categoryEn: "Taxation",
      categoryBn: "কর ও আয়কর",
      price: "৳৫,০০০ / $100",
      deliveryEn: "3 Days",
      deliveryBn: "৩ দিন",
      descriptionEn: "",
      descriptionBn: "",
    });
    showToast(
      lang === "bn" ? "নতুন সেবা সফলভাবে যুক্ত হয়েছে!" : "Service added successfully!"
    );
  };

  // Color Classes mapping based on Theme State
  const themeBg =
    theme === "dark"
      ? "bg-slate-950 text-slate-100"
      : "bg-slate-50 text-slate-900";
  const themeCardBg =
    theme === "dark"
      ? "bg-slate-900/90 border-slate-800"
      : "bg-white/90 border-slate-200 shadow-md";
  const themeInputBg =
    theme === "dark"
      ? "bg-slate-950 border-slate-800 text-white"
      : "bg-slate-100 border-slate-300 text-slate-900";
  const themeHeaderBg =
    theme === "dark"
      ? "bg-slate-900/90 border-slate-800"
      : "bg-white/90 border-slate-200 shadow-sm";

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-300 ${themeBg}`}>
      {/* Top Header Control Switcher */}
      <div
        className={`px-4 py-2 border-b flex flex-wrap items-center justify-between text-xs transition-colors duration-300 ${
          theme === "dark"
            ? "bg-slate-900 border-slate-800"
            : "bg-slate-100 border-slate-200"
        }`}
      >
        <div className="flex items-center space-x-2 text-sky-500 font-semibold">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
          <span>
            {lang === "bn"
              ? "বিজনেস পাস প্ল্যাটফর্ম (লাইভ সার্ভিস)"
              : "Business PASS Platform (Live Services)"}
          </span>
        </div>

        <div className="flex items-center space-x-2 my-1 sm:my-0">
          {/* Smooth Dark/Light Theme Toggle */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className={`px-3 py-1.5 rounded-lg border font-bold flex items-center space-x-1.5 transition-all ${
              theme === "dark"
                ? "bg-slate-800 text-amber-400 border-slate-700 hover:bg-slate-700"
                : "bg-white text-slate-800 border-slate-300 hover:bg-slate-100 shadow-sm"
            }`}
          >
            {theme === "dark" ? (
              <>
                <Sun className="w-3.5 h-3.5" />
                <span>Light Mode</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5" />
                <span>Dark Mode</span>
              </>
            )}
          </button>

          {/* Language Switcher */}
          <button
            onClick={() => setLang(lang === "en" ? "bn" : "en")}
            className="bg-amber-500/20 text-amber-500 border border-amber-500/40 hover:bg-amber-500 hover:text-slate-950 px-3 py-1.5 rounded-lg font-bold transition flex items-center space-x-1"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{lang === "en" ? "বাংলা" : "English"}</span>
          </button>

          {/* View Modes */}
          <div className="flex items-center space-x-1 p-1 rounded-lg border bg-slate-900/10 border-slate-700/20">
            <button
              onClick={() => setViewMode("desktop")}
              className={`px-2 py-0.5 rounded font-bold ${
                viewMode === "desktop"
                  ? "bg-sky-600 text-white"
                  : "text-slate-400"
              }`}
            >
              Desktop
            </button>
            <button
              onClick={() => setViewMode("mobile")}
              className={`px-2 py-0.5 rounded font-bold ${
                viewMode === "mobile"
                  ? "bg-sky-600 text-white"
                  : "text-slate-400"
              }`}
            >
              Mobile
            </button>
            <button
              onClick={() => setViewMode("admin")}
              className={`px-2 py-0.5 rounded font-bold ${
                viewMode === "admin"
                  ? "bg-amber-600 text-white"
                  : "text-slate-400"
              }`}
            >
              Admin CMS
            </button>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-14 right-6 z-50 bg-emerald-600 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center space-x-2 animate-bounce">
          <CheckCircle className="w-5 h-5 text-emerald-200" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* DESKTOP VIEWPORT */}
      {viewMode === "desktop" && (
        <div className="flex-1 flex flex-col max-w-7xl w-full mx-auto p-4 sm:p-6 space-y-8">
          {/* Navbar */}
          <header className={`p-4 rounded-2xl border flex items-center justify-between transition-colors ${themeHeaderBg}`}>
            <div
              className="flex items-center space-x-3 cursor-pointer"
              onClick={() => handleTabChange("home")}
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 to-amber-500 flex items-center justify-center font-black text-white text-xl shadow-md">
                BP
              </div>
              <div>
                <h1 className="text-xl font-black tracking-tight">
                  Business <span className="text-sky-500">PASS</span>
                </h1>
                <p className="text-[10px] opacity-70">
                  {lang === "bn"
                    ? "ট্যাক্স • আরজেএসসি • ভ্যাট • লিগ্যাল কনসালটেন্সি"
                    : "Tax • RJSC • VAT • Legal Consultancy"}
                </p>
              </div>
            </div>

            <nav className="flex items-center space-x-1">
              {[
                { id: "home", labelEn: "Home", labelBn: "হোম" },
                { id: "services", labelEn: "Services", labelBn: "সেবাসমূহ" },
                { id: "queries", labelEn: "Consultation", labelBn: "পরামর্শ নিন" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                    activeTab === tab.id
                      ? "bg-sky-600 text-white shadow-md"
                      : "opacity-70 hover:opacity-100"
                  }`}
                >
                  {lang === "bn" ? tab.labelBn : tab.labelEn}
                </button>
              ))}
            </nav>
          </header>

          {/* Content Loading Skeleton UI */}
          {isLoading ? (
            <div className="space-y-6 py-12">
              <div className="flex items-center justify-center space-x-2 text-sky-500">
                <Loader2 className="w-6 h-6 animate-spin" />
                <span className="text-sm font-bold">
                  {lang === "bn" ? "তথ্য লোড হচ্ছে..." : "Loading Workspace..."}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((n) => (
                  <div
                    key={n}
                    className={`h-48 rounded-2xl border animate-pulse ${
                      theme === "dark" ? "bg-slate-900 border-slate-800" : "bg-slate-200 border-slate-300"
                    }`}
                  ></div>
                ))}
              </div>
            </div>
          ) : (
            <>
              {/* HOME / HERO TAB */}
              {activeTab === "home" && (
                <div className="space-y-8">
                  <div className="bg-gradient-to-r from-sky-950 via-slate-900 to-sky-950 text-white p-8 sm:p-12 rounded-3xl border border-sky-800/40 space-y-6 shadow-xl">
                    <span className="text-xs font-bold bg-sky-500/20 text-sky-300 border border-sky-400/30 px-3 py-1 rounded-full">
                      {lang === "bn"
                        ? "স্বচ্ছ ও দ্রুত আইনি ও কর কমপ্লায়েন্স সেবা"
                        : "Fast & Reliable Corporate Compliance"}
                    </span>
                    <h2 className="text-3xl sm:text-5xl font-black leading-tight">
                      {lang === "bn" ? (
                        <>
                          আপনার ব্যবসার <span className="text-amber-400">ট্যাক্স ও আরজেএসসি</span> সমাধান
                        </>
                      ) : (
                        <>
                          Hassle-Free <span className="text-amber-400">Tax & RJSC</span> Legal Execution
                        </>
                      )}
                    </h2>
                    <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
                      {lang === "bn"
                        ? "ইনকাম ট্যাক্স রিটার্ন ফাইল, কোম্পানি রেজিস্ট্রেশন, ভ্যাট জমা ও বিএসটিআই সংক্রান্ত সেবা। অভিজ্ঞ আইনজীবীদের নিবিড় তত্ত্বাবধানে তৈরি করা হয়েছে।"
                        : "Income tax returns, RJSC company incorporation, VAT filings, and BSTI licensing handled directly by experienced practitioners."}
                    </p>
                    <div className="flex gap-4 pt-2">
                      <button
                        onClick={() => handleTabChange("services")}
                        className="bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs px-6 py-3 rounded-xl shadow-lg transition"
                      >
                        {lang === "bn" ? "সকল সেবা দেখুন" : "Explore Services"}
                      </button>
                      <button
                        onClick={() => handleTabChange("queries")}
                        className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs px-6 py-3 rounded-xl shadow-lg transition"
                      >
                        {lang === "bn" ? "জরুরি পরামর্শ বুকিং" : "Instant Consultation"}
                      </button>
                    </div>
                  </div>

                  {/* Services Grid (Fixed Visibility) */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-xl font-bold">
                        {lang === "bn" ? "জনপ্রিয় সেবাসমূহ" : "Featured Services"}
                      </h3>
                      <button
                        onClick={() => handleTabChange("services")}
                        className="text-xs font-bold text-sky-500 hover:underline"
                      >
                        {lang === "bn" ? "সবগুলো দেখুন →" : "View All →"}
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {services.map((s) => (
                        <div
                          key={s.id}
                          className={`p-6 rounded-2xl border flex flex-col justify-between transition-all hover:scale-[1.02] ${themeCardBg}`}
                        >
                          <div>
                            <span className="text-[10px] font-bold text-amber-500 bg-amber-500/10 px-2.5 py-1 rounded-full">
                              {lang === "bn" ? s.categoryBn : s.categoryEn}
                            </span>
                            <h4 className="text-base font-bold mt-3">
                              {lang === "bn" ? s.titleBn : s.titleEn}
                            </h4>
                            <p className="text-xs opacity-75 mt-2 line-clamp-3">
                              {lang === "bn" ? s.descriptionBn : s.descriptionEn}
                            </p>
                          </div>
                          <div className="mt-6 pt-4 border-t border-slate-700/20 flex justify-between items-center">
                            <span className="text-sm font-black text-emerald-500">
                              {s.price}
                            </span>
                            <button
                              onClick={() => setSelectedModalItem(s)}
                              className="bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow"
                            >
                              {lang === "bn" ? "বুকিং" : "Book"}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ALL SERVICES TAB */}
              {activeTab === "services" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold">
                    {lang === "bn" ? "সকল আইনি ও কমপ্লায়েন্স সেবাসমূহ" : "All Services Directory"}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((s) => (
                      <div
                        key={s.id}
                        className={`p-6 rounded-2xl border flex flex-col justify-between ${themeCardBg}`}
                      >
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-[10px] font-bold text-sky-500 bg-sky-500/10 px-2.5 py-1 rounded-full">
                              {lang === "bn" ? s.categoryBn : s.categoryEn}
                            </span>
                            <div className="flex items-center space-x-1 text-amber-400 text-xs font-bold">
                              <Star className="w-3.5 h-3.5 fill-current" />
                              <span>{s.rating}</span>
                            </div>
                          </div>
                          <h3 className="text-lg font-bold">{lang === "bn" ? s.titleBn : s.titleEn}</h3>
                          <p className="text-xs opacity-75 mt-2">{lang === "bn" ? s.descriptionBn : s.descriptionEn}</p>
                          <div className="mt-4 flex items-center space-x-2 text-xs opacity-60">
                            <Clock className="w-3.5 h-3.5 text-sky-500" />
                            <span>
                              {lang === "bn" ? `সময়সীমা: ${s.deliveryBn}` : `Delivery: ${s.deliveryEn}`}
                            </span>
                          </div>
                        </div>
                        <div className="mt-6 pt-4 border-t border-slate-700/20 flex justify-between items-center">
                          <span className="text-base font-extrabold text-emerald-500">{s.price}</span>
                          <button
                            onClick={() => setSelectedModalItem(s)}
                            className="bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold px-4 py-2 rounded-xl"
                          >
                            {lang === "bn" ? "বুকিং দিন" : "Request Order"}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* CONSULTATION TAB */}
              {activeTab === "queries" && (
                <div className={`max-w-xl mx-auto w-full p-8 rounded-3xl border ${themeCardBg}`}>
                  <h2 className="text-2xl font-bold text-center mb-1">
                    {lang === "bn" ? "জরুরি আইনি পরামর্শ বুকিং" : "Book Legal & Tax Consultation"}
                  </h2>
                  <p className="text-xs text-center opacity-70 mb-6">
                    {lang === "bn"
                      ? "আপনার সুনির্দিষ্ট তথ্য প্রদান করুন, আমাদের প্রতিনিধি আপনাকে সহায়তা করবেন।"
                      : "Fill in details to get expert responses within 24 hours."}
                  </p>
                  <form onSubmit={handleQuerySubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold opacity-80 mb-1">
                        {lang === "bn" ? "আপনার নাম *" : "Your Name *"}
                      </label>
                      <input
                        type="text"
                        required
                        value={queryForm.name}
                        onChange={(e) => setQueryForm({ ...queryForm, name: e.target.value })}
                        className={`w-full p-3 rounded-xl text-xs border ${themeInputBg}`}
                        placeholder="Adv. Rahim Ahmed"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold opacity-80 mb-1">
                        {lang === "bn" ? "ইমেইল বা ফোন নম্বর *" : "Email / Phone *"}
                      </label>
                      <input
                        type="text"
                        required
                        value={queryForm.email}
                        onChange={(e) => setQueryForm({ ...queryForm, email: e.target.value })}
                        className={`w-full p-3 rounded-xl text-xs border ${themeInputBg}`}
                        placeholder="rahim@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold opacity-80 mb-1">
                        {lang === "bn" ? "প্রশ্নের বিবরণ *" : "Message Details *"}
                      </label>
                      <textarea
                        rows={4}
                        required
                        value={queryForm.message}
                        onChange={(e) => setQueryForm({ ...queryForm, message: e.target.value })}
                        className={`w-full p-3 rounded-xl text-xs border ${themeInputBg}`}
                        placeholder={lang === "bn" ? "আপনার আয়কর বা আইনি জিজ্ঞাসা টাইপ করুন..." : "Describe your legal situation..."}
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-sky-600 hover:bg-sky-500 text-white font-bold py-3 rounded-xl text-xs shadow-lg transition"
                    >
                      {lang === "bn" ? "পরামর্শের জন্য জমা দিন" : "Submit Consultation Request"}
                    </button>
                  </form>
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* MOBILE APP SIMULATOR VIEW */}
      {viewMode === "mobile" && (
        <div className="flex-1 flex justify-center items-center p-4">
          <div className="w-[360px] h-[680px] bg-slate-900 text-white border-8 border-slate-800 rounded-[36px] shadow-2xl flex flex-col overflow-hidden">
            <div className="p-4 bg-slate-950 border-b border-slate-800 text-center font-bold text-sm">
              Business PASS (Mobile)
            </div>
            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              {services.map((s) => (
                <div key={s.id} className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                  <div className="text-xs font-bold text-white">
                    {lang === "bn" ? s.titleBn : s.titleEn}
                  </div>
                  <div className="text-[10px] text-emerald-400 font-bold mt-1">{s.price}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ADMIN CMS PANEL VIEW */}
      {viewMode === "admin" && (
        <div className="flex-1 max-w-5xl w-full mx-auto p-6 space-y-6">
          <div className={`p-6 rounded-2xl border ${themeCardBg}`}>
            <h2 className="text-xl font-black text-amber-500">
              {lang === "bn" ? "এডমিন সিএমএস প্যানেল" : "Admin CMS Control Panel"}
            </h2>
            <p className="text-xs opacity-75 mt-1">
              {lang === "bn" ? "নতুন সেবা সংযোজন এবং গ্রাহকের তালিকা পরিচালনা করুন" : "Manage active service listings and client leads"}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Add Service Form */}
            <form onSubmit={handleAddService} className={`p-6 rounded-2xl border space-y-3 ${themeCardBg}`}>
              <h3 className="font-bold text-sm">{lang === "bn" ? "নতুন সেবা যুক্ত করুন" : "Add New Service"}</h3>
              <div>
                <label className="block text-[10px] font-bold opacity-70 mb-1">Title (English)</label>
                <input
                  type="text"
                  required
                  value={newServiceForm.titleEn}
                  onChange={(e) => setNewServiceForm({ ...newServiceForm, titleEn: e.target.value })}
                  className={`w-full p-2.5 rounded-lg text-xs border ${themeInputBg}`}
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold opacity-70 mb-1">শিরোনাম (বাংলা)</label>
                <input
                  type="text"
                  required
                  value={newServiceForm.titleBn}
                  onChange={(e) => setNewServiceForm({ ...newServiceForm, titleBn: e.target.value })}
                  className={`w-full p-2.5 rounded-lg text-xs border ${themeInputBg}`}
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold opacity-70 mb-1">Price</label>
                <input
                  type="text"
                  value={newServiceForm.price}
                  onChange={(e) => setNewServiceForm({ ...newServiceForm, price: e.target.value })}
                  className={`w-full p-2.5 rounded-lg text-xs border ${themeInputBg}`}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-amber-600 hover:bg-amber-500 text-white font-bold py-2.5 rounded-xl text-xs"
              >
                {lang === "bn" ? "পাবলিশ করুন" : "Publish Service"}
              </button>
            </form>

            {/* Inquiries / Client Leads */}
            <div className={`lg:col-span-2 p-6 rounded-2xl border space-y-3 ${themeCardBg}`}>
              <h3 className="font-bold text-sm">
                {lang === "bn" ? "গ্রাহক অনুসন্ধানের বার্তা (CRM)" : "Customer Leads Inquiries"}
              </h3>
              {queries.map((q) => (
                <div key={q.id} className={`p-4 rounded-xl border text-xs space-y-1 ${themeInputBg}`}>
                  <div className="font-bold text-sky-500">{q.name} ({q.email})</div>
                  <div>{q.message}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* POPUP MODAL */}
      {selectedModalItem && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`p-6 rounded-3xl max-w-md w-full space-y-4 border relative ${themeCardBg}`}>
            <button
              onClick={() => setSelectedModalItem(null)}
              className="absolute top-4 right-4 opacity-60 hover:opacity-100"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-bold">
              {lang === "bn" ? selectedModalItem.titleBn : selectedModalItem.titleEn}
            </h3>
            <p className="text-xs opacity-80 leading-relaxed">
              {lang === "bn" ? selectedModalItem.descriptionBn : selectedModalItem.descriptionEn}
            </p>
            <div className="flex justify-between items-center pt-4 border-t border-slate-700/20">
              <span className="text-base font-bold text-emerald-500">{selectedModalItem.price}</span>
              <button
                onClick={() => {
                  showToast(lang === "bn" ? "অনুরোধ নিশ্চিত করা হয়েছে!" : "Request Confirmed!");
                  setSelectedModalItem(null);
                }}
                className="bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold px-5 py-2 rounded-xl"
              >
                {lang === "bn" ? "কনফার্ম করুন" : "Confirm Order"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
