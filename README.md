# SohaTravelStay

A travel stay marketplace UI built as a frontend portfolio project. Users can browse destinations and featured stays, then search with filters and sorting.

Property data currently comes from local mock JSON, not a live backend.

## Live demo

The app is deployed on Vercel: [https://sohatravelstay.xyz](https://sohatravelstay.xyz)

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
- Search Results page with listing cards
- Desktop sidebar filters and mobile filter sheet
- Sort by recommended, price, or rating
- Value proposition and footer with newsletter signup
- Resized Unsplash images and lazy-loaded offscreen photos

## Current status

- [x] Vite + React + TypeScript setup
- [x] Tailwind CSS 4
- [x] Routing
- [x] Typed mock data for destinations and properties
- [x] Home page UI (navbar, hero, listings, footer)
- [x] Search Results page with filters
- [x] Property details page
- [x] Booking checkout page (details step)
- [x] Review & pay page
- [x] Booking confirmation page
- [x] Destinations page
- [x] About page

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173). Search from the home page to open `/stays`.

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
    search/      Search Results cards and filters
    ui/          Reusable Button and Card
  data/          Mock JSON and typed data exports
  pages/         Route-level screens
  types/         Shared TypeScript types
  utils/         Booking price helpers and Unsplash image URLs
  App.tsx        Router
  main.tsx       App bootstrap
```

## Data

Listings are loaded from `src/data/data.json` and typed in `src/types`. This keeps the UI independent from a backend until an API is added.
Listing photos stay as Unsplash URLs in `data.json`. `unsplashSrc` in `src/utils/image.ts` adds width and quality when they render, and offscreen images use `loading="lazy"`.