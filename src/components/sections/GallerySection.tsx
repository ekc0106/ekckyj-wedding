'use client';

import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { weddingConfig } from '../../config/wedding-config';

interface GallerySectionProps {
  bgColor?: 'white' | 'beige';
}

/* ───────────────── Icons ───────────────── */
const ArrowLeftIcon = styled(({ className }: { className?: string }) => (
  <svg className={className} width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="14" cy="14" r="14" fill="none"/>
    <path d="M17.5 7L11 14L17.5 21" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
))`
  margin-left: -0.25rem;
`;
const ArrowRightIcon = styled(({ className }: { className?: string }) => (
  <svg className={className} width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="14" cy="14" r="14" fill="none"/>
    <path d="M10.5 7L17 14L10.5 21" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
))`
  margin-right: -0.25rem;
`;

/* ──────────────── Small UI ─────────────── */
const LoadingSpinner = styled.div`
  width: 3rem;
  height: 3rem;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s ease-in-out infinite;
  @keyframes spin { to { transform: rotate(360deg); } }
`;

/* ─────────────── Component ─────────────── */
const GallerySection = ({ bgColor = 'white' }: GallerySectionProps) => {
  // config에서 직접 이미지 로드 (빠른 초기 렌더링)
  const [images] = useState<string[]>(weddingConfig.gallery.images);
  const [error, setError] = useState<string | null>(null);
  const [preloadedImages, setPreloadedImages] = useState<Set<string>>(new Set());

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // 확대 보기 상태
  const [expandedImage, setExpandedImage] = useState<string | null>(null);
  const [expandedImageIndex, setExpandedImageIndex] = useState<number>(-1);
  const [isExpandedImageLoading, setIsExpandedImageLoading] = useState<boolean>(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  // 전환 방향(애니메이션 제어)
  const [transitionDir, setTransitionDir] = useState<'next' | 'prev' | null>(null);

  // 레이아웃 모드
  const galleryLayout = weddingConfig.gallery.layout || 'scroll';

  // 이미지 프리로딩 함수
  const preloadImage = (src: string) => {
    if (preloadedImages.has(src)) return Promise.resolve();
    
    return new Promise<void>((resolve, reject) => {
      const img = new window.Image();
      img.onload = () => {
        setPreloadedImages(prev => new Set([...prev, src]));
        resolve();
      };
      img.onerror = reject;
      img.src = src;
    });
  };

  // 이미지 목록이 로드된 후 즉시 모든 이미지 프리로딩
  useEffect(() => {
    if (!images.length) return;
    
    const aggressivePreload = async () => {
      // 모든 이미지를 동시에 프리로딩 (속도 우선)
      const allPromises = images.map((img, index) => {
        // 첫 5개는 즉시, 나머지는 약간의 딜레이
        const delay = index < 5 ? 0 : index * 50;
        return new Promise(resolve => {
          setTimeout(() => {
            preloadImage(img).then(resolve).catch(resolve);
          }, delay);
        });
      });
      
      await Promise.allSettled(allPromises);
      console.log('갤러리 이미지 프리로딩 완료:', preloadedImages.size, '/', images.length);
    };
    
    // 즉시 시작 (idle 대기 없이)
    aggressivePreload();
  }, [images]);


  // 브라우저 뒤로가기 처리(확대 상태)
  useEffect(() => {
    if (!expandedImage) return;
    window.history.pushState({ expandedImage: true }, "");
    const handlePopState = (event: PopStateEvent) => {
      if (expandedImage) {
        setExpandedImage(null);
        document.body.style.overflow = '';
        event.preventDefault();
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [expandedImage]);

  // 확대 상태에서 스와이프 제스처
  useEffect(() => {
    if (!expandedImage || !overlayRef.current) return;
    let startX = 0, startY = 0;
    const overlay = overlayRef.current;
    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    };
    const handleTouchEnd = (e: TouchEvent) => {
      const endX = e.changedTouches[0].clientX;
      const endY = e.changedTouches[0].clientY;
      const dx = endX - startX, dy = endY - startY;
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
        dx > 0 ? goToPreviousImage() : goToNextImage();
      }
    };
    overlay.addEventListener('touchstart', handleTouchStart, { passive: true });
    overlay.addEventListener('touchend', handleTouchEnd, { passive: true });
    return () => {
      overlay.removeEventListener('touchstart', handleTouchStart);
      overlay.removeEventListener('touchend', handleTouchEnd);
    };
  }, [expandedImage]);

  // 확대 상태에서 이전/다음 이미지 미리 로드(전환시 체감↑)
  useEffect(() => {
    if (expandedImageIndex < 0) return;
    const preload = (i: number) => {
      const src = images[i];
      if (!src) return;
      const img = new window.Image();
      img.src = src;
    };
    preload(expandedImageIndex + 1);
    preload(expandedImageIndex - 1);
  }, [expandedImageIndex, images]);

  // 키보드/휠 전환
  useEffect(() => {
    if (!expandedImage) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowLeft': event.preventDefault(); goToPreviousImage(); break;
        case 'ArrowRight': event.preventDefault(); goToNextImage(); break;
        case 'Escape': event.preventDefault(); handleCloseExpanded(); break;
      }
    };
    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      event.deltaY > 0 ? goToNextImage() : goToPreviousImage();
    };
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('wheel', handleWheel);
    };
  }, [expandedImage, expandedImageIndex, images]);
  // 핀치줌 방지 처리 (확대 모드일 때만)
  useEffect(() => {
    if (expandedImage) {
      // 확대 모드일 때 핀치줌 차단
      document.body.style.touchAction = "none";
    } else {
      // 닫힐 때 원래대로 복구
      document.body.style.touchAction = "auto";
    }
  }, [expandedImage]);
  // 썸네일 스크롤 버튼
  const scrollLeft = () => scrollContainerRef.current?.scrollBy({ left: -266, behavior: 'smooth' });
  const scrollRight = () => scrollContainerRef.current?.scrollBy({ left: 266, behavior: 'smooth' });

  // 썸네일 클릭 → 확대
  const handleImageClick = (image: string) => {
    const imageIndex = images.indexOf(image);
    setExpandedImage(image);
    setExpandedImageIndex(imageIndex);
    
    // 이미지가 이미 프리로드되었는지 확인
    const isPreloaded = preloadedImages.has(image);
    setIsExpandedImageLoading(!isPreloaded);
    
    setTransitionDir(null);
    document.body.style.overflow = 'hidden';
    
    // 인접한 이미지들도 미리 로드
    const adjacentImages = [
      images[imageIndex - 1],
      images[imageIndex + 1]
    ].filter(Boolean);
    
    adjacentImages.forEach(img => {
      preloadImage(img).catch(() => {});
    });
  };

  const goToPreviousImage = () => {
    if (expandedImageIndex > 0) {
      const newIndex = expandedImageIndex - 1;
      const newImage = images[newIndex];
      
      setTransitionDir('prev');
      setExpandedImageIndex(newIndex);
      setExpandedImage(newImage);
      
      // 이미지가 프리로드되었는지 확인
      const isPreloaded = preloadedImages.has(newImage);
      setIsExpandedImageLoading(!isPreloaded);
    }
  };
  const goToNextImage = () => {
    if (expandedImageIndex < images.length - 1) {
      const newIndex = expandedImageIndex + 1;
      const newImage = images[newIndex];
      
      setTransitionDir('next');
      setExpandedImageIndex(newIndex);
      setExpandedImage(newImage);
      
      // 이미지가 프리로드되었는지 확인
      const isPreloaded = preloadedImages.has(newImage);
      setIsExpandedImageLoading(!isPreloaded);
    }
  };

  const handleCloseExpanded = () => {
    setExpandedImage(null);
    setExpandedImageIndex(-1);
    setIsExpandedImageLoading(false);
    setTransitionDir(null);
    document.body.style.overflow = '';
    if (window.history.state && window.history.state.expandedImage) {
      window.history.back();
    }
  };

  const handleExpandedImageLoad = () => {
    setIsExpandedImageLoading(false);
    // 로드 완료된 이미지를 프리로드 캐시에 추가
    if (expandedImage) {
      setPreloadedImages(prev => new Set([...prev, expandedImage]));
    }
  };
  const handleExpandedImageError = () => setIsExpandedImageLoading(false);

  if ((images?.length ?? 0) === 0) {
    return (
      <GallerySectionContainer $bgColor={bgColor}>
        <SectionTitle>갤러리</SectionTitle>
        <ErrorContainer>{error || '갤러리 이미지가 없습니다'}</ErrorContainer>
      </GallerySectionContainer>
    );
  }

  return (
    <GallerySectionContainer $bgColor={bgColor}>
      <SectionTitle>갤러리</SectionTitle>

      {galleryLayout === 'grid' ? (
        <GalleryGridContainer>
          {images.map((image, index) => (
            <GalleryGridCard key={image} onClick={() => handleImageClick(image)}>
              <GalleryGridImageWrapper>
                <GalleryNextImage
                  src={image}
                  alt={`웨딩 갤러리 이미지 ${index + 1}`}
                  fill
                  priority={index < 5}
                  loading="eager"
                  quality={80}
                  sizes="(max-width:768px) calc(33.333vw - 0.5rem), 260px"
                  placeholder="empty"
                  style={{ objectFit: 'cover' }}
                  draggable={false}
                  onContextMenu={e => e.preventDefault()}
                />
              </GalleryGridImageWrapper>
            </GalleryGridCard>
          ))}
        </GalleryGridContainer>
      ) : (
        <GalleryContainer>
          <GalleryButton onClick={scrollLeft} aria-label="이전 이미지들" className="left-button">
            <ArrowLeftIcon />
          </GalleryButton>

          <GalleryScrollContainer ref={scrollContainerRef}>
            {images.map((image, index) => (
              <GalleryCard key={image} onClick={() => handleImageClick(image)}>
                <GalleryImageWrapper>
                  <GalleryNextImage
                    src={image}
                    alt={`웨딩 갤러리 이미지 ${index + 1}`}
                    fill
                    priority={index < 5}
                    loading="eager"
                    quality={80}
                    sizes="(max-width:768px) 250px, 300px"
                    placeholder="empty"
                    style={{ objectFit: 'cover' }}
                    draggable={false}
                    onContextMenu={e => e.preventDefault()}
                  />
                </GalleryImageWrapper>
              </GalleryCard>
            ))}
          </GalleryScrollContainer>

          <GalleryButton onClick={scrollRight} aria-label="다음 이미지들" className="right-button">
            <ArrowRightIcon />
          </GalleryButton>
        </GalleryContainer>
      )}

      {expandedImage && (
        <ExpandedImageOverlay
          ref={overlayRef}
          onClick={handleCloseExpanded}
          aria-modal="true"
          role="dialog"
        >
          <ExpandedImageContainer onClick={e => e.stopPropagation()}>
            {isExpandedImageLoading && (
              <LoadingSpinnerContainer>
                <LoadingSpinner />
              </LoadingSpinnerContainer>
            )}

            {/* 부드러운 전환: key로 재마운트 + 방향 애니메이션 */}
            <AnimatedImageWrapper
              key={expandedImage}
              $dir={transitionDir}
              $isLoading={isExpandedImageLoading}
            >
              <Image
                src={expandedImage}
                alt="확대된 웨딩 갤러리 이미지"
                fill
                priority
                quality={95}
                sizes="100vw"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                // style={{ objectFit: 'contain', background: 'transparent' }}
                style={{ 
                  objectFit: 'contain', 
                  background: 'transparent',
                  pointerEvents: 'none'   // ✅ 확대/줌/드래그 불가
                }}
                draggable={false}          // ✅ 드래그 방지
                onContextMenu={e => e.preventDefault()} // ✅ 우클릭 방지
                onLoad={handleExpandedImageLoad}
                onError={handleExpandedImageError}
              />
            </AnimatedImageWrapper>

            {/* 좌/우 오버레이 버튼(클릭 전환) */}
            <OverlayArrowButton
              $side="left"
              aria-label="이전 이미지"
              onClick={(e) => { e.stopPropagation(); goToPreviousImage(); }}
            >
              <ArrowLeftIcon />
            </OverlayArrowButton>
            <OverlayArrowButton
              $side="right"
              aria-label="다음 이미지"
              onClick={(e) => { e.stopPropagation(); goToNextImage(); }}
            >
              <ArrowRightIcon />
            </OverlayArrowButton>

            <CloseButton onClick={handleCloseExpanded} aria-label="닫기">×</CloseButton>
          </ExpandedImageContainer>
        </ExpandedImageOverlay>
      )}
    </GallerySectionContainer>
  );
};

/* ───────────────── Styles ───────────────── */
const GallerySectionContainer = styled.section<{ $bgColor: 'white' | 'beige' }>`
  padding: 4rem 1.5rem;
  text-align: center;
  background-color: ${props => props.$bgColor === 'beige' ? '#F8F6F2' : 'white'};
`;

const SectionTitle = styled.h2`
  position: relative;
  display: inline-block;
  margin-bottom: 2rem;
  font-weight: 500;
  font-size: 1.5rem;
  &::after {
    content: '';
    position: absolute;
    bottom: -16px;
    left: 50%;
    transform: translateX(-50%);
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: var(--secondary-color);
  }
`;

const GalleryContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  .left-button { position: absolute; left: -0.25rem; top: 50%; transform: translateY(-50%); z-index: 10; }
  .right-button { position: absolute; right: -0.25rem; top: 50%; transform: translateY(-50%); z-index: 10; }
`;

const GalleryScrollContainer = styled.div`
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  gap: 1rem;
  padding: 1rem 0.5rem;
  -ms-overflow-style: none;
  scrollbar-width: none;
  padding-left: calc(50% - 125px);
  padding-right: calc(50% - 125px);
  &::-webkit-scrollbar { display: none; }
  -webkit-overflow-scrolling: touch; /* 모바일 관성 스크롤 */
`;

const GalleryCard = styled.div`
  scroll-snap-align: center;
  flex: 0 0 auto;
  width: 250px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
  overflow: hidden;
  transition: transform 0.3s ease;
  cursor: pointer;
  &:hover { transform: translateY(-5px); }
`;

const GalleryImageWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 100%;
`;

const GalleryNextImage = styled(Image)`
  border-radius: 8px;
  transition: transform 0.3s;
  &:hover { transform: scale(1.05); }
`;

const GalleryButton = styled.button`
  background-color: var(--secondary-color);
  color: white;
  border: none;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: 0.9;
  transition: all 0.3s ease;
  z-index: 2;
  font-size: 2rem;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
  &:hover { opacity: 1; background-color: var(--secondary-color); box-shadow: 0 3px 10px rgba(0,0,0,0.25); }
  &:active { transform: translateY(-50%) scale(0.95); }
`;

const ExpandedImageOverlay = styled.div`
  position: fixed; top: 0; left: 0; right: 0; bottom: 0;
  width: 100vw; height: 100vh;
  background-color: rgba(0, 0, 0, 0.9);
  z-index: 1000;
  display: flex; align-items: center; justify-content: center;
`;

const ExpandedImageContainer = styled.div`
  position: relative;
  width: 100vw; height: 100vh;
  max-width: none; max-height: none;
  background-color: transparent; overflow: hidden;
  display: flex; align-items: center; justify-content: center;
`;

const ExpandedImageWrapper = styled.div<{ $isLoading: boolean }>`
  position: relative;
  width: 90vw; height: 90vh; max-width: 90vw; max-height: 90vh;
  display: flex; align-items: center; justify-content: center;
  opacity: ${({ $isLoading }) => ($isLoading ? 0.5 : 1)};
  transition: opacity 0.3s ease;
`;

/* 전환 애니메이션 래퍼(좌/우 슬라이드) */
const AnimatedImageWrapper = styled(ExpandedImageWrapper)<{ $dir: 'next' | 'prev' | null }>`
  animation: ${({ $dir }) =>
    $dir === 'next'
      ? 'slideInFromRight 240ms cubic-bezier(0.22,0.61,0.36,1) both'
      : $dir === 'prev'
      ? 'slideInFromLeft 240ms cubic-bezier(0.22,0.61,0.36,1) both'
      : 'fadeIn 200ms ease both'};

  @keyframes slideInFromRight {
    from { opacity: 0; transform: translateX(24px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes slideInFromLeft {
    from { opacity: 0; transform: translateX(-24px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
`;

/* 오버레이 좌/우 화살표 버튼 (클릭 전환용) */
const OverlayArrowButton = styled.button<{ $side: 'left' | 'right' }>`
  position: absolute;
  top: 50%;
  ${({ $side }) => ($side === 'left' ? 'left: 1rem;' : 'right: 1rem;')}
  transform: translateY(-50%);
  width: 3rem; height: 3rem;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.18);
  color: #fff; border: none;
  display: flex; align-items: center; justify-content: center;
  backdrop-filter: blur(2px);
  cursor: pointer; opacity: 0.9;
  transition: background 0.2s ease, opacity 0.2s ease, transform 0.2s ease;
  z-index: 11;
  &:hover { opacity: 1; background: rgba(255, 255, 255, 0.25); }
  &:active { transform: translateY(-50%) scale(0.96); }
`;

const CloseButton = styled.button`
  position: absolute; top: 1rem; right: 1rem;
  width: 2.5rem; height: 2.5rem;
  background-color: var(--secondary-color); color: white;
  border: none; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 1.5rem; cursor: pointer; z-index: 12; opacity: 0.9;
  &:hover { opacity: 1; }
`;

const LoadingSpinnerContainer = styled.div`
  position: absolute; top: 50%; left: 50%;
  transform: translate(-50%, -50%); z-index: 5;
`;

const GalleryGridContainer = styled.div`
  display: grid; grid-template-columns: repeat(3, 1fr);
  gap: 1rem; max-width: 800px; margin: 2rem auto 0; padding: 0 1rem;
  @media (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 0.5rem; padding: 0 0.5rem; margin-top: 1.5rem;
  }
`;

const GalleryGridCard = styled.div`
  border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);
  overflow: hidden; transition: transform 0.3s ease;
  cursor: pointer; position: relative; width: 100%;
  &:hover { transform: translateY(-5px); }
`;

const GalleryGridImageWrapper = styled.div`
  position: relative; width: 100%; padding-bottom: 100%;
`;

const ErrorContainer = styled.div`
  padding: 3rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
  max-width: 36rem;
  margin: 0 auto;
  color: #c62828;
`;

export default GallerySection;
