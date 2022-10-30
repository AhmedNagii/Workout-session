

import { trackProgress } from "./timersController";

//  have an issue with "isUpdateList" var so we can work with it 




document.body.addEventListener("click", (event) => {
    event.stopPropagation();
    trackProgress(event)
})




