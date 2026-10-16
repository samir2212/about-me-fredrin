# about-me

Ahmed Samir's About Me site — "Every great product starts in the cloud."

Next.js (App Router, TypeScript), statically rendered, no env vars required. Deploys on Vercel: a preview for every branch, production on merge to `main`.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
```

- All copy lives in `src/content/profile.ts`.
- Interactive pieces are small client components in `src/components/`; everything else is server-rendered.
- Easter egg: type the Konami code (↑↑↓↓←→←→BA) or click the wordmark 5 times.
