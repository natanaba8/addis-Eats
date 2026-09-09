# Addis Eats Menu

Mini React project for browsing dishes and placing an order.

## Cart store vs. session state

The cart is kept in a Zustand store because it represents user intent and should survive route changes and browser refreshes. It is persisted with `zustand/middleware` so the current order is restored after a reload.

The session/auth state is intentionally not persisted. User session information is temporary and should be recreated when the app loads, so it does not leak stale login state across browser restarts.

## Local development

npm install
npm run dev


