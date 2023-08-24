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