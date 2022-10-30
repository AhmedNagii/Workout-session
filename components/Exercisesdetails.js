export default function Exercisesdetails(item) {


    const { difficulty, equipment, instructions, muscle, name, type } = item
    return ` <li class="exercises-list__item">
                <div class="items-container raw">
                    <p class="item__text">${difficulty}</p>
                    <p class="item__text">${equipment}</p>
                    <p class="item__text">${muscle}</p>
                    <p class="item__text">${name}</p>
                    <p class="item__text">${type}</p>
                </div>
                <p class="item__instructions">${instructions}</p>
            </li>`
}