import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			'custom-pink': '#EE2A70',
  			'custom-dark': '#881840',
  			'color-1': 'hsl(var(--color-1))',
  			'color-2': 'hsl(var(--color-2))',
  			'color-3': 'hsl(var(--color-3))',
  			'color-4': 'hsl(var(--color-4))',
  			'color-5': 'hsl(var(--color-5))',
			'navKaRangBirangaChoda': 'rgba(0, 0, 0, 0.5)'
  		},
  		backgroundImage: {
  			'gradient-custom': 'linear-gradient(259deg, #EE2A70 27.19%, #881840 96.05%)'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		animation: {
  			rainbow: 'rainbow var(--speed, 2s) infinite linear',
			fadeIn: 'fadeIn var(--speed, 2s) forwards'
  		},
  		keyframes: {
  			rainbow: {
  				'0%': {
  					'background-position': '0%'
  				},
  				'100%': {
  					'background-position': '200%'
  				}
  			},
			fadeIn: {
				'0%': {
					opacity: '0'
				},
				'100%': {
					opacity: '1'
				}
			}
			
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
