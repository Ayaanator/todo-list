import { ToDo } from "./todo.js";

function generate_random_id(prefix = "id") {
  return prefix + "_" + Math.random().toString(36).substr(2, 9);
}

export class Project {
    #project_name;
    #project_id;

    constructor(name) {
        this.#project_name = name;
        this.#project_id = generate_random_id("library");

        this.todo_button = document.querySelector("#todo-button");
        this.todo_modal = document.querySelector("#todo-modal");
        this.todo_form = document.querySelector("#todo-form");
        this.cancel_todo = document.querySelector("#cancel-todo");
        this.todo_container = document.querySelector("#todo-container");

        this.todo_button.addEventListener("click", () => {this.todo_modal.showModal();});
        this.cancel_todo.addEventListener("click", () => this.close_modal());
        this.todo_form.addEventListener("submit", (e) => { this.add_todo(); e.preventDefault(); });
    }

    get_name() {
        return this.#project_name;
    }

    get_id() {
        return this.#project_id;
    }

    add_todo() {
        this.close_modal();
    }

    greet() {
        console.log(`Hello from project: ${this.#project_name}`);
    }

    close_modal() {
        this.todo_modal.close();
        this.todo_form.reset();
    }

}