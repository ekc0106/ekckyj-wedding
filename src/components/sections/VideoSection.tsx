'use client';

import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { weddingConfig } from '../../config/wedding-config';
import { useAudio } from '../../contexts/AudioContext';

interface VideoSectionProps {
  bgColor?: 'white' | 'beige';
}

const VideoSection = ({ bgColor = 'white' }: VideoSectionProps) => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const { setIsVideoPlaying } = useAudio();
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // 동영상이 설정되지 않은 경우 섹션을 렌더링하지 않음
  if (!weddingConfig.video?.enabled || !weddingConfig.video?.url) {
    return null;
  }

  const handleVideoLoad = () => {
    setIsVideoLoaded(true);
  };

  // Vimeo iframe이 로드되지 않는 경우를 대비한 타이머
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVideoLoaded(true);
    }, 3000); // 3초 후 강제로 로딩 완료 처리

    return () => clearTimeout(timer);
  }, []);

  // Vimeo Player API를 통한 비디오 재생 상태 감지
  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    // Vimeo Player API를 사용하여 재생 상태 감지
    const handleMessage = (event: MessageEvent) => {
      // Vimeo에서 오는 메시지만 처리
      if (event.origin !== 'https://player.vimeo.com') return;

      try {
        const data = JSON.parse(event.data);
        
        if (data.event === 'play') {
          console.log('Vimeo 비디오 재생 시작');
          setIsVideoPlaying(true);
        } else if (data.event === 'pause' || data.event === 'ended') {
          console.log('Vimeo 비디오 정지/종료');
          setIsVideoPlaying(false);
        }
      } catch (err) {
        // JSON 파싱 실패 시 무시
      }
    };

    window.addEventListener('message', handleMessage);

    // iframe이 로드되면 Vimeo Player API 이벤트 구독
    const setupVimeoListeners = () => {
      if (iframe.contentWindow) {
        iframe.contentWindow.postMessage(JSON.stringify({
          method: 'addEventListener',
          value: 'play'
        }), 'https://player.vimeo.com');

        iframe.contentWindow.postMessage(JSON.stringify({
          method: 'addEventListener',
          value: 'pause'
        }), 'https://player.vimeo.com');

        iframe.contentWindow.postMessage(JSON.stringify({
          method: 'addEventListener',
          value: 'ended'
        }), 'https://player.vimeo.com');
      }
    };

    // iframe 로드 후 이벤트 리스너 설정
    if (iframe.contentWindow) {
      setupVimeoListeners();
    }

    return () => {
      window.removeEventListener('message', handleMessage);
      // 컴포넌트 언마운트 시 비디오 재생 상태 초기화
      setIsVideoPlaying(false);
    };
  }, [setIsVideoPlaying]);

  return (
    <VideoSectionContainer $bgColor={bgColor}>
      <VideoContent>
        <VideoTitle>{weddingConfig.video.title}</VideoTitle>
        {weddingConfig.video.description && (
          <VideoDescription>
            {weddingConfig.video.description}
          </VideoDescription>
        )}
        
        <VideoWrapper>
          {!isVideoLoaded && (
            <VideoPlaceholder>
              <LoadingSpinner />
              <LoadingText>영상을 불러오는 중...</LoadingText>
            </VideoPlaceholder>
          )}
          
          <VideoContainer>
            <VideoIframe
              ref={iframeRef}
              src={`${weddingConfig.video.url}?autoplay=0&loop=0&muted=0&controls=1&responsive=1`}
              title="웨딩 영상"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
              allowFullScreen
              onLoad={handleVideoLoad}
              onError={() => setIsVideoLoaded(true)}
              style={{ opacity: isVideoLoaded ? 1 : 0 }}
              loading="lazy"
            />
          </VideoContainer>
        </VideoWrapper>
        
        <VideoCaption>
            그리고 2026.01.24 ~ 💕
        </VideoCaption>
      </VideoContent>
    </VideoSectionContainer>
  );
};

const VideoSectionContainer = styled.section<{ $bgColor: 'white' | 'beige' }>`
  padding: 4rem 1.5rem;
  text-align: center;
  background-color: ${props => props.$bgColor === 'beige' ? '#F8F6F2' : 'white'};
  
  @media (max-width: 768px) {
    padding: 3rem 1rem;
  }
`;

const VideoContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const VideoTitle = styled.h2`
  font-family: 'PlayfairDisplay', serif;
  font-size: 2.5rem;
  color: var(--text-dark);
  margin-bottom: 1rem;
  font-weight: 400;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const VideoDescription = styled.p`
  font-size: 1.1rem;
  color: var(--text-medium);
  margin-bottom: 2.5rem;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 2rem;
  }
`;

const VideoWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 800px;
  margin: 0 auto 2rem;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  background: #000;
`;

const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 56.25%; /* 16:9 비율 */
`;

const VideoIframe = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
  transition: opacity 0.5s ease;
`;

const VideoPlaceholder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  z-index: 1;
`;

const LoadingSpinner = styled.div`
  width: 3rem;
  height: 3rem;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: var(--secondary-color);
  animation: spin 1s ease-in-out infinite;
  margin-bottom: 1rem;
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const LoadingText = styled.p`
  color: var(--text-medium);
  font-size: 1rem;
  margin: 0;
`;

const VideoCaption = styled.p`
  font-size: 1rem;
  color: var(--text-light);
  font-style: italic;
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

export default VideoSection;
