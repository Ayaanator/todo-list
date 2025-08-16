import dark_icon from './images/dark-mode.svg';
import light_icon from './images/light-mode.svg';

export class ThemeToggler {
    #dark_mode = true; 

    constructor() {
        this.button = document.querySelector("#theme-button");
        this.button.addEventListener("click", () => this.toggle_theme());
        this.#dark_mode = localStorage.getItem("dark_mode") === "true";

        if (this.#dark_mode) {
            document.documentElement.classList.remove("light-mode");
        } else {
            document.documentElement.classList.add("light-mode");
        }

        this.update_icon();
    }

    toggle_theme() {
        document.documentElement.classList.toggle("light-mode");
        this.#dark_mode = !this.#dark_mode;
        this.update_icon();

        localStorage.setItem("dark_mode", this.#dark_mode);
    }

    update_icon() {
        this.button.src = this.#dark_mode
            ? dark_icon
            : light_icon;
    }
}