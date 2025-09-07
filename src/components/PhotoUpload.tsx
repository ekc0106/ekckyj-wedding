'use client';

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getAuthUrl } from '../lib/google-auth';

interface PhotoUploadProps {
  onUploadSuccess?: (result: any) => void;
  onUploadError?: (error: string) => void;
}

const PhotoUpload: React.FC<PhotoUploadProps> = ({ onUploadSuccess, onUploadError }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [userInfo, setUserInfo] = useState<any>(null);

  // 컴포넌트 마운트 시 인증 상태 확인
  useEffect(() => {
    checkAuthStatus();
  }, []);

  // 인증 상태 확인
  const checkAuthStatus = async () => {
    try {
      const response = await fetch('/api/auth/status');
      if (response.ok) {
        const data = await response.json();
        setIsAuthenticated(data.authenticated);
        setUserInfo(data.userInfo);
      }
    } catch (error) {
      console.error('인증 상태 확인 오류:', error);
    }
  };

  // Google OAuth 인증 시작
  const handleGoogleAuth = () => {
    const authUrl = getAuthUrl();
    window.location.href = authUrl;
  };

  // 파일 업로드 처리
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // 파일 크기 검증 (10MB)
    if (file.size > 10 * 1024 * 1024) {
      onUploadError?.('파일 크기는 10MB를 초과할 수 없습니다');
      return;
    }

    // 파일 타입 검증
    if (!file.type.startsWith('image/')) {
      onUploadError?.('이미지 파일만 업로드 가능합니다');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      const formData = new FormData();
      formData.append('file', file);

      // 업로드 진행률 시뮬레이션
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      clearInterval(progressInterval);
      setUploadProgress(100);

      if (response.ok) {
        const result = await response.json();
        onUploadSuccess?.(result);
        // 파일 입력 초기화
        event.target.value = '';
      } else {
        const error = await response.json();
        onUploadError?.(error.error || '업로드 중 오류가 발생했습니다');
      }
    } catch (error) {
      console.error('업로드 오류:', error);
      onUploadError?.('업로드 중 오류가 발생했습니다');
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  // 로그아웃
  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setIsAuthenticated(false);
      setUserInfo(null);
    } catch (error) {
      console.error('로그아웃 오류:', error);
    }
  };

  if (!isAuthenticated) {
    return (
      <PhotoUploadContainer>
        <UploadCard>
          <UploadIcon>📸</UploadIcon>
          <UploadTitle>구글 포토 연동</UploadTitle>
          <UploadDescription>
            구글 포토에 사진을 업로드하여<br />
            청첩장에 추가할 수 있습니다
          </UploadDescription>
          <AuthButton onClick={handleGoogleAuth}>
            <GoogleIcon>🔗</GoogleIcon>
            구글 계정으로 로그인
          </AuthButton>
        </UploadCard>
      </PhotoUploadContainer>
    );
  }

  return (
    <PhotoUploadContainer>
      <UploadCard>
        <UserInfo>
          <UserAvatar>
            {userInfo?.picture ? (
              <img src={userInfo.picture} alt="프로필" />
            ) : (
              <span>{userInfo?.name?.[0] || '👤'}</span>
            )}
          </UserAvatar>
          <UserDetails>
            <UserName>{userInfo?.name || '사용자'}</UserName>
            <UserEmail>{userInfo?.email}</UserEmail>
          </UserDetails>
          <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
        </UserInfo>

        <UploadSection>
          <UploadTitle>사진 업로드</UploadTitle>
          <FileInputContainer>
            <HiddenFileInput
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              disabled={isUploading}
            />
            <FileInputLabel $isUploading={isUploading}>
              {isUploading ? (
                <>
                  <UploadSpinner />
                  업로드 중... {uploadProgress}%
                </>
              ) : (
                <>
                  <UploadIcon>📷</UploadIcon>
                  사진 선택하기
                </>
              )}
            </FileInputLabel>
          </FileInputContainer>

          {isUploading && (
            <ProgressBar>
              <ProgressFill $progress={uploadProgress} />
            </ProgressBar>
          )}

          <UploadTips>
            <TipItem>• 이미지 파일만 업로드 가능합니다</TipItem>
            <TipItem>• 파일 크기는 10MB 이하로 제한됩니다</TipItem>
            <TipItem>• 업로드된 사진은 구글 포토에 저장됩니다</TipItem>
          </UploadTips>
        </UploadSection>
      </UploadCard>
    </PhotoUploadContainer>
  );
};

// 스타일드 컴포넌트들
const PhotoUploadContainer = styled.div`
  max-width: 500px;
  margin: 0 auto;
  padding: 1rem;
`;

const UploadCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  border: 1px solid #f0f0f0;
`;

const UploadIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const UploadTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #333;
`;

const UploadDescription = styled.p`
  color: #666;
  line-height: 1.5;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const AuthButton = styled.button`
  width: 100%;
  background: #4285f4;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 1rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: background-color 0.2s;

  &:hover {
    background: #3367d6;
  }

  &:active {
    transform: translateY(1px);
  }
`;

const GoogleIcon = styled.span`
  font-size: 1.2rem;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #f0f0f0;
`;

const UserAvatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  span {
    font-size: 1.5rem;
  }
`;

const UserDetails = styled.div`
  flex: 1;
`;

const UserName = styled.div`
  font-weight: 600;
  color: #333;
`;

const UserEmail = styled.div`
  font-size: 0.9rem;
  color: #666;
`;

const LogoutButton = styled.button`
  background: #f5f5f5;
  color: #666;
  border: none;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background: #e0e0e0;
  }
`;

const UploadSection = styled.div`
  text-align: center;
`;

const FileInputContainer = styled.div`
  position: relative;
  margin-bottom: 1rem;
`;

const HiddenFileInput = styled.input`
  position: absolute;
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
`;

const FileInputLabel = styled.label<{ $isUploading: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  background: ${props => props.$isUploading ? '#f0f0f0' : '#4285f4'};
  color: ${props => props.$isUploading ? '#666' : 'white'};
  border: none;
  border-radius: 8px;
  padding: 1rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: ${props => props.$isUploading ? 'not-allowed' : 'pointer'};
  transition: all 0.2s;

  &:hover {
    background: ${props => props.$isUploading ? '#f0f0f0' : '#3367d6'};
  }
`;

const UploadSpinner = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid #e0e0e0;
  border-top: 2px solid #4285f4;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 6px;
  background: #f0f0f0;
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 1rem;
`;

const ProgressFill = styled.div<{ $progress: number }>`
  width: ${props => props.$progress}%;
  height: 100%;
  background: #4285f4;
  transition: width 0.3s ease;
`;

const UploadTips = styled.div`
  text-align: left;
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
  border-left: 4px solid #4285f4;
`;

const TipItem = styled.div`
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 0.25rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

export default PhotoUpload;
