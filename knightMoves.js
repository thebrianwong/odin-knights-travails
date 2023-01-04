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

const rowDirections = [2, 2, 1, -1, -2, -2, -1, 1];
const columnDirections = [-1, 1, 2, 2, 1, -1, -2, -2];

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
  if (Array.isArray(startingCoordinate) || Array.isArray(endingCoordinate)) {
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
    for (let i = 0; i <= 7; i++) {
      const potentialChildNode = new GraphNode(startingCoordinate.row + rowDirections[i], startingCoordinate.column + columnDirections[i], startingCoordinate)
      if (isValidCoordinate(potentialChildNode) && checkIfVisited(visitedCoordinates, potentialChildNode) === false && checkIfVisited(traversalQueue, potentialChildNode) === false) {
        traversalQueue.push(potentialChildNode)
      }
    }
    startingCoordinate = traversalQueue[0]
    return knightMoves(startingCoordinate, endingCoordinate, visitedCoordinates, traversalQueue)
  }
};

knightMoves([2, 3], [4, 3]);
// knightMoves([6, 0], [4, 2]);
// knightMoves([0, 0], [1, 2]);

// make children logic go straight to the child square that is the ending square if possible, double check the logic so make sure all are legal moves

// instead of currentPath and shortestPath being an array of array, try an array of objects, where each object has an x, y, and a parent
// property that points to the parent node when the object is being enqueued
