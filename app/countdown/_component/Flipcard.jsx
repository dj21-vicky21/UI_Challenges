import { useEffect, useState } from 'react';

function SingleFlip({ digit }) {
  const [animation, setAnimation] = useState(false);
  const [currentDigit, setCurrentDigit] = useState(digit);
  const [nextDigit, setNextDigit] = useState(digit);

  useEffect(() => {
    if (digit !== currentDigit) {
      setAnimation(true);
      setNextDigit(digit);

      const timer = setTimeout(() => {
        setAnimation(false);
        setCurrentDigit(digit);
      }, 750);

      return () => clearTimeout(timer);
    }
  }, [digit, currentDigit]);

  return (
    <div className="relative w-20 h-28 md:w-28 md:h-36 perspective">
      {/* Static Card */}
      <div className="relative w-full h-full preserve-3d">
        {/* Top Half */}
        <div className="absolute top-0 w-full h-1/2 bg-[#2C2C44] rounded-t-lg overflow-hidden border-b border-black/20">
          <div className="absolute bottom-0 w-full text-center text-[#FB5E84] font-mono text-4xl md:text-5xl translate-y-1/2">
            {animation ? nextDigit : currentDigit}
          </div>
        </div>
        
        {/* Bottom Half */}
        <div className="absolute bottom-0 w-full h-1/2 bg-[#34364F] rounded-b-lg overflow-hidden">
          <div className="absolute top-0 w-full text-center text-[#FB5E84] font-mono text-4xl md:text-5xl -translate-y-1/2">
            {animation ? currentDigit : nextDigit}
          </div>
        </div>

        {/* Flipping Top Half */}
        <div 
          className={`absolute top-0 w-full h-1/2 bg-[#2C2C44] rounded-t-lg overflow-hidden preserve-3d perspective origin-bottom shadow-lg
            ${animation ? 'animate-flipTop' : 'hidden'}`}
        >
          <div className="absolute bottom-0 w-full text-center text-[#FB5E84] font-mono text-4xl md:text-5xl translate-y-1/2 backface-hidden">
            {currentDigit}
          </div>
          <div className="absolute bottom-0 w-full text-center text-[#FB5E84] font-mono text-4xl md:text-5xl translate-y-1/2 rotate-x-180 backface-hidden">
            {nextDigit}
          </div>
        </div>

        {/* Flipping Bottom Half */}
        <div 
          className={`absolute bottom-0 w-full h-1/2 bg-[#34364F] rounded-b-lg overflow-hidden preserve-3d  perspective origin-top shadow-lg
            ${animation ? 'animate-flipBottom' : 'hidden'}`}
        >
          <div className="absolute top-0 w-full text-center text-[#FB5E84] font-mono text-4xl md:text-5xl -translate-y-1/2 backface-hidden">
            {nextDigit}
          </div>
          <div className="absolute top-0 w-full text-center text-[#FB5E84] font-mono text-4xl md:text-5xl -translate-y-1/2 rotate-x-180 backface-hidden">
            {currentDigit}  
          </div>
        </div>

        {/* Side Shadows */}
        <div className="absolute left-0 top-1/2 w-[2px] h-1/2 bg-black/10 rounded-bl-lg"></div>
        <div className="absolute right-0 top-1/2 w-[2px] h-1/2 bg-black/10 rounded-br-lg"></div>
      </div>
    </div>
  );
}

export default function Flipcard({ remaining, label }) {
  const digits = remaining.toString().padStart(2, '0').split('');
  
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex gap-3">
        <SingleFlip digit={digits[0]} />
        <SingleFlip digit={digits[1]} />
      </div>
      <span className="uppercase text-[#8385A9] tracking-[0.3em] text-sm font-medium">
        {label}
        {remaining !== 1 ? 's' : ''}
      </span>
    </div>
  );
}
