import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import './App.css';

// Component for the drifting hearts after she says Yes
const FloatingHearts = () => {
  const hearts = Array.from({ length: 15 });
  return (
    <div className="hearts-container">
      {hearts.map((_, i) => (
        <div
          key={i}
          className="floating-heart"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            fontSize: `${Math.random() * 20 + 15}px`
          }}
        >
          ❤️
        </div>
      ))}
    </div>
  );
};

export default function App() {
  const [step, setStep] = useState<'login' | 'scrapbook' | 'accepted'>('login');
  const [nameInput, setNameInput] = useState('');
  const audioRef = useRef<HTMLAudioElement>(null);

  const SECRET_NICKNAME = "Bubbles"; // Change this to your nickname!
  
  // List your image files here (they must be in the public folder)
  // If you don't have images yet, it will just show empty polaroids
  const photos = ['img1.jpg', 'img2.jpg', 'img3.jpg']; 

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (nameInput.toLowerCase().trim() === SECRET_NICKNAME.toLowerCase()) {
      setStep('scrapbook');
    } else {
      alert("Oops! That's not the name I call you. ❤️");
    }
  };

  const handleYes = () => {
    setStep('accepted');
    if (audioRef.current) {
      audioRef.current.volume = 0.4;
      audioRef.current.play();
    }
  };

  return (
    <div className="container">
      <audio ref={audioRef} src="/ordinary.mp3" loop />

      <AnimatePresence mode="wait">
        {/* SCREEN 1: LOGIN */}
        {step === 'login' && (
          <motion.div 
            key="login" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
          >
            <p style={{color: '#fda4af', letterSpacing: '2px', marginBottom: '10px'}}>IDENTIFY YOURSELF:</p>
            <form onSubmit={handleLogin}>
              <input 
                type="text" 
                value={nameInput} 
                onChange={(e) => setNameInput(e.target.value)} 
                className="login-input"
                placeholder="Nickname..."
                autoFocus
              />
            </form>
          </motion.div>
        )}

        {/* SCREEN 2: SCRAPBOOK */}
        {step === 'scrapbook' && (
          <motion.div 
            key="scrapbook" 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }}
            className="scrapbook-page"
          >
            <h2 style={{fontSize: '2rem', color: '#e11d48'}}>For {nameInput}...</h2>
            
            <div className="photo-gallery">
              {photos.map((src, i) => (
                <motion.div 
                  key={i} 
                  className="polaroid"
                  style={{ rotate: i % 2 === 0 ? '-3deg' : '3deg' }}
                  whileHover={{ rotate: 0, scale: 1.1, zIndex: 10 }}
                >
                  <img src={`/${src}`} alt="Memory" onError={(e) => {
                    // Fallback if image isn't found
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150?text=Us+❤️';
                  }} />
                </motion.div>
              ))}
            </div>

            <p style={{fontSize: '1.2rem', fontStyle: 'italic', marginBottom: '30px', color: '#881337'}}>
              "On a day where people are celebrating love, I want to celebrate 
              what we have together because it is truly special to me."
            </p>

            <h3 style={{fontSize: '1.8rem', marginBottom: '20px'}}>Will you be my Valentine?</h3>
            <button onClick={handleYes} className="btn-yes">YES ❤️</button>
          </motion.div>
        )}

        {/* SCREEN 3: ACCEPTED */}
        {step === 'accepted' && (
          <motion.div 
            key="accepted" 
            initial={{ opacity: 0, y: 50 }} 
            animate={{ opacity: 1, y: 0 }}
          >
            <Confetti 
              numberOfPieces={150}
              colors={['#e11d48', '#fb7185', '#ffffff']}
              drawShape={(ctx: CanvasRenderingContext2D) => {
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.bezierCurveTo(-5, -5, -10, 0, 0, 10);
                ctx.bezierCurveTo(10, 0, 5, -5, 0, 0);
                ctx.fill();
              }}
            />
            <FloatingHearts />
            
            <h1 className="celebration-text">Yay! ❤️</h1>
            
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3 }}
              style={{marginTop: '30px'}}
            >
              <img 
                  src="/celebration.jpg" 
                      style={{ width: '300px', borderRadius: '30px', boxShadow: '0 15px 45px rgba(225, 29, 72, 0.4)', border: '5px solid white' }} 
              />
              <p style={{fontSize: '1.5rem', fontWeight: 'bold', marginTop: '20px', color: '#be123c'}}>
                I'm so happy! 🥰
              </p>
              <p style={{color: '#fda4af', marginTop: '10px'}}>Listening to: Ordinary - Alex Warren</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}