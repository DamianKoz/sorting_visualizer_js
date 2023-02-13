// Todos:

// - Fetch Markdown Files and add text to every algorithm

const animationSpeedSlider = document.getElementById("animationSpeed");
const rangeSlider = document.getElementById("range-slider");
const numberOfElementstext = document.getElementById("elements_num");
const algorithmSelection = document.getElementById("algorithmSelection");

let array = [];
let swaps = [];

let n;
let algorithm;

const container = document.getElementById("algorithmContainer");

let animationTimeout;
speeds = { very_slow: 500, slow: 250, fast: 50 };
algorithms = { bubblesort: bubbleSort };

init();

function init() {
  getConfig();
  stopAnimation();

  swaps = [];
  container.innerHTML = "";

  initArray();
  displayArray(array);
}

function play() {
  getConfig();
  const copy_to_sort = [...array];
  const swaps = algorithms[algorithm](copy_to_sort);
  // const swaps = bubbleSort(copy_to_sort);
  animate(swaps);
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

function animate(swaps) {
  if (swaps.length == 0) {
    displayArray();
    return;
  }
  const [i, j] = swaps.shift(); // Taking out the first two swapped elements

  [array[i], array[j]] = [array[j], array[i]];
  displayArray([i, j]);
  animationTimeout = setTimeout(function () {
    animate(swaps);
  }, animationSpeed);
}

function displayArray(indices) {
  container.innerHTML = "";

  for (let i = 0; i < array.length; i++) {
    const bar = document.createElement("div");
    bar.style.height = array[i] * 100 + "%";
    bar.classList.add("bar");

    if (indices && indices.includes(i)) {
      bar.style.backgroundColor = "red";
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
