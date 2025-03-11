"use client";

import { useEffect, useState, useRef } from "react";
import {
  Ship,
  Bot as Boat,
  Waves,
  ChevronLeft,
  ChevronRight,
  Trophy,
  Anchor,
  Gauge,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { uploadScore } from "./actions";
import { SailorGameResultInput } from "@/lib/types";
import { ribeye } from "@/lib/fonts";
import Head from "next/head";

// Base game dimensions - will be scaled responsively
const BASE_GAME_WIDTH = 600;
const BASE_GAME_HEIGHT = 600;
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
  const [gameWidth, setGameWidth] = useState(BASE_GAME_WIDTH);
  const [gameHeight, setGameHeight] = useState(BASE_GAME_HEIGHT);
  const [scaleRatio, setScaleRatio] = useState(1);
  const [boatPosition, setBoatPosition] = useState(BASE_GAME_WIDTH / 2);
  const [obstacles, setObstacles] = useState<Obstacle[]>([]);
  const [obstacledAvoided, setObstaclesAvoided] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [distance, setDistance] = useState(0); // distance in pixels
  const [startedAt, setStartedAt] = useState(new Date());
  const gameLoopRef = useRef<number | null>(null);
  const keysPressed = useRef<{ [key: string]: boolean }>({});
  const gameContainerRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);

  // For mobile controls
  const leftButtonPressed = useRef(false);
  const rightButtonPressed = useRef(false);
  const buttonIntervalRef = useRef<number | null>(null);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (gameContainerRef.current) {
        const containerWidth = Math.min(
          gameContainerRef.current.clientWidth - 32,
          BASE_GAME_WIDTH
        );
        const newScaleRatio = containerWidth / BASE_GAME_WIDTH;

        setGameWidth(containerWidth);
        setGameHeight(BASE_GAME_HEIGHT * newScaleRatio);
        setScaleRatio(newScaleRatio);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Setup continuous movement for mobile controls
  useEffect(() => {
    if (isPlaying && !gameOver) {
      // Set up an interval for continuous mobile button movement
      buttonIntervalRef.current = window.setInterval(() => {
        if (leftButtonPressed.current) {
          moveLeft();
        }
        if (rightButtonPressed.current) {
          moveRight();
        }
      }, 16); // ~60fps
    }

    return () => {
      if (buttonIntervalRef.current) {
        window.clearInterval(buttonIntervalRef.current);
        buttonIntervalRef.current = null;
      }
    };
  }, [isPlaying, gameOver]);

  const handleKeyDown = (e: KeyboardEvent) => {
    keysPressed.current[e.key] = true;
  };

  const handleKeyUp = (e: KeyboardEvent) => {
    keysPressed.current[e.key] = false;
  };

  const moveLeft = () => {
    setBoatPosition((prev) =>
      Math.max(BOAT_SIZE / 2, prev - BOAT_TURNING_SPEED)
    );
  };

  const moveRight = () => {
    setBoatPosition((prev) =>
      Math.min(gameWidth - BOAT_SIZE / 2, prev + BOAT_TURNING_SPEED)
    );
  };

  const updateBoatPosition = () => {
    if (keysPressed.current["ArrowLeft"] || keysPressed.current["a"]) {
      moveLeft();
    }
    if (keysPressed.current["ArrowRight"] || keysPressed.current["d"]) {
      moveRight();
    }
  };

  const checkCollision = (boat: number, obstacles: Obstacle[]) => {
    return obstacles.some((obstacle) => {
      const boatLeft = boat - (BOAT_SIZE * scaleRatio) / 2;
      const boatRight = boat + (BOAT_SIZE * scaleRatio) / 2;
      const obstacleLeft = obstacle.x;
      const obstacleRight = obstacle.x + obstacle.width;

      return (
        boatRight > obstacleLeft &&
        boatLeft < obstacleRight &&
        gameHeight - BOAT_SIZE * scaleRatio <
          obstacle.y + obstacle.height * 1.2 &&
        gameHeight - BOAT_SIZE * scaleRatio > obstacle.y
      );
    });
  };

  const saveHighScore = async () => {};

  const startGame = () => {
    setGameOver(false);
    setScore(0);
    setObstacles([]);
    setObstaclesAvoided(0);
    setBoatPosition(gameWidth / 2);
    setIsPlaying(true);
    setStartedAt(new Date());
    setDistance(0); // reset distance
    keysPressed.current = {};
    leftButtonPressed.current = false;
    rightButtonPressed.current = false;

    // Add this to scroll to the controls after a short delay
    // The delay ensures the UI has updated before scrolling
    setTimeout(() => {
      if (window.innerWidth < 640 && controlsRef.current) {
        // 640px is the sm breakpoint in Tailwind
        controlsRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }, 300);
  };

  useEffect(() => {
    if (isPlaying && !gameOver) {
      const gameLoop = () => {
        updateBoatPosition();

        setObstacles((prevObstacles) => {
          // Move obstacles down and filter out ones that are off screen
          const updatedObstacles = prevObstacles
            .map((obstacle) => ({
              ...obstacle,
              y: obstacle.y + GAME_SPEED * scaleRatio,
            }))
            .filter((obstacle) => {
              const isVisible = obstacle.y < gameHeight;
              if (!isVisible) {
                setObstaclesAvoided((prev) => prev + 1);
              }
              return isVisible;
            });

          // Add new obstacles
          if (Math.random() < 0.015) {
            updatedObstacles.push({
              x: Math.random() * (gameWidth - OBSTACLE_WIDTH * scaleRatio),
              y: -OBSTACLE_HEIGHT * scaleRatio, // Start above the screen
              width: OBSTACLE_WIDTH * scaleRatio,
              height: OBSTACLE_HEIGHT * scaleRatio,
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
          };

          uploadScore(sailorGameResultInput).then((result) => {
            console.log("🚀 ~ uploadScore ~ result:", result);

            if (result?.id) {
              // Navigate to results page with session ID
              window.location.href = `/Spil/Hajfyldt-Havari/results?sessionId=${result.id}`;
            }
          });
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
  }, [
    isPlaying,
    gameOver,
    boatPosition,
    obstacles,
    gameWidth,
    gameHeight,
    scaleRatio,
  ]);

  // Add useEffect to prevent default touch behaviors globally when game is active
  useEffect(() => {
    if (isPlaying) {
      // Prevent context menu (long press)
      const handleContextMenu = (e: Event) => {
        e.preventDefault();
        return false;
      };

      // Prevent selection
      const handleSelectionChange = (e: Event) => {
        if (document.getSelection()) {
          document.getSelection()?.empty();
        }
      };

      // Disable text selection when game is active
      document.body.classList.add("no-select");
      document.addEventListener("contextmenu", handleContextMenu);
      document.addEventListener("selectionchange", handleSelectionChange);

      return () => {
        document.body.classList.remove("no-select");
        document.removeEventListener("contextmenu", handleContextMenu);
        document.removeEventListener("selectionchange", handleSelectionChange);
      };
    }
  }, [isPlaying]);

  const distanceInMiles = (distance / PIXELS_PER_MILE).toFixed(3);
  // Calculate elapsed time in minutes:seconds format
  const elapsedTimeInSeconds = isPlaying
    ? Math.floor((new Date().getTime() - startedAt.getTime()) / 1000)
    : 0;
  const minutes = Math.floor(elapsedTimeInSeconds / 60);
  const seconds = elapsedTimeInSeconds % 60;
  const timeFormatted = `${minutes}:${seconds.toString().padStart(2, "0")}`;

  // Event handlers for mobile controls
  const handleLeftTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    leftButtonPressed.current = true;
  };

  const handleLeftTouchEnd = () => {
    leftButtonPressed.current = false;
  };

  const handleRightTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    rightButtonPressed.current = true;
  };

  const handleRightTouchEnd = () => {
    rightButtonPressed.current = false;
  };

  return (
    <>
      <Head>
        {/* Add meta tag to disable zooming */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </Head>
      <div
        className="bg-muted flex items-end justify-center min-h-view game-container no-select"
        ref={gameContainerRef}
        onTouchStart={(e) =>
          e.target === gameContainerRef.current && e.preventDefault()
        }
      >
        <div className="bg-white p-4 h-full flex flex-col justify-between sm:p-8 rounded-lg shadow-xl w-full max-w-3xl no-select">
          <div className="mb-4 text-center">
            <h1
              className={`${ribeye.className} text-3xl font-bold text-blue-900 mb-4`}
            >
              Hajfyldt Havari
            </h1>

            {/* Game Stats UI */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              <div className="bg-blue-50 p-3 rounded-lg flex flex-col items-center justify-center">
                <div className="flex items-center gap-2 text-blue-700">
                  <Trophy size={18} />
                  <span className="font-semibold">Score</span>
                </div>
                <span className="text-2xl font-bold text-blue-900">
                  {score}
                </span>
              </div>

              <div className="bg-blue-50 p-3 rounded-lg flex flex-col items-center justify-center">
                <div className="flex items-center gap-2 text-blue-700">
                  <Anchor size={18} />
                  <span className="font-semibold">Sømil</span>
                </div>
                <span className="text-2xl font-bold text-blue-900">
                  {distanceInMiles}
                </span>
              </div>

              <div className="bg-blue-50 p-3 rounded-lg flex flex-col items-center justify-center">
                <div className="flex items-center gap-2 text-blue-700">
                  <Gauge size={18} />
                  <span className="font-semibold">Tid</span>
                </div>
                <span className="text-2xl font-bold text-blue-900">
                  {timeFormatted}
                </span>
              </div>
            </div>
          </div>

          <div>
            <div className="relative">
              <Image
                alt="Spil baggrund"
                src={"/sea.jpg"}
                width={600}
                height={600}
                className="absolute inset-0 w-full h-full object-cover rounded-lg"
              />
              <div
                className="relative rounded-lg overflow-hidden mx-auto no-select"
                style={{
                  width: gameWidth,
                  height: gameHeight,
                }}
                onTouchStart={(e) => e.preventDefault()}
              >
                {/* Water effect */}
                <div className="absolute inset-0 opacity-30">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <Waves
                      key={i}
                      className="text-blue-50 absolute"
                      style={{
                        left: `${80 * i * scaleRatio}px`,
                        top: `${i * -200 * scaleRatio}px`,
                        animation: `wave ${20 + (i % 2)}s infinite linear`,
                        transform: `scale(${scaleRatio})`,
                      }}
                    />
                  ))}
                </div>

                {/* Boat */}
                <div
                  className="absolute transition-transform duration-50"
                  style={{
                    left: boatPosition - (BOAT_SIZE * scaleRatio) / 2,
                    bottom: (BOAT_SIZE * scaleRatio) / 2,
                    width: BOAT_SIZE * scaleRatio,
                    height: BOAT_SIZE * scaleRatio,
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
                    className="absolute rounded"
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
                      width={OBSTACLE_WIDTH}
                      height={OBSTACLE_HEIGHT}
                      className="w-full h-full text-red-700"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 flex justify-center gap-4">
              {!isPlaying && (
                <Button
                  onClick={startGame}
                  variant="default"
                  className="px-8 py-2 text-lg"
                >
                  {gameOver ? "Play Again" : "Start Game"}
                </Button>
              )}
              {gameOver && (
                <Button onClick={saveHighScore} variant="outline">
                  Save Score
                </Button>
              )}
            </div>

            {/* Mobile controls - only visible on small screens */}
            {isPlaying && !gameOver && (
              <div
                ref={controlsRef}
                className="flex justify-between px-4 sm:hidden no-select mt-4"
                onTouchStart={(e) =>
                  e.target === controlsRef.current && e.preventDefault()
                }
              >
                <Button
                  variant="secondary"
                  size="lg"
                  className="rounded-full w-16 h-16 opacity-70 hover:opacity-100 no-select"
                  onTouchStart={handleLeftTouchStart}
                  onTouchEnd={handleLeftTouchEnd}
                  onTouchCancel={handleLeftTouchEnd}
                  onMouseDown={handleLeftTouchStart}
                  onMouseUp={handleLeftTouchEnd}
                  onMouseLeave={handleLeftTouchEnd}
                  onContextMenu={(e) => e.preventDefault()}
                >
                  <ChevronLeft size={36} />
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  className="rounded-full w-16 h-16 opacity-70 hover:opacity-100 no-select"
                  onTouchStart={handleRightTouchStart}
                  onTouchEnd={handleRightTouchEnd}
                  onTouchCancel={handleRightTouchEnd}
                  onMouseDown={handleRightTouchStart}
                  onMouseUp={handleRightTouchEnd}
                  onMouseLeave={handleRightTouchEnd}
                  onContextMenu={(e) => e.preventDefault()}
                >
                  <ChevronRight size={36} />
                </Button>
              </div>
            )}
            {/* {gameOver && (
              <div className="mt-6 text-center bg-red-50 p-4 rounded-lg">
                <h2 className="text-2xl font-bold text-red-600">Game Over!</h2>
                <p className="text-gray-700 mt-2">Final Score: {score}</p>
                <p className="text-gray-700">
                  Distance: {distanceInMiles} Sømil
                </p>
                <p className="text-gray-700">
                  Obstacles Avoided: {obstacledAvoided}
                </p>
              </div>
            )} */}
          </div>
        </div>
      </div>
    </>
  );
}
