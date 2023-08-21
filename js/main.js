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



var currentQuestion = 0;
let questionArray = [];
let questionUUIDs = [];
const QUIZ_URL = 'http://localhost:8080/question';
//const QUIZ_URL = 'https://csa-web.onrender.com/question';


const loadQuestion = () => {
  fetch(QUIZ_URL)
    .then(response => response.json())
    .then(responseJson => {
        questionArray = responseJson;
        for (let i = 0; i < questionArray.length; i++) {
            const currentQuestion = questionArray[i];
            const currentQuestionUUID = currentQuestion.id;
            questionUUIDs.push(currentQuestionUUID);
         }
         console.log(questionUUIDs);

         loadQuestionByUUID(questionUUIDs[currentQuestion]);
  });
}

const loadQuestionbyUnitandSubgroup = (unit, subgroup) => {
    const questionUnitandSub = QUIZ_URL + "/unit/" + unit + "/subgroup/" + subgroup;
    fetch(questionUnitandSub)
    .then(response => response.json())
    .then(responseJson => {
        questionArray = responseJson;
        currentQuestion = 0; 
        // for(var i =0; i < questionArray.length; i++) {
        //     updateQuestionPage(questionArray[currentQuestion]);
        // }

        // questionArray.forEach(question => {
        //     updateQuestionPage(question); 
        // });

        questionArray.forEach(question => updateQuestionPage(question));

        const questionFunction = question => {
            updateQuestionPage(question); 
        }
        questionArray.forEach(questionFunction);
        addButtonListener();
        }
    )};

// const loadQuestionByUUID = (uuid) => {
//     //console.log(QUIZ_URL + '/' + uuid);

//     fetch(QUIZ_URL + '/' + uuid)
//         .then(response => response.json())
//         .then(responseJson => {
//             const unit = responseJson.unit;
//             const subgroup = responseJson.subgroup;
//             updateQuestionPage(responseJson);
//             addButtonListener();

//                 const correctAnswer = questionArray[currentQuestion].feedback[0].correct_answer;
//                 console.log(correctAnswer);
//                 console.log(selectedAnswer);
//                 displayExplanation(selectedAnswer, correctAnswer);
//             });
//         };



const updateButton = () => {
    if (currentQuestion == 0) {
        backBtn.style.display = 'none';
    } else {
        backBtn.style.display = 'block';
    }

    if (currentQuestion == 6) {
        nextBtn.style.display = 'none';
    } else {
        nextBtn.style.display = 'block';
    }
};

const addButtonListener = () => {

    nextBtn.addEventListener('click', () => {
        if (currentQuestion < questionArray.length - 1 ) {
            currentQuestion++;
            updateQuestionPage(questionArray[currentQuestion]);
            updateButton();
        }
    });
    backBtn.addEventListener('click', () => {
        if (currentQuestion > 0) {
            currentQuestion--;
            updateQuestionPage(questionArray[currentQuestion]);
            updateButton();
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
        displayExplanation(selectedAnswer, correctAnswer); 
    })
};

const updateQuestionPage = (responseJson) => {
    explanationElement.innerHTML = '';
    const questionContainer = responseJson;
    const question = questionContainer.question[0];

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

function displayExplanation(selectedAnswer, correctAnswer) {
    const feedback = questionArray[currentQuestion].feedback[0].explanation;

        if (selectedAnswer == correctAnswer) {
            explanationElement.innerHTML = 'Correct <br>' + feedback;
        } else {
            explanationElement.innerHTML = 'Incorrect <br> ' + feedback;
        }
};

let quizLinkInfo = [{ id: 'quiz1', unit: 1, subgroup: 1 },{ id: 'quiz2', unit: 2, subgroup: 1 },];

quizLinkInfo.forEach(link => {
    const quizLink = document.getElementById(link.id);
    quizLink.addEventListener('click', function(event) {
        event.preventDefault();
        loadQuestionbyUnitandSubgroup(link.unit, link.subgroup);
        });
});