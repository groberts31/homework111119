// JavaScript vars and functions listed below

var startBtnEl = document.querySelector("#startBtn");
var quizQuestionsEl = document.querySelector("#qQues");
var possAnsEl = document.querySelector("#possAnsBtns");
var resultEl = document.querySelector("#result");
var scoreEl = 0;
var answersEl;
var timerEl = document.querySelector("#timer");


document.getElementById("startBtn").onclick = function (myQuiz) {
    disableButton();
    renderMyQuiz();
    setTimer();
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
    alert(scoreEl);
}

var timeLeft = 0;
var ended = false;
function setTimer(){
  timeLeft = (questions.length * 15);
  var timerInt = setInterval(function(){
    timeLeft--;
    timerEl.textContent = timeLeft + " seconds left";
    if (ended == true){
      clearInterval(timerInt);
    }
    if (timeLeft == 0){
      clearInterval(timerInt);
      alert("You're final score is: " + scoreEl);
      ResultsFun();
    }
  }, 1000);
}