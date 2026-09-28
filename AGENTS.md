# Agent Guide

## Project

- This is a React 19 application built with Vite.
- `src/App.jsx` is the application entry composition. The current page is `src/pages/Home.jsx`.
- Put reusable UI in `src/components/`, page composition in `src/pages/`, page-specific styles in `src/styles/`, and global resets/base styles in `src/index.css`.
- Keep static images in `src/assets/images/` and import them from components, as `Hero.jsx` does with `hero.jpg`.

## Existing Conventions

- Use JSX functional components and the existing relative-import style.
- Use `react-bootstrap` for Bootstrap components and `react-icons` for icons when those libraries cover the need.
- Preserve existing class names and CSS ownership when changing the navbar or home page; avoid moving styles into unrelated files.
- Follow the existing responsive CSS approach with media queries for layout changes.
- Keep changes focused. Do not introduce routing, state management, TypeScript, or new dependencies unless the feature requires them.

## Validation

Run these commands from the repository root after changes:

```bash
npm run lint
npm run build
```

Use `npm run dev` for browser checks during development. There is currently no test script in `package.json`.

## Notes

- Bootstrap CSS is loaded globally in `src/main.jsx`; do not import it again in individual components.
- The ESLint configuration covers `.js` and `.jsx` files and ignores `dist/`.
- Keep image sizing and responsive behavior explicit so new content does not introduce horizontal overflow.