document.addEventListener('DOMContentLoaded', function() {
    const selects = document.querySelectorAll('._select');

    selects.forEach(input => {
        const wrapper = input.closest('.form-top__label-wrapper');
        if (!wrapper) return;

        const dropdown = wrapper.querySelector('.custom-select');
        if (!dropdown) return;

        if (getComputedStyle(wrapper).position === 'static') {
            wrapper.style.position = 'relative';
        }

        let justSelected = false;

        function hideDropdown() {
            dropdown.classList.add('custom-select--hidden');
        }

        function showDropdown() {
            if (justSelected) return;
            // Закрыть все другие
            document.querySelectorAll('.custom-select').forEach(sel => {
                if (sel !== dropdown) sel.classList.add('custom-select--hidden');
            });
            dropdown.classList.remove('custom-select--hidden');
        }

        // Используем mousedown – он срабатывает раньше, чем click, и до потери фокуса
        dropdown.addEventListener('mousedown', (e) => {
            const option = e.target.closest('.custom-select__option');
            if (option) {
                e.preventDefault();          // предотвращаем временную потерю фокуса
                input.value = option.textContent;
                justSelected = true;
                hideDropdown();
                input.blur();                // убираем фокус с инпута
                setTimeout(() => {
                    justSelected = false;
                }, 200);
            }
        });

        // Открытие/закрытие по клику на инпут
        input.addEventListener('click', (e) => {
            e.stopPropagation();
            if (justSelected) return;
            if (dropdown.classList.contains('custom-select--hidden')) {
                showDropdown();
            } else {
                hideDropdown();
            }
        });

        // Закрыть при клике вне
        document.addEventListener('click', (e) => {
            if (!wrapper.contains(e.target)) {
                hideDropdown();
                justSelected = false;
            }
        });

        // Не закрываем при клике внутри dropdown
        dropdown.addEventListener('click', (e) => e.stopPropagation());
    });
});