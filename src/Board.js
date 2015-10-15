// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {

      var matrix = this.rows(); // not sure
      console.log(matrix);
      // input is rowIndex | output is boolean

      // iterate over the array at rowIndex

      var count = 0;
      for (var i = 0; i < matrix.length; i++) {
        if (matrix[rowIndex][i] === 1) {
          count++;
        }
      }
      if (count > 1) {
        return true;
      } else {
        return false;
      }

      // var count = _.reduce(matrix[rowIndex], function(last, current) {
      //   return last + current;
      // }, 0);
      // if (count > 1) {
      //   return true;
      // } else {
      //   return false;
      // }

    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      // input will be the board matrix | output will be boolean

      // execute hasRowConflictAt on each row
      var results = false;
      for (var i = 0; i < this.rows().length; i++) {
        if (this.hasRowConflictAt(i)) {
          results = true;
        } 
        // if any row has a conflict 
          // return true
      }

      return results;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      // iterate over the matrix

      var matrix = this.rows();
      var count = _.reduce(matrix, function(last, current) {
        return last + current[colIndex];
      }, 0);
        // check the i'th index
          // if any i'th index repeats
            // then return true

      // return boolean
      if (count > 1) {
        return true;
      } else {
        return false;
      }
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      var result = false
      // exectue hasColConflictAt on each i'th index
      for (var i = 0; i < this.rows().length; i++) {
        if (this.hasColConflictAt(i)) {
          result = true;
        }
      }
        // reduce/_.some result array into one value
          // return true if there are ANY conflicts

      return result; 
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(columnIndex) {
      // i's are rows
      // j's are columns 
      var matrix = this.rows();

      // check starting point and check MAJ diagonal
        // +1 to i, +1 to j 
      var count = 0;
      for (var i = 0; i < matrix.length; i++){
        if (matrix[i][columnIndex + i] === 1) {
          count++;
        }
      }
      // for ( var i = 0; i < matrix.length; i++) {
      //   _.reduce(matrix, function(last, current) {
      //     // if there are any repeats
      //     if (last + current[i][columnIndex + i] === 1) {
      //       count++;
      //     }
      //   }, 0);
      // }

      if (count > 1) {
        return true
      } else {
      return false;
      }


    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      // run hasMajorDiagonalConflictAt on each row Index.
      var result = false;

      for ( var i = 0; i < this.rows().length; i++ ) {
        if (this.hasMajorDiagonalConflictAt(i)) {
          result = true;
        }
      }

      return result; 
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(colIndex) {
      // check starting point and check MIN diagonal
      var matrix = this.rows();
      var count = 0;

        // -1 from i, -1 from j
        for ( var i = 0; i < matrix.length; i++ ) {
          if ( matrix[i][colIndex - i] === 1 ) {
            count++;
          }
        }

          // if repeats
          if ( count > 1) {
            return true;
          } else {
            return false;
          }
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      // run hasMinorDiagonalConflictAt on each row index
      var result = false;

      for ( var i = 0; i < this.rows().length; i++ ) {
        if ( this.hasMinorDiagonalConflictAt(i) ) {
          result = true;
        }
      }


      return result; // fixme
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
