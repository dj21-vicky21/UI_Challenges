import React, { useState, useEffect } from "react";

export function StarsBackground({ starCount = 50 }) {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const generatedStars = Array.from({ length: starCount }).map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 5}s`,
    }));
    setStars(generatedStars);
  }, [starCount]);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Background color */}
      <div className="absolute inset-0 bg-[#1E1F29]" />

      {/* Stars */}
      {stars.map((star, index) => (
        <div
          key={index}
          className="absolute w-1 h-1 bg-white/20 rounded-full animate-twinkle"
          style={{
            top: star.top,
            left: star.left,
            animationDelay: star.animationDelay,
          }}
        />
      ))}

      {/* SVG Wave */}
      <Wave />
    </div>
  );
}

// Wave component for better modularity
function Wave() {
  return (
    <div className="absolute bottom-0 left-0 right-0">
      <svg
        viewBox="0 0 1440 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
        preserveAspectRatio="none"
      >
        <path
          d="M0 200L360 150L720 200L1080 150L1440 200V0L1080 50L720 0L360 50L0 0V200Z"
          fill="#2F2439"
        />
      </svg>
    </div>
  );
}
