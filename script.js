// Your JS code here.

// Do not change code below this line
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
const userAnswers = JSON.parse(sessionStorage.getItem('progress')) || [];

// Function to render questions with user's selected options
function renderQuestions() {
  const questionsElement = document.getElementById('questions'); // Get the container element
  questionsElement.innerHTML = ''; // Clear previous content

  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const questionElement = document.createElement("div");

    const questionText = document.createTextNode(question.question);
    questionElement.appendChild(questionText);

    for (let j = 0; j < question.choices.length; j++) {
      const choice = question.choices[j];
      const choiceElement = document.createElement("input");
      choiceElement.setAttribute("type", "radio");
      choiceElement.setAttribute("name", `question-${i}`);
      choiceElement.setAttribute("value", choice);

      if (userAnswers[i] === choice) {
        choiceElement.setAttribute("checked", true);
      }

      const choiceText = document.createTextNode(choice);
      questionElement.appendChild(choiceElement);
      questionElement.appendChild(choiceText);
    }

    questionsElement.appendChild(questionElement);
  }

  // Add submit button
  const submitButton = document.createElement('button');
  submitButton.textContent = 'Submit';
  submitButton.addEventListener('click', submitQuiz);
  questionsElement.appendChild(submitButton);
}

// Save user answers to session storage
function saveProgress() {
  const radios = document.querySelectorAll('input[type="radio"]');
  for (let i = 0; i < radios.length; i++) {
    if (radios[i].checked) {
      userAnswers[Math.floor(i / radios.length)] = radios[i].value;
    }
  }
  sessionStorage.setItem('progress', JSON.stringify(userAnswers));
}

// Calculate and display score
function submitQuiz() {
  let score = 0;
  for (let i = 0; i < questions.length; i++) {
    if (userAnswers[i] === questions[i].answer) {
      score++;
    }
  }

  const resultElement = document.createElement('div');
  resultElement.textContent = `Your score is ${score} out of ${questions.length}`;
  document.body.appendChild(resultElement);

  // Store score in local storage
  localStorage.setItem('score', score);
}

// Event listener for changes in radio buttons
document.addEventListener('change', () => {
  saveProgress();
});

// Render questions initially
renderQuestions();

// Load score from local storage
const storedScore = localStorage.getItem('score');
if (storedScore) {
  const scoreDisplay = document.createElement('div');
  scoreDisplay.textContent = `Previous Score: ${storedScore}`;
  document.body.appendChild(scoreDisplay);
}