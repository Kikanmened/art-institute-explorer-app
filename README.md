# Art Institute Explorer

React + Vite + TypeScript app for searching the Art Institute of Chicago collection, saving a personal gallery, and adding notes.

## Scripts

```bash
npm install
npm run dev
```

## Stack

- Vite `react-ts` (FR001)
- Zod for runtime validation (FR002)
- React Router (`/` search, `/gallery`)
- Tailwind CSS + daisyUI

Search uses a Zod-validated AIC helper. The gallery is stored in `localStorage` and re-parsed with Zod on read. Notes are validated with `NoteSchema` before save.
