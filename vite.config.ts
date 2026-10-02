import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react(),
		tailwindcss(),
		svgr(),
		babel({ presets: [reactCompilerPreset()] }),
	],
	resolve: {
		alias: { "@": path.resolve(__dirname, "./src") },
	},
	server: {
		host: "127.0.0.1",
		port: 5173, // or your preferred port
		watch: {
			ignored: ["**/node_modules/**", "**/.git/**"],
		},
	},
});
