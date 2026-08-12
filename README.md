# Project Canvas — Design Archive

A tiny, no-framework portfolio page that showcases Figma & Canva projects. Every project card (image, title, description, link) is pulled dynamically from a single `projects.json` file — no HTML editing needed to add new work.

**Live demo:** : https://project-canvas-ashy.vercel.app/

## ✨ Features

- Pure HTML, CSS, and vanilla JS — no build step, no dependencies
- Project cards render dynamically from `projects.json`
- Auto tag-coloring for `figma` vs `canva` projects
- Responsive grid, staggered fade-in animation, reduced-motion friendly
- Loading / empty / error states handled out of the box

## 📁 Project structure

```
.
├── index.html       # page markup
├── style.css         # all styling
├── script.js         # fetches projects.json and renders cards
└── projects.json     # your project data — edit this to add/remove projects
```

## ✏️ Adding a project

Open `projects.json` and add a new object to the array:

```json
{
  "title": "Your Project Title",
  "tool": "figma",
  "image": "https://link-to-image.png",
  "link": "https://www.figma.com/file/your-file-id",
  "description": "A short one- or two-line description of the project."
}
```

`tool` accepts `"figma"` or `"canva"` (controls the tag chip color). Anything else falls back to a default teal tag.

## 🖥️ Run locally

Because `script.js` uses `fetch()` to load `projects.json`, you can't just double-click `index.html` — browsers block local file fetches. Serve the folder instead:

```bash
# Python
python3 -m http.server 8000

# or Node
npx serve .
```

Then open `http://localhost:8000`.

## 🚀 Deploy: GitHub + Vercel

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com) → **Add New Project**
   - Import the GitHub repo you just pushed
   - Framework preset: **Other** (it's a static site, no build command needed)
   - Root directory: leave as `.`
   - Click **Deploy**

   Vercel will give you a live URL (e.g. `your-repo.vercel.app`) within a minute. Every future push to `main` auto-redeploys.

## 🛠️ Tech

HTML5 · CSS3 (custom properties, grid) · Vanilla JavaScript (Fetch API) · JSON

## 📄 License

Personal portfolio project — feel free to fork and adapt for your own work.
