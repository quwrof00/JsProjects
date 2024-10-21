const questions = [
    {
        question: "Why is VIT better than IIT Delhi? (pov: you are vit student)",
        answers: [
            {text: "It's not lmao",correct: false},
            {text: "Rigged rankings",correct: false},
            {text: "Gender ratio",correct: false},
            {text: "Higher quality education and better personality growth",correct: true}
        ]
    },
    {
        question: "Just pick option 1.",
        answers: [
            {text: "option 2",correct: false},
            {text: "option 4",correct: false},
            {text: "option 3",correct: false},
            {text: "option 1",correct: true}
        ]
    }
]

const questionElement = document.querySelector('#question');
const answerElements = document.querySelector('#answer-buttons');
const nextButton = document.querySelector('#next-button');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    resetState();
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = 'Next';
    showQuestion(); 
}

function showQuestion(){
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(function(answer){
        const button = document.createElement('button');
        button.innerHTML = answer.text;
        button.classList.add('btn');
        answerElements.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click',selectAnswer);
    })
}

function resetState(){
    nextButton.style.display = 'none';
    while(answerElements.firstChild){
        answerElements.removeChild(answerElements.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add('Correct');
        score++;
    }else{
        selectedBtn.classList.add('Incorrect');
    }
    Array.from(answerElements.children).forEach(function(button){
        if(button.dataset.correct === 'true'){
            button.classList.add("Correct");
        }
        button.disabled = true;
    })
    nextButton.style.display = 'block';
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = 'Play Again';
    nextButton.style.display = 'block';
}

function handleNextButton(){
    resetState();
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener('click',function(){
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})
startQuiz();
