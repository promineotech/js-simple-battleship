//initialize variables
let myGridSize = prompt('What size would you like your grid to be?');
let enemyGridSize = prompt('What size would you like your enemy grid to be?');
let myGrid = createGrid(myGridSize);
let enemyGrid = createGrid(enemyGridSize);
let myShips = 3;
let enemyShips = 3;
let enemyLocations = {};

printGrid(enemyGrid, true);
printGrid(myGrid);

//game setup
for (let i = 1; i < 4; i++) {
  let x = prompt('Enter the x coordinate for your ship number ' + i);
  let y = prompt('Enter the y coordinate for your ship number ' + i);
  placeCharacter(x, y, 'O', myGrid);
  placeRandomCharacter('O', enemyGrid, enemyGridSize);
  drawBreak();
  printGrid(enemyGrid, true);
  printGrid(myGrid);
}

//game loop
while (enemyShips > 0 && myShips > 0) {
  let x = prompt('Enter the x coordinate for your attack');
  let y = prompt('Enter the y coordinate for your attack');

  if (attack(x, y, enemyGrid)) {
    enemyShips--;
  }

  x = getRandomInt(myGridSize);
  y = getRandomInt(myGridSize);
  if (enemyShips > 0 && attack(x, y, myGrid)) {
    myShips--;
  }

  drawBreak();
  printGrid(enemyGrid, true);
  printGrid(myGrid);
}

if (myShips < enemyShips) {
  console.log('Lose it all!');
} else {
  console.log('Victory!!!');
}

function createGrid(size) {
  let grid = [];
  for (let i = 0; i < size; i++) {
    grid[i] = [];
    for (let j = 0; j < size; j++) {
      grid[i][j] = '-';
    }
  }
  return grid;
}

function printGrid(grid, isEnemy = false) {
  const headers = createHeaders(grid.length);
  console.log(headers);
  for (let i = 0; i < grid.length; i++) {
    let rowStr = i + ' ';
    for (let cell of grid[i]) {
      if (isEnemy && cell == 'O') {
        rowStr += '- ';
      } else {
        rowStr += cell + ' ';
      }
    }
    console.log(rowStr);
  }
}

function createHeaders(size) {
  let result = '  ';
  for (let i = 0; i < size; i++) {
    result += i + ' ';
  }
  return result;
}

function placeCharacter(x, y, c, grid) {
  grid[y][x] = c;
}

function placeRandomCharacter(c, grid, max) {
  let didPlace = false;
  while (!didPlace) {
    let x = getRandomInt(max);
    let y = getRandomInt(max);
    if (!enemyLocations[`${x}-${y}`]) {
      placeCharacter(x, y, c, grid);
      didPlace = true;
      enemyLocations[`${x}-${y}`] = true;
    }
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function attack(x, y, grid) {
  if (grid[y][x] == 'O') {
    grid[y][x] = '!';
    return true;
  } else if (grid[y][x] == '-') {
    grid[y][x] = 'x';
    return false;
  } else {
    return false;
  }
}

function drawBreak() {
  console.log('---------------------------------');
}