// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
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
    //acess the row, set the count to be 0
    //iterate through the row index,
    //if there's no confilct, the count does increment; if there's Conflict, return true
      let check = this.attributes[rowIndex];
      // console.log(check);
      let count = 0;
      var result = false;
      for (var i = 0; i < check.length; i++) {
        if (check[i] === 1) {
          count++;
        }
        if (count > 1) {
          return true;
        }
      }
      return false;

      //idea
      // for (var i = 0; i < check.length; i++) {
      // }
      // if (count > 0) {
      //   result = true;
      // }
      // return result;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      // use two for loop,iterate through the rows
      //if there's no conflict, the tempCount do the increment;if there's Conflict, return true
      // console.log(this.rows);
      // console.log( 'this', this.attributes);
      let n = this.attributes['n'];
      let anyRowCheck = Boolean;
      for (var i = 0; i < n; i++) {
        anyRowCheck = this.hasRowConflictAt(i);
        if (anyRowCheck === true) {
          return true;
        }
      }
      return false;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {

      let n = this.attributes['n'];
      let count = 0;
      for (let i = 0; i < n; i++) {
        if (this.attributes[i][colIndex] === 1) {
          count++;
        }
      }
      if (count > 1) {
        return true;
      }
      return false;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {

      let n = this.get('n');
      let check = Boolean;
      for (let i = 0; i < n; i++) {
        check = this.hasColConflictAt(i);
        if (check === true) {
          return true;
        }
      }
      return false;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //

    // var matrix = this.attributes;
    // for (var i = 0; i < matrix.length; i++) {
    //   var count = 0;
    //   var idx = i;
    //   for (var j = 0; j < matrix.length; j++) {
    //     count += matrix[j][i];
    //     idx = idx + 1;
    //   }
    // }

    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {

      //David's idea

      // var idx = majorDiagonalColumnIndexAtFirstRow;
      // let tempArr = [];
      // let count = 0;

      // for (let i = 0; i < this.attributes['n']; i++) {
      //   tempArr.push(this.attributes[i][idx]);
      //   idx++;
      // }

      // tempArr.forEach(function(ele) {
      //   if (ele === 1) {
      //     count++;
      //   }
      // });
      // if (count > 1) {
      //   return true;
      // }
      // return false;


      //Breg's idea
      var matrix = this.attributes;
      for (var i = 0; i < matrix['n']; i++) {
        var row = i;
        var col = majorDiagonalColumnIndexAtFirstRow;
        var count = 0;
        var helper = function() {
          while (col < matrix['n'] && row < matrix['n']) {
            count += matrix[row][col];
            row++;
            col++;
          }
        };
        helper();
        if (count > 1) {
          return true;
        }
      }
      return false;
    },





    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {

      for (var i = 0; i < this.attributes['n']; i++) {
        if (this.hasMajorDiagonalConflictAt(i)) {
          return true;
        }
      }
      return false;
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      var matrix = this.attributes;
      for (var i = matrix['n'] - 1; i >= 0; i--) {
        var row = i;
        var col = minorDiagonalColumnIndexAtFirstRow;
        var count = 0;
        var helper = function() {
          while (col < matrix['n'] && row >= 0) {
            count += matrix[row][col];
            row--;
            col++;
          }
        };
        helper();
        if (count > 1) {
          return true;
        }
      }
      return false;
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {

      for (var i = 0; i < this.attributes['n']; i++) {
        if (this.hasMinorDiagonalConflictAt(i)) {
          return true;
        }
      }
      return false;
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
