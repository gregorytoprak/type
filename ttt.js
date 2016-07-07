$(document).ready(setStage)

$(document).on("keyup", update)

var ladder = makeLadder()

function makeLadder() {
  var cards = "abcdefghijklmnopqrstuvwxyz".split("")
  var ladder = {}
  for (var i in cards) {
    var card = cards[i]
    ladder[card] = {step: 0, hits: 0}
  }
  return ladder
}

function update() {
  var card = $("#prompt").text()
  var current = $("#input").val()
  if (current.length >= card.length) {
    if (current === card) {
      ladder[card].step += 1
      $("#highlight").css("background-color", "#0a0")
    } else {
      ladder[card].step = 0
      $("#highlight").css("background-color", "#a00")
    }
    ladder[card].hits += 1
    $("#highlight").fadeIn(0, function() {
      $("#highlight").fadeOut()
    })
    setStage()
  }
}

function setStage() {
  $("#prompt").text(pickCard(ladder))
  $("#input").val("")
}

function pickCard(ladder) {
  var currStep = Infinity
  var currHits = Infinity
  var currBest = []
  for (var card in ladder) {
    var step = ladder[card].step
    var hits = ladder[card].hits
    if (step < currStep || (step === currStep && hits < currHits)) {
      // improves
      currStep = step
      currHits = hits
      currBest = [card]
    } else if (step === currStep && hits === currHits) {
      // ties
      currBest.push(card)
    }
  }
  if (ladder[currBest[0]].step >= 1) {
    return ""
  }
  return randItem(currBest)
}

function randItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
