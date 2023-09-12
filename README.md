npm install -g json-server
create folder ecalled stub 
run json server
json-server --watch ./stub/quiz/data.json
json-server --watch ./stub/lesson/data.json

#current directory
 pwd 
 #stops json server
 crtl + c


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


 // questionArray.forEach(question => updateQuestionPage(question));

        // const questionFunction = question => {
        //     updateQuestionPage(question); 
        // }
        // questionArray.forEach(questionFunction);


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





 // const menu = document.getElementById('menu');

            // const units = [];
            // responseJson.forEach(item => {
            //     if (!units.includes(item.unit)) {
            //         units.push(item.unit);
            //     }
            // });

            // units.forEach(unitNumber => {
            //     const unitLink = createLink(unitNumber, 'Unit', '#');
            //     const unitDiv = createDiv(unitNumber, 'main-menu-unit', false);
            //     const quizLinksContainer = createDiv(unitNumber, 'quiz-container', false);

            //     menu.append(unitLink, unitDiv, quizLinksContainer);
            
            //     const unitQuizLinks = responseJson.filter(item => item.unit === unitNumber);
            
            //     unitQuizLinks.forEach(quizLink => {
            //         const quizLinkElement = createLink(quizLink.quiz, 'Quiz', '#');
            
            //         quizLinkElement.addEventListener('click', event => {
            //             loadQuestionbyUnitandQuiz(quizLink.unit, quizLink.quiz);
            //         });
            
            //         quizLinksContainer.append(quizLinkElement);
            //     });
            
            //     const linkKeyAndValue = {
            //         unitLink: unitLink,
            //         unitdiv: unitDiv,
            //         quizLinkContainer: quizLinksContainer
            //     };

            //     unitDivQuizLinkPairList.push(linkKeyAndValue);
            //     toggleQuizLinks(linkKeyAndValue);
            //     toggleUnitLinks(linkKeyAndValue);               
            //     console.log(linkKeyAndValue);

            
        //     });
        // ;
