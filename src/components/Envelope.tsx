import { useState } from "react";
import { Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface EnvelopeProps {
  onOpen: () => void;
  isOpen: boolean;
  onToggleMusic: () => void;
  isMusicPlaying: boolean;
}

const Envelope: React.FC<EnvelopeProps> = ({ onOpen, isOpen, onToggleMusic, isMusicPlaying }) => {
  const [isHovering, setIsHovering] = useState<boolean>(false);

  const handleEnvelopeClick = (): void => {
    if (!isOpen) {
      onOpen();
    }
  };

  const handleHeartClick = (e: React.MouseEvent): void => {
    e.stopPropagation();
    onToggleMusic();
  };

  return (
    <div className="flex justify-center items-center w-full h-full">
      <AnimatePresence>
        {!isOpen ? (
          <motion.div
            className="relative w-64 h-48 bg-pink-100 rounded-lg shadow-lg cursor-pointer"
            whileHover={{ scale: 1.05 }}
            onClick={handleEnvelopeClick}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100, rotateX: 90 }}
            transition={{ duration: 0.5 }}
          >
            {/* Amplop bagian depan */}
            <div className="absolute inset-0 flex justify-center items-center bg-pink-200 rounded-lg border-2 border-pink-300">
              <motion.div
                className="absolute"
                animate={{ scale: isHovering ? 1.2 : 1 }}
                transition={{ duration: 0.3 }}
              >
                <Heart
                  size={40}
                  className={`${isMusicPlaying ? "text-red-500 fill-red-500" : "text-red-400"} cursor-pointer`}
                  onClick={handleHeartClick}
                />
              </motion.div>

              <div className="absolute bottom-2 text-center text-pink-700 text-sm font-handwriting">
                Untuk kamu yang spesial ❤️
              </div>
            </div>

            {/* Bagian bawah amplop (flap) */}
            {/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
            <div className="absolute top-0 left-0 w-full h-6 bg-pink-300 rounded-t-lg"></div>

            {/* Sisi-sisi amplop */}
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-pink-300 opacity-50" />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};

export default Envelope;
