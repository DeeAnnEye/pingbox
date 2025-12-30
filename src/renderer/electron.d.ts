// src/renderer/electron.d.ts
export {} 

declare global {
  interface Window {
    electronAPI: {
      minimize: () => void
      close: () => void
      // add more functions you expose via preload here
    }
  }
}
