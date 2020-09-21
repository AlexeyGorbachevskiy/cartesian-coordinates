export const removeObject = (objectName) => {

    if (objectName === '') {
        throw new Error('Fill in all fields please')
    }

    const removedObject = window.canvasObjects.find((el) => {
        return el.name === objectName
    })

    window.canvasObjects = window.canvasObjects.filter((el) => {
        return el.name !== objectName
    })


    return removedObject
}
