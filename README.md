# 🎮 Memory Game Blocks

![JavaScript](https://img.shields.io/badge/JavaScript-ES6%2B-yellow?logo=javascript)
![HTML](https://img.shields.io/badge/HTML-5-red?logo=html5)
![CSS](https://img.shields.io/badge/CSS-3-blue?logo=css3)

A fun memory-based game built using **JavaScript**, **HTML**, and **CSS**. Players flip two blocks at a time to find matching pairs. The game tracks the number of wrong attempts and displays results at the end of the game session.

## 📖 Table of Contents

- [Features](#features)
- [Game Rules](#game-rules)
- [How to Play](#how-to-play)
- [Game Result](#game-result)

---

## 🚀 Features

- Randomly shuffles the blocks at the start of each game.
- **Flip Animation** for smooth transitions when flipping the blocks.
- Tracks wrong attempts and updates them in real-time.
- Saves player results (name and wrong tries) in **LocalStorage**.
- Displays the summary of results at the end of the game.

---

## 🕹️ Game Rules

- Players flip two blocks at a time to find matching pairs.
- If the two blocks match, they stay flipped and visible.
- If they don’t match, the blocks are flipped back after a short delay.
- The game ends when all pairs are successfully matched.

---

## 🎮 How to Play

1. Click the **Start Game** button and enter your name when prompted.
2. The blocks will be shuffled automatically.
3. Click any block to flip it. Try to find matching pairs.
4. If you match two blocks, they remain visible. If not, they will flip back after a short pause.
5. The game ends when all pairs are matched.

---

## 🏆 Game Result

- After the game ends, the player's name and the number of wrong attempts are displayed.
- Previous game results are saved in **LocalStorage** and are displayed at the start of each new session.
