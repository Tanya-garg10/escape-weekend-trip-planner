# Escape – Weekend Trip Planner

A modern, premium‑looking single‑page web application that helps users discover and pick a perfect weekend getaway destination.

## ✨ Features

- **Dynamic filter bar** – filter by vibes, budget, travel time and sort order.
- **Responsive destination cards** – show image, rating, price, tags, and a quick "Explore" CTA.
- **Saved destinations** – persists favourite trips in `localStorage`.
- **Smooth animations** – hover effects, fade‑in cards, and heart‑pop animation when saving.
- **Mobile‑first design** – looks great on all screen sizes.

## 🛠️ Tech Stack

- **React** (hooks, functional components)
- **Vite** – fast dev server & build tool
- **Tailwind CSS** – utility‑first styling with custom colour palette
- **Lucide React** – lightweight icons
- **localStorage** – simple client‑side persistence

## 🚀 Getting Started

```bash
# Clone the repo (if you haven't already)
git clone <repo‑url>
cd escape

# Install dependencies
npm install

# Run the development server
npm run dev

# Build for production
npm run build
```

Open <http://localhost:5173> in your browser to see the app.

## 📚 Project Structure

```
src/
├─ components/      # UI components (FilterBar, DestinationCard, etc.)
├─ data/            # Mock destination data
├─ pages/           # Route‑level components (Home, Saved, etc.)
├─ index.css        # Tailwind config & custom utilities
└─ main.jsx         # App entry point
```

## 🎨 Design Highlights

- **Premium colour palette** using HSL values for consistent theming.
- **Glass‑morphism** on cards with subtle shadows.
- **Micro‑animations** for hover, scroll‑fade, and button interactions.

## 📝 Notes

- This is a **frontend‑only** project – all data is static/mocked.
- No backend, authentication, or payment integrations are included.

Made with ❤️ by the Escape team.
