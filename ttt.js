$(document).ready(function() {

  var rawLadder = [
    "e t a o i n s r h l",
    "d c u m f p g w y b",
    "v k x j q z",
    "th he in er an re on at en nd",
    "the and ing ion tio ent ati for her ter",
    "tion atio that ther with ment ions this here from",
    "1 2 3 4 5 6 7 8 9 0",
    "; / , . - [ ] \\ ' ` =",
    "E T A O I N S R H L",
    "D C U M F P G W Y B",
    "V K X J Q Z",
    "! @ # $ % ^ & * ( )",
    ": ? < > _ { } | \" ~ +"
  ]

  function randomItem(array) {
    return array[ Math.floor(array.length * Math.random()) ]
  }

  class Card {
    constructor(face, back = face) {
      this.face = face
      this.back = back
      this.hits = 0
      this.due = $.now()
    }
  }

  class State {
    constructor() {
      this.ladder = rawLadder.map( (tierString) => tierString.split(" ").map( (cardFace) => new Card(cardFace) ) )
      this.step = 0
      this.highlightColor = "#00a"
      this.transition()
    }
    keyup() {
      this.input = $("#input").val()
      if (this.input.length < this.card.back.length) {
        return
      }
      if (this.input === this.card.back) {
        this.card.hits += 1
        this.highlightColor = "#0a0"
      } else {
        this.card.hits = 0
        this.highlightColor = "#a00"
      }
      this.card.due = $.now()+1000*Math.pow(2, this.card.hits)

      this.transition()
    }
    transition() {
      $("#highlight")
        .css("background-color", this.highlightColor)
        .fadeIn(0, function() { $("#highlight").fadeOut() })

      if (this.ladder[this.step].every( (card) => card.hits >= 1 )) {
        this.step += 1
      }

      this.card = randomItem( this.ladder[this.step].filter( (card) => card.due <= $.now() ) )
      if (this.card === undefined) {
        this.card = this.ladder[this.step].reduce( (acc, cur) => (acc.due < cur.due) ? acc : cur, Infinity)
      }

      $("#face").text(this.card.face)
      $("#input").val("")
    }
  }

  var state = new State()
  $(document).on("keyup", state.keyup.bind(state))

})
