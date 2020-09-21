
export const setObjectsByXY = (name, x, y) => {

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
    if (isNameAlreadyExist) {
        throw new Error('This object name already exists')
    }


    window.ctx.rect(x, y, 60, 60);
    window.ctx.fill();

    window.canvasObjects = [
        ...window.canvasObjects,
        {name, x, y,}
    ]

}
