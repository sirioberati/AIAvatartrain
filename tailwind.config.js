/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'vision-bg': '#000000',
        'vision-primary': '#FF375F',  // Apple pink/red
        'vision-accent': '#40C8E0',   // Apple blue
        'vision-success': '#30D158',  // Apple green
        'vision-warning': '#FFD60A',  // Apple yellow
        'vision-error': '#FF453A',    // Apple red
        'vision-surface': 'rgba(255, 255, 255, 0.05)',
      },
      fontFamily: {
        sans: ['SF Pro Display', 'system-ui', 'sans-serif'],
      },
      animation: {
        'gradient': 'gradient 8s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
        glow: {
          '0%': {
            'box-shadow': '0 0 20px rgba(64, 200, 224, 0.2)',
          },
          '100%': {
            'box-shadow': '0 0 40px rgba(64, 200, 224, 0.4)',
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
      backdropBlur: {
        'vision': '20px',
      },
    },
  },
  plugins: [],
};