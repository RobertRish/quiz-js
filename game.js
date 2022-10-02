const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText= document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: "What is the capital of Canada?",
        choice1: "Ottawa",
        choice2: "Toronto",
        choice3: "Montreal",
        choice4: "Vancouver",
        answer: 1,
    },
    {
        question: "Who invented the internet?",
        choice1: "Geoffrey Hinton",
        choice2: "Vinton Cerf and Bob Kahn",
        choice3: "Alan Turing",
        choice4: "Barbara Liskov",
        answer: 2,
    },
    {
        question: "Who played The Joker in the movie, 'Joker'?",
        choice1: "Herman Cain",
        choice2: "Martin Lawrence",
        choice3: "Donald Rumsfeld",
        choice4: "Joaquin Phoenix",
        answer: 4,
    },
    {
        question: "What is the capital of France?",
        choice1: "Normandy",
        choice2: "Prague",
        choice3: "Paris",
        choice4: "Le Croís",
        answer: 3,
    },
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 4

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('./end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%` 

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target 
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        } 

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
            
        }, 1000)
    })
})

incrementScore = num => { 
    score +=num
    scoreText.innerText = score
}

startGame()
