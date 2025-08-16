import { ProjectHandler } from "./project_handler.js";
import { ToDo } from "./todo.js";
import { generate_random_id } from "./utils.js";
import delete_icon from "./images/trash.svg"
import menu_icon from "./images/menu-right.svg"
import edit_icon from "./images/pencil.svg"

export class Project {
    #project_name;
    #handler;
    #project_id;
    current;

    #todos = [];

    constructor(name, id, is_current) {
        this.#project_name = name;
        this.#project_id = id;

        this.todo_button = document.querySelector("#todo-button");
        this.todo_clear = document.querySelector("#todo-clear");
        this.todo_modal = document.querySelector("#todo-modal");
        this.todo_form = document.querySelector("#todo-form");
        this.cancel_todo = document.querySelector("#cancel-todo");
        this.todo_container = document.querySelector("#todo-container");

        this.todo_button.addEventListener("click", () => {this.todo_modal.showModal();});
        this.cancel_todo.addEventListener("click", () => this.close_modal());
        this.todo_form.addEventListener("submit", (e) => { 
            const name = document.querySelector("#todo-name").value;
            const description = document.querySelector("#description").value;
            const due_date = document.querySelector("#due-date").value;
            const priority = document.querySelector("#priority").value;
            
            this.add_todo(name, description, due_date, priority, false, false);
            e.preventDefault(); 
        });

        this.current = is_current;
    }

    get_name() { return this.#project_name; }
    get_id() { return this.#project_id; }

    add_todo(name, description, due_date, priority, completed, is_open) {
        if(this.current == true) {
            const my_todo = new ToDo(name, description, due_date, priority, completed, is_open);
            this.#todos.push(my_todo);
            this.update_todos();
            this.close_modal();
        }   
    }

    push_todo(name, description, due_date, priority, completed, is_open) {
        const my_todo = new ToDo(name, description, due_date, priority, completed, is_open);
        this.#todos.push(my_todo);
        console.log(`Hello from project: ${this.#project_id} PUSHING P`);
    }

    update_todos() {
        console.log(`updatin todos! ${this.#project_id}`);
        this.#handler.save_data();

        if(this.current == true) {

            while (this.todo_container.firstChild) {
                this.todo_container.removeChild(this.todo_container.firstChild);
            }

            this.#todos.forEach((val) => {
                const todo = this.create_todo(val);
                val.link_project(this);
                this.todo_container.appendChild(todo);
            });
        }
    }

    create_todo(todo) {
        const todo_info = document.createElement("div");
        todo_info.className = "todo-info";

        // Outer content
        const todo_div = document.createElement("div");
        todo_div.classList.add("todo");
        todo_div.classList.add(todo.get_priority());

        const todo_content = document.createElement("div");
        todo_content.className = "todo-content";

        const todo_options = document.createElement("div");
        todo_options.className = "todo-options";

        const menu_button = document.createElement("img");
        menu_button.classList.add("menu", "clickable");
        menu_button.src = menu_icon;

        menu_button.addEventListener("click", () => {
            menu_button.classList.toggle("open");
            todo.toggle_open();
            todo_info.classList.toggle("show");
            this.#handler.save_data();
        });

        if(todo.open) {
            menu_button.classList.toggle("open");
            todo_info.classList.toggle("show");
        }

        const edit_button = document.createElement("img");
        edit_button.classList.add("edit", "clickable");
        edit_button.src = edit_icon;

        
        edit_button.addEventListener("click", () => {
            todo.editing = true;
            todo.show_modal();
            this.#handler.save_data();
        });

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.classList.add("todo-complete", "clickable");
        checkbox.addEventListener("click", () => {
            todo.toogle_check();
            this.#handler.save_data();
        });

        checkbox.checked = todo.completed;

        const title = document.createElement("h1");;
        title.textContent = todo.get_name();

        todo_options.appendChild(menu_button);
        todo_options.appendChild(edit_button);
        todo_options.appendChild(checkbox);
        todo_options.appendChild(title);

        const deleter = document.createElement("img");
        deleter.classList.add("delete-todo", "clickable");
        deleter.src = delete_icon;

        deleter.addEventListener("click", () => {
            this.todo_container.removeChild(todo_div);

            const index = this.#todos.findIndex(b => b.get_id() === todo.get_id());
            if (index !== -1) {
                this.#todos[index].current = false;
                this.#todos.splice(index, 1);
            }

            this.update_todos();
            this.#handler.save_data();
        })

        todo_content.appendChild(todo_options);
        todo_content.appendChild(deleter);

        const info = document.createElement("h2");
        info.className = "description";
        info.textContent = todo.get_description();

        const date = document.createElement("p");
        date.className = "due-date";

        const label = document.createElement("strong");
        label.textContent = "Due Date:";
        date.appendChild(label);

        if(todo.get_due_date() == "") {
            date.append(" Indefinite"); 
        } else {
            date.append(` ${todo.get_due_date()}`); 
        }

        todo_info.appendChild(info);
        todo_info.appendChild(date);

        todo_div.appendChild(todo_content);
        todo_div.appendChild(todo_info);

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

    set_false() {
        this.#todos.forEach((val) => {
            val.editing = false;
        });
    }

    link_handler(proj_handler) {
        this.#handler = proj_handler;
    }

    toJSON() {
        return {
            id: this.get_id(),
            name: this.get_name(),
            todos: this.#todos.map(todo => todo.toJSON()),
            current: this.current
        };
    }
}