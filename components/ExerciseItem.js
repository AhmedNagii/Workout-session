export default function ExerciseItem(item) {

  let { id, exerciseName, exerciseReps, completionPercentage } = item;
  // console.log('from rendering', completionPercentage)

  return `
  
    <li  class="exercise-item" >
   
    <h2>${exerciseName} × ${exerciseReps}</h2>
    <span class="row exercise-item-control">
    <span>
    <img  src="assets/edit.png"   alt="edit icon"  class="edit-icon" data-id=${id} />
    <img  src="assets/delete.png" alt="delete icon" class="delete-icon" data-id=${id} />
    
    </span>
    <div
    style= "background:linear-gradient(to right, #393E46 ${completionPercentage}%, white 0%)"
    data-id=${id} class="progressbar">
           ${completionPercentage.toFixed(0)}%
    </div>
    </span>
    </li>
    `
}


