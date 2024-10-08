import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '@fontsource/dancing-script';

const Button = ({ to, children }) => (
  <Link to={to}>
    <motion.button
      whileHover={{ scale: 1.05, boxShadow: "0px 0px 8px rgb(255,0,0)" }}
      whileTap={{ scale: 0.95 }}
      className="bg-red-400 text-white px-6 py-3 rounded-full font-semibold text-lg shadow-md hover:bg-red-500 transition duration-300 m-2"
    >
      {children}
    </motion.button>
  </Link>
);

const HeartIcon = () => (
  <motion.svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-6 h-6 inline-block"
    animate={{ scale: [1, 1.2, 1] }}
    transition={{ repeat: Infinity, duration: 1.5 }}
  >
    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
  </motion.svg>
);

const EnvelopeIcon = ({ isOpen, onClick }) => (
  <motion.svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-12 h-12 text-red-400 cursor-pointer focus:outline-none"
    onClick={onClick}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
  >
    <motion.path
      d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z"
      initial={false}
      animate={{ scaleY: isOpen ? 0 : 1 }}
    />
    <motion.path
      d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z"
      initial={false}
      animate={{ scaleY: isOpen ? 1.5 : 1 }}
    />
  </motion.svg>
);

function Home() {
  const [showMessage, setShowMessage] = useState(false);
  const initialCounterValue = 103993030;
  const [counter, setCounter] = useState(() => {
    const savedCounter = localStorage.getItem('loveCounter');
    return savedCounter ? parseInt(savedCounter, 10) : initialCounterValue;
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter(prevCounter => {
        const newValue = prevCounter + 1;
        localStorage.setItem('loveCounter', newValue.toString());
        return newValue;
      });
    }, 30); // Increase every 100ms

    return () => {
      clearInterval(interval);
      localStorage.removeItem('loveCounter'); // Clear the stored value when component unmounts
    };
  }, []);

  useEffect(() => {
    // Reset counter when the component mounts (page refresh)
    setCounter(initialCounterValue);
    localStorage.setItem('loveCounter', initialCounterValue.toString());
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      <motion.h2 
        className="text-4xl font-cursive mb-2 text-red-600"
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        My Love for You <HeartIcon />
      </motion.h2>
      <motion.div
        className="mb-6 text-2xl font-bold text-red-500"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 0.5 }}
      >
        {counter.toLocaleString()}
      </motion.div>
      <motion.p 
        className="mb-8 text-lg italic"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        style={{ color: '#8B0000' }}
      >
        With each heartbeat, my love for you grows deeper and more intense.
      </motion.p>
      <div className="flex flex-wrap justify-center mb-8">
        <Button to="/memories">Our Memories</Button>
        <Button to="/love-notes">Don't Click Me</Button>
        <Button to="/future-dreams">Our Dreams</Button>
      </div>
      
      <div className="mt-8 flex flex-col items-center">
        <motion.p
          className="text-lg mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          style={{ color: '#8B0000' }}
        >
          A special message for you:
        </motion.p>
        <EnvelopeIcon isOpen={showMessage} onClick={() => setShowMessage(!showMessage)} />
      </div>
      
      {showMessage && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-4 text-2xl font-dancing-script text-red-600"
        >
          You're the best thing that's ever happened to me. I love you more each day!
        </motion.p>
      )}
    </motion.div>
  );
}

export default Home;