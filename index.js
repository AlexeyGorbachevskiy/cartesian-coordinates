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

    ctx.rect(x, y, 60, 60);
    ctx.fill();

    return canvasObjects = [
        ...canvasObjects,
        {name, x, y,}
    ]
}

const updateObjectXY = (name, x, y) => {

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
    let currentAngle = angle;
    let currentRadius = radius;
    let baseX = x;
    let baseY = y;

    const timerId = setInterval(function () {
        createCanvas()
        renderObjects()
        const vx = Math.cos(currentAngle) * currentRadius;
        const vy = Math.sin(currentAngle) * currentRadius;
        ctx.fillRect(baseX + vx, baseY + vy, 60, 60);
        currentAngle += 0.1;

    }, 50)
}

const removeObject = (objectName) => {

    const removedObject = canvasObjects.find((el) => {
        return el.name === objectName
    })

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

var inputError = false;

// Get Object
const getObjectBtn = document.getElementById('get-object-btn')
getObjectBtn.addEventListener('click', onGetObject)

function onGetObject() {
    createCanvas()
    renderObjects()
    const getObjectX = document.getElementById('get-object-input-x').valueAsNumber
    const getObjectY = document.getElementById('get-object-input-y').valueAsNumber
    try {
        getObjectsByXY(getObjectX, getObjectY);
        document.querySelector('.error-alert').remove()
        inputError=false;
        document.getElementById('get-object-input-x').style.border='none'
        document.getElementById('get-object-input-y').style.border='none'
    } catch (e) {
        inputError = true;
        document.getElementById('get-object-input-x').style.border = '2px solid red'
        document.getElementById('get-object-input-y').style.border = '2px solid red'

        if(document.querySelector('.error-alert')===null){
            const errorAlert=document.createElement("div");
            errorAlert.className = "error-alert";
            errorAlert.innerHTML = `<strong>Attention!</strong> ${e.message}`;
            document.querySelector('.move-object').append(errorAlert);
            // document.querySelector('.move-object').append('safdsfsdfd',errorElement)
        }

    }


}

// Set Object
const setObjectBtn = document.getElementById('set-object-btn')
setObjectBtn.addEventListener('click', onSetObject)

function onSetObject() {
    const setObjectName = document.getElementById('set-object-input-name').value
    const setObjectX = document.getElementById('set-object-input-x').valueAsNumber
    const setObjectY = document.getElementById('set-object-input-y').valueAsNumber
    setObjectsByXY(setObjectName, setObjectX, setObjectY);
    renderObjects()
}

// Update Object
const updateObjectBtn = document.getElementById('update-object-btn')
updateObjectBtn.addEventListener('click', onUpdateObject)

function onUpdateObject() {
    const updateObjectName = document.getElementById('update-object-input-name').value
    const updateObjectX = document.getElementById('update-object-input-x').valueAsNumber
    const updateObjectY = document.getElementById('update-object-input-y').valueAsNumber
    updateObjectXY(updateObjectName, updateObjectX, updateObjectY);
    // renderObjects()
}

// Rotate Object
const rotateObjectBtn = document.getElementById('rotate-object-btn')
rotateObjectBtn.addEventListener('click', onRotateObject)

function onRotateObject() {
    const rotateObjectName = document.getElementById('rotate-object-input-name').value
    const rotateObjectX = document.getElementById('rotate-object-input-x').valueAsNumber
    const rotateObjectY = document.getElementById('rotate-object-input-y').valueAsNumber
    const rotateObjectRadius = document.getElementById('rotate-object-input-radius').valueAsNumber
    const rotateObjectAngle = document.getElementById('rotate-object-input-angle').valueAsNumber

    removeObject(rotateObjectName)
    rotateObject(rotateObjectX, rotateObjectY, rotateObjectRadius, rotateObjectAngle);

}

//TODO
function onStopRotateObject() {
    clearInterval(timerId)
}

// Move Object
const moveObjectBtn = document.getElementById('move-object-btn')
moveObjectBtn.addEventListener('click', onMoveObject)

function onMoveObject() {
    const moveObjectName = document.getElementById('move-object-input-name').value
    const moveObjectDistance = document.getElementById('move-object-input-distance').valueAsNumber
    const moveObjectAngle = document.getElementById('move-object-angle-select').value
    moveObject(moveObjectName, moveObjectDistance, moveObjectAngle);
}


// --------------------------------------------------Error Handling------------------------------------------------

document.getElementById('get-object-input-x').onfocus=function(){
    if(!inputError){
        document.getElementById('get-object-input-x').style.border='1px solid dodgerblue'
    }

}
document.getElementById('get-object-input-x').onblur=function(){
    if(!inputError){
        document.getElementById('get-object-input-x').style.border='none'
    }
}

document.getElementById('get-object-input-y').onfocus=function(){
    if(!inputError){
        document.getElementById('get-object-input-y').style.border='1px solid dodgerblue'
    }

}
document.getElementById('get-object-input-y').onblur=function(){
    if(!inputError){
        document.getElementById('get-object-input-y').style.border='none'
    }
}
