//variables
var pos = 0,
  score = 0;
  correct = 0;
  total_seconds = 60 * 2;
  minutes = parseInt(total_seconds/60);
  seconds = parseInt(total_seconds%60);

//Firebase references
var ref = new Firebase("https://sheshequiz.firebaseio.com/score");
var refTwo = new Firebase("https://sheshequiz.firebaseio.com/answers");
 
//Questions stored in an array
var questions = [
      ["What started WWI?", "I don't know", "Assasination of Heir to the Austrian throne", "Invasion of Poland"],
      ["Who were the Allies in WWI?", "Britain France United States Russia Italy", "Germany Japan", "Africa Asia"],
      ["Which among these belonged to WWII axis powers?", "Russia", "Japan", "Britain"],
      ["When did World War I end?", "September 1945", "November 1918", "August 1939"],
      ["Why did US get involved in WWII?", "After bombing of Pearl Harbor by Japan", "After Winston Lobbying Roosevelt", "They were simply bored"],
      ["Germany was invited to the Treaty of Versailles", "True", "False", "Huh?"],
      ["Who was the leader of Germany before WWI?", "Adolf Hitler", "Kaiser", "Who are these people?"],
      ["How much money did Germany pay as a reparation in WWI ?", "A lot of Money", "100 million dollars", "200 million dollars"],
      ["What does BlitzKrieg mean?", "Santa's Reindeer", "Lightning War", "A War of lights"],
      ["When did World War II end?", "1939", "When it ended, ofcourse", "1945"],
      ["When did the Battle of Bulge happen?", "1914-1915", "1944-1945", "Who Knows"]
];


//Returns the html element required
function elem (x) {
  return document.getElementById(x);
}


//Timer function
function timer() {
  elem("check-time").innerHTML = "<h2>Time left: " + minutes + "minutes " + seconds + "seconds</h2>"

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

//Function that runs immediately the page is loaded. It is the main function.
function renderQuestion () {
  var test = elem("test");

  if (pos >= questions.length) {
    test.innerHTML = "<h2>You got "+ correct +" of " + questions.length +" questions correct. Your score is " + score +"</h2>"
    elem("test_status").innerHTML = "Test Completed<br><br>";
    test.innerHTML += "<p id = 'name'>Please Enter name and Submit score:  </p><input id ='nametext' type ='text'></input><br><br>"
    test.innerHTML += "<button id ='scores' onclick = 'database()'><p id = 'score'>Submit Score</p></button>      "
    test.innerHTML += "<button id ='ranks' onclick = 'rank()'><p id = 'rank'>See Rank</p></button>"
    
    //Re-initialize timer variables for the next restart
    total_seconds = 0;
    minutes = parseInt(total_seconds/60);
    seconds = parseInt(total_seconds%60);
    test.innerHTML += "<button id = 'restart' onclick = 'restart()' ><p id ='start'>Restart</p></button>"
    
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

  test.innerHTML += "<button id ='submit' onclick = 'checkAnswer()'><p id = 'answer'>Submit Answer</p></button>"
}


//Checks the radio button value submitted and compares it with the value on firebase. Increments for every correct ans
function checkAnswer() {

  var choices = document.getElementsByName("choices");

 if (choices[0].checked === false && choices[1].checked === false && choices[2].checked === false) {
      alert("It is compulsory that you answer all the Questions");
      return false;
    }

  for (var i = 0; i < choices.length; i++) {

       
    if (choices[i].checked) {
      var choice = choices[i].value;
    }

  }


refTwo.once("value", function(snapshot) {
    var ans = snapshot.val();

    if (choice === ans[pos]) {
      console.log(choice)
      score += 100;
      correct++;
    }

  });

  pos++
  renderQuestion();
}

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

  total_seconds = 60 * 2;
  minutes = parseInt(total_seconds/60);
  seconds = parseInt(total_seconds%60);
  setTimeout('timer()', 1000);
  renderQuestion();

  
}

//Posting to database function
function database() {
  
  var name = $("#nametext").val() || "Anon";
  console.log(name);
  
  ref.push({name: name, score: score, time: Firebase.ServerValue.TIMESTAMP});

  alert("Submitted:) You can click Rank and see if you've made it to top 10");
  
}

//Ranking the scores function
function rank() {
  ref.orderByChild("score").limitToLast(10).on("child_added", function(snapshot) {
    //test.innerHTML = "<p> The list" + snapshot.val() + "is here</p>"
   var data = (snapshot.val());
   console.log(data);

   if (data.score) {
    var test = elem("test");
    // console.log(data.name + data.score);

       test.innerHTML += "<h2> name:   " + data.name + "    scored: " + data.score + "</h2>"

   }

  });
}



window.addEventListener ("load", renderQuestion, false);
