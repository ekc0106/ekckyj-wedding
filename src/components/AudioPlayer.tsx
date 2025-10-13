"use client";

import { useEffect } from "react";
import { useAudio } from "../contexts/AudioContext";

export default function AudioPlayer() {
  const { audioRef, muted, isVideoPlaying, toggleMute } = useAudio();

  useEffect(() => {
    if (!audioRef) return;
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
            document.removeEventListener("click", enableSound);
            document.removeEventListener("touchstart", enableSound);
          };
          document.addEventListener("click", enableSound, { once: true });
          document.addEventListener("touchstart", enableSound, { once: true });
        });
      };
      
      // 즉시 재생 시도
      playAudio();
    }
  }, [audioRef]);

  // 비디오 재생 상태에 따른 오디오 관리 (iOS 대응)
  useEffect(() => {
    if (!audioRef) return;
    const audio = audioRef.current;
    if (!audio) return;

    if (isVideoPlaying) {
      // 비디오 재생 시 배경음악 일시정지
      audio.pause();
      console.log("비디오 재생 중 - 배경음악 일시정지");
    } else {
      // 비디오 정지 시 배경음악 재개 (음소거 상태가 아닐 때만)
      if (!muted) {
        // iOS에서 안정적인 재생을 위해 약간의 딜레이 추가
        setTimeout(() => {
          audio.play().catch(err => {
            console.warn("배경음악 재개 실패:", err);
          });
          console.log("비디오 정지 - 배경음악 재개");
        }, 100);
      }
    }
  }, [isVideoPlaying, muted, audioRef]);

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
