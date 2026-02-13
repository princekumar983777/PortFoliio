import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, RotateCw } from 'lucide-react';

type PuzzleType = 'memory' | 'riddle' | 'completed';

interface MemoryCard {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const IsThatYou = () => {
  const [puzzleType, setPuzzleType] = useState<PuzzleType>('memory');
  const [stage, setStage] = useState<'welcome' | 'playing' | 'completed'>('welcome');

  // ============= MEMORY GAME STATE =============
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [firstFlipped, setFirstFlipped] = useState<number | null>(null);
  const [secondFlipped, setSecondFlipped] = useState<number | null>(null);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [moves, setMoves] = useState(0);

  // ============= RIDDLE STATE =============
  const riddles = [
    {
      question: "What has keys but no locks, space but no room, and you can enter but can't go inside?",
      answer: "keyboard",
      hint: "You're using one right now..."
    },
    {
      question: "What gets wet while drying?",
      answer: "towel",
      hint: "You use it after a shower..."
    },
    {
      question: "What has a head and a tail but no body?",
      answer: "coin",
      hint: "Money in your pocket..."
    }
  ];

  const [currentRiddle, setCurrentRiddle] = useState(0);
  const [riddleAnswer, setRiddleAnswer] = useState('');
  const [showRiddleHint, setShowRiddleHint] = useState(false);

  // Initialize memory game
  useEffect(() => {
    if (puzzleType === 'memory' && cards.length === 0) {
      initializeMemoryGame();
    }
  }, [puzzleType]);

  const initializeMemoryGame = () => {
    const emojis = ['💕', '🌹', '✨', '💫', '🎀', '💝'];
    const gameCards: MemoryCard[] = [];

    emojis.forEach((emoji, idx) => {
      gameCards.push({
        id: idx,
        emoji,
        isFlipped: false,
        isMatched: false
      });
      gameCards.push({
        id: idx + emojis.length,
        emoji,
        isFlipped: false,
        isMatched: false
      });
    });

    gameCards.sort(() => Math.random() - 0.5);
    setCards(gameCards);
    setFirstFlipped(null);
    setSecondFlipped(null);
    setMatchedPairs(0);
    setMoves(0);
  };

  const flipCard = (index: number) => {
    if (cards[index].isMatched || cards[index].isFlipped) return;
    if (firstFlipped !== null && secondFlipped !== null) return;

    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);

    if (firstFlipped === null) {
      setFirstFlipped(index);
    } else {
      setSecondFlipped(index);
      setMoves(moves + 1);

      if (newCards[firstFlipped].emoji === newCards[index].emoji) {
        setTimeout(() => {
          const matchedCards = [...newCards];
          matchedCards[firstFlipped!].isMatched = true;
          matchedCards[index].isMatched = true;
          setCards(matchedCards);
          setMatchedPairs(matchedPairs + 1);
          setFirstFlipped(null);
          setSecondFlipped(null);

          if (matchedPairs + 1 === 6) {
            setTimeout(() => nextPuzzle(), 800);
          }
        }, 600);
      } else {
        setTimeout(() => {
          newCards[firstFlipped!].isFlipped = false;
          newCards[index].isFlipped = false;
          setCards(newCards);
          setFirstFlipped(null);
          setSecondFlipped(null);
        }, 1200);
      }
    }
  };

  const handleRiddleAnswer = () => {
    if (riddleAnswer.toLowerCase().trim() === riddles[currentRiddle].answer.toLowerCase()) {
      if (currentRiddle < riddles.length - 1) {
        setCurrentRiddle(currentRiddle + 1);
        setRiddleAnswer('');
        setShowRiddleHint(false);
      } else {
        setPuzzleType('completed');
        setStage('completed');
      }
    } else {
      alert('❌ Not quite! Try again or check the hint.');
    }
  };

  const nextPuzzle = () => {
    if (puzzleType === 'memory') {
      setPuzzleType('riddle');
      setRiddleAnswer('');
      setShowRiddleHint(false);
      setCurrentRiddle(0);
    }
  };

  const resetGame = () => {
    setStage('welcome');
    setPuzzleType('memory');
    setRiddleAnswer('');
    setShowRiddleHint(false);
    setCurrentRiddle(0);
    initializeMemoryGame();
  };

  const goToSurprise = () => {
    window.location.href = '/yesitsme';
  };

  // ============= WELCOME SCREEN =============
  if (stage === 'welcome') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-rose-100 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Floating hearts background */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-pink-200 opacity-20"
            initial={{ y: '100vh', x: Math.random() * window.innerWidth }}
            animate={{
              y: '-100vh',
              x: Math.random() * window.innerWidth,
            }}
            transition={{
              duration: Math.random() * 10 + 15,
              repeat: Infinity,
              ease: 'linear'
            }}
          >
            <Heart size={Math.random() * 30 + 20} fill="currentColor" />
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-md z-10"
        >
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity
            }}
            className="text-9xl mb-8"
          >
            🔐
          </motion.div>

          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-pink-600 via-purple-600 to-rose-600 bg-clip-text text-transparent">
            Is That You?
          </h1>

          <p className="text-xl text-gray-700 mb-8 leading-relaxed">
            I have 2 quick puzzles for you... If you solve them, I have a big surprise waiting! 💝
          </p>

          <div className="space-y-4">
            <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-pink-200">
              <p className="text-sm text-gray-600 mb-4">
                Complete these challenges:
              </p>
              <div className="space-y-2 text-left">
                <p className="text-sm">✨ Memory Game - Match the pairs</p>
                <p className="text-sm">🧩 Riddle Challenge - Answer 3 riddles</p>
              </div>
            </div>

            <motion.button
              onClick={() => setStage('playing')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white py-4 text-lg font-bold rounded-full shadow-xl"
            >
              Let's Play! 🎮
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  // ============= MEMORY GAME =============
  if (stage === 'playing' && puzzleType === 'memory') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-2xl"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Memory Game 🎮
            </h2>
            <div className="flex justify-around text-lg font-semibold text-gray-700">
              <div>Moves: {moves}</div>
              <div>Pairs: {matchedPairs}/6</div>
            </div>
          </div>

          {/* Game Grid */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-2xl mb-8">
            <div className="grid grid-cols-4 gap-4">
              {cards.map((card, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => flipCard(idx)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`aspect-square rounded-lg font-bold text-3xl transition-all ${
                    card.isFlipped || card.isMatched
                      ? 'bg-gradient-to-br from-pink-400 to-purple-400 shadow-lg'
                      : 'bg-gradient-to-br from-gray-300 to-gray-400 hover:from-gray-400 hover:to-gray-500'
                  }`}
                  disabled={card.isMatched}
                >
                  {(card.isFlipped || card.isMatched) ? card.emoji : '?'}
                </motion.button>
              ))}
            </div>
          </div>

          {matchedPairs === 6 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <p className="text-2xl font-bold text-green-600 mb-4">✨ Level Complete! ✨</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    );
  }

  // ============= RIDDLE GAME =============
  if (stage === 'playing' && puzzleType === 'riddle') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-orange-100 to-pink-100 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-2xl"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent mb-4">
              Riddle Challenge 🧩
            </h2>
            <p className="text-lg text-gray-700">
              Question {currentRiddle + 1}/{riddles.length}
            </p>
            <div className="mt-4">
              <div className="flex space-x-2 justify-center">
                {riddles.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-3 w-3 rounded-full transition-all ${
                      idx <= currentRiddle ? 'bg-orange-500 w-8' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Riddle Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-2xl mb-8">
            <div className="mb-8">
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="text-6xl mb-6 text-center"
              >
                🤔
              </motion.div>

              <p className="text-2xl font-semibold text-gray-800 text-center mb-8">
                {riddles[currentRiddle].question}
              </p>

              <input
                type="text"
                value={riddleAnswer}
                onChange={(e) => setRiddleAnswer(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleRiddleAnswer()}
                placeholder="Your answer..."
                className="w-full px-6 py-4 text-lg border-2 border-orange-300 rounded-lg focus:outline-none focus:border-orange-500 text-center"
              />
            </div>

            <div className="space-y-4">
              <motion.button
                onClick={handleRiddleAnswer}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white py-4 text-lg font-bold rounded-full shadow-xl"
              >
                Submit Answer
              </motion.button>

              <motion.button
                onClick={() => setShowRiddleHint(!showRiddleHint)}
                whileHover={{ scale: 1.02 }}
                className="w-full bg-yellow-200 hover:bg-yellow-300 text-gray-800 py-3 text-lg font-semibold rounded-full transition-colors"
              >
                {showRiddleHint ? '❌ Hide Hint' : '💡 Show Hint'}
              </motion.button>

              <AnimatePresence>
                {showRiddleHint && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4"
                  >
                    <p className="text-center text-gray-800 font-semibold">
                      💡 Hint: {riddles[currentRiddle].hint}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // ============= COMPLETION SCREEN =============
  if (stage === 'completed') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-indigo-200 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Confetti-like animation */}
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-3xl"
            initial={{
              x: Math.random() * window.innerWidth,
              y: window.innerHeight,
              opacity: 1
            }}
            animate={{
              y: -100,
              opacity: 0,
              rotate: Math.random() * 360
            }}
            transition={{
              duration: Math.random() * 2 + 2,
              delay: Math.random() * 0.5
            }}
          >
            {['🎉', '💝', '✨', '🌹', '💕', '🎀'][Math.floor(Math.random() * 6)]}
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', bounce: 0.5 }}
          className="text-center max-w-md z-10"
        >
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              rotate: [0, 10, -10, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity
            }}
            className="text-9xl mb-8"
          >
            🎉
          </motion.div>

          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            You Did It! 🌟
          </h1>

          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 mb-8 shadow-2xl border-2 border-pink-300">
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              You solved all the puzzles! You're definitely the one I was looking for... 💕
            </p>

            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-6xl mb-6"
            >
              💫✨💫
            </motion.div>

            <p className="text-xl text-purple-700 font-bold mb-6">
              Now for the real surprise...
            </p>
          </div>

          <motion.button
            onClick={goToSurprise}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 text-white py-5 text-xl font-bold rounded-full shadow-2xl mb-4"
          >
            💕 Go to /yesitsme 💕
          </motion.button>

          <motion.button
            onClick={resetGame}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full border-2 border-gray-700 text-gray-700 hover:bg-gray-100 py-3 text-lg font-semibold rounded-full transition-colors"
          >
            <RotateCw className="inline mr-2" size={20} />
            Play Again
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-rose-100 flex items-center justify-center p-4">
      <div className="text-center">
        <p className="text-2xl font-bold text-gray-800">Loading...</p>
      </div>
    </div>
  );
};

export default IsThatYou;
