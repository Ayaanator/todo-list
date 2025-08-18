import "./styles.css";
import { ThemeToggler } from "./theme_toggler.js";
import { ProjectHandler } from "./project_handler.js";

document.addEventListener("DOMContentLoaded", () => {

    const stored_build = localStorage.getItem("BUILD_ID");

    if (stored_build != __BUILD_ID__) {
        console.log("New build detected, clearing localStorage...");

        const new_build_id = __BUILD_ID__;
        console.log(__BUILD_ID__);
        console.log(stored_build);
        console.log(new_build_id);
            
        localStorage.clear();
        localStorage.setItem("BUILD_ID", new_build_id);
    }

    let loaded = false;

    if(localStorage.getItem("loaded") === "true") {
        loaded = true;
    }

    const title = document.querySelector("#the-title");
    const theme = new ThemeToggler();
    const project_handler = new ProjectHandler();

    title.addEventListener("click", () => {
        console.log(loaded);
        localStorage.setItem("loaded", "false");
    })

    if(loaded == false) {
        project_handler.add_example();
        loaded = true;
    }

    localStorage.setItem("loaded", loaded);
});