import { ToDo } from "./todo.js";
import { generate_random_id } from "./utils.js";
import delete_icon from "./images/trash.svg"
import menu_icon from "./images/menu-right.svg"
import edit_icon from "./images/pencil.svg"

export class Project {
    #project_name;
    #project_id;
    current;

    #todos = [];

    constructor(name) {
        this.#project_name = name;
        this.#project_id = generate_random_id(name);

        this.todo_button = document.querySelector("#todo-button");
        this.todo_clear = document.querySelector("#todo-clear");
        this.todo_modal = document.querySelector("#todo-modal");
        this.todo_form = document.querySelector("#todo-form");
        this.cancel_todo = document.querySelector("#cancel-todo");
        this.todo_container = document.querySelector("#todo-container");

        this.todo_button.addEventListener("click", () => {this.todo_modal.showModal();});
        this.cancel_todo.addEventListener("click", () => this.close_modal());
        this.todo_form.addEventListener("submit", (e) => { e.preventDefault(); this.add_todo(); });

        this.current = false;
    }

    get_name() { return this.#project_name; }
    get_id() { return this.#project_id; }

    add_todo() {
        if(this.current == true) {
            const name = document.querySelector("#todo-name").value;
            const description = document.querySelector("#description").value;
            const due_date = document.querySelector("#due-date").value;
            const priority = document.querySelector("#priority").value;

            const my_todo = new ToDo(name, description, due_date, priority)
            this.#todos.push(my_todo);
            this.update_todos();
            this.close_modal();
        }   
    }

    update_todos() {
        if(this.current == true) {
            console.log(`${this.#project_id} updating todos: ${this.current}`);

            while (this.todo_container.firstChild) {
                this.todo_container.removeChild(this.todo_container.firstChild);
            }

            this.#todos.forEach((val) => {
                const todo = this.create_todo(val);
                this.todo_container.appendChild(todo);
            });
        } else {
            console.log("false");
        }
    }

    create_todo(todo) {
        // Outer content
        const todo_div = document.createElement("div");
        todo_div.classList.add("todo");
        todo_div.classList.add(todo.get_priority());

        const menu_button = document.createElement("img");
        menu_button.classList.add("menu");
        menu_button.classList.add("clickable");
        menu_button.src = menu_icon;

        const edit_button = document.createElement("img");
        edit_button.classList.add("edit");
        edit_button.classList.add("clickable");
        edit_button.src = edit_icon;


        todo_div.appendChild(menu_button);
        todo_div.appendChild(edit_button);

        menu_button.addEventListener('click', () => {
            menu_button.classList.toggle('open');
            todo.toggle_open();
            console.log(`${todo.get_id()} open: ${todo.open}`);
        });

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "todo-complete";
        todo_div.appendChild(checkbox);

        checkbox.addEventListener("click", () => {
            todo.toogle_check();
            console.log(`${todo.get_id()} completed: ${todo.completed}`);
        });

        // Inner content
        const todo_content = document.createElement("div");
        todo_content.className = "todo-content";

        const title = document.createElement("h1");;
        title.textContent = todo.get_name();

        const deleter = document.createElement("img");
        deleter.className = "delete-todo";
        deleter.src = delete_icon;

        deleter.addEventListener("click", () => {
            this.todo_container.removeChild(todo_div);

            const index = this.#todos.findIndex(b => b.get_id() === todo.get_id());
            if (index !== -1) {
                this.#todos[index].current = false;
                this.#todos.splice(index, 1);
            }

            this.update_todos();
        })

        todo_content.appendChild(title);
        todo_content.appendChild(deleter);
        todo_div.appendChild(todo_content);

        return todo_div;
    }

    greet() {
        console.log(`Hello from project: ${this.#project_id}`);
    }

    close_modal() {
        this.todo_modal.close();
        this.todo_form.reset();
    }

    clear_todos() {
        while (this.todo_container.firstChild) {
            this.todo_container.removeChild(this.todo_container.firstChild);
        }
    }
}