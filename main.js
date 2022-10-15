import ExerciseItem from "./components/ExerciseItem"


const startBtn = document.querySelector('.start-button')
const popUpCancelBtn = document.querySelector(".popUp__cancel-btn")
const popUpSaveBtn = document.querySelector(".popUp__save-btn")
const popUpContainer = document.querySelector(".popUp-container")
const repetitionsInput = document.getElementById('repetitions')
const exerciseNameInput = document.getElementById('exercise_name')
const exerciseList = document.querySelector('.exercise-list')
const addItemBtn = document.querySelector(".add-item-btn")
const endMessage = document.querySelector('.end-message')



let itemsArr = JSON.parse(localStorage.getItem('items')) || [];

let currentId = ""
let isUpdateList = false
let mainTimerIsActive = false
let minutInterval;
let timer;


function addEventListeners() {
    document.body.addEventListener('click', (event) => {
        event.stopPropagation();  //prevent bubbling
        deleteItem(event)
        editeItem(event)
        updateItemBg(event)
    })
}


function addItem() {
    itemsArr.push({
        exerciseName: exerciseNameInput.value,
        exerciseRepetitions: repetitionsInput.value,
        id: Math.floor(Math.random() * 100)
    })
    removePopUp()
    renderItems()
}


function deleteItem(event) {
    if (!event.target.matches('.exercise-item')) return;
    currentId = event.target.dataset.id;
    const selectedItemReps = itemsArr.filter(item => currentId == item.id)[0].exerciseRepetitions;
    console.log(selectedItemReps)
    // we are getting num of reps now we can use it to update the background
    // event.target.style.background =
    //     "linear-gradient(to right, " + color_1.value + ", " + color_2.value + ")";
}


function editeItem(event) {
    if (!event.target.matches('.edit-icon')) return;
    currentId = event.target.dataset.id;
    const selectItem = itemsArr.filter(item => currentId == item.id);
    exerciseNameInput.value = selectItem[0].exerciseName
    repetitionsInput.value = Number(selectItem[0].exerciseRepetitions)
    popUpContainer.classList.add('show')
    isUpdateList = true
}

function updateItem(slectedId) {
    itemsArr.map(item => {
        if (item.id === Number(slectedId)) {
            item.exerciseName = exerciseNameInput.value
            item.exerciseRepetitions = repetitionsInput.value
        }
        return item
    })
    renderItems()
    removePopUp()
}



function updateItemBg(event) {
    if (!event.target.matches('.delete-icon')) return;
    const id = event.target.dataset.id;
    console.log(id)
    itemsArr = itemsArr.filter(item => item.id !== Number(id));
    renderItems();
}


addItemBtn.addEventListener('click', () => {
    isUpdateList = false
    popUpContainer.classList.add('show')
})

popUpSaveBtn.addEventListener('click', (e) => {
    e.preventDefault()
    console.log(isUpdateList)
    isUpdateList ? updateItem(currentId) : addItem()
})

popUpCancelBtn.addEventListener('click', (e) => {
    e.preventDefault()
    exerciseNameInput.value = ""
    repetitionsInput.value = ""
    popUpContainer.classList.remove('show')
})





function removePopUp() {
    exerciseNameInput.value = ""
    repetitionsInput.value = ""
    popUpContainer.classList.remove('show')
}





function renderItems() {
    displayItems();
    saveItems();
}


function saveItems() { localStorage.setItem('items', JSON.stringify(itemsArr)); }
function displayItems() {
    exerciseList.innerHTML = itemsArr.map(item => ExerciseItem(item)).join('')
    addEventListeners()
}


renderItems()












function startTimer() {

    let minutes = 0
    let seconds = 0
    function updateTimer() {
        if (seconds > 59) {
            seconds = 0
            minutes++
            return seconds
        } else {
            return seconds > 10 ? seconds : `0${seconds}`
        }

    }

    minutInterval = setInterval(function () {
        seconds++
        timer = `
        <span>${minutes > 10 ? minutes : `0${minutes}`}</span>:<span>${updateTimer()}</span>
        `
        startBtn.innerHTML = timer + '<h3>Finish</h3>'
    }, 1000);
    mainTimerIsActive = true
}

function endTimer() {
    clearInterval(minutInterval)
    startBtn.textContent = `Start`

    endMessage.innerHTML = `<h1>You have spent ${timer} today</h1>`

    mainTimerIsActive = false
}



startBtn.addEventListener('click', () => {
    console.log(mainTimerIsActive)
    mainTimerIsActive ? endTimer() : startTimer()

})