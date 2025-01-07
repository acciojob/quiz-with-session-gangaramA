// Questions data
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

// Get user answers from session storage or initialize an empty array
let userAnswers = JSON.parse(sessionStorage.getItem("progress")) || Array(questions.length).fill(null);

// Function to render questions with user's selected options
function renderQuestions() {
  const questionsElement = document.getElementById("questions");
  questionsElement.innerHTML = ""; // Clear previous content

  questions.forEach((question, index) => {
    const questionElement = document.createElement("div");
    questionElement.innerHTML = `<p>${question.question}</p>`;

    question.choices.forEach((choice) => {
      const choiceElement = document.createElement("input");
      choiceElement.type = "radio";
      choiceElement.name = `question-${index}`;
      choiceElement.value = choice;

      // Check if the choice was previously selected
      if (userAnswers[index] === choice) {
        choiceElement.checked = true;
      }

      // Add event listener to save progress when a choice is selected
      choiceElement.addEventListener("change", () => {
        userAnswers[index] = choice;
        sessionStorage.setItem("progress", JSON.stringify(userAnswers));
      });

      const choiceText = document.createTextNode(choice);
      questionElement.appendChild(choiceElement);
      questionElement.appendChild(choiceText);
      questionElement.appendChild(document.createElement("br"));
    });

    questionsElement.appendChild(questionElement);
  });

  // Add submit button
  const submitButton = document.createElement("button");
  submitButton.textContent = "Submit";
  submitButton.addEventListener("click", submitQuiz);
  questionsElement.appendChild(submitButton);
}

// Function to calculate and display score
function submitQuiz() {
  let score = 0;
  questions.forEach((question, index) => {
    if (userAnswers[index] === question.answer) {
      score++;
    }
  });

  // Display score
  const scoreElement = document.getElementById("score");
  scoreElement.textContent = `Your score is ${score} out of ${questions.length}`;

  // Store score in local storage
  localStorage.setItem("score", score);
}

// Render questions initially
renderQuestions();

// Load and display previous score from local storage
const storedScore = localStorage.getItem("score");
if (storedScore !== null) {
  const scoreElement = document.getElementById("score");
  scoreElement.textContent = `Previous Score: ${storedScore}`;
}