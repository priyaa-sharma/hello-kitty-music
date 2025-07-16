import React, { useEffect } from 'react';
import './App.css';
import FloatingPlayer from './FloatingPlayer';
import RolledMessageBlob from './RolledMessageBlob';
import AnimatedCharacter from './AnimatedCharacter';
import Mymelody from './mymelody';
import FortuneCookie from './FortuneCookie';

function App() {
 
  useEffect(() => {
    document.documentElement.style.setProperty('--custom-cursor-url', `url(${process.env.PUBLIC_URL}/cursor.png)`);
  }, []); 

  return (
    <div className="App">
      {/* Title*/}
      <div style={{
        position: 'absolute',
        top: '16px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 100,
        textAlign: 'center',
        color: '#ff69b4',
        fontFamily: 'Comic Sans MS',
        fontSize: '2.5rem',
        fontWeight: 'bold',
        textShadow: '2px 2px 4px rgba(255, 255, 255, 0.7)',
        width: '100%',
        maxWidth: '800px',
      }}>
        For You, To You
        <div style={{
          fontSize: '1rem',
          fontWeight: 'normal',
          marginTop: '-2px',
          color: '#e05090',
          textShadow: '1px 1px 2px rgba(255, 255, 255, 0.5)',
        }}>
          12 songs for you, same time next year, yeah?
        </div>
      </div>

      {/* RolledMessageBlob  */}
      <RolledMessageBlob />

      {/* FloatingPlayer*/}
      <FloatingPlayer />

      {/* Hello kitty*/}
      <div style={{
        position: 'absolute',
        right: '60px',
        top: '60px',
        zIndex: 20,
      }}>
        <AnimatedCharacter />
      </div>

      {/* Mymelody  */}
      <div style={{
        position: 'absolute',
        left: '35px',
        top: '10px',
        zIndex: 20,
      }}>
        <Mymelody />
      </div>

      {/* FortuneCookie */}
      <div style={{
        position: 'absolute',
        right: '33px',
        top: '365px',
        zIndex: 20,
      }}>
        <FortuneCookie />
      </div>
    </div>
  );
}

export default App;
