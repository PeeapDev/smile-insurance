import '@testing-library/jest-dom'

// jsdom does not implement canvas; provide a minimal mock so components using
// HTMLCanvasElement.getContext do not throw in tests.
Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
  value: () => ({
    // no-op stub methods used in our code paths
    clearRect: () => {},
    fillRect: () => {},
    beginPath: () => {},
    arc: () => {},
    fill: () => {},
  }),
})
