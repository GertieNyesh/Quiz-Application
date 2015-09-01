//variables
var pos = 0,
  test,
  test_status,
  question,
  choice,
  choices,
  chA,
  chB,
  chC,
  correct = 0;

var questions = [
      ["What is 1 + 1 ?", "1", "3", "2", "C"],
      ["What is my nick-name?", "Gert", "Sheshe", "Shiko", "B"],
      ["What is 7 + 7?", "14", "12", "13", "A"],
      ["What is Zero Factorial?", "0", "1", "00", "B"]
];

function elem (x) {
  return document.getElementById(x);
}

function renderQuestion () {
  test = elem("test");

  if (pos >= questions.length) {
    test.innerHTML = "<h2>You got "+ correct +" of " + questions.length +" questions correct</h2>"
    elem("test_status").innerHTML = "Test Completed";
    // pos = 0;
    // correct =0
    return false;
  }

  elem("test_status").innerHTML = "<h2>Question " +(pos + 1) + " of " + questions.length + "</h2>";
  question = questions[pos][0];
  chA = questions[pos][1];
  chB = questions[pos][2];
  chC = questions[pos][3];
  test.innerHTML = "<h3>"+ question +"</h3>";
  test.innerHTML += "<input type ='radio' name = 'choices' value = 'A'>" + chA + "<br>"
  test.innerHTML += "<input type ='radio' name = 'choices' value = 'B'>" + chB + "<br>"
  test.innerHTML += "<input type ='radio' name = 'choices' value = 'C'>" + chC + "<br><br>"
  test.innerHTML += "<button onclick = 'checkAnswer()'>Submit Answer</button>"
}

function checkAnswer() {
  choices = document.getElementsByName("choices");

  for (var i = 0; i < choices.length; i++) {
    if (choices[i].checked) {
      choice = choices[i].value;
    }
  }

  if (choice === questions[pos][4]) {
    correct++;
  }

  pos++
  renderQuestion();
}

window.addEventListener ("load", renderQuestion, false);