document.addEventListener('DOMContentLoaded', function() {
    const wrappers = document.querySelectorAll('._calendar-label');
    if (!wrappers.length) return;

    // Хранилище всех экземпляров календарей
    const datepickers = [];

    // Функция закрытия всех календарей, кроме указанного (опционально)
    function closeAllDatepickers(exceptPicker = null) {
        datepickers.forEach(picker => {
            if (picker !== exceptPicker) {
                picker.calendarBlock.classList.add('custom-datepicker--hidden');
            }
        });
    }

    function createDatepicker(wrapper) {
        const dateInput = wrapper.querySelector('._input');
        const calendarIcon = wrapper.querySelector('._calendar');
        if (!dateInput || !calendarIcon) return;

        if (getComputedStyle(wrapper).position === 'static') {
            wrapper.style.position = 'relative';
        }

        // Создаём календарь
        const calendarBlock = document.createElement('div');
        calendarBlock.className = 'custom-datepicker custom-datepicker--hidden';
        calendarBlock.innerHTML = `
            <div class="custom-datepicker__header">
                <button class="custom-datepicker__nav custom-datepicker__nav--prev" type="button">
                    <span>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19 12H5" stroke="#3B9254" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M12 19L5 12L12 5" stroke="#3B9254" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </span>
                </button>
                <div class="custom-datepicker__month-year">
                    <span class="custom-datepicker__month">Май</span>
                    <span class="custom-datepicker__year">2026</span>
                </div>
                <button class="custom-datepicker__nav custom-datepicker__nav--next" type="button">
                    <span>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 12H19" stroke="#3B9254" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M12 5L19 12L12 19" stroke="#3B9254" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </span>
                </button>
            </div>
            <div class="custom-datepicker__weekdays">
                <span class="custom-datepicker__weekday">Пн</span>
                <span class="custom-datepicker__weekday">Вт</span>
                <span class="custom-datepicker__weekday">Ср</span>
                <span class="custom-datepicker__weekday">Чт</span>
                <span class="custom-datepicker__weekday">Пт</span>
                <span class="custom-datepicker__weekday">Сб</span>
                <span class="custom-datepicker__weekday">Вс</span>
            </div>
            <div class="custom-datepicker__days"></div>
        `;
        wrapper.appendChild(calendarBlock);

        let currentDate = new Date();
        let selectedDate = null;

        function formatDate(date) {
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            return `${day}.${month}.${year}`;
        }

        function renderCalendar() {
            const year = currentDate.getFullYear();
            const month = currentDate.getMonth();

            const firstDayOfMonth = new Date(year, month, 1);
            let startWeekday = firstDayOfMonth.getDay();
            let startOffset = startWeekday === 0 ? 6 : startWeekday - 1;
            const daysInMonth = new Date(year, month + 1, 0).getDate();
            const daysContainer = calendarBlock.querySelector('.custom-datepicker__days');
            daysContainer.innerHTML = '';

            const today = new Date();
            today.setHours(0, 0, 0, 0);

            for (let i = 0; i < 42; i++) {
                if (i < startOffset || i >= startOffset + daysInMonth) {
                    // пустая ячейка
                    const emptyDiv = document.createElement('div');
                    emptyDiv.className = 'custom-datepicker__day custom-datepicker__day--empty';
                    emptyDiv.textContent = '';
                    daysContainer.appendChild(emptyDiv);
                } else {
                    const dayNumber = i - startOffset + 1;
                    const dateObj = new Date(year, month, dayNumber);
                    const dayDiv = document.createElement('div');
                    dayDiv.className = 'custom-datepicker__day';
                    dayDiv.textContent = dayNumber;

                    const isPast = dateObj < today;
                    if (isPast) {
                        dayDiv.classList.add('custom-datepicker__day--past');
                    } else {
                        dayDiv.addEventListener('click', (function(date) {
                            return function(e) {
                                console.log('Клик по дню:', date);
                                e.stopPropagation();
                                selectDate(date);
                                // Принудительное закрытие (дублируем для верности)
                                console.log('Закрываем календарь из обработчика дня');
                                calendarBlock.classList.add('hidden');
                            };
                        })(dateObj));
                    }

                    if (selectedDate &&
                        selectedDate.getDate() === dateObj.getDate() &&
                        selectedDate.getMonth() === dateObj.getMonth() &&
                        selectedDate.getFullYear() === dateObj.getFullYear()) {
                        dayDiv.classList.add('custom-datepicker__day--selected');
                    }
                    daysContainer.appendChild(dayDiv);
                }
            }

            const monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
                'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
            const monthSpan = calendarBlock.querySelector('.custom-datepicker__month');
            const yearSpan = calendarBlock.querySelector('.custom-datepicker__year');
            if (monthSpan) monthSpan.textContent = monthNames[month];
            if (yearSpan) yearSpan.textContent = year;
        }

        function selectDate(date) {
            console.log('selectDate вызвана, дата:', date);
            selectedDate = date;
            dateInput.value = formatDate(date);
            console.log('До добавления hidden, классы:', calendarBlock.classList);
            calendarBlock.classList.add('hidden');
            console.log('После добавления hidden, классы:', calendarBlock.classList);
        }

        const prevBtn = calendarBlock.querySelector('.custom-datepicker__nav--prev');
        const nextBtn = calendarBlock.querySelector('.custom-datepicker__nav--next');

        if (prevBtn) {
            prevBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                currentDate.setMonth(currentDate.getMonth() - 1);
                renderCalendar();
            });
        }
        if (nextBtn) {
            nextBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                currentDate.setMonth(currentDate.getMonth() + 1);
                renderCalendar();
            });
        }

        // Открытие/закрытие текущего календаря
        calendarIcon.addEventListener('click', function(e) {
            e.stopPropagation();
            const isHidden = calendarBlock.classList.contains('custom-datepicker--hidden');
            // Закрываем все другие календари
            closeAllDatepickers(datepickers.find(p => p.calendarBlock === calendarBlock));
            if (isHidden) {
                calendarBlock.classList.remove('custom-datepicker--hidden');
                calendarBlock.classList.remove('hidden');
                renderCalendar();
            } else {
                calendarBlock.classList.add('custom-datepicker--hidden');
            }
        });

        calendarBlock.addEventListener('click', function(e) {
            e.stopPropagation();
        });

        // Сохраняем экземпляр в глобальный массив
        datepickers.push({
            wrapper,
            calendarBlock,
            dateInput,
            calendarIcon
        });
    }

    // Глобальный обработчик клика (один для всех)
    document.addEventListener('click', function(e) {
        datepickers.forEach(picker => {
            // Если клик не внутри обёртки и не внутри календаря – закрываем
            if (!picker.wrapper.contains(e.target)) {
                picker.calendarBlock.classList.add('custom-datepicker--hidden');
            }
        });
    });

    // Инициализация
    wrappers.forEach(wrapper => createDatepicker(wrapper));
});