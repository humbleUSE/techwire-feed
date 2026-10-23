# Hacker News Stories

[![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Axios](https://img.shields.io/badge/Axios-5A29E4?logo=axios&logoColor=white)](https://axios-http.com/)

A polished Hacker News-inspired news reader built with React, TypeScript, and Vite. This project focuses on a clean reading experience, efficient list sorting, and local search, while also demonstrating modern frontend patterns for handling asynchronous data and UI state.

## Overview

This application presents a searchable list of Hacker News stories with a lightweight, card-based reading interface. It is designed to feel fast and focused, making it easier to scan article titles, inspect metadata like author and points, and quickly remove items from the feed.

The project is useful as both a learning exercise and a portfolio-ready frontend project, especially for showcasing:

- React state management with `useReducer`
- localStorage-backed search persistence
- UI sorting and filtering
- responsive list design
- mock API integration for development workflows

## Features

- Search stories by keyword
- Sort by title, author, comments, or points
- Remove entries from the active feed
- Responsive layout for desktop and smaller screens
- Theme-aware styling with a dark/light-ready design system
- Mock backend support for local development
- Type-safe data modeling to keep story structures predictable

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Axios
- JSON Server
- Lucide React
- es-toolkit
- Zustand patterns and reducer-based state flow

## Project Structure

```text
techwire-feed/
├── .gitignore
├── .oxlintrc.json
├── .prettierrc
├── README.md
├── biome.json
├── bun.lock
├── components.json
├── index.html
├── mock-api/
│   ├── db.json
│   ├── hacker-news-data.json
│   └── reshape.js
├── package.json
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── App.tsx
│   ├── components/
│   │   ├── error-page.tsx
│   │   ├── header.tsx
│   │   ├── list.tsx
│   │   ├── loadingPage.tsx
│   │   ├── main-section.tsx
│   │   ├── main.tsx
│   │   ├── mode-toggle.tsx
│   │   └── ui/
│   ├── context-providers/
│   │   └── theme-provider.tsx
│   ├── index.css
│   ├── lib/
│   ├── styles/
│   ├── types/
│   │   ├── OnRemoveItem.tsx
│   │   ├── StoriesState..tsx
│   │   └── Story.tsx
│   ├── utilities/
│   │   └── storiesReducer.tsx
│   └── vite-env.d.ts
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
└── package-lock.json
```

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js
- npm or Bun

### Installation

1. Clone the repository:

```bash
git clone https://github.com/humbleUSE/techwire-feed.git
cd techwire-feed
```

2. Install dependencies:

```bash
npm install
```

or

```bash
bun install
```

### Run the app

Start the frontend:

```bash
npm run dev
```

Then start the mock API server:

```bash
npm run mock:serve
```

This project expects the local mock server to run for story data during development.

## Available Scripts

```bash
npm run dev
npm run build
npm run preview
npm run lint
npm run mock:serve
npm run mock:fetch
npm run mock:build
```

### Script Notes

- `npm run dev` starts the Vite development server
- `npm run build` compiles the app for production
- `npm run mock:serve` runs the local JSON server for mocked data
- `npm run mock:fetch` pulls a fresh Hacker News dataset from the public Algolia API
- `npm run mock:build` processes the mock data shape for app use

## Data Flow

The app follows a simple and understandable flow:

1. The component loads and triggers a fetch for stories
2. State is updated through a reducer
3. The list renders sorted and filtered results
4. User interactions such as searching or removing items update the UI immediately

This keeps the logic predictable and easier to reason about while still feeling modern and responsive.

## Deployment Notes

This project is structured for easy deployment to Vercel, Netlify, or similar static-hosting platforms. For production deployment, the mock API should be replaced with a real backend or a configured production endpoint.

The current app is intentionally flexible enough to support both local development and a live API-backed version.

## Project Goals

This project was built to demonstrate:

- clean React component composition
- frontend engineering discipline
- search and sorting interactions
- responsive content presentation
- portfolio-quality UI polish

## Roadmap

- [x] Search and sort functionality
- [x] Reducer-based story state handling
- [x] Local mock data support
- [x] Responsive card-based layout
- [ ] Pagination and improved content loading
- [ ] Production API integration
- [ ] Story detail page and article preview flow
- [ ] Accessibility review and enhancement pass

## License

This project is currently unlicensed and is intended for personal portfolio and learning purposes.

---

Built as a frontend project focused on readable, fast, and polished user experiences.
