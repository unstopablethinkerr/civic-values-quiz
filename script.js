const questions = [
    {
        value: "Equality",
        options: ["Parity", "Hierarchy", "Supremacy"],
        correct: "Parity"
    },
    {
        value: "Liberty",
        options: ["Freedom", "Restriction", "Control"],
        correct: "Freedom"
    },
    {
        value: "Fraternity",
        options: ["Brotherhood", "Isolation", "Rivalry"],
        correct: "Brotherhood"
    },
    {
        value: "Freedom",
        options: ["Liberty", "Confinement", "Oppression"],
        correct: "Liberty"
    },
    {
        value: "Justice",
        options: ["Fairness", "Injustice", "Bias"],
        correct: "Fairness"
    },
    {
        value: "Pluralism",
        options: ["Diversity", "Uniformity", "Conformity"],
        correct: "Diversity"
    },
    {
        value: "Tolerance",
        options: ["Acceptance", "Intolerance", "Rejection"],
        correct: "Acceptance"
    },
    {
        value: "Respect for All",
        options: ["Reverence", "Disdain", "Contempt"],
        correct: "Reverence"
    },
    {
        value: "Freedom of Expression",
        options: ["Free Speech", "Censorship", "Silence"],
        correct: "Free Speech"
    },
    {
        value: "Citizen Participation in Governance",
        options: ["Civic Engagement", "Apathy", "Exclusion"],
        correct: "Civic Engagement"
    }
];

let currentQuestionIndex = 0;
let score = 0;

function loadQuestion() {
    const questionElement = document.getElementById('question');
    const optionsElement = document.getElementById('options');
    const nextButton = document.getElementById('nextButton');

    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = `What is a synonym for ${currentQuestion.value}?`;
    optionsElement.innerHTML = '';

    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.addEventListener('click', () => checkAnswer(option, currentQuestion.correct));
        optionsElement.appendChild(button);
    });

    nextButton.disabled = true;
    nextButton.style.display = 'none';
}

function checkAnswer(selectedOption, correctOption) {
    const optionsElement = document.getElementById('options');
    const nextButton = document.getElementById('nextButton');

    if (selectedOption === correctOption) {
        score++;
    } else {
        const buttons = optionsElement.getElementsByTagName('button');
        for (let button of buttons) {
            if (button.textContent === correctOption) {
                button.classList.add('highlight');
                setTimeout(() => button.classList.remove('highlight'), 3000);
            }
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
    }
}

document.getElementById('nextButton').addEventListener('click', nextQuestion);

loadQuestion();
