# Portfolio-3D · Mohammed Afaan Ansari

A 3D, role-aware portfolio site built for AI/ML, Data Science, Data Engineering, and Software Engineering recruiters. Sections filter by hiring lane so each visitor lands on the work that matches their req.

**Stack:** Vite · React 18 · TypeScript · Three.js · `@react-three/fiber` + `drei` + `postprocessing` · GSAP + `@gsap/react` · `react-fast-marquee` · `react-icons` · CSS Modules.

---

## Prerequisites

- **Node.js 18.18+** (tested on 20.x and 24.x)
- **npm 9+**

## Install & run

```bash
npm install
npm run dev          # http://localhost:5173
npm run build        # type-check + production bundle
npm run preview      # preview the production bundle locally
npm run typecheck    # tsc --noEmit
npm run lint         # eslint .
```

---

## Project layout

```
public/
  resumes/                       ← Drop the 6 résumé PDFs here
src/
  assets/
  components/
    Scene/
      Scene.tsx                  ← Canvas + postprocessing wrapper
      NeuralNetwork.tsx          ← Instanced node graph + pulses
      constants.ts               ← Tier-based perf params
    styles/                      ← One CSS module per component
    About.tsx
    Awards.tsx
    Career.tsx
    Contact.tsx
    CustomCursor.tsx
    Landing.tsx
    MainContainer.tsx
    Navbar.tsx
    Publications.tsx
    SectionHeader.tsx
    TechStack.tsx
    WhatIDo.tsx
    Work.tsx
  context/
    RoleContext.tsx              ← Role filter state shared by Career + Work
  data/                          ← All site content (typed, CV-derived)
    awards.ts
    education.ts
    experience.ts
    profile.ts
    projects.ts
    publications.ts
    resumes.ts
    skills.ts
    types.ts
    whatIDo.ts
    index.ts
  hooks/
    useDevicePerf.ts             ← FPS probe + device hints → 'high' | 'medium' | 'low'
  App.tsx
  main.tsx
  index.css
```

---

## How to update content

All copy lives in **`src/data/`** as typed TypeScript objects · no need to touch components.

| File | Edit when… |
|------|------------|
| `profile.ts` | Tagline, hero metrics, bio paragraphs, contact handles |
| `education.ts` | Degrees, advisors, GPA |
| `experience.ts` | Career timeline (set `earlier: true` to collapse into the Earlier-roles strip) |
| `publications.ts` | Papers + `award`, `leadAuthor`, `highlight` flags |
| `projects.ts` | Selected work cards (`featured: true` adds a star pill) |
| `skills.ts` | Categorized skill grid + the marquee strip |
| `awards.ts` | Awards grouped by `research / industry / hackathon-win / hackathon-finalist / community` |
| `whatIDo.ts` | The 5 lane cards on the "What I do" section |
| `resumes.ts` | Résumé dropdown · `file` paths are served from `/public/resumes/` |

Each item that should appear in the role filter (Career + Work) carries a `roles: Role[]` array. Add or remove tags to change which filter chips surface that item. The `Role` union and chip metadata are defined in `src/data/types.ts`.

---

## Résumé PDFs

Drop your six résumé variants into `public/resumes/` with these exact filenames (already wired in `src/data/resumes.ts`):

```
public/resumes/Mohammed_Afaan_Ansari_CV.pdf
public/resumes/Resume_Afaan_Ansari_AI_ML.pdf
public/resumes/Resume_Afaan_Ansari_AI_specific_diffussion.pdf
public/resumes/Resume_Afaan_Ansari_data_scientist.pdf
public/resumes/Resume_Afaan_Ansari_data_analyst.pdf
public/resumes/Resume_Afaan_Ansari_data_engineer.pdf
public/resumes/Resume_Afaan_Ansari_SDE.pdf
```

The Contact-section dropdown picks them up automatically.

---

## 3D scene

The Landing-section background renders a Fibonacci-distributed neural-network graph: instanced node spheres + line-segment edges + travelling pulse spheres, with bloom + vignette postprocessing.

Performance is tiered by `useDevicePerf` (`src/hooks/useDevicePerf.ts`):

| Tier   | When | Node count | Pulses | Bloom |
|--------|------|-----------:|-------:|:-----:|
| high   | Desktop / discrete GPU / 60 fps probe | 110 | 14 | ✓ |
| medium | Mid-range laptops / 30-50 fps | 75 | 9 | ✓ |
| low    | Mobile / `prefers-reduced-motion` / `deviceMemory ≤ 4 GB` / < 30 fps | 42 | 5 | ✗ |

Tweak the parameters in `src/components/Scene/constants.ts`.

---

## Deploy · Vercel

The repo includes `vercel.json` so a Vercel project will work with default settings. From the dashboard:

1. **Add new project** → import the GitHub repo
2. Framework preset: **Vite** (auto-detected)
3. Build command: `npm run build` · Output: `dist`
4. Deploy

CLI alternative:

```bash
npm i -g vercel
vercel            # follow prompts for first deploy
vercel --prod     # promote to production
```

## Deploy · Netlify

`netlify.toml` is included.

1. **Add new site → Import an existing project** → pick the repo
2. Build command: `npm run build` · Publish directory: `dist`
3. Deploy

CLI alternative:

```bash
npm i -g netlify-cli
netlify deploy            # preview
netlify deploy --prod     # production
```

---

## Customization quick wins

- **Accent colour**: change `--accent`, `--accent-bright`, `--accent-dim`, and `--accent-glow` in `src/index.css`. Also update `ACCENT` / `NODE_COLOR` / `EDGE_COLOR` / `PULSE_COLOR` in `src/components/Scene/constants.ts`.
- **Display font**: swap `Space Grotesk` for another grotesk in `index.html` and `--font-display` in `src/index.css`.
- **Hero rotating word**: edit `FOCUS_WORDS` in `src/components/Landing.tsx`.

---

## License

Personal portfolio · content © Mohammed Afaan Ansari. Code is yours to use as a reference.
