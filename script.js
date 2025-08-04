const { createElement } = require("react");

class ThemeToggler {
    #darkMode = true; 

    constructor() {
        this.button = document.querySelector("#theme-button");
        this.button.addEventListener("click", () => this.toggle_theme());
    }

    toggle_theme() {
        document.documentElement.classList.toggle("light-mode");
        this.#darkMode = !this.#darkMode;
        this.update_icon();
    }

    update_icon() {
        this.button.src = this.#darkMode
            ? "images/dark-mode.svg"
            : "images/light-mode.svg";
    }
}

class ProjectHandler {
    #projects = [];

    constructor() {
        this.button = document.querySelector("#project-button");
        this.project_modal = document.querySelector("#project-modal");
        this.project_form = document.querySelector("#project-form");
        this.cancel_button = document.querySelector("#cancel-button");
        this.project_container = document.querySelector("#projects");

        this.button.addEventListener("click", () => {this.project_modal.showModal();});
        this.cancel_button.addEventListener("click", () => this.close_modal());
        this.project_form.addEventListener("submit", () => this.add_project())
    }

    add_project() {
        const project_name = document.getElementById("name").value;
        this.#projects.push(new Project(project_name));
    }

    update_projects() {
        this.#projects.forEach((val) => {
            const project = this.create_project(val);
        });
    }

    create_project(name) {
        const div = document.createElement("div");
    }
    
     close_modal() {
        this.project_modal.close();
        this.project_modal.reset();
    }
}

class Project {
    #project_name;

    constructor(name) {
        this.#project_name = name;
    }
}

class ToDo {

}

const theme = new ThemeToggler();
const project_handler = new ProjectHandler();