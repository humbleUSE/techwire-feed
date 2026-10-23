import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "../app.tsx";
import { ThemeProvider } from "../context-providers/theme-provider.tsx";

createRoot(document.getElementById("root") as HTMLElement).render(
	<StrictMode>
		<ThemeProvider>
			<App />
		</ThemeProvider>
	</StrictMode>,
);
