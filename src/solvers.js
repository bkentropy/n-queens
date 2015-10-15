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
  var solutionCount = 0; //fixme
  var board = new Board({n: n});
  var matrix = board.rows(); //actual board
  var emptyMatrix = matrix.slice();


  var solutionChecker = function(piecesToGo) {
    //base case
    if( piecesToGo === 0 ) {
      solutionCount++;
      return;
    }
    // will loop over every row except first row
      for ( var i = 1; i < matrix.length; i++ ) {
        for ( var j = 0; j < matrix.length; j++ ) {
          matrix[i][j] = 1;
          if ( board.hasAnyColConflicts() === false && board.hasAnyRowConflicts() === false ) {  
            solutionChecker(piecesToGo - 1)
          } else {
            matrix[i][j] = 0;
            continue;
          }
        }
      }
  };

  for ( var k = 0; k < matrix.length; k++ ) {
    // matrix = emptyMatrix;
    matrix[0][k-1] = 0
    matrix[0][k] = 1;
    solutionChecker(n - 1);
  }

  //iterate solutionChecker over the first row
  //for each potential first row postion




    //base case idea
      //if piecesToGo = 0
          //solution++;
        //else return;
    //solutionCount = 0
    //pieceCount = 0;
    //set a var i = 0 vert
    //set a var j = 0 horiz
    //while loop for i and j
    //iterate over rows (while i < n)
      //for each [i][j] position
        //place a piece (set it as 1)
          //if the position has NO conflict
            //pieceCount++
            //recurse
    //move to next row
      //for each j position
        //place a piece
          //if the position has a conflict
            //break the solution tree
          //else add to the count of pieces
    //move to next row
      //for each j ....
        // ...
          //...
    //once you finish with each row
      //if the number count === n
      //increment solution count

          //skip over current j var loop
          //fun some function that places a piece on the next position


  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
