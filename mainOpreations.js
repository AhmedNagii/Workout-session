import ExerciseItem from "./components/ExerciseItem";
import {
    repetitionsInput,
    exerciseNameInput,
    popUpContainer,
    exerciseList,

} from "./constants"


export let itemsArr = JSON.parse(localStorage.getItem("items")) || [];
export let isEditing = false;
export let currentId = ""
const popUpCancelBtn = document.querySelector(".popUp__cancel-btn");
const popUpSaveBtn = document.querySelector(".popUp__save-btn");
const addItemBtn = document.querySelector(".add-item-btn");


addItemBtn.addEventListener("click", () => {

    popUpContainer.classList.add("show");
});

popUpSaveBtn.addEventListener("click", (e) => {
    e.preventDefault();

    isEditing ? updateItemsUi(currentId) : addItem();
});

popUpCancelBtn.addEventListener("click", (e) => {
    e.preventDefault();
    exerciseNameInput.value = "";
    repetitionsInput.value = "";
    popUpContainer.classList.remove("show");
});





export function addItem() {

    itemsArr.push({
        exerciseName: exerciseNameInput.value,
        exerciseReps: repetitionsInput.value,
        completion: 0,
        id: Math.floor(Math.random() * 100),
    });
    removePopUp();
    displayItems()
    isEditing = false
}


export function deleteItem(event) {
    if (!event.target.matches(".delete-icon")) return;
    const id = event.target.dataset.id;
    itemsArr = itemsArr.filter((item) => item.id !== Number(id));
    console.log(itemsArr)
    renderItems();
}


export function editeItem(event) {
    if (!event.target.matches(".edit-icon")) return;
    currentId = event.target.dataset.id;
    const selectItem = itemsArr.filter((item) => currentId == item.id);
    exerciseNameInput.value = selectItem[0].exerciseName;
    repetitionsInput.value = Number(selectItem[0].exerciseReps);
    popUpContainer.classList.add("show");
    isEditing = true;
}

export function updateItemsUi(slectedId) {
    itemsArr.map((item) => {
        if (item.id === Number(slectedId)) {
            item.exerciseName = exerciseNameInput.value;
            item.exerciseReps = repetitionsInput.value;
        }
        return item;
    });
    removePopUp();
    renderItems()
}



export function renderItems() {
    console.log('render')
    saveItems()
    displayItems()
}


function saveItems() {
    localStorage.setItem("items", JSON.stringify(itemsArr));
}


function displayItems() {

    exerciseList.innerHTML = itemsArr.map((item) => ExerciseItem(item)).join("");
    addEventListeners()
}


function removePopUp() {
    exerciseNameInput.value = "";
    repetitionsInput.value = "";
    popUpContainer.classList.remove("show");
}


function addEventListeners() {
    document.body.addEventListener("click", (event) => {
        event.stopPropagation(); //prevent bubbling
        deleteItem(event);
        editeItem(event);

    });
}
