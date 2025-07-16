import React, { useState } from 'react';
import './FortuneCookie.css';

import rolledCookieImage from './icons/cookie.png'; 
import unrolledBackgroundImage from './icons/fortune.jpeg'; 

export default function FortuneCookie() {
  const messages = [
    "Your kitty has baked some Fortune Cookies to lead you to your destiny! Click her to reveal what your Stars say;)<br />(BONUS TIP: Spam click the kitty for more fun)", // Initial message
    "Your fortune says: You miss me. All the time.",
    "Stars aligned, Mr. Scorpio. Text me before I move on to your hotter twin.",
    "This cookie predicts: You'll fall harder with me this time.",
    "The Sun is in Mercury and Venus is in your 7th house. Basically, I am the one. xoxo",
    "Your Stars say you're still obsessed. (a lil correction, it's me)",
    "Scorpio pride won't warm your bed. Only a Sagittarius can do that.",
    "Your aura says: Emotionally Constipated. Only I'm the cure.",
    "Woopsss! This cookie's spicy… just like the love you lost.",
    "The divine cosmic forces say: You'll glow up after you make me your wife.",
    "Your Oracle says: You need to stop being a Scorpio and start being my husband.",
    "Your Oracle Cards says that your lucky number is: MINE. Call me dumbass."
  ];

  
  const [messageIndex, setMessageIndex] = useState(0); 
  const [currentMessage, setCurrentMessage] = useState(messages[0]); 
  const [messageTextVisible, setMessageTextVisible] = useState(true);

  const handleClick = () => {
    setMessageTextVisible(false); 

    setTimeout(() => {
      
      const nextIndex = (messageIndex + 1) % messages.length;
      setMessageIndex(nextIndex); 
      setCurrentMessage(messages[nextIndex]); 

      setMessageTextVisible(true); 
    }, 300); 
  };

  return (
    <div className="fortune-cookie-container" style={{ backgroundImage: `url(${unrolledBackgroundImage})` }}>
      <img src={rolledCookieImage} alt="Rolled Fortune Cookie" className="rolled-cookie-image" onClick={handleClick} />
      
      <div 
        className={`fortune-message ${messageTextVisible ? 'visible' : ''}`}
        dangerouslySetInnerHTML={{ __html: currentMessage }}
      ></div>
    </div>
  );
}