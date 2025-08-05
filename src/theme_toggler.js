import dark_icon from './images/dark-mode.svg';
import light_icon from './images/light-mode.svg';

export class ThemeToggler {
    #darkMode = true; 

    constructor() {
        this.button = document.querySelector("#theme-button");
        this.button.addEventListener("click", () => this.toggle_theme());
    }

    toggle_theme() {
        document.documentElement.classList.toggle("light-mode");
        this.#darkMode = !this.#darkMode;
        this.update_icon();
    }

    update_icon() {
        this.button.src = this.#darkMode
            ? dark_icon
            : light_icon;
    }
}