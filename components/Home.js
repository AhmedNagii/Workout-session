export default function Home() {
    return `
    <main class="main-container">
  <ul class="exercise-list"></ul>
  <button class="add-item-btn">
    <img class="add-icon" src="assets/add.png" />
    <span>Add Exercise</span>
  </button>
  <button class="start-button">Start</button>
  <div class="end-message">
    <h1>How long did I spend today?</h1>
  </div>
</main>
    `
}