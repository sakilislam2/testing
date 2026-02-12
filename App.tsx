
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
  chassis: string;
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

// --- Defaults ---
const DEFAULT_MODELS: BusModel[] = [
  { id: 'm1', name: 'KIWI 1JOG', imageUrl: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&q=80&w=800' },
  { id: 'm2', name: 'APPLE UNIV', imageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=800' },
  { id: 'm3', name: 'KIWI ABD', imageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=800' },
];

const DEFAULT_SKINS: Skin[] = [
  { 
    id: 's1', modelId: 'm1', title: 'Himalay Express', 
    author: 'Md Rashel Babu Sr.', route: 'Dhaka - Laksham', chassis: 'Kiwi 1JOG',
    imageUrl: 'https://placehold.co/600x400/1e293b/white?text=Himalay+Express', 
    captchaCode: 'OG1', paintUrl: '#', glassUrl: '#' 
  },
  { 
    id: 's2', modelId: 'm2', title: 'Bangla Star', 
    author: 'Sakil Islam', route: 'Pabna - Chattogram', chassis: 'Apple Univ',
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
  { rank: '🥇 1', name: 'Kazi Shovo Ahmed Mahin', id: 'Shovo449', trips: 24 },
  { rank: '🥈 2', name: 'RidoyDn', id: 'RidoyDn', trips: 23 },
  { rank: '🥉 3', name: 'Abdullah Al Mayaz', id: 'Mayazz', trips: 17 },
  { rank: '4', name: 'Md Farabi', id: 'Farabi132', trips: 16 },
  { rank: '5', name: 'Nazmul Shohag', id: 'Busloverofsavar', trips: 15 },
  { rank: '6', name: 'Nayim Opu', id: 'OPUzz', trips: 13 },
  { rank: '7', name: 'SH Shamim', id: 'proSHAMIM', trips: 11 },
  { rank: '8', name: 'Rafin Hasan', id: 'FancyRafin', trips: 10 },
  { rank: '9', name: 'Hridoy H S', id: 'Hridoy', trips: 9 },
  { rank: '10', name: 'Saif Uddin Al Hossain', id: 'SAiF', trips: 9 },
];

const DEFAULT_MASTER_LEADERBOARD: LeaderboardEntry[] = [
  { rank: '🥇 1', name: 'Raiyan Nasim', id: 'RaiyanB', trips: 'N/A' },
  { rank: '🥈 2', name: 'Hasibul Hasan Fuad', id: 'DespicableFuad', trips: 'N/A' },
  { rank: '🥉 3', name: 'Badhon Hossain', id: 'Badhon117', trips: 'N/A' },
  { rank: '4', name: 'Sakil Islam', id: 'SAKIL_ISLAM', trips: 'N/A' },
  { rank: '5', name: 'Raju Ahmed', id: 'RajuAhmed', trips: 'N/A' },
  { rank: '6', name: 'Imroz Ahmed Rafi', id: 'Imroz', trips: 'N/A' },
  { rank: '7', name: 'RAHAT', id: 'RAHAT', trips: 'N/A' },
];

const DEFAULT_TRIPS: TripSchedule[] = [
  { time: '03:30 PM', master: 'শাকিল', id: 'SAKIL_ISLAM' },
  { time: '07:30 PM', master: 'রাইয়ান', id: 'RaiyanB' },
  { time: '09:15 PM', master: 'ইমরোজ', id: 'IMROZ' },
  { time: '10:30 PM', master: 'ফুয়াদ', id: 'DespicableFuad' },
  { time: '12:00 AM', master: 'বাধন', id: 'Badhon117' },
  { time: '01:15 AM', master: 'রাজু', id: 'RajuAhmed' },
];

const NAV_ITEMS: NavItem[] = [
  { id: 'home', icon: 'fa-home', label: 'Home', path: null },
  { id: 'about', icon: 'fa-info-circle', label: 'About Us', path: null }, 
  { id: 'skins', icon: 'fa-images', label: 'Bus Skins', path: null }, 
  { id: 'leaderboard', icon: 'fa-trophy', label: 'Leaderboard', path: null }, 
  { id: 'trip', icon: 'fa-clock', label: 'Trip & Rules', path: null }, 
  { id: 'tournament', icon: 'fa-gamepad', label: 'Tournament', path: null }, 
];

const App: React.FC = () => {
  const [view, setView] = useState<View>('home');
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
    setShowLogin(false);
    setSidebarOpen(false);
    setSelectedModel(null);
    setView((item.id as View) || 'home');
  };

  const renderContent = () => {
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
          <div className="text-center py-20 flex flex-col items-center justify-center">
            <i className="fas fa-user-lock text-5xl text-red-500/50 mb-4"></i>
            <h2 className="text-2xl font-bold text-red-400">Access Denied</h2>
            <button onClick={() => setShowLogin(true)} className="mt-4 px-8 py-3 bg-emerald-500 rounded-xl font-bold shadow-lg shadow-emerald-500/20 hover:scale-105 transition-all">Login Required</button>
          </div>
        );
      default: return <HomeSection onNavigate={handleNavClick} />;
    }
  };

  return (
    <div className="min-h-screen relative bg-[#0f172a] text-white overflow-x-hidden flex flex-col selection:bg-emerald-500 selection:text-white">
      <div className="fixed inset-0 z-[-1] opacity-20 bg-[url('https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80')] bg-cover bg-center grayscale"></div>
      
      {/* Marquee */}
      <div className="fixed top-0 w-full z-[110] bg-black/80 backdrop-blur-xl py-2 border-b border-white/10">
        <div className="animate-marquee text-emerald-400 font-bengali text-sm px-4">
          <i className="fas fa-bullhorn mr-2"></i> {marqueeText}
        </div>
      </div>

      {/* Sidebar */}
      <nav className={`fixed inset-y-0 left-0 w-72 bg-[#0a0f1d] border-r border-white/5 z-[120] transform transition-transform duration-500 ease-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 shadow-2xl`}>
        <div className="p-8 h-full flex flex-col justify-between overflow-y-auto">
          <div className="space-y-8">
            <div className="flex flex-col items-center gap-2 py-6 border-b border-white/5 cursor-pointer" onClick={() => handleNavClick({ id: 'home' })}>
              <h1 className="text-3xl font-black tracking-tighter">BSBD<span className="text-emerald-500">OMG</span></h1>
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest text-center">Official Multiplayer Group</span>
            </div>
            
            <ul className="space-y-1">
              {NAV_ITEMS.map(item => (
                <li key={item.id}>
                  <button 
                    onClick={() => handleNavClick(item)}
                    className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 ${ (view === item.id) && !showLogin ? 'bg-emerald-500 text-white shadow-xl shadow-emerald-500/20' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
                  >
                    <i className={`fas ${item.icon} w-5 text-center`}></i>
                    <span className="font-semibold text-sm">{item.label}</span>
                  </button>
                </li>
              ))}
              <li>
                <a 
                  href="https://m.me/Sakilislam02" target="_blank" rel="noreferrer"
                  className="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 text-gray-400 hover:bg-blue-500/10 hover:text-blue-400"
                >
                  <i className="fas fa-envelope w-5 text-center"></i>
                  <span className="font-semibold text-sm">Need Help?</span>
                </a>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <button 
              onClick={() => {
                if(isLoggedIn) setView('admin');
                else setShowLogin(true);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 border ${view === 'admin' || showLogin ? 'bg-orange-500 border-orange-400 text-white shadow-xl' : 'border-white/5 text-gray-500 hover:text-orange-400 hover:border-orange-500/30 hover:bg-orange-500/5'}`}
            >
              <i className="fas fa-user-shield w-5 text-center"></i>
              <span className="font-semibold text-sm">Admin Control</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Layout */}
      <main className="lg:ml-72 flex-grow flex flex-col min-h-screen">
        <div className="lg:hidden fixed top-12 left-6 z-[130]">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-3.5 bg-emerald-500 text-white rounded-full shadow-2xl transition-transform active:scale-90">
            <i className={`fas ${sidebarOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </button>
        </div>
        
        <div className="flex-grow pt-28 pb-12 px-6 lg:px-12 max-w-7xl mx-auto w-full">
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
    <div className="space-y-12 animate-in fade-in duration-700">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
        <div className="space-y-2">
          <h2 className="text-5xl font-black uppercase tracking-tighter">Bus Models</h2>
          <p className="text-gray-500 font-medium">Select a chassis to browse available skins</p>
        </div>
        <div className="relative group w-full lg:w-96">
          <i className="fas fa-search absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-emerald-500 transition-colors"></i>
          <input 
            type="text" placeholder="Search models..." 
            className="w-full pl-16 pr-8 py-5 glass rounded-3xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-sm font-medium"
            value={search} onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map(model => (
          <div 
            key={model.id} 
            onClick={() => onSelect(model)}
            className="group cursor-pointer relative glass rounded-[3rem] overflow-hidden border border-white/5 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-emerald-500/10"
          >
            <div className="h-64 overflow-hidden relative">
              <img src={model.imageUrl} alt={model.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8 flex justify-between items-center">
                <h3 className="text-2xl font-black uppercase tracking-tighter">{model.name}</h3>
                <div className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-emerald-500 transform translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all">
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
    <div className="space-y-12 animate-in fade-in slide-in-from-right-8 duration-700">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
        <div className="space-y-4">
          <button onClick={onBack} className="flex items-center gap-2 text-emerald-500 text-xs font-black uppercase tracking-widest hover:gap-3 transition-all">
            <i className="fas fa-arrow-left"></i> Back to Models
          </button>
          <div className="space-y-1">
            <h2 className="text-5xl font-black uppercase tracking-tighter">{model.name} <span className="text-emerald-500">Skins</span></h2>
            <p className="text-gray-500 font-medium">Browse high-quality liveries for this chassis</p>
          </div>
        </div>
        <div className="relative group w-full lg:w-96">
          <i className="fas fa-search absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-emerald-500 transition-colors"></i>
          <input 
            type="text" placeholder={`Search ${model.name} skins...`} 
            className="w-full pl-16 pr-8 py-5 glass rounded-3xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-sm font-medium"
            value={search} onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
          {filtered.map(skin => <SkinCard key={skin.id} skin={skin} />)}
        </div>
      ) : (
        <div className="py-32 text-center glass rounded-[3rem] border border-white/5 border-dashed">
          <i className="fas fa-images text-4xl text-gray-600 mb-4"></i>
          <p className="text-gray-500 font-bold">No skins available for this model yet</p>
        </div>
      )}
    </div>
  );
};

const SkinCard: React.FC<{ skin: Skin }> = ({ skin }) => {
  const [verified, setVerified] = useState(false);
  const [input, setInput] = useState('');

  return (
    <div className="glass rounded-[3rem] overflow-hidden group hover:shadow-2xl transition-all duration-700 border border-white/5">
      <div className="h-64 overflow-hidden relative">
        <img src={skin.imageUrl} alt={skin.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
        <div className="absolute top-6 left-6 bg-emerald-500 text-white px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl">{skin.chassis}</div>
      </div>
      <div className="p-10 space-y-6">
        <div className="space-y-2">
          <h3 className="text-2xl font-bold">{skin.title}</h3>
          <div className="space-y-1">
            <p className="text-sm text-gray-500 flex items-center gap-2">
              <i className="fas fa-map-marker-alt text-emerald-500/50 w-4"></i> {skin.route}
            </p>
            <p className="text-sm text-gray-500 flex items-center gap-2">
              <i className="fas fa-palette text-emerald-500/50 w-4"></i> Designed By: <span className="text-emerald-400/80">{skin.author}</span>
            </p>
          </div>
        </div>
        
        {!verified ? (
          <div className="space-y-4 pt-4 border-t border-white/5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Authentication</span>
              <span className="text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-lg text-[10px] font-bold">Hint: {skin.captchaCode}</span>
            </div>
            <div className="flex gap-3">
              <input 
                type="text" placeholder="Access Code" 
                className="flex-grow bg-white/5 border border-white/10 rounded-2xl px-6 py-3 text-sm focus:outline-none focus:border-emerald-500/50 transition-colors uppercase font-mono" 
                value={input} onChange={(e) => setInput(e.target.value.toUpperCase())} 
              />
              <button 
                onClick={() => input === skin.captchaCode ? setVerified(true) : alert('Incorrect Authentication Code!')} 
                className="px-6 py-3 bg-emerald-500 text-white rounded-2xl text-sm font-bold shadow-lg shadow-emerald-500/20 hover:scale-105 active:scale-95 transition-all"
              >
                Verify
              </button>
            </div>
          </div>
        ) : (
          <div className="flex gap-3 pt-4 border-t border-white/5">
            <a href={skin.paintUrl} className="flex-grow py-4 bg-emerald-500 rounded-2xl font-bold text-sm text-center transition-all shadow-lg shadow-emerald-500/20 hover:scale-105">Paint</a>
            <a href={skin.glassUrl} className="flex-grow py-4 glass border-white/10 hover:bg-emerald-500 rounded-2xl font-bold text-sm text-center transition-all">Glass</a>
          </div>
        )}
      </div>
    </div>
  );
};

// --- Footer Component ---
const Footer: React.FC<{ visitorCount: number }> = ({ visitorCount }) => (
  <footer className="mt-auto px-6 lg:px-12 pb-12 pt-16 w-full max-w-7xl mx-auto">
    <div className="glass rounded-[2.5rem] p-10 lg:p-14 border border-white/5 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent"></div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
        <div className="space-y-6">
          <h3 className="text-2xl font-black italic tracking-tighter">BSBD<span className="text-emerald-500">OMG</span></h3>
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
              { icon: 'fa-google-play', color: 'hover:bg-emerald-600', link: 'https://play.google.com' }
            ].map((social, i) => (
              <a 
                key={i} href={social.link} target="_blank" rel="noreferrer"
                className={`w-12 h-12 glass rounded-2xl flex items-center justify-center text-emerald-500 transition-all duration-300 hover:text-white hover:-translate-y-1 ${social.color}`}
              >
                <i className={`fab ${social.icon} text-lg`}></i>
              </a>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Status</h4>
          <div className="space-y-4">
            <div className="flex items-center gap-3 glass bg-white/5 px-4 py-3 rounded-2xl">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-xs font-semibold text-gray-300">Live Viewers: {visitorCount.toLocaleString()}</span>
            </div>
            <p className="text-[10px] text-gray-600 uppercase tracking-widest pl-2">© 2025 BSBDOMG Official • All Rights Reserved</p>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

// --- Admin Dashboard ---

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
  const [newSkin, setNewSkin] = useState<Skin>({ 
    id: '', modelId: '', title: '', author: '', route: '', chassis: '', 
    imageUrl: '', captchaCode: '', paintUrl: '', glassUrl: '' 
  });
  const [newStaff, setNewStaff] = useState<StaffMember>({ id: '', name: '', role: '', imageUrl: '', fbLink: '', type: 'master' });

  const addModel = () => {
    if(!newModel.name) return;
    setBusModels([...busModels, { ...newModel, id: 'm' + Date.now() }]);
    setNewModel({ id: '', name: '', imageUrl: '' });
  };

  const addSkin = () => {
    if(!newSkin.title || !newSkin.modelId) return;
    setSkins([...skins, { ...newSkin, id: 's' + Date.now() }]);
    setNewSkin({ 
      id: '', modelId: '', title: '', author: '', route: '', chassis: '', 
      imageUrl: '', captchaCode: '', paintUrl: '', glassUrl: '' 
    });
  };

  const addStaff = () => {
    if(!newStaff.name) return;
    setStaff([...staff, { ...newStaff, id: 'st' + Date.now() }]);
    setNewStaff({ id: '', name: '', role: '', imageUrl: '', fbLink: '', type: 'master' });
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-white/10 pb-10">
        <div>
          <h2 className="text-4xl font-black text-orange-400 uppercase tracking-tighter italic">Control Panel</h2>
          <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mt-1">Authorized Management Access</p>
        </div>
        <button onClick={onLogout} className="px-8 py-3 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl active:scale-95">End Session</button>
      </div>

      <div className="flex flex-wrap gap-3">
        {['models', 'skins', 'leaderboard', 'trips', 'staff', 'about'].map(tab => (
          <button 
            key={tab} onClick={() => setActiveTab(tab as any)}
            className={`px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-orange-500 text-white shadow-xl shadow-orange-500/20' : 'glass text-gray-400 hover:bg-white/5'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="glass p-10 lg:p-14 rounded-[3.5rem] border border-white/10 min-h-[600px] shadow-2xl">
        {activeTab === 'models' && (
          <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8 glass border-white/5 rounded-[2.5rem]">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 ml-4">Model Name</label>
                <input className="w-full glass bg-white/5 p-4 rounded-2xl" placeholder="e.g. KIWI RJ2S" value={newModel.name} onChange={e => setNewModel({...newModel, name: e.target.value})} />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 ml-4">Preview Image URL</label>
                <input className="w-full glass bg-white/5 p-4 rounded-2xl" placeholder="https://..." value={newModel.imageUrl} onChange={e => setNewModel({...newModel, imageUrl: e.target.value})} />
              </div>
              <button onClick={addModel} className="md:col-span-2 bg-emerald-500 py-4 rounded-2xl font-bold uppercase tracking-widest text-sm shadow-xl">Add Model</button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {busModels.map(m => (
                <div key={m.id} className="flex items-center justify-between p-6 glass border-white/5 rounded-3xl group">
                  <div className="flex items-center gap-4">
                    <img src={m.imageUrl} className="w-12 h-12 rounded-xl object-cover" onError={(e) => (e.currentTarget.src = 'https://placehold.co/100x100?text=Bus')} />
                    <p className="font-bold">{m.name}</p>
                  </div>
                  <button onClick={() => setBusModels(busModels.filter(x => x.id !== m.id))} className="text-red-500 opacity-0 group-hover:opacity-100 transition-all"><i className="fas fa-trash"></i></button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'skins' && (
          <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-8 glass border-white/5 rounded-[2.5rem]">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 ml-4">Model</label>
                <select className="w-full glass bg-white/5 p-4 rounded-2xl" value={newSkin.modelId} onChange={e => setNewSkin({...newSkin, modelId: e.target.value})}>
                  <option value="">Select Model...</option>
                  {busModels.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 ml-4">Skin Title</label>
                <input className="w-full glass bg-white/5 p-4 rounded-2xl" placeholder="e.g. Green Line" value={newSkin.title} onChange={e => setNewSkin({...newSkin, title: e.target.value})} />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 ml-4">Author</label>
                <input className="w-full glass bg-white/5 p-4 rounded-2xl" placeholder="e.g. Admin" value={newSkin.author} onChange={e => setNewSkin({...newSkin, author: e.target.value})} />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 ml-4">Route</label>
                <input className="w-full glass bg-white/5 p-4 rounded-2xl" placeholder="e.g. Dhaka-Sylhet" value={newSkin.route} onChange={e => setNewSkin({...newSkin, route: e.target.value})} />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 ml-4">Unlock Code</label>
                <input className="w-full glass bg-white/5 p-4 rounded-2xl" placeholder="e.g. GL01" value={newSkin.captchaCode} onChange={e => setNewSkin({...newSkin, captchaCode: e.target.value})} />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 ml-4">Preview Image</label>
                <input className="w-full glass bg-white/5 p-4 rounded-2xl" placeholder="URL" value={newSkin.imageUrl} onChange={e => setNewSkin({...newSkin, imageUrl: e.target.value})} />
              </div>
              <button onClick={addSkin} className="lg:col-span-3 bg-emerald-500 py-4 rounded-2xl font-bold uppercase tracking-widest text-sm shadow-xl mt-4">Publish Skin</button>
            </div>
            
            <div className="grid gap-4">
              {skins.map(s => (
                <div key={s.id} className="flex items-center justify-between p-6 glass border-white/5 rounded-3xl group">
                  <div className="flex items-center gap-6">
                    <img src={s.imageUrl} className="w-16 h-10 object-cover rounded-lg" onError={(e) => (e.currentTarget.src = 'https://placehold.co/100x60?text=Skin')} />
                    <div>
                      <p className="font-bold">{s.title}</p>
                      <p className="text-xs text-gray-500">{busModels.find(m => m.id === s.modelId)?.name || 'Unknown'}</p>
                    </div>
                  </div>
                  <button onClick={() => setSkins(skins.filter(x => x.id !== s.id))} className="text-red-500 opacity-0 group-hover:opacity-100 transition-all"><i className="fas fa-trash-alt"></i></button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'leaderboard' && (
          <div className="space-y-16">
            {/* Drivers Section */}
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold">Driver Ranking</h3>
                <button 
                  onClick={() => setLeaderboard([...leaderboard, { rank: '?', name: 'New Driver', id: 'D'+Date.now(), trips: 0 }])} 
                  className="px-6 py-2 bg-emerald-500 rounded-xl font-bold text-xs uppercase tracking-widest shadow-lg shadow-emerald-500/20 hover:scale-105 transition-all"
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
                        <td className="p-6"><input className="bg-transparent font-black w-16 focus:text-emerald-500 outline-none" value={p.rank} onChange={e => setLeaderboard(leaderboard.map(x => x.id === p.id ? {...x, rank: e.target.value} : x))} /></td>
                        <td className="p-6"><input className="bg-transparent block font-bold text-lg focus:text-emerald-500 outline-none w-full" value={p.name} onChange={e => setLeaderboard(leaderboard.map(x => x.id === p.id ? {...x, name: e.target.value} : x))} /><span className="text-[10px] text-gray-600 font-mono">{p.id}</span></td>
                        <td className="p-6 text-center"><input className="glass bg-white/5 w-24 p-3 text-center rounded-xl font-bold focus:ring-1 focus:ring-emerald-500 outline-none" value={p.trips} onChange={e => setLeaderboard(leaderboard.map(x => x.id === p.id ? {...x, trips: e.target.value} : x))} /></td>
                        <td className="p-6"><button onClick={() => setLeaderboard(leaderboard.filter(x => x.id !== p.id))} className="text-red-500/30 hover:text-red-500"><i className="fas fa-times-circle"></i></button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Masters Section */}
            <div className="space-y-8 pt-8 border-t border-white/10">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold">Trip Masters Ranking</h3>
                <button 
                  onClick={() => setMasterLeaderboard([...masterLeaderboard, { rank: '?', name: 'New Master', id: 'M'+Date.now(), trips: 'N/A' }])} 
                  className="px-6 py-2 bg-orange-500 rounded-xl font-bold text-xs uppercase tracking-widest shadow-lg shadow-orange-500/20 hover:scale-105 transition-all"
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
                        <td className="p-6"><input className="bg-transparent font-black w-16 focus:text-emerald-500 outline-none" value={p.rank} onChange={e => setMasterLeaderboard(masterLeaderboard.map(x => x.id === p.id ? {...x, rank: e.target.value} : x))} /></td>
                        <td className="p-6"><input className="bg-transparent block font-bold text-lg focus:text-emerald-500 outline-none w-full" value={p.name} onChange={e => setMasterLeaderboard(masterLeaderboard.map(x => x.id === p.id ? {...x, name: e.target.value} : x))} /><span className="text-[10px] text-gray-600 font-mono">{p.id}</span></td>
                        <td className="p-6 text-center"><input className="glass bg-white/5 w-24 p-3 text-center rounded-xl font-bold focus:ring-1 focus:ring-emerald-500 outline-none" value={p.trips} onChange={e => setMasterLeaderboard(masterLeaderboard.map(x => x.id === p.id ? {...x, trips: e.target.value} : x))} /></td>
                        <td className="p-6"><button onClick={() => setMasterLeaderboard(masterLeaderboard.filter(x => x.id !== p.id))} className="text-red-500/30 hover:text-red-500"><i className="fas fa-times-circle"></i></button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'trips' && (
          <div className="space-y-8">
             <div className="flex items-center justify-between"><h3 className="text-2xl font-bold">Operational Timing</h3><button onClick={() => setTrips([...trips, { time: '00:00 AM', master: 'New Master', id: 'NEW' }])} className="px-6 py-2 bg-emerald-500 rounded-xl font-bold text-xs uppercase tracking-widest shadow-lg shadow-emerald-500/20 hover:scale-105 transition-all">Add Trip</button></div>
             <div className="grid gap-6">
               {trips.map((t, idx) => (
                 <div key={idx} className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8 glass border-white/5 rounded-[2.5rem] relative group">
                   <div className="space-y-2"><label className="text-[10px] font-black uppercase text-gray-600 ml-2">Time</label><input className="w-full glass bg-white/5 p-4 rounded-2xl text-lg font-black focus:ring-1 focus:ring-emerald-500 outline-none" value={t.time} onChange={e => setTrips(trips.map((x, i) => i === idx ? {...x, time: e.target.value} : x))} /></div>
                   <div className="space-y-2"><label className="text-[10px] font-black uppercase text-gray-600 ml-2">Master</label><input className="w-full glass bg-white/5 p-4 rounded-2xl text-sm font-bold focus:ring-1 focus:ring-emerald-500 outline-none" value={t.master} onChange={e => setTrips(trips.map((x, i) => i === idx ? {...x, master: e.target.value} : x))} /></div>
                   <div className="space-y-2"><label className="text-[10px] font-black uppercase text-gray-600 ml-2">Identifier</label><div className="flex gap-4"><input className="flex-grow glass bg-white/5 p-4 rounded-2xl text-xs font-mono focus:ring-1 focus:ring-emerald-500 outline-none" value={t.id} onChange={e => setTrips(trips.map((x, i) => i === idx ? {...x, id: e.target.value} : x))} /><button onClick={() => setTrips(trips.filter((_, i) => i !== idx))} className="w-14 h-14 rounded-2xl bg-red-500/10 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all"><i className="fas fa-trash"></i></button></div></div>
                 </div>
               ))}
             </div>
          </div>
        )}

        {activeTab === 'staff' && (
          <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-8 glass border-white/5 rounded-[2.5rem]">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 ml-4">Full Name</label>
                <input className="w-full glass bg-white/5 p-4 rounded-2xl" placeholder="Raju Ahmed" value={newStaff.name} onChange={e => setNewStaff({...newStaff, name: e.target.value})} />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 ml-4">Role/Time</label>
                <input className="w-full glass bg-white/5 p-4 rounded-2xl" placeholder="Admin / 3:30 PM" value={newStaff.role} onChange={e => setNewStaff({...newStaff, role: e.target.value})} />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 ml-4">Type</label>
                <select className="w-full glass bg-white/5 p-4 rounded-2xl" value={newStaff.type} onChange={e => setNewStaff({...newStaff, type: e.target.value as any})}>
                  <option value="admin">Admin</option>
                  <option value="master">Trip Master</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 ml-4">Image URL</label>
                <input className="w-full glass bg-white/5 p-4 rounded-2xl" placeholder="sdimg/photo.jpg" value={newStaff.imageUrl} onChange={e => setNewStaff({...newStaff, imageUrl: e.target.value})} />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 ml-4">FB Profile Link</label>
                <input className="w-full glass bg-white/5 p-4 rounded-2xl" placeholder="https://facebook.com/..." value={newStaff.fbLink} onChange={e => setNewStaff({...newStaff, fbLink: e.target.value})} />
              </div>
              <button onClick={addStaff} className="lg:col-span-3 bg-emerald-500 py-4 rounded-2xl font-bold uppercase tracking-widest text-sm shadow-xl mt-4">Add Staff Member</button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {staff.map(s => (
                <div key={s.id} className="flex items-center justify-between p-6 glass border-white/5 rounded-3xl group">
                  <div className="flex items-center gap-4">
                    <img src={s.imageUrl} className="w-12 h-12 rounded-full object-cover" onError={(e) => (e.currentTarget.src = 'https://placehold.co/100x100?text=Profile')} />
                    <div>
                      <p className="font-bold text-sm">{s.name}</p>
                      <p className="text-[10px] text-gray-500 uppercase">{s.type}</p>
                    </div>
                  </div>
                  <button onClick={() => setStaff(staff.filter(x => x.id !== s.id))} className="text-red-500 opacity-0 group-hover:opacity-100 transition-all"><i className="fas fa-trash-alt"></i></button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'about' && (
          <div className="space-y-10 max-w-4xl">
            <div className="space-y-4">
               <h3 className="text-2xl font-bold">Marquee Announcement</h3>
               <input className="w-full glass bg-white/5 border-white/10 rounded-2xl p-4 focus:ring-2 focus:ring-emerald-500 outline-none" value={marquee} onChange={(e) => setMarquee(e.target.value)} />
            </div>
            <div className="space-y-4">
               <h3 className="text-2xl font-bold">Historical Narrative</h3>
               <textarea className="w-full h-80 glass bg-white/5 border-white/10 rounded-[2.5rem] p-10 focus:outline-none focus:ring-2 focus:ring-orange-500 text-lg leading-relaxed text-gray-300 font-light" value={history} onChange={(e) => setHistory(e.target.value)} placeholder="Compose the community story..." />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const AdminLogin: React.FC<{ password: string, setPassword: (s: string) => void, onSubmit: (e: React.FormEvent) => void, onCancel: () => void }> = ({ password, setPassword, onSubmit, onCancel }) => (
  <div className="max-w-md mx-auto py-12 animate-in fade-in zoom-in duration-500">
    <div className="glass p-10 rounded-[3rem] border border-orange-500/20 shadow-2xl space-y-8">
      <div className="text-center">
        <div className="w-20 h-20 bg-orange-500/10 rounded-full flex items-center justify-center mx-auto mb-6"><i className="fas fa-fingerprint text-3xl text-orange-500"></i></div>
        <h2 className="text-2xl font-bold mb-1">Authorization</h2>
        <p className="text-gray-500 text-xs uppercase tracking-widest">Access code required</p>
      </div>
      <form onSubmit={onSubmit} className="space-y-5">
        <input type="password" placeholder="••••••••" className="w-full glass bg-white/5 border-white/10 p-5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 text-center text-2xl tracking-[0.5em]" value={password} onChange={(e) => setPassword(e.target.value)} autoFocus />
        <div className="grid grid-cols-2 gap-4">
          <button type="button" onClick={onCancel} className="py-4 glass hover:bg-white/5 rounded-2xl font-bold text-sm transition-all">Cancel</button>
          <button type="submit" className="py-4 bg-orange-500 hover:bg-orange-600 rounded-2xl font-bold text-sm shadow-xl shadow-orange-500/20 transition-all">Verify</button>
        </div>
      </form>
    </div>
  </div>
);

// --- Sections ---

const HomeSection: React.FC<{ onNavigate: (item: Partial<NavItem>) => void }> = ({ onNavigate }) => (
  <div className="space-y-24 animate-in fade-in slide-in-from-bottom-8 duration-1000">
    <div className="flex flex-col items-center text-center space-y-8 pt-8">
      <span className="px-5 py-2 glass rounded-full text-emerald-400 text-xs font-bold uppercase tracking-[0.3em] border-emerald-500/20">official multiplayer group</span>
      <h1 className="text-6xl lg:text-[8rem] font-black leading-[0.9] tracking-tighter uppercase">BSBD<span className="text-emerald-500">OMG</span></h1>
      <p className="max-w-3xl mx-auto text-gray-400 text-lg lg:text-xl leading-relaxed font-light">Experience the next level of Bus Simulator Bangladesh. Join a professional network of players, explore premium content, and dominate the leaderboard.</p>
      <div className="flex flex-wrap gap-5 pt-4 justify-center">
        <button onClick={() => onNavigate({ id: 'skins' })} className="px-12 py-5 bg-emerald-500 hover:bg-emerald-600 rounded-2xl font-bold shadow-2xl shadow-emerald-500/30 transition-all active:scale-95 text-lg">Skin Library </button>
        <a href="https://forms.gle/K87fHr2StxKTN9P86" target="_blank" className="px-12 py-5 glass border-white/10 hover:bg-white/5 rounded-2xl font-bold transition-all text-lg">Join Community</a>
      </div>
    </div>

    {/* Featured Hero Image Section */}
    <div className="relative group overflow-hidden rounded-[3rem] lg:rounded-[4rem] border border-white/10 shadow-2xl">
      <img
        src="images/home-img.jpg"
        alt="BSBD Hero"
        className="w-full h-[400px] lg:h-[650px] object-cover group-hover:scale-105 transition-transform duration-1000"
        onError={(e) => {
          (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=2000";
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
      <div className="absolute bottom-12 left-12 right-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <p className="text-emerald-500 font-black uppercase tracking-[0.4em] text-xs">Established 2021</p>
          <h2 className="text-4xl lg:text-5xl font-black uppercase italic tracking-tight">Join the Movement</h2>
          <p className="text-gray-300 max-w-lg text-sm lg:text-base">Experience high-fidelity bangladeshi bus simulation with the most active multiplayer group.</p>
        </div>
        <button onClick={() => onNavigate({ id: 'about' })} className="px-10 py-4 glass hover:bg-emerald-500 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl whitespace-nowrap">Learn Our History</button>
      </div>
    </div>
    
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
       {[
         { icon: 'fa-bus', label: '100+ Members', sub: 'Verified Drivers' },
         { icon: 'fa-clock', label: 'Daily Trips', sub: 'Punctual & Organized' },
         { icon: 'fa-medal', label: 'Monthly Stats', sub: 'Competitive Ranking' },
         { icon: 'fa-palette', label: 'Custom Skins', sub: 'Handcrafted Quality' },
       ].map((s, i) => (
         <div key={i} className="glass p-10 rounded-[2.5rem] border border-white/5 group hover:border-emerald-500/20 transition-all">
           <i className={`fas ${s.icon} text-3xl text-emerald-500/50 mb-6 group-hover:text-emerald-500 transition-colors`}></i>
           <p className="font-bold text-xl mb-1">{s.label}</p>
           <p className="text-xs text-gray-500 uppercase tracking-widest">{s.sub}</p>
         </div>
       ))}
    </div>
  </div>
);

const LeaderboardSection: React.FC<{ data: LeaderboardEntry[], masterData: LeaderboardEntry[] }> = ({ data, masterData }) => {
  const renderTable = (list: LeaderboardEntry[], title?: string) => (
    <div className="space-y-8">
      {title && <div className="text-center py-6"><h3 className="text-4xl font-black uppercase tracking-tighter border-b-2 border-emerald-500 inline-block pb-2">{title}</h3></div>}
      <div className="glass rounded-[3.5rem] overflow-hidden border border-white/5 shadow-2xl">
        <table className="w-full text-left">
          <thead className="bg-white/5 border-b border-white/5">
            <tr>
              <th className="px-10 py-6 text-[10px] font-black uppercase text-gray-500 tracking-widest">SL</th>
              <th className="px-10 py-6 text-[10px] font-black uppercase text-gray-500 tracking-widest">Player Name</th>
              <th className="px-10 py-6 text-[10px] font-black uppercase text-gray-500 tracking-widest">Game ID</th>
              <th className="px-10 py-6 text-[10px] font-black uppercase text-gray-500 tracking-widest text-center">Total Trips</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {list.map((p, idx) => {
              const isFirst = idx === 0;
              const isSecond = idx === 1;
              const isThird = idx === 2;
              
              let rowBg = "hover:bg-white/5";
              if (isFirst) rowBg = "bg-amber-500/10 hover:bg-amber-500/20";
              if (isSecond) rowBg = "bg-slate-400/10 hover:bg-slate-400/20";
              if (isThird) rowBg = "bg-orange-600/10 hover:bg-orange-600/20";

              return (
                <tr key={p.id} className={`${rowBg} transition-colors group`}>
                  <td className={`px-10 py-8 font-black text-2xl ${isFirst ? 'text-amber-400' : isSecond ? 'text-slate-300' : isThird ? 'text-orange-500' : 'text-emerald-500/50'}`}>{p.rank}</td>
                  <td className="px-10 py-8"><div className="font-bold text-lg">{p.name}</div></td>
                  <td className="px-10 py-8"><div className="text-xs text-gray-500 font-mono">{p.id}</div></td>
                  <td className="px-10 py-8 text-center">
                    <span className={`inline-block px-5 py-2 rounded-xl font-mono text-lg font-bold ${typeof p.trips === 'number' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-white/5 text-gray-600'}`}>
                      {p.trips}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="space-y-16 animate-in fade-in duration-700">
      <div className="text-center space-y-3">
        <h2 className="text-5xl font-black uppercase tracking-tighter">Trip Leaderboard</h2>
        <p className="text-gray-400 font-medium">🏅 JULY'25 Leaderboard based on <span className="text-white font-bold">monthly</span> total attendance in the trip at BSBDOMG.</p>
      </div>

      <div className="max-w-5xl mx-auto space-y-24">
        {renderTable(data)}
        {renderTable(masterData, "For Trip Masters")}
        
        <div className="space-y-4 pt-10 border-t border-white/5">
          <p className="text-gray-400 text-sm font-medium">1) Leaderboard updates every week.</p>
          <p className="text-gray-400 text-sm font-medium">2) Update: <span className="text-emerald-400">01.07.25 - 08.07.25</span> | Avg. 86.47%</p>
        </div>
      </div>
    </div>
  );
};

const TripRulesSection: React.FC<{ schedules: TripSchedule[] }> = ({ schedules }) => (
  <div className="space-y-20 animate-in fade-in duration-700">
    <div className="text-center space-y-4">
      <h1 className="text-3xl lg:text-4xl font-black font-bengali text-white uppercase tracking-tighter">বাস সিমুলেটর বাংলাদেশ</h1>
      <p className="text-emerald-500 font-bengali text-xl lg:text-2xl">অফিসিয়াল মাল্টিপ্লেয়ার ট্রিপ রুলস ও সময়সূচী</p>
      <div className="w-24 h-1.5 bg-emerald-500 mx-auto rounded-full mt-4"></div>
    </div>

    {/* Schedule Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {schedules.map(t => (
        <div key={t.id} className="glass p-10 rounded-[3rem] text-center border border-white/5 hover:border-emerald-500/30 transition-all duration-500 group relative overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-full bg-emerald-500/20 group-hover:bg-emerald-500 transition-colors"></div>
          <div className="w-16 h-16 rounded-[1.5rem] bg-emerald-500/10 flex items-center justify-center text-emerald-500 mx-auto mb-6 group-hover:scale-110 transition-transform">
            <i className="fas fa-clock text-2xl"></i>
          </div>
          <p className="text-4xl font-black mb-3 text-white">{t.time}</p>
          <div className="space-y-1">
            <p className="text-lg font-bold font-bengali text-gray-200">{t.master}</p>
            <p className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">{t.id}</p>
          </div>
        </div>
      ))}
    </div>

    {/* Rules Section */}
    <div className="max-w-5xl mx-auto space-y-10">
      <div className="inline-flex items-center gap-4 bg-emerald-500/10 px-8 py-4 rounded-3xl border border-emerald-500/20">
        <i className="fas fa-shield-alt text-emerald-500 text-2xl"></i>
        <h2 className="text-3xl font-black font-bengali text-emerald-400">ট্রিপ চলাকালীন রুলস</h2>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {[
          "ট্রিপ মাস্টারের কথামতো চলতে হবে। ট্রিপ মাস্টার কি বলে সেদিকে লক্ষ্য রাখতে হবে।",
          "দুর্ঘটনা এড়াতে ওভারটেক কিংবা লেন চেঞ্জ করার সময় ইন্ডিকেটর লাইট ব্যবহার ও লুকিং গ্লাস দেখে করতে হবে। যাতে অন্য প্লেয়ার কোনোরকম চাপ না খায়।",
          "অফিসিয়াল ট্রিপ এবং স্পেশাল ট্রিপে বাধ্যতামূলক বাস স্কিন সেট করে ট্রিপে জয়েন করতে হবে।",
          "ট্রিপের মধ্যে জরুরী কারণ ছাড়া অতিরিক্ত মেসেজ করা যাবে না।",
          "ট্রিপের ভিডিও করার সময় ট্রিপ মাস্টারের নির্দেশনা মেনে চলবেন।",
          "ট্রিপের মধ্যে বিনা কারণে/অযথা হর্ণ দিবেন না। ট্রিপের মধ্যে চাপাচাপি সম্পূর্ণ নিষিদ্ধ।",
          "অফিসিয়াল ট্রিপের আগে থেকে ট্রিপ শেষ না হওয়া পর্যন্ত ট্রিপ মাস্টার ব্যতীত অন্য কেউ হোস্ট করতে পারবেন না।"
        ].map((rule, idx) => (
          <div key={idx} className="glass p-6 rounded-2xl border-l-4 border-emerald-500 flex items-start gap-6 group hover:bg-white/5 transition-all">
            <span className="w-10 h-10 shrink-0 bg-emerald-500/10 rounded-xl flex items-center justify-center font-bold text-emerald-500">{idx + 1}</span>
            <p className="font-bengali text-lg lg:text-xl text-gray-300 leading-relaxed py-1">{rule}</p>
          </div>
        ))}
      </div>

      {/* Warning/Footer Note */}
      <div className="glass p-10 rounded-[3rem] border border-red-500/20 bg-red-500/5 text-center space-y-4">
        <p className="font-bengali text-xl text-red-400 font-bold">** বি: দ্র: রুলস অমান্য করলে এডমিন প্যানেল যথাযথ ব্যবস্থা নিবেন।</p>
        <p className="font-bengali text-lg text-gray-400">ধন্যবাদান্তে: বিএসবিডি অফিসিয়াল মাল্টিপ্লেয়ার গ্রুপ (এডমিন প্যানেল)</p>
      </div>
    </div>
  </div>
);

const TournamentSection: React.FC = () => (
  <div className="space-y-12 animate-in fade-in duration-700 text-center py-12">
    <h2 className="text-5xl font-black uppercase tracking-tighter">Tournaments</h2>
    <div className="glass p-24 rounded-[4rem] border border-white/5 relative overflow-hidden group">
      <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <i className="fas fa-rocket text-7xl text-emerald-500/50 animate-pulse mb-10"></i>
      <h3 className="text-4xl font-black mb-4">Season 3 Incoming</h3>
      <p className="text-gray-500 max-w-lg mx-auto text-lg">The ultimate competitive journey is currently under preparation. Stay connected for registrations.</p>
    </div>
  </div>
);

const AboutUsSection: React.FC<{ history: string, staff: StaffMember[] }> = ({ history, staff }) => {
  const admins = staff.filter(s => s.type === 'admin');
  const masters = staff.filter(s => s.type === 'master');

  return (
    <div className="space-y-20 animate-in fade-in duration-700">
      <div className="text-center space-y-4">
        <h2 className="text-5xl font-black uppercase tracking-tighter">About Us</h2>
        <div className="w-24 h-2 bg-emerald-500 mx-auto rounded-full"></div>
      </div>

      <div className="glass p-12 lg:p-20 rounded-[4rem] border border-white/5 shadow-2xl relative overflow-hidden">
        <div className="absolute -right-20 -bottom-20 opacity-5">
          <i className="fas fa-history text-[20rem]"></i>
        </div>
        <h3 className="text-4xl font-black text-white flex items-center gap-4 mb-10 italic">
          <i className="fas fa-history text-emerald-500"></i> Our History
        </h3>
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="lg:w-2/3 space-y-6">
             <p className="text-xl text-gray-400 leading-relaxed font-light whitespace-pre-line">{history}</p>
          </div>
          <div className="lg:w-1/3">
             <img src="sdimg/mgrplogo.png" className="w-full max-w-sm mx-auto rounded-3xl shadow-2xl border border-white/10" onError={(e) => (e.currentTarget.src = 'https://placehold.co/400x400/10172a/emerald?text=BSBDOMG+Legacy')} />
          </div>
        </div>
      </div>

      {/* Admins Section */}
      <div className="space-y-12">
        <h3 className="text-4xl font-black text-center uppercase tracking-tighter">Admins</h3>
        <div className="flex flex-wrap justify-center gap-8">
          {admins.map(member => <StaffCard key={member.id} member={member} />)}
        </div>
      </div>

      {/* Trip Masters Section */}
      <div className="space-y-12">
        <h3 className="text-4xl font-black text-center uppercase tracking-tighter">Trip Masters</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {masters.map(member => <StaffCard key={member.id} member={member} />)}
        </div>
      </div>
    </div>
  );
};

const StaffCard: React.FC<{ member: StaffMember }> = ({ member }) => (
  <div className="glass p-10 rounded-[3rem] border border-white/5 flex flex-col items-center text-center group hover:border-emerald-500/30 transition-all duration-500 shadow-xl">
    <div className="relative mb-6">
      <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-emerald-500/20 group-hover:border-emerald-500 transition-colors shadow-2xl">
        <img src={member.imageUrl} className="w-full h-full object-cover" onError={(e) => (e.currentTarget.src = 'https://placehold.co/200x200?text=Profile')} />
      </div>
      <a href={member.fbLink} target="_blank" rel="noreferrer" className="absolute -bottom-2 -right-2 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform">
        <i className="fab fa-facebook-f"></i>
      </a>
    </div>
    <h4 className="text-xl font-bold mb-1">{member.name}</h4>
    <p className="text-sm text-gray-500 font-medium uppercase tracking-widest">{member.role}</p>
  </div>
);

export default App;
