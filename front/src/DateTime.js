// DateTime.js

import React, { useState, useEffect } from 'react';
import './DateTime.css'; 

const DateTime = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  // 1초마다 현재 시간을 업데이트한다.

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  
  const english = {

    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric'



  };

  return (
    <p className="date">{currentDateTime.toLocaleString('en-US', english)}</p>
  );
};

export default DateTime;
