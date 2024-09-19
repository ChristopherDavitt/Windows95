'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { Button } from 'react95'
import styled from 'styled-components'

const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const GameBoard = styled.div`
  display: grid;
  grid-template-columns: repeat(20, 1fr);
  grid-template-rows: repeat(20, 1fr);
  width: 300px;
  height: 300px;
  background-color: #bdbdbd;
  border: 3px solid #7b7b7b;
  padding: 3px;
`

const Cell = styled.div<{ $isSnake: boolean; $isFood: boolean }>`
  background-color: ${(props) => (props.$isSnake ? '#000' : props.$isFood ? '#f00' : '#bdbdbd')};
`

const ResetButton = styled(Button)`
  margin-bottom: 10px;
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

      // Check if snake hits itself
      if (newSnake.some((segment) => segment.x === head.x && segment.y === head.y)) {
        setGameOver(true)
        return prevSnake
      }

      newSnake.unshift(head)

      // Check if snake eats food
      if (head.x === food.x && head.y === food.y) {
        setFood({
          x: Math.floor(Math.random() * 20),
          y: Math.floor(Math.random() * 20),
        })
      } else {
        newSnake.pop()
      }

      return newSnake
    })
  }, [direction, food, gameOver])

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          setDirection((prev) => prev !== 'DOWN' ? 'UP' : prev)
          break
        case 'ArrowDown':
          setDirection((prev) => prev !== 'UP' ? 'DOWN' : prev)
          break
        case 'ArrowLeft':
          setDirection((prev) => prev !== 'RIGHT' ? 'LEFT' : prev)
          break
        case 'ArrowRight':
          setDirection((prev) => prev !== 'LEFT' ? 'RIGHT' : prev)
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

  const resetGame = () => {
    setSnake([{ x: 10, y: 10 }])
    setFood({ x: 15, y: 15 })
    setDirection('RIGHT')
    setGameOver(false)
  }

  return (
    <GameContainer>
      <ResetButton onClick={resetGame}>Reset Game</ResetButton>
      <GameBoard>
        {Array.from({ length: 400 }).map((_, index) => {
          const x = index % 20
          const y = Math.floor(index / 20)
          const isSnake = snake.some((segment) => segment.x === x && segment.y === y)
          const isFood = food.x === x && food.y === y
          return <Cell key={index} $isSnake={isSnake} $isFood={isFood} />
        })}
      </GameBoard>
      {gameOver && (
        <div>
          <p>Game Over! Your score: {snake.length - 1}</p>
          <Button onClick={resetGame}>Play Again</Button>
        </div>
      )}
    </GameContainer>
  )
}

export default SnakeGame