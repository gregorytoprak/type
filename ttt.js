$(document).ready(function() {

  var rawLadder = [
    [ ["[space]"," "] ],
    [ ["e"],["t"],["a"],["o"],["i"],["n"],["s"],["r"],["h"],["l"] ],
    [ ["d"],["c"],["u"],["m"],["f"],["p"],["g"],["w"],["y"],["b"] ],
    [ ["v"],["k"],["x"],["j"],["q"],["z"] ],
    [ ["1"],["2"],["3"],["4"],["5"],["6"],["7"],["8"],["9"],["0"] ],
    [ ["."],["/"],[","],[";"],["-"],["]"],["["],["`"],["'"],["\\"],["="] ],
    [ ["E"],["T"],["A"],["O"],["I"],["N"],["S"],["R"],["H"],["L"] ],
    [ ["D"],["C"],["U"],["M"],["F"],["P"],["G"],["W"],["Y"],["B"] ],
    [ ["V"],["K"],["X"],["J"],["Q"],["Z"] ],
    [ ["!"],["@"],["#"],["$"],["%"],["^"],["&"],["*"],["("],[")"] ],
    [ [">"],["?"],["<"],[":"],["_"],["}"],["{"],["~"],["\""],["|"],["+"] ]
  ]

  var randomItem = (a) => a[Math.floor(Math.random()*a.length)]

  class Card {
    constructor(front, back = front) {
      this.front = front
      this.back = back
      this.hits = 0
      this.due = $.now()
    }
  }

  class State {
    constructor() {
      this.ladder = rawLadder.map( (rawTier) => rawTier.map( (rawCard) => new Card(...rawCard) ) )
      this.step = 0
    }
    transition() {
      if (this.ladder[this.step].every( (card) => (card.hits >= 1) )) { this.step += 1 }

      var dueCards = this.ladder[this.step].filter( (card) => (card.due <= $.now()) )
      this.card = randomItem(dueCards)
      $("#front").text(this.card.front)
      $("#input").val("")
    }
  }

  var state = new State()
  state.transition()

  $(document).on("keyup", function() {
    var input = $("#input").val()
    if (input.length >= state.card.back.length) {
      var highlightColor
      if (input === state.card.back) {
        state.card.hits += 1
        highlightColor = "#0a0"
      } else {
        state.card.hits = 0
        highlightColor = "#a00"
      }
      state.card.due = $.now()+1000*Math.pow(2, state.card.hits)
      $("#highlight")
        .css("background-color", highlightColor)
        .fadeIn(0, function() { $("#highlight").fadeOut() })

      state.transition()
    }
  })

})
