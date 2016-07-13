$(document).ready(setStage)

$(document).on("keyup", update)

var ladder = makeLadder()

function makeLadder() {
  var cards = "abcdefghijklmnopqrstuvwxyz;,./".split("")
  var ladder = {}
  for (var i in cards) {
    var card = cards[i]
    ladder[card] = {step: 0, due: $.now()}
  }
  return ladder
}

function update() {
  var card = $("#card").text()
  var input = $("#input").val()
  if (input.length >= card.length) {
    var highlightColor
    if (input === card) {
      ladder[card].step += 1
      highlightColor = "#0a0"
    } else {
      ladder[card].step = 0
      highlightColor = "#a00"
    }
    ladder[card].due = $.now()+1000*delaySeconds(ladder[card].step)
    $("#highlight")
      .css("background-color", highlightColor)
      .fadeIn(0, function() { $("#highlight").fadeOut() })
    setStage()
  }
}

function setStage() {
  $("#card").text(pickCard(ladder))
  $("#input").val("")
}

function delaySeconds(step) {
  return Math.pow(2, step)
}

function pickCard(ladder) {
  var dueCards = []
  for (var card in ladder) {
    if (ladder[card].due < $.now()) {
      dueCards.push(card)
    }
  }
  if (dueCards.length === 0) {
    return "WIN"
  }
  return randItem(dueCards)
}

function randItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
