
import React, { useState, useEffect } from 'react';

// --- Types ---
type View = 'home' | 'about' | 'skins' | 'leaderboard' | 'tournament' | 'trip';

interface Skin {
  id: string;
  title: string;
  route: string;
  author: string;
  imageUrl: string;
  code: string;
}

// --- Mock Data ---
const SKINS: Skin[] = [
  { id: 'OG1', title: 'Himalay Express', route: 'Dhaka - Laksham', author: 'Md Rashel Babu Sr.', imageUrl: 'https://placehold.co/600x400/1e293b/white?text=Himalay+Express', code: 'OG1' },
  { id: 'OG2', title: 'Himachal', route: 'Any', author: 'Md Rashel Babu Sr.', imageUrl: 'https://placehold.co/600x400/1e293b/white?text=Himachal', code: 'OG2' },
  { id: 'UNIV01', title: 'Bangla Star', route: 'Pabna - Chattogram', author: 'Sakil Islam', imageUrl: 'https://placehold.co/600x400/1e293b/white?text=Bangla+Star', code: 'UNIV01' },
];

const App: React.FC = () => {
  const [view, setView] = useState<View>('home');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [visitorCount, setVisitorCount] = useState(1248);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const count = parseInt(localStorage.getItem('visitor_count') || '1248');
    setVisitorCount(count + 1);
    localStorage.setItem('visitor_count', (count + 1).toString());
  }, []);

  const renderContent = () => {
    switch(view) {
      case 'skins': return <SkinsGallery skins={SKINS} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />;
      case 'leaderboard': return <Leaderboard />;
      case 'trip': return <TripRules />;
      case 'tournament': return <Tournament />;
      case 'about': return <AboutUs />;
      default: return <Home setView={setView} />;
    }
  };

  return (
    <div className="min-h-screen relative">
      {/* Background Overlay */}
      <div className="fixed inset-0 z-[-1] opacity-40 bg-[url('https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80')] bg-cover bg-center"></div>
      
      {/* Marquee Notice */}
      <div className="fixed top-0 w-full z-50 bg-black/60 backdrop-blur-md py-2 border-b border-white/10">
        <div className="animate-marquee text-emerald-400 font-bengali text-sm px-4">
          সতর্কতাঃ এই ওয়েবসাইটের কোনো লেখা, ছবি কিংবা স্কিন বিনা অনুমতিতে ব্যবহার করা আইনত দণ্ডনীয়। #BSBDOMG Official Group 
        </div>
      </div>

      {/* Sidebar Navigation */}
      <nav className={`fixed inset-y-0 left-0 w-72 glass z-[100] transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="p-8 space-y-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <i className="fas fa-bus text-white"></i>
            </div>
            <h1 className="text-xl font-bold tracking-tight">BSBD<span className="text-emerald-500">OMG</span></h1>
          </div>
          
          <ul className="space-y-2">
            {[
              { id: 'home', icon: 'fa-home', label: 'Home' },
              { id: 'about', icon: 'fa-info-circle', label: 'About Us' },
              { id: 'skins', icon: 'fa-images', label: 'Bus Skins' },
              { id: 'leaderboard', icon: 'fa-trophy', label: 'Leaderboard' },
              { id: 'trip', icon: 'fa-clock', label: 'Trip Rules' },
              { id: 'tournament', icon: 'fa-gamepad', label: 'Tournament' },
            ].map(item => (
              <li key={item.id}>
                <button 
                  onClick={() => { setView(item.id as View); setSidebarOpen(false); }}
                  className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${view === item.id ? 'bg-emerald-500 text-white shadow-lg' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
                >
                  <i className={`fas ${item.icon} w-5`}></i>
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="absolute bottom-8 left-0 w-full px-8 text-center text-xs text-gray-500">
          <p>© 2025 BSBDOMG Official</p>
          <div className="flex items-center justify-center gap-2 mt-2">
            <i className="fas fa-eye text-emerald-500"></i>
            <span>{visitorCount.toLocaleString()} Visitors</span>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="lg:ml-72 pt-24 pb-12 px-6 lg:px-12 max-w-7xl mx-auto">
        {/* Header Toggle for Mobile */}
        <div className="lg:hidden fixed top-12 left-6 z-[60]">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-3 glass rounded-full text-white">
            <i className={`fas ${sidebarOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </button>
        </div>

        {renderContent()}
      </main>
    </div>
  );
};

// --- Sub-components ---

const Home: React.FC<{ setView: (v: View) => void }> = ({ setView }) => (
  <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
    <div className="text-center lg:text-left space-y-6">
      <span className="inline-block px-4 py-1.5 glass rounded-full text-emerald-400 text-xs font-bold uppercase tracking-widest">Official Multiplayer Group</span>
      <h1 className="text-5xl lg:text-7xl font-black leading-tight drop-shadow-2xl">
        DRIVE WITH <br/> THE <span className="text-emerald-500">COMMUNITY.</span>
      </h1>
      <p className="max-w-2xl text-gray-400 text-lg leading-relaxed">
        The official digital hub for Bus Simulator Bangladesh Official Multiplayer Group. 
        Get high-quality skins, check schedules, and join the elite leaderboard.
      </p>
      <div className="flex flex-wrap gap-4 pt-4 justify-center lg:justify-start">
        <button onClick={() => setView('skins')} className="px-8 py-4 bg-emerald-500 hover:bg-emerald-600 rounded-2xl font-bold shadow-xl shadow-emerald-500/20 transition-all active:scale-95">Explore Skins</button>
        <a href="https://forms.gle/K87fHr2StxKTN9P86" target="_blank" className="px-8 py-4 glass hover:bg-white/10 rounded-2xl font-bold transition-all">Join Us</a>
      </div>
    </div>

    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
       {[
         { icon: 'fa-facebook', label: 'FB Group', color: 'text-blue-500' },
         { icon: 'fa-discord', label: 'Discord', color: 'text-indigo-400' },
         { icon: 'fa-youtube', label: 'YouTube', color: 'text-red-500' },
         { icon: 'fa-google-play', label: 'Get Game', color: 'text-green-400' },
       ].map(s => (
         <div key={s.label} className="glass p-6 rounded-3xl text-center hover:bg-white/10 transition-colors cursor-pointer group">
           <i className={`fab ${s.icon} text-3xl ${s.color} group-hover:scale-110 transition-transform`}></i>
           <p className="mt-3 font-semibold text-sm">{s.label}</p>
         </div>
       ))}
    </div>
  </div>
);

const SkinsGallery: React.FC<{ skins: Skin[], searchTerm: string, setSearchTerm: (s: string) => void }> = ({ skins, searchTerm, setSearchTerm }) => {
  const filtered = skins.filter(s => s.title.toLowerCase().includes(searchTerm.toLowerCase()));
  
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <h2 className="text-3xl font-bold">Premium Bus Skins</h2>
        <div className="relative">
          <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"></i>
          <input 
            type="text" 
            placeholder="Search skins..." 
            className="w-full lg:w-80 pl-12 pr-4 py-3 glass rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {filtered.map(skin => (
          <SkinCard key={skin.id} skin={skin} />
        ))}
      </div>
    </div>
  );
};

const SkinCard: React.FC<{ skin: Skin }> = ({ skin }) => {
  const [verified, setVerified] = useState(false);
  const [input, setInput] = useState('');

  return (
    <div className="glass rounded-[2rem] overflow-hidden group hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500 border border-white/5">
      <div className="h-56 overflow-hidden relative">
        <img src={skin.imageUrl} alt={skin.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
        <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase text-emerald-400">
          Verified
        </div>
      </div>
      <div className="p-8 space-y-4">
        <div>
          <h3 className="text-xl font-bold">{skin.title}</h3>
          <p className="text-sm text-gray-500 font-medium">Route: {skin.route}</p>
          <p className="text-[10px] text-gray-600 mt-1 uppercase">Author: {skin.author}</p>
        </div>

        {!verified ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-gray-500 uppercase tracking-tighter">
              <span>Security Code</span>
              <span className="text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded">{skin.code}</span>
            </div>
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="Enter code" 
                className="flex-grow bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-emerald-500"
                value={input}
                onChange={(e) => setInput(e.target.value.toUpperCase())}
              />
              <button 
                onClick={() => input === skin.code ? setVerified(true) : alert('Wrong Code!')}
                className="px-4 py-2 bg-emerald-500 text-white rounded-xl text-sm font-bold"
              >
                Verify
              </button>
            </div>
          </div>
        ) : (
          <div className="flex gap-3">
            <button className="flex-grow py-3 bg-white/10 hover:bg-emerald-500 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2">
              <i className="fas fa-download"></i> Paint
            </button>
            <button className="flex-grow py-3 bg-white/10 hover:bg-emerald-500 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2">
              <i className="fas fa-download"></i> Glass
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const Leaderboard: React.FC = () => (
  <div className="space-y-8 animate-in fade-in duration-500">
    <div className="text-center space-y-2">
      <h2 className="text-3xl font-bold">July 2025 Leaderboard</h2>
      <p className="text-gray-500">Top contributors based on trip attendance</p>
    </div>
    
    <div className="glass rounded-3xl overflow-hidden border border-white/5">
      <table className="w-full text-left">
        <thead className="bg-white/5">
          <tr>
            <th className="px-8 py-5 text-sm font-bold uppercase text-gray-400">Rank</th>
            <th className="px-8 py-5 text-sm font-bold uppercase text-gray-400">Player</th>
            <th className="px-8 py-5 text-sm font-bold uppercase text-gray-400 text-center">Trips</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {[
            { rank: '🥇 1', name: 'Shovo Mahin', id: 'Shovo449', count: 24 },
            { rank: '🥈 2', name: 'RidoyDn', id: 'RidoyDn', count: 23 },
            { rank: '🥉 3', name: 'Mayazz', id: 'Mayazz', count: 17 },
          ].map(p => (
            <tr key={p.id} className="hover:bg-white/5 transition-colors">
              <td className="px-8 py-5 font-bold">{p.rank}</td>
              <td className="px-8 py-5">
                <div className="font-semibold">{p.name}</div>
                <div className="text-xs text-gray-500">{p.id}</div>
              </td>
              <td className="px-8 py-5 text-center font-mono text-emerald-400">{p.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const TripRules: React.FC = () => (
  <div className="space-y-12 animate-in fade-in duration-500">
    <div className="text-center space-y-2">
      <h2 className="text-3xl font-bold">Official Trip Schedule</h2>
      <p className="text-gray-500 font-bengali">অফিসিয়াল মাল্টিপ্লেয়ার ট্রিপ রুলস ও সময়সূচী</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[
        { time: '03:30 PM', master: 'Sakil', id: 'SAKIL_ISLAM' },
        { time: '07:30 PM', master: 'Raiyan', id: 'RaiyanB' },
        { time: '09:15 PM', master: 'Imroz', id: 'IMROZ' },
        { time: '10:30 PM', master: 'Fuad', id: 'DespicableFuad' },
        { time: '12:00 AM', master: 'Badhon', id: 'Badhon117' },
        { time: '01:15 AM', master: 'Raju', id: 'RajuAhmed' },
      ].map(t => (
        <div key={t.id} className="glass p-6 rounded-3xl border border-white/5 flex items-center justify-between group hover:border-emerald-500/50 transition-all">
          <div className="space-y-1">
            <p className="text-2xl font-black text-white">{t.time}</p>
            <p className="text-xs text-gray-500 uppercase font-bold tracking-widest">{t.master}</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-emerald-500">
            <i className="fas fa-clock text-xl"></i>
          </div>
        </div>
      ))}
    </div>

    <div className="glass p-8 rounded-[2rem] space-y-6">
       <h3 className="text-xl font-bold flex items-center gap-3">
         <i className="fas fa-scroll text-emerald-500"></i>
         Group Rules (নিয়মাবলী)
       </h3>
       <ul className="space-y-4 font-bengali text-gray-400 list-disc list-inside">
         <li>ট্রিপ মাস্টারের কথামতো চলতে হবে।</li>
         <li>লেন চেঞ্জ করার সময় ইন্ডিকেটর লাইট ব্যবহার বাধ্যতামূলক।</li>
         <li>অফিসিয়াল স্কিন সেট করে ট্রিপে জয়েন করতে হবে।</li>
         <li>জরুরী কারণ ছাড়া অতিরিক্ত মেসেজ বা অযথা হর্ণ সম্পূর্ণ নিষিদ্ধ।</li>
       </ul>
    </div>
  </div>
);

const Tournament: React.FC = () => (
  <div className="text-center py-20 glass rounded-[3rem] animate-in fade-in duration-500">
    <div className="w-24 h-24 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
      <i className="fas fa-trophy text-4xl text-emerald-500 animate-pulse"></i>
    </div>
    <h2 className="text-4xl font-black mb-4">Season 3 Coming Soon</h2>
    <p className="text-gray-500 max-w-md mx-auto">
      The ultimate competition is preparing its engines. Stay tuned for the official announcement and registrations.
    </p>
  </div>
);

const AboutUs: React.FC = () => (
  <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in duration-500">
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-center">Our History</h2>
      <div className="glass p-8 rounded-[2rem] leading-relaxed text-gray-400">
        <p>This group was created by <b className="text-emerald-500">BSBD OFFICIALS</b> in 2021. Originally known as ‘BSBD Multiplay’, the group was rebranded by Raju Ahmed and has since grown into a community of 100+ active members participating in 6 daily trips.</p>
      </div>
    </div>

    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-center">Admin Panel</h2>
      <div className="flex justify-center">
        <div className="glass p-6 rounded-3xl w-64 text-center">
          <div className="w-20 h-20 bg-white/5 rounded-full mx-auto mb-4 overflow-hidden border-2 border-emerald-500">
            <img src="https://placehold.co/200x200/1e293b/white?text=Raju" alt="Raju" />
          </div>
          <h4 className="font-bold">Raju Ahmed</h4>
          <p className="text-xs text-gray-500">Admin, BSBDOMG</p>
        </div>
      </div>
    </div>
  </div>
);

export default App;
