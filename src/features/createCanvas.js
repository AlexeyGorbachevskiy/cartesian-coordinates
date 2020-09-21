

export const createCanvas = () => {
    let canvas = document.getElementById("canvas");
    window.ctx = canvas.getContext("2d");
    let ctx=window.ctx
    canvas.width = 700;
    canvas.height = 700;
    let w = canvas.width;
    let h = canvas.height;
    for (let x = -0.5; x < w; x += 20) ctx.strokeRect(x + 20, 20, 0.1, h);
    for (let y = -0.5; y < h; y += 20) ctx.strokeRect(20, y + 20, w, 0.1);
    window.ctx.stroke();
}
