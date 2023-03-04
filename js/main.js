document.querySelector(".control span").onclick = () => {
    let yourName = prompt("Enter Your name");
    if (yourName === null || yourName==="") {
        document.querySelector(".name span").textContent = "UnKnown";
    } else {
        document.querySelector(".name span").textContent = yourName;
    }
    document.getElementById("start").play();
    document.querySelector(".control span").parentElement.remove();
}
let duration = 1000;
let wrongCount = 0;
let blockContainer = document.querySelector(".memory-box");
let blocks = Array.from(blockContainer.children);
let orderRange = [...Array(blocks.length).keys()];
// get random value in orderRange array from 0 to 19
shuffle(orderRange);
// add order css to my blocks
blocks.forEach((block, index) => {
    block.style.order = orderRange[index];
    block.addEventListener("click", () => {
        flip(block);
    })
})
//get random array from orderRange array
function shuffle(array) { 
    let current = array.length, temp, random;
    while (current > 0) {
        random = Math.floor(Math.random() * current);
        current--;
        temp = array[current];
        array[current] = random;
        array[random] = temp;

    }
    return array;
}
 // flip function
function flip(clickBlock) {
    clickBlock.classList.add("is-flipp");
    let flipBoxs = blocks.filter(flipBox => flipBox.classList.contains("is-flipp"));
    if (flipBoxs.length === 2) {
        //stop click
        stopClick(); 
        match(flipBoxs[0], flipBoxs[1]);
    }
}
//function to stop click
function stopClick() { 
    blockContainer.classList.add("no-click");
    setTimeout(() => {
        blockContainer.classList.remove("no-click");
    }, duration);
}
//function to match two block
function match(firstblock, secondblock) {
    let wrongTries = document.querySelector(".tries span");
    if (firstblock.dataset.tech === secondblock.dataset.tech) {
        firstblock.classList.remove("is-flipp");
        secondblock.classList.remove("is-flipp");
        firstblock.classList.add("match");
        secondblock.classList.add("match");
        document.getElementById("success").play();
    } else {  
        wrongTries.innerHTML = parseInt(wrongTries.innerHTML) + 1;
        setTimeout(() => {
        firstblock.classList.remove("is-flipp");
        secondblock.classList.remove("is-flipp");
        }, duration);
        document.getElementById("error").play();
        
    }
}
 