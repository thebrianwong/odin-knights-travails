// prettier-ignore
const checkIfVisited = (visitedCoordinates, testCoordinate) =>
  visitedCoordinates.some((visitedCoordinate) => visitedCoordinate[0] === testCoordinate[0] && visitedCoordinate[1] === testCoordinate[1]
);

// prettier-ignore
const knightMoves = (
  startingCoordinate,
  endingCoordinate,
  currentMoveCounter = 0,
  lowestMoveCounter = Infinity,
  visitedCoordinates = [],
  traversalQueue = []
) => {
  console.log(traversalQueue) /* dont add to traversal queue is coordinate is already in queue */
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
  // add current startingCoordinate to list of coordinates already visited
  if (checkIfVisited(visitedCoordinates, startingCoordinate) === false) {
    visitedCoordinates.push(startingCoordinate)
  }
  // remove first item in queue since it was just evaluated
  traversalQueue.shift()
  // use breadth first search /* ACTUALLY maybe depth first would work better */
  // compare if startedCoordinate and endingCoordinate are the same
  if (startingCoordinate[0] === endingCoordinate[0] && startingCoordinate[1] === endingCoordinate[1]) {
    console.log(`You made it in ${currentMoveCounter} moves! Here's your path:`)
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
      checkIfVisited(visitedCoordinates, [startingCoordinate[0] + 2, startingCoordinate[1] - 1]) === false &&
      checkIfVisited(traversalQueue, [startingCoordinate[0] + 2, startingCoordinate[1] - 1]) === false
    ) {
      if (endingCoordinate[0] === startingCoordinate[0] + 2 && endingCoordinate[1] === startingCoordinate[1] - 1) {
        traversalQueue.unshift([startingCoordinate[0] + 2, startingCoordinate[1] - 1])
        startingCoordinate = traversalQueue[0]
        currentMoveCounter += 1
        return knightMoves(startingCoordinate, endingCoordinate, currentMoveCounter, lowestMoveCounter, visitedCoordinates, traversalQueue)
      } 
      traversalQueue.push([startingCoordinate[0] + 2, startingCoordinate[1] - 1])
    }
    // check if right 2, down 1 is valid and not already visited
    if (
      startingCoordinate[0] + 2 <= 7 &&
      startingCoordinate[1] + 1 <= 7 &&
      checkIfVisited(visitedCoordinates, [startingCoordinate[0] + 2, startingCoordinate[1] + 1]) === false &&
      checkIfVisited(traversalQueue, [startingCoordinate[0] + 2, startingCoordinate[1] + 1]) === false
    ) {
      if (endingCoordinate[0] === startingCoordinate[0] + 2 && endingCoordinate[1] === startingCoordinate[1] + 1) {
        traversalQueue.unshift([startingCoordinate[0] + 2, startingCoordinate[1] + 1])
        startingCoordinate = traversalQueue[0]
        currentMoveCounter += 1
        return knightMoves(startingCoordinate, endingCoordinate, currentMoveCounter, lowestMoveCounter, visitedCoordinates, traversalQueue)
      } 
      traversalQueue.push([startingCoordinate[0] + 2, startingCoordinate[1] + 1])
    }
    // check if down 2, right 1 is valid and not already visited
    if (
      startingCoordinate[0] + 1 <= 7 &&
      startingCoordinate[1] + 2 <= 7 &&
      checkIfVisited(visitedCoordinates, [startingCoordinate[0] + 1, startingCoordinate[1] + 2]) === false &&
      checkIfVisited(traversalQueue, [startingCoordinate[0] + 1, startingCoordinate[1] + 2]) === false
    ) {
      if (endingCoordinate[0] === startingCoordinate[0] + 1 && endingCoordinate[1] === startingCoordinate[1] + 2) {
        traversalQueue.unshift([startingCoordinate[0] + 1, startingCoordinate[1] + 2])
        startingCoordinate = traversalQueue[0]
        currentMoveCounter += 1
        return knightMoves(startingCoordinate, endingCoordinate, currentMoveCounter, lowestMoveCounter, visitedCoordinates, traversalQueue)
      } 
      traversalQueue.push([startingCoordinate[0] + 1, startingCoordinate[1] + 2])
    }
    // check if down 2, left 1 is valid and not already visited
    if (
      startingCoordinate[0] - 1 >= 0 &&
      startingCoordinate[1] + 2 <= 7 &&
      checkIfVisited(visitedCoordinates, [startingCoordinate[0] - 1, startingCoordinate[1] + 2]) === false &&
      checkIfVisited(traversalQueue, [startingCoordinate[0] - 1, startingCoordinate[1] + 2]) === false
    ) {
      if (endingCoordinate[0] === startingCoordinate[0] - 1 && endingCoordinate[1] === startingCoordinate[1] + 2) {
        traversalQueue.unshift([startingCoordinate[0] - 1, startingCoordinate[1] + 2])
        startingCoordinate = traversalQueue[0]
        currentMoveCounter += 1
        return knightMoves(startingCoordinate, endingCoordinate, currentMoveCounter, lowestMoveCounter, visitedCoordinates, traversalQueue)
      } 
      traversalQueue.push([startingCoordinate[0] - 1, startingCoordinate[1] + 2])
    }
    // check if left 2, down 1 is valid and not already visited
    if (
      startingCoordinate[0] - 2 >= 0 &&
      startingCoordinate[1] + 1 <= 7 &&
      checkIfVisited(visitedCoordinates, [startingCoordinate[0] - 2, startingCoordinate[1] + 1]) === false &&
      checkIfVisited(traversalQueue, [startingCoordinate[0] - 2, startingCoordinate[1] + 1]) === false
    ) {
      if (endingCoordinate[0] === startingCoordinate[0] - 2 && endingCoordinate[1] === startingCoordinate[1] + 1) {
        traversalQueue.unshift([startingCoordinate[0] - 2, startingCoordinate[1] + 1])
        startingCoordinate = traversalQueue[0]
        currentMoveCounter += 1
        return knightMoves(startingCoordinate, endingCoordinate, currentMoveCounter, lowestMoveCounter, visitedCoordinates, traversalQueue)
      } 
      traversalQueue.push([startingCoordinate[0] - 2, startingCoordinate[1] + 1])
    }
    // check if left 2, up 1 is valid and not already visited
    if (
      startingCoordinate[0] - 2 >= 0 &&
      startingCoordinate[1] - 1 >= 0 &&
      checkIfVisited(visitedCoordinates, [startingCoordinate[0] - 2, startingCoordinate[1] - 1]) === false &&
      checkIfVisited(traversalQueue, [startingCoordinate[0] - 2, startingCoordinate[1] - 1]) === false
    ) {
      if (endingCoordinate[0] === startingCoordinate[0] - 2 && endingCoordinate[1] === startingCoordinate[1] - 1) {
        traversalQueue.unshift([startingCoordinate[0] - 2, startingCoordinate[1] - 1])
        startingCoordinate = traversalQueue[0]
        currentMoveCounter += 1
        return knightMoves(startingCoordinate, endingCoordinate, currentMoveCounter, lowestMoveCounter, visitedCoordinates, traversalQueue)
      }
      traversalQueue.push([startingCoordinate[0] - 2, startingCoordinate[1] - 1])
    }
    // check if up 2, left 1 is valid and not already visited
    if (
      startingCoordinate[0] - 1 >= 0 &&
      startingCoordinate[1] - 2 >= 0 &&
      checkIfVisited(visitedCoordinates, [startingCoordinate[0] - 1, startingCoordinate[1] - 2]) === false &&
      checkIfVisited(traversalQueue, [startingCoordinate[0] - 1, startingCoordinate[1] - 2]) === false
    ) {
      if (endingCoordinate[0] === startingCoordinate[0] - 1 && endingCoordinate[1] === startingCoordinate[1] - 2) {
        traversalQueue.unshift([startingCoordinate[0] - 1, startingCoordinate[1] - 2])
        startingCoordinate = traversalQueue[0]
        currentMoveCounter += 1
        return knightMoves(startingCoordinate, endingCoordinate, currentMoveCounter, lowestMoveCounter, visitedCoordinates, traversalQueue)
      }
      traversalQueue.push([startingCoordinate[0] - 1, startingCoordinate[1] - 2])
    }
    // check if up 2, right 1 is valid and not already visited
    if (
      startingCoordinate[0] + 1 <= 7 &&
      startingCoordinate[1] - 2 >= 0 &&
      checkIfVisited(visitedCoordinates, [startingCoordinate[0] + 1, startingCoordinate[1] - 2]) === false &&
      checkIfVisited(traversalQueue, [startingCoordinate[0] + 1, startingCoordinate[1] - 2]) === false
    ) {
      if (endingCoordinate[0] === startingCoordinate[0] + 1 && endingCoordinate[1] === startingCoordinate[1] - 2) {
        traversalQueue.unshift([tartingCoordinate[0] + 1, startingCoordinate[1] - 2])
        startingCoordinate = traversalQueue[0]
        currentMoveCounter += 1
        return knightMoves(startingCoordinate, endingCoordinate, currentMoveCounter, lowestMoveCounter, visitedCoordinates, traversalQueue)
      }
      traversalQueue.push([startingCoordinate[0] + 1, startingCoordinate[1] - 2])
    }
    // remove first item in queue since it was just evaluated
    /* traversalQueue.unshift() */ /* MOVE THIS TO THE TOP, this removes children that were just added, or children not visited yet. also SHOULD BE SHIFT */

    console.log(startingCoordinate, "old")
    startingCoordinate = traversalQueue[0]
    console.log(startingCoordinate, "new")
    currentMoveCounter += 1
    knightMoves(startingCoordinate, endingCoordinate, currentMoveCounter, lowestMoveCounter, visitedCoordinates, traversalQueue)

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

// console.log(GameBoard.getBoard());
GameBoard.setBoard([4, 4]);

knightMoves([3, 3], [4, 3]);

// make children logic go straight to the child square that is the ending square if possible, double check the logic so make sure all are legal moves
