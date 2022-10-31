export default function Exercisesdetails(item) {


    const { equipment, instructions, name, type } = item
    return ` <li class="exercises-list__item">
                <div class="items-container raw">                   
                    <p class="item__text">Equipment: ${equipment}</p>
                    <p class="item__text">Name: ${name}</p>
                    <p class="item__text">Type: ${type}</p>
                </div>
                <p class="item__instructions">${instructions}</p>
            </li>`
}