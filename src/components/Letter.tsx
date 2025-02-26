import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import TypewriterText from "./TypewriterText";

interface LetterProps {
  isOpen: boolean;
  letterContent: string;
}

const Letter: React.FC<LetterProps> = ({ isOpen, letterContent }) => {
  const [isTitleAnimationDone, setIsTitleAnimationDone] = useState<boolean>(false);
  const [showContent, setShowContent] = useState<boolean>(false);
  const [isTypewriterDone, setIsTypewriterDone] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      // Set delay untuk menampilkan Typewriter setelah animasi judul selesai
      const titleTimer = setTimeout(() => {
        setIsTitleAnimationDone(true);
      }, 1200);

      return () => clearTimeout(titleTimer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <motion.div
      className="relative w-full max-w-xl bg-white rounded-lg p-8 shadow-lg"
      initial={{ opacity: 0, y: 50, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <div className="flex flex-col items-center">
        {/* Animasi Judul */}
        <motion.h2
          className="text-2xl font-handwriting text-pink-600 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          onAnimationComplete={() => setIsTitleAnimationDone(true)}
        >
          Surat Spesial Untukmu
        </motion.h2>

        {/* TypewriterText muncul setelah animasi judul selesai */}
        <div className="w-full text-gray-800 font-handwriting text-lg leading-relaxed">
          {isTitleAnimationDone && (
            <TypewriterText
              text={letterContent}
              delay={40}
              onComplete={() => setIsTypewriterDone(true)}
            />
          )}
        </div>

        {isTypewriterDone && (
          <motion.div
            className="mt-8 text-right w-full text-gray-700 font-handwriting"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            Dengan penuh cinta,
            <br />
            <span className="text-xl text-pink-600">❤️ Aku</span>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Letter;
