# Project instructions

This project uses two design skills from elayadesign/ai-design-skills, installed in `.claude/skills/`.

- `landing-page-design`: use for ANY landing page, marketing site, web UI, section, component or prototype. Work through Part A (intake, structure, copy) before Part B (visual system). Build section by section: hero, benefits, how it works, proof, FAQ, final CTA.
- `figma-designer`: use for any work in Figma through the Figma MCP. Load the official `figma-use` skill before any `use_figma` call.

Rules:
- Ask the intake questions (landing-page-design A1) in one batch before building. If unanswered, assume, state the assumption in one line, and continue.
- Never rebuild a whole page on each iteration. Change one section at a time.
- Skill values (fonts, spacing, radius, colors) are fixed by the skills. If my prompt conflicts with a rule, my prompt wins.
- Run each skill's final checklist before reporting work done.

## Stack
Next.js (App Router) + TypeScript + Tailwind, in `src/`. Run `npm run dev`. Next.js here may differ from training data: read `node_modules/next/dist/docs/` before writing code (see AGENTS.md).
- Use Tailwind scale values only, matching the skills' type, spacing and radius scales.
- Use `metadata` in `src/app/layout.tsx` / `page.tsx` for title and description, and add FAQ JSON-LD where the page has an FAQ (landing-page-design A7).
