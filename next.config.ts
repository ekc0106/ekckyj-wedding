/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  
  // 이미지 최적화 설정
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 512, 768, 1024],
    minimumCacheTTL: 31536000, // 1년 캐시
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // 와이파이 환경에서의 로딩 최적화
    loader: 'default',
    unoptimized: false,
    // 이미지 품질 최적화
    quality: 85,
    // 더 빠른 로딩을 위한 설정
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  
  // 성능 최적화 설정
  // Next.js 15에서는 swcMinify 옵션이 제거되었습니다
  
  // 외부 이미지 도메인 설정 (필요시 추가)
  // images: {
  //   domains: ['example.com'],
  // },
  
  // 환경 변수 설정
  env: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  },
  
  // 캐시 정책을 더 스마트하게 설정
  async headers() {
    return [
      // HTML 파일들은 짧은 캐시 (즉시 업데이트 반영)
      {
        source: '/',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=300, s-maxage=300, stale-while-revalidate=86400',
          },
        ],
      },
      {
        source: '/:path*',
        has: [
          {
            type: 'header',
            key: 'accept',
            value: 'text/html.*',
          },
        ],
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=300, s-maxage=300, stale-while-revalidate=86400',
          },
        ],
      },
      // 정적 에셋들 (이미지, 폰트 등)은 장기간 캐시 + 압축
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable, stale-while-revalidate=86400',
          },
          {
            key: 'Vary',
            value: 'Accept-Encoding',
          },
        ],
      },
      {
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable, stale-while-revalidate=86400',
          },
          {
            key: 'Vary',
            value: 'Accept-Encoding',
          },
        ],
      },
      // JS/CSS 파일들 (Next.js가 자동으로 해시 추가)
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable, stale-while-revalidate=86400',
          },
        ],
      },
      // API 라우트는 캐시하지 않음
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, max-age=0, must-revalidate',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
