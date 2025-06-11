# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `deno task dev` - Start development server with HMR
- `deno task build` - Build for production (runs TypeScript compiler then Vite build)
- `deno task lint` - Run ESLint on the codebase
- `deno task preview` - Preview production build locally

### Linting and Type Checking
After making changes, always run:
- `deno task lint` - Check for linting errors
- `tsc -b` - Type check (part of build process)

## Architecture

This is a React + TypeScript + Vite application built with **Deno** for creating "inkan" (Japanese personal seals/stamps).

### Tech Stack
- **Deno** as the runtime and package manager
- **React 19** with TypeScript
- **Vite** for build tooling and development server
- **ESLint** with TypeScript, React Hooks, and React Refresh plugins
- Tasks defined in package.json and executed via Deno

### Project Structure
- `src/App.tsx` - Main application component
- `src/main.tsx` - Application entry point with React StrictMode
- `src/assets/` - Static assets (images, etc.)
- `public/` - Public static files served directly
- TypeScript configuration uses project references (`tsconfig.json` � `tsconfig.app.json` + `tsconfig.node.json`)

### Key Configuration
- Vite uses `@vitejs/plugin-react` for Fast Refresh
- ESLint configured for browser globals with React Hooks rules
- TypeScript strict mode enabled with separate configs for app and build tooling