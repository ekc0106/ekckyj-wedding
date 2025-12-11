# 💒 모바일 웨딩 청첩장 - 완전 커스터마이징 버전

> **개인 웨딩용으로 완전히 커스터마이징된 모바일 최적화 웨딩 청첩장**  
> Next.js 16 + TypeScript + Firebase + 네이버 지도 API + 소셜 미디어 최적화  
> **최종 업데이트: 2025.12.11 - 갤러리 이미지 교체 및 정보 업데이트**

## 🌟 주요 특징

### ✨ **완전 커스터마이징된 기능들**
- 🎵 **자동 음악 재생**: 페이지 로드 시 자동으로 웨딩 음악 재생
- 🖼️ **이미지 보호**: 우클릭, 드래그, 저장 방지 기능
- 📱 **소셜 미디어 최적화**: 카카오톡, 슬랙, 페이스북 썸네일 지원
- 🎬 **동영상 임베딩**: Vimeo/YouTube 동영상 지원
- 🔥 **Firebase 방명록**: 실시간 방명록 + 자동 백업
- 🗺️ **네이버 지도 API**: 정확한 위치 정보 + 길찾기
- 🎨 **동적 색상 시스템**: 섹션별 자동 색상 배치
- 📊 **성능 최적화**: 이미지 압축, 캐싱, 지연 로딩

### 🎯 **모바일 우선 설계**
- 📱 반응형 디자인 (모든 기기 지원)
- 👆 터치 최적화 (스와이프, 리플 효과)
- ⚡ 빠른 로딩 (이미지 최적화, 코드 분할)
- 🔄 PWA 지원 (오프라인 캐싱)

## 🚀 라이브 데모

**[🌐 웨딩 청첩장 바로가기](https://ekckyj-wedding.vercel.app)**

## 📋 목차

- [기술 스택](#-기술-스택)
- [주요 기능](#-주요-기능)
- [설치 및 설정](#-설치-및-설정)
- [환경 변수 설정](#-환경-변수-설정)
- [Firebase 방명록 설정](#-firebase-방명록-설정)
- [네이버 지도 API 설정](#-네이버-지도-api-설정)
- [커스터마이징 가이드](#-커스터마이징-가이드)
- [이미지 최적화](#-이미지-최적화)
- [소셜 미디어 썸네일 설정](#-소셜-미디어-썸네일-설정)
- [배포 가이드](#-배포-가이드)
- [보안 및 개인정보](#-보안-및-개인정보)
- [문제 해결](#-문제-해결)
- [기여하기](#-기여하기)

## 🛠 기술 스택

### **Frontend**
- **Next.js 15** (App Router)
- **TypeScript** (타입 안전성)
- **styled-components** (CSS-in-JS)
- **React 18** (최신 기능)

### **Backend & Database**
- **Firebase Firestore** (실시간 방명록)
- **Vercel API Routes** (서버리스 함수)
- **Next.js Image API** (동적 이미지 생성)

### **External APIs**
- **네이버 지도 API** (위치 서비스)
- **Vimeo/YouTube API** (동영상 임베딩)
- **Slack Webhook** (알림 시스템)

### **Performance & SEO**
- **Next.js Image Optimization** (자동 이미지 최적화)
- **Open Graph** (소셜 미디어 썸네일)
- **Twitter Cards** (트위터 최적화)
- **KakaoTalk Meta Tags** (카카오톡 썸네일)

## 🎨 주요 기능

### 🎵 **음악 시스템**
- **자동 재생**: 페이지 로드 시 자동으로 웨딩 음악 재생
- **브라우저 정책 대응**: autoplay 차단 시 사용자 상호작용으로 재생
- **음소거 토글**: 하트 버튼으로 음악 on/off
- **배경 재생**: 다른 섹션으로 이동해도 음악 계속 재생

### 🖼️ **이미지 갤러리**
- **2가지 레이아웃**: 스크롤형 / 그리드형
- **2가지 위치**: 중간 / 하단
- **터치 스와이프**: 모바일에서 좌우 스와이프 지원
- **확대 보기**: 이미지 클릭 시 전체화면 모달
- **자동 이미지 추가**: `public/images/gallery/` 폴더의 모든 이미지 자동 포함

### 🎬 **동영상 섹션**
- **Vimeo/YouTube 지원**: 외부 플랫폼 동영상 임베딩
- **반응형 디자인**: 모든 기기에서 최적화
- **로딩 상태**: 동영상 로딩 중 스피너 표시
- **자동 재생 방지**: 사용자 경험을 위한 수동 재생

### 🔥 **Firebase 방명록**
- **실시간 동기화**: 전 세계 어디서든 실시간 업데이트
- **자동 백업**: Firebase 클라우드에 자동 저장
- **로컬 백업**: Firebase 연결 실패 시 로컬 저장
- **데이터 마이그레이션**: 기존 로컬 데이터 자동 이전

### 🗺️ **네이버 지도 통합**
- **정확한 위치**: 네이버 지도 API로 정확한 위치 표시
- **길찾기 기능**: 네이버 지도 앱으로 바로 길찾기
- **교통 정보**: 지하철, 버스 정보 제공
- **주차 안내**: 주차장 정보 및 무료 주차 시간

### 📱 **소셜 미디어 최적화**
- **카카오톡 썸네일**: 링크 공유 시 예쁜 썸네일 표시
- **슬랙 썸네일**: 슬랙 공유 시 최적화된 미리보기
- **페이스북/트위터**: 각 플랫폼별 최적화된 메타 태그
- **동적 이미지 생성**: Open Graph 이미지 자동 생성

### 🛡️ **이미지 보호**
- **우클릭 방지**: 마우스 우클릭으로 이미지 저장 차단
- **드래그 방지**: 이미지 드래그 앤 드롭 차단
- **개발자 도구 방지**: F12, Ctrl+Shift+I 등 차단
- **선택 방지**: 텍스트 선택 및 복사 방지

## ⚙️ 설치 및 설정

### 1. 저장소 클론
```bash
git clone https://github.com/your-username/your-wedding-invitation.git
cd your-wedding-invitation
```

### 2. 의존성 설치
```bash
npm install
```

### 3. 개발 서버 실행
```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

## 🔐 환경 변수 설정

### 로컬 개발용 (.env.local)
`.env.local` 파일을 생성하고 다음 변수들을 설정하세요:

```bash
# 네이버 지도 API (필수)
NEXT_PUBLIC_NAVER_MAP_CLIENT_ID=your_naver_map_client_id

# Firebase 설정 (방명록용, 선택사항)
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id

# Slack Webhook (RSVP 알림용, 선택사항)
NEXT_PUBLIC_SLACK_WEBHOOK_URL=https://hooks.slack.com/services/...

# Google Drive API (사진 업로드용, 선택사항)
GOOGLE_PROJECT_ID=your-project-id
GOOGLE_PRIVATE_KEY_ID=your-private-key-id
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nyour-private-key\n-----END PRIVATE KEY-----\n"
GOOGLE_CLIENT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
GOOGLE_CLIENT_ID=your-client-id
GOOGLE_DRIVE_FOLDER_ID=your-google-drive-folder-id

# 사이트 URL (배포 후)
NEXT_PUBLIC_SITE_URL=https://your-wedding-site.com
```

### Vercel 배포용 환경 변수 설정

#### 1. Vercel 대시보드 접속
1. [Vercel 대시보드](https://vercel.com/dashboard) 접속
2. 프로젝트 선택 → **"Settings"** 탭 클릭
3. 왼쪽 메뉴에서 **"Environment Variables"** 클릭

#### 2. 환경 변수 추가
각각의 환경 변수를 하나씩 추가합니다:

**네이버 지도 API:**
```
Name: NEXT_PUBLIC_NAVER_MAP_CLIENT_ID
Value: [네이버에서 받은 클라이언트 ID]
Environment: Production, Preview, Development (모두 체크)
```

**Firebase 설정:**
```
Name: NEXT_PUBLIC_FIREBASE_API_KEY
Value: [Firebase API 키]
Environment: Production, Preview, Development (모두 체크)

Name: NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
Value: [Firebase Auth 도메인]
Environment: Production, Preview, Development (모두 체크)

Name: NEXT_PUBLIC_FIREBASE_PROJECT_ID
Value: [Firebase 프로젝트 ID]
Environment: Production, Preview, Development (모두 체크)

Name: NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
Value: [Firebase 스토리지 버킷]
Environment: Production, Preview, Development (모두 체크)

Name: NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
Value: [Firebase 메시징 발신자 ID]
Environment: Production, Preview, Development (모두 체크)

Name: NEXT_PUBLIC_FIREBASE_APP_ID
Value: [Firebase 앱 ID]
Environment: Production, Preview, Development (모두 체크)
```

**Slack Webhook:**
```
Name: NEXT_PUBLIC_SLACK_WEBHOOK_URL
Value: [Slack 웹훅 URL]
Environment: Production, Preview, Development (모두 체크)
```

**Google OAuth (사진 업로드용):**
```
Name: NEXT_PUBLIC_GOOGLE_CLIENT_ID
Value: [Google 클라이언트 ID]
Environment: Production, Preview, Development (모두 체크)

Name: GOOGLE_CLIENT_SECRET
Value: [Google 클라이언트 시크릿]
Environment: Production, Preview, Development (모두 체크)

Name: NEXT_PUBLIC_GOOGLE_REDIRECT_URI
Value: https://your-domain.vercel.app/auth/google/callback
Environment: Production (Production만 체크)
```

**사이트 URL:**
```
Name: NEXT_PUBLIC_SITE_URL
Value: https://your-domain.vercel.app
Environment: Production (Production만 체크)
```

#### 3. 환경 변수 저장 및 재배포
1. 모든 환경 변수 추가 후 **"Save"** 클릭
2. **"Deployments"** 탭으로 이동
3. **"Redeploy"** 버튼 클릭하여 환경 변수 적용

#### 4. Vercel CLI로 환경 변수 설정 (선택사항)
```bash
# Vercel CLI 설치
npm install -g vercel

# 로그인
vercel login

# 환경 변수 추가
vercel env add NEXT_PUBLIC_NAVER_MAP_CLIENT_ID
vercel env add NEXT_PUBLIC_FIREBASE_API_KEY
vercel env add GOOGLE_CLIENT_SECRET
# ... 기타 환경 변수들

# 프로덕션 배포
vercel --prod
```

## 📁 Google Drive API 설정 (사진 업로드용)

### 1. Google Cloud Console 설정

1. **Google Cloud Console 접속**
   - [Google Cloud Console](https://console.cloud.google.com/) 접속
   - 기존 프로젝트 선택 또는 새 프로젝트 생성

2. **Google Drive API 활성화**
   - 좌측 메뉴 → "API 및 서비스" → "라이브러리"
   - "Google Drive API" 검색 후 "사용 설정" 클릭

3. **서비스 계정 생성**
   - 좌측 메뉴 → "IAM 및 관리자" → "서비스 계정"
   - "서비스 계정 만들기" 클릭
   - 서비스 계정 이름: `wedding-photo-uploader`
   - 역할: "편집자" 선택
   - "키 만들기" → "새 키 만들기" → "JSON" 선택
   - JSON 파일 다운로드 (안전한 곳에 보관)

### 2. Google Drive 폴더 설정

1. **Google Drive에서 폴더 생성**
   - [Google Drive](https://drive.google.com/) 접속
   - "새로 만들기" → "폴더" → "결혼식 사진" 폴더 생성

2. **폴더 공유 설정**
   - 생성한 폴더 우클릭 → "공유"
   - 서비스 계정 이메일 주소 입력 (JSON 파일의 `client_email` 값)
   - 권한: "편집자" 선택
   - "보내기" 클릭

3. **폴더 ID 확인**
   - 폴더 URL에서 ID 추출: `https://drive.google.com/drive/folders/[FOLDER_ID]`
   - 이 ID를 `GOOGLE_DRIVE_FOLDER_ID` 환경 변수에 설정

### 3. 환경 변수 설정

**로컬 개발용 (.env.local):**
```bash
# Google Drive API 설정
GOOGLE_PROJECT_ID=your-project-id
GOOGLE_PRIVATE_KEY_ID=your-private-key-id
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nyour-private-key\n-----END PRIVATE KEY-----\n"
GOOGLE_CLIENT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
GOOGLE_CLIENT_ID=your-client-id
GOOGLE_DRIVE_FOLDER_ID=your-google-drive-folder-id
```

**Vercel 배포용:**
```
Name: GOOGLE_PROJECT_ID
Value: [프로젝트 ID]
Environment: Production, Preview, Development (모두 체크)

Name: GOOGLE_PRIVATE_KEY_ID
Value: [프라이빗 키 ID]
Environment: Production, Preview, Development (모두 체크)

Name: GOOGLE_PRIVATE_KEY
Value: [프라이빗 키 (전체 내용)]
Environment: Production, Preview, Development (모두 체크)

Name: GOOGLE_CLIENT_EMAIL
Value: [서비스 계정 이메일]
Environment: Production, Preview, Development (모두 체크)

Name: GOOGLE_CLIENT_ID
Value: [클라이언트 ID]
Environment: Production, Preview, Development (모두 체크)

Name: GOOGLE_DRIVE_FOLDER_ID
Value: [Google Drive 폴더 ID]
Environment: Production, Preview, Development (모두 체크)
```

### 4. 테스트

1. 개발 서버 실행: `npm run dev`
2. 브라우저에서 `http://localhost:3000` 접속
3. 맨 아래 "사진 공유" 섹션에서 사진 업로드 테스트
4. Google Drive 폴더에서 업로드된 사진 확인

## 🔥 Firebase 방명록 설정

### 1. Firebase 프로젝트 생성
1. [Firebase Console](https://console.firebase.google.com/) 접속
2. **"프로젝트 추가"** 클릭
3. 프로젝트 이름 입력 (예: `my-wedding-guestbook`)
4. Google Analytics는 선택사항
5. 프로젝트 생성 완료

### 2. 웹 앱 등록
1. Firebase 프로젝트 대시보드에서 **"웹"** 아이콘 클릭
2. 앱 닉네임 입력 (예: `Wedding Website`)
3. **"앱 등록"** 클릭
4. **설정 정보 복사** (firebaseConfig 객체)

### 3. Firestore 데이터베이스 설정
1. Firebase Console → **"Firestore Database"**
2. **"데이터베이스 만들기"** 클릭
3. **"테스트 모드에서 시작"** 선택
4. 지역 선택 (asia-northeast3 - 서울 추천)

### 4. 보안 규칙 설정 (중요!)
Firestore → **"규칙"** 탭에서 다음 규칙 적용:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // 방명록 읽기는 모두 허용, 쓰기는 인증된 사용자만
    match /guestbook/{document} {
      allow read: if true;
      allow create: if request.auth == null && 
        request.resource.data.keys().hasAll(['name', 'message', 'timestamp', 'createdAt']) &&
        request.resource.data.name is string &&
        request.resource.data.message is string &&
        request.resource.data.name.size() > 0 &&
        request.resource.data.name.size() <= 50 &&
        request.resource.data.message.size() > 0 &&
        request.resource.data.message.size() <= 200;
      allow update, delete: if false; // 수정/삭제 금지
    }
  }
}
```

### 5. Firebase 설정 파일 업데이트
`src/lib/firebase.ts` 파일에서 설정 정보 교체:

```typescript
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};
```

## 📸 Google OAuth 설정 (사진 업로드용)

### 1. Google Cloud Console 프로젝트 생성
1. [Google Cloud Console](https://console.cloud.google.com/) 접속
2. Google 계정으로 로그인
3. "프로젝트 선택" 또는 "새 프로젝트" 클릭
4. 프로젝트 이름: "Wedding Photo Upload" (또는 원하는 이름)

### 2. 필요한 API 활성화
1. 왼쪽 메뉴에서 "API 및 서비스" > "라이브러리" 클릭
2. "Google Photos Library API" 검색 후 "사용 설정" 클릭
3. "Google Drive API" 검색 후 "사용 설정" 클릭 (선택사항)

### 3. OAuth 2.0 클라이언트 ID 생성
1. "API 및 서비스" > "사용자 인증 정보" 클릭
2. "사용자 인증 정보 만들기" > "OAuth 2.0 클라이언트 ID" 클릭
3. 애플리케이션 유형: **"웹 애플리케이션"** 선택
4. 이름: "Wedding Invitation App"
5. 승인된 JavaScript 원본 추가:
   ```
   http://localhost:3000
   https://your-domain.vercel.app
   ```
6. 승인된 리디렉션 URI 추가:
   ```
   http://localhost:3000/auth/google/callback
   https://your-domain.vercel.app/auth/google/callback
   ```
7. "만들기" 클릭

### 4. Google Photos에서 앨범 준비
1. [Google Photos](https://photos.google.com/) 접속
2. 왼쪽 메뉴에서 "앨범" 클릭
3. "앨범 만들기" 클릭
4. 앨범 이름: "결혼식 사진" (또는 원하는 이름)
5. "만들기" 클릭

### 5. 환경 변수 설정
생성된 클라이언트 ID와 시크릿을 환경 변수에 추가:

**로컬 개발용 (.env.local):**
```bash
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
NEXT_PUBLIC_GOOGLE_REDIRECT_URI=http://localhost:3000/auth/google/callback
```

**Vercel 배포용:**
```
Name: NEXT_PUBLIC_GOOGLE_CLIENT_ID
Value: [Google 클라이언트 ID]
Environment: Production, Preview, Development (모두 체크)

Name: GOOGLE_CLIENT_SECRET
Value: [Google 클라이언트 시크릿]
Environment: Production, Preview, Development (모두 체크)

Name: NEXT_PUBLIC_GOOGLE_REDIRECT_URI
Value: https://your-domain.vercel.app/auth/google/callback
Environment: Production (Production만 체크)
```

### 6. 필요한 패키지 설치
```bash
npm install googleapis google-auth-library
```

## 🗺️ 네이버 지도 API 설정

### 1. 네이버 클라우드 플랫폼 API 키 발급
1. [네이버 클라우드 플랫폼](https://www.ncloud.com/) 가입 및 로그인
2. 콘솔에서 "Products & Services" > "AI·Application Service" > "Maps" 이동
3. "Application 등록" 버튼 클릭하여 새 애플리케이션 생성
4. 애플리케이션 이름 입력, "WEB 환경" 선택
5. 웹 서비스 URL 등록:
   - 로컬 개발: `http://localhost:3000`
   - 실제 배포: `https://your-wedding-site.com`
6. 인증 정보(Client ID)를 `.env.local` 파일에 설정

### 2. 지도 설정하기
`src/config/wedding-config.ts` 파일에서 지도 정보 설정:

```typescript
venue: {
  name: "홀 이름",
  address: "주소",
  tel: "전화번호",
  naverMapId: "네이버 지도 검색용 장소명",
  coordinates: {
    latitude: 37.5045,  // 위도
    longitude: 127.0495 // 경도
  },
  placeId: "12136346", // 네이버 지도 장소 ID
  mapZoom: "17",       // 지도 줌 레벨
  // ... 기타 설정
}
```

### 3. 좌표 및 장소 ID 찾는 방법
1. [네이버 지도](https://map.naver.com)에서 결혼식장 검색
2. 검색된 장소 클릭하여 상세 정보 확인
3. 브라우저 주소창에서 URL 확인:
   - `https://map.naver.com/p/search/장소명/place/12345678` 형식에서 마지막 숫자가 `placeId`
4. 길찾기 URL에서 줌 레벨 확인:
   - `https://map.naver.com/p/directions/-/-/-/walk/place/12345678?c=17.08,0,0,0,dh`
   - `c=` 다음의 첫 번째 값(`17.08`)이 `mapZoom` 값

## 🎨 커스터마이징 가이드

### 📝 기본 정보 수정
`src/config/wedding-config.ts` 파일에서 모든 정보를 수정할 수 있습니다:

```typescript
export const weddingConfig = {
  // 메타 정보
  meta: {
    title: "신랑이름 ❤️ 신부이름의 결혼식에 초대합니다",
    description: "결혼식 초대장",
    ogImage: "/images/thumbnail.jpg", // 소셜 미디어 썸네일
  },

  // 메인 화면
  main: {
    title: "Wedding Invitation",
    image: "/images/main.jpg", // 메인 배경 이미지
    date: "2026년 1월 24일 토요일 12시 10분",
    venue: "결혼식장 이름",
  },

  // 신랑/신부 정보
  invitation: {
    groom: {
      name: "신랑이름",
      label: "아들",
      father: "신랑아버지",
      mother: "신랑어머니",
    },
    bride: {
      name: "신부이름", 
      label: "딸",
      father: "신부아버지",
      mother: "신부어머니",
    },
  },

  // 계좌 정보
  account: {
    groom: {
      bank: "은행명",
      number: "계좌번호",
      holder: "예금주",
    },
    // ... 신부, 부모님 계좌 정보
  },
}
```

### 🖼️ 갤러리 설정
```typescript
gallery: {
  layout: "grid", // "scroll" 또는 "grid"
  position: "middle", // "middle" 또는 "bottom"
  images: [
    "/images/gallery/01.jpg",
    "/images/gallery/02.jpg",
    // ... 더 많은 이미지
  ],
}
```

### 🎬 동영상 설정
```typescript
video: {
  enabled: true, // 동영상 섹션 표시 여부
  url: "https://player.vimeo.com/video/VIDEO_ID", // Vimeo 임베드 URL
  title: "💕 2017.06.22 ~ 💕",
  description: "동영상 설명",
}
```

### 📋 RSVP 설정
```typescript
rsvp: {
  enabled: true, // RSVP 섹션 표시 여부
  showMealOption: false, // 식사 여부 입력 옵션
}
```

## 🖼️ 이미지 최적화

### 이미지 압축 스크립트 실행
```bash
node scripts/optimize-images.js
```

이 스크립트는 다음 작업을 수행합니다:
- `public/images/` 폴더의 모든 이미지 압축
- JPEG 품질 85%로 최적화
- 이미지 크기 자동 조정
- 원본 파일 백업 후 최적화된 파일로 교체

### 권장 이미지 규격
- **메인 이미지**: 1080x1920px (세로형 모바일 최적화)
- **썸네일 이미지**: 1200x630px (소셜 미디어 최적화)
- **갤러리 이미지**: 1200x900px (4:3 비율)
- **파일 크기**: 이미지당 500KB 이하 권장

## 📱 소셜 미디어 썸네일 설정

### 썸네일 이미지 준비
1. `public/images/thumbnail.jpg` 파일 준비
2. 권장 크기: 1200x630px (1.91:1 비율)
3. 고해상도로 제작하여 모든 기기에서 선명하게 표시

### 메타 태그 자동 생성
프로젝트는 다음 메타 태그를 자동으로 생성합니다:
- **Open Graph**: Facebook, LinkedIn 등
- **Twitter Cards**: Twitter 최적화
- **KakaoTalk**: 카카오톡 썸네일
- **일반 메타**: 검색엔진 최적화

### 썸네일 테스트
1. [카카오톡 디버거](https://developers.kakao.com/tool/debugger)에서 URL 테스트
2. [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)에서 테스트
3. [Twitter Card Validator](https://cards-dev.twitter.com/validator)에서 테스트

## 🚀 배포 가이드

### Vercel 배포 (권장)
1. [Vercel](https://vercel.com) 가입 및 GitHub 연결
2. 새 프로젝트 생성하고 저장소 선택
3. 환경 변수 설정 (`.env.local` 내용)
4. 배포 완료 후 커스텀 도메인 설정

### Vercel CLI로 배포
```bash
# Vercel CLI 설치
npm install -g vercel

# 로그인
vercel login

# 배포
vercel

# 프로덕션 배포
vercel --prod
```

### Netlify 배포
1. [Netlify](https://netlify.com) 가입 및 GitHub 연결
2. 새 사이트 생성하고 저장소 선택
3. 빌드 설정:
   - Build command: `npm run build`
   - Publish directory: `.next`
4. 환경 변수 설정
5. 커스텀 도메인 설정

## 🔒 보안 및 개인정보

### API 키 보호
- `.env.local` 파일은 절대 Git에 커밋하지 마세요
- 모든 API 키는 환경 변수로 저장
- 배포 서비스에서 환경 변수 안전하게 설정

### 개인정보 처리 주의사항
- 청첩장에 포함되는 개인정보 신중하게 관리
- 신랑, 신부, 부모님 정보 포함 전 동의 구하기
- 배포 전 모든 테스트 데이터 제거 확인

### 이미지 보호 기능
- 우클릭 방지
- 드래그 방지  
- 개발자 도구 접근 방지
- 텍스트 선택 방지

## 🐛 문제 해결

### 네이버 지도가 표시되지 않는 경우
- `.env.local` 파일에 올바른 클라이언트 ID 설정 확인
- 네이버 클라우드 플랫폼에서 웹 서비스 URL 등록 확인
- 브라우저 콘솔 오류 메시지 확인

### Firebase 방명록이 작동하지 않는 경우
- Firebase 프로젝트 설정 확인
- Firestore 보안 규칙 확인
- 환경 변수 설정 확인
- 브라우저 콘솔 오류 메시지 확인

### 소셜 미디어 썸네일이 표시되지 않는 경우
- 썸네일 이미지 파일 존재 확인
- 이미지 크기 및 형식 확인
- 각 플랫폼의 디버거 도구로 테스트
- 캐시 클리어 후 재테스트

### 음악이 자동 재생되지 않는 경우
- 브라우저 autoplay 정책 확인
- 사용자 상호작용 후 재생 시도
- 음악 파일 경로 및 형식 확인

## 🤝 기여하기

### 기여 방법
1. 저장소 포크
2. 새로운 브랜치 생성 (`git checkout -b feature/amazing-feature`)
3. 변경 사항 커밋 (`git commit -m 'Add some amazing feature'`)
4. 브랜치 푸시 (`git push origin feature/amazing-feature`)
5. Pull Request 생성

### Pull Request 가이드라인
```markdown
## 변경 사항 설명
변경된 내용과 그 이유를 간략히 설명해주세요.

## 관련 이슈
해당 PR이 해결하는 이슈 번호를 적어주세요.

## 체크리스트
- [ ] 코드가 프로젝트 스타일 가이드를 따르는지 확인
- [ ] 기존 코드의 동작을 변경하는 경우, 주석으로 이유 설명
- [ ] 필요한 경우 문서 업데이트
- [ ] 코드가 잘 작동하는지 테스트
```

## 📄 라이선스

이 프로젝트는 **CC BY-NC-ND(저작자표시-비영리-변경금지)** 라이선스 하에 공개되어 있습니다.

### 라이선스 제한사항
- **저작자표시(BY)**: 원저작자를 밝혀야 합니다
- **비영리(NC)**: 상업적 목적으로 이용할 수 없습니다
- **변경금지(ND)**: 이 저작물을 개작, 수정하여 다른 저작물을 만들 수 없습니다

**개인적인 목적으로 본인의 웨딩을 위한 경우를 제외하고는 이 프로젝트를 비공개 프로젝트로 복제하여 사용하는 것도 금지됩니다.**

## 🎯 완성 체크리스트

### 배포 전 확인사항
- [ ] 모든 개인정보가 실제 정보로 변경되었는지 확인
- [ ] 테스트 데이터 및 플레이스홀더 텍스트 제거
- [ ] API 키가 실제 키로 변경되었는지 확인
- [ ] 이미지 파일들이 모두 업로드되었는지 확인
- [ ] 음악 파일이 정상적으로 재생되는지 확인
- [ ] 네이버 지도가 정상적으로 표시되는지 확인
- [ ] Firebase 방명록이 정상적으로 작동하는지 확인
- [ ] 소셜 미디어 썸네일이 정상적으로 표시되는지 확인
- [ ] 모든 섹션이 모바일에서 정상적으로 표시되는지 확인

### 성능 최적화 확인
- [ ] 이미지 최적화 스크립트 실행
- [ ] 페이지 로딩 속도 확인
- [ ] 모바일에서의 사용자 경험 확인
- [ ] 다양한 브라우저에서의 호환성 확인

## 📞 지원

문제가 있거나 도움이 필요하시면:
1. **Issues** 탭에서 문제 보고
2. **Discussions** 탭에서 질문
3. 브라우저 콘솔에서 오류 메시지 확인

---

**🎉 축하합니다! 완벽한 웨딩 청첩장이 완성되었습니다!** 

*이 프로젝트가 도움이 되었다면 ⭐ Star를 눌러주세요!*