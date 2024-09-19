"use client";

import React, { useState } from 'react';
import { Button, Toolbar, List, ListItem, Separator, AppBar } from 'react95';
import DraggableWindow from '../components/DraggableWindow';
import SnakeGame from '@/components/SnakeGame';
import styled from 'styled-components';
import DesktopIcon from '@/components/DesktopIcon';
import Clock from '@/components/Clock';
import Minesweeper from '@/components/Minesweeper';
import Image from 'next/image';

const StartButton = styled(Button)`
  font-weight: bold;
`;

const TaskBarItem = styled(Button)`
  margin-left: 4px;
`;

const Desktop = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  height: calc(100vh - 40px);
  padding: 20px;
`;

const BottomAppBar = styled(AppBar)`
  top: auto !important;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2;
`;

const AppBarContent = styled(Toolbar)`
  justify-content: space-between;
  padding: 4px;
  position: relative;
`;

export default function Home() {
  const [showWindow, setShowWindow] = useState(false);
  const [showSnakeGame, setShowSnakeGame] = useState(false);
  const [showStartMenu, setShowStartMenu] = useState(false);
  const [showMinesweeper, setShowMinesweeper] = useState(false);
  const clockRef = React.useRef<HTMLDivElement>(null);

  return (
    <>
      <div style={{
        overflow: 'hidden',
        height: '100vh',
        width: '100vw',
        zIndex: 1,
        backgroundSize: 'cover',
        backgroundPosition: 'top',
      }}>
        <Desktop>
          <DesktopIcon
            initialPosition={{ x: 0, y: 0 }}
            icon="ℹ️"
            label="$ABC Info"
            onDoubleClick={() => setShowWindow(true)} />
          <DesktopIcon
            initialPosition={{ x: 0, y: 80 }}
            icon="🐍"
            label="Snake Game"
            onDoubleClick={() => setShowSnakeGame(true)} />
          <DesktopIcon
            icon="💣"
            label="Minesweeper"
            onDoubleClick={() => setShowMinesweeper(true)}
            initialPosition={{ x: 0, y: 160 }} />
        </Desktop>
        {showWindow && (
          <DraggableWindow
            title="Autistic Boys Club"
            onClose={() => setShowWindow(false)}
          >
            <p>Sending Avax autists back to nursery to learn how not to jeet</p>
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

        <BottomAppBar>
          <AppBarContent>
            <div style={{ position: 'relative', display: 'inline-block', zIndex: 1 }}>
              <StartButton onClick={() => setShowStartMenu(!showStartMenu)}>
                Start
              </StartButton>
              {showWindow && (
                <TaskBarItem onClick={() => setShowWindow(true)}>
                  $ABC Info
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
            </div>
            <div ref={clockRef}>
              <Clock />
            </div>
          </AppBarContent>
          {showStartMenu && (
            <List
              style={{
                position: 'absolute',
                left: '4px', // Align with the Start button
                bottom: '100%',
                zIndex: 9999, // Ensure it's above other elements
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
        </BottomAppBar>
      </div>
      <div>
        <div style={{
          position: 'absolute',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
          zIndex: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Image src="/abc.jpg" alt="Logo" width={200} height={200} />
        </div>
      </div>
    </>
  );
}