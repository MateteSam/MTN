/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0b1220',
        accent: '#ffd54a',
        'accent-strong': '#ffcc00',
        mtn: {
          yellow: '#ffd54a',
          dark: '#0a0f1a'
        },
        tech: {
          purple: '#7c3aed',
          cyan: '#06b6d4'
        },
        muted: {
          50: '#f8fafc',
          100: '#f1f5f9',
          500: '#64748b'
        }
      },
      boxShadow: {
        btn: '0 10px 30px rgba(2,6,23,0.3)',
        'btn-strong': '0 14px 48px rgba(255,213,74,0.12)',
        glow: '0 20px 60px rgba(124,58,237,0.12)'
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem'
      },
      spacing: {
        '9': '2.25rem',
        '18': '4.5rem'
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif']
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        glitch: 'glitch 1s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        dash: 'dash 20s linear infinite',
        'dash-fast': 'dash 10s linear infinite'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' }
        },
        glitch: {
          '2%, 64%': { transform: 'translate(2px,0) skew(0deg)' },
          '4%, 60%': { transform: 'translate(-2px,0) skew(0deg)' },
          '62%': { transform: 'translate(0,0) skew(5deg)' }
        },
        dash: {
          to: { strokeDashoffset: '-1000' }
        }
      }
    }
  },
  plugins: []
};
