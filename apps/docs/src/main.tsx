import { createRoot } from "react-dom/client";
import DocsApp from "./docs/app";
import "../../../src/styles/index.css";
import "./showcase.css";
createRoot(document.getElementById("root")!).render(<DocsApp />);
