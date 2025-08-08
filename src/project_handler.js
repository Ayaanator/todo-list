import { Project } from "./project";

import files_icon from './images/files.svg';
import delete_icon from "./images/trash.svg"

export class ProjectHandler {
    #projects = [];

    constructor() {
        this.button = document.querySelector("#project-button");
        this.project_modal = document.querySelector("#project-modal");
        this.project_form = document.querySelector("#project-form");
        this.cancel_button = document.querySelector("#cancel-button");
        this.project_container = document.querySelector("#projects");

        this.button.addEventListener("click", () => {this.project_modal.showModal();});
        this.cancel_button.addEventListener("click", () => this.close_modal());
        this.project_form.addEventListener("submit", (e) => { this.add_project(); e.preventDefault(); });
    }

    add_project() {
        const project_name = document.getElementById("name").value;
        this.#projects.push(new Project(project_name));
        this.update_projects();
        this.close_modal();
    }

    update_projects() {
        while (this.project_container.firstChild) {
            this.project_container.removeChild(this.project_container.firstChild);
        }

        this.#projects.forEach((val) => {
            const project = this.create_project(val);
            this.project_container.appendChild(project);
        });
    }

    create_project(project) {
        const project_div = document.createElement("div");
        const project_text = document.createElement("p");
        const files_img = document.createElement("img");
        
        project_div.className = "project";
        files_img.src = files_icon;
        files_img.className = "delete-project";
        project_text.textContent = project.get_name();
        project_text.className = "project-clickable";

        project_text.addEventListener("click", () => {
            project.greet();
        })

        files_img.addEventListener('mouseenter', () => {
            files_img.src = delete_icon;
        });

        files_img.addEventListener('mouseleave', () => {
            files_img.src = files_icon;
        });

        files_img.addEventListener("click", () => {
            this.project_container.removeChild(project_div);

            const index = this.#projects.findIndex(b => b.get_id() === project.get_id());
            if (index !== -1) {
                this.#projects.splice(index, 1);
            }
        })

        project_div.appendChild(files_img);
        project_div.appendChild(project_text);

        return project_div;
    }
    
    close_modal() {
        this.project_modal.close();
        this.project_form.reset();
    }
}