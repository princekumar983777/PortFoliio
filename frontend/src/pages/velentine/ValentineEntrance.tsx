import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Music, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import StoryMode from './StoryMode';
import Confession from './Confession';

type Stage = 'welcome' | 'verify' | 'story' | 'confession' | 'thankyou';

interface Question {
  question: string;
  answer: string;
  hint?: string;
}

const ValentineEntrance = () => {
  const [stage, setStage] = useState<Stage>('welcome');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Customize these questions - only she should know the answers
  const verificationQuestions: Question[] = [
    {
      question: "What's the nickname I secretly gave you in my mind?",
      answer: "Princess", // Change this to actual answer (lowercase for comparison)
      hint: "if I'm the Prince , than you should be a ?"
    },
    {
      question: "The Plant whose leaf you like to eat ?",
      answer: "Tulsi", // Change this
      hint: "The Plant located outside the LT building"
    },
    {
      question: "Your Date of birth ?",
      answer: "22/10", // Change this
      hint: "DD/MM"
    }
  ];

  useEffect(() => {
    audioRef.current = new Audio('https://www.bensound.com/bensound-music/bensound-memories.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(console.error);
      }
      setIsMusicPlaying(!isMusicPlaying);
    }
  };

  const handleWelcomeChoice = (choice: string) => {
    setStage('verify');
    if (!isMusicPlaying && audioRef.current) {
      audioRef.current.play().catch(console.error);
      setIsMusicPlaying(true);
    }
  };

  const handleVerification = () => {
    const currentQ = verificationQuestions[currentQuestion];
    if (userAnswer.toLowerCase().trim() === currentQ.answer.toLowerCase()) {
      if (currentQuestion < verificationQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setUserAnswer('');
        setShowHint(false);
        setWrongAttempts(0);
      } else {
        setStage('story');
        setUserAnswer('');
      }
    } else {
      setWrongAttempts(wrongAttempts + 1);
      if (wrongAttempts >= 1) {
        setShowHint(true);
      }
    }
  };

  const handleStoryComplete = () => {
    setStage('confession');
  };

  const handleConfessionResponse = (response: 'yes' | 'no') => {
    setStage('thankyou');
  };

  // Floating hearts background
  const FloatingHearts = () => (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-pink-300 opacity-20"
          initial={{ y: '100vh', x: Math.random() * window.innerWidth }}
          animate={{
            y: '-100vh',
            x: Math.random() * window.innerWidth,
            rotate: 360
          }}
          transition={{
            duration: Math.random() * 10 + 15,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: 'linear'
          }}
        >
          <Heart size={Math.random() * 30 + 20} fill="currentColor" />
        </motion.div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-rose-50 relative overflow-hidden">
      <FloatingHearts />

      {/* Music Toggle */}
      <motion.button
        onClick={toggleMusic}
        className="fixed top-6 right-6 z-50 bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isMusicPlaying ? <Volume2 className="text-pink-500" /> : <VolumeX className="text-gray-400" />}
      </motion.button>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <AnimatePresence mode="wait">
          {/* Welcome Stage */}
          {stage === 'welcome' && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-md"
            >
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity
                }}
                className="text-9xl mb-8"
              >
                ❤️
              </motion.div>

              <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-pink-600 via-purple-600 to-rose-600 bg-clip-text text-transparent">
                Hello, Beautiful 💕
              </h1>

              <div className="space-y-4 mb-8">
                <p className="text-xl text-gray-700">
                  I've been wanting to tell you something special for a while now...
                </p>
                <p className="text-lg text-gray-600">
                  Before we continue, I need to make sure it's really you. 🔐
                </p>
              </div>

              <Button
                onClick={() => handleWelcomeChoice('yes')}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white py-6 text-lg rounded-full"
                size="lg"
              >
                Let's Begin! 💫
              </Button>
            </motion.div>
          )}

          {/* Verification Stage */}
          {stage === 'verify' && (
            <motion.div
              key="verify"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-2xl"
            >
              <Card className="p-12 bg-white/90 backdrop-blur-sm shadow-2xl border-pink-100">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-8"
                >
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-800">
                      Question {currentQuestion + 1}/{verificationQuestions.length}
                    </h2>
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-4xl"
                    >
                      🔐
                    </motion.div>
                  </div>

                  <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-6 rounded-xl">
                    <p className="text-lg font-semibold text-gray-800">
                      {verificationQuestions[currentQuestion].question}
                    </p>
                  </div>

                  <Input
                    type="text"
                    placeholder="Your answer..."
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleVerification()}
                    className="text-center text-lg py-6 border-pink-200 focus:border-pink-400"
                  />

                  <AnimatePresence>
                    {showHint && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-yellow-50 border border-yellow-200 rounded-lg p-4"
                      >
                        <p className="text-sm text-yellow-800">
                          💡 Hint: {verificationQuestions[currentQuestion].hint}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <Button
                    onClick={handleVerification}
                    className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white py-6 text-lg rounded-full"
                    size="lg"
                  >
                    Continue
                  </Button>
                </motion.div>
              </Card>
            </motion.div>
          )}

          {/* Story Mode */}
          {stage === 'story' && (
            <StoryMode onComplete={handleStoryComplete} isMusicPlaying={isMusicPlaying} />
          )}

          {/* Confession */}
          {stage === 'confession' && (
            <Confession onResponse={handleConfessionResponse} isMusicPlaying={isMusicPlaying} />
          )}

          {/* Thank You Stage */}
          {stage === 'thankyou' && (
            <motion.div
              key="thankyou"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="text-center max-w-2xl"
            >
              <motion.div
                animate={{
                  rotate: 360,
                  scale: [1, 1.3, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 1
                }}
                className="text-9xl mb-8"
              >
                🎉
              </motion.div>

              <h2 className="text-5xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-6">
                Thank you! 💕
              </h2>

              <p className="text-2xl text-gray-700 mb-8">
                Whatever your answer is, know that you mean the world to me.
              </p>

              <div className="bg-pink-50 border border-pink-200 rounded-2xl p-8">
                <p className="text-lg text-pink-800">
                  You're amazing and I'm grateful to have you in my life. 🌟
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ValentineEntrance;
