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
const unitDivQuizLinkPairList = [];
const QUIZ_URL = 'http://localhost:8080/question';
//const QUIZ_URL = 'https://csa-web.onrender.com/question';


const loadQuestionbyUnitandQuiz = (unit, quiz) => {
    const questionUnitandQuiz = QUIZ_URL + "/unit/" + unit + "/quiz/" + quiz;
    fetch(questionUnitandQuiz)
    .then(response => response.json())
    .then(responseJson => {
        questionArray = responseJson;
        lastQuestionNum = questionArray.length - 1;
        updateQuestionPage(questionArray[0]);
        // questionArray.forEach(question => {
        //     console.log(question);
        //     console.log("-------------");
        //     updateQuestionPage(question); 
        // });

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
        displayExplanation(selectedAnswer, correctAnswer, currentQuestion); 
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
        //choiceDiv.setAttribute("class", "main-question")

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

function displayExplanation(selectedAnswer, correctAnswer, currentQuestion) {
    const feedback = questionArray[currentQuestion].feedback[0].explanation;

        if (selectedAnswer == correctAnswer) {
            explanationElement.innerHTML = 'Correct <br>' + feedback;
        } else {
            explanationElement.innerHTML = 'Incorrect <br> ' + feedback;
        }
};

// function toggleQuizLinks(unitRef, quizLinksContainer) {
//     console.log(unitRef.style.display);
//     if (unitRef.style.display === 'none') {
//         console.log("testing if statement")
//         unitRef.style.display = 'block';
//         quizLinksContainer.style.display = 'block';
//     } else {
//         console.log("testing else statement")
//         unitRef.style.display = 'none';
//         quizLinksContainer.style.display = 'none';
//     }
// }


function toggleQuizLinks(linkKeyAndValue) {
    const unitdiv = linkKeyAndValue.unitdiv;
    const quizLinkContainer = linkKeyAndValue.quizLinkContainer;

    if (unitdiv.style.display === 'none') {
        unitdiv.style.display = 'block';
        quizLinkContainer.style.display = 'block';
    } else {
        unitdiv.style.display = 'none';
        quizLinkContainer.style.display = 'none';
    }
}

function toggleUnitLinks(linkKeyAndValue) {
    linkKeyAndValue.unitLink.addEventListener('click', () => {
      unitDivQuizLinkPairList.forEach(linkpair => {
        if (linkpair.unitLink == linkKeyAndValue.unitLink) {
          linkpair.unitdiv.style.display = 'block';
          linkpair.quizLinkContainer.style.display = 'block';
        } else {
          linkpair.unitdiv.style.display = 'none';
          linkpair.quizLinkContainer.style.display = 'none';
        }
      });
    });
}

function createLink(unitNumber, unitText, href) {
    return createLink(unitNumber, unitText, href, null);
}

function createLink(unitNumber, unitText, href, cssClassValue) {
    const link = document.createElement('a');
    link.href = href;
    link.textContent = unitText + ' ' + unitNumber;

    if (cssClassValue) {
        link.setAttribute('class', cssClassValue);
    }

    return link;
}
  
function createDiv(unitNumber, className, isDisplay) {
    const unitDiv = document.createElement('div');
    unitDiv.className = className;
    unitDiv.id = className + unitNumber;

    if (isDisplay) {
        unitDiv.style.display = 'block';
    } 
    else {
        unitDiv.style.display = 'none';
    }
    return unitDiv;
}   

function addEventListeners(aElement, unitQuizMap) {
    aElement.addEventListener('click', (event) => {
        const unitNumber = aElement.id.substring('unitLink'.length);
        const quizzes = unitQuizMap[unitNumber]; 
        quizLinkContainer.innerHTML = '';

        quizzes.forEach((quizNumber) => {
            const quizLinkElement = createLink(quizNumber, 'Quiz', '#', 'quizlink');
            quizLinkElement.addEventListener('click', () => {
                loadQuestionbyUnitandQuiz(unitNumber, quizNumber);
            });
            quizLinkContainer.append(quizLinkElement);
        });
        quizLinkContainer.style.display = 'block';

        const keys = Object.keys(unitQuizMap);
       // console.log(keys);
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            const unitDiv = document.getElementById('unitDiv' + key);
            if (unitDiv) {
                if (key === unitNumber) {
                    unitDiv.style.display = 'block';
                } else {
                    unitDiv.style.display = 'none';
                }
            }
        }
    });
}

function createMenuElement(unitNumber, unitQuizMap) {
    const iElement = document.createElement('i');
    iElement.setAttribute('class', "fas fa-file");
    const iconSpanElement = document.createElement('span');
    iconSpanElement.setAttribute('class', "icon");
    iconSpanElement.append(iElement);

    const itemSpanElement = document.createElement('span');
    itemSpanElement.setAttribute('class', "item")
    itemSpanElement.innerText = "Unit " + unitNumber;

    const aElement = document.createElement('a');
    aElement.setAttribute('id', "unitLink" + unitNumber);
    aElement.setAttribute('href', "#unit" + unitNumber);
    aElement.append(iconSpanElement);
    aElement.append(itemSpanElement);
    addEventListeners(aElement, unitQuizMap);

    const liElement = document.createElement('li');
    liElement.append(aElement);

    return liElement;
}

function createUnitQuizMap(unitQuizMap, unitNumber, quizNumber) {
    if (!unitQuizMap[unitNumber]) {
        unitQuizMap[unitNumber] = []; 
    }
    unitQuizMap[unitNumber].push(quizNumber);
}

function createUniqueNumbersArray(uniqueUnitNumbers, unitNumber) {
    if (!uniqueUnitNumbers.includes(unitNumber)) {
        uniqueUnitNumbers.push(unitNumber);
    }
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
            //console.log(uniqueUnitNumbers);
            uniqueUnitNumbers.forEach(unitNumber => {
                const unitQuizLinks = responseJson.filter(item => item.unit === unitNumber);
                //console.log(unitQuizLinks);
                unitQuizLinks.forEach(unitNumber => {
                    const quizLinkElement = createLink(unitNumber.quiz, 'Quiz', '#', "quizlink");
                    quizLinkContainer.append(quizLinkElement);
                });
                const menuElement = createMenuElement(unitNumber, unitQuizMap);
                leftMenuParent.append(menuElement);
            });
            //console.log(unitQuizMap);
        });
    }

loadLinks();
