"use client";

import React, { useState } from 'react';
import { Button, Toolbar, Separator, AppBar, MenuList, MenuListItem } from 'react95';
import DraggableWindow from '../components/DraggableWindow';
import SnakeGame from '@/components/SnakeGame';
import styled from 'styled-components';
import DesktopIcon from '@/components/DesktopIcon';
import Minesweeper from '@/components/Minesweeper';
import Image from 'next/image';
import CustomConnectButton from '@/components/CustomConnectButton';
import MintModal from '@/components/MintModal';

const MenuItem  = styled(MenuListItem)`
  display: flex;
  align-items: center;
  gap: 24px;
  cursor: pointer;
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
  const [showMintModal, setShowMintModal] = useState(false);
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
            onClick={() => setShowWindow(true)} />
          <DesktopIcon
            initialPosition={{ x: 0, y: 80 }}
            icon="🐍"
            label="Snake Game"
            onClick={() => setShowSnakeGame(true)} />
          <DesktopIcon
            initialPosition={{ x: 0, y: 240 }}
            icon="🖼️"
            label="Mint NFT"
            onClick={() => setShowMintModal(true)}
          />
          <DesktopIcon
            icon="💣"
            label="Minesweeper"
            onClick={() => setShowMinesweeper(true)}
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
        {showMintModal && (
          <MintModal onClose={() => setShowMintModal(false)} />
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
          <div style={{ position: 'relative', display: 'inline-block' }}>
          <Button
            onClick={() => setShowStartMenu(!showStartMenu)}
            active={showStartMenu}
            style={{ fontWeight: 'bold' }}
          >
            Start
          </Button>
          {showStartMenu && (
            <MenuList
              style={{
                position: 'absolute',
                left: '0',
                bottom: '100%'
              }}
              onClick={() => setShowStartMenu(false)}
            >
              <a href="https://x.com/AvaxABC">
                <MenuItem>
                  <span role='img' aria-label='👨‍💻'>
                    <Image src="/twitter.png" alt="Twitter" width={20} height={20} />
                  </span>
                  Twitter
                </MenuItem>
              </a>
              <a href="https://t.me/AvaxABC">
                <MenuItem>
                  <span role='img' aria-label='📁'>
                    <Image src="/telegram.png" alt="Telegram" width={20} height={20} />
                  </span>
                  Telegram
                </MenuItem>
              </a>
              <a href="https://arena.social/AvaxABC">
              <MenuItem>
                <span role='img' aria-label='📁'>
                  <Image src="/arena.jpg" alt="Arena" width={20} height={20} />
                </span>
                Arena
              </MenuItem>
              </a>
              <Separator />
              <MenuItem disabled>
                <span role='img' aria-label='🔙'>
                  🔙
                </span>
                Logout
              </MenuItem>
            </MenuList>
            )}
          </div>
            <div>
              <CustomConnectButton />
            </div>
          </AppBarContent>
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