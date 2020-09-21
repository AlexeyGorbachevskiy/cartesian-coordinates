import {ctx} from "../index";

export const updateObjectXY = (name, x, y) => {

    if (name === '' || isNaN(x) || isNaN(y)) {
        throw new Error('Fill in all fields please')
    }

    let isCoordinatesAlreadyExists = window.canvasObjects.some((el) => {
        return el.x === x && el.y === y
    })
    if (isCoordinatesAlreadyExists) {
        throw new Error('These coordinates are already taken')
    }

    let isNameAlreadyExist = window.canvasObjects.some((el) => {
        return el.name === name
    })
    if (!isNameAlreadyExist) {
        throw new Error('Set existing object name please')
    }


    window.canvasObjects = window.canvasObjects.map((el) => {
        if (el.name === name) {
            window.ctx.clearRect(el.x, el.y, 60, 60);
            return {
                name: el.name,
                x,
                y,
            }
        }
        return el
    })
}
