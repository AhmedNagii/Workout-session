import ExerciseItem from "./components/ExerciseItem"


const popUpCancelBtn = document.querySelector(".popUp__cancel-btn")
const popUpAddBtn = document.querySelector(".popUp__add-btn")
const popUpContainer = document.querySelector(".popUp-container")
const repetitionsInput = document.getElementById('repetitions')
const exerciseNameInput = document.getElementById('exercise_name')
const exerciseList = document.querySelector('.exercise-list')
const addItemBtn = document.querySelector(".add-item-btn")
const deleteIcon = document.querySelector('.delete-icon')


let itemsArr = JSON.parse(localStorage.getItem('items')) || [];




function addItem() {
    itemsArr.push({
        exerciseName: exerciseNameInput.value,
        exerciseRepetitions: repetitionsInput.value,
        id: Math.floor(Math.random() * 100)
    })
    exerciseNameInput.value = ""
    repetitionsInput.value = ""
    popUpContainer.classList.remove('show')
    renderItems()

}

function deleteItem() {
    document.body.addEventListener('click', (event) => {
        event.stopPropagation(); //prevent bubbling
        if (!event.target.matches('.delete-icon')) return;
        const id = event.target.dataset.id;
        console.log(id)
        itemsArr = itemsArr.filter(item => item.id !== Number(id));
        renderItems();
    })

}


function editeItem() {
    document.body.addEventListener('click', (event) => {
        event.stopPropagation(); //prevent bubbling
        if (!event.target.matches('.edit-icon')) return;
        const id = event.target.dataset.id;
        const selectItem = itemsArr.filter(item => id.slice(0, 2) == item.id);

        exerciseNameInput.value = selectItem[0].exerciseName
        repetitionsInput.value = Number(selectItem[0].exerciseRepetitions)
        popUpContainer.classList.add('show')

        itemsArr.map(item => {
            item.id === Number(id) ? { ...item, exerciseNameInput, repetitionsInput } : item
        })

    })
}


addItemBtn.addEventListener('click', () => {
    popUpContainer.classList.add('show')
})

popUpAddBtn.addEventListener('click', (e) => {
    e.preventDefault()
    addItem()
})

popUpCancelBtn.addEventListener('click', (e) => {
    e.preventDefault()
    exerciseNameInput.value = ""
    repetitionsInput.value = ""
    popUpContainer.classList.remove('show')
})









function addListerns() {
    deleteItem()
    editeItem()
}


function renderItems() {
    displayItems();
    saveItems();
}


function saveItems() { localStorage.setItem('items', JSON.stringify(itemsArr)); }
function displayItems() {


    itemsArr.length > 0 && addListerns()
    exerciseList.innerHTML = itemsArr.map(item => ExerciseItem(item)).join('')
}

renderItems()