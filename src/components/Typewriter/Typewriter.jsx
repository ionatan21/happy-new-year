import React, { useState, useEffect } from "react";
import "./Typewriter.css";

export function Typewriter({ message, speed = 150 }) {
  const [displayedText, setDisplayedText] = useState("");

  
  useEffect(() => {
    let currentCharIndex = 0;

    
    const interval = setInterval(() => {
      if (currentCharIndex < message.length) {
        const currentChar = message[currentCharIndex];

        setDisplayedText((prev) => {
          const updatedText = prev + currentChar;

          return updatedText;
        });

        currentCharIndex++;
      } else {
        clearInterval(interval);
      }
    }, speed);

    return () => {
      clearInterval(interval);
    };

    
  }, [message, speed]);

  return <div className="message"><p>{displayedText}</p></div>;
}
