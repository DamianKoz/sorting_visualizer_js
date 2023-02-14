function bubbleSort(array) {
  let moves = [];
  do {
    var swapped = false;
    for (let i = 1; i < array.length; i++) {
      moves.push({ indices: [i - 1, i], type: "comp" });

      if (array[i - 1] > array[i]) {
        // swaps.push([i - 1, i]);
        moves.push({ indices: [i - 1, i], type: "swap" });
        [array[i - 1], array[i]] = [array[i], array[i - 1]];
        swapped = true;
      }
    }
  } while (swapped);
  return moves;
}

function insertionSort(array) {
  let moves = [];
  let i, j, current_element;
  for (i = 1; i < array.length; i++) {
    current_element = array[i];
    j = i - 1;
    // moves.push({ indices: [j, i], type: "comp" });

    while (j >= 0 && array[j] > current_element) {
      moves.push({ indices: [j, j + 1], type: "comp" });
      moves.push({ indices: [j, j + 1], type: "swap" });
      array[j + 1] = array[j];
      j = j - 1;
    }
    array[j + 1] = current_element;
  }
  return moves;
}
