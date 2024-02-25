const board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

function checkWinner(arr) {
  // Check rows and columns
  for (let i = 0; i < 3; i++) {
    // Check rows
    if (arr[i][0] === arr[i][1] && arr[i][0] === arr[i][2]) {
      return arr[i][0]; // Row winner
    }
    // Check columns
    if (arr[0][i] === arr[1][i] && arr[0][i] === arr[2][i]) {
      return arr[0][i]; // Column winner
    }
  }

  // Check diagonals
  if (arr[0][0] === arr[1][1] && arr[0][0] === arr[2][2]) {
    return arr[0][0]; // Diagonal from top-left to bottom-right
  }
  if (arr[0][2] === arr[1][1] && arr[0][2] === arr[2][0]) {
    return arr[0][2]; // Diagonal from top-right to bottom-left
  }

  return false; // No winner
}
