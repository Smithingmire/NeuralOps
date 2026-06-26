# NeuralOps Landing Page

A premium, developer-focused marketing showcase for **NeuralOps**, the Cognitive Layer for Enterprise AI. Built using a modern stack prioritizing fluid UX, high-fidelity 3D mock animations, and interactive playground consoles.

## 🚀 Technology Stack

* **Core**: [Next.js](https://nextjs.org/) (App Router, static compilation ready) & [React](https://react.dev/)
* **Styling**: [Tailwind CSS](https://tailwindcss.com/) for fluid styling tokens and custom layout components
* **Icons**: [Lucide React](https://lucide.dev/) for cohesive developer tooling icons
* **Animations**: Native CSS 3D transforms, hardware-accelerated keyframe layouts, and Scroll-Reveal triggers

---

## 📁 Repository Directory Structure

```text
Frontend-Build/
├── public/                 # Static assets, logos, and config files
└── src/
    ├── app/                # Next.js App router config
    │   ├── layout.tsx      # Main application frame, fonts, and metadata
    │   ├── page.tsx        # Main layout landing page compiler
    │   ├── robots.txt      # Search engine crawler policies
    │   └── sitemap.ts      # Automated XML sitemap generator
    ├── components/         # Reusable atomic UI elements
    │   ├── AnimatedCounter.tsx # Live count-up animations for telemetry statistics
    │   └── ScrollReveal.tsx    # Intersection Observer animations wrapper
    └── sections/           # Modular page layout components
        ├── BentoFeatures.tsx   # Premium 3D tilt grid for features
        ├── CTA.tsx             # Interactive Call-To-Action form
        ├── Footer.tsx          # Sitemap links, social icons, and copyright details
        ├── Hero.tsx            # Concentric 3D core & orbiting nodes with hover protection
        ├── HowItWorks.tsx      # Pipeline flow, Integrations grid, and Ecosystem Console
        ├── Navbar.tsx          # Floating header navigation
        ├── Pricing.tsx         # Plan comparison grid & multi-currency billing switcher
        └── Testimonials.tsx    # Customer proof-of-work cards
```

---

## 💎 Core Interactive Features

### 1. Nested 3D Cognitive Core & Orbiting Modules (Hero Section)
* **Double Nested 3D Cube**: Renders crystalline and energy polyhedrons rotating in opposite directions.
* **Stable Hover Mechanics**: Orbiting modules immediately pause calculations on mouse-hover, and include a large interactive landing zone (`p-4 -m-4`) to eliminate visual "shivering" or stuttering common with 3D shifting nodes.
* **Laser Pulse Lines**: Direct link paths animate dashes along curves using GPU-accelerated CSS keyframe animations, replacing CPU-intensive SVG `animateMotion` trackers.

### 2. Bento Grid Features with Stable 3D Tilt
* Responsive card layout containing interactive features (WASM pipelines, edge analytics, secure sandbox environments).
* Implements a balanced mouse-movement 3D tilt effect that dampens smoothly to ensure no visual flickering.

### 3. Developer Ecosystem Console (Global Ecosystem Section)
* **SDK Selector & Language Toggle**: Displays mock integration codes, allowing developers to switch between **Python** (PY) and **TypeScript** (TS) syntaxes. Features a custom regex code parser for developer syntax highlighting.
* **CLI Terminal Emulator**: A fully interactive terminal sandbox that lets users execute mock scripts (`neuralops init`, `neuralops deploy`, `neuralops status`) featuring execution latency loading cues, status markers, and success logs.
* **Live Connection Logger**: Streams custom status logs matching hovered or clicked integration modules with a pulsing connection indicator.

### 4. Smart Pricing Switcher
* Features a billing currency toggle supporting **USD ($)**, **EUR (€)**, and **INR (₹)**.
* Includes custom yearly discount switches and animated price indicators.

---

## 🛠️ Getting Started & Local Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### 3. Compile Production Build
```bash
npm run build
```
Generates a highly optimized, production-ready static export.
