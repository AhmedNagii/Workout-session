import ExerciseItem from "./components/ExerciseItem";

const startBtn = document.querySelector(".start-button");
const popUpCancelBtn = document.querySelector(".popUp__cancel-btn");
const popUpSaveBtn = document.querySelector(".popUp__save-btn");
const popUpContainer = document.querySelector(".popUp-container");
const repetitionsInput = document.getElementById("repetitions");
const exerciseNameInput = document.getElementById("exercise_name");
const exerciseList = document.querySelector(".exercise-list");
const addItemBtn = document.querySelector(".add-item-btn");
const endMessage = document.querySelector(".end-message");
const circularProgress = document.querySelector(".circular-progress");
const progressValue = document.querySelector(".progress-value");
const restBarContainer = document.querySelector(".rest-bar-container");

let itemsArr = JSON.parse(localStorage.getItem("items")) || [];

let currentId = "";
let isUpdateList = false;
let mainTimerIsActive = false;
let breakIntervalActive = false;
let minutInterval;
let timer;

function addEventListeners() {
    document.body.addEventListener("click", (event) => {
        event.stopPropagation(); //prevent bubbling
        deleteItem(event);
        editeItem(event);
        trackProgress(event);
    });
}

function addItem() {
    itemsArr.push({
        exerciseName: exerciseNameInput.value,
        exerciseReps: repetitionsInput.value,
        completion: 0,
        id: Math.floor(Math.random() * 100),
    });
    removePopUp();
    renderItems();
}

function trackProgress(event) {
    if (breakIntervalActive == false) {
        if (!event.target.matches(".progressbar")) return;
        currentId = event.target.dataset.id;
        const selectedItem = itemsArr.filter((item) => currentId == item.id);
        const reps = selectedItem[0].exerciseReps
        console.log(reps)
        const increaseValue = 100 / reps
        if (selectedItem[0].completion < 100) {
            selectedItem[0].completion += increaseValue
            updateBreakBar();
        }

        event.target.textContent = `${selectedItem[0].completion.toFixed(0)}%`
        event.target.style.background =
            `linear-gradient(to right, #393E46 ${selectedItem[0].completion}%, white 0%)`;



    }
}

function editeItem(event) {
    if (!event.target.matches(".edit-icon")) return;
    currentId = event.target.dataset.id;
    const selectItem = itemsArr.filter((item) => currentId == item.id);
    exerciseNameInput.value = selectItem[0].exerciseName;
    repetitionsInput.value = Number(selectItem[0].exerciseReps);
    popUpContainer.classList.add("show");
    isUpdateList = true;
}

function updateItem(slectedId) {
    itemsArr.map((item) => {
        if (item.id === Number(slectedId)) {
            item.exerciseName = exerciseNameInput.value;
            item.exerciseReps = repetitionsInput.value;
        }
        return item;
    });
    renderItems();
    removePopUp();
}

function deleteItem(event) {
    if (!event.target.matches(".delete-icon")) return;
    const id = event.target.dataset.id;

    itemsArr = itemsArr.filter((item) => item.id !== Number(id));
    renderItems();
}

addItemBtn.addEventListener("click", () => {
    isUpdateList = false;
    popUpContainer.classList.add("show");
});

popUpSaveBtn.addEventListener("click", (e) => {
    e.preventDefault();

    isUpdateList ? updateItem(currentId) : addItem();
});

popUpCancelBtn.addEventListener("click", (e) => {
    e.preventDefault();
    exerciseNameInput.value = "";
    repetitionsInput.value = "";
    popUpContainer.classList.remove("show");
});

function removePopUp() {
    exerciseNameInput.value = "";
    repetitionsInput.value = "";
    popUpContainer.classList.remove("show");
}

function renderItems() {
    displayItems();
    saveItems();
}

function saveItems() {
    localStorage.setItem("items", JSON.stringify(itemsArr));
}
function displayItems() {
    exerciseList.innerHTML = itemsArr.map((item) => ExerciseItem(item)).join("");
    addEventListeners();
}

renderItems();

function startTimer() {
    let minutes = 0;
    let seconds = 0;
    function updateTimer() {
        if (seconds > 59) {
            seconds = 0;
            minutes++;
            return seconds;
        } else {
            return seconds > 10 ? seconds : `0${seconds}`;
        }
    }

    minutInterval = setInterval(() => {
        seconds++;
        timer = `
        <span>${minutes > 10 ? minutes : `0${minutes}`
            }</span>:<span>${updateTimer()}</span>
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

startBtn.addEventListener("click", () => {
    mainTimerIsActive ? endTimer() : startTimer();
});

function updateBreakBar() {
    let startingTime = 5;
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
