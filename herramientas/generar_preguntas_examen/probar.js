
document.addEventListener('DOMContentLoaded', function () {
    const questionForm = document.getElementById('question-form');
    const questionOutput = document.getElementById('question-output');

    questionForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const question = document.getElementById('question').value;
        const choices = Array.from(document.querySelectorAll('input[type="text"]')).map(input => input.value);
        const correctAnswerIndex = parseInt(document.getElementById('correct-answer').value) - 1;
        const correctAnswer = choices[correctAnswerIndex];

        if (!question || choices.some(choice => !choice)) {
            questionOutput.textContent = 'Por favor, completa todos los campos.';
            return;
        }

        const questionHTML = `
            <p><strong>Pregunta:</strong> ${question}</p>
            <ul>
                ${choices.map((choice, index) => `
                    <li>${index === correctAnswerIndex ? '<strong>Correcta:</strong> ' : ''}${choice}</li>
                `).join('')}
            </ul>
        `;

        questionOutput.innerHTML = questionOutput.innerHTML +  questionHTML;
    });
});