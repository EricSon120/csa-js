
export function createUnitQuizMap(unitQuizMap, unitNumber, quizNumber) {
    if (!unitQuizMap[unitNumber]) {
        unitQuizMap[unitNumber] = []; 
    }
    unitQuizMap[unitNumber].push(quizNumber);
}

export function createUniqueNumbersArray(uniqueUnitNumbers, unitNumber) {
    if (!uniqueUnitNumbers.includes(unitNumber)) {
        uniqueUnitNumbers.push(unitNumber);
    }
}

export function createLink(unitNumber, unitText, href, cssClassValue) {
    const link = document.createElement('a');
    link.href = href;
    link.textContent = unitText + ' ' + unitNumber;

    if (cssClassValue) {
        link.setAttribute('class', cssClassValue);
    }

    return link;
}

export function displayExplanation(questionArray, explanationElement, selectedAnswer, correctAnswer, currentQuestion) {
    const feedback = questionArray[currentQuestion].feedback[0].explanation;

    if (selectedAnswer == correctAnswer) {
        explanationElement.innerHTML = 'Correct <br>' + feedback;
    } else {
        explanationElement.innerHTML = 'Incorrect <br> ' + feedback;
    }
};

export function createMenuElement(unitNumber, unitQuizMap, quizLinkContainer, loadQuestionbyUnitandQuiz) {
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
    addEventListeners(aElement, unitQuizMap, quizLinkContainer, loadQuestionbyUnitandQuiz);

    const liElement = document.createElement('li');
    liElement.append(aElement);

    return liElement;
}

function addEventListeners(aElement, unitQuizMap, quizLinkContainer, loadQuestionbyUnitandQuiz) {
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


