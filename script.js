document.addEventListener('DOMContentLoaded', () => {
    loadQuestions();
});

function loadQuestions() {
    fetch('https://the-trivia-api.com/v2/questions')
        .then(response => response.json())
        .then(data => {
            displayQuestion(data[0]); // Display the first question
        })
        .catch(error => {
            console.error('Error fetching questions:', error);
        });
}

function displayQuestion(questionData) {
    const questionContainer = document.getElementById('question-container');
    questionContainer.innerHTML = ''; // Clear previous question

    const questionElement = document.createElement('div');
    questionElement.classList.add('question');
    questionElement.innerText = questionData.question.text;
    questionContainer.appendChild(questionElement);

    const answers = [questionData.correctAnswer, ...questionData.incorrectAnswers];
    shuffleArray(answers); // Shuffle the answers

    answers.forEach(answer => {
        const answerButton = document.createElement('button');
        answerButton.classList.add('answer-btn');
        answerButton.innerText = answer;
        answerButton.addEventListener('click', () => checkAnswer(answer, questionData.correctAnswer, answerButton));
        questionContainer.appendChild(answerButton);
    });
}

function checkAnswer(selectedAnswer, correctAnswer, button) {
    const buttons = document.querySelectorAll('.answer-btn');
    buttons.forEach(btn => {
        btn.disabled = true; // Disable all buttons
        if (btn.innerText === correctAnswer) {
            btn.classList.add('correct-answer');
        } else {
            btn.classList.add('wrong-answer');
        }
    });

    // Show whether the selected answer was correct
    if (selectedAnswer === correctAnswer) {
        button.classList.add('correct-answer');
    } else {
        button.classList.add('wrong-answer');
    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function loadNextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        displayQuestion(questions[currentQuestionIndex]);
    } else {
        // Handle the end of the question array
        document.getElementById('question-container').innerHTML = 'No more questions available.';
        document.getElementById('next-question-btn').disabled = true;
    }
}
