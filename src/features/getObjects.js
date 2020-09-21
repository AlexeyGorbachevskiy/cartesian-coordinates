
export const getObjectsByXY = (x, y) => {

    let objectIndex = window.canvasObjects.findIndex((el, ind) => {
        const currentX = Object.values(el)[1]
        const currentY = Object.values(el)[2]
        if (x === currentX && y === currentY) {
            return el
        }
    })

    if (objectIndex !== -1) {
        window.ctx.lineWidth = 5;
        window.ctx.strokeStyle = 'red'
        window.ctx.strokeRect(x, y, 60, 60);
        return window.canvasObjects[objectIndex].name
    } else {
        throw new Error('Type existing coordinates.')
    }
}
