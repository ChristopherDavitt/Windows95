import React, { useState, useRef } from 'react';
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
  onClick: () => void;
  initialPosition: { x: number; y: number };
}

const DesktopIcon: React.FC<DesktopIconProps> = ({ icon, label, initialPosition, onClick }) => {
  const [isActive] = useState(false);
  const iconRef = useRef<HTMLDivElement>(null);

  return (
    <Draggable
      bounds="parent"
      defaultPosition={initialPosition}
      cancel="span"
    >

    <IconWrapper
      ref={iconRef}
      $isActive={isActive}
      onClick={onClick}
      tabIndex={0}
    >
      <IconImage>{icon}</IconImage>
      <IconText>{label}</IconText>
    </IconWrapper>
    </Draggable>
  );
};

export default DesktopIcon;