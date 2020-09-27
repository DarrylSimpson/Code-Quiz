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
     var finalScore = 0;


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


     //Setting time for quiz based on how many questions there are. 50 seconds per question
     var time = questions.length * 50;
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


    function showQuestions() {
        
        var currentQuestion = questions[currentQuestionIndex];
        var titleEl = document.getElementById("question-title");
        
        //console.log('currentq', currentQuestion)
        //debugger;
        titleEl.textContent = currentQuestion.title;

          // clear out any old question choices
        choicesEl.innerHTML = "";

        // loop over choices
        currentQuestion.choices.forEach(function(choice, i) {
            
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


    function checkAnswer() {
          // check if user guessed wrong
    if (this.value !== questions[currentQuestionIndex].answer) {
        // subtracting time when user gets question wrong 
        time -= 10;

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
        setTimeout(function() {
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

 function endQuiz() {
    var tempTime = time;
    var finalScore = document.createTextNode(tempTime);

    clearInterval(timerId);
    timerEl.textContent = time;
    endScreenEl.removeAttribute("class");
    questionsEl.setAttribute("class", "hide"); 
    scoreEl.appendChild(finalScore);
    console.log(finalScore);

    localStorage.setItem("savedScore", tempTime);
  }

function restartQuiz() {

  //debugger;
  var element = document.getElementById("header");
  
  element.removeAttribute("class");
  endScreenEl.setAttribute("class", "hide");
  currentQuestionIndex = 0;
  timerEl.textContent = "0";
  time = questions.length * 50;
  scoreEl.textContent = " ";

  
}


//pull local storage, add local high score, save back to loal storage (module 4.5.4-5.6)
//save initials create another function to do that 
//clear append on endscreen (remove appendChild*)
//high score array, *list box, push to list box*


     startBtn.onclick = startQuiz;
     tryAgainEl.onclick = restartQuiz;

     //Save initials and score on click
     //submitEl.onclick = ;