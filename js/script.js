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
  score = 300;
  correct = 0;

//Firebase
var ref = new Firebase("https://sheshequiz.firebaseio.com");
 

var questions = [
      ["What started WWI?", "I don't know", "Assasination of Heir to the Austrian throne", "Invasion of Poland", "B"],
      ["Who were the Allies in WWI?", "Britain France United States Russia Italy", "Germany Japan", "Africa Asia", "A"],
      ["Which among these belonged to WWII axis powers?", "Russia", "Japan", "Britain", "A"],
      ["When did World War I end?", "September 1945", "November 1918", "August 1939", "B"],
      ["When did US get involved in WWII?", "After bombing of Pearl Harbor by Japan", "After Winston Lobbying Roosevelt", "They just hopped in", "A"],
      ["Germany was invited to the Treaty of Versailles", "True", "False", "Huh?", "B"],
      ["Who was the leader of Germany before WWI?", "Adol Hitler", "Stalin", "Kaiser", "C"],
      ["How much money did Germany pay as a reparation in WWI ?", "A lot of Money", "100 million dollars", "200 million dollars", "B"],
      ["What does BlitzKrieg mean?", "Santa's Reindeer", "Lightning War", "A War of lights", "B"],
      ["When did World War II end?", "1939", "1918", "1945", "C"],
      ["When did the Battle of Bulge happen?", "1914-1915", "1944-1945", "Who Knows", "B"]
];

function elem (x) {
  return document.getElementById(x);
}

function renderQuestion () {
  test = elem("test");

  if (pos >= questions.length) {
    test.innerHTML = "<h2>You got "+ correct +" of " + questions.length +" questions correct. Your score is " + score +"</h2>"
    elem("test_status").innerHTML = "Test Completed";
    test.innerHTML += "<button id ='rank' onclick = 'database()'>See Ranking</button>      "
    pos = 0;
    correct =0
    test.innerHTML += "<button id = 'restart' onclick = 'renderQuestion()'>Restart</button>"
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
  test.innerHTML += "<button onclick = 'checkAnswer()'><p>Submit Answer</p></button>"
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
    score += 100;
  }

  pos++
  renderQuestion();
}

function database() {
  ref.push({score: score})
}


window.addEventListener ("load", renderQuestion, false);