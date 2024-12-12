 const questions = [
    {
        value: "Equality",
        synonyms: ["Parity", "Equivalence", "Fairness", "Evenness", "Balance"]
    },
    {
        value: "Liberty",
        synonyms: ["Freedom", "Independence", "Autonomy", "Emancipation", "Self-determination"]
    },
    {
        value: "Fraternity",
        synonyms: ["Brotherhood", "Solidarity", "Kinship", "Unity", "Fellowship"]
    },
    {
        value: "Freedom",
        synonyms: ["Liberty", "Independence", "Autonomy", "Emancipation", "Self-determination"]
    },
    {
        value: "Justice",
        synonyms: ["Fairness", "Equity", "Impartiality", "Righteousness", "Integrity"]
    },
    {
        value: "Pluralism",
        synonyms: ["Diversity", "Variety", "Multiplicity", "Heterogeneity", "Eclecticism"]
    },
    {
        value: "Tolerance",
        synonyms: ["Acceptance", "Forbearance", "Patience", "Understanding", "Open-mindedness"]
    },
    {
        value: "Respect for All",
        synonyms: ["Reverence", "Esteem", "Consideration", "Regard", "Honor"]
    },
    {
        value: "Freedom of Expression",
        synonyms: ["Free Speech", "Right to Speak", "Open Communication", "Uncensored Expression", "Liberty to Voice Opinions"]
    },
    {
        value: "Citizen Participation in Governance",
        synonyms: ["Civic Engagement", "Public Involvement", "Democratic Participation", "Community Involvement", "Political Engagement"]
    }
];

const wordList = [
    "Liberty", "Fraternity", "Freedom", "Justice", "Pluralism", "Tolerance", "Respect",
    "Expression", "Participation", "Democracy", "Rights", "Fairness", "Diversity",
    "Inclusion", "Empowerment", "Autonomy", "Independence", "Solidarity", "Unity",
    "Harmony", "Equity", "Impartiality", "Integrity", "Honesty", "Transparency",
    "Accountability", "Openness", "Accessibility", "Representation", "Voice",
    "Choice", "Consent", "Dissent", "Dialogue", "Debate", "Negotiation", "Compromise",
    "Cooperation", "Collaboration", "Community", "Citizenship", "Governance", "Law",
    "Order", "Peace", "Security", "Stability", "Prosperity", "Welfare", "Well-being",
    "Happiness", "Contentment", "Satisfaction", "Fulfillment", "Self-determination",
    "Self-expression", "Self-realization", "Self-actualization", "Self-respect",
    "Dignity", "Honor", "Pride", "Confidence", "Trust", "Faith", "Hope", "Optimism",
    "Resilience", "Perseverance", "Courage", "Bravery", "Valor", "Fortitude",
    "Endurance", "Patience", "Forgiveness", "Compassion", "Empathy", "Kindness",
    "Generosity", "Charity", "Altruism", "Benevolence", "Goodwill", "Amity",
    "Friendship", "Camaraderie", "Fellowship", "Brotherhood", "Sisterhood",
    "Kinship", "Belonging", "Acceptance", "Understanding", "Wisdom", "Knowledge",
    "Education", "Learning", "Growth"
];

let currentQuestionIndex = 0;
let score = 0;

function getRandomOptions(correctOption) {
    const options = [];
    while (options.length < 2) {
        const randomWord = wordList[Math.floor(Math.random() * wordList.length)];
        if (randomWord !== correctOption && !options.includes(randomWord)) {
            options.push(randomWord);
        }
    }
    return options;
}

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
    const randomSynonymIndex = Math.floor(Math.random() * currentQuestion.synonyms.length);
    const correctOption = currentQuestion.synonyms[randomSynonymIndex];
    questionElement.textContent = `What is a synonym for ${currentQuestion.value}?`;
    optionsElement.innerHTML = '';

    const randomOptions = getRandomOptions(correctOption);
    const allOptions = [correctOption, ...randomOptions];
    shuffleArray(allOptions);

    allOptions.forEach((option) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.addEventListener('click', () => checkAnswer(option, correctOption));
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
