export default function ExerciseItem(itemName , repetitions ,id){
    return `
    <li id="${id}" class="exercise-item">
    <h2>${itemName} * ${repetitions}</h2>
    <span>
      <img src="assets/edit.png" class="edit-icon" />
      <img src="assets/delete.png" class="delete-icon" />
    </span>
  </li>`
}