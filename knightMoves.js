const checkIfVisited = (visitedCoordinates, testCoordinate) =>
  visitedCoordinates.some((visitedCoordinate) => {
    console.log(visitedCoordinate, testCoordinate);
    return (
      visitedCoordinate[0] === testCoordinate[0] &&
      visitedCoordinate[1] === testCoordinate[1]
    );
  });

// prettier-ignore
const knightMoves = (
  startingCoordinate,
  endingCoordinate,
  moveCounter = 0,
  visitedCoordinates = [],
  queue = []
) => {
  // return error message if either coordinate is off the board/invalid
  if (
    startingCoordinate[0] < 0 ||
    startingCoordinate[0] > 7 ||
    startingCoordinate[1] < 0 ||
    startingCoordinate[1] > 7
  ) {
    return "Your starting square is not a valid square on the board.";
  }
  if (
    endingCoordinate[0] < 0 ||
    endingCoordinate[0] > 7 ||
    endingCoordinate[1] < 0 ||
    endingCoordinate[1] > 7
  ) {
    return "Your ending square is not a valid square on the board.";
  }
  // use breadth first search
  // compare if startedCoordinate and endingCoordinate are the same
  if (startingCoordinate[0] === endingCoordinate[0] && startingCoordinate[1] === endingCoordinate[1]) {
    console.log(`You made it in ${moveCounter} moves! Here's your path:`)
      visitedCoordinates.forEach((coordinate) => {
        console.log(coordinate)
      })
    // if the same, means found the endingCoordinate and can display relevant info
      // print moveCounter
      // forEach loop visitedCoordinates and print each item/coordinate
      // return
  } else {
    // check if right 2, up 1 is valid and not already visited
    if (
      startingCoordinate[0] + 2 <= 7 &&
      startingCoordinate[1] - 1 >= 0 &&
      checkIfVisited(visitedCoordinates, [startingCoordinate[0] + 2, startingCoordinate[1] - 1]) === false
    ) {
      queue.push([startingCoordinate[0] + 2, startingCoordinate[1] - 1])
    }
    // check if right 2, down 1 is valid
    if (
      startingCoordinate[0] + 2 <= 7 &&
      startingCoordinate[1] + 1 <= 7 &&
      checkIfVisited(visitedCoordinates, [startingCoordinate[0] + 2, startingCoordinate[1] + 1]) === false
    ) {
      queue.push([startingCoordinate[0] + 2, startingCoordinate[1] + 1])
    }
    // check if down 2, right 1 is valid
    if (
      startingCoordinate[0] + 1 <= 7 &&
      startingCoordinate[1] + 2 <= 7 &&
      checkIfVisited(visitedCoordinates, [startingCoordinate[0] + 1, startingCoordinate[1] + 2]) === false
    ) {
      queue.push([startingCoordinate[0] + 1, startingCoordinate[1] + 2])
    }
    // check if down 2, left 1 is valid
    if (
      startingCoordinate[0] - 1 >= 0 &&
      startingCoordinate[1] + 2 <= 7 &&
      checkIfVisited(visitedCoordinates, [startingCoordinate[0] - 1, startingCoordinate[1] + 2])
    ) {
      queue.push([startingCoordinate[0] - 1, startingCoordinate[1] + 2])
    }
    // if not the same
      /* determine the moves the knight can make without moving off board (8 possible permutations of (hori. +-2, vert. +-1) or
      (vert. +- 2, hori. +- 1), 0 <= x <= 7, 0 <= y <= 7) */
        // push possible moves/children to queue ONLY IF they have not already been visited (compare with items in visitedCoordinates)
      // unshift queue to pop current coordinate that was just evaluated to not be the endingCoordinate
      // recurvisely traverse the graph by calling knightMoves() with startingCoordinate being the first item in the queue
  }
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
