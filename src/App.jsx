import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Home from './pages/Home';
import Memories from './pages/Memories';
import LoveNotes from './pages/LoveNotes';
import FutureDreams from './pages/FutureDreams';
import PasswordProtection from './pages/PasswordProtection';

function App() {
  return (
    <PasswordProtection onCorrectPassword={() => console.log('Authenticated')}>
      <Router>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-r from-red-100 to-pink-100"
        >
          <Link to="/" className="no-underline">
            <h1 className="text-5xl font-dancing-script font-bold text-red-600 mb-8 hover:text-red-700 transition-colors">
              Hamzu & Atto
            </h1>
          </Link>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/memories" element={<Memories />} />
            <Route path="/love-notes" element={<LoveNotes />} />
            <Route path="/future-dreams" element={<FutureDreams />} />
          </Routes>
        </motion.div>
      </Router>
    </PasswordProtection>
  );
}

export default App;