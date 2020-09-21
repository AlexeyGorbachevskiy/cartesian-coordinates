
export function errorReset() {
    window.isRotating = false;
    window.getInputError = false;
    window.setInputError = false;
    window.updateInputError = false;
    window.moveInputError = false;
    window.rotateInputError = false;
    window.moveInputError = false;
    let list = document.getElementsByTagName('input');
    for (let i = 0; i < list.length; i++) {
        list[i].style.border = 'none'
    }
    document.getElementById('move-object-angle-select').style.border = 'none';
}
