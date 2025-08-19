'use client';

import { useEffect } from 'react';

export default function KlowdeLandingPage() {
  useEffect(() => {
    // Initialize the interactive elements after component mounts
    const initPage = () => {
      let currentStep = 1;
      const storySteps = document.querySelectorAll('.story-step');
      const progressBar = document.getElementById('progressBar') as HTMLElement;
      const cube = document.querySelector('.nav-cube') as HTMLElement;
      const brain = document.querySelector('.brain-emoji') as HTMLElement;
      
      // Update scroll progress
      const updateProgress = () => {
        const scrollTop = window.pageYOffset;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;
        if (progressBar) {
          progressBar.style.height = scrollPercent + '%';
        }
      };

      // Update scroll progress tracking
      const updateScrollProgress = () => {
        const scrollTop = window.pageYOffset;
        const windowHeight = window.innerHeight;
        
        // Calculate which step should be active based on scroll position
        storySteps.forEach((step, index) => {
          const rect = step.getBoundingClientRect();
          const viewportCenter = windowHeight / 2;
          
          if (Math.abs(rect.top + rect.height / 2 - viewportCenter) < 150) {
            const newFlowStep = index + 1;
            if (newFlowStep !== currentStep) {
              currentStep = newFlowStep;
              updateStepActivation();
            }
          }
        });
      };

      // Update step activation
      const updateStepActivation = () => {
        storySteps.forEach((step, index) => {
          if (index + 1 === currentStep) {
            step.classList.add('active');
          } else {
            step.classList.remove('active');
          }
        });
      };

      // Trigger cube spark
      const triggerCubeSpark = () => {
        if (cube) {
          cube.style.animation = 'none';
          setTimeout(() => {
            cube.style.animation = 'gentleRotate 12s linear infinite';
          }, 200);
        }
      };

      // Trigger brain spark
      const triggerBrainSpark = () => {
        if (brain) {
          brain.style.animation = 'none';
          setTimeout(() => {
            brain.style.animation = 'gentleFloat 4s ease-in-out infinite';
          }, 200);
        }
      };

      // Create shooting stars
      const createShootingStars = () => {
        setInterval(() => {
          if (Math.random() > 0.7) {
            createShootingStar();
          }
        }, 2000);
      };

      const createShootingStar = () => {
        const star = document.createElement('div');
        star.className = 'shooting-star';
        
        // Random starting position
        const startY = Math.random() * window.innerHeight;
        star.style.top = startY + 'px';
        star.style.left = '-100px';
        
        document.body.appendChild(star);
        
        // Remove star after animation
        setTimeout(() => {
          if (star.parentNode) {
            star.parentNode.removeChild(star);
          }
        }, 3000);
      };

      // Add event listeners
      if (cube) {
        cube.addEventListener('click', triggerCubeSpark);
      }
      if (brain) {
        brain.addEventListener('click', triggerBrainSpark);
      }

      // Initialize
      updateProgress();
      createShootingStars();

      // Add scroll event listener
      window.addEventListener('scroll', () => {
        updateScrollProgress();
        updateProgress();
      });
    };

    // Small delay to ensure DOM is ready
    setTimeout(initPage, 100);
  }, []);

  return (
    <div className="klowde-landing-page">
      <style jsx global>{`
        :root {
          --primary-color: #6366f1;
          --secondary-color: #8b5cf6;
          --accent-color: #06b6d4;
          --background: #0f0f23;
          --surface: #1a1a2e;
          --text: #e2e8f0;
          --glow: #6366f1;
        }

        .klowde-landing-page {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          background: var(--background);
          color: var(--text);
          overflow-x: hidden;
          min-height: 100vh;
          position: relative;
        }

        .klowde-landing-page * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        /* Single Brain Emoji */
        .brain-emoji {
          position: fixed;
          top: 30px;
          right: 40px;
          font-size: 2.5rem;
          z-index: 1000;
          animation: gentleFloat 4s ease-in-out infinite;
          filter: drop-shadow(0 0 15px rgba(99, 102, 241, 0.4));
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .brain-emoji:hover {
          transform: scale(1.1);
          filter: drop-shadow(0 0 20px rgba(99, 102, 241, 0.6));
        }

        @keyframes gentleFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }

        /* Header */
        .header {
          text-align: center;
          padding: 80px 20px 60px;
          position: relative;
          z-index: 10;
        }

        .header h1 {
          font-size: 4rem;
          font-weight: 700;
          background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 20px;
          animation: titleGlow 4s ease-in-out infinite;
        }

        @keyframes titleGlow {
          0%, 100% { filter: drop-shadow(0 0 20px rgba(99, 102, 241, 0.3)); }
          50% { filter: drop-shadow(0 0 30px rgba(99, 102, 241, 0.5)); }
        }

        /* Core Cube Section */
        .core-cube-section {
          text-align: center;
          padding: 60px 20px;
          position: relative;
          z-index: 10;
        }

        /* Simple 3D Cube */
        .nav-3d {
          perspective: 1000px;
          display: inline-block;
          margin: 40px 0;
          position: relative;
        }

        .nav-cube {
          width: 150px;
          height: 150px;
          position: relative;
          transform-style: preserve-3d;
          animation: gentleRotate 12s linear infinite;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .nav-cube:hover {
          animation-play-state: paused;
          transform: scale(1.05);
        }

        @keyframes gentleRotate {
          from { transform: rotateX(0deg) rotateY(0deg); }
          to { transform: rotateX(360deg) rotateY(360deg); }
        }

        .nav-face {
          position: absolute;
          width: 150px;
          height: 150px;
          background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
          border: 2px solid var(--accent-color);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2.5rem;
          color: white;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          transition: all 0.3s ease;
        }

        .nav-face:hover {
          background: linear-gradient(135deg, var(--accent-color), var(--primary-color));
          box-shadow: 0 0 20px var(--glow);
        }

        .nav-face.front { transform: rotateY(0deg) translateZ(75px); }
        .nav-face.back { transform: rotateY(180deg) translateZ(75px); }
        .nav-face.right { transform: rotateY(90deg) translateZ(75px); }
        .nav-face.left { transform: rotateY(-90deg) translateZ(75px); }
        .nav-face.top { transform: rotateX(90deg) translateZ(75px); }
        .nav-face.bottom { transform: rotateX(-90deg) translateZ(75px); }

        /* Story Flow */
        .story-flow {
          max-width: 800px;
          margin: 80px auto;
          padding: 0 20px;
          position: relative;
          z-index: 10;
        }

        .story-step {
          display: flex;
          align-items: center;
          margin-bottom: 80px;
          padding: 30px;
          border-radius: 20px;
          background: rgba(26, 26, 46, 0.4);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(99, 102, 241, 0.1);
          transition: all 0.6s ease;
          position: relative;
          opacity: 0.6;
          transform: translateY(20px);
        }

        .story-step.active {
          opacity: 1;
          transform: translateY(0);
          background: rgba(99, 102, 241, 0.1);
          border-color: var(--glow);
          box-shadow: 0 0 30px rgba(99, 102, 241, 0.2);
        }

        .story-icon {
          font-size: 3.5rem;
          margin-right: 40px;
          transition: all 0.5s ease;
          filter: drop-shadow(0 0 10px rgba(99, 102, 241, 0.3));
        }

        .story-step.active .story-icon {
          transform: scale(1.2);
          filter: drop-shadow(0 0 20px var(--glow));
        }

        .story-word {
          font-size: 1.8rem;
          font-weight: 600;
          color: var(--text);
          opacity: 0.8;
          transition: all 0.5s ease;
        }

        .story-step.active .story-word {
          opacity: 1;
          color: var(--accent-color);
          text-shadow: 0 0 10px rgba(6, 182, 212, 0.5);
        }

        /* Shooting Star */
        .shooting-star {
          position: fixed;
          width: 2px;
          height: 2px;
          background: white;
          border-radius: 50%;
          box-shadow: 0 0 4px white, 0 0 8px white, 0 0 12px var(--accent-color);
          z-index: 999;
          pointer-events: none;
          animation: shootingStar 3s linear infinite;
        }

        @keyframes shootingStar {
          0% {
            transform: translateX(-100px) translateY(100px) rotate(45deg);
            opacity: 1;
          }
          70% {
            opacity: 1;
          }
          100% {
            transform: translateX(calc(100vw + 100px)) translateY(-100px) rotate(45deg);
            opacity: 0;
          }
        }

        /* Progress Bar */
        .progress-container {
          position: fixed;
          left: 40px;
          top: 50%;
          transform: translateY(-50%);
          width: 6px;
          height: 200px;
          background: rgba(99, 102, 241, 0.1);
          border-radius: 3px;
          z-index: 1000;
        }

        .progress-bar {
          width: 100%;
          background: linear-gradient(180deg, var(--primary-color), var(--accent-color));
          border-radius: 3px;
          transition: height 0.4s ease;
          position: relative;
        }

        /* Footer */
        .footer {
          text-align: center;
          padding: 80px 20px 60px;
          margin-top: 100px;
          position: relative;
          z-index: 10;
        }

        .footer a {
          color: var(--accent-color);
          text-decoration: none;
          font-size: 1.3rem;
          padding: 18px 36px;
          border: 2px solid var(--accent-color);
          border-radius: 30px;
          transition: all 0.3s ease;
          display: inline-block;
          position: relative;
          overflow: hidden;
        }

        .footer a:hover {
          background: var(--accent-color);
          color: var(--background);
          box-shadow: 0 0 25px var(--accent-color);
          transform: translateY(-2px);
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .header h1 { font-size: 3rem; }
          .nav-cube { width: 120px; height: 120px; }
          .nav-face { width: 120px; height: 120px; font-size: 2rem; }
          .story-icon { font-size: 3rem; margin-right: 30px; }
          .brain-emoji { right: 30px; font-size: 2rem; }
          .progress-container { left: 30px; }
        }
      `}</style>

      {/* Single Brain Emoji */}
      <div className="brain-emoji">🧠</div>

      {/* Header */}
      <header className="header">
        <h1>klowde</h1>
      </header>

      {/* Core Cube Section */}
      <section className="core-cube-section">
        <div className="nav-3d">
          <div className="nav-cube">
            <div className="nav-face front">🤖</div>
            <div className="nav-face back">🔮</div>
            <div className="nav-face right">⚡</div>
            <div className="nav-face left">🌟</div>
            <div className="nav-face top">🚀</div>
            <div className="nav-face bottom">💫</div>
          </div>
        </div>
      </section>

      {/* Story Flow */}
      <div className="story-flow">
        <div className="story-step" data-step="1">
          <div className="story-icon">🌱</div>
          <div className="story-word">Seed</div>
        </div>
        
        <div className="story-step" data-step="2">
          <div className="story-icon">🌿</div>
          <div className="story-word">Grow</div>
        </div>
        
        <div className="story-step" data-step="3">
          <div className="story-icon">🌸</div>
          <div className="story-word">Bloom</div>
        </div>
        
        <div className="story-step" data-step="4">
          <div className="story-icon">🌊</div>
          <div className="story-word">Flow</div>
        </div>
        
        <div className="story-step" data-step="5">
          <div className="story-icon">✨</div>
          <div className="story-word">Spark</div>
        </div>
        
        <div className="story-step" data-step="6">
          <div className="story-icon">🚀</div>
          <div className="story-word">Launch</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="progress-container">
        <div className="progress-bar" id="progressBar"></div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <a href="https://indexclub.co.uk" target="_blank" rel="noopener noreferrer">Visit Index Club</a>
      </footer>
    </div>
  );
}
