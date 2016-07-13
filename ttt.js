$(document).ready(function() {

  var state = {}
  state.tier = 0
  state.ladder = {}
  var cards = "etaoinsrhldcumfpgwybvkxjqz./,;".split("")
  for (var i in cards) {
    var card = cards[i]
    state.ladder[card] = {step: 0, tier: Math.floor(i/10), due: $.now()}
  }

  setStage()

  $(document).on("keyup", function() {
    var card = $("#card").text()
    var input = $("#input").val()
    if (input.length >= card.length) {
      var highlightColor
      if (input === card) {
        state.ladder[card].step += 1
        highlightColor = "#0a0"
      } else {
        state.ladder[card].step = 0
        highlightColor = "#a00"
      }
      state.ladder[card].due = $.now()+1000*delaySeconds(state.ladder[card].step)
      $("#highlight")
        .css("background-color", highlightColor)
        .fadeIn(0, function() { $("#highlight").fadeOut() })
      setStage()
    }
  })

  function setStage() {
    $("#card").text(pickCard())
    $("#input").val("")
  }

  function delaySeconds(step) {
    return Math.pow(2, step)
  }

  function updateTier() {
    var grow = true
    for (var card in state.ladder) {
      if (state.ladder[card].tier <= state.tier && state.ladder[card].step < 5) {
        grow = false
      }
    }
    if (grow) {
      state.tier += 1
    }
  }

  function pickCard() {
    updateTier()
    var dueCards = []
    for (var card in state.ladder) {
      if (state.ladder[card].tier <= state.tier && state.ladder[card].due  <= $.now()) {
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

})
