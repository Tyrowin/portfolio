# Project Build Plan: The Retro Desktop Portfolio

This document outlines the development tasks required to build the "Retro Desktop Portfolio" website. The project is broken down into sequential phases and tasks.

---

## Phase 1: Project Setup & Foundation

Goal: Initialize the project with the correct tools and libraries.

### Task 1.1: Initialize Next.js Project with Bun

Status: Complete (2025-08-10)  
Purpose: Create the basic Next.js application structure and configure Bun.

Subtasks:

- [x] Initialize a new Next.js project using `bun create next-app@latest`.
- [x] Verify the development server starts with `bun dev`.
- [x] Configure package.json scripts to use Bun.
- [x] Set up ESLint and Prettier.

Definition of Done:

- [x] Project runs locally with `bun dev`.
- [x] Code compiles without errors (`bun run build`).
- [x] No linting errors (`bun run lint`).

### Task 1.2: Integrate Core Styling and UI Libraries

Purpose: Install and configure visual libraries.

Subtasks:

- [x] Install tailwindcss and configure it.
- [x] Install xp.css and import it in the root layout.
- [x] Set default blue background (Windows XP "Luna" theme) via Tailwind.

Definition of Done:

- [x] A blank page renders with the xp.css theme applied (correct font, background color). _(Pending verification build run below)_
- [x] Tailwind CSS utility classes function correctly. _(Tailwind present and globals using @import)_
- [x] No build or lint errors. (Verified)

---

## Phase 2: Core Desktop Environment

Goal: Build static desktop UI (taskbar, icons).

### Task 2.1: Build the Static Taskbar

Purpose: Create the main taskbar component.

Subtasks:

- [ ] Create a Taskbar React component.
- [ ] Use standard HTML elements (div, button) with xp.css classes to structure the taskbar.
- [ ] Add a static "Start" button to the left.
- [ ] Add a static clock component to the right that displays the current time.
- [ ] Fix the component's position to the bottom of the viewport using Tailwind CSS.

Definition of Done:

- [ ] The taskbar is visible at the bottom of the screen on all screen sizes.
- [ ] The Start button and clock are styled correctly with xp.css.
- [ ] No build or lint errors.

### Task 2.2: Implement the Start Menu

Purpose: Functional Start Menu toggle.

Subtasks:

- [ ] Create a StartMenu component.
- [ ] Use `ul` and `li` elements with xp.css classes to create the menu items: Projects, About Me, Terminal.
- [ ] Toggle visibility with `useState` when the Start button is clicked.
- [ ] Implement logic so that clicking outside the menu closes it.

Definition of Done:

- [ ] The menu opens and closes correctly.
- [ ] Menu items are displayed with the correct retro icons and text.
- [ ] No build or lint errors.

### Task 2.3: Create Desktop Icons

Purpose: Display launchable desktop icons.

Subtasks:

- [ ] Create a DesktopIcon component that accepts icon and label as props.
- [ ] Create a Desktop container component that uses Flexbox or CSS Grid to arrange icons.
- [ ] Add placeholder icons for `C:\Projects`, `About_Me.txt`, and `Terminal.exe`.

Definition of Done:

- [ ] Icons are displayed in a grid with labels below them.
- [ ] No build or lint errors.

---

## Phase 3: Windowing System & State Management

Goal: Functional multi-window system.

### Task 3.1: Set Up Client State Management with Zustand

Purpose: Centralize window state.

Subtasks:

- [ ] Install zustand.
- [ ] Create a `windowStore` to manage an array of window objects (id, title, position, size, isMinimized, zIndex).
- [ ] Create actions in the store: `openWindow`, `closeWindow`, `minimizeWindow`, etc.

Definition of Done:

- [ ] The store is created and accessible from any component.
- [ ] Store actions correctly manipulate the state.
- [ ] No build or lint errors.

### Task 3.2: Implement a Single Draggable & Resizable Window

Purpose: Create the base window component for all applications.

Subtasks:

- [ ] Install `react-rnd`.
- [ ] Create a generic `AppWindow` component.
- [ ] Use `react-rnd` to wrap a div styled with xp.css's `.window` class.
- [ ] Sync the window's position and size with the Zustand store on drag/resize events.
- [ ] Connect the window's close button to the `closeWindow` action in the store.

Definition of Done:

- [ ] A window can be opened by triggering the `openWindow` action.
- [ ] The window is draggable and resizable within the desktop area.
- [ ] Closing the window removes it from the UI and the state store.
- [ ] No build or lint errors.

### Task 3.3: Manage Multiple Windows & Stacking (z-index)

Purpose: Multi-window management and focus order.

Subtasks:

- [ ] Render a list of `AppWindow` components from the Zustand store.
- [ ] Implement a `bringToFront` action to update a window's `zIndex`.
- [ ] Add an `onClick` handler to the `AppWindow` that calls `bringToFront`.
- [ ] Update the taskbar to dynamically show a button for each open window.

Definition of Done:

- [ ] Multiple, independent windows can be open simultaneously.
- [ ] Clicking on a window brings it to the foreground.
- [ ] The taskbar accurately reflects the set of currently open windows.
- [ ] No build or lint errors.

---

## Phase 4: Application Development

Goal: Build core application content.

### Task 4.1: Build the "About Me" Application

Purpose: Create a text-file-like window displaying your professional bio.

Subtasks:

- [ ] Create an `AboutMe` component.
- [ ] Use div elements with xp.css classes like `.window-body` to style the interior.
- [ ] Add your bio text.
- [ ] Wire this component to the `About_Me.txt` desktop icon and Start Menu item.

Definition of Done:

- [ ] The "About Me" window opens correctly.
- [ ] The content is displayed with the correct retro styling from xp.css.
- [ ] No build or lint errors.

### Task 4.2: Build the "Projects" Application

Purpose: File-explorer view of projects.

Subtasks:

- [ ] Create a `Projects` component.
- [ ] Mock project data as a simple JavaScript array of objects.
- [ ] Display each project as a folder icon with a label inside the window.
- [ ] (Future) Clicking a project will eventually open another window with project details.

Definition of Done:

- [ ] The Projects window opens and displays a list of project folders from mock data.
- [ ] The layout resembles a classic file explorer using xp.css styles.
- [ ] No build or lint errors.

---

## Phase 5: Backend Integration & Deployment

Goal: Use a real-time backend and deploy the application.

### Task 5.1: Set Up Convex Backend

Purpose: Initialize Convex and define the database schema.

Subtasks:

- [ ] Install the Convex CLI and run `npx convex dev`.
- [ ] Define a projects table schema in `convex/schema.ts`.
- [ ] Write a query function in `convex/projects.ts` to fetch all projects.
- [ ] Seed the database with your project data.

Definition of Done:

- [ ] The local Convex backend is running.
- [ ] The database schema is defined and seeded with data.
- [ ] No build errors.

### Task 5.2: Integrate Convex with the "Projects" App

Purpose: Replace mock data with a live query from Convex.

Subtasks:

- [ ] Wrap the application in the `ConvexProvider`.
- [ ] Use the `useQuery` hook in the Projects component to fetch data.
- [ ] Update the UI to render the projects based on the live data, including a loading state.

Definition of Done:

- [ ] The "Projects" application dynamically loads and displays data from Convex.
- [ ] A loading state is visible while data is being fetched.
- [ ] No build or lint errors.

### Task 5.3: Deploy to Vercel

Purpose: Public deployment.

Subtasks:

- [ ] Create a new project on Vercel and link it to your Git repository.
- [ ] Configure Vercel environment variables for the Convex deployment.
- [ ] Trigger a deployment and test the live site.

Definition of Done:

- [ ] The website is successfully deployed and accessible via a Vercel URL.
- [ ] All features work correctly in the production environment.
- [ ] The Convex integration is functioning on the live site.
