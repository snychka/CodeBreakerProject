// http://plnkr.co/edit/Xt0fKn51QmJk1jqZvxLl
//

// Okay, just pull down the solution branch. https://github.com/codeschool-projects/CodeBreakerProject/tree/solution then change `let attempt = document.getElementById('attempt');` to `let attempt = document.getElementById('attempt').value` (line 2) as well as change anywhere we use `attempt.value` to be just `attempt` (lines 6, 14, and 22) this will recreate the issue specifically on the attempt variable (edited)

// Oh all of those js changes are on the main.js file in src/assets/main.js. the tests are located in the test folder

let answer = document.getElementById('answer');
answer.type = "visible";
let attempt = document.getElementById('attempt');
let codeClass; 

function guess() {
    let input = document.getElementById('user-guess');
    //add functionality to guess function here
    if (answer.value == '' || attempt.value == '') {
      setHiddenFields();
    }
    if (!validateInput(input.value)) {
      return false;
    }
    attempt.value++;
    // not clear to pass input let along input.value to getResults
    if (getResults(input.value) === true) {
      setMessage("You Win! :)");
      showAnswer(true);
      showReplay();
    } else if (getResults(input.value) === true || attempt.value >= 10){
      setMessage("You Lose! :(");
    } else {
      setMessage("Incorrect, try again.");
      showAnswer(false);
      showReplay();
    }
}


//implement new functions here

function setMessage(m) {
  let message = document.getElementById('message');
  message.innerHTML = m;
}

function validateInput(p) {
  if (p.length != 4) {
    setMessage("Guesses must be exactly 4 characters long.");
  }
  return p.length == 4
}

function getResults(input) {
  let result = '<div class="row"><span class="col-md-6">' + input+ '</span><div class="col-md-6">';
  let right = 0;
  for (var j = 0; j < answer.value.length; j++) {
    let a = answer.value[j];
    let i = input[j];
    if (a == i) {
      result += '<span class="glyphicon glyphicon-ok"></span>';
      right++;
    } else {
      if (answer.value.indexOf(i) >= 0) {
        result += '<span class="glyphicon glyphicon-transfer"></span>';
      } else {
        result += '<span class="glyphicon glyphicon-remove"></span>';
      }
    }
  }
  result += '</div></div>';
  document.getElementById('results').innerHTML = result;
  return right == 4;
}

function showReplay() {
  document.getElementById('guessing-div').style.display = 'none';
  document.getElementById('replay-div').style.display = 'block';
}

function showAnswer(f) {
  let code = document.getElementById('code');
  code.innerHTML = answer.value;
  if (f == true) {
    code.className = codeClass + 'success';
  } else {
    code.className = codeClass + 'failure';
  }
}


function setHiddenFields() {
  var random_number = Math.floor(Math.random() * 10000);
  var answer_value = random_number.toString();
  while (answer_value.length < 4) {
    answer_value = "0" + answer_value;
  }
  answer.value = answer_value;
  attempt.value = 0;
  codeClass =  document.getElementById('code').className + ' ';
}

