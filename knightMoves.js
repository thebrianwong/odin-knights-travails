const knightMoves = (
  startingCoordinate,
  endingCoordinate,
  moveCounter = 0,
  visitedCoordinates = [],
  queue = [startingCoordinate]
) => {
  // print startingCoordinate
  // use breadth first search
  // compare if startedCoordinate and endingCoordinate are the same
  // if not the same
  // determine the moves the knight can make without moving off board (8 possible permutations of x +- 1, y +- 1, 0 <= x <= 7, 0 <= y <= 7)
  // recurvisely traverse the graph by calling knightMoves() with startingCoordinate being the possible moves
  // if the same
  // print moveCounter
  // return
};

const GameBoard = (() => {
  const board = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ];
  const getBoard = () => board;
  const setBoard = ([x, y]) => {
    if (board[x][y]) {
      board[x][y] = 0;
    } else {
      board[x][y] = 1;
    }
  };
  return {
    getBoard,
    setBoard,
  };
})();

console.log(GameBoard.getBoard());
GameBoard.setBoard([4, 4]);
