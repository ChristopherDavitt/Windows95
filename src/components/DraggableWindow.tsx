'use client'

import React from 'react'
import Draggable from 'react-draggable'
import { Window, WindowHeader, WindowContent, Button } from 'react95'

interface DraggableWindowProps {
  title: string
  children: React.ReactNode
  onClose: () => void
}

const DraggableWindow: React.FC<DraggableWindowProps> = ({ title, children, onClose }) => {
  return (
    <Draggable handle=".window-header" bounds="parent">
      <div style={{ position: 'absolute', zIndex: 1, top: '50px', left: '50px' }}>
        <Window style={{ width: 400 }}>
          <WindowHeader className="window-header">
            <span>{title}</span>
            <Button onClick={onClose} style={{ position: 'absolute', right: '8px' }}>
              <span style={{ fontWeight: 'bold', transform: 'translateY(-1px)' }}>x</span>
            </Button>
          </WindowHeader>
          <WindowContent>{children}</WindowContent>
        </Window>
      </div>
    </Draggable>
  )
}

export default DraggableWindow