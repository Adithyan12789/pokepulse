"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CatchPokemonProps {
  image: string;
  name: string;
  trigger: boolean;
  onComplete?: () => void;
}

const sparkleArray = new Array(30).fill(0);

const CatchPokemon = ({
  image,
  name,
  trigger,
  onComplete,
}: CatchPokemonProps) => {
  const [show, setShow] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (trigger) {
      setShow(true);

      if (!audioRef.current) {
        audioRef.current = new Audio("/celebration.mp3");
      }

      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current
          .play()
          .catch((e) => console.warn("Autoplay prevented:", e.message));
      }

      const audioStopper = setTimeout(() => {
        audioRef.current?.pause();
      }, 5000);

      const timer = setTimeout(() => {
        setShow(false);
        onComplete?.();
      }, 3500);

      return () => {
        clearTimeout(audioStopper);
        clearTimeout(timer);
        audioRef.current?.pause();
        audioRef.current!.currentTime = 0;
      };
    }
  }, [trigger, onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 backdrop-blur"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          
          {sparkleArray.map((_, i) => (
            <motion.div
              key={i}
              style={{
                position: "absolute",
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                fontSize: "1.2rem",
                color: "#FACC15",
                pointerEvents: "none",
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: [0, 1, 0], y: [-10, -30, -50] }}
              transition={{
                duration: 2,
                delay: Math.random() * 1,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              ✨
            </motion.div>
          ))}

          {/* Animated Pokémon */}
          <motion.img
            src={image}
            alt={name}
            className="z-10 drop-shadow-2xl"
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1.3, rotate: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            style={{ width: 350, height: 350 }}
          />

          {/* Catch Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="absolute bottom-20 text-yellow-300 text-2xl md:text-3xl font-bold text-center"
          >
            You caught <span className="capitalize">{name}</span>!
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CatchPokemon;
