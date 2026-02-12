
import React, { useState, useEffect } from 'react';
import { TARGET_DATE } from '../constants';
import { CountdownTime } from '../types';

const Hero: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<CountdownTime>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(TARGET_DATE) - +new Date();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft();
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full text-center space-y-6">
      <div className="inline-block px-4 py-1.5 glass rounded-full text-green-400 font-medium text-sm tracking-widest uppercase mb-4 animate-pulse">
        Development in progress
      </div>
      <h2 className="text-4xl md:text-7xl font-black text-white drop-shadow-2xl">
        COMING SOON<span className="text-green-500">.</span>
      </h2>
      <p className="text-gray-400 text-lg">Our main portal is under construction. Launching in:</p>
      
      <div className="flex flex-wrap justify-center gap-4 md:gap-8 mt-4">
        {[
          { label: 'Days', value: timeLeft.days },
          { label: 'Hours', value: timeLeft.hours },
          { label: 'Minutes', value: timeLeft.minutes },
          { label: 'Seconds', value: timeLeft.seconds },
        ].map((item, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <div className="w-20 h-20 md:w-28 md:h-28 glass rounded-2xl flex items-center justify-center text-3xl md:text-5xl font-bold text-white mb-2 shadow-2xl border border-white/10">
              {String(item.value).padStart(2, '0')}
            </div>
            <span className="text-gray-500 text-xs md:text-sm font-semibold uppercase tracking-widest">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hero;
