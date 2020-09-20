let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

const createCanvas = () => {
    canvas.width = 700;
    canvas.height = 700;
    let w = canvas.width;
    let h = canvas.height;
    for (let x = -0.5; x < w; x += 20) ctx.strokeRect(x + 20, 20, 0.1, h);
    for (let y = -0.5; y < h; y += 20) ctx.strokeRect(20, y + 20, w, 0.1);
    ctx.stroke();
}

// initial state
let canvasObjects = [
    {
        name: 'object1',
        x: 20,
        y: 20
    },
    {
        name: 'object2',
        x: 580,
        y: 620
    },
    {
        name: 'object3',
        x: 300,
        y: 340
    },
]

var isLocalStorageUsing = false;
window.onload = function (e) {

    if (localStorage.length !== 0) {
        isLocalStorageUsing = true;
        canvasObjects = [];
        for (let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);
            let item = JSON.parse(localStorage.getItem(key))
            canvasObjects = [...canvasObjects, item]
        }
    }
    renderObjects()
}


const renderObjects = () => {
    createCanvas()

    canvasObjects.forEach((el) => {
        for (let key in el) {
            if (el.hasOwnProperty(key) && key === 'name') {
                ctx.rect(el.x, el.y, 60, 60);
                ctx.font = "bold 12pt Arial";
                ctx.fillText(`x:${el.x}; y:${el.y}`, el.x, el.y - 5);
                ctx.fillText(`name:${el.name}`, el.x, el.y + 75);
            }
        }
    })
    ctx.fillStyle = 'green';
    ctx.fill();

}

const getObjectsByXY = (x, y) => {

    let objectIndex = canvasObjects.findIndex((el, ind) => {
        const currentX = Object.values(el)[1]
        const currentY = Object.values(el)[2]
        if (x === currentX && y === currentY) {
            return el
        }
    })

    if (objectIndex !== -1) {
        ctx.lineWidth = 5;
        ctx.strokeStyle = 'red'
        ctx.strokeRect(x, y, 60, 60);
        return canvasObjects[objectIndex].name
    } else {
        throw new Error('Type existing coordinates.')
    }
}


const setObjectsByXY = (name, x, y) => {

    if (name === '' || isNaN(x) || isNaN(y)) {
        throw new Error('Fill in all fields please')
    }

    let isCoordinatesAlreadyExists = canvasObjects.some((el) => {
        return el.x === x && el.y === y
    })
    if (isCoordinatesAlreadyExists) {
        throw new Error('These coordinates are already taken')
    }

    let isNameAlreadyExist = canvasObjects.some((el) => {
        return el.name === name
    })
    if (isNameAlreadyExist) {
        throw new Error('This object name already exists')
    }


    ctx.rect(x, y, 60, 60);
    ctx.fill();

    canvasObjects = [
        ...canvasObjects,
        {name, x, y,}
    ]
}

const updateObjectXY = (name, x, y) => {

    if (name === '' || isNaN(x) || isNaN(y)) {
        throw new Error('Fill in all fields please')
    }

    let isCoordinatesAlreadyExists = canvasObjects.some((el) => {
        return el.x === x && el.y === y
    })
    if (isCoordinatesAlreadyExists) {
        throw new Error('These coordinates are already taken')
    }

    let isNameAlreadyExist = canvasObjects.some((el) => {
        return el.name === name
    })
    if (!isNameAlreadyExist) {
        throw new Error('Set existing object name please')
    }

    console.log(isNameAlreadyExist)

    canvasObjects = canvasObjects.map((el) => {
        if (el.name === name) {
            ctx.clearRect(el.x, el.y, 60, 60);
            return {
                name: el.name,
                x,
                y,
            }
        }
        return el
    })
    renderObjects()
}


renderObjects()
// getObjectsByXY(300, 340)
// console.log(getObjectsByXY(900, 500))
// console.log(setObjectsByXY('object3', 1000, 50))
// console.log(updateObjectXY('object1', 1200, 100))


const rotateObject = (x, y, radius, angle) => {


    if (isNaN(x) || isNaN(y) || isNaN(radius) || isNaN(angle)) {
        throw new Error('Fill in all fields please')
    }
    let currentAngle = angle;
    let currentRadius = radius;
    let baseX = x;
    let baseY = y;

    const rotateTimerId = setInterval(function () {
        createCanvas()
        renderObjects()
        const vx = Math.cos(currentAngle) * currentRadius;
        const vy = Math.sin(currentAngle) * currentRadius;
        ctx.fillRect(baseX + vx, baseY + vy, 60, 60);
        currentAngle += 0.1;

        if (isRotating) {
            clearInterval(rotateTimerId);
            canvasObjects = [...canvasObjects, removedRotateObject];
            renderObjects();
            isRotating = false;
        }

    }, 50)
}

const removeObject = (objectName) => {

    if (objectName === '') {
        throw new Error('Fill in all fields please')
    }


    const removedObject = canvasObjects.find((el) => {
        return el.name === objectName
    })

    if(localStorage.length!==0){
        localStorage.removeItem(removedObject.name)
    }

    canvasObjects = canvasObjects.filter((el) => {
        return el.name !== objectName
    })

    return removedObject
}


const moveObject = (objectName, distance, angle) => {
    const targetObject = canvasObjects.find(el => el.name === objectName);
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


    var timerMoveId = setInterval(function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        renderObjects();
        removeObject(objectName);
        ctx.fillRect(positionX, positionY, 60, 60);


        switch (angle) {
            case 90: {
                positionY--;
                if (positionY < initialY - distance) {
                    clearInterval(timerMoveId)
                    canvasObjects = [...canvasObjects, {
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
                    canvasObjects = [...canvasObjects, {
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
                    canvasObjects = [...canvasObjects, {
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
                    canvasObjects = [...canvasObjects, {
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

// moveObject('object3',100,270)
// console.log(canvasObjects)

// -----------------------------------------------------HANDLERS-------------------------------------------------
var isRotating = false;
var getInputError = false;
var setInputError = false;
var updateInputError = false;
var removeInputError = false;
var rotateInputError = false;
var moveInputError = false;
var removedRotateObject = '';
var rotateCallsCount = 0;

function errorReset() {
    isRotating = false;
    getInputError = false;
    setInputError = false;
    updateInputError = false;
    removeInputError = false;
    rotateInputError = false;
    moveInputError = false;
    let list = document.getElementsByTagName('input');
    for (let i = 0; i < list.length; i++) {
        list[i].style.border = 'none'
    }
    document.getElementById('move-object-angle-select').style.border = 'none';
}


// Get Object
const getObjectBtn = document.getElementById('get-object-btn')
getObjectBtn.addEventListener('click', onGetObject)

function onGetObject() {
    errorReset()
    createCanvas()
    renderObjects()
    const getObjectX = document.getElementById('get-object-input-x').valueAsNumber
    const getObjectY = document.getElementById('get-object-input-y').valueAsNumber
    try {
        getObjectsByXY(getObjectX, getObjectY);
        if (document.querySelector('.error-alert')) {
            document.querySelector('.error-alert').remove()
        }
        getInputError = false;
        document.getElementById('get-object-input-x').style.border = 'none'
        document.getElementById('get-object-input-y').style.border = 'none'
    } catch (e) {
        if (document.querySelector('.error-alert')) {
            document.querySelector('.error-alert').remove()
        }
        getInputError = true;
        document.getElementById('get-object-input-x').style.border = '2px solid red'
        document.getElementById('get-object-input-y').style.border = '2px solid red'

        if (document.querySelector('.error-alert') === null) {
            const errorAlert = document.createElement("div");
            errorAlert.className = "error-alert";
            errorAlert.innerHTML = `<strong>Attention!</strong> ${e.message}`;
            document.querySelector('.move-object').append(errorAlert);
        }
    }

}

// Set Object
const setObjectBtn = document.getElementById('set-object-btn')
setObjectBtn.addEventListener('click', onSetObject)

function onSetObject() {
    errorReset()
    const setObjectName = document.getElementById('set-object-input-name').value
    const setObjectX = document.getElementById('set-object-input-x').valueAsNumber
    const setObjectY = document.getElementById('set-object-input-y').valueAsNumber

    try {
        setObjectsByXY(setObjectName, setObjectX, setObjectY);
        renderObjects();
        if (document.querySelector('.error-alert')) {
            document.querySelector('.error-alert').remove()
        }
        setInputError = false;
        document.getElementById('set-object-input-name').style.border = 'none'
        document.getElementById('set-object-input-x').style.border = 'none'
        document.getElementById('set-object-input-y').style.border = 'none'

    } catch (e) {
        if (document.querySelector('.error-alert')) {
            document.querySelector('.error-alert').remove()
        }
        setInputError = true;
        document.getElementById('set-object-input-name').style.border = '2px solid red'
        document.getElementById('set-object-input-x').style.border = '2px solid red'
        document.getElementById('set-object-input-y').style.border = '2px solid red'
        if (document.querySelector('.error-alert') === null) {
            const errorAlert = document.createElement("div");
            errorAlert.className = "error-alert";
            errorAlert.innerHTML = `<strong>Attention!</strong> ${e.message}`;
            document.querySelector('.move-object').append(errorAlert);
        }
    }


}

// Update Object
const updateObjectBtn = document.getElementById('update-object-btn')
updateObjectBtn.addEventListener('click', onUpdateObject)

function onUpdateObject() {
    errorReset()
    const updateObjectName = document.getElementById('update-object-input-name').value
    const updateObjectX = document.getElementById('update-object-input-x').valueAsNumber
    const updateObjectY = document.getElementById('update-object-input-y').valueAsNumber

    try {
        updateObjectXY(updateObjectName, updateObjectX, updateObjectY);
        if (document.querySelector('.error-alert')) {
            document.querySelector('.error-alert').remove()
        }
        updateInputError = false;
        document.getElementById('update-object-input-name').style.border = 'none'
        document.getElementById('update-object-input-x').style.border = 'none'
        document.getElementById('update-object-input-y').style.border = 'none'
    } catch (e) {
        if (document.querySelector('.error-alert')) {
            document.querySelector('.error-alert').remove()
        }
        updateInputError = true;
        document.getElementById('update-object-input-name').style.border = '2px solid red'
        document.getElementById('update-object-input-x').style.border = '2px solid red'
        document.getElementById('update-object-input-y').style.border = '2px solid red'
        if (document.querySelector('.error-alert') === null) {
            const errorAlert = document.createElement("div");
            errorAlert.className = "error-alert";
            errorAlert.innerHTML = `<strong>Attention!</strong> ${e.message}`;
            document.querySelector('.move-object').append(errorAlert);
        }
    }

    // renderObjects()
}

// Remove Object
const removeObjectBtn = document.getElementById('remove-object-btn')
removeObjectBtn.addEventListener('click', onRemoveObject)

function onRemoveObject() {
    errorReset()
    const removedObjectName = document.getElementById('removed-object-name').value

    try {
        removeObject(removedObjectName);
        renderObjects();
        if (document.querySelector('.error-alert')) {
            document.querySelector('.error-alert').remove()
        }
        removeInputError = false;
        document.getElementById('removed-object-name').style.border = 'none'
    } catch (e) {
        if (document.querySelector('.error-alert')) {
            document.querySelector('.error-alert').remove()
        }
        removeInputError = true;
        document.getElementById('removed-object-name').style.border = '2px solid red'
        if (document.querySelector('.error-alert') === null) {
            const errorAlert = document.createElement("div");
            errorAlert.className = "error-alert";
            errorAlert.innerHTML = `<strong>Attention!</strong> ${e.message}`;
            document.querySelector('.move-object').append(errorAlert);
        }
    }
}

// Rotate Object
const rotateObjectBtn = document.getElementById('rotate-object-btn')
rotateObjectBtn.addEventListener('click', onRotateObject)

function onRotateObject() {
    errorReset()
    const rotateObjectName = document.getElementById('rotate-object-input-name').value
    const rotateObjectX = document.getElementById('rotate-object-input-x').valueAsNumber
    const rotateObjectY = document.getElementById('rotate-object-input-y').valueAsNumber
    const rotateObjectRadius = document.getElementById('rotate-object-input-radius').valueAsNumber
    const rotateObjectAngle = document.getElementById('rotate-object-input-angle').valueAsNumber

    try {
        const isObjectAlreadyExist = canvasObjects.some((el) => {
            return el.name === rotateObjectName
        })

        if (!isObjectAlreadyExist) {
            throw new Error('Type existing object name please')
        }

        removedRotateObject = removeObject(rotateObjectName)
        rotateObject(rotateObjectX, rotateObjectY, rotateObjectRadius, rotateObjectAngle);
        document.getElementById('rotate-object-btn').disabled = true;
        if (document.querySelector('.error-alert')) {
            document.querySelector('.error-alert').remove()
        }
        rotateInputError = false;
        document.getElementById('rotate-object-input-name').style.border = 'none'
        document.getElementById('rotate-object-input-x').style.border = 'none'
        document.getElementById('rotate-object-input-y').style.border = 'none'
        document.getElementById('rotate-object-input-radius').style.border = 'none'
        document.getElementById('rotate-object-input-angle').style.border = 'none'
    } catch (e) {
        if (document.querySelector('.error-alert')) {
            document.querySelector('.error-alert').remove()
        }
        rotateInputError = true;
        document.getElementById('rotate-object-input-name').style.border = '2px solid red'
        document.getElementById('rotate-object-input-x').style.border = '2px solid red'
        document.getElementById('rotate-object-input-y').style.border = '2px solid red'
        document.getElementById('rotate-object-input-radius').style.border = '2px solid red'
        document.getElementById('rotate-object-input-angle').style.border = '2px solid red'
        if (document.querySelector('.error-alert') === null) {
            const errorAlert = document.createElement("div");
            errorAlert.className = "error-alert";
            errorAlert.innerHTML = `<strong>Attention!</strong> ${e.message}`;
            document.querySelector('.move-object').append(errorAlert);
        }

    }

}

const stopRotateObjectBtn = document.getElementById('stop-object-rotation-btn')
stopRotateObjectBtn.addEventListener('click', onStopRotateObject)

function onStopRotateObject() {
    isRotating = true
    document.getElementById('rotate-object-btn').disabled = false;
}


// Move Object
const moveObjectBtn = document.getElementById('move-object-btn')
moveObjectBtn.addEventListener('click', onMoveObject)

function onMoveObject() {
    errorReset()
    const moveObjectName = document.getElementById('move-object-input-name').value
    const moveObjectDistance = document.getElementById('move-object-input-distance').valueAsNumber
    const moveObjectAngle = document.getElementById('move-object-angle-select').value

    try {
        moveObject(moveObjectName, moveObjectDistance, moveObjectAngle);
        if (document.querySelector('.error-alert')) {
            document.querySelector('.error-alert').remove()
        }
        moveInputError = false;
        document.getElementById('move-object-input-name').style.border = 'none'
        document.getElementById('move-object-input-distance').style.border = 'none'
        document.getElementById('move-object-angle-select').style.border = 'none'
    } catch (e) {
        if (document.querySelector('.error-alert')) {
            document.querySelector('.error-alert').remove()
        }
        moveInputError = true;
        document.getElementById('move-object-input-name').style.border = '2px solid red'
        document.getElementById('move-object-input-distance').style.border = '2px solid red'
        document.getElementById('move-object-angle-select').style.border = '2px solid red'
        if (document.querySelector('.error-alert') === null) {
            const errorAlert = document.createElement("div");
            errorAlert.className = "error-alert";
            errorAlert.innerHTML = `<strong>Attention!</strong> ${e.message}`;
            document.querySelector('.move-object').append(errorAlert);
        }
    }

}


// --------------------------------------------------Elimination of validation side effects------------------------------------------------


// Get
document.getElementById('get-object-input-x').onfocus = function () {
    if (!getInputError) {
        document.getElementById('get-object-input-x').style.border = '1px solid dodgerblue'
    }

}
document.getElementById('get-object-input-x').onblur = function () {
    if (!getInputError) {
        document.getElementById('get-object-input-x').style.border = 'none'
    }
}

document.getElementById('get-object-input-y').onfocus = function () {
    if (!getInputError) {
        document.getElementById('get-object-input-y').style.border = '1px solid dodgerblue'
    }

}
document.getElementById('get-object-input-y').onblur = function () {
    if (!getInputError) {
        document.getElementById('get-object-input-y').style.border = 'none'
    }
}


//Set
document.getElementById('set-object-input-name').onfocus = function () {
    if (!setInputError) {
        document.getElementById('set-object-input-name').style.border = '1px solid dodgerblue'
    }

}
document.getElementById('set-object-input-name').onblur = function () {
    if (!setInputError) {
        document.getElementById('set-object-input-name').style.border = 'none'
    }
}

document.getElementById('set-object-input-x').onfocus = function () {
    if (!setInputError) {
        document.getElementById('set-object-input-x').style.border = '1px solid dodgerblue'
    }

}
document.getElementById('set-object-input-x').onblur = function () {
    if (!setInputError) {
        document.getElementById('set-object-input-x').style.border = 'none'
    }
}

document.getElementById('set-object-input-y').onfocus = function () {
    if (!setInputError) {
        document.getElementById('set-object-input-y').style.border = '1px solid dodgerblue'
    }

}
document.getElementById('set-object-input-y').onblur = function () {
    if (!setInputError) {
        document.getElementById('set-object-input-y').style.border = 'none'
    }
}


//Update
document.getElementById('update-object-input-name').onfocus = function () {
    if (!updateInputError) {
        document.getElementById('update-object-input-name').style.border = '1px solid dodgerblue'
    }

}
document.getElementById('update-object-input-name').onblur = function () {
    if (!updateInputError) {
        document.getElementById('update-object-input-name').style.border = 'none'
    }
}

document.getElementById('update-object-input-x').onfocus = function () {
    if (!updateInputError) {
        document.getElementById('update-object-input-x').style.border = '1px solid dodgerblue'
    }

}
document.getElementById('update-object-input-x').onblur = function () {
    if (!updateInputError) {
        document.getElementById('update-object-input-x').style.border = 'none'
    }
}

document.getElementById('update-object-input-y').onfocus = function () {
    if (!updateInputError) {
        document.getElementById('update-object-input-y').style.border = '1px solid dodgerblue'
    }

}
document.getElementById('update-object-input-y').onblur = function () {
    if (!updateInputError) {
        document.getElementById('update-object-input-y').style.border = 'none'
    }
}

// Remove
document.getElementById('removed-object-name').onfocus = function () {
    if (!removeInputError) {
        document.getElementById('removed-object-name').style.border = '1px solid dodgerblue'
    }

}
document.getElementById('removed-object-name').onblur = function () {
    if (!removeInputError) {
        document.getElementById('removed-object-name').style.border = 'none'
    }
}

//Rotate
document.getElementById('rotate-object-input-name').onfocus = function () {
    if (!rotateInputError) {
        document.getElementById('rotate-object-input-name').style.border = '1px solid dodgerblue'
    }

}
document.getElementById('rotate-object-input-name').onblur = function () {
    if (!rotateInputError) {
        document.getElementById('rotate-object-input-name').style.border = 'none'
    }
}

document.getElementById('rotate-object-input-x').onfocus = function () {
    if (!rotateInputError) {
        document.getElementById('rotate-object-input-x').style.border = '1px solid dodgerblue'
    }

}
document.getElementById('rotate-object-input-x').onblur = function () {
    if (!rotateInputError) {
        document.getElementById('rotate-object-input-x').style.border = 'none'
    }
}

document.getElementById('rotate-object-input-y').onfocus = function () {
    if (!rotateInputError) {
        document.getElementById('rotate-object-input-y').style.border = '1px solid dodgerblue'
    }

}
document.getElementById('rotate-object-input-y').onblur = function () {
    if (!rotateInputError) {
        document.getElementById('rotate-object-input-y').style.border = 'none'
    }
}

document.getElementById('rotate-object-input-radius').onfocus = function () {
    if (!rotateInputError) {
        document.getElementById('rotate-object-input-radius').style.border = '1px solid dodgerblue'
    }

}
document.getElementById('rotate-object-input-radius').onblur = function () {
    if (!rotateInputError) {
        document.getElementById('rotate-object-input-radius').style.border = 'none'
    }
}

document.getElementById('rotate-object-input-angle').onfocus = function () {
    if (!rotateInputError) {
        document.getElementById('rotate-object-input-angle').style.border = '1px solid dodgerblue'
    }

}
document.getElementById('rotate-object-input-angle').onblur = function () {
    if (!rotateInputError) {
        document.getElementById('rotate-object-input-angle').style.border = 'none'
    }
}


// Move
document.getElementById('move-object-input-name').onfocus = function () {
    if (!moveInputError) {
        document.getElementById('move-object-input-name').style.border = '1px solid dodgerblue'
    }

}
document.getElementById('move-object-input-name').onblur = function () {
    if (!moveInputError) {
        document.getElementById('move-object-input-name').style.border = 'none'
    }
}

document.getElementById('move-object-input-distance').onfocus = function () {
    if (!moveInputError) {
        document.getElementById('move-object-input-distance').style.border = '1px solid dodgerblue'
    }

}
document.getElementById('move-object-input-distance').onblur = function () {
    if (!moveInputError) {
        document.getElementById('move-object-input-distance').style.border = 'none'
    }
}

document.getElementById('move-object-angle-select').onfocus = function () {
    if (!moveInputError) {
        document.getElementById('move-object-angle-select').style.border = '1px solid dodgerblue'
    }

}
document.getElementById('move-object-angle-select').onblur = function () {
    if (!moveInputError) {
        document.getElementById('move-object-angle-select').style.border = 'none'
    }
}


// -------------------------------------------Local Storage------------------------------------------------

const saveToLS = document.getElementById('save-to-ls')
saveToLS.addEventListener('click', saveToLocalStorage)

function saveToLocalStorage() {
    canvasObjects.forEach((el) => {
        localStorage.setItem(el.name, JSON.stringify(el));
        if (document.querySelector('.success-alert') === null) {
            const successAlert = document.createElement("div");
            successAlert.className = "success-alert";
            successAlert.innerHTML = `<strong>Hooray!</strong> Objects were successfully saved to local storage.`;
            document.querySelector('.move-object').append(successAlert);
            setTimeout(() => {
                document.querySelector('.success-alert').remove()
            }, 2000)
        }
    })
}

const clearLS = document.getElementById('clear-ls')
clearLS.addEventListener('click', clearLocalStorage)

function clearLocalStorage() {
    localStorage.clear()
    if (document.querySelector('.success-alert') === null) {
        const successAlert = document.createElement("div");
        successAlert.className = "success-alert";
        successAlert.innerHTML = `<strong>Hooray!</strong> Objects were successfully removed to local storage.`;
        document.querySelector('.move-object').append(successAlert);
        setTimeout(() => {
            document.querySelector('.success-alert').remove()
        }, 2000)
    }
}


// ---------------------------------------------Drag&Drop----------------------------------------------

function stroke(object) {
    ctx.strokeRect(object.x, object.y, 60, 60)
}

var isCursorInRect = function (object) {
    return mouse.x > object.x && mouse.x < object.x + 60 && mouse.y > object.y && mouse.y < object.y + 60
}


var mouse = {
    x: 0,
    y: 0,
}

var selected = false;

window.onmousemove = function (e) {
    mouse.x = e.pageX;
    mouse.y = e.pageY;
}

window.onmousedown = function (e) {
    if (!selected) {
        for (let i = 0; i < canvasObjects.length; i++) {
            if (isCursorInRect(canvasObjects[i])) {
                selected = canvasObjects[i];
            }
        }

    }
}

window.onmouseup = function (e) {
    selected = false;
}


let dragNDropSwitch = document.getElementById('switch');
dragNDropSwitch.addEventListener('click', onSwitchToggle)

function onSwitchToggle() {
    if (dragNDropSwitch.checked) {
        var switchTimerId = setInterval(function () {
            if (!dragNDropSwitch.checked) {
                clearInterval(switchTimerId)
            }
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            renderObjects()
            for (let i = 0; i < canvasObjects.length; i++) {
                if (isCursorInRect(canvasObjects[i])) {
                    ctx.lineWidth = 5;
                    ctx.strokeStyle = 'red'
                    stroke(canvasObjects[i])
                }
            }
            if (selected) {
                selected.x = mouse.x - 60 / 2;
                selected.y = mouse.y - 60 / 2;
                // stroke(selected)
            }
        }, 100)
    }
}














