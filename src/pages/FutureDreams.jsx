import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const dreams = [
  { label: 'Nikkah', emoji: '💍' },
  { label: 'Business', emoji: '💼' },
  { label: 'Travelling', emoji: '✈️' },
  { label: 'Car', emoji: '🚗' },
  { label: 'Furniture', emoji: '🛋️' },
  { label: 'House', emoji: '🏡' },
  { label: 'Rukhsuti', emoji: '👰' },
  { label: 'Honeymoon', emoji: '🌴' },
  { label: 'Home', emoji: '🏠' },
  { label: 'World Travel', emoji: '🌍' },
  { label: '7 Babies', emoji: '👶' },
  { label: 'Happy Life', emoji: '✨' },
];

const DreamCard = ({ dream, onClick }) => (
  <motion.div
    className="w-full aspect-square bg-white rounded-lg shadow-md overflow-hidden cursor-pointer flex flex-col items-center justify-center relative"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={() => onClick(dream)}
  >
    <h3 className="text-xl font-bold text-[#8B0000] text-center mb-2">{dream.label}</h3>
    <div className="text-5xl">{dream.emoji}</div>
    <motion.div
      className="absolute bottom-0 left-0 right-0 bg-red-500"
      initial={{ height: 0 }}
      whileHover={{ height: '4px' }}
      transition={{ duration: 0.2 }}
    />
  </motion.div>
);

const NavigationButton = ({ direction, onClick }) => (
  <motion.button
    className={`absolute top-1/2 ${direction === 'prev' ? 'left-4' : 'right-4'} bg-white bg-opacity-50 rounded-full p-2 focus:outline-none`}
    whileHover={{ scale: 1.1, backgroundColor: '#ffffff' }}
    whileTap={{ scale: 0.9 }}
    onClick={onClick}
  >
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={direction === 'prev' ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"} />
    </svg>
  </motion.button>
);

const DreamModal = ({ dream, onClose, onPrev, onNext }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
    onClick={onClose}
  >
    <div className="relative max-w-md w-full h-96 flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
      <div className="w-full h-full rounded-lg shadow-lg overflow-hidden bg-gradient-to-br from-pink-300 via-red-300 to-orange-300 flex flex-col items-center justify-center">
        <h2 className="text-4xl font-bold text-white mb-6">{dream.label}</h2>
        <div className="text-9xl">{dream.emoji}</div>
      </div>
      <motion.button
        className="absolute top-4 right-4 bg-white bg-opacity-50 rounded-full p-2 focus:outline-none"
        whileHover={{ scale: 1.1, backgroundColor: '#ffffff' }}
        whileTap={{ scale: 0.9 }}
        onClick={onClose}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </motion.button>
      <NavigationButton direction="prev" onClick={onPrev} />
      <NavigationButton direction="next" onClick={onNext} />
    </div>
  </motion.div>
);

function FutureDreams() {
  const [selectedDream, setSelectedDream] = useState(null);

  const handlePrev = () => {
    const currentIndex = dreams.findIndex(dream => dream === selectedDream);
    const prevIndex = (currentIndex - 1 + dreams.length) % dreams.length;
    setSelectedDream(dreams[prevIndex]);
  };

  const handleNext = () => {
    const currentIndex = dreams.findIndex(dream => dream === selectedDream);
    const nextIndex = (currentIndex + 1) % dreams.length;
    setSelectedDream(dreams[nextIndex]);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen w-screen bg-[#FFE4E1] pt-8 pb-4 px-8 overflow-x-hidden flex flex-col"
    >
      <h2 className="text-4xl font-dancing-script mb-8 text-[#CD5C5C] text-center">Our Future Dreams</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 mb-4">
        {dreams.map((dream, index) => (
          <div key={index} className="w-full">
            <DreamCard dream={dream} onClick={setSelectedDream} />
          </div>
        ))}
      </div>
      <p className="text-center text-sm text-[#CD5C5C] italic">Click on a dream to view it in detail! 💖</p>
      <AnimatePresence>
        {selectedDream && (
          <DreamModal 
            dream={selectedDream} 
            onClose={() => setSelectedDream(null)}
            onPrev={handlePrev}
            onNext={handleNext}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default FutureDreams;