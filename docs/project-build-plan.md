# Project Build Plan: The Retro Desktop Portfolio

This document outlines the development tasks required to build the "Retro Desktop Portfolio" website. The project is broken down into sequential phases and tasks.

---

## Phase 1: Project Setup & Foundation

Goal: Initialize the project with the correct tools and libraries.

### Task 1.1: Initialize Next.js Project with Bun

_Complete as of 2025-08-10_

Purpose: Create the basic Next.js application structure and configure Bun.

Subtasks:

- [x] Initialize a new Next.js project using `bun create next-app@latest`.
- [x] Verify the development server starts with `bun dev`.
- [x] Configure `package.json` scripts to use Bun.
- [x] Set up ESLint and Prettier.

Definition of Done:

- [x] Project runs locally with `bun dev`.
- [x] Code compiles without errors (`bun run build`).
- [x] No linting errors (`bun run lint`).

### Task 1.2: Integrate Core Styling and UI Libraries

Purpose: Install and configure visual libraries.

Subtasks:

- [ ] Install `tailwindcss` and configure it.
- [ ] Install `react95` and `styled-components`.
- [ ] Create a global layout with `ThemeProvider` and global styles.
- [ ] Set default teal background (Windows 95 style) via Tailwind.

Definition of Done:

- [ ] Blank page renders with react95 theme (font, colors).
- [ ] Tailwind utilities function.
- [ ] No build or lint errors.

---

## Phase 2: Core Desktop Environment

Goal: Build static desktop UI (taskbar, icons).

### Task 2.1: Build the Static Taskbar

Purpose: Create the main taskbar component.

Subtasks:

- [ ] Create `Taskbar` component.
- [ ] Use `AppBar`, `Button`, `Toolbar`.
- [ ] Add static "Start" button (left).
- [ ] Add static clock (right) showing current time.
- [ ] Fix position at bottom via Tailwind.

Definition of Done:

- [ ] Taskbar visible bottom on all screen sizes.
- [ ] Start button and clock styled with react95.
- [ ] No build or lint errors.

### Task 2.2: Implement the Start Menu

Purpose: Functional Start Menu toggle.

Subtasks:

- [ ] Create `StartMenu` component.
- [ ] Use `List` and `ListItem` for items: Projects, About Me, Terminal.
- [ ] Toggle visibility with `useState`.
- [ ] Clicking outside closes menu.

Definition of Done:

- [ ] Menu opens/closes correctly.
- [ ] Icons/text styled retro.
- [ ] No build or lint errors.

### Task 2.3: Create Desktop Icons

Purpose: Display launchable desktop icons.

Subtasks:

- [ ] Create `DesktopIcon` (props: icon, label).
- [ ] Create `Desktop` container (Flex/Grid).
- [ ] Add placeholders: `C:\\Projects`, `About_Me.txt`, `Terminal.exe`.

Definition of Done:

- [ ] Icons in grid with labels.
- [ ] No build or lint errors.

---

## Phase 3: Windowing System & State Management

Goal: Functional multi-window system.

### Task 3.1: Set Up Client State Management with Zustand

Purpose: Centralize window state.

Subtasks:

- [ ] Install `zustand`.
- [ ] Create `windowStore` (id, title, position, size, isMinimized).
- [ ] Actions: `openWindow`, `closeWindow`, `minimizeWindow`, etc.

Definition of Done:

- [ ] Store accessible app-wide.
- [ ] Actions mutate state correctly.
- [ ] No build or lint errors.

### Task 3.2: Implement a Single Draggable & Resizable Window

Purpose: Base window component.

Subtasks:

- [ ] Install `react-rnd`.
- [ ] Create `AppWindow`.
- [ ] Wrap react95 `Window` with `Rnd`.
- [ ] Sync position/size with store on drag/resize.
- [ ] Close button calls `closeWindow`.

Definition of Done:

- [ ] Window opens via desktop icon action.
- [ ] Draggable & resizable within desktop.
- [ ] Close removes from UI/store.
- [ ] No build or lint errors.

### Task 3.3: Manage Multiple Windows & Stacking (z-index)

Purpose: Multi-window management & focus order.

Subtasks:

- [ ] Render list of `AppWindow`s from store in `Desktop`.
- [ ] Add `bringToFront` action.
- [ ] `onClick` in window invokes `bringToFront`.
- [ ] Taskbar shows a button per open window.

Definition of Done:

- [ ] Multiple windows coexist.
- [ ] Click brings window to front.
- [ ] Taskbar reflects open windows.
- [ ] No build or lint errors.

---

## Phase 4: Application Development

Goal: Build core application content.

### Task 4.1: Build the "About Me" Application

Purpose: Text-file style bio.

Subtasks:

- [ ] Create `AboutMe` component.
- [ ] Use `WindowContent` + `Frame`.
- [ ] Add bio text.
- [ ] Wire to desktop icon and Start Menu.

Definition of Done:

- [ ] Window opens correctly.
- [ ] Retro styling applied.
- [ ] No build or lint errors.

### Task 4.2: Build the "Projects" Application

Purpose: File-explorer view of projects.

Subtasks:

- [ ] Create `Projects` component.
- [ ] Mock project data array.
- [ ] Display each as folder icon + label.
- [ ] (Future) Clicking opens details window.

Definition of Done:

- [ ] Projects window opens with folder list.
- [ ] Layout resembles classic explorer.
- [ ] No build or lint errors.

---

## Phase 5: Backend Integration & Deployment

Goal: Use real-time backend and deploy.

### Task 5.1: Set Up Convex Backend

Purpose: Initialize Convex & schema.

Subtasks:

- [ ] Install Convex CLI & run `npx convex dev`.
- [ ] Define `projects` table schema (`convex/schema.ts`).
- [ ] Add query in `convex/projects.ts`.
- [ ] Seed database (mutation or dashboard).

Definition of Done:

- [ ] Local Convex running.
- [ ] Schema defined.
- [ ] Project data stored.
- [ ] No build errors.

### Task 5.2: Integrate Convex with the "Projects" App

Purpose: Replace mock data with live query.

Subtasks:

- [ ] Wrap app in `ConvexProvider`.
- [ ] Use `useQuery` in `Projects`.
- [ ] Render live data with loading state.

Definition of Done:

- [ ] Projects load dynamically.
- [ ] Loading state visible.
- [ ] No build or lint errors.

### Task 5.3: Deploy to Vercel

Purpose: Public deployment.

Subtasks:

- [ ] Create Vercel project & link repo.
- [ ] Configure env var `CONVEX_DEPLOYMENT`.
- [ ] Trigger deployment.
- [ ] Test live site.

Definition of Done:

- [ ] Site accessible via Vercel URL.
- [ ] Features function in production.
- [ ] Convex integration works live.
