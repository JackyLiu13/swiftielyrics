import React, { useState, useEffect } from 'react';

const Timer = ({ onTimeUp, difficulty }) => {
  const [timeLeft, setTimeLeft] = useState(getInitialTime());
  
  function getInitialTime() {
    switch(difficulty) {
      case 'easy': return 45;
      case 'medium': return 30;
      case 'hard': return 15;
      default: return 30;
    }
  }

  useEffect(() => {
    if (timeLeft === 0) {
      onTimeUp();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onTimeUp]);

  return (
    <div className="text-xl border-2 border-black p-4 bg-white shadow-brutal">
      Time: {timeLeft}s
    </div>
  );
};

export default Timer; 