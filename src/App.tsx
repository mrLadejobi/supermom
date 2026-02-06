import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import './App.css';

const FloatingHearts = () => {
  const hearts = Array.from({ length: 20 });
  return (
    <div className="hearts-container">
      {hearts.map((_, i) => (
        <div key={i} className="floating-heart" style={{ left: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 6}s`, fontSize: `${Math.random() * 20 + 15}px` }}>❤️</div>
      ))}
    </div>
  );
};

export default function App() {
  const [step, setStep] = useState<'login' | 'scrapbook' | 'accepted'>('login');
  const [nameInput, setNameInput] = useState('');
  const [choice, setChoice] = useState('');
  const audioRef = useRef<HTMLAudioElement>(null);

  const SECRET_NICKNAME = "Ena"; 

  const traits = [
    { text: "Absolute All-Rounder 🌟", color: "yellow" },
    { text: "Woman in Industry 💼", color: "blue" },
    { text: "Incredible Podcaster 🎙️", color: "pink" },
    { text: "Avid Reader 📚", color: "green" },
    { text: "Fun Lover 💃", color: "purple" },
    { text: "Those Beautiful Eyes... 👀", color: "yellow" },
    { text: "The Warmest Heart ❤️", color: "pink" }
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (nameInput.toLowerCase().trim() === SECRET_NICKNAME.toLowerCase()) setStep('scrapbook');
    else alert("Access Denied! ❌");
  };

  const handleSelection = (text: string) => {
    setChoice(text);
    setStep('accepted');
    if (audioRef.current) {
      audioRef.current.volume = 0.4;
      audioRef.current.play();
    }
  };

  return (
    <div className="container" style={{ justifyContent: step === 'scrapbook' ? 'flex-start' : 'center' }}>
      <audio ref={audioRef} src="/ordinary.mp3" loop />

      <AnimatePresence mode="wait">
        {step === 'login' && (
          <motion.div key="login" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <p style={{color: '#fda4af', letterSpacing: '2px'}}>A MESSAGE FOR MY FAVORITE PERSON:</p>
            <form onSubmit={handleLogin}>
              <input type="text" value={nameInput} onChange={(e) => setNameInput(e.target.value)} className="login-input" placeholder="Enter Nickname..." autoFocus />
            </form>
          </motion.div>
        )}

        {step === 'scrapbook' && (
          <motion.div key="scrapbook" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="wall-container">
            <header style={{ width: '100%', marginBottom: '40px' }}>
              <h1 style={{ color: '#e11d48', fontSize: '3rem' }}>For {nameInput}</h1>
              <p style={{ color: '#be123c', fontStyle: 'italic' }}>I made this because you're one of one...</p>
            </header>

            {traits.map((trait, i) => (
              <React.Fragment key={i}>
                <motion.div initial={{ scale: 0, rotate: -10 }} animate={{ scale: 1 }} transition={{ delay: i * 0.1 }} className={`post-it ${trait.color}`}>
                  {trait.text}
                </motion.div>
                {i === 2 && <div className="polaroid"><img src="/img1.jpg" alt="Memory 1" /></div>}
                {i === 5 && <div className="polaroid"><img src="/img2.jpg" alt="Memory 2" /></div>}
              </React.Fragment>
            ))}

            <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1 }} className="ask-card">
              <p style={{ fontSize: '1.1rem', marginBottom: '20px', color: '#64748b' }}>
                You're the busiest woman in industry I know, but I'd love it if you took some time for me.
              </p>
              <h2 style={{ fontSize: '2rem', color: '#e11d48', marginBottom: '30px' }}>Will you be my Valentine?</h2>
              
              <div className="options-group">
                <button onClick={() => handleSelection("Yes, definitely! ❤️")} className="option-btn">Yes, definitely! ❤️</button>
                <button onClick={() => handleSelection("Yes, but I pick the podcast! 🎙️")} className="option-btn">Yes, but I pick the podcast! 🎙️</button>
                <button onClick={() => handleSelection("Yes, obviously! 🙄")} className="option-btn">Yes, obviously! 🙄</button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {step === 'accepted' && (
          <motion.div key="accepted" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
            <Confetti numberOfPieces={150} colors={['#e11d48', '#fb7185', '#ffffff']} />
            <FloatingHearts />
            
            <div className="invite-card">
              <p style={{color: '#94a3b8', fontSize: '0.8rem', letterSpacing: '3px'}}>FORMAL ACCEPTANCE RECEIVED</p>
              <h1 style={{color: '#e11d48', fontSize: '2.5rem', margin: '20px 0'}}>It's a Date!</h1>
              
              <img src="/celebration.jpg" style={{ width: '100%', height: '250px', objectFit: 'cover', margin: '10px 0' }} />
              
              <div className="date-details">
                <span>Feb 14, 2026</span>
                <span>•</span>
                <span>All Day</span>
              </div>

              <p style={{color: '#475569', lineHeight: '1.6'}}>
                I can't wait to make more memories with the woman who does it all. 
                Whether we're on a call or just texting, it's my favorite way to spend time.
              </p>

              <div className="signature">See you then, {nameInput}</div>
              <p style={{fontSize: '0.8rem', color: '#cbd5e1', marginTop: '20px'}}>Selection: "{choice}"</p>
            </div>
            <p className="listening-text">Listening to: Ordinary - Alex Warren</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}