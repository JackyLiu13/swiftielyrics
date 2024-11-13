import React from 'react';

const TimerBar = ({ timeLeft, maxTime }) => {
  const percentage = (timeLeft / maxTime) * 100;
  
  return (
    <div className="w-full h-4 bg-gray-200 border-2 border-black shadow-brutal">
      <div 
        className="h-full bg-pink-400 transition-all duration-1000"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};

export default TimerBar; 