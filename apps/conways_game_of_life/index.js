
const getFlexibleSizing = () => {
  return {
    height: Math.floor(window.screen.height / 2),
    width: Math.floor(window.screen.width / 2)}
}

const DIMENSION = getFlexibleSizing();
const CELL_DIMENSIONS = {width: 5, height: 5};
const CELLS = {
  width: DIMENSION.width / CELL_DIMENSIONS.width,
  height: DIMENSION.height / CELL_DIMENSIONS.height,
}
const seedNumerosity = 1; // higher means less cells seeded
const conwaysGameOfLife = () => {
  let board = null;
  console.debug(`Dimenisons are ${DIMENSION.width} - ${DIMENSION.height}`)
  setInterval(function() {
    // method to be executed;
    board = runningGame(board);
    console.debug(`[MAIN] ${board.debug()}`);
  }, 500);
};

const runningGame = (board) => {
  const canvas = document.getElementById('canvas');
  const ctxt = canvas.getContext('2d');
  if (ctxt.canvas.width !== DIMENSION.width) {
    canvas.style.border = '1px solid #0000FF';
    // first iteration of canvas, create random cells.
    createCanvas(ctxt);
    board = new Board(ctxt);
    board.validate();
    board.paint();
    addWiper(canvas, board);
    return board;
  }
  board.validate();
  board.paint();
  return board;
};

const addWiper = (canvas, board) => {
  canvas.addEventListener('mousedown', (event) => {
    console.log(event, event.ctrlKey);
    const coord = getCursorPosition(canvas, event);
    const col = Math.floor(coord.x / CELL_DIMENSIONS.width);
    const row = Math.floor(coord.y / CELL_DIMENSIONS.height);
    if (event.ctrlKey) {
      board.clearStroke(row, col);
    } else {
      board.insertStroke(row, col);
    }
  });
}

function getCursorPosition(canvas, event) {
  const rect = canvas.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top
  return {x: x, y: y};
}


const createCanvas = (context) => {
  console.debug('configuring initial canvas properties');
  context.canvas.width = DIMENSION.width;
  context.canvas.height = DIMENSION.height;
};

class Cell {
  constructor(x, y, bound = CELLS) {
    this.x = x;
    this.y = y;
    this.bound = bound;
  };

  getNeighbours() {
    return [
      {x: this.x + 1, y: this.y},
      {x: this.x + 1, y: this.y + 1},
      {x: this.x, y: this.y + 1},
      {x: this.x - 1, y: this.y + 1},
      {x: this.x - 1, y: this.y},
      {x: this.x - 1, y: this.y - 1},
      {x: this.x, y: this.y - 1},
      {x: this.x + 1, y: this.y - 1},
    ]
  }

  isOutOfBounds() {
    return (this.x >= this.bound.height || this.x < 0 || this.y >= this.bound.width || this.y < 0)
  }

  debug() {
    return `(${this.x}, ${this.y}) - bound {width: ${this.bound.width}, height: ${this.bound.height}}`;
  }
};


class Board {
  constructor(context, seed = seedNumerosity / 10) {
    this.height = Math.floor(CELLS.height);
    this.width = Math.floor(CELLS.width);
    this.board = [];
    console.debug(`creation of board ${this.width}, ${this.height}`)
    for (var y = 0; y < this.height; y ++) {
      const row = [];
      for(var x = 0; x < this.width; x++) {
        // set all cells to non-living
        row.push(false);
      }
      this.board.push(row);
    }
    this.context = context;
    this.context.fillStyle = 'white'; 
    this.seed = seed;
    this.populateBoard();
  }

  populateBoard() {
    const populatedCells = Math.floor((this.height * this.width) * this.seed);
    console.debug(`[Board] populating ${populatedCells} living cells`);
    for(var i = 0; i < populatedCells; i++) {
      const randomX = Math.floor(Math.random() * this.width);
      const randomY =  Math.floor(Math.random() * this.height);
      this.board[randomY][randomX] = true;
    }
    // console.log(this.debug());
  }

  validate() {
    for (var y = 0; y < this.height; y ++) {
      for(var x = 0; x < this.width; x++) {
        const cell = new Cell(y, x);
        this.validateCell(cell);
      }
    }
  };

  validateCell(cell) {
    let livingNeighbours = 0;
    const cellNeighours = cell.getNeighbours();
    cellNeighours.forEach((cellPositions) => {
      const neighbourCell = new Cell(cellPositions.x, cellPositions.y);
      // skip neighbour if neighbour is out of bounds;
      if (neighbourCell.isOutOfBounds()) {
        // console.log(neighbourCell.debug());
        return;
      }
      if (this.isCellLiving(neighbourCell)) {
        livingNeighbours++;
      }
    });
    const before = this.isCellLiving(cell);
    if (before && (livingNeighbours === 2 || livingNeighbours == 3)) {
      return;
    } else if (!before && livingNeighbours === 3) {
      this.board[cell.x][cell.y] = true;
    } else {
      // kill
      this.board[cell.x][cell.y] = false;
    }

    const after = this.isCellLiving(cell);
    // if (before && !after) {
    //   console.log(`${this.debug()}, ${cell.debug()}`);
    // }
  }

  isCellLiving(cell) {
    return this.board[cell.x][cell.y];
  }

  paint() {
    for (var row = 0; row < this.width; row ++) {
      for(var col = 0; col < this.height; col++) {
        // if alive, fill Rect, else erase.
        if (this.board[col][row]) {
          this.context.fillRect(row * CELL_DIMENSIONS.width, col * CELL_DIMENSIONS.height, CELL_DIMENSIONS.width, CELL_DIMENSIONS.height);
        } else {
          this.context.clearRect(row * CELL_DIMENSIONS.width, col * CELL_DIMENSIONS.height, CELL_DIMENSIONS.width, CELL_DIMENSIONS.height);
        }
      }
    }
  }

  stroke(row, col, isLiving) {
    const cell = new Cell(row, col);
    cell.getNeighbours().forEach((cellPositions) => {
      const neighbourCell = new Cell(cellPositions.x, cellPositions.y);
      if (neighbourCell.isOutOfBounds()){
        return;
      }
      this.board[neighbourCell.x][neighbourCell.y] = isLiving;
    });
    this.paint();
  }

  insertStroke(row, col) {
    this.stroke(row, col, true);
  }

  clearStroke(row, col) {
    this.stroke(row, col, false);
  }

  debug() {
    let details = 'Board details\n';
    details = `${this.board.length} x ${this.board[0].length}`;
    // details += '\n' + this.board.toString();
    return details;
  }
}