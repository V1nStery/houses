document.addEventListener("DOMContentLoaded", () => {
    const accordionHeaders = document.querySelectorAll(".accordion__header");

    const closeAll = () => {
        document.querySelectorAll(".accordion__content").forEach((content) => {
        content.classList.remove("active");
        });
        document.querySelectorAll(".accordion__header").forEach((header) => {
        header.classList.remove("active");
        });
    };

    accordionHeaders.forEach((header) => {
        header.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = header.dataset.accordion;
        const targetContent = document.querySelector(
            `.accordion__content[data-accordion-content="${targetId}"]`,
        );
        const isAlreadyActive = targetContent.classList.contains("active");

        // Закрываем все
        closeAll();

        // Если кликнутый не был активен — открываем его
        if (!isAlreadyActive) {
            targetContent.classList.add("active");
            header.classList.add("active");
        }
        });
    });

    // Открыть первый элемент по умолчанию
    const firstHeader = document.querySelector(".accordion__header");
    if (firstHeader) {
        firstHeader.click();
    }
});
