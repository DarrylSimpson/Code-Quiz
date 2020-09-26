// WHEN I click the start button
    // Connect button from html here
    // function to start quiz
    // high score- permenant or final screen 
    // countdown timer
        // 1. countdown
        // 2. Stop the quiz
        // 3. Lose time


// THEN a timer starts and I am presented with a question
        //* DON'T USE A LOOP


// WHEN I answer a question
    // Add 3 questions are multiple-choice
    // array with a var for the correct answer


// THEN I am presented with another question
    // ideas: funtion and return
    // switch
    // double array var codequestion = {question; answer} 
            // {
            //     question: "Commonly used data types do NOT inclue:",
            //         answers: {
            //         1: "strings",
            //             2: "booleans",
            //                 3: "alerts",
            //                     4: "numbers",
            //      },
            //     rightAnswer: "3"
            // },
        // connect button to correct answer
// If question is correct
    //add event listener to check button- goes to next question 
    // feedback "Correct"


// WHEN I answer a question incorrectly
    // time is subtracted from the clock 
    // feedback "Wrong"
    // if !== deduct time x from timer
    // *optional: if time is less than zero add if (time < 0)


// THEN time is subtracted from the clock
    // deduct x sec from clock 
    // move to next question
    // Out of time .. end quiz


// WHEN all questions are answered or the timer reaches  0
    // Display: "Quiz Complete"
    // Display Score
    // Add place to enter intials 
    // Add Submit button
    // Add "Try Again" Button

    
// THEN I can save my initials and score
     //Connect to local stoarge
     //get user initials
     // commit user initials & high score
     // Display all high scores



     var questions = [
        {
            title: "Commonly used data types DO NOT include:",
            choices: ["strings", "booleans", "alerts", "numbers"],
            answer: "alerts"
          },
          {
            title: "The condition in an if / else statement is enclosed within ____.",
            choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
            answer: "parentheses"
          },
          {
            title: "Arrays in JavaScript can be used to store ____.",
            choices: [
              "numbers and strings",
              "other arrays",
              "booleans",
              "all of the above"
            ],
            answer: "all of the above"
          },
          {
            title:
              "String values must be enclosed within ____ when being assigned to variables.",
            choices: ["commas", "curly brackets", "quotes", "parentheses"],
            answer: "quotes"
          },
          {
            title:
              "A very useful tool used during development and debugging for printing content to the debugger is:",
            choices: ["JavaScript", "terminal / bash", "for loops", "console.log"],
            answer: "console.log"
          }
     ];


     var currentQuestionIndex = 0;


     var startBtn = document.getElementById("start-quiz");
     var headerEl = document.getElementById("header");
     var timerEl = document.getElementById("timer");
     var questionsEl = document.getElementById("questions");
     var choicesEl = document.getElementById("choices");
     var submitEl = document.getElementById("submit");
     var initialsEl = document.getElementById("initials");
     var feedbackEl = document.getElementById("feedback");


     var time = questions.length * 2;
     var timerId;



    function startQuiz() {
            headerEl.setAttribute("class", "hide");
            questionsEl.removeAttribute("class");
            timerId = setInterval(startTimer, 1000);
            timerEl.textContent = time;
            showQuestions();

    }

    function startTimer() {
        time--;
        timerEl.textContent = time;
        if (time <= 0) {
            endQuiz();
        }
    }


    function endQuiz() {
        clearInterval(timerId);
        timerEl.textContent = time;
        
    }

    function showQuestions() {
        //generates questions array 
        var currentQuestion = questions[currentQuestionIndex];
        var titleEl = document.getElementById("question-title");
        console.log('currentq', currentQuestion)
        titleEl.textContent = currentQuestion.title;
          // clear out any old question choices
        choicesEl.innerHTML = "";

  // loop over choices
  currentQuestion.choices.forEach(function(choice, i) {
    // create new button for each choice
    var choiceNode = document.createElement("button");
    choiceNode.setAttribute("class", "choice");
    choiceNode.setAttribute("value", choice);

    choiceNode.textContent = i + 1 + ". " + choice;

    // attach click event listener to each choice
    choiceNode.onclick = checkAnswer;

    // display on the page
    choicesEl.appendChild(choiceNode);

  });

    }


    function checkAnswer() {
          // check if user guessed wrong
  if (this.value !== questions[currentQuestionIndex].answer) {
    // penalize time
    time -= 2;

    if (time < 0) {
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
  setTimeout(function() {
    feedbackEl.setAttribute("class", "feedback hide");
  }, 1000);

  // move to next question
  currentQuestionIndex++;

  // check if we've run out of questions
  if (currentQuestionIndex === questions.length) {
    endQuiz();
  } else {
    showQuestions();
  }
    }

    function showAnswers() {

    }

     startBtn.onclick = startQuiz;