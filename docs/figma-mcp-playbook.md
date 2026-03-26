# Figma MCP Playbook

## Goal

Use Figma MCP as the primary source for UI implementation while keeping code production-ready and data-aware.

## Source of Truth Frame

- Canonical frame URL: `https://www.figma.com/community/file/1537201033829349468/senior-software-engineer-portfolio-website`
- Required sections to keep in sync:
  - `Hero`
  - `Technical Skills`
  - `Professional Experience`
  - `Featured Projects`
  - `Let's Work Together`

## MCP-first Flow

1. **Intake**
   - Capture `Figma Frame URL`
   - Record design version/date
   - List target sections/components

2. **Generate draft from MCP**
   - Produce section-level components first
   - Keep content placeholders if data wiring is not ready

3. **Cleanup pass**
   - Align with project structure:
     - `frontend/src/components/section/*`
     - `frontend/src/components/ui/*`
     - `frontend/src/pages/*`
   - Move styles to tokens/utilities where appropriate
   - Remove duplicated inline styles/classes

4. **Data wiring pass**
   - Connect sections to GraphQL/Apollo where needed
   - Ensure list items include stable identifiers (`id`, `slug`)
   - Handle loading/error states

5. **QA pass**
   - Responsive check: mobile/tablet/desktop
   - Accessibility quick check: contrast, focus, labels/alt
   - Visual check against Figma frame
   - Storybook check for changed UI primitives

6. **PR prep**
   - Run `make prepr` (lint + build + smoke + artifact policy)
   - Run `npm --prefix frontend run storybook:build` for UI primitives changes
   - Attach before/after screenshots
   - Fill design checklist in PR template

## Definition of Done (UI task)

- Figma URL and version included in PR
- Components structured per project conventions
- GraphQL wiring complete (queries in `frontend/src/lib/graphql/`)
- `make prepr` passes
- Design sign-off present in PR
