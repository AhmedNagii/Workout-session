
import { renderItems } from "./mainOpreations";
import { trackProgress } from "./timersController";


//  have an issue with "isUpdateList" var so we can work with it 





document.body.addEventListener("click", (event) => {
    event.stopPropagation();
    trackProgress(event)
})

renderItems()



const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '071e4eb0fbmshd94b32f119f66ddp18f6acjsne6919dd1e730',
        'X-RapidAPI-Host': 'exercises-by-api-ninjas.p.rapidapi.com'
    }
};


fetch('https://exercises-by-api-ninjas.p.rapidapi.com/v1/exercises', options)
    .then(res => res.json()).then(data => console.log(data))