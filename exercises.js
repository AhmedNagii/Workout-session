
import Exercisesdetails from "./components/exercisesdetails";

const URL = 'https://exercises-by-api-ninjas.p.rapidapi.com/v1/exercises'
const exercisesList = document.querySelector('.exercises-list')
const difficultySelector = document.getElementById('difficulty-selector')
const muscleSelector = document.getElementById('muscle-selector')
const getBtn = document.getElementById('get-exerciese-btn')
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '071e4eb0fbmshd94b32f119f66ddp18f6acjsne6919dd1e730',
        'X-RapidAPI-Host': 'exercises-by-api-ninjas.p.rapidapi.com'
    }
};


getBtn.addEventListener("click", (event) => {
    event.preventDefault()
    const fullUrl = `${URL}?difficulty=${difficultySelector.value}&muscle=${muscleSelector.value}`
    getApiData(fullUrl, options)
})



async function getApiData(fullUrl, options) {

    try {
        const response = await fetch(fullUrl, options)
        if (response.status >= 200 && response.status <= 299) {
            const data = await response.json()
            exercisesList.innerHTML =
                data.map(item => Exercisesdetails(item)).join("")
        } else {
            throw Error(response.statusText)
        }
    } catch (err) {
        exercisesList.innerHTML = ` <li class="failure-message">
    <img src="assets/error-icon.png" alt="connection error icon">
                <h2>
                There is an error occurred<br/>
                Please try later Or check your internet connection </h2>
            </li>`
    }
}