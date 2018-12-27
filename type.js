$(document).ready(function() {
  var rawLadder = `e t a o i n s r h l
e t a o i n s r h l d c u m f p g w y b
e t a o i n s r h l d c u m f p g w y b v k x j q z
E T A O I N S R H L D C U M F P G W Y B V K X J Q Z
1 2 3 4 5 6 7 8 9 0
! @ # $ % ^ & * ( ) [ ] \` \\ \' = / ; , . - { } ~ | \" + ? : < > _
th he in er an re on at en nd
the and ing ion tio ent ati for her ter`
    .split("\n")
    .map((line) => line.split(" "))

  var color = { red: "#e74c3c", green: "#2ecc71", blue: "#3498db" } // https://flatuicolors.com/

  function randomItem(array) {
    return array[Math.floor(array.length * Math.random())]
  }

  function due(box = 0) {
    return $.now() + 1000 * Math.pow(3, box)
  }

  class Card {
    constructor(face, back = face) {
      this.face = face
      this.back = back
      this.box = 0
      this.due = due()
    }
  }

  class State {
    constructor() {
      this.ladder = rawLadder.map((rawTier) =>
        rawTier.map((cardFace) => new Card(cardFace)),
      )
      this.highlightColor = color.blue
      this.step = 0
      this.advance = true
      this.manualTierSet()
    }
    manualTierSet() {
      var oldStep = this.step
      this.step = parseInt($("#tier-selector").val())
      this.advance = $("#advance").is(":checked")
      if (oldStep !== this.step) {
        this.highlightColor = color.blue
      }
      this.transition()
      $("#input").focus()
    }
    keyup() {
      this.input = $("#input").val()
      if (this.input.length < this.card.back.length) {
        return
      }
      if (this.input === this.card.back) {
        this.card.box += 1
        this.highlightColor = color.green
      } else {
        this.card.box = 0
        this.highlightColor = color.red
      }
      this.card.due = due(this.card.box)

      this.transition()
    }
    transition() {
      if (this.ladder[this.step].every((card) => card.box >= 3)) {
        this.ladder[this.step].forEach((card) => {
          card.box = 0
          card.due = due()
        })
        if (this.advance) {
          this.step += 1
        }
        if (this.step >= this.ladder.length) {
          this.step = 0
        }
        this.highlightColor = color.blue
        $("#tier-selector").val(this.step.toString())
      }

      $("#highlight")
        .css("background-color", this.highlightColor)
        .fadeIn(0, function() {
          $("#highlight").fadeOut()
        })

      // get a random due card, or if none, the next soonest card due
      this.card = randomItem(
        this.ladder[this.step].filter((card) => card.due <= due()),
      )
      if (this.card === undefined) {
        this.card = this.ladder[this.step].reduce(
          (acc, cur) => (acc.due < cur.due ? acc : cur),
          Infinity,
        )
      }

      $("#face").text(this.card.face)
      $("#input").val("")
    }
  }

  var state = new State()
  $("#settings").change(state.manualTierSet.bind(state))
  $(document).on("keyup", state.keyup.bind(state))
})
