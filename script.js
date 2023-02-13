const animationSpeedSlider = document.getElementById("animationSpeed");
const rangeSlider = document.getElementById("range-slider");
const numberOfElementstext = document.getElementById("elements_num");

speeds = { very_slow: 500, slow: 250, fast: 50 };

let array = [];

let n;

const container = document.getElementById("container");

init();

function init() {
  array = [];
  container.innerHTML = "";

  getConfig();

  n = document.getElementById("range-slider").value;

  for (let i = 0; i < n; i++) {
    array[i] = Math.random();
  }
  displayArray(array);
}

function getConfig() {
  n = rangeSlider.value;
  numberOfElementstext.innerHTML = rangeSlider.value;
  animationSpeed = speeds[animationSpeedSlider.value];
}

rangeSlider.oninput = function () {
  init();
};

function play() {
  getConfig();
  const copy_to_sort = [...array];
  const swaps = bubbleSort(copy_to_sort);
  animate(swaps);
}

function animate(swaps) {
  if (swaps.length == 0) {
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
