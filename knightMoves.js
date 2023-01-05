const checkIfVisited = (visitedVertices, testVertex) =>
  visitedVertices.some(
    (visitedVertex) =>
      visitedVertex.row === testVertex.row &&
      visitedVertex.column === testVertex.column
  );

const convertToArray = (GraphVertex) => {
  const array = [GraphVertex.row, GraphVertex.column];
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

const GraphVertex = class {
  constructor(row, column, parentVertex = null) {
    this.row = row;
    this.column = column;
    this.parentVertex = parentVertex;
  }
};

const knightMoves = (
  startingCoordinate,
  endingCoordinate,
  visitedVertices = [],
  traversalQueue = []
) => {
  // edge case for the first function call where GraphVertex objects have to be created
  if (Array.isArray(startingCoordinate) || Array.isArray(endingCoordinate)) {
    if (Array.isArray(startingCoordinate)) {
      startingCoordinate = new GraphVertex(
        startingCoordinate[0],
        startingCoordinate[1]
      );
    }
    if (Array.isArray(endingCoordinate)) {
      endingCoordinate = new GraphVertex(
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
  // keep track of visited vertices so that they don't get pointlessly revisited
  if (checkIfVisited(visitedVertices, startingCoordinate) === false) {
    visitedVertices.push(startingCoordinate);
  }
  traversalQueue.shift();
  if (
    startingCoordinate.row === endingCoordinate.row &&
    startingCoordinate.column === endingCoordinate.column
  ) {
    let moveCounter = -1;
    const orderedPath = [];
    while (startingCoordinate !== null) {
      // retracing from the ending vertex back to the initial starting vertex
      // the path needs to be reversed before displaying it
      orderedPath.unshift(startingCoordinate);
      moveCounter += 1;
      startingCoordinate = startingCoordinate.parentVertex;
    }
    console.log(`You made it in ${moveCounter} moves! Here's your path:`);
    orderedPath.forEach((vertex) => {
      console.log(convertToArray(vertex));
    });
  } else {
    // non-adjacency list method, slightly faster
    for (let i = 0; i <= 7; i++) {
      // each iteration looks at the 8 possible moves of a knight and determine if
      // it is a valid move (ie. doesn't move off the board) and if the move would take
      // the knight to a already visited or currently queued square
      const childVertex = new GraphVertex(
        startingCoordinate.row + rowDirections[i],
        startingCoordinate.column + columnDirections[i],
        startingCoordinate
      );
      if (
        isValidCoordinate(childVertex) &&
        checkIfVisited(visitedVertices, childVertex) === false &&
        checkIfVisited(traversalQueue, childVertex) === false
      ) {
        traversalQueue.push(childVertex);
      }
    }

    // adjacency list method
    /* const buildAdjacencyList = (coordinate) => {
      const adjacencyList = [[], [], [], [], [], [], [], []];
      for (let i = 0; i <= 7; i++) {
        const rowIndex = coordinate.row + rowDirections[i];
        const columnIndex = coordinate.column + columnDirections[i];
        const childVertex = new GraphVertex(rowIndex, columnIndex);
        if (
          isValidCoordinate(childVertex) &&
          checkIfVisited(visitedVertices, childVertex) === false &&
          checkIfVisited(traversalQueue, childVertex) === false
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
          const childVertex = new GraphVertex(
            Number(row),
            adjacencyList[row][column],
            startingCoordinate
          );
          traversalQueue.push(childVertex);
        }
      }
    } */

    startingCoordinate = traversalQueue[0];
    return knightMoves(
      startingCoordinate,
      endingCoordinate,
      visitedVertices,
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
// [ 7, 2 ]
// [ 5, 3 ]
// [ 3, 4 ]
// [ 4, 2 ]

// knightMoves([0, 0], [1, 2]);
// 1 move
// [ 0, 0 ]
// [ 1, 2 ]

// knightMoves([4, 4], [4, 4]);
// 0 moves
// [ 4, 4 ]
