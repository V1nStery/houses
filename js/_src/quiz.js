let currentQuestion = 1;
const totalQuestions = 3;
const answers = {};

function initProgress() {
    for (let i = 1; i <= totalQuestions; i++) {
        const progressBar = document.getElementById(`progress${i}`);
        if (progressBar) {
            progressBar.style.width = `${(i / totalQuestions) * 100}%`;
        }
    }
    
    // Добавляем обработчики для автоматического перехода
    document.querySelectorAll('.quiz-block__form-radio').forEach(radio => {
        radio.addEventListener('change', function() {
            const questionNumber = parseInt(this.name.replace('choice', ''));
            
            if (questionNumber === currentQuestion) {
                if (questionNumber < totalQuestions) {
                    setTimeout(nextQuestion, 300); // Небольшая задержка для плавности
                } else {
                    setTimeout(finishQuiz, 300);
                }
            }
        });
    });
}

function validateQuestion() {
    const selected = document.querySelector(`#question${currentQuestion} input[name="choice${currentQuestion}"]:checked`);
    const errorElement = document.querySelector(`#question${currentQuestion} .error-message`);
    
    if (!selected) {
        if (errorElement) {
            errorElement.style.display = 'block';
        }
        return false;
    }
    
    if (errorElement) {
        errorElement.style.display = 'none';
    }
    
    answers[`question${currentQuestion}`] = selected.value;
    return true;
}

function nextQuestion() {
    if (!validateQuestion()) return;
    
    if (currentQuestion < totalQuestions) {
        document.getElementById(`question${currentQuestion}`).classList.remove('active');
        document.getElementById(`img${currentQuestion}`).classList.remove('active');
        
        currentQuestion++;
        document.getElementById(`question${currentQuestion}`).classList.add('active');
        document.getElementById(`img${currentQuestion}`).classList.add('active');
        document.getElementById('current-q').textContent = currentQuestion;
        document.querySelector('.quiz-block__text').scrollTop = 0;
    }
}

function finishQuiz() {
    if (!validateQuestion()) return;

    document.querySelector('.quiz-block').style.display = 'none';
    document.getElementById('quizFinish').style.display = 'block';
    document.getElementById('quizFinish').scrollIntoView({ behavior: 'smooth' });
}

document.getElementById('finalForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Сбрасываем ошибки
    document.querySelectorAll('.error-message').forEach(el => {
        el.style.display = 'none';
    });
    
    let isValid = true;
    
    // Проверка выбора способа связи
    const connectionSelected = document.querySelector('input[name="connection"]:checked');
    if (!connectionSelected) {
        document.getElementById('connection-error').style.display = 'block';
        isValid = false;
    }
    
    // Проверка согласия с политикой
    const agreement = document.querySelector('.quiz-finish__text-agreement');
    if (!agreement.checked) {
        const agreementError = document.querySelector('.agreement-error');
        if (!agreementError) {
            const errorElement = document.createElement('p');
            errorElement.className = 'error-message agreement-error';
            errorElement.style.cssText = 'color: red; margin-top: 10px;';
            errorElement.textContent = 'Необходимо ваше согласие';
            agreement.parentNode.insertBefore(errorElement, agreement.nextSibling);
        } else {
            agreementError.style.display = 'block';
        }
        isValid = false;
    }
    
    if (!isValid) return;
    
    // Собираем данные формы
    const formData = {
        phone: document.querySelector('.quiz-finish__text-number').value,
        connection: connectionSelected ? connectionSelected.value : 'не выбран',
        agreement: agreement.checked,
        answers: answers
    };
    
    // Выводим данные в консоль
    console.log('Данные формы:', formData);
    console.log('Ответы на вопросы:');
    for (const [question, answer] of Object.entries(answers)) {
        console.log(`${question}: ${answer}`);
    }
    
    // Перенаправление на страницу благодарности
    window.location.href = 'thankyou.html';
});

document.addEventListener('DOMContentLoaded', function() {
    initProgress();
    
    // Удаляем автоматический переход
    document.querySelectorAll('.quiz-block__form-radio').forEach(radio => {
        radio.onchange = null;
    });
});