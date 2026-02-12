
import React from 'react';
import { NAV_LINKS } from '../constants';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/60 z-[60] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className={`fixed top-0 left-0 h-full w-72 bg-gray-950 z-[70] shadow-2xl transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 flex justify-between items-center border-b border-white/10">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                <i className="fas fa-bus text-white"></i>
             </div>
             <span className="font-bold text-lg tracking-wider">BSBDOMG</span>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <i className="fas fa-arrow-left text-xl"></i>
          </button>
        </div>

        <nav className="mt-8 px-4 space-y-2">
          {NAV_LINKS.map((link, idx) => (
            <a
              key={idx}
              href={link.url}
              className="flex items-center gap-4 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-all duration-200 group"
            >
              <i className={`${link.icon} text-lg group-hover:scale-110 transition-transform`}></i>
              <span className="font-medium">{link.name}</span>
            </a>
          ))}
        </nav>

        <div className="absolute bottom-8 left-0 w-full px-8 text-xs text-gray-500 text-center">
          BSBD Official Multiplayer Group<br/>© 2025 All rights reserved.
        </div>
      </div>
    </>
  );
};

export default Sidebar;
