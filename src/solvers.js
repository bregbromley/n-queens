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

//hasAnyRowConflicts
//hasAnyColConflicts

window.findNRooksSolution = function(n) {

  // Breg : using togglePiece

  // [
  //   [0, 0, 0, 0],
  //   [0, 0, 0, 0],
  //   [0, 0, 0, 0],
  //   [0, 0, 0, 0]
  // ];

  //var solution = new Board({n: n}); //fixme
  //start a for loop i = row
  //  nested for loop j = col
  //    use togglePeiece function
  //    if no colflict move to next piece (break)
  //    if conflict togglePiece



  //  David :  not using togglePiece
  var solution = [];
  var board = new this.Board({n: n});
  for (var i = 0; i < n; i++) {
    board.get(i)[i] = 1;
  }
  solution = board.rows();


  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other

// set solutionCount to 0

//create a soultionTrack function:
//At Nth row,if there's no confilct ,the solution do the increment
// iterate through the col,use toggle help function.if there's no confilct,row increse by 1,return the solutionCount


window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board({n: n});

  var helper = function(row) {
    if (row === n && !board.hasAnyRooksConflicts()) {
      solutionCount++;
    } else {
      for (var i = 0; i < n; i++) {
        board.togglePiece(row, i);
        if (!board.hasAnyRooksConflicts()) {
          helper(row + 1);
        }
        board.togglePiece(row, i);
      }
    }
  };

  helper(0);

  // console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other

window.findNQueensSolution = function(n) {
  var board = new Board({n: n});

  var helper = function(row) {
    if (row === n) {
      if (!board.hasAnyQueensConflicts()) {
        return true;
      }
    }
    for (var i = 0; i < n; i++) {
      board.togglePiece(row, i);
      if (!board.hasAnyQueensConflicts()) {
        if (helper(row + 1)) {
          return true;
        }
      }
      board.togglePiece(row, i);
    }
    return false;
  };

  helper(0);
  return board.rows();
};



// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0; //fixme
  var board = new Board({n: n});

  var helper = function(row) {
    if (row === n) {
      if (!board.hasAnyQueensConflicts()) {
        solutionCount++;
      }
      return true;
    }
    for (var i = 0; i < n; i++) {
      board.togglePiece(row, i);
      if (!board.hasAnyQueensConflicts()) {
        helper(row + 1);
      }
      board.togglePiece(row, i);
    }
    return false;
  };

  helper(0);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};

