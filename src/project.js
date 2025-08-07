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
    }

    get_name() {
        return this.#project_name;
    }

    get_id() {
        return this.#project_id;
    }
}