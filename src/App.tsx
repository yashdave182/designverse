import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import bg from './assets/bg.png';
import closedEye from './assets/closed_eye.png';
import openEye from './assets/open_eye.png';
import LoginForm from './components/LoginForm';


function App() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative min-h-screen w-full overflow-hidden text-white font-sans selection:bg-purple-500/30">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105"
        style={{ backgroundImage: `url(${bg})` }}
      />

      {/* Overlay for better readability if needed, but keeping it subtle for "galaxy" feel */}
      <div className="absolute inset-0 z-0 bg-black/20" />

      {/* Overlay for better readability if needed, but keeping it subtle for "galaxy" feel */}
      <div className="absolute inset-0 z-0 bg-black/20" />

      {/* Main Content - Split Layout */}
      <div className="relative z-10 flex min-h-screen w-full">

        {/* Left Side - Astronaut */}
        <div className="hidden lg:flex w-1/2 items-center justify-center p-12">
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-full max-w-lg aspect-square"
          >
            <AnimatePresence>
              {showPassword ? (
                <motion.img
                  key="open"
                  src={openEye}
                  alt="Astronaut looking"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="absolute inset-0 w-full h-full object-contain drop-shadow-[0_0_50px_rgba(100,200,255,0.4)]"
                />
              ) : (
                <motion.img
                  key="closed"
                  src={closedEye}
                  alt="Astronaut closed eyes"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="absolute inset-0 w-full h-full object-contain drop-shadow-[0_0_30px_rgba(100,100,255,0.2)]"
                />
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Right Side - Login Form */}
        {/* Right Side - Login Form */}
        <div className="flex w-full lg:w-1/2 items-center justify-center p-6 md:p-12 z-20">
          <LoginForm showPassword={showPassword} setShowPassword={setShowPassword} />
        </div>

      </div>
    </div>
  )
}

export default App
