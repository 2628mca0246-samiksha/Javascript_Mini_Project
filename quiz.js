
const questions = [
    {
        question: "1. When a process is waiting for an I/O operation to complete, which state does it typically transition into from the running state?",
        options: ["Ready state", "terminated state", "waiting/blocked state", "New state"],
        answer: "HTML"
    },
    {
        question: "2. Which language is used to style a web page?",
        options: ["HTML", "Java", "CSS", "SQL"],
        answer: "CSS"
    },
    {
        question: "3. Which language adds interactivity to a web page?",
        options: ["JavaScript", "HTML", "CSS", "XML"],
        answer: "JavaScript"
    },
    {
        question: "4. Which HTML tag is used to create a hyperlink?",
        options: ["<p>", "<img>", "<a>", "<h1>"],
        answer: "<a>"
    },
    {
        question: "5. Which CSS property changes text color?",
        options: ["font-size", "color", "background", "margin"],
        answer: "color"
    }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

const questionNumber = document.getElementById("question-number");
const questionElement = document.getElementById("question");
const optionsContainer = document.getElementById("options-container");
const feedback = document.getElementById("feedback");
const nextButton = document.getElementById("next-btn");
const quizBox = document.getElementById("quiz-box");
const resultBox = document.getElementById("result-box");
const finalScore = document.getElementById("final-score");
const restartButton = document.getElementById("restart-btn");

// Display the current question
function showQuestion() {
    answered = false;

    const current = questions[currentQuestion];

    questionNumber.textContent =
        `Question ${currentQuestion + 1} of ${questions.length}`;

    questionElement.textContent = current.question;

    optionsContainer.innerHTML = "";
    feedback.textContent = "";

    // Keep the Next Question button hidden
    nextButton.hidden = true;

    current.options.forEach(function(option) {
        const button = document.createElement("button");

        button.textContent = option;
        button.classList.add("option-btn");

        button.addEventListener("click", function() {
            checkAnswer(option, button);
        });

        optionsContainer.appendChild(button);
    });
}

// Check the selected answer
function checkAnswer(selectedOption, selectedButton) {
    // Prevent answering the same question again
    if (answered) {
        return;
    }

    answered = true;

    const correctAnswer = questions[currentQuestion].answer;

    if (selectedOption === correctAnswer) {
        score++;
        feedback.textContent = "Correct answer!";
        feedback.style.color = "green";
        selectedButton.classList.add("correct");
    } else {
        feedback.textContent =
            "Incorrect! Correct answer: " + correctAnswer;

        feedback.style.color = "red";
        selectedButton.classList.add("incorrect");
    }

    // Disable all options after selection
    const allOptions =
        optionsContainer.querySelectorAll(".option-btn");

    allOptions.forEach(function(button) {
        button.disabled = true;

        // Highlight the correct answer
        if (button.textContent === correctAnswer) {
            button.classList.add("correct");
        }
    });

    // Show Next Question only after answering
    nextButton.hidden = false;

    if (currentQuestion === questions.length - 1) {
        nextButton.textContent = "Show Result";
    } else {
        nextButton.textContent = "Next Question";
    }
}

// Move to the next question or display the result
nextButton.addEventListener("click", function() {
    if (!answered) {
        return;
    }

    currentQuestion++;

    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
});

// Display the final score
function showResult() {
    quizBox.hidden = true;
    resultBox.hidden = false;

    finalScore.textContent =
        `Your Score: ${score} / ${questions.length}`;
}

// Restart the quiz
restartButton.addEventListener("click", function() {
    currentQuestion = 0;
    score = 0;
    answered = false;

    quizBox.hidden = false;
    resultBox.hidden = true;

    nextButton.textContent = "Next Question";

    showQuestion();
});

// Start the quiz
showQuestion();
