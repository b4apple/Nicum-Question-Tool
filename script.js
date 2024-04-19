var exam = {
    name: "",
    time: 0,
    questioncount: 0
};
var questionTypes = [];

var timerInterval;


function testFormat() {
    exam.name = document.getElementById("exam-name").value;
    exam.time = parseInt(document.getElementById("time").value);
    exam.questioncount = parseInt(document.getElementById("question-count").value);
    //console.log(exam);
    //var workArea = document.getElementById("work-area");
    typeSelector();
}


function goBackFromStageOne() {
    var workArea = document.getElementById("work-area");
    workArea.innerHTML = `
    <fieldset>
            <legend>Enter the details of the test</legend>
            <span class="instruction-text">Enter the number of questions : </span><input type="number" min="1"
                id="question-count"> <br>
            <span class="instruction-text">Enter the number of minutes the exam lasts : </span><input type="number"
                min="1" id="time"> <br>
            <span class="instruction-text">Enter the name of the exam : </span><input type="text" id="exam-name"> <br>
            <button id="exam-detail-submit" class="button" onclick="testFormat()">Procced</button>
        </fieldset>`;
}



function submit() {
    clearInterval(timerInterval);
    var responses = ``;
    for (var i = 0; i < exam.questioncount; ++i) {
        if (questionTypes[i] == "single-correct") {
            responses += `<b>Question ${i + 1} : </b>`;
            if (document.getElementById(`question-${i + 1}-A`).checked) {
                responses += 'A';
            } else if (document.getElementById(`question-${i + 1}-B`).checked) {
                responses += 'B';
            } else if (document.getElementById(`question-${i + 1}-C`).checked) {
                responses += 'C';
            } else if (document.getElementById(`question-${i + 1}-D`).checked) {
                responses += 'D';
            }
            else {
                responses += 'NOT ATTEMPED';
            }
            responses += "<br>";
        } else if (questionTypes[i] == "multi-correct") {
            responses += `<b>Question ${i + 1} : </b>`;
            if (document.getElementById(`question-${i + 1}-A`).checked) {
                responses += 'A ';
            } if (document.getElementById(`question-${i + 1}-B`).checked) {
                responses += 'B ';
            } if (document.getElementById(`question-${i + 1}-C`).checked) {
                responses += 'C ';
            } if (document.getElementById(`question-${i + 1}-D`).checked) {
                responses += 'D ';
            } else {
                responses += 'NOT ATTEMPED';
            }
            responses += "<br>";
        }
        else if (questionTypes[i] == "numerical") {
            if (document.getElementById(`question-${i + 1}`).value != "")
                responses += `<b>Question ${i + 1} : </b> ${document.getElementById(`question-${i + 1}`).value} <br>`;
            else
                responses += `<b>Question ${i + 1} : </b> NOT ATTEMPTED <br>`;
        }
    }
    var workArea = document.getElementById("work-area");
    workArea.innerHTML = "";
    workArea.innerHTML += responses;
}





function clearResponse(k, questionType) {
    switch (questionType) {
        case "single-correct":
        case "multi-correct":
            document.getElementById(`question-${k}-A`).checked = false;
            document.getElementById(`question-${k}-B`).checked = false;
            document.getElementById(`question-${k}-C`).checked = false;
            document.getElementById(`question-${k}-D`).checked = false;
            break;
        case "numerical":
            if (document.getElementById(`question-${k}`))
                document.getElementById(`question-${k}`).value = "";
            break;
    }
}




function startTimer(duration) {
    var timer = duration * 60,
        minutes, seconds;
    timerInterval = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        document.getElementById('time').textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = duration * 60;
            alert("Time's up! Your responses will no longer be accepted.");
            submit(); // Automatically submit the form when time is up
        }
    }, 1000)
};

























function singleCorrect(k) {
    return (
        `
    <input type="radio" id="question-${k}-A" name="question-${k}" value="A">
    <label for="A">A</label><br>
    <input type="radio" id="question-${k}-B" name="question-${k}" value="B">
    <label for="B">B</label><br>
    <input type="radio" id="question-${k}-C" name="question-${k}" value="C">
    <label for="C">C</label><br>
    <input type="radio" id="question-${k}-D" name="question-${k}" value="D">
    <label for="C">D</label><br>
    <button class="button" id="clear-response" onclick="clearResponse(${k}, 'single-correct')">Clear Response</button>
    `);
}


function multiCorrect(k) {
    return (
        `
    <input type="checkbox" id="question-${k}-A" name="question-${k}" value="A">
    <label for="A">A</label><br>
    <input type="checkbox" id="question-${k}-B" name="question-${k}" value="B">
    <label for="B">B</label><br>
    <input type="checkbox" id="question-${k}-C" name="question-${k}" value="C">
    <label for="C">C</label><br>
    <input type="checkbox" id="question-${k}-D" name="question-${k}" value="D">
    <label for="C">D</label><br>
    <button class="button" id="clear-response" onclick="clearResponse(${k}, 'multi-correct')">Clear Response</button>
    `);
}

function numerical(k) {
    return (
        `
        <input type="number" id="question-${k}" name="question-${k}" step="0.0001" placeholder="Enter answer" /><br>      
        <button class="button" id="clear-response" onclick="clearResponse(${k}, 'numerical' )">Clear Response</button>
        `
    );
}

function handleTypes() {
    var content = "";
    for (var i = 1; i <= exam.questioncount; ++i) {
        var drop = document.getElementById("question-" + i).value;
        questionTypes.push(drop);
        console.log(drop);
        content += `<h3>Question ${i}</h3><br>`;
        switch (drop) {
            case "single-correct":
                content += singleCorrect(i);
                break;
            case "multi-correct":
                content += multiCorrect(i);
                break;
            case "numerical":
                content += numerical(i);
        }
        content += "<br>";

    }
    console.log(content);
    content += `<button class='button' id='submit' onclick='submit()'>Submit Exam</button>`;
    var workArea = document.getElementById("work-area");
    workArea.innerHTML = "";
    workArea.innerHTML += content;
    startTimer(exam.time);  
}


function typeSelector() {
    var workArea = document.getElementById("work-area");
    workArea.innerHTML = "";
    var content = "";
    content += "<h2>Enter the type of each question</h2>";
    for (var i = 1; i <= exam.questioncount; ++i) {
        content +=
            `
        <label for="question-${i}">Question ${i}:</label>
        <br>
        <select name="question-${i}" id="question-${i}">
            <option value="single-correct">Single Option Correct</option>
            <option value="multi-correct">Multiple Options Correct</option>
            <option value="numerical">Numerical</option>
        </select>
        <br>
        `;
    }
    content += `<button id="type-submit" onclick="handleTypes()" class="button">Generate UI</button><br><button id="go-back-stage-1" onclick="goBackFromStageOne()" class="button">Go Back</button>`;
    workArea.innerHTML = content;
}
