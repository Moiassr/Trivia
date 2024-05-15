let currentQuestionIndex = 0;
let questions = [];

document.addEventListener('DOMContentLoaded', () => {
    loadQuestions();
});

function loadQuestions() {
    fetch('https://opentdb.com/api.php?amount=10&type=multiple')
        .then(response => response.json())
        .then(data => {
            questions = data.results;
            displayQuestion();
        })
        .catch(error => {
            console.error('Error fetching questions:', error);
        });
}

function displayQuestion() {
    const questionContainer = document.getElementById('question-container');
    questionContainer.innerHTML = ''; // Clear previous question

    if (currentQuestionIndex < questions.length) {
        const question = questions[currentQuestionIndex];
        const questionElement = document.createElement('div');
        questionElement.innerHTML = `<h2>${decodeHtml(question.question)}</h2>`;

        const answers = [...question.incorrect_answers, question.correct_answer].sort(() => Math.random() - 0.5);

        answers.forEach(answer => {
            const button = document.createElement('button');
            button.innerHTML = decodeHtml(answer);
            button.onclick = () => selectAnswer(answer, question.correct_answer, button);
            questionElement.appendChild(button);
        });

        questionContainer.appendChild(questionElement);
    } else {
        questionContainer.innerHTML = '<p>No more questions available.</p>';
    }
}

function selectAnswer(selectedAnswer, correctAnswer, button) {
    if (selectedAnswer === correctAnswer) {
        button.classList.add('correct-answer');
    } else {
        button.classList.add('wrong-answer');
    }
    // Disable all buttons after selection
    const buttons = document.querySelectorAll('#question-container button');
    buttons.forEach(btn => {
        btn.disabled = true;
    });
}

function loadNextQuestion() {
    currentQuestionIndex++;
    displayQuestion();
}

function decodeHtml(html) {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
}