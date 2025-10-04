import React, { useEffect, useState } from 'react';
import Header from './Header';

const Layout = ({ children }) => {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const generateStars = () => {
      const starArray = [];
      const numStars = 150;

      for (let i = 0; i < numStars; i++) {
        const star = {
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 3 + 1,
          opacity: Math.random() * 0.8 + 0.2,
          twinkleDelay: Math.random() * 5,
          duration: 2 + Math.random() * 3,
        };
        starArray.push(star);
      }
      setStars(starArray);
    };

    generateStars();
  }, []);

  return (
    <div className="layout">
      <div className="starfield">
        {stars.map((star) => (
          <div
            key={star.id}
            className="star"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              animationDelay: `${star.twinkleDelay}s`,
              animationDuration: `${star.duration}s`,
            }}
          />
        ))}
      </div>
      <div className="grid-overlay" />

      <div className="content">
        <Header />
        {children}
      </div>
    </div>
  );
};

export default Layout;
