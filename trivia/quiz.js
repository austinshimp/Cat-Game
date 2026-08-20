//NEEDED STILL:
// TIMER
// ADJUST SCORES BASED ON TIMER
// 'LOCK-IN' ANSWER CHOICE

// LEADERBOARD

// IMAGES

// DATABASE IMPLEMENTATION (FOR QUESTIONS/ACCOUNTS/LEADERBOARD/IMAGES?)


const quizData = [
    {
        question: "How many eyelids do cats have?",
        options: ["1", "2", "3", "4"],
        correct: 2 // Index of answer
    },
    {
        question: "What type of cat can not roar?",
        options: ["Lions", "Cheetahs", "Jaguars", "Leopards"],
        correct: 1

    },
    {
        question: "What causes a lion to grow a black mane?",
        options: ["Old Age", "High Testosterone", "When cub enters adolescence", "When they are wounded"],
        correct: 1

    },
    {
        question: "The roar of a bengal can be heard up to how many miles?",
        options: ["1/2 a mile", "3 miles", "2 miles", "1 mile"],
        correct: 2

    },
    {
        question: "Why are bobcats named bobcats?",
        options: ["They have a short, stubby tails", "They 'bob' up and down as they move", "Their fur pattern resembles a bob haircut", "It's short for Robert"],
        correct: 0

    },
    {
        question: "What is the largest animal African Lions can take down?",
        options: ["Zebras", "Crocodiles", "Buffalos", "Elephants"],
        correct: 3

    },
    {
        question: "Which of these big cats are the LEAST likely to attack a human?",
        options: ["Lions", "Cheetahs", "Jaguars", "Leopards"],
        correct: 2

    },
    {
        question: "What time period was the start of the first conservation efforts towards jaguars?",
        options: ["1980s", "1990s", "1960s", "2000s"],
        correct: 1

    },
    {
        question: "Which of these big cats are the MOST likely to attack a human?",
        options: ["Lions", "Cheetahs", "Jaguars", "Leopards"],
        correct: 0

    },
    {
        question: "What animal does a cheetah mimic when communicating to it's young?",
        options: ["a bird's chirp", "a lion's roar", "a cat's meow", "a dog's bark"],
        correct: 0

    }
];

let currentQuestion = 0;
let score = 0;
let isAnswerLocked = false; //currently unused
let timeLeft; //currently unused
const colors = ["red", "blue", "yellow", "green"]; //Was originally kahoot styled colors but changed them to monocolor not to be direct copy
const questionEl = document.getElementById("question-text");
const optionsEl = document.getElementById("options-container");
const startEl = document.getElementById("start-container");
const startScreen = document.getElementById("start-screen");
const gameScreen = document.getElementById("game-screen");
const resultScreen = document.getElementById("result-screen");
const scoreEl = document.getElementById("score");
const timerEl = document.getElementById("timer");

function startGame() {
    const btn = document.createElement("button");
    btn.innerText = "START"
    btn.classList.add("btn", colors[0]);
    btn.onclick = () => ready();
    startEl.appendChild(btn);
}

function ready(){
    startScreen.classList.add("hidden");
    gameScreen.classList.remove("hidden");
    loadQuestion();
}

function loadQuestion() {
    isAnswerLocked = false; // used to lock in current answer
    const data = quizData[currentQuestion];
    questionEl.innerText = data.question;
    optionsEl.innerHTML = "";

    data.options.forEach((opt, index) => {
        const btn = document.createElement("button");
        btn.innerText = opt;
        btn.classList.add("btn", colors[index]);
        btn.onclick = () => checkAnswer(index);
        optionsEl.appendChild(btn);
    });
}

function checkAnswer(selectedIndex) {
    if (selectedIndex === quizData[currentQuestion].correct) {
        score++;
    }
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    gameScreen.classList.add("hidden");
    resultScreen.classList.remove("hidden");
    scoreEl.innerText = `${score}/${quizData.length}`;
}

// Start the game
   startGame()