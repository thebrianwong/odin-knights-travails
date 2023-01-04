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
  // console.log(startingCoordinate, endingCoordinate)
  // return
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
  shortestPath.shift() /* removing for depth first */
  // use breadth first search /* ACTUALLY maybe depth first would work better */

  // compare if startedCoordinate and endingCoordinate are the same
  if (startingCoordinate.row === endingCoordinate.row && startingCoordinate.column === endingCoordinate.column) {
    // for breadth first
    // console.log(`You made it in ${currentMoveCounter} moves! Here's your path:`)
    let moveCounter = -1
    const orderedPath = []

    while (startingCoordinate !== null) {
      orderedPath.unshift(startingCoordinate)
      moveCounter += 1
      startingCoordinate = startingCoordinate.parentNode
    }

    // currentPath.forEach((coordinate) => {
    //   // console.log(coordinate)
    //   orderedPath.unshift(coordinate)
    // })
    console.log(`You made it in ${moveCounter} moves! Here's your path:`)
    orderedPath.forEach((coordinate) => {
      console.log(convertToArray(coordinate))
    })

    // for depth first
    /* if (currentMoveCounter < lowestMoveCounter) {
      lowestMoveCounter = currentMoveCounter
      shortestPath = currentPath
    } */
    // return [lowestMoveCounter, shortestPath]
    
    // if the same, means found the endingCoordinate and can display relevant info
      // print moveCounter
      // forEach loop visitedCoordinates and print each item/coordinate
      // return
  } else {
    // check if right 2, up 1 is valid and not already visited
    if (
      startingCoordinate.row + 2 <= 7 &&
      startingCoordinate.column - 1 >= 0 &&
      checkIfVisited(currentPath, new GraphNode(startingCoordinate.row + 2, startingCoordinate.column - 1)) === false &&
      checkIfVisited(shortestPath, new GraphNode(startingCoordinate.row + 2, startingCoordinate.column - 1)) === false
    ) {
      // breadth first
      if (endingCoordinate.row === startingCoordinate.row + 2 && endingCoordinate.column === startingCoordinate.column - 1) {
        shortestPath.unshift(new GraphNode(startingCoordinate.row + 2, startingCoordinate.column - 1), startingCoordinate)
        startingCoordinate = shortestPath[0]
        currentMoveCounter += 1
        return knightMoves(startingCoordinate, endingCoordinate, currentMoveCounter, lowestMoveCounter, currentPath, shortestPath)
      } 
      shortestPath.push(new GraphNode(startingCoordinate.row + 2, startingCoordinate.column - 1, startingCoordinate))

      // depth first
      /* const childCoordinate = [startingCoordinate[0] + 2, startingCoordinate[1] - 1]
      console.log(childCoordinate, "dwwd")
      const returnValues = knightMoves(childCoordinate, endingCoordinate, currentMoveCounter + 1, lowestMoveCounter, currentPath, shortestPath)
      console.log(returnValues, "wdwd")
      lowestMoveCounter = returnValues[0]
      shortestPath = returnValues[1] */
    }
    // check if right 2, down 1 is valid and not already visited
    if (
      startingCoordinate.row + 2 <= 7 &&
      startingCoordinate.column + 1 <= 7 &&
      checkIfVisited(currentPath, new GraphNode(startingCoordinate.row + 2, startingCoordinate.column + 1)) === false &&
      checkIfVisited(shortestPath, new GraphNode(startingCoordinate.row + 2, startingCoordinate.column + 1)) === false
    ) {
      // breadth first
      if (endingCoordinate.row === startingCoordinate.row + 2 && endingCoordinate.column === startingCoordinate.column + 1) {
        shortestPath.unshift(new GraphNode(startingCoordinate.row + 2, startingCoordinate.column + 1, startingCoordinate))
        startingCoordinate = shortestPath[0]
        currentMoveCounter += 1
        return knightMoves(startingCoordinate, endingCoordinate, currentMoveCounter, lowestMoveCounter, currentPath, shortestPath)
      } 
      shortestPath.push(new GraphNode(startingCoordinate.row + 2, startingCoordinate.column + 1, startingCoordinate))

      // depth first
      /* const childCoordinate = [startingCoordinate[0] + 2, startingCoordinate[1] + 1]
      const returnValues = knightMoves(childCoordinate, endingCoordinate, currentMoveCounter + 1, lowestMoveCounter, currentPath, shortestPath)
      lowestMoveCounter = returnValues[0]
      shortestPath = returnValues[1] */
    }
    // check if down 2, right 1 is valid and not already visited
    if (
      startingCoordinate.row + 1 <= 7 &&
      startingCoordinate.column + 2 <= 7 &&
      checkIfVisited(currentPath, new GraphNode(startingCoordinate.row + 1, startingCoordinate.column + 2)) === false &&
      checkIfVisited(shortestPath, new GraphNode(startingCoordinate.row + 1, startingCoordinate.column + 2)) === false
    ) {
      // breadth first
      if (endingCoordinate.row === startingCoordinate.row + 1 && endingCoordinate.column === startingCoordinate.column + 2) {
        shortestPath.unshift(new GraphNode(startingCoordinate.row + 1, startingCoordinate.column + 2, startingCoordinate))
        startingCoordinate = shortestPath[0]
        currentMoveCounter += 1
        return knightMoves(startingCoordinate, endingCoordinate, currentMoveCounter, lowestMoveCounter, currentPath, shortestPath)
      } 
      shortestPath.push(new GraphNode(startingCoordinate.row + 1, startingCoordinate.column + 2, startingCoordinate))

      // depth first
      /* const childCoordinate = [startingCoordinate[0] + 1, startingCoordinate[1] + 2]
      const returnValues = knightMoves(childCoordinate, endingCoordinate, currentMoveCounter + 1, lowestMoveCounter, currentPath, shortestPath)
      lowestMoveCounter = returnValues[0]
      shortestPath = returnValues[1] */
    }
    // check if down 2, left 1 is valid and not already visited
    if (
      startingCoordinate.row - 1 >= 0 &&
      startingCoordinate.column + 2 <= 7 &&
      checkIfVisited(currentPath, new GraphNode(startingCoordinate.row - 1, startingCoordinate.column + 2)) === false &&
      checkIfVisited(shortestPath, new GraphNode(startingCoordinate.row - 1, startingCoordinate.column + 2)) === false
    ) {
      // breadth first
      if (endingCoordinate.row === startingCoordinate.row - 1 && endingCoordinate.column === startingCoordinate.column + 2) {
        shortestPath.unshift(new GraphNode(startingCoordinate.row - 1, startingCoordinate.column + 2, startingCoordinate))
        startingCoordinate = shortestPath[0]
        currentMoveCounter += 1
        return knightMoves(startingCoordinate, endingCoordinate, currentMoveCounter, lowestMoveCounter, currentPath, shortestPath)
      } 
      shortestPath.push(new GraphNode(startingCoordinate.row - 1, startingCoordinate.column + 2, startingCoordinate))

      // depth first
      /* const childCoordinate = [startingCoordinate[0] - 1, startingCoordinate[1] + 2]
      const returnValues = knightMoves(childCoordinate, endingCoordinate, currentMoveCounter + 1, lowestMoveCounter, currentPath, shortestPath)
      lowestMoveCounter = returnValues[0]
      shortestPath = returnValues[1] */
    }
    // check if left 2, down 1 is valid and not already visited
    if (
      startingCoordinate.row - 2 >= 0 &&
      startingCoordinate.column + 1 <= 7 &&
      checkIfVisited(currentPath, new GraphNode(startingCoordinate.row - 2, startingCoordinate.column + 1)) === false &&
      checkIfVisited(shortestPath, new GraphNode(startingCoordinate.row - 2, startingCoordinate.column + 1)) === false
    ) {
      // breadth first
      if (endingCoordinate.row === startingCoordinate.row - 2 && endingCoordinate.column === startingCoordinate.column + 1) {
        shortestPath.unshift(new GraphNode(startingCoordinate.row - 2, startingCoordinate.column + 1, startingCoordinate))
        startingCoordinate = shortestPath[0]
        currentMoveCounter += 1
        return knightMoves(startingCoordinate, endingCoordinate, currentMoveCounter, lowestMoveCounter, currentPath, shortestPath)
      } 
      shortestPath.push(new GraphNode(startingCoordinate.row - 2, startingCoordinate.column + 1, startingCoordinate))

      // depth first
      /* const childCoordinate = [startingCoordinate[0] - 2, startingCoordinate[1] + 1]
      const returnValues = knightMoves(childCoordinate, endingCoordinate, currentMoveCounter + 1, lowestMoveCounter, currentPath, shortestPath)
      lowestMoveCounter = returnValues[0]
      shortestPath = returnValues[1] */
    }
    // check if left 2, up 1 is valid and not already visited
    if (
      startingCoordinate.row - 2 >= 0 &&
      startingCoordinate.column - 1 >= 0 &&
      checkIfVisited(currentPath, new GraphNode(startingCoordinate.row - 2, startingCoordinate.column - 1)) === false &&
      checkIfVisited(shortestPath, new GraphNode(startingCoordinate.row - 2, startingCoordinate.column - 1)) === false
    ) {
      // breadth first
      if (endingCoordinate.row === startingCoordinate.row - 2 && endingCoordinate.column === startingCoordinate.column - 1) {
        shortestPath.unshift(new GraphNode(startingCoordinate.row - 2, startingCoordinate.column - 1, startingCoordinate))
        startingCoordinate = shortestPath[0]
        currentMoveCounter += 1
        return knightMoves(startingCoordinate, endingCoordinate, currentMoveCounter, lowestMoveCounter, currentPath, shortestPath)
      }
      shortestPath.push(new GraphNode(startingCoordinate.row - 2, startingCoordinate.column - 1, startingCoordinate))

      // depth first
      /* const childCoordinate = [startingCoordinate[0] - 2, startingCoordinate[1] - 1]
      const returnValues = knightMoves(childCoordinate, endingCoordinate, currentMoveCounter + 1, lowestMoveCounter, currentPath, shortestPath)
      lowestMoveCounter = returnValues[0]
      shortestPath = returnValues[1] */
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

      // depth first
      /* const childCoordinate = [startingCoordinate[0] - 1, startingCoordinate[1] - 2]
      const returnValues = knightMoves(childCoordinate, endingCoordinate, currentMoveCounter + 1, lowestMoveCounter, currentPath, shortestPath)
      lowestMoveCounter = returnValues[0]
      shortestPath = returnValues[1] */
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

      // depth first
      /* const childCoordinate = [startingCoordinate[0] + 1, startingCoordinate[1] - 2]
      const returnValues = knightMoves(childCoordinate, endingCoordinate, currentMoveCounter + 1, lowestMoveCounter, currentPath, shortestPath)
      lowestMoveCounter = returnValues[0]
      shortestPath = returnValues[1] */
    }
    // remove first item in queue since it was just evaluated
    /* traversalQueue.unshift() */ /* MOVE THIS TO THE TOP, this removes children that were just added, or children not visited yet. also SHOULD BE SHIFT */

    // breadth first
    // console.log(startingCoordinate, "starting")
    // console.log(currentPath, "current path")
    // console.log(shortestPath, "shortest path")
    // console.log(startingCoordinate, "old")
    startingCoordinate = shortestPath[0]
    // console.log(startingCoordinate, "new")
    currentMoveCounter += 1
    return knightMoves(startingCoordinate, endingCoordinate, currentMoveCounter, lowestMoveCounter, currentPath, shortestPath)
  }

    // console.log(startingCoordinate, "starting")
    // console.log(currentPath, "current path")
    // console.log(shortestPath, "shortest path")
    // depth first
    /* if (startingCoordinate[0] === shortestPath[0][0] && startingCoordinate[1] === shortestPath[0][1]) {
      console.log(`You made it in ${lowestMoveCounter} moves! Here's your path:`)
      shortestPath.forEach((coordinate) => {
        console.log(coordinate)
      })
    } else {
      return [lowestMoveCounter, shortestPath]
    } */


    // if not the same
      /* determine the moves the knight can make without moving off board (8 possible permutations of (hori. +-2, vert. +-1) or
      (vert. +- 2, hori. +- 1), 0 <= x <= 7, 0 <= y <= 7) */
        // push possible moves/children to queue ONLY IF they have not already been visited (compare with items in visitedCoordinates)
      // unshift queue to pop current coordinate that was just evaluated to not be the endingCoordinate
      // recurvisely traverse the graph by calling knightMoves() with startingCoordinate being the first item in the queue
  
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

// knightMoves([0, 0], [3, 4]);
// knightMoves([6, 0], [4, 2]);
knightMoves([4, 5], [0, 1]);

// make children logic go straight to the child square that is the ending square if possible, double check the logic so make sure all are legal moves

// instead of currentPath and shortestPath being an array of array, try an array of objects, where each object has an x, y, and a parent
// property that points to the parent node when the object is being enqueued
