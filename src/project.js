import { ToDo } from "./todo.js";
import { generate_random_id } from "./utils.js";

export class Project {
    #project_name;
    #project_id;

    #todos = [];

    constructor(name) {
        this.#project_name = name;
        this.#project_id = generate_random_id("project");

        this.todo_button = document.querySelector("#todo-button");
        this.todo_modal = document.querySelector("#todo-modal");
        this.todo_form = document.querySelector("#todo-form");
        this.cancel_todo = document.querySelector("#cancel-todo");
        this.todo_container = document.querySelector("#todo-container");

        this.todo_button.addEventListener("click", () => {this.todo_modal.showModal();});
        this.cancel_todo.addEventListener("click", () => this.close_modal());
        this.todo_form.addEventListener("submit", (e) => { e.preventDefault(); this.add_todo(); });
    }

    get_name() { return this.#project_name; }
    get_id() { return this.#project_id; }

    add_todo() {
        const name = document.querySelector("#todo-name").value;
        const description = document.querySelector("#description").value;
        const due_date = document.querySelector("#due-date").value;
        const priority = document.querySelector("#priority").value;

        const my_todo = new ToDo(name, description, due_date, priority)
        this.#todos.push(my_todo);

        this.close_modal();
    }

    greet() {
        console.log(`Hello from project: ${this.#project_id}`);
    }

    close_modal() {
        this.todo_modal.close();
        this.todo_form.reset();
    }

}