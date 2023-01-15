const widthInput = document.querySelector("#width");
const heightInput = document.querySelector("#height");
const colorInput = document.querySelector("#color");
const eraseButton = document.querySelector("#erase");
const drawButton = document.querySelector("#draw");
const createButton = document.querySelector("#create");

const container = document.querySelector("main .container");
const grid = document.querySelector("#grid");

let isPainting = true;
let isEmpty = true;

widthInput.addEventListener("change", (ev) => {
    ev.target.dataset.value = ev.target.value;
});
heightInput.addEventListener("change", (ev) => {
    ev.target.dataset.value = ev.target.value;
});

createButton.addEventListener("click", initialize);
eraseButton.addEventListener("click", (ev) => {
    isPainting = false;
});
drawButton.addEventListener("click", (ev) => {
    isPainting = true;
})

function initialize(ev) {
    grid.innerHTML = "";
    initializeGrid(widthInput.value, heightInput.value);
}

function initializeParameters(ev) {
    let contWidthSize;
    if (window.matchMedia("(min-width: 768px)").matches) {
        contWidthSize = 60; // 30 rem
    } else {
        contWidthSize = 30; // 30 rem
    }

    const maxAvailableWidth = contWidthSize / 2; // 2rem per pixel

    widthInput.max = maxAvailableWidth;

    if (isEmpty) {
        widthInput.value = maxAvailableWidth;
        widthInput.dataset.value = maxAvailableWidth;
        heightInput.value = maxAvailableWidth;
        heightInput.dataset.value = maxAvailableWidth;
    }
}

function initializeGrid(width, height) {
    const items = width * height;
    for (let index = 0; index < items; index++) {
        const pixel = document.createElement("div");
        pixel.className = "pixel";
        grid.appendChild(pixel);

        pixel.addEventListener("click", colorize);
    }

    grid.style.width = width * 2 + "rem";
    grid.style.height = height * 2 + "rem";
}

function colorize(ev) {
    if (isPainting) {
        const color = colorInput.value;
        ev.target.style.backgroundColor = color;

        if (isEmpty) {
            isEmpty = false;
        }
    } else {
        ev.target.style.backgroundColor = "white";
    }
}


window.addEventListener("resize", initializeParameters)
document.addEventListener("DOMContentLoaded", initializeParameters)
document.addEventListener("DOMContentLoaded", initialize)
