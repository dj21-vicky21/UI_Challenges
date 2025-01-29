"use client";

import { useEffect, useState, useRef } from "react";
import { StarsBackground } from "./_component/star-bg";
import { calculateTimeLeft } from "@/lib/utils";
import { FaFacebook, FaGoogle, FaInstagram } from "react-icons/fa";
import Flipcard from "./_component/Flipcard";

export default function Countdown() {
  const targetDate = useRef(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)); // Set target date only once ( 8days )
  const [timeLeft, setTimeLeft] = useState(() =>
    calculateTimeLeft(targetDate.current)
  );
  const [previousTime, setPreviousTime] = useState(timeLeft);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft(targetDate.current);
      setPreviousTime(timeLeft); // Store the current timeLeft as previousTime
      setTimeLeft(newTimeLeft);

      // Stop the timer if countdown ends
      if (
        newTimeLeft.days === 0 &&
        newTimeLeft.hours === 0 &&
        newTimeLeft.minutes === 0 &&
        newTimeLeft.seconds === 0
      ) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer); // Cleanup on component unmount
  }, [timeLeft]); // Run effect whenever `timeLeft` changes

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      <StarsBackground />
      <div className="relative flex flex-col items-center gap-20 p-4">
        <h1 className="text-white text-2xl tracking-[0.3em] text-center">
          {"WE'RE LAUNCHING SOON"}
        </h1>``
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          <Flipcard remaining={timeLeft.days} label={"Day"}/>
          <Flipcard remaining={timeLeft.hours} label={"Hour"}/>
          <Flipcard remaining={timeLeft.minutes} label={"Minute"}/>
          <Flipcard remaining={timeLeft.seconds} label={"Second"}/>
        </div>
        <div className="flex gap-8">
          <a
            href="#"
            className="text-[#8385A9] hover:text-[#FB5E84] transition-colors"
            aria-label="Facebook"
          >
            <FaFacebook className="w-6 h-6" />
          </a>
          <a
            href="#"
            className="text-[#8385A9] hover:text-[#FB5E84] transition-colors"
            aria-label="Pinterest"
          >
            <FaGoogle className="w-6 h-6" />
          </a>
          <a
            href="#"
            className="text-[#8385A9] hover:text-[#FB5E84] transition-colors"
            aria-label="Instagram"
          >
            <FaInstagram className="w-6 h-6" />
          </a>
        </div>
      </div>
    </div>
  );
}
