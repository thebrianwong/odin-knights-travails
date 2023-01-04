// prettier-ignore
const checkIfVisited = (visitedCoordinates, testCoordinate) =>
  visitedCoordinates.some(
    (visitedCoordinate) =>
      visitedCoordinate.row === testCoordinate.row &&
      visitedCoordinate.column === testCoordinate.column
  );

const convertToArray = (graphNode) => {
  const array = [graphNode.row, graphNode.column];
  return array;
};

const GraphNode = class {
  constructor(row, column, parentNode = null) {
    this.row = row;
    this.column = column;
    this.parentNode = parentNode;
  }
};

// prettier-ignore
const knightMoves = (
  startingCoordinate,
  endingCoordinate,
  currentMoveCounter = 0,
  lowestMoveCounter = Infinity,
  currentPath = [],
  shortestPath = []
) => {
  if (Array.isArray(startingCoordinate)) {
    startingCoordinate = new GraphNode(startingCoordinate[0], startingCoordinate[1])
  }
  if (Array.isArray(endingCoordinate)) {
    endingCoordinate = new GraphNode(endingCoordinate[0], endingCoordinate[1])
  }
  if (
    startingCoordinate.row < 0 ||
    startingCoordinate.row > 7 ||
    startingCoordinate.column < 0 ||
    startingCoordinate.column > 7
  ) {
    return "Your starting square is not a valid square on the board.";
  }
  if (
    endingCoordinate.row < 0 ||
    endingCoordinate.row > 7 ||
    endingCoordinate.column < 0 ||
    endingCoordinate.column > 7
  ) {
    return "Your ending square is not a valid square on the board.";
  }
  // add current startingCoordinate to list of coordinates already visited
  if (checkIfVisited(currentPath, startingCoordinate) === false) {
    currentPath.push(startingCoordinate)
  }
  // remove first item in queue since it was just evaluated
  shortestPath.shift()
  // use breadth first search /* ACTUALLY maybe depth first would work better */

  // compare if startedCoordinate and endingCoordinate are the same
  if (startingCoordinate.row === endingCoordinate.row && startingCoordinate.column === endingCoordinate.column) {
    let moveCounter = -1
    const orderedPath = []

    while (startingCoordinate !== null) {
      orderedPath.unshift(startingCoordinate)
      moveCounter += 1
      startingCoordinate = startingCoordinate.parentNode
    }

    console.log(`You made it in ${moveCounter} moves! Here's your path:`)
    orderedPath.forEach((coordinate) => {
      console.log(convertToArray(coordinate))
    })
  } else {
    // check if right 2, up 1 is valid and not already visited
    if (
      startingCoordinate.row + 2 <= 7 &&
      startingCoordinate.column - 1 >= 0 &&
      checkIfVisited(currentPath, new GraphNode(startingCoordinate.row + 2, startingCoordinate.column - 1)) === false &&
      checkIfVisited(shortestPath, new GraphNode(startingCoordinate.row + 2, startingCoordinate.column - 1)) === false
    ) {
      if (endingCoordinate.row === startingCoordinate.row + 2 && endingCoordinate.column === startingCoordinate.column - 1) {
        shortestPath.unshift(new GraphNode(startingCoordinate.row + 2, startingCoordinate.column - 1), startingCoordinate)
        startingCoordinate = shortestPath[0]
        currentMoveCounter += 1
        return knightMoves(startingCoordinate, endingCoordinate, currentMoveCounter, lowestMoveCounter, currentPath, shortestPath)
      } 
      shortestPath.push(new GraphNode(startingCoordinate.row + 2, startingCoordinate.column - 1, startingCoordinate))
    }
    // check if right 2, down 1 is valid and not already visited
    if (
      startingCoordinate.row + 2 <= 7 &&
      startingCoordinate.column + 1 <= 7 &&
      checkIfVisited(currentPath, new GraphNode(startingCoordinate.row + 2, startingCoordinate.column + 1)) === false &&
      checkIfVisited(shortestPath, new GraphNode(startingCoordinate.row + 2, startingCoordinate.column + 1)) === false
    ) {
      if (endingCoordinate.row === startingCoordinate.row + 2 && endingCoordinate.column === startingCoordinate.column + 1) {
        shortestPath.unshift(new GraphNode(startingCoordinate.row + 2, startingCoordinate.column + 1, startingCoordinate))
        startingCoordinate = shortestPath[0]
        currentMoveCounter += 1
        return knightMoves(startingCoordinate, endingCoordinate, currentMoveCounter, lowestMoveCounter, currentPath, shortestPath)
      } 
      shortestPath.push(new GraphNode(startingCoordinate.row + 2, startingCoordinate.column + 1, startingCoordinate))
    }
    // check if down 2, right 1 is valid and not already visited
    if (
      startingCoordinate.row + 1 <= 7 &&
      startingCoordinate.column + 2 <= 7 &&
      checkIfVisited(currentPath, new GraphNode(startingCoordinate.row + 1, startingCoordinate.column + 2)) === false &&
      checkIfVisited(shortestPath, new GraphNode(startingCoordinate.row + 1, startingCoordinate.column + 2)) === false
    ) {
      if (endingCoordinate.row === startingCoordinate.row + 1 && endingCoordinate.column === startingCoordinate.column + 2) {
        shortestPath.unshift(new GraphNode(startingCoordinate.row + 1, startingCoordinate.column + 2, startingCoordinate))
        startingCoordinate = shortestPath[0]
        currentMoveCounter += 1
        return knightMoves(startingCoordinate, endingCoordinate, currentMoveCounter, lowestMoveCounter, currentPath, shortestPath)
      } 
      shortestPath.push(new GraphNode(startingCoordinate.row + 1, startingCoordinate.column + 2, startingCoordinate))
    }
    // check if down 2, left 1 is valid and not already visited
    if (
      startingCoordinate.row - 1 >= 0 &&
      startingCoordinate.column + 2 <= 7 &&
      checkIfVisited(currentPath, new GraphNode(startingCoordinate.row - 1, startingCoordinate.column + 2)) === false &&
      checkIfVisited(shortestPath, new GraphNode(startingCoordinate.row - 1, startingCoordinate.column + 2)) === false
    ) {
      if (endingCoordinate.row === startingCoordinate.row - 1 && endingCoordinate.column === startingCoordinate.column + 2) {
        shortestPath.unshift(new GraphNode(startingCoordinate.row - 1, startingCoordinate.column + 2, startingCoordinate))
        startingCoordinate = shortestPath[0]
        currentMoveCounter += 1
        return knightMoves(startingCoordinate, endingCoordinate, currentMoveCounter, lowestMoveCounter, currentPath, shortestPath)
      } 
      shortestPath.push(new GraphNode(startingCoordinate.row - 1, startingCoordinate.column + 2, startingCoordinate))
    }
    // check if left 2, down 1 is valid and not already visited
    if (
      startingCoordinate.row - 2 >= 0 &&
      startingCoordinate.column + 1 <= 7 &&
      checkIfVisited(currentPath, new GraphNode(startingCoordinate.row - 2, startingCoordinate.column + 1)) === false &&
      checkIfVisited(shortestPath, new GraphNode(startingCoordinate.row - 2, startingCoordinate.column + 1)) === false
    ) {
      if (endingCoordinate.row === startingCoordinate.row - 2 && endingCoordinate.column === startingCoordinate.column + 1) {
        shortestPath.unshift(new GraphNode(startingCoordinate.row - 2, startingCoordinate.column + 1, startingCoordinate))
        startingCoordinate = shortestPath[0]
        currentMoveCounter += 1
        return knightMoves(startingCoordinate, endingCoordinate, currentMoveCounter, lowestMoveCounter, currentPath, shortestPath)
      } 
      shortestPath.push(new GraphNode(startingCoordinate.row - 2, startingCoordinate.column + 1, startingCoordinate))
    }
    // check if left 2, up 1 is valid and not already visited
    if (
      startingCoordinate.row - 2 >= 0 &&
      startingCoordinate.column - 1 >= 0 &&
      checkIfVisited(currentPath, new GraphNode(startingCoordinate.row - 2, startingCoordinate.column - 1)) === false &&
      checkIfVisited(shortestPath, new GraphNode(startingCoordinate.row - 2, startingCoordinate.column - 1)) === false
    ) {
      if (endingCoordinate.row === startingCoordinate.row - 2 && endingCoordinate.column === startingCoordinate.column - 1) {
        shortestPath.unshift(new GraphNode(startingCoordinate.row - 2, startingCoordinate.column - 1, startingCoordinate))
        startingCoordinate = shortestPath[0]
        currentMoveCounter += 1
        return knightMoves(startingCoordinate, endingCoordinate, currentMoveCounter, lowestMoveCounter, currentPath, shortestPath)
      }
      shortestPath.push(new GraphNode(startingCoordinate.row - 2, startingCoordinate.column - 1, startingCoordinate))
    }
    // check if up 2, left 1 is valid and not already visited
    if (
      startingCoordinate.row - 1 >= 0 &&
      startingCoordinate.column - 2 >= 0 &&
      checkIfVisited(currentPath, new GraphNode(startingCoordinate.row - 1, startingCoordinate.column - 2)) === false &&
      checkIfVisited(shortestPath, new GraphNode(startingCoordinate.row - 1, startingCoordinate.column - 2)) === false
    ) {
      if (endingCoordinate.row === startingCoordinate.row - 1 && endingCoordinate.column === startingCoordinate.column - 2) {
        shortestPath.unshift(new GraphNode(startingCoordinate.row - 1, startingCoordinate.column - 2, startingCoordinate))
        startingCoordinate = shortestPath[0]
        currentMoveCounter += 1
        return knightMoves(startingCoordinate, endingCoordinate, currentMoveCounter, lowestMoveCounter, currentPath, shortestPath)
      }
      shortestPath.push(new GraphNode(startingCoordinate.row - 1, startingCoordinate.column - 2, startingCoordinate))
    }
    // check if up 2, right 1 is valid and not already visited
    if (
      startingCoordinate.row + 1 <= 7 &&
      startingCoordinate.column - 2 >= 0 &&
      checkIfVisited(currentPath, new GraphNode(startingCoordinate.row + 1, startingCoordinate.column - 2)) === false &&
      checkIfVisited(shortestPath, new GraphNode(startingCoordinate.row + 1, startingCoordinate.column - 2)) === false
    ) {
      if (endingCoordinate.row === startingCoordinate.row + 1 && endingCoordinate.column === startingCoordinate.column - 2) {
        shortestPath.unshift(new GraphNode(startingCoordinate.row + 1, startingCoordinate.column - 2, startingCoordinate))
        startingCoordinate = shortestPath[0]
        currentMoveCounter += 1
        return knightMoves(startingCoordinate, endingCoordinate, currentMoveCounter, lowestMoveCounter, currentPath, shortestPath)
      }
      shortestPath.push(new GraphNode(startingCoordinate.row + 1, startingCoordinate.column - 2, startingCoordinate))
    }
    startingCoordinate = shortestPath[0]
    currentMoveCounter += 1
    return knightMoves(startingCoordinate, endingCoordinate, currentMoveCounter, lowestMoveCounter, currentPath, shortestPath)
  }
};

// console.log(GameBoard.getBoard());
GameBoard.setBoard([4, 4]);

// knightMoves([0, 0], [3, 4]);
// knightMoves([6, 0], [4, 2]);
knightMoves([4, 5], [0, 1]);

// make children logic go straight to the child square that is the ending square if possible, double check the logic so make sure all are legal moves

// instead of currentPath and shortestPath being an array of array, try an array of objects, where each object has an x, y, and a parent
// property that points to the parent node when the object is being enqueued
