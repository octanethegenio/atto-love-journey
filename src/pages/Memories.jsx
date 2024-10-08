import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const MemoryImage = ({ number, onClick }) => {
  const imagePath = `${import.meta.env.BASE_URL}images/aimg${number}.png`;

  return (
    <motion.div
      className="w-full aspect-square bg-gray-200 rounded-lg shadow-md overflow-hidden cursor-pointer"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => onClick(imagePath)}
    >
      <img 
        src={imagePath} 
        alt={`Memory ${number}`} 
        className="w-full h-full object-cover"
      />
    </motion.div>
  );
};

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

const ImageModal = ({ src, onClose, onPrev, onNext }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
    onClick={onClose}
  >
    <div className="relative max-w-4xl max-h-[90vh] w-full h-full" onClick={(e) => e.stopPropagation()}>
      <img src={src} alt="Enlarged memory" className="w-full h-full object-contain" />
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

function Memories() {
  const [selectedImage, setSelectedImage] = useState(null);
  const imageNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  const images = imageNumbers.map(number => `${import.meta.env.BASE_URL}images/aimg${number}.png`);

  const handlePrev = () => {
    const currentIndex = images.indexOf(selectedImage);
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    setSelectedImage(images[prevIndex]);
  };

  const handleNext = () => {
    const currentIndex = images.indexOf(selectedImage);
    const nextIndex = (currentIndex + 1) % images.length;
    setSelectedImage(images[nextIndex]);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <h2 className="text-3xl font-dancing-script text-red-600 mb-6 text-center">Our Precious Memories</h2>
      <div className="flex flex-wrap justify-center gap-3">
        {imageNumbers.map((number, index) => (
          <div key={number} className={`w-full sm:w-1/2 md:w-1/3 lg:w-1/6 ${index >= imageNumbers.length - 3 ? 'lg:w-1/5' : ''}`}>
            <MemoryImage number={number} onClick={setSelectedImage} />
          </div>
        ))}
      </div>
      <AnimatePresence>
        {selectedImage && (
          <ImageModal 
            src={selectedImage} 
            onClose={() => setSelectedImage(null)}
            onPrev={handlePrev}
            onNext={handleNext}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default Memories;