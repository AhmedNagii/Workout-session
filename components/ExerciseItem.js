export default function ExerciseItem(item) {
  return `
    <li  class="exercise-item" data-id=${item.id}>
    <h2>${item.exerciseName} × ${item.exerciseRepetitions}</h2>
    <span>
      <img  src="assets/edit.png"    class="edit-icon" data-id=${item.id} />
      <img  src="assets/delete.png" class="delete-icon" data-id=${item.id} />
    </span>
  </li>`
}

