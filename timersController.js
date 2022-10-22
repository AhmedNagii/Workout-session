import { itemsArr } from "./mainOpreations";


const startBtn = document.querySelector(".start-button");
const endMessage = document.querySelector(".end-message");
const circularProgress = document.querySelector(".circular-progress");
const progressValue = document.querySelector(".progress-value");
const restBarContainer = document.querySelector(".rest-bar-container");

let breakIntervalActive = false;
let mainTimerIsActive = false;
let minutInterval;
let timer;


startBtn.addEventListener("click", () => {
    mainTimerIsActive ? endTimer() : startTimer();
});




export function updateCompletionBar() {
    let startingTime = 30;
    let startingValue = 0;
    breakIntervalActive = true;
    restBarContainer.classList.add("show");
    const restInterval = setInterval(() => {
        startingValue++;
        startingTime--;
        progressValue.textContent = `${startingTime}`;

        circularProgress.style.background = `conic-gradient(#7d2ae8 ${startingValue * 20
            }deg, #ededed 0deg)`;

        if (startingTime == 0) {
            clearInterval(restInterval);
            restBarContainer.classList.remove("show");
            breakIntervalActive = false;
        }
    }, 1000);
}




function startTimer() {
    let minutes = 0;
    let seconds = 0;
    minutInterval = setInterval(() => {
        seconds++;
        timer = `
        <span>${minutes > 10 ? minutes : `0${minutes}`
            }</span>:<span>${updateTimerText(seconds, minutes)}</span>
        `;
        startBtn.innerHTML = timer + "<h3>Finish</h3>";
    }, 1000);
    mainTimerIsActive = true;
}

function endTimer() {
    clearInterval(minutInterval);
    startBtn.textContent = `Start`;
    endMessage.innerHTML = `<h1>You have spent ${timer} today</h1>`;
    mainTimerIsActive = false;
}

function updateTimerText(seconds, minutes) {
    if (seconds > 59) {
        seconds = 0;
        minutes = minutes + 1;
        return seconds;
    } else {
        return seconds > 10 ? seconds : `0${seconds}`;
    }
}



export function trackProgress(event) {
    if (breakIntervalActive == false) {
        if (!event.target.matches(".progressbar")) return;
        let currentId = event.target.dataset.id;
        const selectedItem = itemsArr.filter((item) => currentId == item.id);
        const reps = selectedItem[0].exerciseReps
        const increaseValue = 100 / reps
        if (selectedItem[0].completion < 100) {
            selectedItem[0].completion += increaseValue
            updateCompletionBar();
        }
        event.target.textContent = `${selectedItem[0].completion.toFixed(0)}%`
        event.target.style.background =
            `linear-gradient(to right, #393E46 ${selectedItem[0].completion}%, white 0%)`;
    }
}
