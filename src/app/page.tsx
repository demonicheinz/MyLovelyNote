"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Envelope from "@/components/Envelope";
import Letter from "@/components/Letter";
import MusicPlayer from "@/components/MusicPlayer";
import type { SongInfo } from "@/types";

export default function Home() {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  // Isi surat yang akan ditampilkan
  const letterContent = `Hai Kamu,

Sudah lama aku memikirkan kata-kata yang tepat untuk mengungkapkan perasaanku. Setiap kali bertemu denganmu, jantungku berdebar lebih kencang. Setiap tawamu adalah melodi terindah di telingaku.

Aku menyukaimu. Bukan hanya karena senyummu yang menawan, tapi juga karena kebaikan hatimu, caramu memandang dunia, dan bagaimana kamu membuatku ingin menjadi versi terbaik dari diriku.

Maukah kamu menjadi pacarku? Aku ingin menghabiskan lebih banyak waktu bersamamu, mengenalmu lebih dalam, dan menulis cerita indah bersama.

Aku akan menunggu jawabanmu dengan hati yang berdebar.`;

  // Informasi lagu
  const songInfo: SongInfo = {
    title: "Calling Out Your Name",
    artist: "MANIA & Tom Wigley (ft. Lottie Jones)",
    src: "/music/calling-out-your-name.mp3",
    copyright: "© Music provided by",
    copyrightUrl: "https://ncs.io/COYN",
  };

  const handleOpenEnvelope = () => {
    setIsEnvelopeOpen(true);
  };

  const handleToggleMusic = () => {
    setIsMusicPlaying(!isMusicPlaying);
  };

  const backgroundStyle = {
    background: "linear-gradient(to bottom, #ffe4e6, #ffffff)",
    filter: isEnvelopeOpen ? "blur(3px)" : "none",
    transition: "filter 0.5s ease",
  };

  // Efek blur background ketika surat terbuka
  // const backgroundStyle = {
  //   backgroundImage: "url('/images/background.jpg')",
  //   backgroundSize: "cover",
  //   backgroundPosition: "center",
  //   filter: isEnvelopeOpen ? "blur(3px)" : "none",
  //   transition: "filter 0.5s ease",
  // };

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center p-4 overflow-hidden">
      <div
        className="absolute inset-0 -z-10"
        style={backgroundStyle}
      />

      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center justify-center min-h-[80vh]">
        {!isEnvelopeOpen && (
          <motion.h1
            className="text-3xl md:text-4xl text-pink-600 font-handwriting mb-8 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Ada pesan spesial untukmu
          </motion.h1>
        )}

        <div className="relative w-full flex flex-col items-center">
          <Envelope
            onOpen={handleOpenEnvelope}
            isOpen={isEnvelopeOpen}
            onToggleMusic={handleToggleMusic}
            isMusicPlaying={isMusicPlaying}
          />

          {isEnvelopeOpen && (
            <Letter
              isOpen={isEnvelopeOpen}
              letterContent={letterContent}
            />
          )}
        </div>
      </div>

      <MusicPlayer
        isPlaying={isMusicPlaying}
        onToggle={handleToggleMusic}
        songInfo={songInfo}
      />
    </main>
  );
}
