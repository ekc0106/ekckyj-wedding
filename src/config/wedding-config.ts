const uniqueIdentifier = "JWK-WEDDING-TEMPLATE-V1";

// 갤러리 레이아웃 타입 정의
type GalleryLayout = "scroll" | "grid";
type GalleryPosition = "middle" | "bottom";

interface GalleryConfig {
  layout: GalleryLayout;
  position: GalleryPosition;
  images: string[];
}

export const weddingConfig = {
  // 메타 정보
  meta: {
    title: "엄규철 ❤️ 김유진의 결혼식에 초대합니다",
    description: "결혼식 초대장",
    ogImage: "/images/thumbnail.jpg",
    noIndex: true,
    _jwk_watermark_id: uniqueIdentifier,
    _deployment_trigger: "2025-12-11-17:30", // Vercel 배포 강제 트리거
  },

  // 메인 화면
  main: {
    title: "Wedding Invitation",
    image: "/images/main.jpg?v=3",
    date: "2026년 1월 24일 토요일 12시 10분",
    venue: "빌라드지디 안산 그레이스켈리홀",
  },

  // 소개글
  intro: {
    title: "",
    text: "학교에서 선후배로 만나\n사랑으로 이어진 지 아홉 해.\n\n그 소중한 시간이 쌓여\n이제는 부부로서 첫 발걸음을 내딛습니다.\n\저희의 첫걸음을 지켜봐 주신다면\n더없는 행복으로 간직하겠습니다."
  },

  // 결혼식 일정
  date: {
    year: 2026,
    month: 1,
    day: 24,
    hour: 12,
    minute: 10,
    displayDate: "2026.01.24 SAT PM 12:10",
  },

  // 장소 정보
  venue: {
    name: "빌라드지디 안산",
    address: "경기 안산시 단원구 광덕4로 140\n빌라드지디 안산 7층 그레이스켈리홀",
    tel: "031-487-8100",
    naverMapId: "그레이스켈리홀", // 네이버 지도 검색용 장소명
    coordinates: {
      latitude: 37.314924,
      longitude: 126.8278801,
    },
    placeId: "34291584", // 네이버 지도 장소 ID
    mapZoom: "15", // 지도 줌 레벨 (한 칸 축소)
    mapNaverCoordinates: "14141300,4507203,15,0,0,0,dh", // 네이버 지도 길찾기 URL용 좌표 파라미터 (구 형식)
    transportation: {
      subway: "지하철 4호선 고잔역 2번 출구에서\n왼쪽 대로변 따라 200m 전방에 위치(도보 10분)",
      bus: "97번, 98번, 99-1번, 500번 버스 고잔역 뒤 정류장 하차",
      intercityBus: "안산시외버스터미널 하차 후\n80B버스, 고잔푸르지오3차 정류장 하차\n정류장 맞은편에서 도보 약 6분",
    },
    parking: "빌라드지디 안산 맞은편 화랑/월드타워 (2시간 무료)\n또는 고잔역 공영 주차장 이용가능(1시간 1000원)",
    // 신랑측 배차 안내
    groomShuttle: {
      location: "신랑측 배차 출발지",
      departureTime: "오전 10시 30분 출발",
      contact: {
        name: "담당자명",
        tel: "010-1234-5678"
      }
    },
    // 신부측 배차 안내
    brideShuttle: {
      location: "신부측 배차 출발지",
      departureTime: "오전 11시 출발",
      contact: {
        name: "담당자명",
        tel: "010-9876-5432"
      }
    }
  },

  // 갤러리
  gallery: {
    layout: "grid" as GalleryLayout, // "scroll" 또는 "grid" 선택
    position: "middle" as GalleryPosition, // "middle" (현재 위치) 또는 "bottom" (맨 하단) 선택
    images: [
      "/images/gallery/02.JPG?v=3", // 1
      "/images/gallery/06.JPG?v=3", // 2
      "/images/gallery/03.JPG?v=3", //  3
      "/images/gallery/02_2.jpg?v=3", //  4
      "/images/gallery/05.jpg?v=3", // 5
      "/images/gallery/05-2.jpg?v=3", // 5-2
      "/images/gallery/07.JPG?v=3", // 6
      "/images/gallery/01.JPG?v=3", // 7
      "/images/gallery/04.JPG?v=3", //  8 
      "/images/gallery/01_1.jpg?v=3", // 9 
      "/images/gallery/02_1.jpg?v=3", // 10 
      "/images/gallery/08_1.jpg?v=3", // 11
      "/images/gallery/08.JPG?v=3", // 12
      "/images/gallery/09_1.jpg?v=3", // 13
      "/images/gallery/09.JPG?v=3", // 14
      "/images/gallery/JJY02448.jpg?v=3", // 1
      "/images/gallery/JJY02526.jpg?v=3", // 2
      "/images/gallery/JJY02708.jpg?v=3", // 3
      "/images/gallery/JJY02180.jpg?v=3", // 4
      "/images/gallery/JJY02271.jpg?v=3", // 5
      "/images/gallery/JJY02402.jpg?v=3", // 6
      "/images/gallery/1756601785429-26.jpg?v=3", // 7
      "/images/gallery/JJY03257.jpg?v=3", // 8
      "/images/gallery/JJY03418.jpg?v=3", // 9
      "/images/gallery/JJY03592.jpg?v=3", // 10
      "/images/gallery/JJY03660.jpg?v=3", // 11
      "/images/gallery/JJY03959.jpg?v=3", // 12
      "/images/gallery/MSH02638.jpg?v=3", // 13
      "/images/gallery/MSH02645.jpg?v=3", // 14
      "/images/gallery/MSH02828.jpg?v=3", // 15
      "/images/gallery/MSH03029.jpg?v=3", // 16
      "/images/gallery/MSH03093.jpg?v=3", // 17
      "/images/gallery/MSH03253.jpg?v=3", // 18
      // "/images/gallery/1756601780420-0.jpg?v=4",
      // "/images/gallery/1756601780420-26.jpg?v=4",
      // "/images/gallery/1756601785429-20.jpg?v=4",
      // "/images/gallery/1756601785429-21.jpg?v=4",
      // "/images/gallery/1756601785429-25.jpg?v=4",
      // "/images/gallery/1756601785429-26.jpg?v=4",
      // "/images/gallery/1756601793531-0.jpg?v=4",
      // "/images/gallery/1756601793531-1.jpg?v=4",
      // "/images/gallery/1756601793531-10.jpg?v=4",
      // "/images/gallery/1756601793531-15.jpg?v=4",
      // "/images/gallery/1756601793531-21.jpg?v=4",
      // "/images/gallery/1756601793531-4.jpg?v=4",
      // "/images/gallery/1756601797784-1.jpg?v=4",
      // "/images/gallery/KakaoTalk_20250824_033920236_08.jpg?v=4",
      // "/images/gallery/KakaoTalk_20250824_033920236_17.jpg?v=4",
      // "/images/gallery/KakaoTalk_20250824_033920236_18.jpg?v=4",
      // "/images/gallery/KakaoTalk_20250824_034620677_03.jpg?v=4",
      // "/images/gallery/KakaoTalk_20250824_034620677_06.jpg?v=4",
      // "/images/gallery/KakaoTalk_20250824_034620677_08.jpg?v=4",
    ],
  } as GalleryConfig,

  // 초대의 말씀
  invitation: {
    message: "학교에서 선후배로 만나\n사랑으로 이어진 지 아홉 해.\n\n그 소중한 시간이 쌓여\n이제는 부부로서 첫 발걸음을 내딛습니다.\n\저희의 첫걸음을 지켜봐 주신다면\n더없는 행복으로 간직하겠습니다.",
    groom: {
      name: "엄규철",
      label: "아들",
      father: "엄태관",
      mother: "손덕수",
    },
    bride: {
      name: "김유진",
      label: "딸",
      father: "김 범",
      mother: "이향옥",
    },
  },

  // 계좌번호
  account: {
    groom: {
      bank: "카카오뱅크",
      number: "3333-10-6144288",
      holder: "엄규철",
    },
    bride: {
      bank: "농협은행",
      number: "302-1508-8403-01",
      holder: "김유진",
    },
    groomFather: {
      bank: "국민은행",
      number: "770001-01-019776",
      holder: "엄태관",
    },
    groomMother: {
      bank: "농협은행",
      number: "453131-52-077631",
      holder: "손덕수",
    },
    brideFather: {
      bank: "기업은행",
      number: "064-011111-01-011",
      holder: "김범",
    },
    brideMother: {
      bank: "신한은행",
      number: "110-357-545498",
      holder: "이향옥",
    }
  },

  // 동영상 설정
  video: {
    enabled: true, // 동영상 섹션 표시 여부
    url: "https://player.vimeo.com/video/1115881517", // Vimeo 임베드 URL
    // url: "https://player.vimeo.com/video/1145622775", // Vimeo 임베드 URL
    title: "💕 2017.06.22 ~ 💕",
    description: "",
  },

  // RSVP 설정
  rsvp: {
    enabled: false, // RSVP 섹션 표시 여부
    showMealOption: false, // 식사 여부 입력 옵션 표시 여부
  },

  // 슬랙 알림 설정
  slack: {
    webhookUrl: process.env.NEXT_PUBLIC_SLACK_WEBHOOK_URL || "",
    channel: "#wedding-response",
    compactMessage: true, // 슬랙 메시지를 간결하게 표시
  },

  // 구글 포토 앨범 설정
  googlePhotos: {
    albumId: "AF1QipM_QrLUSIDJxdgaNexhPCYsxnNa3-H91O21ha_-", // 구글 포토 앨범 ID
    albumName: "결혼식 사진", // 앨범 이름
  },
}; 
