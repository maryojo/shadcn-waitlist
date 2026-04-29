# Implementation Plan - Shadcn Registry Library (Waitlist)

## Project Overview
Setting up a shadcn/ui compatible registry library for waitlist-related components. This will allow users to add components via `npx shadcn@latest add [url]/[component]`.

## Architecture
1. **Framework**: Next.js 14+ (App Router, TypeScript, Tailwind CSS).
2. **Registry Structure**:
   - `registry/`: Source code for components, hooks, and libs.
   - `public/r/`: Generated JSON files for the shadcn CLI.
   - `registry.json`: Main index of available items.
3. **Build System**: A custom script to sync `registry/` to `public/r/`.

## Tasks
1. [x] Initialize Next.js project.
2. [x] Configure shadcn/ui (base components).
3. [x] Set up registry folder structure.
4. [x] Create a `build-registry` script.
5. [x] Enhance initial Waitlist components with premium aesthetics:
   - `waitlist-form`: Add glassmorphism, animations, and gradients.
   - `waitlist-dialog`: Improve layout and transitions.
6. [x] Set up a stunning documentation/preview site.
7. [x] Add "Copy to Clipboard" for installation commands.

## Next Steps
- Initialize the Next.js app.
- Define the `registry.json` schema.
