# Turf Booking Management System

This is a code bundle for Turf Booking Management System. The original project is available at https://www.figma.com/design/x4yL9hd5ZrG8c9LuA5wY3L/Turf-Booking-Management-System.

## Local Development

- Install dependencies: `npm i`
- Start dev server: `npm run dev`

## Deployment Readiness

- Node.js: `>=18.18.0`
- NPM: `>=9`
- Run full pre-deploy check: `npm run check`

## Production Run

- Build: `npm run build`
- Start: `npm run start`

## Deploy (Vercel)

1. Push this repository to GitHub.
2. Import the repository in Vercel.
3. Keep defaults:


    - Framework preset: `Next.js`
    - Build command: `npm run build`
    - Install command: `npm i`
    - Output directory: leave empty

4. Deploy.

## Deploy (Node server / VPS / Docker host)

1. Install dependencies: `npm ci`
2. Build app: `npm run build`
3. Start production server: `npm run start`
4. Optionally set port: `PORT=3000`
