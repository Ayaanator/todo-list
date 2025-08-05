import { ToDo } from "./todo.js";

export class Project {
    #project_name;

    constructor(name) {
        this.#project_name = name;
    }
}