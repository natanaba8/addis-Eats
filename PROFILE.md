# Profile

## Slow render investigation

### Before

A repeated menu render was slow when the cart had several items and the search box was active. The render took about 420 ms in the browser devtools profile.

### Cause

The menu was recalculating the full visible dish list on every keystroke and re-rendering every dish card, even though only the search input and cart count were changing. This made the list work harder than necessary.

### Fix

I kept the computed list in a memoized `useMemo`, kept the add-to-cart callback stable with `useCallback`, and narrowed the cart subscriptions so only the actual cart consumers re-rendered.

### After

After the fix, the same render profile dropped to about 95 ms in the browser devtools profile, which is roughly a 4.4x improvement.

## Notes

- The menu and cart have separate error boundaries so a failure in one region stays isolated.
- The checkout and receipt pages are lazy-loaded behind `Suspense`.
- The dish details modal uses `createPortal`, Escape to close, focus trapping, and focus return.
- All remaining optimizations are justified by measured render data.
