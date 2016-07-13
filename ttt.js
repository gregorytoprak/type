$(document).ready(setStage)

$(document).on("keyup", update)

var ladder = makeLadder()

function makeLadder() {
  // var cards = "abcdefghijklmnopqrstuvwxyz;,./".split("")
  var cards = "asd".split("")
  var ladder = {}
  for (var i in cards) {
    var card = cards[i]
    ladder[card] = {step: 0}
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

function pickCard(ladder) {
  var currWorst
  var currStep = Infinity
  for (var card in ladder) {
    var step = ladder[card].step
    if (step < currStep) {
      currStep = step
      currWorst = []
    }
    if (step <= currStep) {
      currWorst.push(card)
    }
  }
  return randItem(currWorst)
}

function randItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
