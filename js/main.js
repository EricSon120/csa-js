import { 
    createLink, 
    createUnitQuizMap, 
    createUniqueNumbersArray, 
    displayExplanation,
    createMenuElement
} from "./util.js";

const questioncontainerElement = document.getElementById('question-container');
const questionNumElement = document.getElementById('question-num');
const mainQuestionElement = document.getElementById('main-question');
const questionCodeElement = document.getElementById('question-code');
const quizElement = document.getElementById('quiz');
const choicesElement = document.getElementById('choices');
const submitBtn = document.getElementById('submitBtn'); 
const backBtn = document.getElementById('backBtn');
const nextBtn = document.getElementById('nextBtn');
const explanationElement = document.getElementById('explanation');
const buttonElement = document.getElementById('button-container');

const leftMenuParent = document.getElementById('leftMenu');
const quizLinkContainer = document.getElementById('quizlinks')

let questionArray = [];
//const QUIZ_URL = 'http://localhost:8080/question';
const QUIZ_URL = 'https://csa-web.onrender.com/question';


const loadQuestionbyUnitandQuiz = (unit, quiz) => {
    const questionUnitandQuiz = QUIZ_URL + "/unit/" + unit + "/quiz/" + quiz;
    fetch(questionUnitandQuiz)
    .then(response => response.json())
    .then(responseJson => {
        questionArray = responseJson;
        updateQuestionPage(questionArray[0]);
        addButtonListener(0, questionArray.length-1);
        buttonElement.style.display = 'block';
        }
    )};

const updateButton = (currentQuestion, lastQuestionNum) => {
    if (currentQuestion == 0) {
        backBtn.style.display = 'none';
    } else {
        backBtn.style.display = 'block';
    }

    if (currentQuestion == lastQuestionNum) {
        nextBtn.style.display = 'none';
    } else {
        nextBtn.style.display = 'block';
    }
};

const addButtonListener = (currentQuestion, lastQuestionNum) => {
    updateButton(currentQuestion, lastQuestionNum);

    nextBtn.addEventListener('click', () => {
        if (currentQuestion < questionArray.length - 1 ) {
            currentQuestion++;
            updateQuestionPage(questionArray[currentQuestion]);
            updateButton(currentQuestion, lastQuestionNum);
        }
    });
    backBtn.addEventListener('click', () => {
        if (currentQuestion > 0) {
            currentQuestion--;
            updateQuestionPage(questionArray[currentQuestion]);
            updateButton(currentQuestion, lastQuestionNum);
        }
    });

    submitBtn.addEventListener('click', () => {
        const radioButtons = document.getElementsByName('answerChoices');
        var selectedAnswer = '';
        for (let i = 0; i < radioButtons.length; i++) {
            if (radioButtons[i].checked) {
                selectedAnswer = radioButtons[i].value;
            }
        }
        if (selectedAnswer === '') {
            alert("Please select an answer before submitting.");
            return;
        }
        const correctAnswer = questionArray[currentQuestion].feedback[0].correct_answer;
        displayExplanation(questionArray, explanationElement, selectedAnswer, correctAnswer, currentQuestion); 
    })
};

const updateQuestionPage = (responseJson) => {
    explanationElement.innerHTML = '';
    const questionContainer = responseJson;
    const question = questionContainer.question[0];
    console.log(questionContainer.page);

    questionNumElement.innerText = 'Question ' + questionContainer.page;
    mainQuestionElement.innerText = question.question_header;
    questionCodeElement.innerText = question.question_code.code;
    quizElement.innerText = question.question_main;
    choicesElement.innerHTML = ''; 

    //looped throught the list of answer choices and ended at index 3 because there are 4 answer choices and accessed each key and value

    for(let i = 0; i < questionContainer.answer_choices.length; i++) {
        const answerchoice = questionContainer.answer_choices[i];
        const answerKey = answerchoice.key;
        const answerValue = answerchoice.value;
        const fullChoice = answerKey + " " + answerValue;
        //cant use innerline because it will be overwritten everytime, only causing the last element to be displayed
        //therefore you need to make each choice have its own "div"
        const choiceDiv = document.createElement("div");

        //made a radiobutton to have the value of the answer choices
        const input = document.createElement("input");
        input.id = 'input' + i;
        input.type = "radio";
        input.name = "answerChoices";
        input.value = answerValue;        
        
        choiceDiv.append(input);
        choiceDiv.append(fullChoice); 
        choicesElement.append(choiceDiv);
    }
    //style
    questioncontainerElement.style.display = 'block';
}

function loadLinks() {
    fetch(QUIZ_URL + "/list/unique")
    .then(response => response.json())
    .then(responseJson => {
        const uniqueUnitNumbers = [];
        const unitQuizMap = {};
        responseJson.forEach(element => {
            createUnitQuizMap(unitQuizMap, element.unit, element.quiz);
            createUniqueNumbersArray(uniqueUnitNumbers, element.unit);
        });

        // Sort the unit numbers in ascending order
        uniqueUnitNumbers.sort((a, b) => a - b);

        uniqueUnitNumbers.forEach(unitNumber => {
            const unitQuizLinks = responseJson.filter(item => item.unit === unitNumber);
            
            unitQuizLinks.forEach(unitNumber => {
                const quizLinkElement = createLink(unitNumber.quiz, 'Quiz', '#', "quizlink");
                quizLinkContainer.append(quizLinkElement);
            });

            const menuElement = createMenuElement(unitNumber, unitQuizMap, quizLinkContainer, loadQuestionbyUnitandQuiz);
            leftMenuParent.append(menuElement);
        });
    });
}

//getName()
//getName
function greet(value, getName) {
    console.log("Hello World " + getName(value));

}

// function getName(value) {
//     return "name = " + value;
// }

function main() {
    loadLinks();
//     const getName = (value) => {
//         return "name = " + value;
//     }

//     greet("Eric", getName)
//     greet("Eric", getName())

//     greet("Eric", (value) => {
//         return "name = " + value;
//     })


//    var name = "eric";
//    console.log(name)

//    console.log("eric")
}

main();