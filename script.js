 const questions = [
    {
        value: "Equality",
        options: ["Parity", "Hierarchy", "Supremacy", "Equivalence"],
        correct: "Parity"
    },
    {
        value: "Liberty",
        options: ["Freedom", "Restriction", "Control", "Independence"],
        correct: "Freedom"
    },
    {
        value: "Fraternity",
        options: ["Brotherhood", "Isolation", "Rivalry", "Solidarity"],
        correct: "Brotherhood"
    },
    {
        value: "Freedom",
        options: ["Liberty", "Confinement", "Oppression", "Autonomy"],
        correct: "Liberty"
    },
    {
        value: "Justice",
        options: ["Fairness", "Injustice", "Bias", "Equity"],
        correct: "Fairness"
    },
    {
        value: "Pluralism",
        options: ["Diversity", "Uniformity", "Conformity", "Variety"],
        correct: "Diversity"
    },
    {
        value: "Tolerance",
        options: ["Acceptance", "Intolerance", "Rejection", "Patience"],
        correct: "Acceptance"
    },
    {
        value: "Respect for All",
        options: ["Reverence", "Disdain", "Contempt", "Esteem"],
        correct: "Reverence"
    },
    {
        value: "Freedom of Expression",
        options: ["Free Speech", "Censorship", "Silence", "Open Communication"],
        correct: "Free Speech"
    },
    {
        value: "Citizen Participation in Governance",
        options: ["Civic Engagement", "Apathy", "Exclusion", "Public Involvement"],
        correct: "Civic Engagement"
    }
];

let currentQuestionIndex = 0;
let score = 0;

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function loadQuestion() {
    const questionElement = document.getElementById('question');
    const optionsElement = document.getElementById('options');
    const nextButton = document.getElementById('nextButton');
    const scoreElement = document.getElementById('score');

    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = `What is a synonym for ${currentQuestion.value}?`;
    optionsElement.innerHTML = '';

    shuffleArray(currentQuestion.options);

    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.addEventListener('click', () => checkAnswer(option, currentQuestion.correct));
        optionsElement.appendChild(button);
    });

    nextButton.disabled = true;
    nextButton.style.display = 'none';
    scoreElement.textContent = score;
}

function checkAnswer(selectedOption, correctOption) {
    const optionsElement = document.getElementById('options');
    const nextButton = document.getElementById('nextButton');
    const buttons = optionsElement.getElementsByTagName('button');

    for (let button of buttons) {
        if (button.textContent === selectedOption) {
            if (selectedOption === correctOption) {
                button.classList.add('correct');
                score++;
            } else {
                button.classList.add('incorrect');
            }
        }
        if (button.textContent === correctOption) {
            button.classList.add('highlight');
            setTimeout(() => button.classList.remove('highlight'), 3000);
        }
    }

    nextButton.disabled = false;
    nextButton.style.display = 'inline-block';
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        alert(`Game Over! Your score is ${score}/${questions.length}`);
        currentQuestionIndex = 0;
        score = 0;
        loadQuestion();
    }
}

function restartGame() {
    currentQuestionIndex = 0;
    score = 0;
    loadQuestion();
}

function shareGame() {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
        alert('Game link copied to clipboard!');
    });
}

document.getElementById('nextButton').addEventListener('click', nextQuestion);
document.getElementById('restartButton').addEventListener('click', restartGame);
document.getElementById('shareButton').addEventListener('click', shareGame);

loadQuestion();
