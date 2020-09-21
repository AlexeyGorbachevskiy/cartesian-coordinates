import {createCanvas} from './features/createCanvas'
import {renderObjects} from './features/renderObjects'
import './style.css'
import {setObjectsByXY} from "./features/setObjects";
import {updateObjectXY} from "./features/updateObjects";
import {rotateObject} from "./features/rotateObject";
import {moveObject} from "./features/moveObject";
import {removeObject} from "./features/removeObject";
import {errorReset} from "./utilities/errorReset";
import {getObjectsByXY} from "./features/getObjects";


export let canvas = document.getElementById("canvas");
window.ctx = canvas.getContext("2d");


createCanvas()


// initial state
window.canvasObjects = [
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


window.onload = function (e) {
    let isArrayExistInLocalStorage = localStorage.getItem('canvasObjects')
    if (isArrayExistInLocalStorage) {
        window.canvasObjects = JSON.parse(localStorage.getItem('canvasObjects'))
    }
    renderObjects()
}


// -----------------------------------------------------HANDLERS-------------------------------------------------
window.isRotating = false;
window.getInputError = false;
window.setInputError = false;
window.updateInputError = false;
window.moveInputError = false;
window.rotateInputError = false;
window.moveInputError = false;
window.removedRotateObject = '';
window.rotateCallsCount = 0;


//Get Object
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
        window.getInputError = false;
        document.getElementById('get-object-input-x').value = ''
        document.getElementById('get-object-input-y').value = ''
        document.getElementById('get-object-input-x').style.border = 'none'
        document.getElementById('get-object-input-y').style.border = 'none'
    } catch (e) {
        if (document.querySelector('.error-alert')) {
            document.querySelector('.error-alert').remove()
        }
        window.getInputError = true;
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
        window.setInputError = false;
        document.getElementById('set-object-input-name').value = ''
        document.getElementById('set-object-input-x').value = ''
        document.getElementById('set-object-input-y').value = ''
        document.getElementById('set-object-input-name').style.border = 'none'
        document.getElementById('set-object-input-x').style.border = 'none'
        document.getElementById('set-object-input-y').style.border = 'none'

    } catch (e) {
        if (document.querySelector('.error-alert')) {
            document.querySelector('.error-alert').remove()
        }
        window.setInputError = true;
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
        renderObjects()
        if (document.querySelector('.error-alert')) {
            document.querySelector('.error-alert').remove()
        }
        window.updateInputError = false;

        document.getElementById('update-object-input-name').value = ''
        document.getElementById('update-object-input-x').value = ''
        document.getElementById('update-object-input-y').value = ''

        document.getElementById('update-object-input-name').style.border = 'none'
        document.getElementById('update-object-input-x').style.border = 'none'
        document.getElementById('update-object-input-y').style.border = 'none'
    } catch (e) {
        if (document.querySelector('.error-alert')) {
            document.querySelector('.error-alert').remove()
        }
        window.updateInputError = true;
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
        window.moveInputError = false;
        document.getElementById('removed-object-name').value = ''
        document.getElementById('removed-object-name').style.border = 'none'
    } catch (e) {
        if (document.querySelector('.error-alert')) {
            document.querySelector('.error-alert').remove()
        }
        window.moveInputError = true;
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

        window.removedRotateObject = removeObject(rotateObjectName)
        window.rotateTimerId = rotateObject(rotateObjectX, rotateObjectY, rotateObjectRadius, rotateObjectAngle);
        document.getElementById('rotate-object-btn').disabled = true;
        if (document.querySelector('.error-alert')) {
            document.querySelector('.error-alert').remove()
        }
        window.rotateInputError = false;
        document.getElementById('rotate-object-input-name').value=''
        document.getElementById('rotate-object-input-x').value=''
        document.getElementById('rotate-object-input-y').value=''
        document.getElementById('rotate-object-input-radius').value=''
        document.getElementById('rotate-object-input-angle').value=''

        document.getElementById('rotate-object-input-name').style.border = 'none'
        document.getElementById('rotate-object-input-x').style.border = 'none'
        document.getElementById('rotate-object-input-y').style.border = 'none'
        document.getElementById('rotate-object-input-radius').style.border = 'none'
        document.getElementById('rotate-object-input-angle').style.border = 'none'
    } catch (e) {
        if (document.querySelector('.error-alert')) {
            document.querySelector('.error-alert').remove()
        }
        window.rotateInputError = true;
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


// Stop Rotation
const stopRotateObjectBtn = document.getElementById('stop-object-rotation-btn')
stopRotateObjectBtn.addEventListener('click', onStopRotateObject)

function onStopRotateObject() {
    window.isRotating = true
    document.getElementById('rotate-object-btn').disabled = false;

    if (window.isRotating) {
        clearInterval(rotateTimerId);
        window.canvasObjects = [...window.canvasObjects, window.removedRotateObject];
        renderObjects();
        window.isRotating = false;
    }
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
        window.moveInputError = false;
        document.getElementById('move-object-input-name').value=''
        document.getElementById('move-object-input-distance').value=''
        document.getElementById('move-object-angle-select').value=''

        document.getElementById('move-object-input-name').style.border = 'none'
        document.getElementById('move-object-input-distance').style.border = 'none'
        document.getElementById('move-object-angle-select').style.border = 'none'
    } catch (e) {
        if (document.querySelector('.error-alert')) {
            document.querySelector('.error-alert').remove()
        }
        window.moveInputError = true;
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
    if (!window.getInputError) {
        document.getElementById('get-object-input-x').style.border = '1px solid dodgerblue'
    }

}
document.getElementById('get-object-input-x').onblur = function () {
    if (!window.getInputError) {
        document.getElementById('get-object-input-x').style.border = 'none'
    }
}

document.getElementById('get-object-input-y').onfocus = function () {
    if (!window.getInputError) {
        document.getElementById('get-object-input-y').style.border = '1px solid dodgerblue'
    }

}
document.getElementById('get-object-input-y').onblur = function () {
    if (!window.getInputError) {
        document.getElementById('get-object-input-y').style.border = 'none'
    }
}


//Set
document.getElementById('set-object-input-name').onfocus = function () {
    if (!window.setInputError) {
        document.getElementById('set-object-input-name').style.border = '1px solid dodgerblue'
    }

}
document.getElementById('set-object-input-name').onblur = function () {
    if (!window.setInputError) {
        document.getElementById('set-object-input-name').style.border = 'none'
    }
}

document.getElementById('set-object-input-x').onfocus = function () {
    if (!window.setInputError) {
        document.getElementById('set-object-input-x').style.border = '1px solid dodgerblue'
    }

}
document.getElementById('set-object-input-x').onblur = function () {
    if (!window.setInputError) {
        document.getElementById('set-object-input-x').style.border = 'none'
    }
}

document.getElementById('set-object-input-y').onfocus = function () {
    if (!window.setInputError) {
        document.getElementById('set-object-input-y').style.border = '1px solid dodgerblue'
    }

}
document.getElementById('set-object-input-y').onblur = function () {
    if (!window.setInputError) {
        document.getElementById('set-object-input-y').style.border = 'none'
    }
}


//Update
document.getElementById('update-object-input-name').onfocus = function () {
    if (!window.updateInputError) {
        document.getElementById('update-object-input-name').style.border = '1px solid dodgerblue'
    }

}
document.getElementById('update-object-input-name').onblur = function () {
    if (!window.updateInputError) {
        document.getElementById('update-object-input-name').style.border = 'none'
    }
}

document.getElementById('update-object-input-x').onfocus = function () {
    if (!window.updateInputError) {
        document.getElementById('update-object-input-x').style.border = '1px solid dodgerblue'
    }

}
document.getElementById('update-object-input-x').onblur = function () {
    if (!window.updateInputError) {
        document.getElementById('update-object-input-x').style.border = 'none'
    }
}

document.getElementById('update-object-input-y').onfocus = function () {
    if (!window.updateInputError) {
        document.getElementById('update-object-input-y').style.border = '1px solid dodgerblue'
    }

}
document.getElementById('update-object-input-y').onblur = function () {
    if (!window.updateInputError) {
        document.getElementById('update-object-input-y').style.border = 'none'
    }
}

// Remove
document.getElementById('removed-object-name').onfocus = function () {
    if (!window.moveInputError) {
        document.getElementById('removed-object-name').style.border = '1px solid dodgerblue'
    }

}
document.getElementById('removed-object-name').onblur = function () {
    if (!window.moveInputError) {
        document.getElementById('removed-object-name').style.border = 'none'
    }
}

//Rotate
document.getElementById('rotate-object-input-name').onfocus = function () {
    if (!window.rotateInputError) {
        document.getElementById('rotate-object-input-name').style.border = '1px solid dodgerblue'
    }

}
document.getElementById('rotate-object-input-name').onblur = function () {
    if (!window.rotateInputError) {
        document.getElementById('rotate-object-input-name').style.border = 'none'
    }
}

document.getElementById('rotate-object-input-x').onfocus = function () {
    if (!window.rotateInputError) {
        document.getElementById('rotate-object-input-x').style.border = '1px solid dodgerblue'
    }

}
document.getElementById('rotate-object-input-x').onblur = function () {
    if (!window.rotateInputError) {
        document.getElementById('rotate-object-input-x').style.border = 'none'
    }
}

document.getElementById('rotate-object-input-y').onfocus = function () {
    if (!window.rotateInputError) {
        document.getElementById('rotate-object-input-y').style.border = '1px solid dodgerblue'
    }

}
document.getElementById('rotate-object-input-y').onblur = function () {
    if (!window.rotateInputError) {
        document.getElementById('rotate-object-input-y').style.border = 'none'
    }
}

document.getElementById('rotate-object-input-radius').onfocus = function () {
    if (!window.rotateInputError) {
        document.getElementById('rotate-object-input-radius').style.border = '1px solid dodgerblue'
    }

}
document.getElementById('rotate-object-input-radius').onblur = function () {
    if (!window.rotateInputError) {
        document.getElementById('rotate-object-input-radius').style.border = 'none'
    }
}

document.getElementById('rotate-object-input-angle').onfocus = function () {
    if (!window.rotateInputError) {
        document.getElementById('rotate-object-input-angle').style.border = '1px solid dodgerblue'
    }

}
document.getElementById('rotate-object-input-angle').onblur = function () {
    if (!window.rotateInputError) {
        document.getElementById('rotate-object-input-angle').style.border = 'none'
    }
}


// Move
document.getElementById('move-object-input-name').onfocus = function () {
    if (!window.moveInputError) {
        document.getElementById('move-object-input-name').style.border = '1px solid dodgerblue'
    }

}
document.getElementById('move-object-input-name').onblur = function () {
    if (!window.moveInputError) {
        document.getElementById('move-object-input-name').style.border = 'none'
    }
}

document.getElementById('move-object-input-distance').onfocus = function () {
    if (!window.moveInputError) {
        document.getElementById('move-object-input-distance').style.border = '1px solid dodgerblue'
    }

}
document.getElementById('move-object-input-distance').onblur = function () {
    if (!window.moveInputError) {
        document.getElementById('move-object-input-distance').style.border = 'none'
    }
}

document.getElementById('move-object-angle-select').onfocus = function () {
    if (!window.moveInputError) {
        document.getElementById('move-object-angle-select').style.border = '1px solid dodgerblue'
    }

}
document.getElementById('move-object-angle-select').onblur = function () {
    if (!window.moveInputError) {
        document.getElementById('move-object-angle-select').style.border = 'none'
    }
}


// -------------------------------------------Local Storage------------------------------------------------

const saveToLS = document.getElementById('save-to-ls')
saveToLS.addEventListener('click', saveToLocalStorage)

function saveToLocalStorage() {
    localStorage.setItem('canvasObjects', JSON.stringify(window.canvasObjects));
    if (document.querySelector('.success-alert') === null) {
        const successAlert = document.createElement("div");
        successAlert.className = "success-alert";
        successAlert.innerHTML = `<strong>Hooray!</strong> Objects were successfully saved to local storage.`;
        document.querySelector('.move-object').append(successAlert);
        setTimeout(() => {
            document.querySelector('.success-alert').remove()
        }, 2000)
    }
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


        document.querySelector('.settings-screen').style = 'display:none'
        let div = document.createElement('div');
        div.className = 'temporary-title'
        div.innerHTML = 'You can Drag-and-Drop objects now';
        div.style = 'width:100%; margin-top:200px; display:flex; justify-content:center; font-size:28px;'
        document.querySelector('.local-storage').append(div)


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
    } else {

        document.querySelector('.temporary-title').remove()
        document.querySelector('.settings-screen').style = 'display:flex'

    }
}














