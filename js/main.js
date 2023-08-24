const questioncontainerElement = document.getElementById('question-container');
const questionNumElement = document.getElementById('question-num');
const mainQuestionElement = document.getElementById('main-question');
const questionCodeElement = document.getElementById('question-code');
const subQuestionElement = document.getElementById('sub-question');
const choicesElement = document.getElementById('choices');
const submitBtn = document.getElementById('submitBtn'); 
const backBtn = document.getElementById('backBtn');
const nextBtn = document.getElementById('nextBtn');
const explanationElement = document.getElementById('explanation');
const buttonElement = document.getElementById('button-container');
const unitsLink = document.getElementById('units');
const quizLinkElement1 = document.getElementById('main-menu1');
const quizLinkElement2 = document.getElementById('main-menu2');



let questionArray = [];
let questionUUIDs = [];
const QUIZ_URL = 'http://localhost:8080/question';
//const QUIZ_URL = 'https://csa-web.onrender.com/question';


// const loadQuestion = () => {
//   fetch(QUIZ_URL)
//     .then(response => response.json())
//     .then(responseJson => {
//         questionArray = responseJson;
//         for (let i = 0; i < questionArray.length; i++) {
//             const currentQuestion = questionArray[i];
//             const currentQuestionUUID = currentQuestion.id;
//             questionUUIDs.push(currentQuestionUUID);
//          }
//          console.log(questionUUIDs);

//          loadQuestionByUUID(questionUUIDs[currentQuestion]);
//   });
// }

const loadQuestionbyUnitandSubgroup = (unit, subgroup) => {
    const questionUnitandSub = QUIZ_URL + "/unit/" + unit + "/subgroup/" + subgroup;
    fetch(questionUnitandSub)
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
    subQuestionElement.innerText = question.question_main;
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

let quizLinkInfo = [{ id: 'quiz1', unit: 1, subgroup: 1 },{ id: 'quiz2', unit: 2, subgroup: 1 },];

unitsLink.addEventListener('click', function(event) {
    event.preventDefault();
    if (quizLinkElement1.style.display == 'none') {
        quizLinkElement1.style.display = 'block';
    } else {
        quizLinkElement1.style.display = 'none';

    }
});
unitsLink.addEventListener('click', function(event) {
    event.preventDefault();
    if (quizLinkElement2.style.display == 'none') {
        quizLinkElement2.style.display = 'block';

    } else {
        quizLinkElement2.style.display = 'none';
    }
});

quizLinkInfo.forEach(link => {
    const quizLink = document.getElementById(link.id);
    quizLink.addEventListener('click', function(event) {
        event.preventDefault();
        loadQuestionbyUnitandSubgroup(link.unit, link.subgroup);
        });
});


