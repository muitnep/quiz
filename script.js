//Initial Data
let currentQuestion = 0
let correctAnswers = 0

showQuestion()

//Events
document.querySelector('.scoreArea button').addEventListener('click', resetQuiz)
//Functions
function showQuestion() {
  if (questions[currentQuestion]) {
    let q = questions[currentQuestion]

    let pct = Math.floor((currentQuestion / questions.length) * 100)

    document.querySelector('.progress--bar').style.width = `${pct}%`

    document.querySelector('.scoreArea').style.display = 'none'
    document.querySelector('.questionArea').style.display = 'block'

    document.querySelector('.question').innerHTML = q.question
    document.querySelector('.options').innerHTML = ''

    //Melhor perfomance em buscar um elemento do DOM
    let optionsHTML = ''
    for (let i in q.options) {
      optionsHTML += `<div data-op="${i}" class="option"><span>${
        parseInt(i) + 1
      }</span>${q.options[i]}</div>`
    }
    document.querySelector('.options').innerHTML = optionsHTML
    document.querySelectorAll('.options .option').forEach(item => {
      item.addEventListener('click', optionClickEvent)
    })
  } else {
    //Acabaram as questões
    finishQuiz()
  }
}

function optionClickEvent(e) {
  let clickedOption = parseInt(e.target.getAttribute('data-op'))

  if (questions[currentQuestion].answer === clickedOption) {
    correctAnswers++
  }

  currentQuestion++

  showQuestion()
}

function finishQuiz() {
  let points = Math.floor((correctAnswers / questions.length) * 100)

  if (points < 30) {
    document.querySelector('.scoreText1').innerHTML = `Tá osso né?!?`
    document.querySelector('.scorePct').style.color = `red`
  } else if (points >= 30 && points < 70) {
    document.querySelector('.scoreText1').innerHTML = `Muito bom!!!?`
    document.querySelector('.scorePct').style.color = `yellow`
  } else if (points >= 70) {
    document.querySelector('.scoreText1').innerHTML =
      'Eh disso que eu to falando, parabéns!!!?'
    document.querySelector('.scorePct').style.color = `lightgreen`
  }

  document.querySelector('.scorePct').innerHTML = `Acertou ${points}%`
  document.querySelector(
    '.scoreText2'
  ).innerHTML = `Voce respondeu ${questions.length} questões e acertou ${correctAnswers}`

  document.querySelector('.scoreArea').style.display = 'block'
  document.querySelector('.questionArea').style.display = 'none'
  document.querySelector('.progress--bar').style.width = '100%'
}

function resetQuiz() {
  correctAnswers = 0
  currentQuestion = 0

  showQuestion()
}
