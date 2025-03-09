"use client";

import { useEffect, useState, useRef } from "react";
import { Ship, Bot as Boat, Waves } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { uploadScore } from "./actions";
import { SailorGameResultInput } from "@/lib/types";
import { ribeye } from "@/lib/fonts";
const GAME_WIDTH = 600;
const GAME_HEIGHT = 600;
const BOAT_SIZE = 60;
const OBSTACLE_WIDTH = 60;
const OBSTACLE_HEIGHT = 80;
const GAME_SPEED = 5;
const BOAT_TURNING_SPEED = 8;
const BOAT_SPEED = 10; // pixels per frame

const PIXELS_PER_MILE = 1609.34; // 1 mile = 1609.34 meters
const KNOTS_CONVERSION = 1.15078; // 1 knot = 1.15078 miles per hour

interface Obstacle {
  x: number;
  y: number;
  width: number;
  height: number;
}

export default function Game() {
  const [boatPosition, setBoatPosition] = useState(GAME_WIDTH / 2);
  const [obstacles, setObstacles] = useState<Obstacle[]>([]);
  const [obstacledAvoided, setObstaclesAvoided] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [distance, setDistance] = useState(0); // distance in pixels
  const [startedAt, setStartedAt] = useState(new Date());
  const gameLoopRef = useRef<number | null>(null);
  const keysPressed = useRef<{ [key: string]: boolean }>({});

  const handleKeyDown = (e: KeyboardEvent) => {
    keysPressed.current[e.key] = true;
  };

  const handleKeyUp = (e: KeyboardEvent) => {
    keysPressed.current[e.key] = false;
  };

  const updateBoatPosition = () => {
    if (keysPressed.current["ArrowLeft"] || keysPressed.current["a"]) {
      setBoatPosition((prev) =>
        Math.max(BOAT_SIZE / 2, prev - BOAT_TURNING_SPEED)
      );
    }
    if (keysPressed.current["ArrowRight"] || keysPressed.current["d"]) {
      setBoatPosition((prev) =>
        Math.min(GAME_WIDTH - BOAT_SIZE / 2, prev + BOAT_TURNING_SPEED)
      );
    }
  };

  const checkCollision = (boat: number, obstacles: Obstacle[]) => {
    return obstacles.some((obstacle) => {
      const boatLeft = boat - BOAT_SIZE / 2;
      const boatRight = boat + BOAT_SIZE / 2;
      const obstacleLeft = obstacle.x;
      const obstacleRight = obstacle.x + obstacle.width;

      return (
        boatRight > obstacleLeft &&
        boatLeft < obstacleRight &&
        GAME_HEIGHT - BOAT_SIZE < obstacle.y + obstacle.height * 1.2 &&
        GAME_HEIGHT - BOAT_SIZE > obstacle.y
      );
    });
  };

  const saveHighScore = async () => {};

  const startGame = () => {
    setGameOver(false);
    setScore(0);
    setObstacles([]);
    setObstaclesAvoided(0);
    setBoatPosition(GAME_WIDTH / 2);
    setIsPlaying(true);
    setStartedAt(new Date());
    setDistance(0); // reset distance
    keysPressed.current = {};
  };

  useEffect(() => {
    if (isPlaying && !gameOver) {
      const gameLoop = () => {
        updateBoatPosition();

        setObstacles((prevObstacles) => {
          let obstacleCount = prevObstacles.length;
          // Move obstacles down and filter out ones that are off screen
          const updatedObstacles = prevObstacles
            .map((obstacle) => ({ ...obstacle, y: obstacle.y + GAME_SPEED }))
            .filter((obstacle) => {
              const isVisible = obstacle.y < GAME_HEIGHT;
              if (!isVisible) {
                setObstaclesAvoided((prev) => prev + 1);
              }
              return isVisible;
            });

          // Add new obstacles
          if (Math.random() < 0.015) {
            updatedObstacles.push({
              x: Math.random() * (GAME_WIDTH - OBSTACLE_WIDTH),
              y: -OBSTACLE_HEIGHT, // Start above the screen
              width: OBSTACLE_WIDTH,
              height: OBSTACLE_HEIGHT,
            });
          }

          return updatedObstacles;
        });

        setScore((prev) => prev + 1);
        setDistance((prev) => prev + (BOAT_SPEED / 60) * KNOTS_CONVERSION); // update distance

        if (checkCollision(boatPosition, obstacles)) {
          let sailorGameResultInput: SailorGameResultInput = {
            score: score,
            distance: distance / PIXELS_PER_MILE, // convert to miles
            time: (new Date().getTime() - startedAt.getTime()) / 1000, // convert to seconds
            obsticlesAvoided: obstacledAvoided,
            startedPlayingAt: startedAt,
            gameId: "1",
          };
          uploadScore(sailorGameResultInput);
          setGameOver(true);
          setIsPlaying(false);
        }
      };

      gameLoopRef.current = window.setInterval(gameLoop, 1000 / 60);
      window.addEventListener("keydown", handleKeyDown);
      window.addEventListener("keyup", handleKeyUp);

      return () => {
        if (gameLoopRef.current) clearInterval(gameLoopRef.current);
        window.removeEventListener("keydown", handleKeyDown);
        window.removeEventListener("keyup", handleKeyUp);
      };
    }
  }, [isPlaying, gameOver, boatPosition, obstacles]);

  const distanceInMiles = (distance / PIXELS_PER_MILE).toFixed(3);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 to-blue-600 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl">
        <div className="mb-4 text-center">
          <h1
            className={`${ribeye.className} text-3xl font-bold text-blue-900 mb-2`}
          >
            Hajfyldt Havari
          </h1>
          <p className="text-lg text-blue-700">Score: {score}</p>
          <p className="text-lg text-blue-700">
            Obstacles Avoided: {obstacledAvoided}
          </p>
          <p className="text-lg text-blue-700">{distanceInMiles} Sømil</p>
        </div>

        <div
          className="relative bg-[url(/sea.jpg)] bg-cover bg-no-repeat b rounded-lg overflow-hidden"
          style={{ width: GAME_WIDTH, height: GAME_HEIGHT }}
        >
          {/* Water effect */}
          <div className="absolute inset-0 opacity-30">
            {Array.from({ length: 10 }).map((_, i) => (
              <Waves
                key={i}
                className="text-blue-50 absolute"
                style={{
                  left: `${80 * i}px`,
                  top: `${i * -200}px`,
                  animation: `wave ${20 + (i % 2)}s infinite linear`,
                }}
              />
            ))}
          </div>

          {/* Boat */}
          <div
            className="absolute transition-transform duration-50"
            style={{
              left: boatPosition - BOAT_SIZE / 2,
              bottom: BOAT_SIZE / 2,
              width: BOAT_SIZE,
              height: BOAT_SIZE,
            }}
          >
            <Image
              src="/boat2.png"
              width={BOAT_SIZE}
              height={BOAT_SIZE}
              alt="boat sprite"
              className="w-full h-full text-blue-900"
            />
          </div>

          {/* Obstacles */}
          {obstacles.map((obstacle, index) => (
            <div
              key={index}
              className="absolute  rounded"
              style={{
                left: obstacle.x,
                top: obstacle.y,
                width: obstacle.width,
                height: obstacle.height,
              }}
            >
              <Image
                src="/shark.gif"
                alt="Shark"
                width={obstacle.width}
                height={obstacle.height}
                className="w-full h-full text-red-700"
              />
            </div>
          ))}
        </div>

        <div className="mt-4 flex justify-center gap-4">
          {!isPlaying && (
            <Button onClick={startGame} variant="default">
              {gameOver ? "Play Again" : "Start Game"}
            </Button>
          )}
          {gameOver && (
            <Button onClick={saveHighScore} variant="outline">
              Save Score
            </Button>
          )}
        </div>

        {gameOver && (
          <div className="mt-4 text-center">
            <h2 className="text-2xl font-bold text-red-600">Game Over!</h2>
            <p className="text-gray-600">Final Score: {score}</p>
          </div>
        )}
      </div>
    </div>
  );
}
