document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.tabs__btn');
    const panes = document.querySelectorAll('.tabs__pane');

    function switchTab(tabId) {
        // Скрыть все панели
        panes.forEach(pane => pane.classList.remove('active'));
        // Показать нужную панель
        const activePane = document.querySelector(`.tabs__pane[data-tab="${tabId}"]`);
        if (activePane) activePane.classList.add('active');

        // Обновить активный класс на кнопках
        buttons.forEach(btn => btn.classList.remove('active'));
        const activeButton = document.querySelector(`.tabs__btn[data-tab="${tabId}"]`);
        if (activeButton) activeButton.classList.add('active');
    }

    // Назначаем обработчики на кнопки
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');
            switchTab(tabId);
        });
    });

    // Показать первую вкладку по умолчанию
    if (buttons.length) {
        switchTab(buttons[0].getAttribute('data-tab'));
    }
});