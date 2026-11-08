
async function loadComponent(selector, file) {
    const element = document.querySelector(selector);

    if (!element) {
        console.warn("Element not found:", selector);
        return;
    }

    try {
        const projectRoot = new URL("../../", import.meta.url);

        const componentUrl = new URL(file, projectRoot);

        const response = await fetch(componentUrl);

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        element.innerHTML = await response.text();

        console.log("Component loaded:", componentUrl.href);

    } catch (error) {
        console.error("Loading failed:", error);
    }
}

async function loadLayout() {
    await Promise.all([
        loadComponent("#site-footer", "components/footer.html")
    ]);
}

loadLayout();
