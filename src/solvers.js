/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(num) {
  // var solution = undefined; //fixme

  // place a peice on the board
    // start off somewhere
      // we'll try 0,0
  var board = new Board({n: num});
  var matrix = board.rows();


  for ( var i = 0; i < matrix.length; i++ ) {
    for ( var j = 0; j < matrix.length; j++) {
      matrix[i][j] = 1;
      if ( board.hasAnyRowConflicts() || board.hasAnyColConflicts() ) {
        matrix[i][j] = 0;
      }
    }
  }


  // iterate over possible positions
    // place another peice (tentatively)
      // check if conflicts exist
        // if a conflict exists REMOVE peice 

  console.log('Single solution for ' + num + ' rooks:', JSON.stringify(matrix));
  // return solution;

  return matrix;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var factorial = function(num){
    // If the number is less than 0, reject it.
    if (num < 0) {
        return -1;
    }
    // If the number is 0, its factorial is 1.
    else if (num == 0) {
        return 1;
    }
    var tmp = num;
    while (num-- > 2) {
        tmp *= num;
    }
    return tmp;
  };
  var solutions = factorial(n);

  var solutionCount = 0; 

  var board = new Board({n: n});
  var findSolution = function(row) {
    if ( row === n ) {
      solutionCount++;
      console.log(Math.floor((solutionCount/solutions)*100 )+ "% of " + n + " rooks");
      return;
    }
    for ( var i = 0; i < n; i++ ) {
      board.togglePiece(row, i);
      if ( !board.hasAnyRooksConflicts() ) {
        findSolution(row + 1);
      }
      board.togglePiece(row, i);
    }
  }

  findSolution(0);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solutionCount = 0; 
  

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solutionCount));
  return solutionCount;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;

  var board = new Board({n: n});

  var findSolution = function(row) {
    if ( row === n ) {
      solutionCount++;
      return;
    }
    for ( var i = 0; i < n; i++ ) {
      board.togglePiece(row, i);
      if ( !board.hasAnyQueensConflicts() ) {
        findSolution(row + 1);
      }
      board.togglePiece(row, i);
    }
  }

  findSolution(0);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
