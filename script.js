// count down function
// I know it's not good to use set interval for time related scenarios, but I deliberately used it.
var timer;
var countDownTimer = function (number, message) {
  var count = number;
  timer = window.setInterval(function () {
    if (count > 0) {
      $('#time-left').css('color', '#054003')
      $('#time-left').text(--count);
    } else {
      window.clearInterval(timer)
      $('#time-left').text('Game Over').css('color', 'red')
      if ($('#current-score').text() > $('#high-score').text()) {
        $('#high-score').text($('#current-score').text())
      }
      $('#current-score').text('0')
      $('#restart').css('display', 'inline')
    }
  }, 1000)
}

// get random question  
var randomQuestionTeller = function () {
  // make range array from the last argument
  var rangeArray = _.range(1, arguments[arguments.length - 1]);
  // make array of arithmatic operators
  var arithmaticArray = [];
  for (var i = 0; i < arguments.length - 1; i++) {
    arithmaticArray.push(arguments[i])
  }
  // get two numbers and sort
  var randomArray = [];
  randomArray.push(_.sample(rangeArray));
  randomArray.push(_.sample(rangeArray));
  randomArray = randomArray.sort(function (a, b) {
    return b - a;
  });

  var randomQuestion = randomArray[0] + ' ' + _.sample(arithmaticArray) + ' ' + randomArray[1];
  $('#question').text(randomQuestion);
  return randomQuestion;
}

// caculate question function 
var resultCalculator = function (string) {
  for (var i = 0; i < string.length; i++) {
    if (string[i] === '+') {
      var number = Number(string.slice(0, i)) + Number(string.slice(i+1));
      return number;
    } else if (string[i] === '-') {
      var number = Number(string.slice(0, i)) - Number(string.slice(i+1));
      return number;
    } else if (string[i] === 'x') {
      var number = Number(string.slice(0, i)) * Number(string.slice(i+1));
      return number;
    } else if (string[i] ===  '/') {
      var number = Number(string.slice(0, i)) / Number(string.slice(i+1));
      return number;
    }
  }
}

// start game function
var startGame = function () {
   // give the value of range to it's corresponding element
   var range = Number($('[type=range]').val());
   $('#range').text($('[type=range]').val())
   $('[type=range]').on('input', function () {
     $('#range').text($(this).val())
     range =  Number($('[type=range]').val());
   })
  
   // get question
  randomQuestionTeller('+', range);
  $('#restart').css('display', 'none')
  $('input[type=number]').on('input', function () {
    window.clearInterval(timer)
    countDownTimer(Number($('#time-left').text()))
    var input = $(this).val();
    var result = String(resultCalculator($('#question').text()));

    // if result is correct display onother question and make possible changes
    if (input === result) {
      // update the question
      randomQuestionTeller('+', range)
      // update current score
      $('#current-score').text(Number($('#current-score').text()) + 1);
      $('input[type=number]').val('')
      // add 1 for the time remaining
      $('#time-left').text(Number($('#time-left').text()) + 1)
      window.clearInterval(timer)
      countDownTimer(Number($('#time-left').text()))
    }
  })
 
}
$(document).ready(function () {
  // start the game
  startGame();

  //restart the game;
  $('#restart').click(function () {
    $('#time-left').text('10');
    $('#time-left').css('color', '#054003')
    startGame()
  })
})