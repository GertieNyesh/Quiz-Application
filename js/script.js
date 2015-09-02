
 //variables
var pos = 0,
  //test,
  test_status,
  score = 0;
  correct = 0;
  total_seconds = 60 * 1;
  minutes = parseInt(total_seconds/60);
  seconds = parseInt(total_seconds%60);

//Firebase
var ref = new Firebase("https://sheshequiz.firebaseio.com/score");
var refTwo = new Firebase("https://sheshequiz.firebaseio.com/answers");
 

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
  var test = elem("test");

  if (pos >= questions.length) {
    test.innerHTML = "<h2>You got "+ correct +" of " + questions.length +" questions correct. Your score is " + score +"</h2>"
    elem("test_status").innerHTML = "Test Completed";
    test.innerHTML += "<input id ='name' type ='text'<label>Please Enter your name and submit score:   <label>"
    test.innerHTML += "<button id ='score' onclick = 'database()'>Submit Score</button>      "
    test.innerHTML += "<button id ='rank' onclick = 'rank()'>See Rank</button>"

    // pos = 0;
    // score = 0;
    // correct = 0;
    
    total_seconds = 0;
    minutes = parseInt(total_seconds/60);
    seconds = parseInt(total_seconds%60);
    test.innerHTML += "<button id = 'restart' onclick = 'restart()' onclick ='timer()'>Restart</button>"
    
    return false;
  }

  
  elem("test_status").innerHTML = "<h2>Question " +(pos + 1) + " of " + questions.length + "</h2>";
  var question = questions[pos][0];
  var chA = questions[pos][1];
  var chB = questions[pos][2];
  var chC = questions[pos][3];
  test.innerHTML = "<h3>"+ question +"</h3><br><br>";

  test.innerHTML += "<input type ='radio' name = 'choices' value = 'A'>  <label>" + chA + "</label><br><br>"

  test.innerHTML += "<input type ='radio' name = 'choices' value = 'B'>  <label>" + chB + "</label><br><br>"

  test.innerHTML += "<input type ='radio' name = 'choices' value = 'C'>  <label>" + chC + "</label><br><br>"

  test.innerHTML += "<button id ='submit' onclick = 'checkAnswer()'><p>Submit Answer</p></button>"
}

function checkAnswer() {
  var choices = document.getElementsByName("choices");

 

  for (var i = 0; i < choices.length; i++) {

  
    if (choices[i].checked) {
      var choice = choices[i].value;
    }

  }

   ref.once("value", function(snapshot) {
      
      snapshot.forEach(function(childSnapshot) {
       
        var key = childSnapshot.key();
       
        var childData = childSnapshot.val();

        if (choice === childData.value) {

          correct++;
          score += 100;
        }
      });
    });

  
       

  // if (choice === questions[pos][4]) {
    
  // }

  pos++
  renderQuestion();
}


//Timer function
function timer() {
  elem("check-time").innerHTML = "Time left: " + minutes + "minutes " + seconds + "seconds"

  if (total_seconds <= 0) {
    setTimeout('submit()', 1)
  }

  else {
    total_seconds = total_seconds - 1;
    minutes = parseInt(total_seconds/60);
    seconds = parseInt(total_seconds%60);
    setTimeout('timer()', 1000);
  }
}

setTimeout('timer()', 1000);

//function after time ends
function submit() {
  pos = 12;
  renderQuestion();
}

//function to restart
function restart() {
  pos = 0;
  score = 0;
  correct = 0;

  total_seconds = 60 * 1;
  minutes = parseInt(total_seconds/60);
  seconds = parseInt(total_seconds%60);
  setTimeout('timer()', 1000);
  renderQuestion();

  
}

//Posting to database function
function database() {
  
  var name = $("#name").val() || "anon";
  
  ref.push({name: name, score: score, time: Firebase.ServerValue.TIMESTAMP});
  
}

//Ranking the scores function
function rank() {
  ref.orderByChild("score").on("child_added", function(snapshot) {
    //test.innerHTML = "<p> The list" + snapshot.val() + "is here</p>"
   var data = (snapshot.val());
   console.log(data);

   if (data.score) {
    var test = elem("test");
    // console.log(data.name + data.score);

       test.innerHTML += "<h2> name:   " + data.name + "    score: " + data.score + "</h2>"

   }

  });
}

window.addEventListener ("load", renderQuestion, false);
