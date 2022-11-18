
import ExerciseItem from "../components/ExerciseItem";
import {
    repetitionsInput,
    exerciseNameInput,
    popUpContainer,
    exerciseList,
} from "./constants";



export let itemsArr = JSON.parse(localStorage.getItem("items")) || [];

let currentId = "";
const popUpCancelBtn = document.querySelector(".popUp__cancel-btn");
const popUpSaveBtn = document.querySelector(".popUp__save-btn");
const addItemBtn = document.querySelector(".add-item-btn");
const popUpEditBtn = document.querySelector(".popUp__edit-btn");
const validationErrorMessage = document.querySelector(".popUp-form__error-message");


addItemBtn.addEventListener("click", (e) => {
    e.preventDefault();
    popUpContainer.classList.add("show");
    popUpEditBtn.style.display = "none";
    popUpSaveBtn.style.display = "block";
});

popUpSaveBtn.addEventListener("click", (e) => {
    e.preventDefault();

    checkInput(repetitionsInput, exerciseNameInput) && addItem();
});



popUpCancelBtn.addEventListener("click", (e) => {
    e.preventDefault();
    exerciseNameInput.value = "";
    repetitionsInput.value = "";
    popUpContainer.classList.remove("show");
});


popUpEditBtn.addEventListener("click", (e) => {
    e.preventDefault();
    checkInput(repetitionsInput, exerciseNameInput) && updateItemsUi(currentId);

});


function addItem() {

    itemsArr.push({
        exerciseName: exerciseNameInput.value,
        exerciseReps: repetitionsInput.value,
        completedReps: 0,
        completionPercentage: 0,
        id: Math.floor(Math.random() * 100),
    });
    removePopUp();
    displayItems();

}


function deleteItem(event) {
    if (!event.target.matches(".delete-icon")) return;
    const id = event.target.dataset.id;
    itemsArr = itemsArr.filter((item) => item.id !== Number(id));
    renderItems();
}

function editeItem(event) {

    if (!event.target.matches(".edit-icon")) return;
    let secltedItem = selectedItem(event);
    exerciseNameInput.value = secltedItem.exerciseName;
    repetitionsInput.value = Number(secltedItem.exerciseReps);
    popUpContainer.classList.add("show");

    popUpEditBtn.style.display = "block";
    popUpSaveBtn.style.display = "none";
}

function updateItemsUi(slectedId) {
    itemsArr.map((item) => {
        if (item.id === Number(slectedId)) {
            item.exerciseName = exerciseNameInput.value;
            item.exerciseReps = repetitionsInput.value;
            item.completionPercentage = 0;
            item.completionPercentage = 100 / item.exerciseReps * item.completedReps;
        }
        return item;
    });
    removePopUp();
    renderItems();
}



export function renderItems() {
    saveItems();
    displayItems();
}

export function selectedItem(event) {
    currentId = event.target.dataset.id;
    let selectItem = itemsArr.filter((item) => currentId == item.id);
    return selectItem[0];
}

function saveItems() {
    localStorage.setItem("items", JSON.stringify(itemsArr));
}


function displayItems() {

    exerciseList.innerHTML = itemsArr.length ?
        itemsArr.map((item) => ExerciseItem(item)).join("")
        : "";

    addEventListeners();
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

function checkInput(numInput, textInput) {
    if (textInput.value.length < 2 || numInput.value === "") {
        validationErrorMessage.style.display = "block";
        return false;
    } else {
        validationErrorMessage.style.display = "none";
        return true;
    }
}


renderItems();