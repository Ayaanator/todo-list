import "./styles.css";
import { ThemeToggler } from "./theme_toggler.js";
import { ProjectHandler } from "./project_handler.js";

document.addEventListener("DOMContentLoaded", () => {

    let loaded = false;

    if(localStorage.getItem("loaded") === "true") {
        loaded = true;
    }

    const title = document.querySelector("#the-title");
    const theme = new ThemeToggler();
    const project_handler = new ProjectHandler();

    if(!loaded) {
        project_handler.add_example();
        loaded = true;
    }

    title.addEventListener("click", () => {
        console.log(loaded);
        localStorage.setItem("loaded", "false");
    })

    localStorage.setItem("loaded", loaded);
});