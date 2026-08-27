# SohaTravelStay

A travel stay marketplace UI built as a frontend portfolio project. Users can browse destinations and featured stays, with search and responsive layouts.

The first release focuses on a production-style Home page. Property data currently comes from local mock JSON, not a live backend.

## Tech stack

- React 19
- TypeScript
- Vite
- Tailwind CSS 4
- React Router
- Lucide React

## Current status

- [x] Vite + React + TypeScript setup
- [x] Tailwind CSS 4
- [x] Routing
- [x] Typed mock data for destinations and properties
- [ ] Home page UI (navbar, hero, listings, footer)
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
  data/          Mock JSON and typed data exports
  pages/         Route-level screens
  types/         Shared TypeScript types
  App.tsx        Router
  main.tsx       App bootstrap
```

## Data

Listings are loaded from `src/data/data.json` and typed in `src/types`. This keeps the UI independent from a backend until an API is added.