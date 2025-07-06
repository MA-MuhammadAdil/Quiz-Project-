 // DOM Elements
let  startScreen = document.getElementById("start-screen");
let  quizScreen = document.getElementById("quiz-screen");
let  resultScreen = document.getElementById("result-screen");
let  startButton = document.getElementById("start-btn");
let  questionText = document.getElementById("question-text");
let  answersContainer = document.getElementById("answers-container");
let  currentQuestionSpan = document.getElementById("current-question");
let  totalQuestionsSpan = document.getElementById("total-questions");
let  scoreSpan = document.getElementById("score");
let  finalScoreSpan = document.getElementById("final-score");
let  maxScoreSpan = document.getElementById("max-score");
let  resultMessage = document.getElementById("result-message");
let  restartButton = document.getElementById("restart-btn");
let  progressBar = document.getElementById("progress");

let  quizQuestions = [
  {
    question: " You can see me in the mirror, but I can’t talk or move. What am I?",
    answers: [
      { text: "shadow", correct: false },
      { text: "dream", correct: false },
      { text: "reflection ", correct: true },
      { text: "painting", correct: false },
    ],
  },
  {
    question: "A girl has 7 brothers. Each brother has 1 sister. How many children are there in the family?",
    answers: [
      { text: "7", correct: false },
      { text: "8", correct: true },
      { text: "14", correct: false },
      { text: "9", correct: false },
    ],
  },
  {
    question: "You are in a dark room with a candle, a lamp, and a fireplace. You only have one match. What do you light first?",
    answers: [
      { text: "Candle", correct: false },
      { text: "FirePlace", correct: false },
      { text: "Lamp", correct: false },
      { text: "Match", correct: true },
    ],
  },
  {
    question: "Which number logically completes the series? 2,6,12,20,30,__",
    answers: [
      { text: "36", correct: false },
      { text: "40", correct: false },
      { text: "42", correct: true },
      { text: "48", correct: false },
    ],
  },
  {
    question: "🧠 (5 + 3) × 2 = ? ",
    answers: [
      { text: "13", correct: false },
      { text: "18", correct: false },
      { text: "16", correct: true },
      { text: "10", correct: false },
    ],
  },

{
    question: "What is the unit of force?",
    answers: [
      { text: "Watt", correct: false },
      { text: "Joule", correct: false },
      { text: "Newton", correct: true },
      { text: "Volt", correct: false },
    ],
  },



];

// QUIZ STATE VARS
let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

// event listeners
startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz() {
  // reset vars
  currentQuestionIndex = 0;
  score = 0;
  scoreSpan.textContent = 0;

  startScreen.classList.remove("active");
  quizScreen.classList.add("active");

  showQuestion();
}

function showQuestion() {
  // reset state
  answersDisabled = false;

  let  currentQuestion = quizQuestions[currentQuestionIndex];

  currentQuestionSpan.textContent = currentQuestionIndex + 1;

  let  progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
  progressBar.style.width = progressPercent + "%";

  questionText.textContent = currentQuestion.question;

  answersContainer.innerHTML = "";

  currentQuestion.answers.forEach((answer) => {
    let  button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("answer-btn");

    // what is dataset? it's a property of the button element that allows you to store custom data
    button.dataset.correct = answer.correct;

    button.addEventListener("click", selectAnswer);

    answersContainer.appendChild(button);
  });
}

function selectAnswer(event) {
  // optimization check
  if (answersDisabled) return;

  answersDisabled = true;

  let  selectedButton = event.target;
  let  isCorrect = selectedButton.dataset.correct === "true";

  // Here Array.from() is used to convert the NodeList returned by answersContainer.children into an array, this is because the NodeList is not an array and we need to use the forEach method
  Array.from(answersContainer.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    } else if (button === selectedButton) {
      button.classList.add("incorrect");
    }
  });

  if (isCorrect) {
    score++;
    scoreSpan.textContent = score;
  }

  setTimeout(() => {
    currentQuestionIndex++;

    // check if there are more questions or if the quiz is over
    if (currentQuestionIndex < quizQuestions.length) {
      showQuestion();
    } else {
      showResults();
    }
  }, 1000);
}

function showResults() {
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");

  finalScoreSpan.textContent = score;

  let  percentage = (score / quizQuestions.length) * 100;

  if (percentage === 100) {
    resultMessage.textContent = "Perfect! You're a genius!";
  } else if (percentage >= 80) {
    resultMessage.textContent = "Great job! You know your stuff!";
  } else if (percentage >= 60) {
    resultMessage.textContent = "Good effort! Keep learning!";
  } else if (percentage >= 40) {
    resultMessage.textContent = "Not bad! Try again to improve!";
  } else {
    resultMessage.textContent = "Keep studying! You'll get better!";
  }
}

function restartQuiz() {
  resultScreen.classList.remove("active");

  startQuiz();
}