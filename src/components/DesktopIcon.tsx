import React, { useState, useRef, useEffect, useCallback } from 'react';
import Draggable from 'react-draggable';
import styled from 'styled-components';

const IconWrapper = styled.div<{ $isActive: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 64px;
  cursor: pointer;
  z-index: 2;
  padding: 5px;
  border: ${props => props.$isActive ? '1px dashed black' : '1px solid transparent'};
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

const IconText = styled.span`
  color: black;
  text-align: center;
  margin-top: 5px;
  font-weight: 500;

  font-size: 12px;
  text-shadow: 1px 1px 1px white;
`;

interface DesktopIconProps {
  icon: string;
  label: string;
  onDoubleClick: () => void;
  initialPosition: { x: number; y: number };
}

const DesktopIcon: React.FC<DesktopIconProps> = ({ icon, label, onDoubleClick, initialPosition }) => {
  const [isActive, setIsActive] = useState(false);
  const iconRef = useRef<HTMLDivElement>(null);
  const isMobile = useRef(false);
  const tapTimer = useRef<NodeJS.Timeout | null>(null);
  const doubleTapDelta = 300; // ms

  useEffect(() => {
    isMobile.current = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }, []);

  const handleTap = useCallback(() => {
    if (tapTimer.current === null) {
      // First tap
      setIsActive(true);
      tapTimer.current = setTimeout(() => {
        tapTimer.current = null;
      }, doubleTapDelta);
    } else {
      // Second tap
      clearTimeout(tapTimer.current);
      tapTimer.current = null;
      onDoubleClick();
      setIsActive(false);
    }
  }, [onDoubleClick]);


  const handleBlur = () => {
    setIsActive(false);
  };



  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isMobile.current) {
      handleTap();
    }
  };

  useEffect(() => {
    return () => {
      if (tapTimer.current) {
        clearTimeout(tapTimer.current);
      }
    };
  }, []);

  return (
    <Draggable
      bounds="parent"
      defaultPosition={initialPosition}
      cancel="span"
    >

    <IconWrapper
      ref={iconRef}
      $isActive={isActive}
      onBlur={handleBlur}
      onClick={handleClick}
      tabIndex={0}
    >
      <IconImage>{icon}</IconImage>
      <IconText>{label}</IconText>
    </IconWrapper>
    </Draggable>
  );
};

export default DesktopIcon;