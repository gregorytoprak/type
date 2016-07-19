$(document).ready(function() {

  var state = {}
  state.tier = 0
  state.ladder = {}
  var downcase = "etaoinsrhldcumfpgwybvkxjqz./,;1234567890-][`'\\=".split("")
  var upcase   = "ETAOINSRHLDCUMFPGWYBVKXJQZ>?<:!@#$%^&*()_}{~\"|+".split("")
  var chars = [...downcase, ...upcase]
  for (var i in chars) {
    var char = chars[i]
    state.ladder[char] = {step: 0, tier: Math.floor(i/10), due: $.now()}
  }
  state.ladder[" "] = {step: Infinity, tier: Infinity, due: Infinity}

  state.init = true
  $("#front").text("[space]")

  $(document).on("keyup", function() {
    var front
    if (state.init) {
      front = " "
    } else {
      front = $("#front").text()
    }
    var input = $("#input").val()
    if (input.length >= front.length) {
      var highlightColor
      if (input === front) {
        state.ladder[front].step += 1
        highlightColor = "#0a0"
      } else {
        state.ladder[front].step = 0
        highlightColor = "#a00"
      }
      if (state.init) {
        state.init = false
      } else {
        state.ladder[front].due = $.now()+1000*delaySeconds(state.ladder[front].step)
      }
      $("#highlight")
        .css("background-color", highlightColor)
        .fadeIn(0, function() { $("#highlight").fadeOut() })
      setStage()
    }
  })

  function setStage() {
    $("#front").text(pickCard())
    $("#input").val("")
  }

  function delaySeconds(step) {
    return Math.pow(2, step)
  }

  function updateTier() {
    var grow = true
    for (var card in state.ladder) {
      if (state.ladder[card].tier <= state.tier && state.ladder[card].step < 3) {
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
      state.init = true
      return "[space]"
    }
    return randItem(dueCards)
  }

  function randItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

})
