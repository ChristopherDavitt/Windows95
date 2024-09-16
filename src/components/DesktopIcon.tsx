import React, { useState } from 'react';
import styled from 'styled-components';
import Draggable from 'react-draggable';

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

  const handleClick = () => {
    setIsActive(true);
  };

  const handleDoubleClick = () => {
    onDoubleClick();
    setIsActive(false);
  };

  const handleBlur = () => {
    setIsActive(false);
  };

  return (
    <Draggable
      bounds="parent"
      defaultPosition={initialPosition}
      cancel="span"
    >
      <IconWrapper 
        $isActive={isActive}
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
        onBlur={handleBlur}
        tabIndex={0}
      >
        <IconImage>{icon}</IconImage>
        <IconText>{label}</IconText>
      </IconWrapper>
    </Draggable>
  );
};

export default DesktopIcon;