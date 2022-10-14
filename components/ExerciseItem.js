export default function ExerciseItem(item) {
  return `
    <li id="${item.id}" class="exercise-item">
    <h2>${item.exerciseName} * ${item.exerciseRepetitions}</h2>
    <span>
      <img  src="assets/edit.png"    class="edit-icon" data-id=${item.id} />
      <img  src="assets/delete.png" class="delete-icon" data-id=${item.id} />
    </span>
  </li>`
}

