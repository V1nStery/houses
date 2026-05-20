document.addEventListener('DOMContentLoaded', function() {
    // Функция для логирования изменений номера
    function logPhoneChange(phoneNumber, context) {
        console.log(`Изменен номер телефона: ${phoneNumber} (${context})`);
    }

    // Обработчик для всех форм
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const phoneInput = this.querySelector('input[type="tel"]');
            const phoneNumber = phoneInput.value.trim();
            
            if (validatePhone(phoneNumber)) {
                // Сохраняем номер для thankyou.html
                sessionStorage.setItem('userPhone', phoneNumber);
                logPhoneChange(phoneNumber, 'форма отправлена');
                
                // Перенаправляем на страницу благодарности
                window.location.href = 'thankyou.html';
            } else {
                // Показать ошибку валидации
                alert('Пожалуйста, введите корректный номер телефона');
                phoneInput.focus();
            }
        });
    });
    
    // Инициализация страницы thankyou.html
    if (window.location.pathname.includes('thankyou.html')) {
        const savedPhone = sessionStorage.getItem('userPhone');
        const phoneInput = document.querySelector('.success-form__number');
        
        if (savedPhone && phoneInput) {
            phoneInput.value = savedPhone;
            
            // Обработка повторной отправки на странице thankyou.html
            document.querySelector('.success-form').addEventListener('submit', function(e) {
                e.preventDefault();
                const newPhone = phoneInput.value.trim();
                
                if (validatePhone(newPhone)) {
                    // Здесь можно отправить исправленный номер на сервер
                    alert('Номер успешно обновлен!');
                    sessionStorage.setItem('userPhone', newPhone);
                } else {
                    alert('Пожалуйста, введите корректный номер');
                }
            });
        }
    }
});

// Валидация номера телефона (базовый вариант)
function validatePhone(phone) {
    const cleanPhone = phone.replace(/\D/g, '');
    return cleanPhone.length >= 10 && cleanPhone.length <= 15;
}