# SohaTravelStay

A travel stay marketplace UI built as a frontend portfolio project. Users can browse destinations and featured stays, with search and responsive layouts.

The first release is a production-style Home page. Property data currently comes from local mock JSON, not a live backend.

## Tech stack

- React 19
- TypeScript
- Vite
- Tailwind CSS 4
- React Router
- Lucide React

## Features

- Responsive navbar with a mobile drawer menu
- Hero search for location, dates, and guests
- Popular destinations and featured stays from typed mock data
- Value proposition and footer with newsletter signup

## Current status

- [x] Vite + React + TypeScript setup
- [x] Tailwind CSS 4
- [x] Routing
- [x] Typed mock data for destinations and properties
- [x] Home page UI (navbar, hero, listings, footer)
- [ ] Additional pages

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Scripts

These commands already exist in the project. You do not need to add them.

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |

## Project structure

```text
src/
  components/
    home/        Home page sections and cards
    layout/      Navbar and Footer
    ui/          Reusable Button and Card
  data/          Mock JSON and typed data exports
  pages/         Route-level screens
  types/         Shared TypeScript types
  App.tsx        Router
  main.tsx       App bootstrap
```

## Data

Listings are loaded from `src/data/data.json` and typed in `src/types`. This keeps the UI independent from a backend until an API is added.