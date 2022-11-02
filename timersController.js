import { itemsArr, renderItems } from "./mainOpreations";


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
    if (mainTimerIsActive) {
        window.removeEventListener("beforeunload", dialogValue);
        endTimer()
    } else {
        startTimer();
        startBtn.disabled = true;
        setTimeout(() => startBtn.disabled = false, 2000)
        window.addEventListener("beforeunload", dialogValue);
    }
});




export function breakTimer() {
    let startingTime = 30;
    let startingValue = 0;
    breakIntervalActive = true;
    restBarContainer.classList.add("show");
    const restInterval = setInterval(() => {
        startingValue++;
        startingTime--;
        progressValue.textContent = `${startingTime}`;
        circularProgress.style.background = `conic-gradient(#7d2ae8 ${startingValue * 12
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
        const currentId = event.target.dataset.id;
        const selectedItem = itemsArr.filter((item) => currentId == item.id)[0];
        let increaseValue = 100 / selectedItem.exerciseReps
        if (selectedItem.completedReps < selectedItem.exerciseReps) {
            selectedItem.completedReps++
            selectedItem.completionPercentage += increaseValue
            renderItems()
            breakTimer();
        } else {
            return
        }
        event.target.textContent = `${selectedItem.completionPercentage}%`
        event.target.style.background =
            `linear-gradient(to right, #393E46 ${selectedItem.completionPercentage}%, white 0%)`;
    }
}

function dialogValue(event) {

    event.preventDefault();
    event.returnValue = 'You will lose the timer progress!';

}