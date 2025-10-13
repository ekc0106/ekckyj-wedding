"use client";

import React, { createContext, useContext, useRef, useState, useCallback, useEffect } from 'react';

interface AudioContextType {
  audioRef: React.RefObject<HTMLAudioElement | null>;
  muted: boolean;
  setMuted: (muted: boolean) => void;
  isVideoPlaying: boolean;
  setIsVideoPlaying: (playing: boolean) => void;
  toggleMute: () => void;
  resumeAudio: () => void;
  isIOS: boolean;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within AudioProvider');
  }
  return context;
};

// iOS 환경 감지 함수
const detectIOS = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  const userAgent = window.navigator.userAgent.toLowerCase();
  const isIOS = /iphone|ipad|ipod/.test(userAgent);
  const isSafari = /safari/.test(userAgent) && !/chrome/.test(userAgent);
  
  // iOS Safari 또는 iOS 기기인지 확인
  return isIOS || (isSafari && 'ontouchstart' in window);
};

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [muted, setMuted] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  // 클라이언트 사이드에서만 iOS 감지
  useEffect(() => {
    setIsIOS(detectIOS());
    
    if (detectIOS()) {
      console.log('iOS 환경 감지 - 특별한 오디오 관리 적용');
    }
  }, []);

  const toggleMute = useCallback(() => {
    if (audioRef.current) {
      const newMutedState = !muted;
      audioRef.current.muted = newMutedState;
      setMuted(newMutedState);
      
      // 음소거 해제 시 명시적으로 재생 시도 (iOS 대응)
      if (!newMutedState && !isVideoPlaying) {
        // iOS에서는 사용자 인터랙션이 필요하므로 즉시 재생 시도
        audioRef.current.play().catch(err => {
          console.warn("재생 실패:", err);
          
          // iOS에서 재생 실패 시 다음 사용자 인터랙션 시 재시도
          if (isIOS) {
            const retryPlay = () => {
              audioRef.current?.play().catch(e => console.warn("재시도 실패:", e));
              document.removeEventListener('touchstart', retryPlay);
            };
            document.addEventListener('touchstart', retryPlay, { once: true });
          }
        });
      }
    }
  }, [muted, isVideoPlaying, isIOS]);

  const resumeAudio = useCallback(() => {
    if (audioRef.current && !muted && !isVideoPlaying) {
      // iOS에서는 더 긴 딜레이가 필요할 수 있음
      const delay = isIOS ? 200 : 100;
      
      setTimeout(() => {
        audioRef.current?.play().catch(err => {
          console.warn("오디오 재개 실패:", err);
        });
      }, delay);
    }
  }, [muted, isVideoPlaying, isIOS]);

  const value = {
    audioRef,
    muted,
    setMuted,
    isVideoPlaying,
    setIsVideoPlaying,
    toggleMute,
    resumeAudio,
    isIOS,
  };

  return <AudioContext.Provider value={value}>{children}</AudioContext.Provider>;
};

