/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        void: 'var(--color-void)',
        room: {
          bg: 'var(--color-room-bg)',
          wall: 'var(--color-room-wall)',
          floor: 'var(--color-room-floor)',
          roof: 'var(--color-room-roof)',
        },
        hologram: {
          moderate: 'var(--color-hologram-moderate)',
          dim: 'var(--color-hologram-dim)',
          bright: 'var(--color-hologram-bright)',
        },
        button: {
          border: 'var(--color-button-border)',
          bg: 'var(--color-button-bg)',
          text: 'var(--color-button-text)',
          hover: 'var(--color-button-hover)',
        },
      },
      dropShadow: {
        'glow': '0 0 10px rgba(0, 242, 255, 0.5)',
        'glow-intense': '0 0 20px rgba(0, 242, 255, 0.8)',
      },
      fontFamily: {
        sans: ['Metrophobic', 'sans-serif'],
        display: ['Orbitron', 'sans-serif'],
        tech: ['Oxanium', 'sans-serif'],
      },
    },
  },
  plugins: [],
}