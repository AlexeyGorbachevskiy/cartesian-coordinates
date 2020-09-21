import {createCanvas} from './createCanvas';

export const renderObjects = () => {
    createCanvas()
    window.canvasObjects.forEach((el) => {
        for (let key in el) {
            if (el.hasOwnProperty(key) && key === 'name') {
                window.ctx.rect(el.x, el.y, 60, 60);
                window.ctx.font = "bold 12pt Arial";
                window.ctx.fillText(`x:${el.x}; y:${el.y}`, el.x, el.y - 5);
                window.ctx.fillText(`name:${el.name}`, el.x, el.y + 75);
            }
        }
    })
    window.ctx.fillStyle = 'green';
    window.ctx.fill();
}
