document.addEventListener("DOMContentLoaded", () => {
    const openPopupBtns = document.querySelectorAll(".callback");
    const closePopupBtn = document.querySelector(".callback-popup__close");
    const callbackPopup = document.getElementById("callback-popup");
    const finalForm = document.getElementById("finalForm");
    const phoneInput = document.querySelector(".callback-popup__form-number");
    const connectionRadios = document.querySelectorAll('input[name="connection"]');
    const timeRadios = document.querySelectorAll('input[name="time"]');
    const inTimeText = document.querySelector('.intime');
    const timeInput = document.querySelector('.callback-popup__form-time');
    const connectionError = document.getElementById("connection-error");
    const timeError = document.getElementById("time-error");

    // Функции для работы с попапом
    const openPopup = (e) => {
        if (e) e.preventDefault();
        if (callbackPopup) callbackPopup.classList.add("is-open");
        document.body.style.overflowY = "hidden";
        if (phoneInput) {
            phoneInput.focus();
            phoneInput.value = "";
            phoneInput.classList.remove("is-invalid");
        }
        if (connectionError) connectionError.style.display = "none";
        if (timeError) timeError.style.display = "none";
    };

    const closePopup = () => {
        if (callbackPopup) callbackPopup.classList.remove("is-open");
        document.body.style.overflow = "";
    };

    // Инициализация обработчиков событий
    if (openPopupBtns.length > 0) { 
        openPopupBtns.forEach(button => { 
            button.addEventListener("click", openPopup);
        });
    }

    if (closePopupBtn) {
        closePopupBtn.addEventListener("click", closePopup);
    } 

    if (callbackPopup) {
        callbackPopup.addEventListener("click", (e) => {
            if (e.target === callbackPopup) {
                closePopup();
            }
        });
    }

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && callbackPopup && callbackPopup.classList.contains("is-open")) {
            closePopup();
        }
    });

    // Обработка изменения времени звонка
    timeRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            if (timeError) timeError.style.display = "none";
            
            if (radio.value === 'InTime' && radio.checked) {
                inTimeText.style.display = 'block';
                timeInput.style.display = 'block';
            } else {
                inTimeText.style.display = 'none';
                timeInput.style.display = 'none';
            }
        });
    });

    // Обработка выбора способа связи
    connectionRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            if (connectionError) connectionError.style.display = "none";
        });
    });

    // Валидация формы
    if (finalForm) {
        finalForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            
            // Валидация телефона
            if (!validatePhone(phoneInput.value.trim())) {
                phoneInput.classList.add("is-invalid");
                isValid = false;
            } else {
                phoneInput.classList.remove("is-invalid");
            }
            
            // Валидация способа связи
            const connectionSelected = Array.from(connectionRadios).some(radio => radio.checked);
            if (!connectionSelected) {
                if (connectionError) connectionError.style.display = "block";
                isValid = false;
            }
            
            // Валидация времени звонка
            const timeSelected = Array.from(timeRadios).some(radio => radio.checked);
            if (!timeSelected) {
                if (timeError) timeError.style.display = "block";
                isValid = false;
            }
            
            // Если форма валидна, отправляем данные
            if (isValid) {
                closePopup();
            }
        });
    }
});

// Функция валидации телефона
function validatePhone(phone) {
    const cleanPhone = phone.replace(/\D/g, '');
    return cleanPhone.length >= 10 && cleanPhone.length <= 15;
}