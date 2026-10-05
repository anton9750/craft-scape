# Crafty

```bash
npm install
npm run dev     # http://localhost:5173
```

`npm run build` makes a production build in `dist/`. `npm run typecheck` runs TypeScript checks.

## Deploy to GitHub Pages

1. Push this project to a GitHub repo on the `main` branch.
2. In the repo go to **Settings → Pages** and set **Source** to **GitHub Actions**.
3. Every push to `main` runs `.github/workflows/deploy.yml` and publishes to
   `https://<user>.github.io/<repo>/`.
