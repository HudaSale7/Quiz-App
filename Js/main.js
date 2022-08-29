
//global variable
let bullet = document.querySelector(".bubble");
let answer = document.querySelector(".answer");
let submit = document.querySelector(".btn");
let footer = document.querySelector(".footer");
let question = document.querySelector(".question h3");
let arrayOfObj = [];
let index = 0;
let noQ = document.querySelector(".no-q");
let userAnswer;
let countRightAnswer = 0;
let timer = document.querySelector(".timer");

//fetch the data from json file
async function fetchData() {
    let data = await fetch("./html_questions.json");
    data = await data.json();
    return data;
};


fetchData().then((obj) => {
    //store the array in global array of abject
    arrayOfObj = obj;

    //color bullets
    makeBullet();
    //print first question 
    printQues(index);
});


//get next question onsubmit
submit.onclick = function () {
    toNextQues();
};


//get next question when time is over
setInterval(function () {
    timer.innerHTML = `0${timer.innerHTML - 1}`;
    if (timer.innerHTML == 0) {
        toNextQues();
    }
}, 1000);



function toNextQues() {
    //check the right answer
    checkAnswer();
    if (index == 8) {
        //evaluate the user when he finish the quiz
        evaluate();
    } else {
        index++;
        //go to next question
        printQues(index);
        coloredSpan();
    }
}


//print question and its answer
function printQues(index) {
    //set div content
    answer.textContent = "";
    //reset timer
    timer.innerHTML = "10";
    //take the question
    question.textContent = arrayOfObj[index].title;
    //take the answer
    for (let i = 1; i < 5; i++) {
        let div = document.createElement("div");
        let input = document.createElement("input");
        input.setAttribute("type", "radio");
        input.setAttribute("name", "option");
        input.id = Math.ceil(Math.random() * 100);
        input.setAttribute("value", arrayOfObj[index][`answer_${i}`]);
        let inputId = input.id;
        let label = document.createElement("label");
        label.setAttribute("for", inputId);
        label.textContent = arrayOfObj[index][`answer_${i}`];
        div.appendChild(input);
        div.appendChild(label);
        answer.appendChild(div);
    }
    //collect the input 
    userAnswer = document.getElementsByName("option");
};



function checkAnswer() {
    //checking when the user choose 
    for (const radioBtn of userAnswer) {
        if (radioBtn.checked) {
            if (radioBtn.value == arrayOfObj[index].right_answer) {
            //counting the right answer
            countRightAnswer++;
        }
    }
}};



function evaluate() {
    //remove the btn and footer section
    submit.remove();
    footer.remove();
    noQ.textContent = "0";
    answer.style.textAlign = "center";
    question.style.textAlign = "center";
    question.style.color = "red";

    if (countRightAnswer < 5) {
        question.textContent = "Bad";
        answer.textContent = `${countRightAnswer} from 9`;
    } else if (countRightAnswer > 6) {
        question.textContent = "Excellent";
        answer.textContent = `${countRightAnswer} from 9`;
    } else {
        question.textContent = "Good";
        answer.textContent = `${countRightAnswer} from 9`;
    }
}



function makeBullet() {
    for (let i = 0; i < arrayOfObj.length; i++) {
        bullet.innerHTML += `<span class = "bullet-${i}"></span>`
    }
}



function coloredSpan () {
    let span = document.querySelector(`.bullet-${index}`);
    span.style.backgroundColor = "rgb(59, 59, 236)";
    noQ.innerHTML--;
}















