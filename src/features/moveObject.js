import {canvas} from "../index";
import {renderObjects} from "./renderObjects";
import {removeObject} from "./removeObject";

export const moveObject = (objectName, distance, angle) => {
    const targetObject = window.canvasObjects.find(el => el.name === objectName);
    angle = Number(angle)
    if (targetObject) {
        var initialX = targetObject.x;
        var initialY = targetObject.y;
        var positionX = targetObject.x;
        var positionY = targetObject.y;
    }
    if (objectName === '' || isNaN(distance) || isNaN(angle)) {
        throw new Error('Fill in all fields please')
    }
    const isObjectAlreadyExist = canvasObjects.some((el) => {
        return el.name === objectName
    })

    if (!isObjectAlreadyExist) {
        throw new Error('Type existing object name please')
    }

    removeObject(objectName)


    const timerMoveId = setInterval(function () {

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        renderObjects();
        removeObject(objectName);
        ctx.fillRect(positionX, positionY, 60, 60);


        switch (angle) {
            case 90: {
                positionY--;
                if (positionY < initialY - distance) {
                    clearInterval(timerMoveId)
                    window.canvasObjects = [...window.canvasObjects, {
                        name: objectName,
                        x: initialX,
                        y: initialY - distance,
                    }]
                    renderObjects()
                }
                break;
            }
            case 180: {
                positionX--;
                if (positionX < initialX - distance) {
                    clearInterval(timerMoveId)
                    window.canvasObjects = [...window.canvasObjects, {
                        name: objectName,
                        x: initialX - distance,
                        y: initialY,
                    }]
                    renderObjects()
                }
                break;
            }
            case 270: {
                positionY++
                if (positionY > initialY + distance) {
                    clearInterval(timerMoveId)
                    window.canvasObjects = [...window.canvasObjects, {
                        name: objectName,
                        x: initialX,
                        y: initialY + distance,
                    }]
                    renderObjects()
                }
                break;
            }
            case 360: {
                positionX++;
                if (positionX > initialX + distance) {
                    clearInterval(timerMoveId)
                    window.canvasObjects = [...window.canvasObjects, {
                        name: objectName,
                        x: initialX + distance,
                        y: initialY,
                    }]
                    renderObjects()
                }
                break;
            }
        }

    }, 15);


}
