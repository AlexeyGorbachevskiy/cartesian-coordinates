import {createCanvas} from "./createCanvas";
import {renderObjects} from "./renderObjects";

export const rotateObject = (x, y, radius, angle) => {

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

    }, 50)

    return rotateTimerId
}
