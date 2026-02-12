
import React from 'react';

interface NoticeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NoticeModal: React.FC<NoticeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-md animate-fadeIn" 
        onClick={onClose}
      />
      <div className="relative glass bg-gray-900/90 w-full max-w-md p-8 rounded-3xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] transform animate-scaleUp">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
        >
          <i className="fas fa-times text-xl"></i>
        </button>

        <div className="text-center space-y-6">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-orange-500/20 rounded-full mb-2">
            <i className="fas fa-exclamation-triangle text-orange-500 text-4xl animate-bounce"></i>
          </div>
          
          <h2 className="text-2xl font-bold text-white">NOTICE!</h2>
          
          <div className="h-0.5 w-16 bg-green-500 mx-auto rounded-full"></div>
          
          <p className="text-gray-400 leading-relaxed">
            This site is currently <span className="text-white font-semibold">under construction</span>. Some features may be limited or unavailable. 
            We appreciate your patience while we build a better experience for the community.
          </p>
          
          <p className="text-sm font-bold text-green-500 tracking-widest">#BSBDOMG</p>
          
          <button 
            onClick={onClose}
            className="w-full py-4 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold shadow-lg shadow-green-900/20 transition-all active:scale-95"
          >
            I UNDERSTAND
          </button>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scaleUp {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-scaleUp {
          animation: scaleUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}} />
    </div>
  );
};

export default NoticeModal;
