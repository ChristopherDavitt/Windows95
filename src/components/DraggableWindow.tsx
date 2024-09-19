'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Window, WindowHeader, WindowContent, Button } from 'react95'
import styled from 'styled-components'

interface DraggableWindowProps {
  title: string
  children: React.ReactNode
  onClose: () => void
}

const StyledWindow = styled(Window)`
  position: fixed;
  z-index: 1000;
`

const CloseButton = styled(Button)`
  position: absolute;
  right: 8px;
  top: 8px;
  z-index: 10001;
`

const DraggableWindow: React.FC<DraggableWindowProps> = ({ title, children, onClose }) => {
  const [isDragging, setIsDragging] = useState(false)
  const [position, setPosition] = useState({ x: 50, y: 50 })
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 })
  const windowRef = useRef<HTMLDivElement>(null)

  const handleStart = (clientX: number, clientY: number) => {
    setStartPosition({ x: clientX - position.x, y: clientY - position.y })
    setIsDragging(true)
  }

  const handleMove = (clientX: number, clientY: number) => {
    if (isDragging && windowRef.current) {
      const newX = clientX - startPosition.x
      const newY = clientY - startPosition.y
      
      const maxX = window.innerWidth - windowRef.current.offsetWidth
      const maxY = window.innerHeight - windowRef.current.offsetHeight
      
      setPosition({
        x: Math.max(0, Math.min(newX, maxX)),
        y: Math.max(0, Math.min(newY, maxY)),
      })
    }
  }

  const handleEnd = () => {
    setIsDragging(false)
  }

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target instanceof HTMLElement && e.target.closest('.close-button')) return
    handleStart(e.clientX, e.clientY)
  }

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.target instanceof HTMLElement && e.target.closest('.close-button')) return
    const touch = e.touches[0]
    handleStart(touch.clientX, touch.clientY)
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => handleMove(e.clientX, e.clientY)
    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0]
      handleMove(touch.clientX, touch.clientY)
    }

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('touchmove', handleTouchMove)
      window.addEventListener('mouseup', handleEnd)
      window.addEventListener('touchend', handleEnd)
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('mouseup', handleEnd)
      window.removeEventListener('touchend', handleEnd)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDragging, startPosition])

  return (
    <StyledWindow ref={windowRef} style={{ top: `${position.y}px`, left: `${position.x}px` }}>
      <WindowHeader
        className="window-title"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <span>{title}</span>
        <CloseButton onClick={onClose} className="close-button">
          <span style={{ fontWeight: 'bold', transform: 'translateY(-1px)' }}>x</span>
        </CloseButton>
      </WindowHeader>
      <WindowContent>{children}</WindowContent>
    </StyledWindow>
  )
}

export default DraggableWindow