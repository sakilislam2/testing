
import React, { useState, useEffect } from 'react';

// --- Types ---
type View = 'home' | 'about' | 'skins' | 'leaderboard' | 'tournament' | 'trip' | 'admin';

interface BusModel {
  id: string;
  name: string;
  imageUrl: string;
}

interface Skin {
  id: string;
  modelId: string;
  title: string;
  author: string;
  route: string;
  model: string;
  imageUrl: string;
  captchaCode: string;
  paintUrl: string;
  glassUrl: string;
}

interface LeaderboardEntry {
  rank: string;
  name: string;
  id: string;
  trips: number | string;
}

interface TripSchedule {
  time: string;
  master: string;
  id: string;
}

interface StaffMember {
  id: string;
  name: string;
  role: string;
  imageUrl: string;
  fbLink: string;
  type: 'admin' | 'master';
}

interface NavItem {
  id: View;
  icon: string;
  label: string;
  path: string | null;
}

// --- Constants ---
const LOGO_URL = "https://drive.google.com/uc?id=1MB_0ruqc-afJLvaa0mstAZ28P7rjwKzE";
const HERO_IMG_URL = "https://photos.fife.usercontent.google.com/pw/AP1GczNyqCEStR-QplOlPircEIBnBnN115mwX2crg8pgvDjjqXpMVcvFwUNZ=w1131-h636-s-no-gm?authuser=2";

// --- Defaults ---
const DEFAULT_MODELS: BusModel[] = [
  { id: 'm1', name: 'KIWI 1JOG', imageUrl: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&q=80&w=800' },
  { id: 'm2', name: 'APPLE UNIV', imageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=800' },
  { id: 'm3', name: 'KIWI ABD', imageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=800' },
];

const DEFAULT_SKINS: Skin[] = [
  { 
    id: 's1', modelId: 'm1', title: 'Himalay Express', 
    author: 'Md Rashel Babu Sr.', route: 'Dhaka - Laksham', model: 'Kiwi 1JOG',
    imageUrl: 'https://placehold.co/600x400/1e293b/white?text=Himalay+Express', 
    captchaCode: 'OG1', paintUrl: '#', glassUrl: '#' 
  },
  { 
    id: 's2', modelId: 'm2', title: 'Bangla Star', 
    author: 'Sakil Islam', route: 'Pabna - Chattogram', model: 'Apple Univ',
    imageUrl: 'https://placehold.co/600x400/1e293b/white?text=Bangla+Star', 
    captchaCode: 'UNIV01', paintUrl: '#', glassUrl: '#' 
  },
];

const DEFAULT_STAFF: StaffMember[] = [
  { id: 'st1', name: 'Raju Ahmed', role: 'Admin, BSBDOMG', imageUrl: 'sdimg/RajuAhmed.jpg', fbLink: 'https://www.facebook.com/raju.refine', type: 'admin' },
  { id: 'st2', name: 'Sakil Islam', role: '3:30 PM (BST)', imageUrl: 'sdimg/SAKIL_ISLAM.jpg', fbLink: 'https://www.facebook.com/Sakilislam02', type: 'master' },
  { id: 'st3', name: 'Raiyan Nasim', role: '7:30 PM (BST)', imageUrl: 'sdimg/RaiyanB.jpg', fbLink: 'https://www.facebook.com/raiyan.nasim.2024', type: 'master' },
  { id: 'st4', name: 'Imroz Ahmad Rafi', role: '9:15 PM (BST)', imageUrl: 'sdimg/Imroz.jpg', fbLink: 'https://www.facebook.com/imroz.rafi.9/', type: 'master' },
  { id: 'st5', name: 'Hasibul Hasan Fuad', role: '10:30 PM (BST)', imageUrl: 'sdimg/DespicableFuad.jpg', fbLink: 'https://www.facebook.com/hasibulhasan.fuad/', type: 'master' },
  { id: 'st6', name: 'Rahat Sahrif', role: '10:30 PM (BST)', imageUrl: 'sdimg/RAHAT.jpg', fbLink: 'https://www.facebook.com/rahat.khan.939269', type: 'master' },
  { id: 'st7', name: 'Badhon Hossain', role: '12:00 AM (BST)', imageUrl: 'sdimg/Badhon117.jpg', fbLink: 'https://www.facebook.com/badhon.hossain.258225/', type: 'master' },
  { id: 'st8', name: 'Raju Ahmed', role: '01:15 AM (BST)', imageUrl: 'sdimg/RajuAhmed.jpg', fbLink: 'https://www.facebook.com/raju.refine', type: 'master' },
];

const DEFAULT_LEADERBOARD: LeaderboardEntry[] = [
  { rank: '1', name: 'Kazi Shovo Ahmed Mahin', id: 'Shovo449', trips: 24 },
  { rank: '2', name: 'RidoyDn', id: 'RidoyDn', trips: 23 },
  { rank: '3', name: 'Abdullah Al Mayaz', id: 'Mayazz', trips: 17 },
  { rank: '4', name: 'Md Farabi', id: 'Farabi132', trips: 16 },
  { rank: '5', name: 'Nazmul Shohag', id: 'Busloverofsavar', trips: 15 },
  { rank: '6', name: 'Nayim Opu', id: 'OPUzz', trips: 13 },
  { rank: '7', name: 'SH Shamim', id: 'proSHAMIM', trips: 11 },
  { rank: '8', name: 'Rafin Hasan', id: 'FancyRafin', trips: 10 },
  { rank: '9', name: 'Hridoy H S', id: 'Hridoy', trips: 9 },
  { rank: '10', name: 'Saif Uddin Al Hossain', id: 'SAiF', trips: 9 },
];

const DEFAULT_MASTER_LEADERBOARD: LeaderboardEntry[] = [
  { rank: '1', name: 'Raiyan Nasim', id: 'RaiyanB', trips: 'N/A' },
  { rank: '2', name: 'Hasibul Hasan Fuad', id: 'DespicableFuad', trips: 'N/A' },
  { rank: '3', name: 'Badhon Hossain', id: 'Badhon117', trips: 'N/A' },
  { rank: '4', name: 'Sakil Islam', id: 'SAKIL_ISLAM', trips: 'N/A' },
  { rank: '5', name: 'Raju Ahmed', id: 'RajuAhmed', trips: 'N/A' },
  { rank: '6', name: 'Imroz Ahmed Rafi', id: 'Imroz', trips: 'N/A' },
  { rank: '7', name: 'RAHAT', id: 'RAHAT', trips: 'N/A' },
];

const DEFAULT_TRIPS: TripSchedule[] = [
  { time: '03:30 PM', master: 'Sakil Islam', id: 'BSB_TRIP_A1' },
  { time: '07:30 PM', master: 'Raiyan Nasim', id: 'BSB_TRIP_B2' },
  { time: '09:15 PM', master: 'Imroz Ahmad Rafi', id: 'BSB_TRIP_C3' },
  { time: '10:30 PM', master: 'Fuad Hasan', id: 'BSB_TRIP_D4' },
  { time: '12:00 AM', master: 'Badhon Hossain', id: 'BSB_TRIP_E5' },
  { time: '01:15 AM', master: 'Raju Ahmed', id: 'BSB_TRIP_F6' },
];

const NAV_ITEMS: NavItem[] = [
  { id: 'home', icon: 'fa-home', label: 'Home', path: null },
  { id: 'about', icon: 'fa-info-circle', label: 'About Us', path: null }, 
  { id: 'skins', icon: 'fa-images', label: 'Bus Skins', path: null }, 
  { id: 'leaderboard', icon: 'fa-trophy', label: 'Leaderboard', path: null }, 
  { id: 'trip', icon: 'fa-clock', label: 'Trip & Rules', path: null }, 
  { id: 'tournament', icon: 'fa-gamepad', label: 'Tournament', path: null }, 
];

const LoadingIndicator: React.FC = () => (
  <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
    <span className="loader mb-4"></span>
    <p className="text-[#ff6100] font-bold tracking-widest uppercase text-xs">Synchronizing Data...</p>
  </div>
);

const App: React.FC = () => {
  const [view, setView] = useState<View>('home');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState<BusModel | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [visitorCount, setVisitorCount] = useState(309);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');

  // --- Dynamic State ---
  const [marqueeText, setMarqueeText] = useState(localStorage.getItem('bsbd_marquee') || 'এই ওয়েবসাইটের কোনো লেখা, ছবি কিংবা স্কিন বিনা অনুমতিতে ব্যবহার করা নিষেধ। #BSBDOMG Official Group');
  const [busModels, setBusModels] = useState<BusModel[]>(() => JSON.parse(localStorage.getItem('bsbd_models') || JSON.stringify(DEFAULT_MODELS)));
  const [skins, setSkins] = useState<Skin[]>(() => JSON.parse(localStorage.getItem('bsbd_skins') || JSON.stringify(DEFAULT_SKINS)));
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>(() => JSON.parse(localStorage.getItem('bsbd_leaderboard') || JSON.stringify(DEFAULT_LEADERBOARD)));
  const [masterLeaderboard, setMasterLeaderboard] = useState<LeaderboardEntry[]>(() => JSON.parse(localStorage.getItem('bsbd_master_leaderboard') || JSON.stringify(DEFAULT_MASTER_LEADERBOARD)));
  const [trips, setTrips] = useState<TripSchedule[]>(() => JSON.parse(localStorage.getItem('bsbd_trips') || JSON.stringify(DEFAULT_TRIPS)));
  const [staff, setStaff] = useState<StaffMember[]>(() => JSON.parse(localStorage.getItem('bsbd_staff') || JSON.stringify(DEFAULT_STAFF)));
  const [historyText, setHistoryText] = useState(localStorage.getItem('bsbd_history') || "This group was created by BSBD OFFICIALS in 2021. At that time, no one was like playing multiplayer except 6-7 members. Then the group name was ‘BSBD Multiplay'. After becoming the moderator of the BSBD Official Facebook group, Raju Ahmed changed the name of the messenger group to the “Bus Simulator Bangladesh Official Multiplayer Group.\" With the help of Raju Ahmed (Admin) and the trip masters, the group gradually started to grow up.");

  // --- Persistence ---
  useEffect(() => {
    localStorage.setItem('bsbd_marquee', marqueeText);
    localStorage.setItem('bsbd_models', JSON.stringify(busModels));
    localStorage.setItem('bsbd_skins', JSON.stringify(skins));
    localStorage.setItem('bsbd_leaderboard', JSON.stringify(leaderboard));
    localStorage.setItem('bsbd_master_leaderboard', JSON.stringify(masterLeaderboard));
    localStorage.setItem('bsbd_trips', JSON.stringify(trips));
    localStorage.setItem('bsbd_staff', JSON.stringify(staff));
    localStorage.setItem('bsbd_history', historyText);
  }, [marqueeText, busModels, skins, leaderboard, masterLeaderboard, trips, staff, historyText]);

  // --- Visitor Count Logic ---
  useEffect(() => {
    const storedTotal = parseInt(localStorage.getItem('bsbd_visitor_total') || '309');
    const sessionCounted = sessionStorage.getItem('bsbd_session_counted');
    
    if (!sessionCounted) {
      const newTotal = storedTotal + 1;
      localStorage.setItem('bsbd_visitor_total', newTotal.toString());
      sessionStorage.setItem('bsbd_session_counted', 'true');
      setVisitorCount(newTotal);
    } else {
      setVisitorCount(storedTotal);
    }
  }, []);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === 'admin123') {
      setIsLoggedIn(true);
      setShowLogin(false);
      setView('admin');
      setPasswordInput('');
    } else {
      alert("Invalid Password!");
    }
  };

  const handleNavClick = (item: Partial<NavItem>) => {
    setIsLoading(true);
    setShowLogin(false);
    setSidebarOpen(false);
    setSelectedModel(null);
    
    // Simulate content loading
    setTimeout(() => {
      setView((item.id as View) || 'home');
      setIsLoading(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 300);
  };

  const renderContent = () => {
    if (isLoading) return <LoadingIndicator />;
    if (showLogin) return <AdminLogin password={passwordInput} setPassword={setPasswordInput} onSubmit={handleLoginSubmit} onCancel={() => setShowLogin(false)} />;

    switch(view) {
      case 'skins': 
        return selectedModel ? (
          <SkinGalleryView model={selectedModel} skins={skins} onBack={() => setSelectedModel(null)} />
        ) : (
          <BusModelSelection models={busModels} onSelect={setSelectedModel} />
        );
      case 'leaderboard': return <LeaderboardSection data={leaderboard} masterData={masterLeaderboard} />;
      case 'trip': return <TripRulesSection schedules={trips} />;
      case 'tournament': return <TournamentSection />;
      case 'about': return <AboutUsSection history={historyText} staff={staff} />;
      case 'admin': 
        return isLoggedIn ? (
          <AdminDashboard 
            busModels={busModels} setBusModels={setBusModels}
            skins={skins} setSkins={setSkins}
            leaderboard={leaderboard} setLeaderboard={setLeaderboard}
            masterLeaderboard={masterLeaderboard} setMasterLeaderboard={setMasterLeaderboard}
            trips={trips} setTrips={setTrips}
            staff={staff} setStaff={setStaff}
            history={historyText} setHistory={setHistoryText}
            marquee={marqueeText} setMarquee={setMarqueeText}
            onLogout={() => { setIsLoggedIn(false); setView('home'); }}
          />
        ) : (
          <div className="text-center py-20 flex flex-col items-center justify-center animate-slide-up">
            <i className="fas fa-user-lock text-5xl text-red-500/50 mb-4"></i>
            <h2 className="text-2xl font-bold text-red-400">Access Denied</h2>
            <button onClick={() => setShowLogin(true)} className="mt-4 px-8 py-3 bg-[#ff6100] rounded-xl font-bold shadow-lg shadow-[#ff6100]/20 hover:scale-105 hover:bg-[#ff7a2b] transition-all active:scale-95">Login Required</button>
          </div>
        );
      default: return <HomeSection onNavigate={handleNavClick} />;
    }
  };

  return (
    <div className="min-h-screen relative bg-[#000000] text-white overflow-x-hidden flex flex-col selection:bg-[#ff6100] selection:text-white">
      <div className="fixed inset-0 z-[-1] opacity-10 bg-[url('https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80')] bg-cover bg-center grayscale pointer-events-none"></div>
      
      {/* Sidebar (Mobile) / Navbar (Desktop) */}
      <nav className={`fixed inset-y-0 left-0 w-72 lg:w-full lg:h-20 lg:inset-y-auto lg:top-0 bg-black/90 backdrop-blur-2xl border-r lg:border-r-0 lg:border-b border-white/5 z-[120] transform transition-transform duration-500 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 shadow-2xl`}>
        <div className="p-8 lg:p-0 lg:px-12 h-full flex flex-col lg:flex-row justify-between lg:items-center overflow-y-auto lg:overflow-visible">
          <div className="flex flex-col lg:flex-row lg:items-center gap-10 lg:gap-14">
            <div className="flex items-center gap-4 py-6 lg:py-0 cursor-pointer transition-transform hover:scale-105 active:scale-95" onClick={() => handleNavClick({ id: 'home' })}>
              <img src={LOGO_URL} alt="BSBDOMG Logo" className="w-12 h-12 lg:w-14 lg:h-14 rounded-full object-cover border-2 border-[#ff6100]/20" onError={(e) => (e.currentTarget.src = 'https://placehold.co/100x100?text=BSBD')}/>
              <div className="flex flex-col">
                <h1 className="text-xl lg:text-2xl font-black tracking-tighter leading-none">BSBD<span className="text-[#ff6100]">OMG</span></h1>
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">Group Portal</span>
              </div>
            </div>
            
            <ul className="flex flex-col lg:flex-row gap-2">
              {NAV_ITEMS.map(item => (
                <li key={item.id}>
                  <button 
                    onClick={() => handleNavClick(item)}
                    className={`w-full lg:w-auto flex items-center gap-4 lg:gap-2 px-4 py-3.5 lg:px-5 lg:py-2.5 rounded-2xl transition-all duration-300 transform ${ (view === item.id) && !showLogin ? 'bg-[#ff6100] text-white shadow-xl shadow-[#ff6100]/20 scale-105' : 'text-gray-400 hover:bg-white/5 hover:text-white hover:scale-105 active:scale-95'}`}
                  >
                    <i className={`fas ${item.icon} text-sm transition-transform group-hover:rotate-12`}></i>
                    <span className="font-semibold text-sm whitespace-nowrap">{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="mt-8 lg:mt-0">
            <button 
              onClick={() => {
                if(isLoggedIn) setView('admin');
                else setShowLogin(true);
                setSidebarOpen(false);
              }}
              className={`w-full lg:w-auto flex items-center gap-4 px-6 py-3.5 lg:py-3 rounded-2xl transition-all duration-300 border transform ${view === 'admin' || showLogin ? 'bg-[#ff6100] border-[#ff7a2b] text-white shadow-xl scale-105' : 'border-white/5 text-gray-500 hover:text-[#ff6100] hover:border-[#ff6100]/30 hover:bg-[#ff6100]/5 hover:scale-105 active:scale-95'}`}
            >
              <i className="fas fa-user-shield text-sm"></i>
              <span className="font-semibold text-sm whitespace-nowrap">Admin Control</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Marquee - Placed below Navbar on Desktop */}
      <div className="fixed top-0 lg:top-20 w-full z-[110] bg-black/95 backdrop-blur-xl py-2 border-b border-white/5">
        <div className="animate-marquee text-[#ff6100] font-bengali text-sm px-4">
          <i className="fas fa-bullhorn mr-2"></i> {marqueeText}
        </div>
      </div>

      {/* Main Layout */}
      <main className="lg:ml-0 flex-grow flex flex-col min-h-screen">
        <div className="lg:hidden fixed top-14 left-6 z-[130]">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-3.5 bg-[#ff6100] text-white rounded-full shadow-2xl transition-all active:scale-90 hover:bg-[#ff7a2b]">
            <i className={`fas ${sidebarOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </button>
        </div>
        
        {/* Adjusted padding top for Desktop (Navbar 80px + Marquee 40px) */}
        <div className="flex-grow pt-28 lg:pt-40 pb-12 px-6 lg:px-12 max-w-7xl mx-auto w-full">
          <div className="min-h-[60vh]">
            {renderContent()}
          </div>
        </div>

        <Footer visitorCount={visitorCount} />
      </main>
    </div>
  );
};

// --- View: Bus Model Selection ---
const BusModelSelection: React.FC<{ models: BusModel[], onSelect: (m: BusModel) => void }> = ({ models, onSelect }) => {
  const [search, setSearch] = useState('');
  const filtered = models.filter(m => m.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-12 animate-slide-up">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
        <div className="space-y-2">
          <h2 className="text-5xl font-black uppercase tracking-tighter">Bus Models</h2>
          <p className="text-gray-500 font-medium">Select a model to browse available skins</p>
        </div>
        <div className="relative group w-full lg:w-96">
          <i className="fas fa-search absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#ff6100] transition-colors"></i>
          <input 
            type="text" placeholder="Search models..." 
            className="w-full pl-16 pr-8 py-5 glass rounded-3xl focus:outline-none focus:ring-2 focus:ring-[#ff6100] transition-all text-sm font-medium"
            value={search} onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((model, idx) => (
          <div 
            key={model.id} 
            onClick={() => onSelect(model)}
            style={{ animationDelay: `${idx * 100}ms` }}
            className="group cursor-pointer relative glass rounded-[3rem] overflow-hidden border border-white/5 transition-all duration-500 hover:scale-[1.03] hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#ff6100]/10 animate-slide-up"
          >
            <div className="h-64 overflow-hidden relative">
              <img src={model.imageUrl} alt={model.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8 flex justify-between items-center translate-y-2 group-hover:translate-y-0 transition-transform">
                <h3 className="text-2xl font-black uppercase tracking-tighter">{model.name}</h3>
                <div className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-[#ff6100] transform translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all">
                  <i className="fas fa-chevron-right"></i>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- View: Skin Gallery for Model ---
const SkinGalleryView: React.FC<{ model: BusModel, skins: Skin[], onBack: () => void }> = ({ model, skins, onBack }) => {
  const [search, setSearch] = useState('');
  const filtered = skins.filter(s => s.modelId === model.id && s.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-12 animate-fade-in">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
        <div className="space-y-4">
          <button onClick={onBack} className="flex items-center gap-2 text-[#ff6100] text-xs font-black uppercase tracking-widest hover:gap-3 transition-all active:scale-95 group">
            <i className="fas fa-arrow-left transition-transform group-hover:-translate-x-1"></i> Back to Models
          </button>
          <div className="space-y-1">
            <h2 className="text-5xl font-black uppercase tracking-tighter">{model.name} <span className="text-[#ff6100]">Skins</span></h2>
            <p className="text-gray-500 font-medium">Browse high-quality liveries for this model</p>
          </div>
        </div>
        <div className="relative group w-full lg:w-96">
          <i className="fas fa-search absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#ff6100] transition-colors"></i>
          <input 
            type="text" placeholder={`Search ${model.name} skins...`} 
            className="w-full pl-16 pr-8 py-5 glass rounded-3xl focus:outline-none focus:ring-2 focus:ring-[#ff6100] transition-all text-sm font-medium"
            value={search} onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
          {filtered.map((skin, idx) => <SkinCard key={skin.id} skin={skin} delay={idx * 100} />)}
        </div>
      ) : (
        <div className="py-32 text-center glass rounded-[3rem] border border-white/5 border-dashed animate-scale-in">
          <i className="fas fa-images text-4xl text-gray-600 mb-4 block"></i>
          <p className="text-gray-500 font-bold">No skins available for this model yet</p>
        </div>
      )}
    </div>
  );
};

const SkinCard: React.FC<{ skin: Skin, delay: number }> = ({ skin, delay }) => {
  const [verified, setVerified] = useState(false);
  const [input, setInput] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  const handleVerify = () => {
    if (input === skin.captchaCode) {
      setIsAnimating(true);
      setTimeout(() => {
        setVerified(true);
        setIsAnimating(false);
      }, 400);
    } else {
      alert('Incorrect Authentication Code!');
    }
  };

  return (
    <div style={{ animationDelay: `${delay}ms` }} className="glass rounded-[3rem] overflow-hidden group hover:shadow-2xl transition-all duration-700 border border-white/5 animate-slide-up">
      <div className="h-64 overflow-hidden relative">
        <img src={skin.imageUrl} alt={skin.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
        <div className="absolute top-6 left-6 bg-[#ff6100] text-white px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl transform group-hover:scale-110 transition-transform">{skin.model}</div>
      </div>
      <div className="p-10 space-y-6">
        <div className="space-y-2">
          <h3 className="text-2xl font-bold transition-colors group-hover:text-[#ff6100]">{skin.title}</h3>
          <div className="space-y-1">
            <p className="text-sm text-gray-500 flex items-center gap-2">
              <i className="fas fa-map-marker-alt text-[#ff6100]/50 w-4"></i> {skin.route}
            </p>
            <p className="text-sm text-gray-500 flex items-center gap-2">
              <i className="fas fa-palette text-[#ff6100]/50 w-4"></i> Author: <span className="text-[#ff6100]">{skin.author}</span>
            </p>
          </div>
        </div>
        
        {!verified ? (
          <div className={`space-y-4 pt-4 border-t border-white/5 transition-opacity duration-300 ${isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Authentication</span>
              <span className="text-[#ff6100] bg-[#ff6100]/10 px-3 py-1 rounded-lg text-[10px] font-bold">Hint: {skin.captchaCode}</span>
            </div>
            <div className="flex gap-3">
              <input 
                type="text" placeholder="Access Code" 
                className="flex-grow bg-white/5 border border-white/10 rounded-2xl px-6 py-3 text-sm focus:outline-none focus:border-[#ff6100]/50 transition-colors uppercase font-mono" 
                value={input} onChange={(e) => setInput(e.target.value.toUpperCase())} 
              />
              <button 
                onClick={handleVerify} 
                className="px-6 py-3 bg-[#ff6100] text-white rounded-2xl text-sm font-bold shadow-lg shadow-[#ff6100]/20 hover:scale-105 active:scale-95 transition-all hover:bg-[#ff7a2b]"
              >
                Verify
              </button>
            </div>
          </div>
        ) : (
          <div className="flex gap-3 pt-4 border-t border-white/5 animate-scale-in">
            <a 
              href={skin.paintUrl} 
              download={`${skin.title}_paint.png`} 
              className="flex-grow py-4 bg-[#ff6100] rounded-2xl font-bold text-sm text-center transition-all shadow-lg shadow-[#ff6100]/20 hover:scale-105 hover:bg-[#ff7a2b]"
            >
              Paint
            </a>
            <a 
              href={skin.glassUrl} 
              download={`${skin.title}_glass.png`} 
              className="flex-grow py-4 glass border-white/10 hover:bg-[#ff6100]/10 hover:border-[#ff6100]/30 rounded-2xl font-bold text-sm text-center transition-all"
            >
              Glass
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

// --- Footer Component ---
const Footer: React.FC<{ visitorCount: number }> = ({ visitorCount }) => (
  <footer className="mt-auto px-6 lg:px-12 pb-12 pt-16 w-full max-w-7xl mx-auto animate-fade-in">
    <div className="glass rounded-[2.5rem] p-10 lg:p-14 border border-white/5 relative overflow-hidden group">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#ff6100]/50 to-transparent transition-opacity group-hover:opacity-100"></div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <img src={LOGO_URL} alt="BSBDOMG Logo" className="w-10 h-10 rounded-full object-cover border border-[#ff6100]/20" />
            <h3 className="text-2xl font-black italic tracking-tighter transition-transform group-hover:scale-105 origin-left">BSBD<span className="text-[#ff6100]">OMG</span></h3>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            The heart of the Bus Simulator Bangladesh community. Providing quality resources, organized trips, and a professional multiplayer environment since 2021.
          </p>
        </div>

        <div className="space-y-6">
          <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Connect</h4>
          <div className="flex gap-4">
            {[
              { icon: 'fa-facebook-f', color: 'hover:bg-blue-600', link: 'https://www.facebook.com/groups/bsbdgame' },
              { icon: 'fa-discord', color: 'hover:bg-indigo-600', link: 'https://discord.gg/yQSMsnB3U3' },
              { icon: 'fa-youtube', color: 'hover:bg-red-600', link: 'https://www.youtube.com/@bussimulatorbangladesh-bsbd' },
              { icon: 'fa-google-play', color: 'hover:bg-[#ff6100]', link: 'https://play.google.com' }
            ].map((social, i) => (
              <a 
                key={i} href={social.link} target="_blank" rel="noreferrer"
                className={`w-12 h-12 glass rounded-2xl flex items-center justify-center text-[#ff6100] transition-all duration-300 hover:text-white hover:-translate-y-2 ${social.color}`}
              >
                <i className={`fab ${social.icon} text-lg`}></i>
              </a>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Status</h4>
          <div className="space-y-4">
            <div className="flex items-center gap-3 glass bg-white/5 px-4 py-3 rounded-2xl border-white/5 group-hover:border-[#ff6100]/20">
              <div className="w-2 h-2 rounded-full bg-[#ff6100] animate-pulse"></div>
              <span className="text-xs font-semibold text-gray-300">Live Viewers: {visitorCount.toLocaleString()}</span>
            </div>
            <p className="text-[10px] text-gray-600 uppercase tracking-widest pl-2">© 2025 BSBDOMG Official • All Rights Reserved</p>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

// --- Admin Dashboard & Login ---

interface AdminProps {
  busModels: BusModel[]; setBusModels: (m: BusModel[]) => void;
  skins: Skin[]; setSkins: (s: Skin[]) => void;
  leaderboard: LeaderboardEntry[]; setLeaderboard: (l: LeaderboardEntry[]) => void;
  masterLeaderboard: LeaderboardEntry[]; setMasterLeaderboard: (l: LeaderboardEntry[]) => void;
  trips: TripSchedule[]; setTrips: (t: TripSchedule[]) => void;
  staff: StaffMember[]; setStaff: (s: StaffMember[]) => void;
  history: string; setHistory: (h: string) => void;
  marquee: string; setMarquee: (m: string) => void;
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminProps> = ({ busModels, setBusModels, skins, setSkins, leaderboard, setLeaderboard, masterLeaderboard, setMasterLeaderboard, trips, setTrips, staff, setStaff, history, setHistory, marquee, setMarquee, onLogout }) => {
  const [activeTab, setActiveTab] = useState<'models' | 'skins' | 'leaderboard' | 'trips' | 'staff' | 'about'>('models');
  
  // States for new entries
  const [newModel, setNewModel] = useState<BusModel>({ id: '', name: '', imageUrl: '' });
  const [editingModelId, setEditingModelId] = useState<string | null>(null);
  const [editModelData, setEditModelData] = useState<BusModel | null>(null);

  const [newSkin, setNewSkin] = useState<Skin>({ 
    id: '', modelId: '', title: '', author: '', route: '', model: '', 
    imageUrl: '', captchaCode: '', paintUrl: '', glassUrl: '' 
  });
  const [editingSkinId, setEditingSkinId] = useState<string | null>(null);
  const [editSkinData, setEditSkinData] = useState<Skin | null>(null);

  const [newStaff, setNewStaff] = useState<StaffMember>({ id: '', name: '', role: '', imageUrl: '', fbLink: '', type: 'master' });
  const [editingStaffId, setEditingStaffId] = useState<string | null>(null);
  const [editStaffData, setEditStaffData] = useState<StaffMember | null>(null);

  // Helper for image upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, callback: (base64: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        callback(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addModel = () => {
    if(!newModel.name) return;
    setBusModels([...busModels, { ...newModel, id: 'm' + Date.now() }]);
    setNewModel({ id: '', name: '', imageUrl: '' });
  };

  const startEditingModel = (model: BusModel) => {
    setEditingModelId(model.id);
    setEditModelData({ ...model });
  };

  const saveModelEdit = () => {
    if (!editModelData) return;
    setBusModels(busModels.map(m => m.id === editingModelId ? editModelData : m));
    setEditingModelId(null);
    setEditModelData(null);
  };

  const addSkin = () => {
    if(!newSkin.title || !newSkin.modelId) return;
    setSkins([...skins, { ...newSkin, id: 's' + Date.now() }]);
    setNewSkin({ 
      id: '', modelId: '', title: '', author: '', route: '', model: '', 
      imageUrl: '', captchaCode: '', paintUrl: '', glassUrl: '' 
    });
  };

  const startEditingSkin = (skin: Skin) => {
    setEditingSkinId(skin.id);
    setEditSkinData({ ...skin });
  };

  const saveSkinEdit = () => {
    if (!editSkinData || !editingSkinId) return;
    setSkins(skins.map(s => s.id === editingSkinId ? editSkinData : s));
    setEditingSkinId(null);
    setEditSkinData(null);
  };

  const addStaff = () => {
    if(!newStaff.name) return;
    setStaff([...staff, { ...newStaff, id: 'st' + Date.now() }]);
    setNewStaff({ id: '', name: '', role: '', imageUrl: '', fbLink: '', type: 'master' });
  };

  const startEditingStaff = (member: StaffMember) => {
    setEditingStaffId(member.id);
    setEditStaffData({ ...member });
  };

  const saveStaffEdit = () => {
    if (!editStaffData || !editingStaffId) return;
    setStaff(staff.map(s => s.id === editingStaffId ? editStaffData : s));
    setEditingStaffId(null);
    setEditStaffData(null);
  };

  return (
    <div className="space-y-10 animate-slide-up pb-20">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-white/10 pb-10">
        <div>
          <h2 className="text-4xl font-black text-[#ff6100] uppercase tracking-tighter italic">Control Panel</h2>
          <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mt-1">Authorized Management Access</p>
        </div>
        <button onClick={onLogout} className="px-8 py-3 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl active:scale-95">End Session</button>
      </div>

      <div className="flex flex-wrap gap-3">
        {['models', 'skins', 'leaderboard', 'trips', 'staff', 'about'].map(tab => (
          <button 
            key={tab} onClick={() => setActiveTab(tab as any)}
            className={`px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all transform ${activeTab === tab ? 'bg-[#ff6100] text-white shadow-xl shadow-[#ff6100]/20 scale-105' : 'glass text-gray-400 hover:bg-white/5 hover:scale-105'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="glass p-10 lg:p-14 rounded-[3.5rem] border border-white/10 min-h-[600px] shadow-2xl transition-all duration-500">
        {activeTab === 'models' && (
          <div className="space-y-12 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8 glass border-white/5 rounded-[2.5rem]">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 ml-4">Model Name</label>
                <input className="w-full glass bg-white/5 p-4 rounded-2xl focus:ring-2 focus:ring-[#ff6100] outline-none transition-all" placeholder="e.g. KIWI RJ2S" value={newModel.name} onChange={e => setNewModel({...newModel, name: e.target.value})} />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 ml-4">Upload Local Image</label>
                <div className="relative">
                  <input 
                    type="file" 
                    id="add-model-image" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={(e) => handleFileUpload(e, (base64) => setNewModel({ ...newModel, imageUrl: base64 }))} 
                  />
                  <label 
                    htmlFor="add-model-image" 
                    className="w-full glass bg-white/5 p-4 rounded-2xl border border-dashed border-white/20 flex items-center justify-between cursor-pointer hover:border-[#ff6100]/50 transition-all"
                  >
                    <span className="text-sm text-gray-400 font-medium">
                      {newModel.imageUrl ? 'Image Selected' : 'Choose file...'}
                    </span>
                    <i className="fas fa-cloud-upload-alt text-[#ff6100]"></i>
                  </label>
                  {newModel.imageUrl && (
                    <div className="absolute top-1/2 right-12 -translate-y-1/2 flex items-center gap-2">
                      <img src={newModel.imageUrl} className="w-10 h-10 object-cover rounded-lg border border-white/10" alt="Preview" />
                    </div>
                  )}
                </div>
              </div>
              <button onClick={addModel} className="md:col-span-2 bg-[#ff6100] py-4 rounded-2xl font-bold uppercase tracking-widest text-sm shadow-xl hover:bg-[#ff7a2b] active:scale-95 transition-all">Add Model</button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {busModels.map(m => (
                <div key={m.id} className="flex flex-col p-6 glass border-white/5 rounded-3xl group transition-all">
                  {editingModelId === m.id ? (
                    <div className="space-y-4 animate-fade-in">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Model Name</label>
                        <input className="w-full glass bg-white/10 p-3 rounded-xl focus:ring-1 focus:ring-[#ff6100] outline-none transition-all text-sm" value={editModelData?.name} onChange={e => setEditModelData({ ...editModelData!, name: e.target.value })} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Update Image</label>
                        <div className="flex gap-4 items-center">
                          <img src={editModelData?.imageUrl} className="w-12 h-12 rounded-xl object-cover border border-white/10" alt="Edit Preview" />
                          <input 
                            type="file" 
                            accept="image/*" 
                            className="flex-grow glass bg-white/10 p-2 rounded-xl text-[10px] focus:outline-none" 
                            onChange={(e) => handleFileUpload(e, (base64) => setEditModelData({ ...editModelData!, imageUrl: base64 }))} 
                          />
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={saveModelEdit} className="flex-grow py-3 bg-[#ff6100] rounded-xl font-bold text-xs uppercase tracking-widest">Save</button>
                        <button onClick={() => setEditingModelId(null)} className="flex-grow py-3 glass rounded-xl font-bold text-xs uppercase tracking-widest">Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <img src={m.imageUrl} className="w-12 h-12 rounded-xl object-cover transition-transform group-hover:rotate-6" onError={(e) => (e.currentTarget.src = 'https://placehold.co/100x100?text=Bus')} />
                        <p className="font-bold">{m.name}</p>
                      </div>
                      <div className="flex gap-4">
                        <button onClick={() => startEditingModel(m)} className="text-gray-500 hover:text-[#ff6100] transition-all transform hover:scale-125"><i className="fas fa-edit"></i></button>
                        <button onClick={() => setBusModels(busModels.filter(x => x.id !== m.id))} className="text-red-500/50 hover:text-red-500 transition-all transform hover:scale-125"><i className="fas fa-trash"></i></button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'skins' && (
          <div className="space-y-12 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-8 glass border-white/5 rounded-[2.5rem]">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 ml-4">Model</label>
                <select className="w-full glass bg-white/5 p-4 rounded-2xl focus:ring-2 focus:ring-[#ff6100] outline-none transition-all appearance-none" value={newSkin.modelId} onChange={e => {
                  const m = busModels.find(x => x.id === e.target.value);
                  setNewSkin({...newSkin, modelId: e.target.value, model: m?.name || ''});
                }}>
                  <option value="">Select Model...</option>
                  {busModels.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 ml-4">Skin Title</label>
                <input className="w-full glass bg-white/5 p-4 rounded-2xl focus:ring-2 focus:ring-[#ff6100] outline-none transition-all" placeholder="e.g. Green Line" value={newSkin.title} onChange={e => setNewSkin({...newSkin, title: e.target.value})} />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 ml-4">Author</label>
                <input className="w-full glass bg-white/5 p-4 rounded-2xl focus:ring-2 focus:ring-[#ff6100] outline-none transition-all" placeholder="e.g. Admin" value={newSkin.author} onChange={e => setNewSkin({...newSkin, author: e.target.value})} />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 ml-4">Route</label>
                <input className="w-full glass bg-white/5 p-4 rounded-2xl focus:ring-2 focus:ring-[#ff6100] outline-none transition-all" placeholder="e.g. Dhaka-Sylhet" value={newSkin.route} onChange={e => setNewSkin({...newSkin, route: e.target.value})} />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 ml-4">Unlock Code</label>
                <input className="w-full glass bg-white/5 p-4 rounded-2xl focus:ring-2 focus:ring-[#ff6100] outline-none transition-all" placeholder="e.g. GL01" value={newSkin.captchaCode} onChange={e => setNewSkin({...newSkin, captchaCode: e.target.value.toUpperCase()})} />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 ml-4">Preview Image Upload</label>
                <div className="relative">
                  <input type="file" id="add-skin-preview" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, (base64) => setNewSkin({ ...newSkin, imageUrl: base64 }))} />
                  <label htmlFor="add-skin-preview" className="w-full glass bg-white/5 p-4 rounded-2xl border border-dashed border-white/20 flex items-center justify-between cursor-pointer hover:border-[#ff6100]/50 transition-all">
                    <span className="text-sm text-gray-400">{newSkin.imageUrl ? 'Preview Ready' : 'Select Preview Image...'}</span>
                    <i className="fas fa-image text-[#ff6100]"></i>
                  </label>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 ml-4">Paint File Upload</label>
                <div className="relative">
                  <input type="file" id="add-skin-paint" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, (base64) => setNewSkin({ ...newSkin, paintUrl: base64 }))} />
                  <label htmlFor="add-skin-paint" className="w-full glass bg-white/5 p-4 rounded-2xl border border-dashed border-white/20 flex items-center justify-between cursor-pointer hover:border-[#ff6100]/50 transition-all">
                    <span className="text-sm text-gray-400">{newSkin.paintUrl && newSkin.paintUrl !== '#' ? 'Paint Ready' : 'Select Paint File...'}</span>
                    <i className="fas fa-palette text-[#ff6100]"></i>
                  </label>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 ml-4">Glass File Upload</label>
                <div className="relative">
                  <input type="file" id="add-skin-glass" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, (base64) => setNewSkin({ ...newSkin, glassUrl: base64 }))} />
                  <label htmlFor="add-skin-glass" className="w-full glass bg-white/5 p-4 rounded-2xl border border-dashed border-white/20 flex items-center justify-between cursor-pointer hover:border-[#ff6100]/50 transition-all">
                    <span className="text-sm text-gray-400">{newSkin.glassUrl && newSkin.glassUrl !== '#' ? 'Glass Ready' : 'Select Glass File...'}</span>
                    <i className="fas fa-window-maximize text-[#ff6100]"></i>
                  </label>
                </div>
              </div>
              <button onClick={addSkin} className="lg:col-span-3 bg-[#ff6100] py-4 rounded-2xl font-bold uppercase tracking-widest text-sm shadow-xl mt-4 hover:bg-[#ff7a2b] active:scale-95 transition-all">Publish Skin</button>
            </div>
            
            <div className="grid gap-6">
              {skins.map(s => (
                <div key={s.id} className="flex flex-col p-6 glass border-white/5 rounded-[2.5rem] group hover:bg-white/5 transition-all">
                  {editingSkinId === s.id ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
                       <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Skin Title</label>
                        <input className="w-full glass bg-white/10 p-3 rounded-xl text-sm outline-none focus:ring-1 focus:ring-[#ff6100]" value={editSkinData?.title} onChange={e => setEditSkinData({...editSkinData!, title: e.target.value})} />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Author</label>
                        <input className="w-full glass bg-white/10 p-3 rounded-xl text-sm outline-none focus:ring-1 focus:ring-[#ff6100]" value={editSkinData?.author} onChange={e => setEditSkinData({...editSkinData!, author: e.target.value})} />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Route</label>
                        <input className="w-full glass bg-white/10 p-3 rounded-xl text-sm outline-none focus:ring-1 focus:ring-[#ff6100]" value={editSkinData?.route} onChange={e => setEditSkinData({...editSkinData!, route: e.target.value})} />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Unlock Code</label>
                        <input className="w-full glass bg-white/10 p-3 rounded-xl text-sm outline-none focus:ring-1 focus:ring-[#ff6100]" value={editSkinData?.captchaCode} onChange={e => setEditSkinData({...editSkinData!, captchaCode: e.target.value.toUpperCase()})} />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Update Preview</label>
                        <input type="file" className="w-full glass bg-white/10 p-2 rounded-xl text-[10px]" onChange={e => handleFileUpload(e, (base64) => setEditSkinData({...editSkinData!, imageUrl: base64}))} />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Update Paint</label>
                        <input type="file" className="w-full glass bg-white/10 p-2 rounded-xl text-[10px]" onChange={e => handleFileUpload(e, (base64) => setEditSkinData({...editSkinData!, paintUrl: base64}))} />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Update Glass</label>
                        <input type="file" className="w-full glass bg-white/10 p-2 rounded-xl text-[10px]" onChange={e => handleFileUpload(e, (base64) => setEditSkinData({...editSkinData!, glassUrl: base64}))} />
                      </div>
                      <div className="lg:col-span-3 flex gap-3 mt-4">
                        <button onClick={saveSkinEdit} className="flex-grow py-3 bg-[#ff6100] rounded-xl font-bold text-xs uppercase tracking-widest">Save Changes</button>
                        <button onClick={() => setEditingSkinId(null)} className="flex-grow py-3 glass rounded-xl font-bold text-xs uppercase tracking-widest">Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-6">
                        <img src={s.imageUrl} className="w-20 h-14 object-cover rounded-xl group-hover:scale-110 transition-transform" onError={(e) => (e.currentTarget.src = 'https://placehold.co/100x60?text=Skin')} />
                        <div>
                          <p className="font-bold text-lg group-hover:text-[#ff6100] transition-colors">{s.title}</p>
                          <p className="text-xs text-gray-500">{busModels.find(m => m.id === s.modelId)?.name || 'Unknown'} • {s.route}</p>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <button onClick={() => startEditingSkin(s)} className="text-gray-500 hover:text-[#ff6100] transition-all transform hover:scale-125"><i className="fas fa-edit"></i></button>
                        <button onClick={() => setSkins(skins.filter(x => x.id !== s.id))} className="text-red-500/30 hover:text-red-500 transition-all hover:scale-125"><i className="fas fa-trash-alt"></i></button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'leaderboard' && (
          <div className="space-y-16 animate-fade-in">
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold">Driver Ranking</h3>
                <button 
                  onClick={() => setLeaderboard([...leaderboard, { rank: '?', name: 'New Driver', id: 'D'+Date.now(), trips: 0 }])} 
                  className="px-6 py-2 bg-[#ff6100] rounded-xl font-bold text-xs uppercase tracking-widest shadow-lg shadow-[#ff6100]/20 hover:scale-105 hover:bg-[#ff7a2b] active:scale-95 transition-all"
                >
                  Add Driver
                </button>
              </div>
              <div className="glass rounded-[2rem] overflow-hidden border border-white/5">
                <table className="w-full text-left">
                  <thead className="bg-white/5"><tr><th className="p-6 text-[10px] font-black uppercase text-gray-500">Rank</th><th className="p-6 text-[10px] font-black uppercase text-gray-500">Member</th><th className="p-6 text-center text-[10px] font-black uppercase text-gray-500">Trips</th><th className="p-6"></th></tr></thead>
                  <tbody className="divide-y divide-white/5">
                    {leaderboard.map(p => (
                      <tr key={p.id} className="hover:bg-white/5 transition-colors">
                        <td className="p-6"><input className="bg-transparent font-black w-16 focus:text-[#ff6100] outline-none transition-colors" value={p.rank} onChange={e => setLeaderboard(leaderboard.map(x => x.id === p.id ? {...x, rank: e.target.value} : x))} /></td>
                        <td className="p-6"><input className="bg-transparent block font-bold text-lg focus:text-[#ff6100] outline-none w-full transition-colors" value={p.name} onChange={e => setLeaderboard(leaderboard.map(x => x.id === p.id ? {...x, name: e.target.value} : x))} /><span className="text-[10px] text-gray-600 font-mono">{p.id}</span></td>
                        <td className="p-6 text-center"><input className="glass bg-white/5 w-24 p-3 text-center rounded-xl font-bold focus:ring-1 focus:ring-[#ff6100] outline-none transition-all" value={p.trips} onChange={e => setLeaderboard(leaderboard.map(x => x.id === p.id ? {...x, trips: e.target.value} : x))} /></td>
                        <td className="p-6"><button onClick={() => setLeaderboard(leaderboard.filter(x => x.id !== p.id))} className="text-red-500/30 hover:text-red-500 transition-all hover:scale-125"><i className="fas fa-times-circle"></i></button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="space-y-8 pt-8 border-t border-white/10">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold">Trip Masters Ranking</h3>
                <button 
                  onClick={() => setMasterLeaderboard([...masterLeaderboard, { rank: '?', name: 'New Master', id: 'M'+Date.now(), trips: 'N/A' }])} 
                  className="px-6 py-2 bg-[#ff6100] rounded-xl font-bold text-xs uppercase tracking-widest shadow-lg shadow-[#ff6100]/20 hover:scale-105 hover:bg-[#ff7a2b] active:scale-95 transition-all"
                >
                  Add Master
                </button>
              </div>
              <div className="glass rounded-[2rem] overflow-hidden border border-white/5">
                <table className="w-full text-left">
                  <thead className="bg-white/5"><tr><th className="p-6 text-[10px] font-black uppercase text-gray-500">Rank</th><th className="p-6 text-[10px] font-black uppercase text-gray-500">Member</th><th className="p-6 text-center text-[10px] font-black uppercase text-gray-500">Trips</th><th className="p-6"></th></tr></thead>
                  <tbody className="divide-y divide-white/5">
                    {masterLeaderboard.map(p => (
                      <tr key={p.id} className="hover:bg-white/5 transition-colors">
                        <td className="p-6"><input className="bg-transparent font-black w-16 focus:text-[#ff6100] outline-none transition-colors" value={p.rank} onChange={e => setMasterLeaderboard(masterLeaderboard.map(x => x.id === p.id ? {...x, rank: e.target.value} : x))} /></td>
                        <td className="p-6"><input className="bg-transparent block font-bold text-lg focus:text-[#ff6100] outline-none w-full transition-colors" value={p.name} onChange={e => setMasterLeaderboard(masterLeaderboard.map(x => x.id === p.id ? {...x, name: e.target.value} : x))} /><span className="text-[10px] text-gray-600 font-mono">{p.id}</span></td>
                        <td className="p-6 text-center"><input className="glass bg-white/5 w-24 p-3 text-center rounded-xl font-bold focus:ring-1 focus:ring-[#ff6100] outline-none transition-all" value={p.trips} onChange={e => setMasterLeaderboard(masterLeaderboard.map(x => x.id === p.id ? {...x, trips: e.target.value} : x))} /></td>
                        <td className="p-6"><button onClick={() => setMasterLeaderboard(masterLeaderboard.filter(x => x.id !== p.id))} className="text-red-500/30 hover:text-red-500 transition-all hover:scale-125"><i className="fas fa-times-circle"></i></button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'trips' && (
          <div className="space-y-8 animate-fade-in">
             <div className="flex items-center justify-between"><h3 className="text-2xl font-bold">Operational Timing</h3><button onClick={() => setTrips([...trips, { time: '00:00 AM', master: 'New Master', id: 'NEW' }])} className="px-6 py-2 bg-[#ff6100] rounded-xl font-bold text-xs uppercase tracking-widest shadow-lg shadow-[#ff6100]/20 hover:scale-105 hover:bg-[#ff7a2b] active:scale-95 transition-all">Add Trip</button></div>
             <div className="grid gap-6">
               {trips.map((t, idx) => (
                 <div key={idx} className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8 glass border-white/5 rounded-[2.5rem] relative group hover:border-[#ff6100]/20 transition-all">
                   <div className="space-y-2"><label className="text-[10px] font-black uppercase text-gray-600 ml-2">Time</label><input className="w-full glass bg-white/5 p-4 rounded-2xl text-lg font-black focus:ring-1 focus:ring-[#ff6100] outline-none transition-all" value={t.time} onChange={e => setTrips(trips.map((x, i) => i === idx ? {...x, time: e.target.value} : x))} /></div>
                   <div className="space-y-2"><label className="text-[10px] font-black uppercase text-gray-600 ml-2">Master</label><input className="w-full glass bg-white/5 p-4 rounded-2xl text-sm font-bold focus:ring-1 focus:ring-[#ff6100] outline-none transition-all" value={t.master} onChange={e => setTrips(trips.map((x, i) => i === idx ? {...x, master: e.target.value} : x))} /></div>
                   <div className="space-y-2"><label className="text-[10px] font-black uppercase text-gray-600 ml-2">Identifier</label><div className="flex gap-4"><input className="flex-grow glass bg-white/5 p-4 rounded-2xl text-xs font-mono focus:ring-1 focus:ring-[#ff6100] outline-none transition-all" value={t.id} onChange={e => setTrips(trips.map((x, i) => i === idx ? {...x, id: e.target.value} : x))} /><button onClick={() => setTrips(trips.filter((_, i) => i !== idx))} className="w-14 h-14 rounded-2xl bg-red-500/10 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all transform hover:scale-105 active:scale-95"><i className="fas fa-trash"></i></button></div></div>
                 </div>
               ))}
             </div>
          </div>
        )}

        {activeTab === 'staff' && (
          <div className="space-y-12 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-8 glass border-white/5 rounded-[2.5rem]">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 ml-4">Full Name</label>
                <input className="w-full glass bg-white/5 p-4 rounded-2xl focus:ring-2 focus:ring-[#ff6100] outline-none transition-all" placeholder="Raju Ahmed" value={newStaff.name} onChange={e => setNewStaff({...newStaff, name: e.target.value})} />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 ml-4">Role/Time</label>
                <input className="w-full glass bg-white/5 p-4 rounded-2xl focus:ring-2 focus:ring-[#ff6100] outline-none transition-all" placeholder="Admin / 3:30 PM" value={newStaff.role} onChange={e => setNewStaff({...newStaff, role: e.target.value})} />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 ml-4">Type</label>
                <select className="w-full glass bg-white/5 p-4 rounded-2xl focus:ring-2 focus:ring-[#ff6100] outline-none transition-all appearance-none" value={newStaff.type} onChange={e => setNewStaff({...newStaff, type: e.target.value as any})}>
                  <option value="admin">Admin</option>
                  <option value="master">Trip Master</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 ml-4">Upload Photo</label>
                <div className="relative">
                  <input 
                    type="file" 
                    id="add-staff-image" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={(e) => handleFileUpload(e, (base64) => setNewStaff({ ...newStaff, imageUrl: base64 }))} 
                  />
                  <label 
                    htmlFor="add-staff-image" 
                    className="w-full glass bg-white/5 p-4 rounded-2xl border border-dashed border-white/20 flex items-center justify-between cursor-pointer hover:border-[#ff6100]/50 transition-all"
                  >
                    <span className="text-sm text-gray-400 font-medium">
                      {newStaff.imageUrl ? 'Photo Selected' : 'Choose file...'}
                    </span>
                    <i className="fas fa-user-plus text-[#ff6100]"></i>
                  </label>
                  {newStaff.imageUrl && (
                    <div className="absolute top-1/2 right-12 -translate-y-1/2 flex items-center gap-2">
                      <img src={newStaff.imageUrl} className="w-10 h-10 object-cover rounded-lg border border-white/10" alt="Preview" />
                    </div>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 ml-4">FB Profile Link</label>
                <input className="w-full glass bg-white/5 p-4 rounded-2xl focus:ring-2 focus:ring-[#ff6100] outline-none transition-all" placeholder="https://facebook.com/..." value={newStaff.fbLink} onChange={e => setNewStaff({...newStaff, fbLink: e.target.value})} />
              </div>
              <button onClick={addStaff} className="lg:col-span-3 bg-[#ff6100] py-4 rounded-2xl font-bold uppercase tracking-widest text-sm shadow-xl mt-4 hover:bg-[#ff7a2b] active:scale-95 transition-all">Add Staff Member</button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {staff.map(s => (
                <div key={s.id} className="flex flex-col p-6 glass border-white/5 rounded-3xl group hover:bg-white/5 transition-all hover:scale-[1.02]">
                  {editingStaffId === s.id ? (
                    <div className="space-y-4 animate-fade-in">
                      <input className="w-full glass bg-white/10 p-2 rounded-xl text-sm outline-none focus:ring-1 focus:ring-[#ff6100]" value={editStaffData?.name} onChange={e => setEditStaffData({...editStaffData!, name: e.target.value})} placeholder="Name" />
                      <input className="w-full glass bg-white/10 p-2 rounded-xl text-sm outline-none focus:ring-1 focus:ring-[#ff6100]" value={editStaffData?.role} onChange={e => setEditStaffData({...editStaffData!, role: e.target.value})} placeholder="Role" />
                      <select className="w-full glass bg-white/10 p-2 rounded-xl text-sm outline-none focus:ring-1 focus:ring-[#ff6100]" value={editStaffData?.type} onChange={e => setEditStaffData({...editStaffData!, type: e.target.value as any})}>
                        <option value="admin">Admin</option>
                        <option value="master">Trip Master</option>
                      </select>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Photo Upload</label>
                        <div className="flex gap-4 items-center">
                          <img src={editStaffData?.imageUrl} className="w-12 h-12 rounded-xl object-cover border border-white/10" alt="Preview" />
                          <input 
                            type="file" 
                            accept="image/*" 
                            className="flex-grow glass bg-white/10 p-1.5 rounded-xl text-[10px] focus:outline-none" 
                            onChange={(e) => handleFileUpload(e, (base64) => setEditStaffData({ ...editStaffData!, imageUrl: base64 }))} 
                          />
                        </div>
                      </div>
                      <input className="w-full glass bg-white/10 p-2 rounded-xl text-sm outline-none focus:ring-1 focus:ring-[#ff6100]" value={editStaffData?.fbLink} onChange={e => setEditStaffData({...editStaffData!, fbLink: e.target.value})} placeholder="FB Link" />
                      <div className="flex gap-2">
                        <button onClick={saveStaffEdit} className="flex-grow py-2 bg-[#ff6100] rounded-xl font-bold text-xs uppercase">Save</button>
                        <button onClick={() => setEditingStaffId(null)} className="flex-grow py-2 glass rounded-xl font-bold text-xs uppercase">Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <img src={s.imageUrl} className="w-12 h-12 rounded-full object-cover group-hover:rotate-6 transition-transform" onError={(e) => (e.currentTarget.src = 'https://placehold.co/100x100?text=Profile')} />
                        <div>
                          <p className="font-bold text-sm group-hover:text-[#ff6100] transition-colors">{s.name}</p>
                          <p className="text-[10px] text-gray-500 uppercase">{s.type}</p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <button onClick={() => startEditingStaff(s)} className="text-gray-500 hover:text-blue-500 transition-all transform hover:scale-125"><i className="fas fa-edit"></i></button>
                        <button onClick={() => setStaff(staff.filter(x => x.id !== s.id))} className="text-red-500/30 hover:text-red-500 transition-all hover:scale-125"><i className="fas fa-trash-alt"></i></button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'about' && (
          <div className="space-y-10 max-w-4xl animate-fade-in">
            <div className="space-y-4">
               <h3 className="text-2xl font-bold">Marquee Announcement</h3>
               <input className="w-full glass bg-white/5 border-white/10 rounded-2xl p-4 focus:ring-2 focus:ring-[#ff6100] outline-none transition-all" value={marquee} onChange={(e) => setMarquee(e.target.value)} />
            </div>
            <div className="space-y-4">
               <h3 className="text-2xl font-bold">Historical Narrative</h3>
               <textarea className="w-full h-80 glass bg-white/5 border-white/10 rounded-[2.5rem] p-10 focus:outline-none focus:ring-2 focus:ring-orange-500 text-lg leading-relaxed text-gray-300 font-light transition-all" value={history} onChange={(e) => setHistory(e.target.value)} placeholder="Compose the community story..." />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const AdminLogin: React.FC<{ password: string, setPassword: (s: string) => void, onSubmit: (e: React.FormEvent) => void, onCancel: () => void }> = ({ password, setPassword, onSubmit, onCancel }) => (
  <div className="max-w-md mx-auto py-12 animate-scale-in">
    <div className="glass p-10 rounded-[3rem] border border-orange-500/20 shadow-2xl space-y-8 hover:shadow-orange-500/5">
      <div className="text-center">
        <div className="w-20 h-20 bg-orange-500/10 rounded-full flex items-center justify-center mx-auto mb-6 transition-transform hover:rotate-12"><i className="fas fa-fingerprint text-3xl text-orange-500"></i></div>
        <h2 className="text-2xl font-bold mb-1">Authorization</h2>
        <p className="text-gray-500 text-xs uppercase tracking-widest">Access code required</p>
      </div>
      <form onSubmit={onSubmit} className="space-y-5">
        <input type="password" placeholder="••••••••" className="w-full glass bg-white/5 border-white/10 p-5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 text-center text-2xl tracking-[0.5em] transition-all" value={password} onChange={(e) => setPassword(e.target.value)} autoFocus />
        <div className="grid grid-cols-2 gap-4">
          <button type="button" onClick={onCancel} className="py-4 glass hover:bg-white/5 hover:border-white/20 rounded-2xl font-bold text-sm transition-all active:scale-95">Cancel</button>
          <button type="submit" className="py-4 bg-[#ff6100] hover:bg-[#ff7a2b] rounded-2xl font-bold text-sm shadow-xl shadow-[#ff6100]/20 transition-all active:scale-95">Verify</button>
        </div>
      </form>
    </div>
  </div>
);

// --- Sections ---

const HomeSection: React.FC<{ onNavigate: (item: Partial<NavItem>) => void }> = ({ onNavigate }) => (
  <div className="space-y-24 animate-slide-up">
    <div className="flex flex-col items-center text-center space-y-8 pt-8">
      <span className="px-5 py-2 glass rounded-full text-[#ff6100] text-xs font-bold uppercase tracking-[0.3em] border-[#ff6100]/20 animate-fade-in">official multiplayer group</span>
      <h1 className="text-6xl lg:text-[8rem] font-black leading-[0.9] tracking-tighter uppercase transition-transform hover:scale-105 cursor-default">BSBD<span className="text-[#ff6100]">OMG</span></h1>
      <p className="max-w-3xl mx-auto text-gray-400 text-lg lg:text-xl leading-relaxed font-light">Experience the next level of Bus Simulator Bangladesh. Join a professional network of players, explore premium content, and dominate the leaderboard.</p>
      <div className="flex flex-wrap gap-5 pt-4 justify-center">
        <button onClick={() => onNavigate({ id: 'skins' })} className="px-12 py-5 bg-[#ff6100] hover:bg-[#ff7a2b] rounded-2xl font-bold shadow-2xl shadow-[#ff6100]/30 transition-all active:scale-95 text-lg">Browse Skins </button>
        <a href="https://forms.gle/K87fHr2StxKTN9P86" target="_blank" className="px-12 py-5 glass border-white/10 hover:bg-white/10 hover:border-white/30 rounded-2xl font-bold transition-all text-lg active:scale-95">Join Us</a>
      </div>
    </div>

    <div className="relative group overflow-hidden rounded-[3rem] lg:rounded-[4rem] border border-white/10 shadow-2xl animate-scale-in">
      <img
        src={HERO_IMG_URL}
        alt="BSBD Hero"
        className="w-full h-[400px] lg:h-[650px] object-cover group-hover:scale-110 transition-transform duration-1000"
        onError={(e) => {
          (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=2000";
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
      <div className="absolute bottom-12 left-12 right-12 flex flex-col md:flex-row md:items-end justify-between gap-6 translate-y-4 group-hover:translate-y-0 transition-transform">
        <div className="space-y-2">
          <p className="text-[#ff6100] font-black uppercase tracking-[0.4em] text-xs">Established 2021</p>
          <h2 className="text-4xl lg:text-5xl font-black uppercase italic tracking-tight">Join the Movement</h2>
          <p className="text-gray-300 max-w-lg text-sm lg:text-base">Experience high-fidelity bangladeshi bus simulation with the most active multiplayer group.</p>
        </div>
        <button onClick={() => onNavigate({ id: 'about' })} className="px-10 py-4 glass hover:bg-[#ff6100] hover:text-white rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl whitespace-nowrap active:scale-95">Learn Our History</button>
      </div>
    </div>
    
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
       {[
         { icon: 'fa-bus', label: '100+ Members', sub: 'Verified Drivers' },
         { icon: 'fa-clock', label: 'Daily Trips', sub: 'Punctual & Organized' },
         { icon: 'fa-medal', label: 'Monthly Stats', sub: 'Competitive Ranking' },
         { icon: 'fa-palette', label: 'Custom Skins', sub: 'Handcrafted Quality' },
       ].map((s, i) => (
         <div key={i} style={{ animationDelay: `${i * 100}ms` }} className="glass p-10 rounded-[2.5rem] border border-white/5 group hover:border-[#ff6100]/20 hover:-translate-y-2 transition-all animate-slide-up">
           <i className={`fas ${s.icon} text-3xl text-[#ff6100]/50 mb-6 group-hover:text-[#ff6100] group-hover:rotate-12 transition-all`}></i>
           <p className="font-bold text-xl mb-1">{s.label}</p>
           <p className="text-xs text-gray-500 uppercase tracking-widest">{s.sub}</p>
         </div>
       ))}
    </div>
  </div>
);

// --- Sections: Leaderboard ---

const PodiumCard: React.FC<{ entry: LeaderboardEntry, rank: number, isMain?: boolean }> = ({ entry, rank, isMain }) => (
  <div className={`relative bg-[#121212] rounded-[3rem] p-12 flex flex-col items-center text-center border transition-all duration-700 group animate-slide-up ${isMain ? 'border-[#ff6100] shadow-[0_0_60px_rgba(255,97,0,0.2)] z-20 md:-translate-y-12 scale-110 md:scale-125' : 'border-white/5 z-10 scale-100'}`}>
    {/* Rank Badge */}
    <div className={`absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 rounded-[1.5rem] flex items-center justify-center font-black text-3xl text-white shadow-2xl rotate-12 group-hover:rotate-0 transition-all duration-500 ${isMain ? 'bg-gradient-to-br from-yellow-400 to-[#ff6100] scale-125' : 'bg-gray-700'}`}>
      {rank}
    </div>

    {/* Trophy Icon for #1 */}
    {isMain && (
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 text-5xl text-yellow-400 animate-bounce drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]">
        <i className="fas fa-crown"></i>
      </div>
    )}

    <div className="mt-6 space-y-8 w-full">
      {/* Visual Avatar Placeholder */}
      <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center text-4xl font-black border-4 group-hover:scale-110 transition-transform ${isMain ? 'bg-[#ff6100]/10 border-[#ff6100] text-[#ff6100]' : 'bg-white/5 border-white/10 text-gray-500'}`}>
        {entry.name.charAt(0)}
      </div>

      <div className="space-y-2">
        <h3 className={`font-black tracking-tight leading-tight transition-colors group-hover:text-[#ff6100] ${isMain ? 'text-3xl lg:text-4xl' : 'text-xl lg:text-2xl'} line-clamp-1`}>
          {entry.name}
        </h3>
        <p className="text-[10px] text-gray-500 font-mono tracking-widest uppercase">UID: {entry.id}</p>
      </div>

      <div className={`border py-4 px-10 rounded-full inline-block transition-all duration-500 ${isMain ? 'bg-[#ff6100] border-[#ff7a2b] text-white shadow-xl shadow-[#ff6100]/30' : 'bg-black/60 border-white/5 text-[#ff6100]'}`}>
        <p className="font-black text-lg tracking-widest whitespace-nowrap">
          {entry.trips} <span className={`text-[10px] font-bold uppercase tracking-widest ml-1 ${isMain ? 'text-white/80' : 'text-gray-500'}`}>Total Trips</span>
        </p>
      </div>
    </div>
  </div>
);

const LeaderboardSection: React.FC<{ data: LeaderboardEntry[], masterData: LeaderboardEntry[] }> = ({ data, masterData }) => {
  const topThree = data.slice(0, 3);

  return (
    <div className="space-y-32 py-12 animate-fade-in">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-[#ff6100] font-black uppercase tracking-[0.3em] text-xs">Hall of Fame</span>
        <h2 className="text-6xl lg:text-7xl font-black uppercase tracking-tighter italic">Commanders List</h2>
        <p className="text-gray-400 text-lg font-medium">Recognition for our most dedicated road commanders who maintain excellence and punctuality.</p>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Top 3 Podium Cards */}
        <div className="flex flex-col md:flex-row items-center md:items-center justify-center gap-24 md:gap-12 px-4 mb-40 pt-20">
          {/* Rank 2 (Left) */}
          {topThree[1] && <div className="order-2 md:order-1"><PodiumCard entry={topThree[1]} rank={2} /></div>}
          {/* Rank 1 (Center) */}
          {topThree[0] && <div className="order-1 md:order-2"><PodiumCard entry={topThree[0]} rank={1} isMain /></div>}
          {/* Rank 3 (Right) */}
          {topThree[2] && <div className="order-3 md:order-3"><PodiumCard entry={topThree[2]} rank={3} /></div>}
        </div>

        {/* Global Rankings Table */}
        <div className="space-y-12">
          <div className="flex items-center gap-6 px-6">
            <div className="w-3 h-12 bg-gradient-to-b from-[#ff6100] to-orange-800 rounded-full shadow-[0_0_15px_rgba(255,97,0,0.3)]"></div>
            <div>
              <h3 className="text-4xl font-black uppercase tracking-tighter">Global Rankings</h3>
              <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-1">Full performance log database</p>
            </div>
          </div>
          <div className="glass rounded-[4rem] overflow-hidden border border-white/5 shadow-[0_30px_100px_rgba(0,0,0,0.5)] relative group">
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#ff6100]/40 to-transparent"></div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-white/5">
                  <tr>
                    <th className="px-12 py-10 text-[11px] font-black uppercase text-gray-500 tracking-[0.3em]">Rank</th>
                    <th className="px-12 py-10 text-[11px] font-black uppercase text-gray-500 tracking-[0.3em]">Driver Name</th>
                    <th className="px-12 py-10 text-[11px] font-black uppercase text-gray-500 tracking-[0.3em]">Official ID</th>
                    <th className="px-12 py-10 text-[11px] font-black uppercase text-gray-500 tracking-[0.3em] text-right">Trip Count</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {data.map((p, idx) => {
                    const rankNum = idx + 1;
                    const isTop = rankNum <= 3;
                    return (
                      <tr key={p.id} className="hover:bg-[#ff6100]/5 transition-all duration-300 group">
                        <td className={`px-12 py-10 font-black text-3xl ${isTop ? 'text-[#ff6100]' : 'text-[#ff6100]/30'}`}>#{rankNum}</td>
                        <td className="px-12 py-10">
                          <div className="flex items-center gap-4 group-hover:translate-x-2 transition-transform">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm border ${isTop ? 'bg-[#ff6100]/10 border-[#ff6100] text-[#ff6100]' : 'bg-white/5 border-white/10 text-gray-500'}`}>
                              {p.name.charAt(0)}
                            </div>
                            <span className="font-black text-2xl text-white">{p.name}</span>
                          </div>
                        </td>
                        <td className="px-12 py-10"><span className="text-xs text-gray-600 font-mono tracking-[0.2em] bg-black/40 px-3 py-1.5 rounded-lg border border-white/5">{p.id}</span></td>
                        <td className="px-12 py-10 text-right font-black text-4xl text-white group-hover:text-[#ff6100] transition-colors tabular-nums">{p.trips}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Trip Masters Ranking */}
        <div className="mt-40 space-y-12">
          <div className="flex items-center gap-6 px-6">
            <div className="w-3 h-12 bg-gradient-to-b from-emerald-500 to-emerald-900 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.3)]"></div>
            <div>
              <h3 className="text-4xl font-black uppercase tracking-tighter">Master Logs</h3>
              <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-1">Verified trip hosts status</p>
            </div>
          </div>
          <div className="glass rounded-[4rem] overflow-hidden border border-white/5 shadow-2xl transition-all hover:border-emerald-500/20">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-emerald-500/5">
                  <tr>
                    <th className="px-12 py-10 text-[11px] font-black uppercase text-emerald-500/50 tracking-[0.3em]">Identity</th>
                    <th className="px-12 py-10 text-[11px] font-black uppercase text-emerald-500/50 tracking-[0.3em]">Host Name</th>
                    <th className="px-12 py-10 text-[11px] font-black uppercase text-emerald-500/50 tracking-[0.3em] text-right">Verification</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {masterData.map((p, idx) => (
                    <tr key={p.id} className="hover:bg-emerald-500/5 transition-colors group">
                      <td className="px-12 py-10 font-black text-2xl text-emerald-500/30">#{idx + 1}</td>
                      <td className="px-12 py-10">
                        <div className="flex items-center gap-4">
                          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center font-black text-emerald-500 text-xs">
                            {p.name.charAt(0)}
                          </div>
                          <span className="font-black text-xl text-white group-hover:text-emerald-400 transition-colors">{p.name}</span>
                        </div>
                      </td>
                      <td className="px-12 py-10 text-right"><span className="bg-emerald-500/10 border border-emerald-500/20 px-6 py-3 rounded-2xl text-[11px] font-black text-emerald-400 uppercase tracking-[0.2em]">Authorized Host</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TripRulesSection: React.FC<{ schedules: TripSchedule[] }> = ({ schedules }) => (
  <div className="space-y-20 animate-fade-in">
    <div className="text-center space-y-4">
      <h1 className="text-3xl lg:text-4xl font-black font-bengali text-white uppercase tracking-tighter hover:scale-105 transition-transform">বাস সিমুলেটর বাংলাদেশ</h1>
      <p className="text-[#ff6100] font-bengali text-xl lg:text-2xl animate-pulse">অফিসিয়াল মাল্টিপ্লেয়ার ট্রিপ রুলস ও সময়সূচী</p>
      <div className="w-24 h-1.5 bg-[#ff6100] mx-auto rounded-full mt-4"></div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {schedules.map((t, idx) => (
        <div key={t.id} style={{ animationDelay: `${idx * 100}ms` }} className="relative bg-[#121212] p-8 lg:p-10 rounded-[2.5rem] border border-white/5 hover:border-[#ff6100] transition-all duration-500 group overflow-hidden animate-slide-up shadow-2xl">
          <div className="absolute top-1/2 -right-4 -translate-y-1/2 text-[180px] text-white/[0.03] pointer-events-none transition-transform group-hover:scale-110 group-hover:text-white/[0.05]">
            <i className="fas fa-bus"></i>
          </div>
          <div className="relative z-10 space-y-8">
            <div className="space-y-2">
              <p className="text-4xl lg:text-5xl font-black text-[#ff6100] tracking-tight">{t.time}</p>
              <div className="w-full h-[1px] bg-white/10 mt-4"></div>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-black uppercase text-gray-500 tracking-[0.2em]">Trip Master / Host</p>
              <p className="text-2xl lg:text-3xl font-black text-white italic transition-colors group-hover:text-[#ff6100]">{t.master}</p>
            </div>
            <div className="bg-black/40 p-6 rounded-3xl border border-white/[0.03] space-y-2 group-hover:bg-black/60 transition-colors">
              <p className="text-[9px] font-black uppercase text-gray-600 tracking-[0.2em]">Game ID / Passphrase</p>
              <p className="text-lg font-black font-mono text-[#ff6100] tracking-widest uppercase">{t.id}</p>
            </div>
          </div>
        </div>
      ))}
    </div>

    <div className="max-w-5xl mx-auto space-y-10">
      <div className="inline-flex items-center gap-4 bg-[#ff6100]/10 px-8 py-4 rounded-3xl border border-[#ff6100]/20 hover:scale-105 transition-transform">
        <i className="fas fa-shield-alt text-[#ff6100] text-2xl"></i>
        <h2 className="text-3xl font-black font-bengali text-[#ff6100]">ট্রিপ চলাকালীন রুলস</h2>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {[
          "ট্রিপ মাস্টারের কথামতো চলতে হবে। ট্রিপ মাস্টার কি বলে সেদিকে লক্ষ্য রাখতে হবে।",
          "দুর্ঘটনা এড়াতে ওভারটেক কিংবা লেন চেঞ্জ করার সময় ইন্ডিকেটর লাইট ব্যবহার ও লুকিং গ্লাস দেখে করতে হবে।",
          "অফিসিয়াল ট্রিপ এবং স্পেশাল ট্রিপে বাধ্যতামূলক বাস স্কিন সেট করে ট্রিপে জয়েন করতে হবে।",
          "ট্রিপের মধ্যে জরুরি কারণ ছাড়া অতিরিক্ত মেসেজ করা যাবে না।",
          "ট্রিপের মধ্যে বিনা কারণে/অযথা হর্ণ দিবেন না। ট্রিপের মধ্যে চাপাচাপি সম্পূর্ণ নিষিদ্ধ।",
          "ট্রিপের ভিডিও করার সময় ট্রিপ মাস্টারের নির্দেশনা মেনে চলবেন।",
          "অফিসিয়াল ট্রিপের আগে থেকে ট্রিপ শেষ না হওয়া পর্যন্ত ট্রিপ মাস্টার ব্যতীত অন্য কেউ হোস্ট করতে পারবেন না।"
        ].map((rule, idx) => (
          <div key={idx} style={{ animationDelay: `${idx * 100}ms` }} className="glass p-6 rounded-2xl border-l-4 border-[#ff6100] flex items-start gap-6 group hover:bg-[#ff6100]/5 transition-all animate-slide-up">
            <span className="w-10 h-10 shrink-0 bg-[#ff6100]/10 rounded-xl flex items-center justify-center font-bold text-[#ff6100] group-hover:bg-[#ff6100] group-hover:text-white transition-all">{idx + 1}</span>
            <p className="font-bengali text-lg lg:text-xl text-gray-300 leading-relaxed py-1 transition-colors group-hover:text-white">{rule}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const TournamentSection: React.FC = () => (
  <div className="space-y-12 animate-fade-in text-center py-12">
    <h2 className="text-5xl font-black uppercase tracking-tighter hover:scale-105 transition-transform">Tournaments</h2>
    <div className="glass p-24 rounded-[4rem] border border-white/5 relative overflow-hidden group hover:border-[#ff6100]/30 transition-all shadow-2xl">
      <div className="absolute inset-0 bg-[#ff6100]/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <i className="fas fa-rocket text-7xl text-[#ff6100]/50 animate-bounce mb-10 block"></i>
      <h3 className="text-4xl font-black mb-4 group-hover:text-[#ff6100] transition-colors">Season 3 Incoming</h3>
      <p className="text-gray-500 max-w-lg mx-auto text-lg">The ultimate competitive journey is currently under preparation.</p>
    </div>
  </div>
);

const AboutUsSection: React.FC<{ history: string, staff: StaffMember[] }> = ({ history, staff }) => (
  <div className="space-y-20 animate-fade-in">
    <div className="text-center space-y-4">
      <h2 className="text-5xl font-black uppercase tracking-tighter hover:scale-105 transition-transform">About Us</h2>
      <div className="w-24 h-2 bg-[#ff6100] mx-auto rounded-full animate-pulse"></div>
    </div>
    <div className="glass p-12 lg:p-20 rounded-[4rem] border border-white/5 shadow-2xl relative overflow-hidden group hover:border-[#ff6100]/20 transition-all animate-slide-up">
      <h3 className="text-4xl font-black text-white flex items-center gap-4 mb-10 italic">
        <i className="fas fa-history text-[#ff6100] group-hover:rotate-12 transition-transform"></i> Our History
      </h3>
      <p className="text-xl text-gray-400 leading-relaxed font-light whitespace-pre-line group-hover:text-gray-300 transition-colors">{history}</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {staff.map((member, idx) => (
        <div key={member.id} style={{ animationDelay: `${idx * 100}ms` }} className="glass p-10 rounded-[3rem] border border-white/5 flex flex-col items-center text-center group hover:border-[#ff6100]/30 hover:-translate-y-2 transition-all duration-500 shadow-xl animate-slide-up">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#ff6100]/20 group-hover:border-[#ff6100] transition-all duration-500 shadow-2xl mb-6">
            <img src={member.imageUrl} className="w-full h-full object-cover transition-transform group-hover:scale-110" onError={(e) => (e.currentTarget.src = 'https://placehold.co/200x200?text=Profile')} />
          </div>
          <h4 className="text-xl font-bold mb-1 group-hover:text-[#ff6100] transition-colors">{member.name}</h4>
          <p className="text-sm text-gray-500 font-medium uppercase tracking-widest">{member.role}</p>
          <a href={member.fbLink} target="_blank" rel="noreferrer" className="mt-4 w-10 h-10 glass rounded-xl flex items-center justify-center text-blue-400 hover:bg-blue-600 hover:text-white transition-all"><i className="fab fa-facebook-f"></i></a>
        </div>
      ))}
    </div>
  </div>
);

export default App;
