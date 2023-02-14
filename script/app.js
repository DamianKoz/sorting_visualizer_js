// Todos:

// - Fetch Markdown Files and add text to every algorithm

const animationSpeedSlider = document.getElementById("animationSpeed");
const rangeSlider = document.getElementById("range-slider");
const numberOfElementstext = document.getElementById("elements_num");
const algorithmSelection = document.getElementById("algorithmSelection");

let array = [];
let moves = [];

let n;
let algorithm;

const container = document.getElementById("algorithmContainer");

let animationTimeout;
speeds = { very_slow: 500, slow: 250, fast: 50 };
algorithms = { bubblesort: bubbleSort, insertionsort: insertionSort };

init();

function init() {
  getConfig();
  stopAnimation();

  // moves = [];
  container.innerHTML = "";

  initArray();
  displayArray();
}

function play() {
  getConfig();
  const copy_to_sort = [...array];
  const moves = algorithms[algorithm](copy_to_sort);
  animate(moves);
}

function initArray() {
  array = [];

  for (let i = 0; i < n; i++) {
    array[i] = Math.random();
  }
}

function getConfig() {
  n = rangeSlider.value; // Number of Elements to sort - Length of array
  numberOfElementstext.innerHTML = rangeSlider.value;
  animationSpeed = speeds[animationSpeedSlider.value];
  algorithm = algorithmSelection.value;
}

rangeSlider.oninput = function () {
  init();
};

algorithmSelection.oninput = function () {
  getConfig();
};

function stopAnimation() {
  clearTimeout(animationTimeout);
}

function animate(moves) {
  if (moves.length == 0) {
    displayArray();
    return;
  }
  const move = moves.shift(); // Taking out the first two swapped elements
  const [i, j] = move.indices;

  if (move.type == "swap") {
    [array[i], array[j]] = [array[j], array[i]];
  }
  displayArray(move);
  animationTimeout = setTimeout(function () {
    animate(moves);
  }, animationSpeed);
}

function displayArray(move) {
  container.innerHTML = "";

  for (let i = 0; i < array.length; i++) {
    const bar = document.createElement("div");
    bar.style.height = array[i] * 100 + "%";
    bar.classList.add("bar");

    if (move && move.indices.includes(i)) {
      bar.style.backgroundColor =
        move.type == "swap" && animationSpeedSlider.value != "fast"
          ? "red"
          : "blue";
    }

    container.appendChild(bar);
  }
}

function fetch_markdown() {
  // Not working
  url = "https://api.github.com/repos/damiankoz/algorithms/contents/README.md";
  //   url =
  //     "https://github.com/DamianKoz/algorithms/blob/main/Sorting/Selection%20Sort/README.md";
  fetch(url, {
    method: "GET",
    headers: {
      "Access-Control-Allow-Origin": "*",
      accept: "application/vnd.github.v3.raw",
    },
  })
    .then((response) => response.blob())
    .then((result) => console.log(result));
}
