export function generate_random_id(prefix = "id") {
  return prefix + "_" + Math.random().toString(36).substr(2, 9);
}

export const style_priority_select = (select) => {
    const update_color = () => {
        let color = "";
        switch (select.value) {
            case "low-priority":
                color = "var(--low-priority)";
                break;
            case 'medium-priority':
                color = "var(--medium-priority)";
                break;
            case "high-priority":
                color = "var(--high-priority)";
                break;
            default:
                color = "";
        }

        select.style.backgroundColor = color;
        select.style.color = color ? "white" : "";
    };

    // Update immediately based on current value
    update_color();

    // Update when user changes the selection
    select.addEventListener("change", update_color);
};