# Pradeep Sakthivel — Cinematic AI Character Portfolio

## Quick Start (3 Steps)
1. **Add your video:** Copy your combined video into this folder and name it `raw_film.mp4`.
2. **Process for smooth scroll-scrubbing:** Double-click `build_film.bat` (Windows) or run `bash build_film.sh` (Mac/Linux). This removes the bottom-right watermark, crushes dark greys to pure black, and generates `site/media/film.mp4`, `site/media/film_mobile.mp4`, and `site/media/poster.jpg`.
3. **Preview locally:** Open PowerShell in this folder and run:
   ```powershell
   npx serve site
   ```

## Customize Text & Timestamps
- Edit `site/config.js` to change your bio, projects, links, or the exact `timeline.segments` and `timeline.windows` seconds to match your video's moves.
- Drop your resume PDF at `site/media/resume.pdf`.

## Deploy Free
- **Netlify Drop:** Drag ONLY the `site` folder to https://app.netlify.com/drop
- **Vercel:** Push to GitHub, import on https://vercel.com, set **Root Directory** to `site`, and click **Deploy**.
