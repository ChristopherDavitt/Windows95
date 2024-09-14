"use client";

import React, { useState } from 'react';
import { Button, Toolbar, List, ListItem, Separator } from 'react95';
import DraggableWindow from '../components/DraggableWindow';
import SnakeGame from '@/components/SnakeGame';
import styled from 'styled-components';
import DesktopIcon from '@/components/DesktopIcon';
import Clock from '@/components/Clock';
import Minesweeper from '@/components/Minesweeper';

const TaskBar = styled(Toolbar)`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 4px;
`;

const StartButton = styled(Button)`
  font-weight: bold;
`;

const TaskBarItem = styled(Button)`
  margin-left: 4px;
`;
const TaskBarLeft = styled.div`
  display: flex;
`;

const TaskBarRight = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  right: 8px;
`;
const Desktop = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  height: calc(100vh - 40px);
  padding: 20px;
`;

export default function Home() {
  const [showWindow, setShowWindow] = useState(false);
  const [showSnakeGame, setShowSnakeGame] = useState(false);
  const [showStartMenu, setShowStartMenu] = useState(false);
  const [showMinesweeper, setShowMinesweeper] = useState(false);
  const clockRef = React.useRef<HTMLDivElement>(null);

  return (
    <div style={{ overflow: 'hidden', background: '#008080', height: '100vh', padding: '20px' }}>
      <Desktop>
        <DesktopIcon
          initialPosition={{ x: -20, y: 0 }}
          icon="ℹ️"
          label="$ABC Info"
          onDoubleClick={() => setShowWindow(true)}
        />
        <DesktopIcon
          initialPosition={{ x: -20, y: 80 }}
          icon="🐍"
          label="Snake Game"
          onDoubleClick={() => setShowSnakeGame(true)}
        />
        <DesktopIcon
          icon="💣"
          label="Minesweeper"
          onDoubleClick={() => setShowMinesweeper(true)}
          initialPosition={{ x: -20, y: 160 }}
        />
      </Desktop>
      {showWindow && (
        <DraggableWindow
          title="Autistic Boys Club"
          onClose={() => setShowWindow(false)}
        >
          <p>Welcome to the club!</p>
        </DraggableWindow>
      )}

      {showSnakeGame && (
        <DraggableWindow
          title="Snake Game"
          onClose={() => setShowSnakeGame(false)}
        >
          <SnakeGame />
        </DraggableWindow>
      )}
       {showMinesweeper && (
          <DraggableWindow
            title="Minesweeper"
            onClose={() => setShowMinesweeper(false)}
          >
            <Minesweeper />
          </DraggableWindow>
        )}

      <TaskBar style={{ background: '#D9BF09' }}>
        <TaskBarLeft>
          <StartButton onClick={() => setShowStartMenu(!showStartMenu)}>
            Start
          </StartButton>
          {showWindow && (
            <TaskBarItem onClick={() => setShowWindow(true)}>
              My First Window
            </TaskBarItem>
          )}
          {showSnakeGame && (
            <TaskBarItem onClick={() => setShowSnakeGame(true)}>
              Snake Game
            </TaskBarItem>
          )}
          {showMinesweeper && (
            <TaskBarItem onClick={() => setShowMinesweeper(true)}>
              Minesweeper
            </TaskBarItem>
          )}
        </TaskBarLeft>
        <TaskBarRight ref={clockRef}>
          <Clock />
        </TaskBarRight>
        {showStartMenu && (
          <List
            style={{
              position: 'absolute',
              left: '0',
              bottom: '100%',
            }}
            onClick={() => setShowStartMenu(false)}
          >
            <ListItem onClick={() => setShowWindow(true)}>
              $ABC Info
            </ListItem>
            <ListItem onClick={() => setShowSnakeGame(true)}>
              Snake Game
            </ListItem>
            <ListItem onClick={() => setShowMinesweeper(true)}>
              Minesweeper
            </ListItem>
            <Separator />
            <ListItem>Shut Down...</ListItem>
          </List>
        )}
      </TaskBar>
    </div>
  );
}