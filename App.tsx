
import React, { useState, useEffect } from 'react';

// --- Types ---
type View = 'home' | 'about' | 'skins' | 'leaderboard' | 'tournament' | 'trip' | 'admin' | 'external';

interface Skin {
  id: string;
  category: string;
  title: string;
  route: string;
  author: string;
  imageUrl: string;
  code: string;
}

interface LeaderboardEntry {
  rank: string;
  name: string;
  id: string;
  trips: number;
}

interface TripSchedule {
  time: string;
  master: string;
  id: string;
}

interface NavItem {
  id: View;
  icon: string;
  label: string;
  path: string | null;
}

// --- Defaults ---
const DEFAULT_SKINS: Skin[] = [
  { id: 'OG1', category: 'KIWI 1JOG', title: 'Himalay Express', route: 'Dhaka - Laksham', author: 'Md Rashel Babu Sr.', imageUrl: 'https://placehold.co/600x400/1e293b/white?text=Himalay+Express', code: 'OG1' },
  { id: 'UNIV01', category: 'APPLE UNIV', title: 'Bangla Star', route: 'Pabna - Chattogram', author: 'Sakil Islam', imageUrl: 'https://placehold.co/600x400/1e293b/white?text=Bangla+Star', code: 'UNIV01' },
];

const DEFAULT_LEADERBOARD: LeaderboardEntry[] = [
  { rank: '🥇 1', name: 'Kazi Shovo Ahmed Mahin', id: 'Shovo449', trips: 24 },
  { rank: '🥈 2', name: 'RidoyDn', id: 'RidoyDn', trips: 23 },
  { rank: '🥉 3', name: 'Abdullah Al Mayaz', id: 'Mayazz', trips: 17 },
];

const DEFAULT_TRIPS: TripSchedule[] = [
  { time: '03:30 PM', master: 'Sakil', id: 'SAKIL_ISLAM' },
  { time: '07:30 PM', master: 'Raiyan', id: 'RaiyanB' },
  { time: '09:15 PM', master: 'Imroz', id: 'IMROZ' },
];

// Paths strictly relative to the root for maximum compatibility
const NAV_ITEMS: NavItem[] = [
  { id: 'home', icon: 'fa-home', label: 'Home', path: null },
  { id: 'about', icon: 'fa-info-circle', label: 'About Us', path: 'BSBDOMG/sidebar/about.html' },
  { id: 'skins', icon: 'fa-images', label: 'Bus Skins', path: 'BSBDOMG/skins/skins.html' },
  { id: 'leaderboard', icon: 'fa-trophy', label: 'Leaderboard', path: 'BSBDOMG/sidebar/leaderboard.html' },
  { id: 'trip', icon: 'fa-clock', label: 'Trip & Rules', path: 'BSBDOMG/sidebar/trip.html' },
  { id: 'tournament', icon: 'fa-gamepad', label: 'Tournament', path: 'BSBDOMG/sidebar/tournament.html' },
];

const App: React.FC = () => {
  const [view, setView] = useState<View>('home');
  const [externalUrl, setExternalUrl] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [visitorCount, setVisitorCount] = useState(1248);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [iframeLoading, setIframeLoading] = useState(false);

  // --- Dynamic State ---
  const [marqueeText, setMarqueeText] = useState(localStorage.getItem('bsbd_marquee') || 'এই ওয়েবসাইটের কোনো লেখা, ছবি কিংবা স্কিন বিনা অনুমতিতে ব্যবহার করা নিষেধ। #BSBDOMG Official Group');
  const [skins, setSkins] = useState<Skin[]>(() => JSON.parse(localStorage.getItem('bsbd_skins') || JSON.stringify(DEFAULT_SKINS)));
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>(() => JSON.parse(localStorage.getItem('bsbd_leaderboard') || JSON.stringify(DEFAULT_LEADERBOARD)));
  const [trips, setTrips] = useState<TripSchedule[]>(() => JSON.parse(localStorage.getItem('bsbd_trips') || JSON.stringify(DEFAULT_TRIPS)));
  const [historyText, setHistoryText] = useState(localStorage.getItem('bsbd_history') || "This group was created by BSBD OFFICIALS in 2021. Currently, 100+ members are participating regularly, and every day, 6 trip masters are hosting 6 trips.");

  // --- Persistence ---
  useEffect(() => {
    localStorage.setItem('bsbd_marquee', marqueeText);
    localStorage.setItem('bsbd_skins', JSON.stringify(skins));
    localStorage.setItem('bsbd_leaderboard', JSON.stringify(leaderboard));
    localStorage.setItem('bsbd_trips', JSON.stringify(trips));
    localStorage.setItem('bsbd_history', historyText);
  }, [marqueeText, skins, leaderboard, trips, historyText]);

  useEffect(() => {
    const count = parseInt(localStorage.getItem('visitor_count') || '1248');
    setVisitorCount(count + 1);
    localStorage.setItem('visitor_count', (count + 1).toString());
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
    
    // Reset external URL first to force an iframe unmount/mount if clicking the same item
    setExternalUrl(null);
    
    if (item.path) {
      setIframeLoading(true);
      setView('external');
      // Delay setting URL slightly to ensure state transition is clean
      setTimeout(() => setExternalUrl(item.path!), 10);
    } else {
      setView((item.id as View) || 'home');
    }
  };

  const renderContent = () => {
    if (showLogin) return <AdminLogin password={passwordInput} setPassword={setPasswordInput} onSubmit={handleLoginSubmit} onCancel={() => setShowLogin(false)} />;

    if (view === 'external' && externalUrl) {
      return (
        <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="flex justify-between items-center px-4">
            <h2 className="text-emerald-500 text-xs font-black uppercase tracking-[0.3em]">Resource Module Active</h2>
            <a 
              href={externalUrl} 
              target="_blank" 
              rel="noreferrer" 
              className="text-[10px] bg-white/5 hover:bg-emerald-500 transition-colors px-4 py-2 rounded-full font-bold text-gray-400 hover:text-white border border-white/5 uppercase tracking-widest"
            >
              <i className="fas fa-external-link-alt mr-2"></i> Open In New Tab
            </a>
          </div>
          
          <div className="w-full h-[85vh] glass rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl relative bg-[#0a0f1d]">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500/0 via-emerald-500/50 to-emerald-500/0 z-10"></div>
            {iframeLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-slate-950/90 z-0">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-12 h-12 border-4 border-emerald-500/10 border-t-emerald-500 rounded-full animate-spin"></div>
                  <span className="text-emerald-500/40 text-[10px] font-black uppercase tracking-[0.4em] animate-pulse">Establishing Connection...</span>
                </div>
              </div>
            )}
            <iframe 
              key={externalUrl}
              src={externalUrl} 
              className="w-full h-full border-none relative z-1" 
              title="External Resource"
              onLoad={() => setIframeLoading(false)}
              // Extended sandbox to allow downloads and popups for Firebase/LocalScripts
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-downloads allow-modals"
            />
          </div>
        </div>
      );
    }

    switch(view) {
      case 'skins': return <SkinsGallery skins={skins} />;
      case 'leaderboard': return <LeaderboardSection data={leaderboard} />;
      case 'trip': return <TripRulesSection schedules={trips} />;
      case 'tournament': return <TournamentSection />;
      case 'about': return <AboutUsSection history={historyText} />;
      case 'admin': 
        return isLoggedIn ? (
          <AdminDashboard 
            marquee={marqueeText} setMarquee={setMarqueeText}
            skins={skins} setSkins={setSkins}
            leaderboard={leaderboard} setLeaderboard={setLeaderboard}
            trips={trips} setTrips={setTrips}
            history={historyText} setHistory={setHistoryText}
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
      <nav className={`fixed inset-y-0 left-0 w-72 glass z-[120] transform transition-transform duration-500 ease-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="p-8 h-full flex flex-col justify-between overflow-y-auto">
          <div className="space-y-8">
            <div className="flex flex-col items-center gap-2 py-6 border-b border-white/5 cursor-pointer" onClick={() => handleNavClick({ id: 'home', path: null })}>
              <h1 className="text-3xl font-black tracking-tighter">BSBD<span className="text-emerald-500">OMG</span></h1>
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest text-center">Official Multiplayer Group</span>
            </div>
            
            <ul className="space-y-1">
              {NAV_ITEMS.map(item => (
                <li key={item.id}>
                  <button 
                    onClick={() => handleNavClick(item)}
                    className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 ${ (view === item.id || (view === 'external' && externalUrl === item.path)) && !showLogin ? 'bg-emerald-500 text-white shadow-xl shadow-emerald-500/20' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
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

// --- Admin Components ---

const AdminLogin: React.FC<{ password: string, setPassword: (s: string) => void, onSubmit: (e: React.FormEvent) => void, onCancel: () => void }> = ({ password, setPassword, onSubmit, onCancel }) => (
  <div className="max-w-md mx-auto py-12 animate-in fade-in zoom-in duration-500">
    <div className="glass p-10 rounded-[3rem] border border-orange-500/20 shadow-2xl space-y-8">
      <div className="text-center">
        <div className="w-20 h-20 bg-orange-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <i className="fas fa-fingerprint text-3xl text-orange-500"></i>
        </div>
        <h2 className="text-2xl font-bold mb-1">Authorization</h2>
        <p className="text-gray-500 text-xs uppercase tracking-widest">Access code required</p>
      </div>
      
      <form onSubmit={onSubmit} className="space-y-5">
        <input 
          type="password" placeholder="••••••••" 
          className="w-full glass bg-white/5 border-white/10 p-5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 text-center text-2xl tracking-[0.5em]"
          value={password} onChange={(e) => setPassword(e.target.value)}
          autoFocus
        />
        <div className="grid grid-cols-2 gap-4">
          <button type="button" onClick={onCancel} className="py-4 glass hover:bg-white/5 rounded-2xl font-bold text-sm transition-all">Cancel</button>
          <button type="submit" className="py-4 bg-orange-500 hover:bg-orange-600 rounded-2xl font-bold text-sm shadow-xl shadow-orange-500/20 transition-all">Verify</button>
        </div>
      </form>
    </div>
  </div>
);

// --- View Content ---

const HomeSection: React.FC<{ onNavigate: (item: Partial<NavItem>) => void }> = ({ onNavigate }) => (
  <div className="space-y-24 animate-in fade-in slide-in-from-bottom-8 duration-1000">
    <div className="flex flex-col items-center text-center space-y-8 pt-8">
      <span className="px-5 py-2 glass rounded-full text-emerald-400 text-xs font-bold uppercase tracking-[0.3em] border-emerald-500/20">The Premier Choice</span>
      <h1 className="text-6xl lg:text-[8rem] font-black leading-[0.9] tracking-tighter uppercase">
        BSBD<span className="text-emerald-500">OMG</span>
      </h1>
      <p className="max-w-3xl mx-auto text-gray-400 text-lg lg:text-xl leading-relaxed font-light">
        Experience the next level of Bus Simulator Bangladesh. Join a professional network of players, explore premium content, and dominate the leaderboard.
      </p>
      <div className="flex flex-wrap gap-5 pt-4 justify-center">
        <button 
          onClick={() => onNavigate({ id: 'skins', path: 'BSBDOMG/skins/skins.html' })} 
          className="px-12 py-5 bg-emerald-500 hover:bg-emerald-600 rounded-2xl font-bold shadow-2xl shadow-emerald-500/30 transition-all active:scale-95 text-lg"
        >
          Explore Library
        </button>
        <a href="https://forms.gle/K87fHr2StxKTN9P86" target="_blank" className="px-12 py-5 glass border-white/10 hover:bg-white/5 rounded-2xl font-bold transition-all text-lg">Join Community</a>
      </div>
    </div>

    <div className="glass p-12 lg:p-16 rounded-[4rem] border border-white/5 text-center space-y-12">
      <div className="space-y-2">
        <h3 className="text-3xl font-bold">Connect With Us</h3>
        <p className="text-gray-500">Stay updated with the latest news and schedules</p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { icon: 'fa-google-play', label: 'Play Store', link: 'https://play.google.com' },
          { icon: 'fa-facebook', label: 'Facebook Group', link: 'https://www.facebook.com/groups/bsbdgame' },
          { icon: 'fa-discord', label: 'Discord Server', link: 'https://discord.gg/yQSMsnB3U3' },
          { icon: 'fa-youtube', label: 'YouTube Channel', link: 'https://www.youtube.com/@bussimulatorbangladesh-bsbd' }
        ].map((platform, idx) => (
          <a 
            key={idx} href={platform.link} target="_blank" rel="noreferrer"
            className="group flex flex-col items-center gap-4 p-8 glass rounded-[2.5rem] border-white/5 hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all duration-500"
          >
            <div className="w-16 h-16 rounded-3xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform">
              <i className={`fab ${platform.icon} text-3xl`}></i>
            </div>
            <span className="font-bold text-sm tracking-wide">{platform.label}</span>
          </a>
        ))}
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

const SkinsGallery: React.FC<{ skins: Skin[] }> = ({ skins }) => {
  const [search, setSearch] = useState('');
  const filtered = skins.filter(s => s.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
        <div className="space-y-2">
          <h2 className="text-5xl font-black uppercase tracking-tighter">Premium Gallery</h2>
          <p className="text-gray-500 font-medium">Explore and verify exclusive bus liveries</p>
        </div>
        <div className="relative group w-full lg:w-96">
          <i className="fas fa-search absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-emerald-500 transition-colors"></i>
          <input 
            type="text" placeholder="Search liveries..." 
            className="w-full pl-16 pr-8 py-5 glass rounded-3xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-sm font-medium"
            value={search} onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
        {filtered.map(skin => <SkinCard key={skin.id} skin={skin} />)}
      </div>
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
        <div className="absolute top-6 left-6 bg-emerald-500 text-white px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl">{skin.category}</div>
      </div>
      <div className="p-10 space-y-6">
        <div>
          <h3 className="text-2xl font-bold mb-1">{skin.title}</h3>
          <p className="text-sm text-gray-500 flex items-center gap-2">
            <i className="fas fa-map-marker-alt text-emerald-500/50"></i> {skin.route}
          </p>
          <p className="text-[10px] text-gray-400 mt-4 uppercase font-bold tracking-widest">Design By: {skin.author}</p>
        </div>
        {!verified ? (
          <div className="space-y-4 pt-4 border-t border-white/5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Authentication</span>
              <span className="text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-lg text-[10px] font-bold">Hint: {skin.code}</span>
            </div>
            <div className="flex gap-3">
              <input 
                type="text" placeholder="Access Code" 
                className="flex-grow bg-white/5 border border-white/10 rounded-2xl px-6 py-3 text-sm focus:outline-none focus:border-emerald-500/50 transition-colors uppercase font-mono" 
                value={input} onChange={(e) => setInput(e.target.value.toUpperCase())} 
              />
              <button onClick={() => input === skin.code ? setVerified(true) : alert('Incorrect Authentication Code!')} className="px-6 py-3 bg-emerald-500 text-white rounded-2xl text-sm font-bold shadow-lg shadow-emerald-500/20 hover:scale-105 active:scale-95 transition-all">Verify</button>
            </div>
          </div>
        ) : (
          <div className="flex gap-3 pt-4 border-t border-white/5">
            <button className="flex-grow py-4 bg-white/10 hover:bg-emerald-500 rounded-2xl font-bold text-sm transition-all shadow-lg hover:shadow-emerald-500/20">Download Paint</button>
            <button className="flex-grow py-4 bg-white/10 hover:bg-emerald-500 rounded-2xl font-bold text-sm transition-all shadow-lg hover:shadow-emerald-500/20">Download Glass</button>
          </div>
        )}
      </div>
    </div>
  );
};

const LeaderboardSection: React.FC<{ data: LeaderboardEntry[] }> = ({ data }) => (
  <div className="space-y-12 animate-in fade-in duration-700">
    <div className="text-center space-y-3">
      <h2 className="text-5xl font-black uppercase tracking-tighter">Leaderboard</h2>
      <p className="text-gray-500 font-medium">Monthly performance ranking for active members</p>
    </div>
    <div className="max-w-4xl mx-auto glass rounded-[3.5rem] overflow-hidden border border-white/5 shadow-2xl">
      <table className="w-full text-left">
        <thead className="bg-white/5 border-b border-white/5">
          <tr>
            <th className="px-10 py-6 text-[10px] font-black uppercase text-gray-500 tracking-widest">Rank</th>
            <th className="px-10 py-6 text-[10px] font-black uppercase text-gray-500 tracking-widest">Player Profile</th>
            <th className="px-10 py-6 text-[10px] font-black uppercase text-gray-500 tracking-widest text-center">Trips</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {data.map(p => (
            <tr key={p.id} className="hover:bg-white/5 transition-colors group">
              <td className="px-10 py-8 font-black text-2xl text-emerald-500/50 group-hover:text-emerald-500 transition-colors">{p.rank}</td>
              <td className="px-10 py-8">
                <div className="font-bold text-lg">{p.name}</div>
                <div className="text-xs text-gray-500 font-mono mt-1">{p.id}</div>
              </td>
              <td className="px-10 py-8 text-center">
                <span className="inline-block px-5 py-2 glass bg-emerald-500/5 rounded-xl font-mono text-lg font-bold text-emerald-400">{p.trips}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const TripRulesSection: React.FC<{ schedules: TripSchedule[] }> = ({ schedules }) => (
  <div className="space-y-12 animate-in fade-in duration-700">
    <div className="text-center space-y-3">
      <h2 className="text-5xl font-black uppercase tracking-tighter">Trip Schedule</h2>
      <p className="text-emerald-500 font-bengali text-lg">অফিসিয়াল মাল্টিপ্লেয়ার ট্রিপ রুলস ও সময়সূচী</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {schedules.map(t => (
        <div key={t.id} className="glass p-12 rounded-[3.5rem] text-center border border-white/5 hover:border-emerald-500/30 transition-all duration-500 group">
          <div className="w-20 h-20 rounded-[2rem] bg-emerald-500/10 flex items-center justify-center text-emerald-500 mx-auto mb-8 group-hover:scale-110 transition-transform">
            <i className="fas fa-clock text-3xl"></i>
          </div>
          <p className="text-4xl font-black mb-2">{t.time}</p>
          <div className="space-y-1">
            <p className="text-[10px] text-gray-400 uppercase font-black tracking-[0.2em]">{t.master}</p>
            <p className="text-[10px] text-gray-600 font-mono italic">{t.id}</p>
          </div>
        </div>
      ))}
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

const AboutUsSection: React.FC<{ history: string }> = ({ history }) => (
  <div className="space-y-12 animate-in fade-in duration-700">
    <div className="text-center space-y-4">
      <h2 className="text-5xl font-black uppercase tracking-tighter">About Us</h2>
      <div className="w-24 h-2 bg-emerald-500 mx-auto rounded-full"></div>
    </div>
    <div className="glass p-12 lg:p-20 rounded-[4rem] border border-white/5 shadow-2xl relative overflow-hidden">
      <div className="absolute -right-20 -bottom-20 opacity-5">
        <i className="fas fa-history text-[20rem]"></i>
      </div>
      <h3 className="text-3xl font-bold text-white flex items-center gap-4 mb-8">
        <i className="fas fa-history text-emerald-500"></i> Our Legacy
      </h3>
      <p className="text-xl text-gray-400 leading-relaxed font-light">{history}</p>
    </div>
  </div>
);

// --- Admin Dashboard ---

interface AdminProps {
  marquee: string; setMarquee: (s: string) => void;
  skins: Skin[]; setSkins: (s: Skin[]) => void;
  leaderboard: LeaderboardEntry[]; setLeaderboard: (l: LeaderboardEntry[]) => void;
  trips: TripSchedule[]; setTrips: (t: TripSchedule[]) => void;
  history: string; setHistory: (h: string) => void;
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminProps> = ({ marquee, setMarquee, skins, setSkins, leaderboard, setLeaderboard, trips, setTrips, history, setHistory, onLogout }) => {
  const [activeTab, setActiveTab] = useState<'notice' | 'skins' | 'leaderboard' | 'trips' | 'about'>('notice');
  const [newSkin, setNewSkin] = useState<Skin>({ id: '', category: '', title: '', route: '', author: '', imageUrl: '', code: '' });

  const addSkin = () => {
    if(!newSkin.title) return;
    setSkins([...skins, { ...newSkin, id: Date.now().toString() }]);
    setNewSkin({ id: '', category: '', title: '', route: '', author: '', imageUrl: '', code: '' });
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
        {['notice', 'skins', 'leaderboard', 'trips', 'about'].map(tab => (
          <button 
            key={tab} onClick={() => setActiveTab(tab as any)}
            className={`px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-orange-500 text-white shadow-xl shadow-orange-500/20' : 'glass text-gray-400 hover:bg-white/5'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="glass p-10 lg:p-14 rounded-[3.5rem] border border-white/10 min-h-[600px] shadow-2xl">
        {activeTab === 'notice' && (
          <div className="space-y-8 max-w-3xl">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold">Marquee Announcement</h3>
              <p className="text-gray-500 text-sm">This text scrolls across the top of all pages.</p>
            </div>
            <textarea 
              className="w-full h-48 glass bg-white/5 border-white/10 rounded-[2rem] p-8 focus:outline-none focus:ring-2 focus:ring-orange-500 text-lg leading-relaxed font-bengali"
              value={marquee} onChange={(e) => setMarquee(e.target.value)}
              placeholder="Enter news, alerts, or welcome messages..."
            />
          </div>
        )}

        {activeTab === 'skins' && (
          <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {['title', 'route', 'category', 'author', 'imageUrl', 'code'].map(field => (
                <div key={field} className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest ml-4">{field}</label>
                  <input 
                    type="text" placeholder={`Enter ${field}...`}
                    className="w-full glass bg-white/5 p-4 rounded-2xl text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500" 
                    value={(newSkin as any)[field]} 
                    onChange={e => setNewSkin({...newSkin, [field]: e.target.value})} 
                  />
                </div>
              ))}
              <button onClick={addSkin} className="lg:col-span-3 mt-4 bg-emerald-500 py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-emerald-600 transition-all shadow-xl shadow-emerald-500/20">Publish New Skin</button>
            </div>
            
            <div className="space-y-6 pt-10 border-t border-white/5">
              <h4 className="text-xs font-black text-gray-500 uppercase tracking-widest">Active Database</h4>
              <div className="grid gap-4">
                {skins.map(s => (
                  <div key={s.id} className="flex items-center justify-between p-6 glass border-white/5 rounded-3xl hover:bg-white/5 transition-colors group">
                    <div>
                      <p className="font-bold text-lg">{s.title}</p>
                      <p className="text-xs text-gray-500 mt-1 uppercase tracking-widest">{s.category} • By {s.author}</p>
                    </div>
                    <button onClick={() => setSkins(skins.filter(sk => sk.id !== s.id))} className="w-12 h-12 rounded-xl bg-red-500/10 text-red-500 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center hover:bg-red-500 hover:text-white"><i className="fas fa-trash-alt"></i></button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'leaderboard' && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold">Roster Ranking</h3>
              <button onClick={() => setLeaderboard([...leaderboard, { rank: '?', name: 'New Driver', id: 'D'+Date.now(), trips: 0 }])} className="px-6 py-2 bg-emerald-500 rounded-xl font-bold text-xs uppercase tracking-widest shadow-lg shadow-emerald-500/20 hover:scale-105 transition-all">Add Driver</button>
            </div>
            <div className="glass rounded-[2rem] overflow-hidden border border-white/5">
              <table className="w-full text-left">
                <thead className="bg-white/5">
                  <tr>
                    <th className="p-6 text-[10px] font-black uppercase text-gray-500">Rank</th>
                    <th className="p-6 text-[10px] font-black uppercase text-gray-500">Driver</th>
                    <th className="p-6 text-center text-[10px] font-black uppercase text-gray-500">Trips</th>
                    <th className="p-6"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {leaderboard.map(p => (
                    <tr key={p.id} className="hover:bg-white/5 transition-colors">
                      <td className="p-6"><input className="bg-transparent font-black w-16 focus:text-emerald-500 outline-none" value={p.rank} onChange={e => setLeaderboard(leaderboard.map(x => x.id === p.id ? {...x, rank: e.target.value} : x))} /></td>
                      <td className="p-6">
                        <input className="bg-transparent block font-bold text-lg focus:text-emerald-500 outline-none w-full" value={p.name} onChange={e => setLeaderboard(leaderboard.map(x => x.id === p.id ? {...x, name: e.target.value} : x))} />
                        <span className="text-[10px] text-gray-600 font-mono">{p.id}</span>
                      </td>
                      <td className="p-6 text-center">
                        <input type="number" className="glass bg-white/5 w-24 p-3 text-center rounded-xl font-bold focus:ring-1 focus:ring-emerald-500 outline-none" value={p.trips} onChange={e => setLeaderboard(leaderboard.map(x => x.id === p.id ? {...x, trips: parseInt(e.target.value)} : x))} />
                      </td>
                      <td className="p-6">
                        <button onClick={() => setLeaderboard(leaderboard.filter(x => x.id !== p.id))} className="text-red-500/30 hover:text-red-500"><i className="fas fa-times-circle"></i></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'about' && (
          <div className="space-y-8 max-w-4xl">
            <h3 className="text-2xl font-bold">Historical Narrative</h3>
            <textarea 
              className="w-full h-80 glass bg-white/5 border-white/10 rounded-[2.5rem] p-10 focus:outline-none focus:ring-2 focus:ring-orange-500 text-lg leading-relaxed text-gray-300 font-light"
              value={history} onChange={(e) => setHistory(e.target.value)}
              placeholder="Compose the community story..."
            />
          </div>
        )}

        {activeTab === 'trips' && (
          <div className="space-y-8">
             <div className="flex items-center justify-between">
               <h3 className="text-2xl font-bold">Operational Timing</h3>
               <button onClick={() => setTrips([...trips, { time: '00:00 AM', master: 'New Master', id: 'NEW' }])} className="px-6 py-2 bg-emerald-500 rounded-xl font-bold text-xs uppercase tracking-widest shadow-lg shadow-emerald-500/20 hover:scale-105 transition-all">Add Trip</button>
             </div>
             <div className="grid gap-6">
               {trips.map((t, idx) => (
                 <div key={idx} className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8 glass border-white/5 rounded-[2.5rem] relative group">
                   <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase text-gray-600 ml-2">Time</label>
                     <input className="w-full glass bg-white/5 p-4 rounded-2xl text-lg font-black focus:ring-1 focus:ring-emerald-500 outline-none" value={t.time} onChange={e => setTrips(trips.map((x, i) => i === idx ? {...x, time: e.target.value} : x))} />
                   </div>
                   <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase text-gray-600 ml-2">Master</label>
                     <input className="w-full glass bg-white/5 p-4 rounded-2xl text-sm font-bold focus:ring-1 focus:ring-emerald-500 outline-none" value={t.master} onChange={e => setTrips(trips.map((x, i) => i === idx ? {...x, master: e.target.value} : x))} />
                   </div>
                   <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase text-gray-600 ml-2">Identifier</label>
                     <div className="flex gap-4">
                       <input className="flex-grow glass bg-white/5 p-4 rounded-2xl text-xs font-mono focus:ring-1 focus:ring-emerald-500 outline-none" value={t.id} onChange={e => setTrips(trips.map((x, i) => i === idx ? {...x, id: e.target.value} : x))} />
                       <button onClick={() => setTrips(trips.filter((_, i) => i !== idx))} className="w-14 h-14 rounded-2xl bg-red-500/10 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all"><i className="fas fa-trash"></i></button>
                     </div>
                   </div>
                 </div>
               ))}
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
