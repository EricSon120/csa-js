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
const quizLinkContainer = document.getElementById('quiz-link-container');



let questionArray = [];
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
const unitDivQuizLinkPairList = [];

const linkKeyAndValue = [];
function loadLinks() {
    fetch(QUIZ_URL + "/list/unique")
        .then(response => response.json())
        .then(responseJson => {
            const menu = document.getElementById('menu');

            const units = [];
            responseJson.forEach(item => {
                if (!units.includes(item.unit)) {
                    units.push(item.unit);
                }
            });

            units.forEach(unit => {
                const unitLink = document.createElement('a');
                unitLink.href = '#';
                unitLink.textContent = 'Unit ' + unit;
            
                const unitdiv = document.createElement('div');
                unitdiv.id = 'main-menu-unit' + unit;
                unitdiv.className = 'main-menu-unit';
                unitdiv.style.display = 'none';
            
                const quizLinksContainer = document.createElement('div');
                quizLinksContainer.style.display = 'none';
            
                menu.append(unitLink, unitdiv, quizLinksContainer);
            
                const unitQuizLinks = responseJson.filter(item => item.unit === unit);
            
                unitQuizLinks.forEach(quizLink => {
                    const quizLinkElement = document.createElement('a');
                    quizLinkElement.href = '#';
                    quizLinkElement.textContent = 'Quiz ' + quizLink.quiz;
            
                    quizLinkElement.addEventListener('click', event => {
                        loadQuestionbyUnitandQuiz(quizLink.unit, quizLink.quiz);
                    });
            
                    quizLinksContainer.append(quizLinkElement);
                });
            
                const linkKeyAndValue = {
                    unitLink: unitLink,
                    unitdiv: unitdiv,
                    quizLinkContainer: quizLinksContainer
                };

                unitDivQuizLinkPairList.push(linkKeyAndValue);
                console.log(linkKeyAndValue);
                });

            unitDivQuizLinkPairList.forEach(linkKeyAndValue => {
                toggleQuizLinks(linkKeyAndValue);
                linkKeyAndValue.unitLink.addEventListener('click', event => {
                    linkKeyAndValue.unitLink.addEventListener('click', event => {
                
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
                });
            });
        });
}

loadLinks();