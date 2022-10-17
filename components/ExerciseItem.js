export default function ExerciseItem(item) {
  return `
  
    <li  class="exercise-item" >
   
    <h2>${item.exerciseName} × ${item.exerciseReps}</h2>
    <span class="row">
    <span >
    <img  src="assets/edit.png"    class="edit-icon" data-id=${item.id} />
    <img  src="assets/delete.png" class="delete-icon" data-id=${item.id} />
    
    </span>
    <div
    style= "background:linear-gradient(to right, #393E46 ${item.completion}%, white 0%)"
    data-id=${item.id} class="progressbar">
           ${item.completion}%
    </div>
    </span>
    </li>
    `
}

