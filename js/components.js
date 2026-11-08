
async function loadComponent(selector, file) {
    const element = document.querySelector(selector);

    if (!element) {
        console.error("Element not found:", selector);
        return;
    }

    try {
        const response = await fetch(file);

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const html = await response.text();
        element.innerHTML = html;

        console.log("Component loaded:", file);

    } catch (error) {
        console.error("Loading failed:", error);
    }
}

loadComponent(
    "#site-footer",
    "./components/footer.html"
);
