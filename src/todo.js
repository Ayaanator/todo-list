import { generate_random_id } from "./utils.js";
import { style_priority_select } from "./utils.js";

import { Project } from "./project";
export class ToDo {
    #todo_id;
    #project;

    #todo_name;
    #todo_description;
    #todo_due_date;
    #todo_priority;
    editing;
    completed;
    open;

    constructor(name, description, due_date, priority, is_completed, is_open) {
        this.#todo_name = name;
        this.#todo_description = description;
        this.#todo_due_date = due_date;
        this.#todo_priority = priority;
        this.completed = is_completed;
        this.open = is_open;

        this.#todo_id = generate_random_id("todo");
        this.completed = is_completed;
        this.open = is_open;
        this.editing = false;

        this.edit_modal = document.querySelector("#edit-modal");
        this.edit_form = document.querySelector("#edit-form");
        this.cancel_edit = document.querySelector("#cancel-edit");

        this.cancel_edit.addEventListener("click", () => this.close_modal());
        this.edit_form.addEventListener("submit", (e) => { e.preventDefault(); this.update_self(); });
    }

    get_id() { return this.#todo_id; }
    get_name() { return this.#todo_name; }
    get_description() { return this.#todo_description; }
    get_due_date() { return this.#todo_due_date; }
    get_priority() { return this.#todo_priority; }

    set_name(name) { this.#todo_name = name; }
    set_description(description) { this.#todo_description = description; }
    set_due_date(due_date) { this.#todo_due_date = due_date; }
    set_priority(priority) { this.#todo_priority = priority; }

    toggle_open() { this.open = !this.open; }
    toogle_check() { this.completed = !this.completed; }
    link_project(proj) { this.#project = proj; }

    update_self() {
        if(!this.editing) {
            return;
        }

        const name = document.querySelector("#edit-name").value;
        const description = document.querySelector("#edit-description").value;
        const due_date = document.querySelector("#edit-due-date").value;
        const priority = document.querySelector("#edit-priority").value;

        this.#todo_name = name;
        this.#todo_description = description;
        this.#todo_due_date = due_date;
        this.#todo_priority = priority;

        this.#project.update_todos();
        this.close_modal();
        this.editing = false;
    }

    show_modal() {
        this.edit_modal.showModal();
        
        const name = document.querySelector("#edit-name");
        const description = document.querySelector("#edit-description");
        const due_date = document.querySelector("#edit-due-date");
        const priority = document.querySelector("#edit-priority");

        name.value = this.#todo_name;
        description.value = this.#todo_description;
        due_date.value = this.#todo_due_date;
        priority.value = this.#todo_priority;

        style_priority_select(document.getElementById("edit-priority"));
    }

    close_modal() {
        this.edit_modal.close();
        this.edit_form.reset();
        this.editing = false;
        this.#project.set_false();
    }

    toJSON() {
        return {
            id: this.get_id(),
            name: this.get_name(),
            description: this.get_description(),
            due_date: this.get_due_date(),
            priority: this.get_priority(),
            completed: this.completed,
            open: this.open
        };
    }
}