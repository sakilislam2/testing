
import React from 'react';
import { SOCIAL_LINKS } from '../constants';

const SocialGrid: React.FC = () => {
  return (
    <div className="w-full glass p-8 rounded-3xl border border-white/5 space-y-6 shadow-2xl">
      <h3 className="text-xl font-semibold text-center text-white/90 relative">
        Connect With Us
        <span className="block w-12 h-1 bg-green-500 mx-auto mt-2 rounded-full"></span>
      </h3>
      <div className="flex flex-wrap justify-center gap-8 md:gap-12">
        {SOCIAL_LINKS.map((social, idx) => (
          <a
            key={idx}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex flex-col items-center gap-3 group transition-all duration-300 ${social.color}`}
          >
            <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-white/10 group-hover:-translate-y-2 transition-all duration-300">
              <i className={`${social.icon} text-2xl`}></i>
            </div>
            <span className="text-xs font-medium text-gray-400 group-hover:text-inherit">
              {social.name}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default SocialGrid;
