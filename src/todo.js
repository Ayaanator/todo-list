import { generate_random_id } from "./utils.js";
export class ToDo {
    #todo_id;

    #todo_name;
    #todo_description;
    #todo_due_date;
    #todo_priority;
    todo_completed;
    open;

    constructor(name, description, due_date, priority) {
        this.#todo_name = name;
        this.#todo_description = description;
        this.#todo_due_date = due_date;
        this.#todo_priority = priority;

        this.#todo_id = generate_random_id("todo");
        this.todo_completed = false;
    }

    get_id() { return this.#todo_id; }
    get_name() { return this.#todo_name; }
    get_description() { return this.#todo_description; }
    get_due_date() { return this.#todo_due_date; }
    get_priority() { return this.#todo_priority; }

    toggle_open() { this.open = !this.open; }
}