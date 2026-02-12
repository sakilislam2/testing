
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Hero from './components/Hero';
import NoticeModal from './components/NoticeModal';
import SocialGrid from './components/SocialGrid';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [visitorCount, setVisitorCount] = useState<number>(0);

  useEffect(() => {
    // Simulate visitor count logic based on the original Firebase concept
    const count = parseInt(localStorage.getItem('fakeVisitorCount') || '1248');
    const hasVisited = sessionStorage.getItem('hasVisited');
    
    if (!hasVisited) {
      const newCount = count + 1;
      localStorage.setItem('fakeVisitorCount', newCount.toString());
      sessionStorage.setItem('hasVisited', 'true');
      setVisitorCount(newCount);
    } else {
      setVisitorCount(count);
    }
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Background Image with Overlay */}
      <div 
        className="fixed inset-0 z-[-1] bg-cover bg-center transition-all duration-700"
        style={{ 
          backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.8)), url('https://picsum.photos/1920/1080?grayscale&blur=2')` 
        }}
      ></div>

      {/* Top Marquee */}
      <div className="fixed top-0 w-full z-40 bg-black/40 backdrop-blur-md py-2 border-b border-white/5 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap text-orange-400 font-bengali text-sm md:text-base px-4">
          ** এই ওয়েবসাইটের কোনো লেখা, ছবি কিংবা স্কিন বিনা অনুমতিতে ব্যবহার করলে আইনানুগ ব্যবস্থা গ্রহণ করা হবে। 
          <span className="mx-8 font-sans">** Legal action will be taken if any text, picture or skin on this website is used without permission. **</span>
        </div>
      </div>

      {/* Sidebar Toggle */}
      <button 
        onClick={() => setIsSidebarOpen(true)}
        className="fixed top-12 left-6 z-50 p-3 bg-white/10 hover:bg-white/20 glass rounded-full transition-all duration-300 shadow-xl"
      >
        <i className="fas fa-bars text-xl"></i>
      </button>

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <main className="flex-grow pt-24 px-4 flex flex-col items-center justify-center space-y-12">
        <Hero />
        
        <section className="w-full max-w-4xl space-y-8 animate-fadeIn">
          <div className="text-center space-y-4">
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white drop-shadow-lg">
              WELCOME TO BSBDOMG OFFICIAL SITE!
            </h1>
            <p className="text-gray-300 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed">
              Official website of Bus Simulator Bangladesh Official Multiplayer Group. 
              Serving resources, community updates, and game skins in one place.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="https://forms.gle/K87fHr2StxKTN9P86" 
              target="_blank" 
              className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-lg hover:scale-105 transition-transform duration-200"
            >
              Join Us
            </a>
            <a 
              href="#" 
              className="px-8 py-3 bg-transparent border-2 border-white/50 hover:border-white text-white font-semibold rounded-lg glass hover:bg-white/10 transition-all duration-200"
            >
              See Top Players!
            </a>
          </div>

          <SocialGrid />
        </section>
      </main>

      <Footer visitorCount={visitorCount} />
      
      <NoticeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 1s ease-out forwards;
        }
      `}} />
    </div>
  );
};

export default App;
