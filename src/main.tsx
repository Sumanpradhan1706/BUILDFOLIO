import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const rootElement = document.getElementById("root");

if (rootElement) {
    createRoot(rootElement).render(<App />);
}

const loader = document.getElementById("global-loader");
const loaderStart = performance.now();
const LOADER_MIN_DURATION_MS = 2300;

if (loader) {
    const hideLoader = () => {
        const elapsed = performance.now() - loaderStart;
        const remaining = Math.max(LOADER_MIN_DURATION_MS - elapsed, 0);

        setTimeout(() => {
            loader.classList.add("hidden");
            setTimeout(() => loader.remove(), 800);
        }, remaining);
    };

    if (document.readyState === "complete") {
        hideLoader();
    } else {
        window.addEventListener("load", hideLoader, { once: true });
    }
}
