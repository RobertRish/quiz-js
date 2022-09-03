const question = document.querySelector('#question');
const chioces = Array.from(document.querySelectorAll('#.chioce-text'));
const progressText = document.querySelector('#progressText');
const scoreText= document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0;
let availableQuestions = []

let questions = [
    {
        question: 'What is ?',
        choice1: '1',
        choice2: '2',
        choice3: '3',
        choice4: 'a;owefij',
        answer: 2
    },
    {
        question: 'What is it?',
        choice1: '1',
        choice2: '2e',
        choice3: '3',
        choice4: 'a;owefij',
        answer: 2
    },
    {
        question: 'What is bulg?',
        choice1: '1',
        choice2: '2',
        choice3: '3',
        choice4: 'a;owefij',
        answer: 2
    },
    {
        question: 'What is fun ?',
        choice1: '1',
        choice2: '2',
        choice3: '3',
        choice4: 'a;owefij',
        answer: 2
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 4

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestions()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%` 

    const questionsIndex = MAth.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionIndex]
    question.innerText = currentQuestion.question

    chioces.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

chioces.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.targetconst 
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