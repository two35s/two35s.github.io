# Y/B.

Youssef's personal portfolio — built with React, Vite, Express, and PostgreSQL.

## Getting Started

### Frontend
```bash
npm install
npm run dev        # dev server on localhost:5173
npm run build      # production build
npm run lint       # eslint
```

### Backend
```bash
cd backend
npm install
npm run dev        # dev server on localhost:5000 (requires .env)
```

Backend expects a `.env` with `DB_USER`, `DB_PASSWORD`, `DB_HOST`, `DB_PORT`, `DB_NAME`.

## Stack

| Layer      | Tech                                              |
|------------|---------------------------------------------------|
| Frontend   | React 19, Vite 7, react-router-dom                |
| Backend    | Express, PostgreSQL (pg)                           |
| Styling    | Component-scoped CSS, dark/light theme toggle      |
| Effects    | Framer Motion, Three.js, @cursorify, ClickSpark    |
