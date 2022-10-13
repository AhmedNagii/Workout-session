import ExerciseItem from "./components/ExerciseItem"


const popUpCancelBtn = document.querySelector(".popUp__cancel-btn")
const popUpAddBtn = document.querySelector(".popUp__add-btn")
const popUpContainer = document.querySelector(".popUp-container")
const repetitionsInput = document.getElementById('repetitions')
const exerciseNameInput = document.getElementById('exercise_name')
const exerciseList = document.querySelector('.exercise-list')



let itemsArr = []


function addItem (){

 
    exerciseList.innerHTML += ExerciseItem(exerciseNameInput.value, repetitionsInput.value)
        itemsArr.push({
            exerciseName:  exerciseNameInput.value,
            exerciseRepetitions:repetitionsInput.value,
            id: itemsArr.length * 3
        }) 
        exerciseNameInput.value = ""
        repetitionsInput.value = ""
        popUpContainer.classList.remove('show')
      console.log(exerciseList)
        
   
}


popUpAddBtn.addEventListener('click' , (e) => {
    e.preventDefault()
    addItem()
   
})

// function deleteItem (){
  
// }

document.querySelector(".add-item-btn").addEventListener('click',() => {
    popUpContainer.classList.add('show')
})



popUpCancelBtn.addEventListener('click' , (e) => {
    e.preventDefault()
    
    popUpContainer.classList.remove('show')
})




