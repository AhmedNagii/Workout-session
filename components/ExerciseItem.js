export default function ExerciseItem(item) {
  return `
  
    <li  class="exercise-item" >
   
    <h2>${item.exerciseName} × ${item.exerciseRepetitions}</h2>
    <span class="row">
    <span >
    <img  src="assets/edit.png"    class="edit-icon" data-id=${item.id} />
    <img  src="assets/delete.png" class="delete-icon" data-id=${item.id} />
    
    </span>
    <div data-id=${item.id} class="progressbar width-update">

    <div data-id=${item.id} class="progress width-update"> <h3>25%</h3>  </div>
    </div>
    </span>
    </li>
    `
}

