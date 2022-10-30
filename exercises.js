
import Exercisesdetails from "./components/exercisesdetails";

const exercisesList = document.querySelector('.exercises-list')

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '071e4eb0fbmshd94b32f119f66ddp18f6acjsne6919dd1e730',
        'X-RapidAPI-Host': 'exercises-by-api-ninjas.p.rapidapi.com'
    }
};


fetch('https://exercises-by-api-ninjas.p.rapidapi.com/v1/exercises', options)
    .then(res => res.json()).then(data => {
        exercisesList.innerHTML = data.map(item => {
            return Exercisesdetails(item)
        }
        ).join("")
    })



