import tailwindcss from "@tailwindcss/vite";
import { CodeInspectorPlugin } from "code-inspector-plugin";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";

export default defineConfig({
	css: {
		devSourcemap: true,
	},
	plugins: [
		// 1. CodeInspectorPlugin MUST come first
		CodeInspectorPlugin({
			bundler: "vite",
			editor: "zed",
			hideConsole: true,
			hotKeys: ["ctrlKey"],
			match: /\.[jt]sx$/,
		}),
		react(),
		tailwindcss(),
		svgr(),
	],
	resolve: {
		// 2. Replaced __dirname with import.meta.dirname for Vite 8+
		alias: { "@": path.resolve(import.meta.dirname, "./src") },
	},
	server: {
		host: "127.0.0.1",
		port: 5173,
		watch: {
			ignored: ["**/node_modules/**", "**/.git/**"],
		},
	},
});
