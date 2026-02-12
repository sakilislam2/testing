
import React from 'react';

interface FooterProps {
  visitorCount: number;
}

const Footer: React.FC<FooterProps> = ({ visitorCount }) => {
  return (
    <footer className="mt-auto w-full py-12 flex flex-col items-center justify-center space-y-4 text-gray-500 text-sm border-t border-white/5 bg-black/20 backdrop-blur-sm">
      <div className="flex items-center gap-2">
        <i className="fas fa-chart-line text-green-500"></i>
        <span>Total Unique Visitors: <span className="text-white font-mono font-bold tracking-tighter">{visitorCount.toLocaleString()}</span></span>
      </div>
      <div className="text-center px-4">
        <p className="font-medium text-gray-400">&copy; 2025 BSBDOMG | Official Multiplayer Group</p>
        <p className="text-[10px] mt-1 tracking-widest uppercase opacity-50">Authorized by Admin Panel</p>
      </div>
    </footer>
  );
};

export default Footer;
