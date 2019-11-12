// JavaScript vars and functions listed below

// Vars listed for functions below

var startBtnEl = document.querySelector("#startBtn");
var quizQuestionsEl = document.querySelector("#qQues");
var possAnsEl = document.querySelector("#possAnsBtns");
var resultEl = document.querySelector("#result");
var scoreEl = 0;
var answersEl;
var timerEl = document.querySelector("#timer");
var initialsList = document.querySelector("#userInitials");
var scoreList = document.querySelector("#highScores");
var submitInitials = document.querySelector("#submitInitials");
var finalEl;
var userInfo = [];
var scoreInfo = [];
var highscoresEl = document.querySelector("#highScoresBtn");

document.getElementById("startBtn").onclick = function (myQuiz) {
    disableButton();
    renderMyQuiz();
    setTimer();
}
var timeLeft = 0;
var stopTimer = false;

function setTimer() {
    timeLeft = (questions.length * 15);
    var timerInt = setInterval(function () {
        timeLeft--;
        timerEl.textContent = timeLeft + " seconds left";
        if (timeLeft === 0) {
            clearInterval(timerInt);
            alert("You're final score is: " + scoreEl);
            ResultsFun();
        }
        if (stopTimer == true) {
            clearInterval(timerInt);
        }
    }, 1000);
}
var Counter = 0;
var myQues = questions.length - 1;

function renderMyQuiz() {
    if (Counter <= myQues) {
        var currentQ = questions[Counter].title;
        quizQuestionsEl.innerHTML = currentQ;


        var btn1 = document.getElementById("btn1");
        btn1.textContent = questions[Counter].choices[0];
        btn1.style.display = "inline";
        possAnsEl.appendChild(btn1);

        var btn2 = document.getElementById("btn2");
        btn2.textContent = questions[Counter].choices[1];
        btn2.style.display = "inline";
        possAnsEl.appendChild(btn2);

        var btn3 = document.getElementById("btn3");
        btn3.textContent = questions[Counter].choices[2];
        btn3.style.display = "inline";
        possAnsEl.appendChild(btn3);

        var btn4 = document.getElementById("btn4");
        btn4.textContent = questions[Counter].choices[3];
        btn4.style.display = "inline";
        possAnsEl.appendChild(btn4);
    }
    else {
        stopTimer = true;
        ResultsFun();
    }
}
possAnsEl.addEventListener("click", function (event) {
    if (event.target.textContent == questions[Counter].answer) {
        alert("You're Correct!!!");
        scoreEl++;
    }
    else {
        alert("Not this time!!!");
    }
    Counter++;
    renderMyQuiz();
})
function disableButton() {
    document.getElementById("quizGo").style.display = "none";
}
function ResultsFun() {
    possAnsEl.style.display = "none";
    quizQuestionsEl.style.display = "none";
    var showScore = document.getElementById("score");
    var txt = document.getElementById("result");
    txt.textContent = "Anddd Done!!! Check Your Score Out."
    showScore.style.display = "block";
    showScore.textContent = "Calculate Score";
    resultEl.appendChild(showScore);
}

document.getElementById("score").onclick = function (myQuiz) {
    score = scoreEl * 10;
    var timeBonus = 0;
    if (timeLeft >= 50) {
        timeBonus = 25;
    }
    else {
        timeBonus = 0;
    }
    finalEl = score + timeBonus;
    yourScore.textContent = "Final Score is " + finalEl;
    input.style.display = "block";
}

function storeInitials() {
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
}
function storeScores() {
    localStorage.setItem("scoreInfo", JSON.stringify(scoreInfo));
}

highscoresEl.addEventListener("click", function (event) {
    event.preventDefault();
    highScore();
    highScorePoints();
});
submitInitials.addEventListener("click", function (event) {
    event.preventDefault();
    var userInitials = userInput.value.trim();
    if (userInitials === "") {
        return;
    }
    userInfo.push(userInitials);
    scoreInfo.push(finalEl);
    userInput.value = "";
    storeInitials();
    storeScores();
});
function highScore() {
    var savedInitials = JSON.parse(localStorage.getItem("userInfo"));
    if (savedInitials !== null) {
        userInfo = savedInitials;
    }
    renderUserInitials();
}
function renderUserInitials() {
    initialsList.innerHTML = "";
    for (var i = 0; i < userInfo.length; i++) {
        var user = userInfo[i];
        var li = document.createElement("li");
        li.textContent = user;
        li.setAttribute("data-index", i);
        initialsList.appendChild(li);
    }
}
function highScorePoints() {
    var storedScores = JSON.parse(localStorage.getItem("scoreInfo"));

    if (storedScores !== null) {
        scoreInfo = storedScores;
    }
    renderUserScores();
}
function renderUserScores() {
    scoreList.innerHTML = "";
    for (var i = 0; i < scoreInfo.length; i++) {
        var score = scoreInfo[i];
        var li = document.createElement("li");
        li.textContent = score;
        li.setAttribute("data-index", i);
        scoreList.appendChild(li);
    }
}