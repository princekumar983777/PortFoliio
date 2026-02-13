import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Scene {
  id: number;
  title: string;
  text: string;
  emoji: string;
  audioFile: string; // audio1.mp3, audio2.mp3, etc.
  backgroundColor: string;
  textColor: string;
}

interface StoryModeProps {
  onComplete: () => void;
  isMusicPlaying: boolean;
}

const StoryMode = ({ onComplete, isMusicPlaying }: StoryModeProps) => {
  const [currentScene, setCurrentScene] = useState(0);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [canProceed, setCanProceed] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const musicRef = useRef<HTMLAudioElement | null>(null);

  // 8 Story scenes with sequential audio files (A1-A8)
  const scenes: Scene[] = [
    {
      id: 1,
      title: "The First Glance",
      text: "I remember the exact moment I first saw you. Time seemed to slow down, and everything else faded into the background. Your presence captivated me instantly.",
      emoji: "👀",
      audioFile: "/audio/A1.mp3",
      backgroundColor: "from-blue-400 to-purple-500",
      textColor: "text-white"
    },
    {
      id: 2,
      title: "Your Little Habits",
      text: "The way you laugh at silly things, how you tuck your hair behind your ear when you're focused, the way your eyes light up when you're excited... I noticed it all.",
      emoji: "😊",
      audioFile: "/audio/A2.mp3",
      backgroundColor: "from-pink-400 to-purple-400",
      textColor: "text-white"
    },
    {
      id: 3,
      title: "Precious Moments",
      text: "Every conversation we had, every smile you shared, every time our eyes met - they all became treasured memories that I carry with me every single day.",
      emoji: "🌸",
      audioFile: "/audio/A3.mp3",
      backgroundColor: "from-rose-400 to-pink-500",
      textColor: "text-white"
    },
    {
      id: 4,
      title: "Growing Feelings",
      text: "Days turned into weeks, and I found myself thinking about you more and more. Your presence became the best part of my day, the highlight that made everything worthwhile.",
      emoji: "💭",
      audioFile: "/audio/A4.mp3",
      backgroundColor: "from-yellow-300 to-orange-400",
      textColor: "text-white"
    },
    {
      id: 5,
      title: "The Realization",
      text: "It hit me like a wave - I wasn't just thinking about you casually anymore. You had become someone incredibly special to me, someone I genuinely care about deeply.",
      emoji: "💓",
      audioFile: "/audio/A5.mp3",
      backgroundColor: "from-cyan-400 to-blue-500",
      textColor: "text-white"
    },
    {
      id: 6,
      title: "The Courage Building",
      text: "I wanted to tell you for so long. There were a hundred moments where I almost said something, but the words got stuck. Today, I'm finally brave enough to take the leap.",
      emoji: "💪",
      audioFile: "/audio/A6.mp3",
      backgroundColor: "from-purple-500 to-indigo-600",
      textColor: "text-white"
    },
    {
      id: 7,
      title: "The Truth",
      text: "You're not just someone I like. You're someone who makes me want to be a better person, someone who brightens my world in ways I can't even explain.",
      emoji: "✨",
      audioFile: "/audio/A7.mp3",
      backgroundColor: "from-violet-500 to-purple-600",
      textColor: "text-white"
    },
    {
      id: 8,
      title: "Here We Are",
      text: "And here we are. I've shared my heart with you through this journey. Whatever happens next, know that these feelings are real, and you mean everything to me.",
      emoji: "❤️",
      audioFile: "/audio/A8.mp3",
      backgroundColor: "from-pink-500 to-red-500",
      textColor: "text-white"
    }
  ];

  const scene = scenes[currentScene];

  // Initialize video on mount
  useEffect(() => {
    const handleVideoEnded = () => {
      setIsVideoPlaying(false);
    };

    const video = videoRef.current;
    if (video) {
      video.addEventListener('ended', handleVideoEnded);
      video.play().catch(err => console.error('Error playing video:', err));

      return () => {
        video.removeEventListener('ended', handleVideoEnded);
      };
    }
  }, []);

  // Play background music on mount
  useEffect(() => {
    if (musicRef.current) {
      musicRef.current.volume = 0.3;
      musicRef.current.loop = true;
      musicRef.current.play().catch(err => console.error('Error playing music:', err));
    }

    return () => {
      if (musicRef.current) {
        musicRef.current.pause();
      }
    };
  }, []);

  // Load and play scene audio when scene changes
  useEffect(() => {
    setCanProceed(false);
    setShowMessage(false);
    setIsVideoPlaying(true);

    if (videoRef.current && audioEnabled) {
      // Restart video for each scene
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(err => console.error('Error playing video:', err));

      // Play audio after a short delay (let video start)
      const audioDelay = setTimeout(() => {
        if (audioRef.current && audioEnabled) {
          audioRef.current.src = scene.audioFile;
          audioRef.current.load();
          audioRef.current.play().catch(error => {
            console.error('Error playing audio:', error);
          });
          setIsAudioPlaying(true);
        }
      }, 500);

      return () => clearTimeout(audioDelay);
    }
  }, [currentScene, audioEnabled, scene.audioFile]);

  // Handle audio ended - show "press space" message
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleAudioEnded = () => {
      setIsAudioPlaying(false);
      setCanProceed(true);
      setShowMessage(true);
    };

    audio.addEventListener('ended', handleAudioEnded);
    return () => {
      audio.removeEventListener('ended', handleAudioEnded);
    };
  }, []);

  // Handle spacebar press to move to next scene
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space' && canProceed) {
        e.preventDefault();
        handleNextScene();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [canProceed, currentScene]);

  const handleNextScene = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setIsAudioPlaying(false);
    setCanProceed(false);
    setShowMessage(false);

    if (currentScene < scenes.length - 1) {
      setCurrentScene(currentScene + 1);
    } else {
      // All scenes completed
      if (musicRef.current) {
        musicRef.current.pause();
      }
      onComplete();
    }
  };

  const toggleAudioEnabled = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setAudioEnabled(!audioEnabled);
    setIsAudioPlaying(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 w-full h-screen overflow-hidden"
    >
      {/* Background Video - plays continuously for all scenes */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        muted
        loop
      >
        <source src="/video/bgm2.mp4" type="video/mp4" />
      </video>

      {/* Dimmed Overlay for text readability */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-br ${scene.backgroundColor} opacity-60`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 0.8 }}
      />

      {/* Animated particles overlay */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 8 + 2,
              height: Math.random() * 8 + 2,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{
              duration: Math.random() * 3 + 3,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      {/* Content Container */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScene}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl z-10"
          >
            {/* Animated Emoji */}
            <motion.div
              className="text-9xl md:text-[150px] mb-8"
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatDelay: 0.5
              }}
            >
              {scene.emoji}
            </motion.div>

            {/* Scene Title */}
            <motion.h2
              className={`text-4xl md:text-6xl font-bold mb-6 ${scene.textColor} drop-shadow-lg`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              {scene.title}
            </motion.h2>

            {/* Scene Text */}
            <motion.p
              className={`text-xl md:text-2xl leading-relaxed mb-8 ${scene.textColor} drop-shadow-md max-w-3xl`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              {scene.text}
            </motion.p>

            {/* Audio Status */}
            <motion.div
              className={`text-lg ${scene.textColor} drop-shadow-md mb-8`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {isAudioPlaying && (
                <div className="flex items-center justify-center gap-2">
                  <motion.div
                    className="w-2 h-2 rounded-full bg-white"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                  />
                  <span>Playing audio...</span>
                </div>
              )}

              {showMessage && !isAudioPlaying && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-xl font-semibold"
                >
                  Press <span className="bg-white/30 px-3 py-1 rounded">SPACE</span> to continue
                </motion.div>
              )}
            </motion.div>

            {/* Progress Indicator */}
            <div className="flex justify-center gap-2">
              {scenes.map((_, idx) => (
                <motion.div
                  key={idx}
                  className={`h-2 rounded-full transition-all ${
                    idx === currentScene ? 'bg-white w-8' : 'bg-white/40 w-2'
                  }`}
                  initial={{ width: 8, backgroundColor: 'rgba(255,255,255,0.4)' }}
                  animate={{
                    width: idx === currentScene ? 32 : 8,
                    backgroundColor: idx === currentScene ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.4)'
                  }}
                  transition={{ duration: 0.3 }}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

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

      {/* Scene Counter - Top Right */}
      <div className="absolute top-8 right-8 z-20">
        <div className="bg-white/20 backdrop-blur-sm border border-white/40 text-white px-6 py-3 rounded-full text-sm font-semibold">
          Scene {currentScene + 1}/{scenes.length}
        </div>
      </div>

      {/* Hidden Audio Elements */}
      <audio ref={audioRef} />
      <audio ref={musicRef} src="/audio/bgm.mp3" />
    </motion.div>
  );
};

export default StoryMode;