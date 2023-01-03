const knightMoves = (
  startingCoordinate,
  endingCoordinate,
  moveCounter = 0,
  visitedCoordinates = [],
  queue = [startingCoordinate]
) => {
  // prettier-ignore
  // return error message if either coordinate is off the board/invalid

  // use breadth first search
  // compare if startedCoordinate and endingCoordinate are the same

  // if not the same
    /* determine the moves the knight can make without moving off board (8 possible permutations of (hori. +-2, vert. +-1) or
    (vert. +- 2, hori. +- 1), 0 <= x <= 7, 0 <= y <= 7) */
      // add possible moves/children to queue ONLY IF they have not already been visited (compare with items in visitedCoordinates)
    // unshift queue to pop current coordinate that was just evaluated to not be the endingCoordinate
    // recurvisely traverse the graph by calling knightMoves() with startingCoordinate being the possible moves a


  // if the same, means found the endingCoordinate and can display relevant info
    // print moveCounter
    // forEach loop visitedCoordinates and print each item/coordinate
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
