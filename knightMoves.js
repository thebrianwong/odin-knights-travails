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

const knightMoves = (
  startingCoordinate,
  endingCoordinate,
  visitedCoordinates = [],
  traversalQueue = []
) => {
  // edge case for the first function call where GraphNode objects have to be created
  if (Array.isArray(startingCoordinate) || Array.isArray(endingCoordinate)) {
    if (Array.isArray(startingCoordinate)) {
      startingCoordinate = new GraphNode(
        startingCoordinate[0],
        startingCoordinate[1]
      );
    }
    if (Array.isArray(endingCoordinate)) {
      endingCoordinate = new GraphNode(
        endingCoordinate[0],
        endingCoordinate[1]
      );
    }
    if (
      isValidCoordinate(startingCoordinate) === false &&
      isValidCoordinate(endingCoordinate) === false
    ) {
      console.log(
        "Your starting and ending squares are not valid squares on the board."
      );
      return;
    }
    if (isValidCoordinate(startingCoordinate) === false) {
      console.log("Your starting square is not a valid square on the board.");
      return;
    }
    if (isValidCoordinate(endingCoordinate) === false) {
      console.log("Your ending square is not a valid square on the board.");
      return;
    }
  }
  // keep track of visited nodes so that they don't get pointlessly revisited
  if (checkIfVisited(visitedCoordinates, startingCoordinate) === false) {
    visitedCoordinates.push(startingCoordinate);
  }
  traversalQueue.shift();
  if (
    startingCoordinate.row === endingCoordinate.row &&
    startingCoordinate.column === endingCoordinate.column
  ) {
    let moveCounter = -1;
    const orderedPath = [];
    while (startingCoordinate !== null) {
      // retracing from the ending square back to the initial starting square
      // the path needs to be reversed before displaying it
      orderedPath.unshift(startingCoordinate);
      moveCounter += 1;
      startingCoordinate = startingCoordinate.parentNode;
    }
    console.log(`You made it in ${moveCounter} moves! Here's your path:`);
    orderedPath.forEach((coordinate) => {
      console.log(convertToArray(coordinate));
    });
  } else {
    // non-adjacency list method, slightly faster
    for (let i = 0; i <= 7; i++) {
      // each iteration looks at the 8 possible moves of a knight and determine if
      // it is a valid move (ie. doesn't move off the board) and if the move would take
      // the knight to a already visited or currently queued square
      const potentialChildNode = new GraphNode(
        startingCoordinate.row + rowDirections[i],
        startingCoordinate.column + columnDirections[i],
        startingCoordinate
      );
      if (
        isValidCoordinate(potentialChildNode) &&
        checkIfVisited(visitedCoordinates, potentialChildNode) === false &&
        checkIfVisited(traversalQueue, potentialChildNode) === false
      ) {
        traversalQueue.push(potentialChildNode);
      }
    }

    // adjacency list method
    /* const buildAdjacencyList = (coordinate) => {
      const adjacencyList = [[], [], [], [], [], [], [], []];
      for (let i = 0; i <= 7; i++) {
        const rowIndex = coordinate.row + rowDirections[i];
        const columnIndex = coordinate.column + columnDirections[i];
        const potentialChildNode = new GraphNode(rowIndex, columnIndex);
        if (
          isValidCoordinate(potentialChildNode) &&
          checkIfVisited(visitedCoordinates, potentialChildNode) === false &&
          checkIfVisited(traversalQueue, potentialChildNode) === false
        ) {
          adjacencyList[rowIndex].push(columnIndex);
        }
      }
      return adjacencyList;
    };
    const adjacencyList = buildAdjacencyList(startingCoordinate);
    // iterate through the adjacency list to enqueue the current vertex's valid vertices
    for (const row in adjacencyList) {
      if (adjacencyList[row].length > 0) {
        for (const column in adjacencyList[row]) {
          const childNode = new GraphNode(
            Number(row),
            adjacencyList[row][column],
            startingCoordinate
          );
          traversalQueue.push(childNode);
        }
      }
    } */

    startingCoordinate = traversalQueue[0];
    return knightMoves(
      startingCoordinate,
      endingCoordinate,
      visitedCoordinates,
      traversalQueue
    );
  }
};

knightMoves([2, 3], [4, 3]);
// 2 moves
// [ 2, 3 ]
// [ 3, 5 ]
// [ 4, 3 ]

// knightMoves([6, 0], [4, 2]);
// 4 moves
// [ 6, 0 ]
// [ 4, 1 ]
// [ 3, 3 ]
// [ 5, 4 ]
// [ 4, 2 ]

// knightMoves([0, 0], [1, 2]);
// 1 move
// [ 0, 0 ]
// [ 1, 2 ]

// knightMoves([4, 4], [4, 4]);
// 0 moves
// [ 4, 4 ]
