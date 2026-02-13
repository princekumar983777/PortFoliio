import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ConfessionProps {
  onResponse: (response: 'yes' | 'no') => void;
  isMusicPlaying: boolean;
}

const Confession = ({ onResponse, isMusicPlaying }: ConfessionProps) => {
  const [showConfession, setShowConfession] = useState(false);
  const [selectedResponse, setSelectedResponse] = useState<'yes' | 'no' | null>(null);
  const [isResponding, setIsResponding] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [canRespond, setCanRespond] = useState(false);
  const [noButtonPosition, setNoButtonPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [noClickCount, setNoClickCount] = useState(0);
  const [hasMovedOnce, setHasMovedOnce] = useState(false);

  const confessionAudioRef = useRef<HTMLAudioElement | null>(null);
  const yesAudioRef = useRef<HTMLAudioElement | null>(null);
  const noAudioRef = useRef<HTMLAudioElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const noButtonRef = useRef<HTMLDivElement | null>(null);

  // Initialize video
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(err => console.error('Error playing video:', err));
    }
  }, []);

  // Initialize confession
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfession(true);
      
      // Play confession audio
      if (confessionAudioRef.current && audioEnabled) {
        confessionAudioRef.current.play().catch(error => {
          console.error('Error playing audio:', error);
        });
        setIsAudioPlaying(true);
      }
    }, 800);

    return () => {
      clearTimeout(timer);
      if (confessionAudioRef.current) {
        confessionAudioRef.current.pause();
      }
    };
  }, [audioEnabled]);

  // Handle confession audio end
  useEffect(() => {
    const audio = confessionAudioRef.current;
    if (!audio) return;

    const handleAudioEnded = () => {
      setIsAudioPlaying(false);
      setCanRespond(true);
    };

    audio.addEventListener('ended', handleAudioEnded);
    return () => {
      audio.removeEventListener('ended', handleAudioEnded);
    };
  }, []);

  const handleResponse = (response: 'yes' | 'no') => {
    if (!canRespond || isResponding) return;

    // If clicking "No" button
    if (response === 'no') {
      // Only move button once
      if (!hasMovedOnce) {
        // Move button to random location
        const randomX = (Math.random() - 0.5) * 300;
        const randomY = (Math.random() - 0.5) * 200 - 100;
        setNoButtonPosition({ x: randomX, y: randomY });
        setNoClickCount(noClickCount + 1);
        setHasMovedOnce(true);
        return; // Don't proceed with response yet
      } else {
        // After moving once, accept the response
        setIsResponding(true);
        setSelectedResponse(response);

        // Play response audio
        if (noAudioRef.current && audioEnabled) {
          noAudioRef.current.play().catch(error => {
            console.error('Error playing response audio:', error);
          });

          noAudioRef.current.onended = () => {
            setTimeout(() => {
              onResponse(response);
            }, 500);
          };
        } else {
          setTimeout(() => {
            onResponse(response);
          }, 1500);
        }
        return;
      }
    }

    // If clicking "Yes" button (normal flow)
    setIsResponding(true);
    setSelectedResponse(response);

    // Play response audio
    const audioRef = yesAudioRef;
    if (audioRef.current && audioEnabled) {
      audioRef.current.play().catch(error => {
        console.error('Error playing response audio:', error);
      });

      audioRef.current.onended = () => {
        setTimeout(() => {
          onResponse(response);
        }, 500);
      };
    } else {
      setTimeout(() => {
        onResponse(response);
      }, 1500);
    }
  };

  const toggleAudioEnabled = () => {
    if (confessionAudioRef.current) {
      confessionAudioRef.current.pause();
    }
    setAudioEnabled(!audioEnabled);
    setIsAudioPlaying(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 w-full h-screen overflow-hidden z-50"
    >
      {/* Background Video */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        loop
        muted
      >
        <source src="/assets/confession-background.mp4" type="video/mp4" />
      </video>

      {/* Enhanced Gradient Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 bg-gradient-to-br from-pink-900/50 via-purple-900/50 to-rose-900/50 backdrop-blur-sm"
      />

      {/* Animated floating hearts background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{
              x: Math.random() * window.innerWidth,
              y: window.innerHeight + 50,
              opacity: 0,
              scale: Math.random() * 0.5 + 0.5
            }}
            animate={{
              y: -100,
              opacity: [0, 0.6, 0],
              x: Math.random() * window.innerWidth
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 2
            }}
          >
            <Heart 
              size={Math.random() * 40 + 20} 
              className="text-pink-300 fill-pink-300"
            />
          </motion.div>
        ))}
      </div>

      {/* Glow effect orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{
            x: [0, 30, 0],
            y: [0, -30, 0]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        />
        <motion.div
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        />
        <motion.div
          animate={{
            x: [0, 20, 0],
            y: [0, 30, 0]
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-rose-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        />
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {showConfession && (
          <motion.div
            key="confession"
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -50 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
            className="absolute inset-0 flex flex-col items-center justify-center p-4 z-10"
          >
            {/* Animated Heart */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 15, -15, 0]
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                repeatDelay: 0.5,
                type: "spring",
                stiffness: 100
              }}
              className="text-9xl md:text-[180px] mb-6 drop-shadow-2xl filter drop-shadow-lg"
            >
              ❤️
            </motion.div>

            {/* Main confession message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mb-8 space-y-6 max-w-3xl text-center"
            >
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.7 }}
                className="text-4xl md:text-7xl font-black bg-gradient-to-r from-pink-200 via-purple-200 to-rose-200 bg-clip-text text-transparent drop-shadow-xl"
              >
                So here's the truth...
              </motion.h2>

              <div className="space-y-4 text-lg md:text-2xl text-white leading-relaxed">
                <motion.p
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="drop-shadow-lg"
                >
                  Every moment I've spent knowing you has been a gift.
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  className="drop-shadow-lg"
                >
                  You make me smile in ways I didn't think were possible.
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.0, duration: 0.6 }}
                  className="drop-shadow-lg"
                >
                  Your presence has changed my world for the better.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2, duration: 0.6, type: "spring" }}
                  className="pt-6 pb-4"
                >
                  <p className="text-3xl md:text-5xl font-black bg-gradient-to-r from-yellow-200 via-pink-200 to-rose-200 bg-clip-text text-transparent drop-shadow-xl">
                    I like you. A lot.
                  </p>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.4, duration: 0.7, type: "spring" }}
                  className="text-3xl md:text-4xl font-black text-white drop-shadow-lg pt-4"
                >
                  Would you be my Valentine? 💕
                </motion.p>
              </div>

              {/* Audio Status Indicator */}
              {isAudioPlaying && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center justify-center gap-2 pt-4"
                >
                  <motion.div
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="w-3 h-3 rounded-full bg-pink-300"
                  />
                  <span className="text-pink-200 font-semibold drop-shadow-lg">
                    Playing confession...
                  </span>
                </motion.div>
              )}

              {!isAudioPlaying && canRespond && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="pt-4 text-pink-200 font-bold drop-shadow-lg"
                >
                  Choose your answer below 💝
                </motion.div>
              )}
            </motion.div>

            {/* Response Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.7, duration: 0.6 }}
              className="space-y-4 pt-8 max-w-2xl w-full px-4"
            >
              {/* Yes Button */}
              <motion.div
                whileHover={!isResponding ? { scale: 1.08, y: -5 } : {}}
                whileTap={!isResponding ? { scale: 0.95 } : {}}
                className="relative"
              >
                <motion.div
                  animate={canRespond && !isResponding ? { 
                    boxShadow: [
                      '0 0 20px rgba(236, 72, 153, 0.3)',
                      '0 0 40px rgba(236, 72, 153, 0.6)',
                      '0 0 20px rgba(236, 72, 153, 0.3)'
                    ]
                  } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="rounded-full"
                >
                  <Button
                    onClick={() => handleResponse('yes')}
                    disabled={isResponding || !canRespond}
                    className={`w-full py-8 text-2xl md:text-3xl font-black rounded-full shadow-2xl transition-all backdrop-blur-sm border-2 ${
                      selectedResponse === 'yes'
                        ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white border-white scale-105'
                        : canRespond && !isResponding
                        ? 'bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 hover:from-pink-600 hover:via-rose-600 hover:to-red-600 text-white border-pink-300 cursor-pointer'
                        : 'bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 text-white border-pink-300 opacity-60 cursor-not-allowed'
                    }`}
                  >
                    <Heart className="mr-3 fill-current" size={40} />
                    Yes! I'd love to! 💝
                  </Button>
                </motion.div>
              </motion.div>

              {/* No Button - Runs away after first click */}
              <motion.div
                ref={noButtonRef}
                animate={{
                  x: noButtonPosition.x,
                  y: noButtonPosition.y
                }}
                transition={{
                  duration: 0.4,
                  type: "spring",
                  stiffness: 300,
                  damping: 20
                }}
              >
                <motion.div
                  whileHover={!isResponding && hasMovedOnce ? { scale: 1.05, y: -2 } : {}}
                  whileTap={!isResponding && hasMovedOnce ? { scale: 0.95 } : {}}
                >
                  <Button
                    onClick={() => handleResponse('no')}
                    disabled={isResponding}
                    className={`w-full border-2 py-8 text-xl md:text-2xl font-bold rounded-full transition-all backdrop-blur-sm ${
                      selectedResponse === 'no'
                        ? 'border-white text-white bg-white/10'
                        : canRespond && !isResponding
                        ? 'border-white/60 text-white hover:border-white hover:bg-white/10 cursor-pointer'
                        : 'border-white/40 text-white/60 opacity-60 cursor-not-allowed'
                    }`}
                  >
                    {hasMovedOnce ? "I need some time to think... 💭" : "I need some time to think... 💭"}
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Celebration animation when responding */}
            <AnimatePresence>
              {isResponding && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                >
                  <motion.div
                    animate={{ 
                      scale: [1, 1.3, 1],
                      rotate: [0, 360, 0]
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="text-9xl md:text-[200px]"
                  >
                    {selectedResponse === 'yes' ? '🎉' : '💭'}
                  </motion.div>

                  {/* Confetti burst for yes */}
                  {selectedResponse === 'yes' && (
                    <>
                      {[...Array(20)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{
                            x: 0,
                            y: 0,
                            opacity: 1,
                            scale: 1
                          }}
                          animate={{
                            x: (Math.random() - 0.5) * 600,
                            y: (Math.random() - 0.5) * 600,
                            opacity: 0,
                            scale: 0,
                            rotate: Math.random() * 720
                          }}
                          transition={{
                            duration: 1.5,
                            ease: "easeOut"
                          }}
                          className="absolute"
                        >
                          {['🎉', '💕', '✨', '🌟', '💝'][Math.floor(Math.random() * 5)]}
                        </motion.div>
                      ))}
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Audio Toggle Button - Bottom Left */}
      <motion.button
        onClick={toggleAudioEnabled}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="absolute bottom-8 left-8 z-20 bg-white/20 backdrop-blur-sm border border-white/40 text-white p-4 rounded-full hover:bg-white/30 transition-colors"
        title={audioEnabled ? 'Disable Audio' : 'Enable Audio'}
      >
        {audioEnabled ? (
          <Volume2 size={24} />
        ) : (
          <VolumeX size={24} />
        )}
      </motion.button>

      {/* Hidden Audio Elements */}
      <audio ref={confessionAudioRef} />
      <audio ref={yesAudioRef} src="/audio/confession-yes.mp3" />
      <audio ref={noAudioRef} src="/audio/confession-no.mp3" />
    </motion.div>
  );
};

export default Confession;