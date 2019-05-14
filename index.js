var questionNumber = -1;
var totalQuestions = questions.length;
var userAnswers = [];

document.getElementById('start-btn').addEventListener('click', startQuiz);

function startQuiz() {
    ++questionNumber;
    var start = document.getElementById('start-btn');
    start.remove();
    createCard();
}

function nextQuestion() {
    var radios = document.getElementsByTagName('input');
    var unanswered = [];
    for (let i = 0; i < radios.length; i++) {
        if (!radios[i].checked) {
            unanswered.push('not checked');
        }else{
            userAnswers.push(radios[i].value);
        }
    };

    if(unanswered.length === 4){
        let existingError = document.getElementsByClassName('error');
        for (let i = 0; i < existingError.length; i++) {
            existingError[i].remove();
        }
        var error = elementMaker('p', 'You must select an answer before moving on.');
        error.setAttribute('class', 'error');
        let card = document.getElementsByClassName('card');
        for (let i = 0; i < card.length; i++) {
            card[i].append(error)
        };
    }else{
        ++questionNumber;
        createCard();
    };
}

function displayResults () {
    var radios = document.getElementsByTagName('input');
    var unanswered = [];
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            userAnswers.push(radios[i].value);
        }else{
            unanswered.push('not checked');
        }
    };

    if(unanswered.length === 4){
        let existingError = document.getElementsByClassName('error');
        for (let i = 0; i < existingError.length; i++) {
            existingError[i].remove();
        }
        var error = elementMaker('p', 'You must select an answer before moving on.');
        error.setAttribute('class', 'error');
        let card = document.getElementsByClassName('card');
        for (let i = 0; i < card.length; i++) {
            card[i].append(error)
        };
    }else{
        var cards = document.getElementsByClassName('card');
        for (let i = 0; i < cards.length; i++) {
            cards[i].remove();
        }
        var card = elementMaker('div');
        card.setAttribute('class', 'card');
        var backgroundImg = Object.keys(backgrounds);
        card.setAttribute('id', backgroundImg[5]);
        var numRight = [];
        for (let i = 0; i < userAnswers.length; i++) {        
            if(userAnswers[i] === '4'){
                numRight.push(userAnswers[i])
            }
        };
        
        var percentage = (numRight.length/totalQuestions) * 100;
        var resultMsg = 'You got ' + percentage + '% on this quiz!';
        var h1 = elementMaker('h1', resultMsg);
        var p = elementMaker('p', 'Would you like to try again?');
        var yesBtn = elementMaker('button', 'Yes');
        yesBtn.setAttribute('class', 'yes-btn');
        var noBtn = elementMaker('button', 'No');
        noBtn.setAttribute('class', 'no-btn');
        yesBtn.addEventListener('click', function () {
            questionNumber = 0;
            userAnswers = [];
            createCard();
        });
        noBtn.addEventListener('click', function () {
            questionNumber = -1;
            userAnswers = [];
            var cards = document.getElementsByClassName('card');
            for (let i = 0; i < cards.length; i++) {
                cards[i].remove();
            }
            var startBtn = elementMaker('button', 'Start!');
            startBtn.setAttribute('id', 'start-btn');
            startBtn.addEventListener('click', startQuiz);
            var body = document.getElementsByTagName('body');
            for (let i = 0; i < body.length; i++) {
                body[i].append(startBtn);
            }
        });
    
        card.append(h1);
        card.append(p);
        card.append(noBtn);
        card.append(yesBtn);
        document.getElementById('card-holder').append(card);
    }

}

function elementMaker(element, optionalText) {
    var myDomNode = document.createElement(element);
    if (optionalText) {
        myDomNode.innerHTML = optionalText;
    }
    return myDomNode
}

function createCard() {
    if (typeof questionNumber !== 'number') {
        console.log('Not a valid question number');
        return false;
    } else {
        var cards = document.getElementsByClassName('card');
        for (let i = 0; i < cards.length; i++) {
            cards[i].remove();
        }
        var card = elementMaker('div');
        card.setAttribute('class', 'card');
        var backgroundImg = Object.keys(backgrounds);
        card.setAttribute('id', backgroundImg[questionNumber]);
        var h1 = elementMaker('h1', questions[questionNumber].title);
        var p = elementMaker('p', questions[questionNumber].question);
        var ul = elementMaker('ul');

        if((questionNumber + 1) === totalQuestions){
            var btn = elementMaker('button', 'Finish');
            btn.setAttribute('class', 'finish-btn');
            btn.addEventListener('click', displayResults);
        }else{
            var btn = elementMaker('button', 'Next');
            btn.setAttribute('class', 'nxt-btn');
            btn.addEventListener('click', nextQuestion);
        }

        card.append(h1);
        card.append(btn);
        card.append(p);
        card.append(ul);

        var answerKey = Object.keys(questions[questionNumber].answers);
        var options = Object.values(questions[questionNumber].answers);

        for (let i = 0; i < answerKey.length; i++) {
            var li = elementMaker('li');
            var input = elementMaker('input');
            input.setAttribute('type', 'radio');
            input.setAttribute('value', answerKey[i]);
            li.append(input);
            li.append(options[i]);
            ul.append(li);
        }

        card.append(ul);

        document.getElementById('card-holder').append(card);
    };
};