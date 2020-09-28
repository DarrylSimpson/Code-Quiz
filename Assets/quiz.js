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
              "What did Pam and Angela both name their babies?",
            choices: ["Phillip", "Andrew", "James", "William"],
            answer: "Phillip"
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
     var textFinalEl = document.getElementById("final-text");
     
     var highScoresEl = document.getElementById("high-scores-screen");
     var currentScoreEl = document.getElementById("high-scores");
     var numberScoreEl = document.getElementById("high-score-number");
     var overTextEl = document.getElementById("over-text");

     var inputBoxEl = document.getElementById("input-box");


     //Setting time for quiz based on how many questions there are. 50 seconds per question
     var time = questions.length * 50;
     var timerId;
     //var tempTime = time;



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

  }

function restartQuiz() {

  var element = document.getElementById("header");
  
  element.removeAttribute("class");
  endScreenEl.setAttribute("class", "hide");
  currentScoreEl.setAttribute("class", "hide");
  inputBoxEl.removeAttribute("class");
  textFinalEl.removeAttribute("class");
  overTextEl.innerHTML = "QUIZ OVER!!";


  currentQuestionIndex = 0;
  timerEl.textContent = "0";
  time = questions.length * 50;
  scoreEl.textContent = " ";


  
}

function scoreSave() {
  var highScores = JSON.parse(localStorage.getItem("highscores")) || [];
  
  var tempScore = highScores;
  var scoreList = document.createTextNode(tempScore);
  
  tempTime = time; 
  console.log(scoreList);
  
  var submittedScore = {
    name: initialsEl.value,
    score: tempTime
  };
  
 
  var list = document.createElement("ul");
  highScores.forEach(function (highScores) {
    var li = document.createElement("li");
    li.textContent = highScores;
    list.appendChild(li);
  });

  
  highScores.push(submittedScore);
  localStorage.setItem("highscores", JSON.stringify(highScores));
  console.log(submittedScore);
  currentScoreEl.removeAttribute("class");
  inputBoxEl.setAttribute("class", "hide");
  textFinalEl.setAttribute("class", "hide");
  overTextEl.innerHTML = "High Scores!";
  

  highScores.toString();

  //scoreEl.appendChild("p");
  //window.location.href = "highscores.html"

  //currentScoreEl.append();
  currentScoreEl.appendChild(list);
  //currentScoreEl.append(submittedScore.name);
  //currentScoreEl.append(submittedScore.score);


  

}



     startBtn.onclick = startQuiz;
     tryAgainEl.onclick = restartQuiz;
     submitEl.onclick = scoreSave;
