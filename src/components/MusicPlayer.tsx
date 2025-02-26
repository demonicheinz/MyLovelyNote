// components/MusicPlayer.tsx
import { useRef, useEffect, useState } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import type { SongInfo } from "@/types";

interface MusicPlayerProps {
  isPlaying: boolean;
  onToggle: () => void;
  songInfo: SongInfo;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ isPlaying, onToggle, songInfo }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.5);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch((err) => {
          console.error("Autoplay failed:", err);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  const toggleMute = (): void => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);

    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }

    if (newVolume === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-md  my-1">
      <audio
        ref={audioRef}
        src={songInfo.src}
        loop
        preload="auto"
      />

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onToggle}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-pink-100 text-pink-600 hover:bg-pink-200"
        >
          {isPlaying ? <Pause size={16} /> : <Play size={16} />}
        </button>

        <button
          type="button"
          onClick={toggleMute}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-pink-100 text-pink-600 hover:bg-pink-200"
        >
          {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>

        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className="w-20 h-1 bg-pink-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>

      <div className="mt-2 text-xs text-gray-600">
        <div className="font-medium my-1">{songInfo.title}</div>
        <div className=" my-1">{songInfo.artist}</div>
        <div className="text-gray-400 text-xs  my-1">
          {songInfo.copyright}{" "}
          <a
            href={songInfo.copyrightUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500 hover:font-medium transition-all"
          >
            NoCopyrightSounds
          </a>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
