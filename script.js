let dark_mode = true

const theme_button = document.querySelector("#theme");

theme_button.addEventListener("click", () => {
    document.documentElement.classList.toggle("light-mode"); // <-- Toggle theme

    dark_mode = !dark_mode;

    theme_button.src = dark_mode
        ? "images/dark-mode.svg"
        : "images/light-mode.svg";
});