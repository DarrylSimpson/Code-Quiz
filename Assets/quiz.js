var questions = [
  {
    title: "What is the funniest show on Netflix rite now?",
    choices: ["Schitts Creek", "The Good Place", "The Office", "Workin' Moms"],
    answer: "The Office"
  },
  {
    title: "Whats the bosse's name?",
    choices: ["John Smith", "Michael Scott", "Jim Halpert", "Dwight Schrute"],
    answer: "Michael Scott"
  },
  {
    title: "Who bought Michael his 'World's best boss' Mug?",
    choices: [
      "Dwight",
      "He bought it for himself",
      "Pam",
      "None of the above"
    ],
    answer: "He bought it for himself"
  },
  {
    title:
      "What type of farm does Dwight own?",
    choices: ["Carrot Farm", "Cow Farm", "Ant Farm", "Beet Farm"],
    answer: "Beet Farm"
  },
  {
    title:
      "Which one of Angela's cats does Dwight freeze?",
    choices: ["Spinkles", "Fluffy", "Bandit", "Garbage"],
    answer: "Sprinkles"
  },
  {
    title: "What office employee does Michael hit with his car?",
    choices: [
      "Dwight",
      "Darryl",
      "Pam",
      "Maredith"
    ],
    answer: "Meredith"
  },
  {
    title:
      "Who started the fire?",
    choices: ["Kevin", "Creed", "Ryan", "Andy"],
    answer: "Ryan"
  },
  {
    title:
      "Bears, Beats, _______?",
    choices: ["And a Knife", "BattleStar Galactica", "Are a way of life", "Bomb"],
    answer: "BattleStar Galactica"
  },
  {
    title:
      "What is Pams favorite flavor of yogurt?",
    choices: ["Mixed Berry", "Strawberry", "Blueberry", "Vanilla"],
    answer: "Mixed Berry"
  },
  {
    title:
      "Who gets promoted from the warehouse to work in the offices?",
    choices: ["Glenn", "Roy", "Darryl", "Nate"],
    answer: "Darryl"
  }
];

var currentQuestionIndex = 0;
var finalScore = 0;


//all my variables i reffer to from HTML 
var startBtn = document.getElementById("start-quiz");
var headerEl = document.getElementById("header");
var timerEl = document.getElementById("timer");
var questionsEl = document.getElementById("questions");
var choicesEl = document.getElementById("choices");
var submitEl = document.getElementById("submit");
var initialsEl = document.getElementById("initials");
var feedbackEl = document.getElementById("feedback");
var endScreenEl = document.getElementById("end-screen");
var tryAgainEl = document.getElementById("try-again");
var scoreEl = document.getElementById("final-score");
var textFinalEl = document.getElementById("final-text");
var currentScoreEl = document.getElementById("high-scores");
var overTextEl = document.getElementById("over-text");
var inputBoxEl = document.getElementById("input-box");


//Setting time for quiz based on how many questions there are. 50 seconds per question
var time = questions.length * 6;
var timerId;


//taking away a class that hides this text to show it when you click a button
function startQuiz() {
  //setting hide class to header to hide it and display questionsEl
  headerEl.setAttribute("class", "hide");
  questionsEl.removeAttribute("class");
  timerId = setInterval(startTimer, 1000);
  timerEl.textContent = time;


  showQuestions();

}

//start time and if statement to tell it to go to end screen when timer hits 0
function startTimer() {
  time--;
  timerEl.textContent = time;
  if (time <= 0) {
    endQuiz();
  }
}


function showQuestions() {

  var currentQuestion = questions[currentQuestionIndex];
  var titleEl = document.getElementById("question-title");

  
  titleEl.textContent = currentQuestion.title;

  // clear out any old question choices
  choicesEl.innerHTML = "";

  // loop over choices
  currentQuestion.choices.forEach(function (choice, i) {

    // create new button for each choice
    var choicesBtn = document.createElement("button");

    choicesBtn.setAttribute("class", "choice");
    choicesBtn.setAttribute("value", choice);

    choicesBtn.textContent = i + 1 + ". " + choice;

    // attach click event listener to each choice
    choicesBtn.onclick = checkAnswer;

    // display on the page
    choicesEl.appendChild(choicesBtn);

  });

  questionsEl.removeAttribute("class");
  endScreenEl.setAttribute("class", "hide");
}

//checking if the answers are correct, and deducting time if they arent
function checkAnswer() {
  // check if user guessed wrong
  if (this.value !== questions[currentQuestionIndex].answer) {
    // subtracting time when user gets question wrong 
    time -= 5;

    if (time <= 0) {
      time = 0;
    }

    // display new time on page
    timerEl.textContent = time;


    feedbackEl.textContent = "Wrong!";
  } else {

    feedbackEl.textContent = "Correct!";
  }

  // flash right/wrong feedback on page for half a second
  feedbackEl.setAttribute("class", "feedback");
  setTimeout(function () {
    feedbackEl.setAttribute("class", "feedback hide");
  }, 1000);

  // move to next question by going to next index of the array
  currentQuestionIndex++;

  // check if we've run out of questions
  if (currentQuestionIndex === questions.length) {
    endQuiz();
  } else {
    showQuestions();
  }
}

//this is the end screen function to show the screen when the quiz is over
function endQuiz() {
  var tempTime = time;
  var finalScore = document.createTextNode(tempTime);

  clearInterval(timerId); //clearing the timer so it doesnt go into the negative
  timerEl.textContent = time;
  //removing and setting hide classes to display items on the page
  endScreenEl.removeAttribute("class");
  questionsEl.setAttribute("class", "hide");
  //placing score into a p tag on HTML
  scoreEl.appendChild(finalScore);

}

//what happens when you click submit your score
function scoreSave() {
  var highScores = JSON.parse(localStorage.getItem("highscores")) || []; //retrieving highscores from local


  tempTime = time;

  //object storing user inputted initials and final score 
  var submittedScore = {
    name: initialsEl.value,
    score: tempTime
  };

  highScores.push(submittedScore);


  //created a forEach to make a <li> for each item stored in object
  highScores.forEach(function (score) {
    var li = document.createElement("li");
    li.textContent = score.name + " " + score.score;
    currentScoreEl.appendChild(li);
  });


  //setting score to localStorage
  localStorage.setItem("highscores", JSON.stringify(highScores));
  
  //setting and removing hide class to hide and display what i want on the page after submit button is pressed
  currentScoreEl.removeAttribute("class");
  inputBoxEl.setAttribute("class", "hide");
  textFinalEl.setAttribute("class", "hide");
  overTextEl.innerHTML = "High Scores!";
  highScores.toString();

}

//what happens when you click try again
function restartQuiz() {

  var element = document.getElementById("header");

  //setting and removing the class "hide" so i can hide what i want from page and show what i want
  element.removeAttribute("class");
  endScreenEl.setAttribute("class", "hide");
  currentScoreEl.setAttribute("class", "hide");
  inputBoxEl.removeAttribute("class");
  textFinalEl.removeAttribute("class");
  overTextEl.innerHTML = "QUIZ OVER!!"; //setting the HTML text for the end screen to this

  //resetting questions, timer, time, and score
  currentQuestionIndex = 0;
  timerEl.textContent = "0";
  time = questions.length * 6;
  scoreEl.textContent = " ";

  //deleting the <li> made to display score list, so it doesn't keep pulling everything to list
  //every time its run
  currentScoreEl.innerHTML = '';

}


//add listeners to all buttons, so on click they run a function.
startBtn.onclick = startQuiz;
tryAgainEl.onclick = restartQuiz;
submitEl.onclick = scoreSave;
