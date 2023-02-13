const n = 10;
const array = [];

const container = document.getElementById("container");

init();

function init() {
  for (let i = 0; i < n; i++) {
    array[i] = Math.random();
  }
  displayArray(array);
}

function play() {
  sorted_array = bubbleSort(array);
  displayArray(sorted_array);
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

function displayArray(array) {
  container.innerHTML = "";

  for (let i = 0; i < array.length; i++) {
    const bar = document.createElement("div");
    bar.style.height = array[i] * 100 + "%";
    bar.classList.add("bar");
    container.appendChild(bar);
  }
}
