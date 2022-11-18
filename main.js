

import { trackProgress } from "./js/timersController";

//  have an issue with "isUpdateList" var so we can work with it 


const menuIcon = document.querySelector('.menu-icon');
const mainNav = document.querySelector('.main-nav');



menuIcon.addEventListener('click', (event) => {
    event.preventDefault;
    mainNav.classList.toggle('show-menu');
    window.addEventListener("beforeunload", () => {
        mainNav.classList.toggle('show-menu');
    });
});




document.body.addEventListener("click", (event) => {
    event.stopPropagation();
    trackProgress(event);
})




