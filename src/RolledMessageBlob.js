import React, { useState, useEffect, useRef } from 'react';
import './RolledMessageBlob.css';

import cloudImage from './icons/cute-cloud.png';

import aestheticBg from './icons/aesthetic-bg.jpeg';

export default function RolledMessageBlob() {
  const [isOpen, setIsOpen] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const messageRef = useRef(null);

  const personalMessage = `Hie Priyansh <3
I hope this is not too much for you but aww I just wanted to say that I really love you,
Every part of me still smiles (sometimes sad) when you comes up in my mind, like a muscle memory. 
Though we are not together anymore, I still cherish every moment we spent together. 
(in the washroom lmao).
Even now, when I talk about love, It's your eyes I remember first. The depth damn.. near made me drown.
We didn't end because we didn't love. We just couldn't keep up with how much we did. (conspiracy theory i cooked lol)
But damn, you were magic. You still are. Ok, I'll stop writing now because I know you don't like reading too much, especially when it's written by me. 
With a smile, Your once-upon-a-time.
-Priya`;

  const handleClick = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setTimeout(() => {
        setShowContent(true);
      }, 400);
    } else {
      setShowContent(false);
    }
  };

  useEffect(() => {
    if (!isOpen) {
      setShowContent(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (showContent && messageRef.current) {
      const words = messageRef.current.querySelectorAll('.message-word');
      words.forEach(word => {
        word.style.animation = 'none';
        
        void word.offsetWidth; 
        word.style.animation = null;
      });
    }
  }, [showContent]);

  return (
    <div className="blob-container">
      {/* MODIFIED: Added message-blob-trigger class */}
      <div className={`touch-here-text ${isOpen ? 'hidden' : ''} message-blob-trigger`}>Hey! Click Me Babe :3</div>

      {/* MODIFIED: Added message-blob-trigger class */}
      <div
        className={`cloud-blob ${isOpen ? 'hidden' : ''} message-blob-trigger`}
        onClick={handleClick}
      >
        <img src={cloudImage} alt="Cute Cloud" className="cloud-image" />
      </div>

      <div className={`rolled-message-wrapper ${isOpen ? 'open' : ''}`}>
        <div className="rolled-message-content">
          <img src={aestheticBg} alt="Aesthetic Background" className="aesthetic-bg-image" />

          <div className={`personal-text-overlay ${showContent ? 'visible' : ''}`} ref={messageRef}>
            {personalMessage.split('\n').map((line, lineIndex) => (
              <p key={lineIndex} className="message-line">
                {line.split(' ').map((word, wordIndex) => (
                  <span
                    key={`${lineIndex}-${wordIndex}`}
                    className="message-word"
                    style={{ '--word-animation-delay': `${wordIndex * 0.08}s` }}
                  >
                    {word}&nbsp;
                  </span>
                ))}
              </p>
            ))}
          </div>

          <button className="close-button" onClick={handleClick}>
            &times;
          </button>
        </div>
      </div>
    </div>
  );
}