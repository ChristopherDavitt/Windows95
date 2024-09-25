/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import Image from 'next/image';
import React, { useState, useRef } from 'react';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
import styled from 'styled-components';
const IconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 64px;
  cursor: pointer;
  z-index: 2;
  padding: 5px;
  position: absolute;
  `;
  
  const IconImage = styled.div`
  width: 32px;
  height: 32px;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  `;
  
  const IconText = styled.span<{ $isActive: boolean }>`
  color: black;
  text-align: center;
  border: ${props => props.$isActive ? '2px dashed black' : '2px solid transparent'};
  margin-top: 5px;
  font-weight: 500;

  font-size: 12px;
  text-shadow: 1px 1px 1px white;
`;

interface DesktopIconProps {
  icon: string;
  label: string;
  onClick: () => void;
  initialPosition: { x: number; y: number };
}

const DesktopIcon: React.FC<DesktopIconProps> = ({ icon, label, initialPosition, onClick }) => {
  const [isActive, setIsActive] = useState(false);
  const iconRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (iconRef.current && !iconRef.current.contains(event.target as Node)) {
        setIsActive(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isDragging) {
      if (isActive) {
        onClick();
      } else {
        setIsActive(true);
      }
    }
  };

  const handleDragStop = (e: DraggableEvent, data: DraggableData) => {
    setTimeout(() => {
      setIsDragging(false)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      handleClick(e as any);
    }, 0);
  };
  return (
    <Draggable
      bounds="parent"
      defaultPosition={initialPosition}
      onStop={handleDragStop}      cancel="span"
    >

    <IconWrapper
      ref={iconRef}
      tabIndex={0}
      onClick={handleClick}
    >
      <IconImage>
        <Image src={icon} alt={label} width={32} height={32} />
      </IconImage>
      <IconText $isActive={isActive}>{label}</IconText>
    </IconWrapper>
    </Draggable>
  );
};

export default DesktopIcon;