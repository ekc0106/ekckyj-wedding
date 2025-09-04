'use client';

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

interface GuestbookEntry {
  id: string;
  name: string;
  message: string;
  timestamp: number;
}

interface GuestbookSectionProps {
  bgColor?: 'white' | 'beige';
}

const GuestbookSection = ({ bgColor = 'white' }: GuestbookSectionProps) => {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 로컬스토리지에서 방명록 데이터 로드
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedEntries = localStorage.getItem('wedding-guestbook');
      if (savedEntries) {
        try {
          const parsedEntries = JSON.parse(savedEntries);
          setEntries(parsedEntries.sort((a: GuestbookEntry, b: GuestbookEntry) => b.timestamp - a.timestamp));
        } catch (error) {
          console.error('방명록 데이터 로드 오류:', error);
        }
      }
    }
  }, []);

  // 로컬스토리지에 방명록 데이터 저장
  const saveToLocalStorage = (newEntries: GuestbookEntry[]) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('wedding-guestbook', JSON.stringify(newEntries));
    }
  };

  // 방명록 추가
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !message.trim()) {
      alert('이름과 메시지를 모두 입력해주세요.');
      return;
    }

    if (message.length > 200) {
      alert('메시지는 200자 이내로 작성해주세요.');
      return;
    }

    setIsSubmitting(true);

    const newEntry: GuestbookEntry = {
      id: Date.now().toString(),
      name: name.trim(),
      message: message.trim(),
      timestamp: Date.now()
    };

    const updatedEntries = [newEntry, ...entries];
    setEntries(updatedEntries);
    saveToLocalStorage(updatedEntries);

    // 폼 초기화
    setName('');
    setMessage('');
    setIsSubmitting(false);

    // 성공 메시지
    alert('방명록이 등록되었습니다! 💕');
  };

  // 날짜 포맷팅
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <GuestbookSectionContainer $bgColor={bgColor}>
      <SectionTitle>방명록</SectionTitle>
      <SectionSubtitle>
        따뜻한 마음이 담긴 축하의 글을 남겨주시면<br />
        소중한 추억으로 간직하겠습니다. 💝
      </SectionSubtitle>

      <FormContainer>
        <GuestbookForm onSubmit={handleSubmit}>
          <InputGroup>
            <InputLabel>이름</InputLabel>
            <NameInput
              type="text"
              placeholder="이름을 입력해주세요"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={20}
              disabled={isSubmitting}
            />
          </InputGroup>

          <InputGroup>
            <InputLabel>메시지</InputLabel>
            <MessageTextarea
              placeholder="축하의 글을 남겨주세요 (200자 이내)"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              maxLength={200}
              disabled={isSubmitting}
              rows={3}
            />
            <CharacterCount $isNearLimit={message.length > 180}>
              {message.length}/200
            </CharacterCount>
          </InputGroup>

          <SubmitButton type="submit" disabled={isSubmitting || !name.trim() || !message.trim()}>
            {isSubmitting ? '등록 중...' : '방명록 등록하기'}
          </SubmitButton>
        </GuestbookForm>
      </FormContainer>

      <EntriesContainer>
        <EntriesTitle>방명록 ({entries.length})</EntriesTitle>
        
        {entries.length === 0 ? (
          <EmptyMessage>
            아직 등록된 메시지가 없습니다.<br />
            첫 번째 축하 메시지를 남겨주세요! 🎉
          </EmptyMessage>
        ) : (
          <EntriesList>
            {entries.map((entry) => (
              <EntryCard key={entry.id}>
                <EntryHeader>
                  <EntryName>{entry.name}</EntryName>
                  <EntryDate>{formatDate(entry.timestamp)}</EntryDate>
                </EntryHeader>
                <EntryMessage>{entry.message}</EntryMessage>
              </EntryCard>
            ))}
          </EntriesList>
        )}
      </EntriesContainer>
    </GuestbookSectionContainer>
  );
};

const GuestbookSectionContainer = styled.section<{ $bgColor: 'white' | 'beige' }>`
  padding: 4rem 1.5rem;
  background-color: ${props => props.$bgColor === 'beige' ? '#F8F6F2' : 'white'};
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #333;
`;

const SectionSubtitle = styled.p`
  text-align: center;
  font-size: 1rem;
  color: #666;
  margin-bottom: 3rem;
`;

const FormContainer = styled.div`
  max-width: 600px;
  margin: 0 auto 4rem;
`;

const GuestbookForm = styled.form`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  border: 1px solid #f0f0f0;
`;

const InputGroup = styled.div`
  margin-bottom: 1.5rem;
  position: relative;
`;

const InputLabel = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #333;
  margin-bottom: 0.5rem;
`;

const NameInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #E74C3C;
  }
  
  &:disabled {
    background-color: #f8f9fa;
    cursor: not-allowed;
  }
`;

const MessageTextarea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 1rem;
  font-family: inherit;
  resize: vertical;
  min-height: 80px;
  transition: border-color 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #E74C3C;
  }
  
  &:disabled {
    background-color: #f8f9fa;
    cursor: not-allowed;
  }
`;

const CharacterCount = styled.div<{ $isNearLimit: boolean }>`
  position: absolute;
  bottom: -1.5rem;
  right: 0;
  font-size: 0.75rem;
  color: ${props => props.$isNearLimit ? '#E74C3C' : '#999'};
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, #E74C3C, #C0392B);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover:not(:disabled) {
    background: linear-gradient(135deg, #C0392B, #A93226);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(231, 76, 60, 0.3);
  }
  
  &:disabled {
    background: #bdc3c7;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const EntriesContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const EntriesTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 2rem;
  text-align: center;
  color: #333;
`;

const EmptyMessage = styled.div`
  text-align: center;
  color: #999;
  font-size: 1rem;
  line-height: 1.6;
  padding: 3rem 1rem;
  background: white;
  border-radius: 12px;
  border: 2px dashed #e1e5e9;
`;

const EntriesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const EntryCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  border: 1px solid #f0f0f0;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0,0,0,0.1);
  }
`;

const EntryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  
  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
  }
`;

const EntryName = styled.div`
  font-weight: 600;
  color: #E74C3C;
  font-size: 1rem;
`;

const EntryDate = styled.div`
  font-size: 0.75rem;
  color: #999;
`;

const EntryMessage = styled.div`
  color: #333;
  line-height: 1.6;
  font-size: 0.95rem;
  white-space: pre-wrap;
`;

export default GuestbookSection;
