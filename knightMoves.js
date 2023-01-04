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

const isValidCoordinate = (coordinate) => {
  if (
    coordinate.row < 0 ||
    coordinate.row > 7 ||
    coordinate.column < 0 ||
    coordinate.column > 7
  ) {
    return false;
  }
  return true;
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
  visitedCoordinates = [],
  traversalQueue = []
) => {
  if (Array.isArray(startingCoordinate)) {
    startingCoordinate = new GraphNode(startingCoordinate[0], startingCoordinate[1])
  }
  if (Array.isArray(endingCoordinate)) {
    endingCoordinate = new GraphNode(endingCoordinate[0], endingCoordinate[1])
  }
  if (isValidCoordinate(startingCoordinate) === false && isValidCoordinate(endingCoordinate) === false) {
    console.log("Your starting and ending squares are not valid squares on the board.")
    return
  } 
  if (
    isValidCoordinate(startingCoordinate) === false
  ) {
    console.log("Your starting square is not a valid square on the board.")
    return;
  }
  if (
    isValidCoordinate(endingCoordinate) === false
  ) {
    console.log("Your ending square is not a valid square on the board.")
    return;
  }
  // add current startingCoordinate to list of coordinates already visited
  if (checkIfVisited(visitedCoordinates, startingCoordinate) === false) {
    visitedCoordinates.push(startingCoordinate)
  }
  // remove first item in queue since it was just evaluated
  traversalQueue.shift()
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
      checkIfVisited(visitedCoordinates, new GraphNode(startingCoordinate.row + 2, startingCoordinate.column - 1)) === false &&
      checkIfVisited(traversalQueue, new GraphNode(startingCoordinate.row + 2, startingCoordinate.column - 1)) === false
    ) {
      if (endingCoordinate.row === startingCoordinate.row + 2 && endingCoordinate.column === startingCoordinate.column - 1) {
        traversalQueue.unshift(new GraphNode(startingCoordinate.row + 2, startingCoordinate.column - 1), startingCoordinate)
        startingCoordinate = traversalQueue[0]
        return knightMoves(startingCoordinate, endingCoordinate, visitedCoordinates, traversalQueue)
      } 
      traversalQueue.push(new GraphNode(startingCoordinate.row + 2, startingCoordinate.column - 1, startingCoordinate))
    }
    // check if right 2, down 1 is valid and not already visited
    if (
      startingCoordinate.row + 2 <= 7 &&
      startingCoordinate.column + 1 <= 7 &&
      checkIfVisited(visitedCoordinates, new GraphNode(startingCoordinate.row + 2, startingCoordinate.column + 1)) === false &&
      checkIfVisited(traversalQueue, new GraphNode(startingCoordinate.row + 2, startingCoordinate.column + 1)) === false
    ) {
      if (endingCoordinate.row === startingCoordinate.row + 2 && endingCoordinate.column === startingCoordinate.column + 1) {
        traversalQueue.unshift(new GraphNode(startingCoordinate.row + 2, startingCoordinate.column + 1, startingCoordinate))
        startingCoordinate = traversalQueue[0]
        return knightMoves(startingCoordinate, endingCoordinate, visitedCoordinates, traversalQueue)
      } 
      traversalQueue.push(new GraphNode(startingCoordinate.row + 2, startingCoordinate.column + 1, startingCoordinate))
    }
    // check if down 2, right 1 is valid and not already visited
    if (
      startingCoordinate.row + 1 <= 7 &&
      startingCoordinate.column + 2 <= 7 &&
      checkIfVisited(visitedCoordinates, new GraphNode(startingCoordinate.row + 1, startingCoordinate.column + 2)) === false &&
      checkIfVisited(traversalQueue, new GraphNode(startingCoordinate.row + 1, startingCoordinate.column + 2)) === false
    ) {
      if (endingCoordinate.row === startingCoordinate.row + 1 && endingCoordinate.column === startingCoordinate.column + 2) {
        traversalQueue.unshift(new GraphNode(startingCoordinate.row + 1, startingCoordinate.column + 2, startingCoordinate))
        startingCoordinate = traversalQueue[0]
        return knightMoves(startingCoordinate, endingCoordinate, visitedCoordinates, traversalQueue)
      } 
      traversalQueue.push(new GraphNode(startingCoordinate.row + 1, startingCoordinate.column + 2, startingCoordinate))
    }
    // check if down 2, left 1 is valid and not already visited
    if (
      startingCoordinate.row - 1 >= 0 &&
      startingCoordinate.column + 2 <= 7 &&
      checkIfVisited(visitedCoordinates, new GraphNode(startingCoordinate.row - 1, startingCoordinate.column + 2)) === false &&
      checkIfVisited(traversalQueue, new GraphNode(startingCoordinate.row - 1, startingCoordinate.column + 2)) === false
    ) {
      if (endingCoordinate.row === startingCoordinate.row - 1 && endingCoordinate.column === startingCoordinate.column + 2) {
        traversalQueue.unshift(new GraphNode(startingCoordinate.row - 1, startingCoordinate.column + 2, startingCoordinate))
        startingCoordinate = traversalQueue[0]
        return knightMoves(startingCoordinate, endingCoordinate, visitedCoordinates, traversalQueue)
      } 
      traversalQueue.push(new GraphNode(startingCoordinate.row - 1, startingCoordinate.column + 2, startingCoordinate))
    }
    // check if left 2, down 1 is valid and not already visited
    if (
      startingCoordinate.row - 2 >= 0 &&
      startingCoordinate.column + 1 <= 7 &&
      checkIfVisited(visitedCoordinates, new GraphNode(startingCoordinate.row - 2, startingCoordinate.column + 1)) === false &&
      checkIfVisited(traversalQueue, new GraphNode(startingCoordinate.row - 2, startingCoordinate.column + 1)) === false
    ) {
      if (endingCoordinate.row === startingCoordinate.row - 2 && endingCoordinate.column === startingCoordinate.column + 1) {
        traversalQueue.unshift(new GraphNode(startingCoordinate.row - 2, startingCoordinate.column + 1, startingCoordinate))
        startingCoordinate = traversalQueue[0]
        return knightMoves(startingCoordinate, endingCoordinate, visitedCoordinates, traversalQueue)
      } 
      traversalQueue.push(new GraphNode(startingCoordinate.row - 2, startingCoordinate.column + 1, startingCoordinate))
    }
    // check if left 2, up 1 is valid and not already visited
    if (
      startingCoordinate.row - 2 >= 0 &&
      startingCoordinate.column - 1 >= 0 &&
      checkIfVisited(visitedCoordinates, new GraphNode(startingCoordinate.row - 2, startingCoordinate.column - 1)) === false &&
      checkIfVisited(traversalQueue, new GraphNode(startingCoordinate.row - 2, startingCoordinate.column - 1)) === false
    ) {
      if (endingCoordinate.row === startingCoordinate.row - 2 && endingCoordinate.column === startingCoordinate.column - 1) {
        traversalQueue.unshift(new GraphNode(startingCoordinate.row - 2, startingCoordinate.column - 1, startingCoordinate))
        startingCoordinate = traversalQueue[0]
        return knightMoves(startingCoordinate, endingCoordinate,visitedCoordinates, traversalQueue)
      }
      traversalQueue.push(new GraphNode(startingCoordinate.row - 2, startingCoordinate.column - 1, startingCoordinate))
    }
    // check if up 2, left 1 is valid and not already visited
    if (
      startingCoordinate.row - 1 >= 0 &&
      startingCoordinate.column - 2 >= 0 &&
      checkIfVisited(visitedCoordinates, new GraphNode(startingCoordinate.row - 1, startingCoordinate.column - 2)) === false &&
      checkIfVisited(traversalQueue, new GraphNode(startingCoordinate.row - 1, startingCoordinate.column - 2)) === false
    ) {
      if (endingCoordinate.row === startingCoordinate.row - 1 && endingCoordinate.column === startingCoordinate.column - 2) {
        traversalQueue.unshift(new GraphNode(startingCoordinate.row - 1, startingCoordinate.column - 2, startingCoordinate))
        startingCoordinate = traversalQueue[0]
        return knightMoves(startingCoordinate, endingCoordinate, visitedCoordinates, traversalQueue)
      }
      traversalQueue.push(new GraphNode(startingCoordinate.row - 1, startingCoordinate.column - 2, startingCoordinate))
    }
    // check if up 2, right 1 is valid and not already visited
    if (
      startingCoordinate.row + 1 <= 7 &&
      startingCoordinate.column - 2 >= 0 &&
      checkIfVisited(visitedCoordinates, new GraphNode(startingCoordinate.row + 1, startingCoordinate.column - 2)) === false &&
      checkIfVisited(traversalQueue, new GraphNode(startingCoordinate.row + 1, startingCoordinate.column - 2)) === false
    ) {
      if (endingCoordinate.row === startingCoordinate.row + 1 && endingCoordinate.column === startingCoordinate.column - 2) {
        traversalQueue.unshift(new GraphNode(startingCoordinate.row + 1, startingCoordinate.column - 2, startingCoordinate))
        startingCoordinate = traversalQueue[0]
        return knightMoves(startingCoordinate, endingCoordinate, visitedCoordinates, traversalQueue)
      }
      traversalQueue.push(new GraphNode(startingCoordinate.row + 1, startingCoordinate.column - 2, startingCoordinate))
    }
    startingCoordinate = traversalQueue[0]
    return knightMoves(startingCoordinate, endingCoordinate, visitedCoordinates, traversalQueue)
  }
};

// knightMoves([0, 0], [3, 4]);
// knightMoves([6, 0], [4, 2]);
knightMoves([2, 2], [1, 3]);

// make children logic go straight to the child square that is the ending square if possible, double check the logic so make sure all are legal moves

// instead of currentPath and shortestPath being an array of array, try an array of objects, where each object has an x, y, and a parent
// property that points to the parent node when the object is being enqueued
