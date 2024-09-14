'use client'

import React, { useState, useEffect, useCallback } from 'react'
import styled from 'styled-components'

const GameBoard = styled.div`
  display: grid;
  grid-template-columns: repeat(20, 1fr);
  grid-template-rows: repeat(20, 1fr);
  width: 300px;
  height: 300px;
  border: 2px solid #000;
`

const Cell = styled.div<{ $isSnake: boolean; $isFood: boolean }>`
  background-color: ${(props) => (props.$isSnake ? '#000' : props.$isFood ? '#f00' : '#fff')};
`

type Position = { x: number; y: number }

const SnakeGame: React.FC = () => {
  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }])
  const [food, setFood] = useState<Position>({ x: 15, y: 15 })
  const [direction, setDirection] = useState<'UP' | 'DOWN' | 'LEFT' | 'RIGHT'>('RIGHT')
  const [gameOver, setGameOver] = useState(false)

  const moveSnake = useCallback(() => {
    if (gameOver) return

    setSnake((prevSnake) => {
      const newSnake = [...prevSnake]
      const head = { ...newSnake[0] }

      switch (direction) {
        case 'UP':
          head.y = (head.y - 1 + 20) % 20
          break
        case 'DOWN':
          head.y = (head.y + 1) % 20
          break
        case 'LEFT':
          head.x = (head.x - 1 + 20) % 20
          break
        case 'RIGHT':
          head.x = (head.x + 1) % 20
          break
      }

      if (head.x === food.x && head.y === food.y) {
        setFood({
          x: Math.floor(Math.random() * 20),
          y: Math.floor(Math.random() * 20),
        })
      } else {
        newSnake.pop()
      }

      if (newSnake.some((segment) => segment.x === head.x && segment.y === head.y)) {
        setGameOver(true)
        return prevSnake
      }

      newSnake.unshift(head)
      return newSnake
    })
  }, [direction, food, gameOver])

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          setDirection('UP')
          break
        case 'ArrowDown':
          setDirection('DOWN')
          break
        case 'ArrowLeft':
          setDirection('LEFT')
          break
        case 'ArrowRight':
          setDirection('RIGHT')
          break
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [])

  useEffect(() => {
    const gameLoop = setInterval(moveSnake, 100)
    return () => clearInterval(gameLoop)
  }, [moveSnake])

  return (
    <div>
      <GameBoard>
        {Array.from({ length: 400 }).map((_, index) => {
          const x = index % 20
          const y = Math.floor(index / 20)
          const isSnake = snake.some((segment) => segment.x === x && segment.y === y)
          const isFood = food.x === x && food.y === y
          return <Cell key={index} $isSnake={isSnake} $isFood={isFood} />
        })}
      </GameBoard>
      {gameOver && <p>Game Over! Refresh to play again.</p>}
    </div>
  )
}

export default SnakeGame