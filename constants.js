export const exerciseList = document.querySelector(".exercise-list");
export const repetitionsInput = document.getElementById("repetitions");
export const exerciseNameInput = document.getElementById("exercise_name");
export const popUpContainer = document.querySelector(".popUp-container");



export function addEventListeners(fun) {
    document.body.addEventListener("click", (event) => {
        event.stopPropagation(); //prevent bubbling
        fun(event)

    });
}
