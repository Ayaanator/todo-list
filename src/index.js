import "./styles.css";
import { ThemeToggler } from "./theme_toggler.js";
import { ProjectHandler } from "./project_handler.js";

document.addEventListener("DOMContentLoaded", () => {
    const theme = new ThemeToggler();
    const project_handler = new ProjectHandler();

    project_handler.add_example();
});