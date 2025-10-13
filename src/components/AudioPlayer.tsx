"use client";

import { useEffect, useRef, useState } from "react";

export default function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [muted, setMuted] = useState(false); // 시작은 음소거 해제

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      // 페이지 로드 시 자동재생 시도
      const playAudio = () => {
        audio.muted = false;
        audio.play().catch(err => {
          console.warn("자동재생 실패:", err);
          // 자동재생이 실패하면 사용자 상호작용 후 재생
          const enableSound = () => {
            audio.muted = false;
            audio.play().catch(err => {
              console.warn("재생 실패:", err);
            });
            setMuted(false);
            document.removeEventListener("click", enableSound);
            document.removeEventListener("touchstart", enableSound);
          };
          document.addEventListener("click", enableSound, { once: true });
          document.addEventListener("touchstart", enableSound, { once: true });
        });
        setMuted(false);
      };
      
      // 즉시 재생 시도
      playAudio();
    }
  }, []);

  const toggleMute = () => {
    if (audioRef.current) {
      const newMutedState = !muted;
      audioRef.current.muted = newMutedState;
      setMuted(newMutedState);
      
      // iOS 대응: 음소거 해제 시 명시적으로 play() 호출
      if (!newMutedState) {
        audioRef.current.play().catch(err => {
          console.warn("재생 실패:", err);
        });
      }
    }
  };

  return (
    <div style={{ position: "fixed", top: "1rem", left: "1rem", zIndex: 2000 }}>
      <audio ref={audioRef} src="/music/wedding.mp3" autoPlay loop />
      <button
        onClick={toggleMute}
        style={{
          background: "rgba(255,192,203,0.8)",
          color: "white",
          border: "none",
          borderRadius: "50%",
          width: "28px",
          height: "28px",
          cursor: "pointer",
          fontSize: "12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.3s ease",
          backdropFilter: "blur(10px)",
          boxShadow: "0 2px 8px rgba(255,192,203,0.4)"
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.background = "rgba(255,182,193,0.9)";
          e.currentTarget.style.transform = "scale(1.1)";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.background = "rgba(255,192,203,0.8)";
          e.currentTarget.style.transform = "scale(1)";
        }}
      >
        {muted ? "💕" : "🎵"}
      </button>
    </div>
  );
}
