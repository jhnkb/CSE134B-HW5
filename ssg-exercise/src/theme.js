const themeButton = document.querySelector("#theme-toggle");

let currentTheme = "light";

try {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
        currentTheme = "dark";
    }
} catch (error) {
    console.log("Unable to read theme preference.");
}

document.documentElement.dataset.theme = currentTheme;

function updateThemeButton() {
    if (currentTheme === "dark") {
        themeButton.textContent = "☀ Light mode";
    } else {
        themeButton.textContent = "☾ Dark mode";
    }
}

if (themeButton) {
    updateThemeButton();
    themeButton.hidden = false;

    themeButton.addEventListener("click", function () {
        let newTheme;

        if (currentTheme === "dark") {
            newTheme = "light";
        } else {
            newTheme = "dark";
        }

        function applyTheme() {
            currentTheme = newTheme;
            document.documentElement.dataset.theme = currentTheme;
            updateThemeButton();
        }

        const reducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        if (document.startViewTransition && !reducedMotion) {
            document.startViewTransition(applyTheme);
        } else {
            applyTheme();
        }

        try {
            localStorage.setItem("theme", newTheme);
        } catch (error) {
            console.log("Unable to save theme preference.");
        }
    });
}
