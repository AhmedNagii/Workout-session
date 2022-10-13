export default function ExerciseItem(itemName , repetitions ){
    return `
    <li class="exercise-item">
    <h2>${itemName} * ${repetitions}</h2>
    <span>
      <img src="assets/edit.png" class="edit-icon" />
      <img src="assets/delete.png" class="delete-icon" />
    </span>
  </li>`
}