// Scores for keeping track of rows columns and daingols
const USER_SELECTION_SCORE = -1;
const PROGRAM_SELECTION_SCORE = 1;

// Cubes - for storing all the HTML/Javascript DOM elements
// 1st digit is row, 2nd is column. Start from top left (for example cube20 - is third row most-left cube) 
let cube00 = null;
let cube01 = null;
let cube02 = null;
let cube10 = null;
let cube11 = null;
let cube12 = null;
let cube20 = null;
let cube21 = null;
let cube22 = null;

const allCubeArray = [];
let winningThreeCubes = [];

let textUserScore = null;
let textProgramScore = null;
let newGameBtn = null;
let playerWinMessage = null;
let programWinMessage = null;
let drawMessage = null;

let userWins = 0;
let programWins = 0;

let matchCompleted = false;
let matchWinner = 0;

let userSelection = null;
let nextProgramCubeOffenseRow = null;
let nextProgramCubeOffenseCol = null;
let nextProgramCubeOffenseDiagonal = null;
let nextProgramCubeDefense = null;

// game is over when this is 0
let selcetedCubes = 9

// rows,collumns, and Diagonals to keep track of game
let rows = null;
let columns = null;
let diagonalTopLeftToBottom = null;
let diagonalBottomLeftToTop = null;

function addUserImage(){
    if (!this.hasChildNodes() && this.classList.contains('active_cube')) {
        // inserting an img element inside the clicked cube
        const img = document.createElement("img")
        img.src = './X.png';
        this.classList.add('user');
        if(this === cube00)this.classList.add('corner');
        else if(this === cube02)this.classList.add('corner');
        else if(this === cube20)this.classList.add('corner');
        else if(this === cube22)this.classList.add('corner');
        this.appendChild(img); 
        
        // removing the hover effect from the clicked cube from now on
        this.classList.remove("active_cube");
        userSelection = this;

        updateDataStores(this, -1)
        updateAvailvleTotalCubesAndCheckAnyLeft(true);
    } 
}   

function updateDataStores(cube,score){
           //Updaing rows and columns
           if(cube === cube00 || cube === cube01 || cube === cube02){
            if (cube === cube00){
                updateRows(0,0,score);
                updateColumns(0,0,score)
            } else if (cube === cube01){
                updateRows(0,1,score);
                updateColumns(1,0,score)
            } else {
                updateRows(0,2,score);
                updateColumns(2,0,score)
            };
        } else if (cube === cube10 || cube === cube11 || cube === cube12){
            if (cube === cube10){
                updateRows(1,0,score);
                updateColumns(0,1,score)
            } else if (cube === cube11){
                updateRows(1,1,score);
                updateColumns(1,1,score)
            } else {
                updateRows(1,2,score);
                updateColumns(2,1,score)
            };
        } else {
            if (cube === cube20){
                updateRows(2,0,score);
                updateColumns(0,2,score)
            } else if (cube === cube21){
                updateRows(2,1,score);
                updateColumns(1,2,score)
            } else {
                updateRows(2,2,score);
                updateColumns(2,2,score)
            };
        }
        
        // Updaing diagonals
        if(cube === cube00 || cube === cube22){
            if (cube === cube00)updateDiagonalTopLeftToBottom(0,score);
            else updateDiagonalTopLeftToBottom(2,score);
        } else if (cube === cube20 || cube === cube02) {
            if (cube === cube20)updateDiagonalBottomLeftToTop(0,score);
            else updateDiagonalBottomLeftToTop(2,score);
        } else if (cube === cube11){
            updateDiagonalTopLeftToBottom(1,score);
            updateDiagonalBottomLeftToTop(1,score);
        }
}

function updateAvailvleTotalCubesAndCheckAnyLeft (lastSelectionByUser){
    selcetedCubes -= 1;
    if(selcetedCubes === 0 && matchWinner !== 'User' && matchWinner !== 'Program' ) {
        drawMessage.classList.add('display');
        disableGameOnWin();
        return;
    }
    if(matchCompleted && matchWinner === 'User'){
        userWins += 1;
        textUserScore.innerHTML = 'Player: ' + userWins;
        winningThreeCubes.forEach(element => {
            element.classList.add('green')
        });
        playerWinMessage.classList.add('display');
        disableGameOnWin();
        return;
    } 
    if(matchCompleted && matchWinner === 'Program'){
        programWins += 1;
        textProgramScore.innerHTML = 'Program: ' + programWins;
        winningThreeCubes.forEach(element => {
            element.classList.add('red')
        });
        programWinMessage.classList.add('display');
        disableGameOnWin();
        return;
    } 
    if (lastSelectionByUser) addComputerImage(this);
}

function disableGameOnWin(){
    allCubeArray.forEach(element => {
        element.classList.remove('active_cube');
    });
}

function addComputerImage(element){
    const cube = getProgramCube();
    // inserting an img element inside the clicked cube
    const img = document.createElement("img");
    img.src = './O.png';
    cube.appendChild(img); 
    // removing the hover effect from the clicked cube from now on
    cube.classList.remove("active_cube");
    // selcetedCubes -= 1;
    // if (selcetedCubes === 0) alert('Game is drawn');

    // update
    updateDataStores(cube,1);
    nextProgramCubeDefense = null;
    updateAvailvleTotalCubesAndCheckAnyLeft();
} 

function getProgramCube (recentUserCube){
    // if program is first to go, or user did not select center first
    if(cube11.classList.contains('active_cube')) return cube11;
    else if(nextProgramCubeOffenseRow && nextProgramCubeOffenseRow.classList.contains('active_cube')) return nextProgramCubeOffenseRow;
    else if(nextProgramCubeOffenseCol && nextProgramCubeOffenseCol.classList.contains('active_cube')) return nextProgramCubeOffenseCol;
    else if(nextProgramCubeOffenseDiagonal && nextProgramCubeOffenseDiagonal.classList.contains('active_cube')) return nextProgramCubeOffenseDiagonal;
    else if(nextProgramCubeDefense && nextProgramCubeDefense.classList.contains('active_cube')) return nextProgramCubeDefense;
    else if(findLogicalRequiredNext()!==null) return findLogicalRequiredNext();
    else return findEmptyCube();
}

function findLogicalRequiredNext() {
    // User elected middle - return corner 
    // (any does not matter - as if user selcted middle as first move - prog 1st move will always be corner)
    // (else program will always chose middle as 1st move
    if(userSelection === cube11)
        return cube00;
    // User selected corner and oppiset corner is available
    if(cube00.classList.contains('user') && cube22.classList.contains('active_cube'))
        return cube22;
    if(cube22.classList.contains('user') && cube00.classList.contains('active_cube'))
        return cube00;
    if(cube20.classList.contains('user') && cube02.classList.contains('active_cube'))
        return cube02;
    if(cube02.classList.contains('user') && cube20.classList.contains('active_cube'))
        return cube20;

    // User selected middle and corner as first two and program corner is on the same daignol
    if(cube11.classList.contains('user') && cube22.classList.contains('user') && selcetedCubes === 6)
        return cube02;
    // User first two selections are oppoiste corners
    const userSelectionsCount = document.querySelectorAll('.user').length;
    const userCorners = document.querySelectorAll('.corner').length;
    if (userCorners === 2 && userSelectionsCount === userCorners){
        return cube10;
    }

    // user selected two middle cubes first - return the corner between them 
    if(cube01.classList.contains('user') && cube10.classList.contains('user')){
        if(cube00.classList.contains('active_cube')) return cube00;
    }
    if(cube01.classList.contains('user') && cube12.classList.contains('user')){
        if(cube02.classList.contains('active_cube')) return cube02;
    }
    if(cube21.classList.contains('user') && cube10.classList.contains('user')){
        if(cube20.classList.contains('active_cube')) return cube20;
    }
    if(cube21.classList.contains('user') && cube12.classList.contains('user')){
        if(cube22.classList.contains('active_cube')) return cube22;
    }
    return findEmptyCube();
}

function findEmptyCube(){
    for (let i = 0; i<3; i++){
        if (rows.rowsArray[i].cubeArray[0]) return rows.rowsArray[i].cubeNodes[0];
        if (rows.rowsArray[i].cubeArray[1]) return rows.rowsArray[i].cubeNodes[1];
        if (rows.rowsArray[i].cubeArray[2]) return rows.rowsArray[i].cubeNodes[2];
    };
    alert('Sorry program error.')
}

function updateRows(rowNumer, cubeIndex, score_change){
    //if cube was already clicked - should not be active
    if (rows.rowsArray[rowNumer].cubeArray[cubeIndex] === false) {alert('error'); return}
    //update row with user selection
    rows.rowsArray[rowNumer].cubeArray[cubeIndex] = false;
    rows.rowsArray[rowNumer].score += score_change;
    //check row's score - and update proram next move if needed
    if(rows.rowsArray[rowNumer].score === -2){
        rows.neededAction = true;
        rows.actionRowIndex = rowNumer;
        let nextProgrmCubeIndex = rows.rowsArray[rowNumer].cubeArray.findIndex(element => element === true);
        nextProgramCubeDefense = rows.rowsArray[rowNumer].cubeNodes[nextProgrmCubeIndex];
    }
    else if(rows.rowsArray[rowNumer].score === 2){
        let nextProgrmCubeIndex = rows.rowsArray[rowNumer].cubeArray.findIndex(element => element === true);
        nextProgramCubeOffenseRow = rows.rowsArray[rowNumer].cubeNodes[nextProgrmCubeIndex];
    }
    else if(rows.rowsArray[rowNumer].score === -3){
        matchCompleted = true;
        matchWinner = 'User';
        winningThreeCubes.push(rows.rowsArray[rowNumer].cubeNodes[0]);
        winningThreeCubes.push(rows.rowsArray[rowNumer].cubeNodes[1]);
        winningThreeCubes.push(rows.rowsArray[rowNumer].cubeNodes[2]);
    }
    else if(rows.rowsArray[rowNumer].score === 3){
        matchCompleted = true;
        matchWinner = 'Program';
        winningThreeCubes.push(rows.rowsArray[rowNumer].cubeNodes[0]);
        winningThreeCubes.push(rows.rowsArray[rowNumer].cubeNodes[1]);
        winningThreeCubes.push(rows.rowsArray[rowNumer].cubeNodes[2]);
    }

    // Determine if any cubes are avaialble - improve perfermance when looking for program move
    if (rows.rowsArray[rowNumer].cubeArray.every(element => element === false))rows.rowsArray[rowNumer].availableCubes = false;
}

function updateColumns(colNumber, cubeIndex, score_change){
    if (columns.columnsArray[colNumber].cubeArray[cubeIndex] === false) {alert('error'); return}
    columns.columnsArray[colNumber].cubeArray[cubeIndex] = false;
    columns.columnsArray[colNumber].score += score_change;
    if(columns.columnsArray[colNumber].score === -2){
        columns.neededAction = true;
        columns.actionColIndex = colNumber;
        let nextProgrmCubeIndex = columns.columnsArray[colNumber].cubeArray.findIndex(element => element === true)
        nextProgramCubeDefense = columns.columnsArray[colNumber].cubeNodes[nextProgrmCubeIndex];
    } 
    else if(columns.columnsArray[colNumber].score === 2){
        let nextProgrmCubeIndex = columns.columnsArray[colNumber].cubeArray.findIndex(element => element === true);
        nextProgramCubeOffenseCol = columns.columnsArray[colNumber].cubeNodes[nextProgrmCubeIndex];
    }
    else if(columns.columnsArray[colNumber].score === -3){
        matchCompleted = true;
        matchWinner = 'User';
        winningThreeCubes.push(columns.columnsArray[colNumber].cubeNodes[0]);
        winningThreeCubes.push(columns.columnsArray[colNumber].cubeNodes[1]);
        winningThreeCubes.push(columns.columnsArray[colNumber].cubeNodes[2]);
    } 
    else if(columns.columnsArray[colNumber].score === 3){
        matchCompleted = true;
        matchWinner = 'Program';
        winningThreeCubes.push(columns.columnsArray[colNumber].cubeNodes[0]);
        winningThreeCubes.push(columns.columnsArray[colNumber].cubeNodes[1]);
        winningThreeCubes.push(columns.columnsArray[colNumber].cubeNodes[2]);
    }
    if (columns.columnsArray[colNumber].cubeArray.every(element => element === false))columns.columnsArray[colNumber].availableCubes = false;
} 

function updateDiagonalTopLeftToBottom(cubeIndex, score_change){
    if (diagonalTopLeftToBottom.cubeArray[cubeIndex] === false) {alert('error'); return}
    diagonalTopLeftToBottom.score += score_change;
    diagonalTopLeftToBottom.cubeArray[cubeIndex] = false;
    if (diagonalTopLeftToBottom.cubeArray.every(element => element === false)) diagonalTopLeftToBottom.availableCubes = false;
    if(diagonalTopLeftToBottom.score === -2){
        diagonalTopLeftToBottom.neededAction = true;
        diagonalTopLeftToBottom.actionCubeIndex = cubeIndex; // TODO - correct this
        let nextProgrmCubeIndex = diagonalTopLeftToBottom.cubeArray.findIndex(element => element === true);
        nextProgramCubeDefense = diagonalTopLeftToBottom.cubeNodes[nextProgrmCubeIndex];
    } 
    else if(diagonalTopLeftToBottom.score === 2){
        let nextProgrmCubeIndex = diagonalTopLeftToBottom.cubeArray.findIndex(element => element === true);
        nextProgramCubeOffenseDiagonal = diagonalTopLeftToBottom.cubeNodes[nextProgrmCubeIndex];
    }
    else if(diagonalTopLeftToBottom.score === -3){
        matchCompleted = true;
        matchWinner = 'User';
        winningThreeCubes.push(diagonalTopLeftToBottom.cubeNodes[0]);
        winningThreeCubes.push(diagonalTopLeftToBottom.cubeNodes[1]);
        winningThreeCubes.push(diagonalTopLeftToBottom.cubeNodes[2]);
    } 
    else if(diagonalTopLeftToBottom.score === 3){
        matchCompleted = true;
        matchWinner = 'Program';
        winningThreeCubes.push(diagonalTopLeftToBottom.cubeNodes[0]);
        winningThreeCubes.push(diagonalTopLeftToBottom.cubeNodes[1]);
        winningThreeCubes.push(diagonalTopLeftToBottom.cubeNodes[2]);
    }
} 

function updateDiagonalBottomLeftToTop(cubeIndex, score_change){
    if (diagonalBottomLeftToTop.cubeArray[cubeIndex] === false) {alert('error'); return}
    diagonalBottomLeftToTop.score += score_change;
    diagonalBottomLeftToTop.cubeArray[cubeIndex] = false;
    if (diagonalBottomLeftToTop.cubeArray.every(element => element === false))diagonalBottomLeftToTop.availableCubes = false;
    if(diagonalBottomLeftToTop.score === -2){
        diagonalBottomLeftToTop.neededAction = true;
        diagonalBottomLeftToTop.actionCubeIndex = cubeIndex; // TODO  
        let nextProgrmCubeIndex = diagonalBottomLeftToTop.cubeArray.findIndex(element => element === true);
        nextProgramCubeDefense = diagonalBottomLeftToTop.cubeNodes[nextProgrmCubeIndex];
    } 
    else if(diagonalBottomLeftToTop.score === 2){
        let nextProgrmCubeIndex = diagonalBottomLeftToTop.cubeArray.findIndex(element => element === true);
        nextProgramCubeOffenseDiagonal = diagonalBottomLeftToTop.cubeNodes[nextProgrmCubeIndex];
    }
    else if(diagonalBottomLeftToTop.score === -3){
        matchCompleted = true;
        matchWinner = 'User';
        winningThreeCubes.push(diagonalBottomLeftToTop.cubeNodes[0]);
        winningThreeCubes.push(diagonalBottomLeftToTop.cubeNodes[1]);
        winningThreeCubes.push(diagonalBottomLeftToTop.cubeNodes[2]);
    } 
    else if(diagonalBottomLeftToTop.score === 3){
        matchCompleted = true;
        matchWinner = 'Program';
        winningThreeCubes.push(diagonalBottomLeftToTop.cubeNodes[0]);
        winningThreeCubes.push(diagonalBottomLeftToTop.cubeNodes[1]);
        winningThreeCubes.push(diagonalBottomLeftToTop.cubeNodes[2]);
    }
} 

// After window.onload the diferent element are part of DOM and are not null
window.onload = (event) => {
    cube00 = document.querySelector("#r1_c1");
    cube01 = document.querySelector("#r1_c2");
    cube02 = document.querySelector("#r1_c3");
    cube10 = document.querySelector("#r2_c1");
    cube11 = document.querySelector("#r2_c2");
    cube12 = document.querySelector("#r2_c3");
    cube20 = document.querySelector("#r3_c1");
    cube21 = document.querySelector("#r3_c2");
    cube22 = document.querySelector("#r3_c3");

    allCubeArray.push(cube00);
    allCubeArray.push(cube01);
    allCubeArray.push(cube02);
    allCubeArray.push(cube10);
    allCubeArray.push(cube11);
    allCubeArray.push(cube12);
    allCubeArray.push(cube20);
    allCubeArray.push(cube21);
    allCubeArray.push(cube22);
    
    textUserScore = document.querySelector(".score-user");
    textProgramScore = document.querySelector(".score-program");
    newGameBtn = document.querySelector(".new-game");

    playerWinMessage = document.querySelector(".player-win");
    programWinMessage = document.querySelector(".program-win");
    drawMessage = document.querySelector(".draw");

    // Creating click events
    // Bind makes the submited argument as the this insider the called function
    cube00.addEventListener("click", addUserImage.bind(cube00), false);
    cube01.addEventListener("click", addUserImage.bind(cube01), false);
    cube02.addEventListener("click", addUserImage.bind(cube02), false);
    cube10.addEventListener("click", addUserImage.bind(cube10), false);
    cube11.addEventListener("click", addUserImage.bind(cube11), false);
    cube12.addEventListener("click", addUserImage.bind(cube12), false);
    cube20.addEventListener("click", addUserImage.bind(cube20), false);
    cube21.addEventListener("click", addUserImage.bind(cube21), false);
    cube22.addEventListener("click", addUserImage.bind(cube22), false);

    newGameBtn.addEventListener("click", setUpForNewMatch, false)
    setUpForNewMatch();
}   

function setUpForNewMatch(){
       // Data stores to keep track of rows, columns, and diagonals.
       rows = {
        neededAction:false,
        actionRowIndex: -1,
        rowsArray: 
        [
            {
                score:0,
                availableCubes:true,
                cubeArray: [true, true, true],
                cubeNodes:[cube00, cube01, cube02]
            },
            {
                score:0,
                availableCubes:true,
                cubeArray: [true, true, true],
                cubeNodes:[cube10, cube11, cube12]
            },
            {
                score:0,
                availableCubes:true,
                cubeArray: [true, true, true],
                cubeNodes:[cube20, cube21, cube22]
            }
        ]
    };
    
    columns = {
        neededAction:false,
        actionColIndex: -1,
        columnsArray: 
        [
            {
                score:0,
                availableCubes:true,
                cubeArray: [true, true, true],
                cubeNodes:[cube00, cube10, cube20]
            },
            {
                score:0,
                availableCubes:true,
                cubeArray: [true, true, true],
                cubeNodes:[cube01, cube11, cube21]
            },
            {
                score:0,
                availableCubes:true,
                cubeArray: [true, true, true],
                cubeNodes:[cube02, cube12, cube22]
            }
        ]
    };
    
    diagonalTopLeftToBottom = {
        score: 0,
        neededAction:false,
        actionCubeIndex: -1,
        cubeArray: [true,true,true],
        cubeNodes:[cube00, cube11, cube22],
        availableCubes: true
    };
    
    diagonalBottomLeftToTop = {
        score: 0,
        neededAction:false,
        actionCubeIndex: -1,
        cubeArray: [true,true, true],
        cubeNodes:[cube20, cube11, cube02],
        availableCubes: true
    };

    // cleaning up the cubes and removing and adding classes
    allCubeArray.forEach(element => {
        while (element.firstChild) {
            element.firstChild.remove()
        }
        element.classList.add('active_cube');
        element.classList.remove('user');
        element.classList.remove('corner');
        element.classList.remove('green');
        element.classList.remove('red');
    });

    playerWinMessage.classList.remove('display');
    programWinMessage.classList.remove('display');
    drawMessage.classList.remove('display');


    selcetedCubes=9;
    matchCompleted = false;
    matchWinner ='';
    winningThreeCubes = [];
    nextProgramCubeOffenseRow = null;
    nextProgramCubeOffenseCol = null;
    nextProgramCubeOffenseDiagonal = null;
    nextProgramCubeDefense = null;
}