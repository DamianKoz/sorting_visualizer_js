// Todos:
// - Get Algorithm by Choice
// - Animate transistions and make comparisons blue

const animationSpeedSlider = document.getElementById("animationSpeed");
const rangeSlider = document.getElementById("range-slider");
const numberOfElementstext = document.getElementById("elements_num");
const algorithmSelection = document.getElementById("algorithmSelection");

let array = [];
let n;
let algorithm;

const container = document.getElementById("container");

speeds = { very_slow: 500, slow: 250, fast: 50 };
// algorithms = { bubblesort: bubbleSort() };

init();

function init() {
  getConfig();

  array = [];
  container.innerHTML = "";

  initArray();
  displayArray(array);
}

function initArray() {
  for (let i = 0; i < n; i++) {
    array[i] = Math.random();
  }
}

function getConfig() {
  n = rangeSlider.value; // Number of Elements to sort - Length of array
  numberOfElementstext.innerHTML = rangeSlider.value;
  animationSpeed = speeds[animationSpeedSlider.value];
  algorithm = algorithmSelection.value;
  console.log(algorithm);
}

rangeSlider.oninput = function () {
  init();
};

algorithmSelection.oninput = function () {
  getConfig();
};

function play() {
  getConfig();
  const copy_to_sort = [...array];
  const swaps = bubbleSort(copy_to_sort);
  animate(swaps);
}

function animate(swaps) {
  if (swaps.length == 0) {
    displayArray();
    return;
  }
  const [i, j] = swaps.shift(); // Taking out the first two swapped elements

  [array[i], array[j]] = [array[j], array[i]];
  displayArray([i, j]);
  setTimeout(function () {
    animate(swaps);
  }, animationSpeed);
}

function bubbleSort(array) {
  const swaps = [];
  do {
    var swapped = false;
    for (let i = 1; i < array.length; i++) {
      if (array[i - 1] > array[i]) {
        swaps.push([i - 1, i]);
        [array[i - 1], array[i]] = [array[i], array[i - 1]];
        swapped = true;
      }
    }
  } while (swapped);
  return swaps;
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

  url =
    "https://github.com/DamianKoz/algorithms/blob/main/Sorting/Selection%20Sort/README.md";
  fetch(url, {
    method: "GET",
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  })
    .then((response) => response.blob())
    .then((result) => console.log(result));
}
