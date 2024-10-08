import { motion } from 'framer-motion';
import { useState } from 'react';

const stages = [
  { message: "I told you not to click on me, babe!", buttonText: "Now please don't click on me" },
  { message: "Seriously? You clicked again?", buttonText: "Okay, last chance. DON'T CLICK!" },
  { message: "You just can't help yourself, can you?", buttonText: "Fine, click if you must..." },
  { message: "Alright, you win. I secretly love your curiosity.", buttonText: "Keep going, I dare you!" },
  { message: "Your persistence is adorable!", buttonText: "But can you resist one more click?" },
  { message: "Wow, you're really committed to this!", buttonText: "Let's see how far you'll go..." },
  { message: "I'm running out of things to say!", buttonText: "But you're not running out of clicks?" },
  { message: "You know what? I admire your dedication.", buttonText: "One more for good luck?" },
  { message: "Okay, okay, you've earned a reward!", buttonText: "Click for your prize!" },
  { message: "Your prize is... more clicking! 😭", buttonText: "Last one, I promise!" },
  { message: "Surprise! I love you more with every click. ❤️", buttonText: "Show me your love!" }
];

function LoveNotes() {
  const [stageIndex, setStageIndex] = useState(0);
  const [loveCounter, setLoveCounter] = useState(0);
  const [showLoveCounter, setShowLoveCounter] = useState(false);

  const handleClick = () => {
    if (stageIndex < stages.length - 1) {
      setStageIndex(prevIndex => prevIndex + 1);
    } else {
      setShowLoveCounter(true);
    }
  };

  const handleRestart = () => {
    setStageIndex(0);
    setLoveCounter(0);
    setShowLoveCounter(false);
  };

  const handleLoveClick = () => {
    const increment = Math.floor(Math.random() * 24) + 1; // Random increment between 1 and 24
    setLoveCounter(prevCount => prevCount + increment);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center max-w-md mx-auto"
    >
      <motion.div
        className="text-3xl font-dancing-script mb-6 text-red-600"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
        </svg>
      </motion.div>
      {!showLoveCounter && (
        <>
          <motion.p
            key={stageIndex}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 text-lg italic"
            style={{ color: '#8B0000' }}
          >
            {stages[stageIndex].message}
          </motion.p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-red-400 text-white px-6 py-3 rounded-full font-semibold text-lg shadow-md hover:bg-red-500 transition duration-300"
            onClick={handleClick}
          >
            {stages[stageIndex].buttonText}
          </motion.button>
        </>
      )}
      {showLoveCounter && (
        <>
          <p className="mb-4 text-lg" style={{ color: '#8B0000' }}>Click the button to show how much you love me!</p>
          <motion.div 
            className="mb-4 text-6xl font-bold text-red-500"
            animate={{ scale: [1, 1.1, 1], textShadow: ['0px 0px 0px #ff0000', '0px 0px 10px #ff0000', '0px 0px 0px #ff0000'] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            {loveCounter}
          </motion.div>
          <div className="flex flex-col items-center space-y-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-red-400 text-white px-6 py-3 rounded-full font-semibold text-lg shadow-md hover:bg-red-500 transition duration-300"
              onClick={handleLoveClick}
            >
              Click me, babe!
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-red-400 text-white p-2 rounded-full shadow-md hover:bg-red-500 transition duration-300"
              onClick={handleRestart}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </motion.button>
          </div>
          <p className="mt-4 text-sm italic whitespace-nowrap" style={{ color: '#8B0000' }}>
            Take a screenshot of your final score to show me how much you love me! 📸❤️
          </p>
        </>
      )}
    </motion.div>
  );
}

export default LoveNotes;