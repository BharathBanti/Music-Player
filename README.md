# 🎵 Music Player

A modern, responsive **Music Player web application** built using **HTML, Tailwind CSS (CDN), and Vanilla JavaScript**, inspired by Spotify and YouTube Music UI/UX patterns.

This project focuses on **core frontend engineering concepts** such as state management, DOM manipulation, persistence, and edge-case handling — without using any frameworks.

---

## Live Demo
🔗 https://bharathbanti.github.io/Music-Player/


## 🚀 Features

- ▶️ Play / Pause / Next / Previous controls  
- 🔀 Shuffle mode with safe random logic  
- 🔁 Repeat modes (Off / One / All)  
- 🔍 Live search & filter for songs  
- 🌗 Dark / Light theme toggle (persisted)  
- 💾 localStorage persistence  
  - Last played song  
  - Playback position  
  - Volume level  
  - Shuffle & repeat state  
  - Theme preference  
- 🎧 Active song highlighting (Spotify-style)  
- ⌨️ Keyboard shortcuts support  
- 📱 Fully responsive UI  

---

## 🛠 Tech Stack

- **HTML5**
- **Tailwind CSS (CDN)**
- **JavaScript (ES6)**

No frameworks. No libraries.  
Pure **Vanilla JavaScript** logic.

---

## 🧠 Key Engineering Concepts Used

- Audio API handling (`HTMLAudioElement`)
- Application state management without frameworks
- DOM manipulation & event delegation
- Search & filter logic without mutating source data
- Persisting user preferences using `localStorage`
- Handling real-world edge cases:
  - First load without saved state  
  - Audio metadata loading issues  
  - Shuffle & repeat conflicts  
- Clean separation of concerns:
  - `data.js` → song data  
  - `player.js` → audio logic  
  - `ui.js` → UI rendering  
  - `storage.js` → persistence logic
  - `main.js` → main JS file

---

## 📌 Notes

- Audio files are local assets used for learning and demonstration purposes only.

- This project is built to showcase frontend engineering skills.

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Bharath Dasari

Frontend Developer | JavaScript Enthusiast
