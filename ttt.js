$(document).ready(function() {
  var alphabet = "abcdefghijklmnopqrstuvwxyz".split("")
  var ladder = {}
  for (var i in alphabet) {
    var letter = alphabet[i]
    ladder[letter] = {step: 0, hits: 0}
  }
  var current = ""
  var card = pickCard(ladder)
  $("#prompt").text(card)

  $(document).on("keyup", function() {
    current += event.key
    if (current.length >= card.length) {
      if (current === card) {
        console.log("YES: "+card)
        ladder[card].step += 1
        $("#highlight").css("background-color", "#0a0")
      } else {
        console.log("NO: "+card)
        ladder[card].step = 0
        $("#highlight").css("background-color", "#a00")
      }
      ladder[card].hits += 1
      $("#highlight").fadeIn(0, function() {
        $("#highlight").fadeOut()
      })
      $("input").val("")
      current = ""
      card = pickCard(ladder)
      $("#prompt").text(card)
    }
  })

})

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
