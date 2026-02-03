# A Family of Buttons 🪐

An interactive solar system visualization that represents our family as planets — exploring personalities, interests, and the connections that bring us together.

## ✨ Features

- **Interactive Planets** — Click on any planet (Chris, Grace, Caleb, JJ) to explore their personality traits and interests
- **Comparison Mode** — Select multiple planets to discover shared interests between family members
- **Keyboard Navigation** — Use `C`, `G`, `K`, `J` keys to toggle planet selection
- **Dynamic Animations** — Orbiting planets with moons representing individual interests
- **Personality Insights** — HEXACO-based personality trait visualization (Extraversion, Conscientiousness, Openness, Agreeableness, Emotionality)

## 🚀 Getting Started

First, install dependencies:

```bash
npm install
```

Then run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to explore the solar system.

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org) (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Custom CSS
- **Fonts**: Jersey 20, Space Mono, Quantico (via Google Fonts)

## 🎮 How to Use

1. **Single Selection** — Click a planet to view their personality traits and interests
2. **Multi-Selection** — Click multiple planets to enter Comparison Mode and see shared interests
3. **Interest Highlighting** — Click on an interest to highlight the corresponding moon on the planet
4. **Keyboard Shortcuts**:
   - `C` — Toggle Chris
   - `G` — Toggle Grace  
   - `K` — Toggle Caleb
   - `J` — Toggle JJ

## 📁 Project Structure

```
my-app/
├── app/
│   ├── layout.tsx       # Root layout with fonts & background
│   ├── page.tsx         # Main solar system visualization
│   ├── globals.css      # Global styles
│   └── SolarSystem.css  # Solar system-specific styles
├── components/
│   ├── SpaceBackground.tsx  # Animated star background
│   └── ...
└── public/
    └── assets/          # SVG assets (sun, orbits, planets, icons)
```

## 🌟 The Family

| Planet | Name  | Keyboard |
|--------|-------|----------|
| 🔴 | Chris | `C` |
| 🟣 | Grace | `G` |
| 🔵 | Caleb | `K` |
| 🟢 | JJ    | `J` |

---

Made with 💜 by the Button family
