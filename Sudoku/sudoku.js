// function testFunction() {
//     document.getElementById('demo').innerHTML = "Hello JavaScript";
//     // console.log(5+6);
//     print();
// }
// document.write(2*5+6/5);
// window.alert(5+6);

function testJS() {

    document.getElementById("testButton").innerHTML = "It Worked!";
}

let squares = new Array(81);
let startCode = new Array(81);
let gridActive = false;
let solvedSquares = 0;
let entropyDisplay;

function submitted() {
    entropyDisplay = document.getElementById("entropy");
    entropyDisplay.innerText = " " + 81;
    makeGrid();
    codeParser();
}

function makeGrid() {
    
    if (!gridActive) {
        document.getElementById("mainView").style.display = "flex";
        const sudokuGrid = document.getElementById("sudokuGrid");
    
        let total = 0;
        for (let i = 0; i < 9; i++) {
            let largeCell = document.createElement("div");
            sudokuGrid.appendChild(largeCell).className = "sub-grid-item";
        }
        console.log(sudokuGrid);
    
        for (let h = 0; h < 9; h+=3) {
            for (let l = 0; l < 3; l++) {
                for (let j = 0; j < 3; j++) {
                    let largeCell = sudokuGrid.getElementsByClassName("sub-grid-item")[j+h];
                    // console.log(largeCell);
                    for (let k = 0; k < 3; k++) {
                        let cellDisplay = document.createElement("div");
                        let possibilities = [1, 2, 3, 4, 5, 6, 7, 8, 9];
                        let cell = {
                            cellDisplay : cellDisplay,
                            id : total,
                            cellValue : 0,
                            entropy : 9,
                            possi : possibilities
                        };

                        cellDisplay.onmouseover = function(){updateDisplayData(cell)}
                        cellDisplay.onmouseout = function() {
                            // document.getElementById("displayValues").style.visibility = "hidden";
                            document.getElementById("displayValues").style.opacity = 0;
                        };
                        
                        squares[total] = cell;
                        total++;
                        
                        // Test display values
                        cellDisplay.innerText = (total-1);
                        // cellDisplay.innerText = (calcColumnStart(total));
                        // cellDisplay.innerText = (calcRowStart(total));
                        // cellDisplay.innerText = (calcSubSquareStart(total));

                        largeCell.appendChild(cellDisplay).className = "grid-item";
                    }
                }
            }
        }

        gridActive = true;
    }
    console.log(squares);
}

function codeParser() {
    let codeString = document.getElementById("inputCodeBox").value;
    // console.log(codeString.length);
    if (codeString.length == 81) {
        let codeTemp = codeString.match(/(\d)/g);
        // console.log(codeTemp);
        if (codeTemp.length == 81) {
            startCode = codeTemp;
            inputFromCode();
        }
    }
}

function inputFromCode() {
    // Clear any previous data
    clearBoard();

    // Fill grid with input data
    let i = 0;
    let cur;
    if (startCode) {
        // console.log(startCode);
        startCode.forEach(element => {
            cur = squares[i];
            cur.cellValue = element;
            if (element != 0) {
                cur.cellDisplay.innerText = element;
                cur.cellDisplay.style.color = "black";
                cur.entropy = 0;
                for (let j = 0; j < 9; j++) {
                    if (cur.possi[j] != element) {
                        cur.possi[j] = 0;
                    }
                }
                solvedSquares++;
                entropyDisplay.innerHTML = " " + (81 - solvedSquares);
            }
            i++;
        });
    }
}

function checkSquare(curSquare, square, recurse) {
    if (curSquare.entropy != 0 && curSquare.entropy != 1) {
        for (let p = 0; p < 9; p++) {
            if (square.possi[p] && curSquare.possi[p]) {
                curSquare.possi[p] = 0;
                curSquare.entropy--;
    
                // Temp display entropy
                curSquare.cellDisplay.innerText = curSquare.entropy;
                curSquare.cellDisplay.style.color = "red";
    
                if (curSquare.entropy == 1) {
                    curSquare.cellDisplay.onclick = function(){userInitiateOne(curSquare)};
                    curSquare.cellDisplay.style.backgroundColor = "green";
                }
    
                if (curSquare.entropy != 1) {
                    curSquare.cellDisplay.onclick = function() {userChoosing(curSquare)};
                }
    
                if (recurse && curSquare.entropy == 1) {
                    solveOne(curSquare, true);
                }
    
                if (recurse && curSquare.entropy == 2) {
                    solvePairs(curSquare, true);
                }
            }
        }
    }
}

function calcInitialEntropy() {
    squares.forEach(square => {
        if (square.entropy == 0) {

            // Rows
            let i = calcRowStart(square.id+1)-1;
            let end_i = i + 9;
            while (i < end_i) {
                checkSquare(squares[i], square, false);
                i++;
            }

            // Columns
            let j = calcColumnStart(square.id+1)-1;
            let end_j = j + 73;
            while (j < end_j) {
                checkSquare(squares[j], square, false);
                j += 9;
            }

            // SubSquares
            let k = calcSubSquareStart(square.id+1)-1;
            let end_k = k + 21;
            while (k < end_k) {
                checkSquare(squares[k], square, false);
                if ((k+1)%3 == 0) {
                    k += 7;
                } else {
                    k++;
                }
            }
        }
    });
}

function solve() {
    // console.log("Solve Running");
    let searchEntropy = 2;
    let origin = 0;
    let position = 0;
    let curSquare = squares[position];
    
    while (searchEntropy < 3 && solvedSquares < 81) {
            do {
                // console.log(curSquare.entropy + " " + origin);
                if (curSquare.entropy == searchEntropy) {
                    //Test curSquare forEach possibility
                        //Remove failures
                    for (let i = 0; i < curSquare.entropy; i++) {

                    }
                    // curSquare.entropy = 10;
                    // curSquare.cellDisplay.innerText = curSquare.entropy;
                    origin = position;
                }
                
                position = (position+1) % 81;
                curSquare = squares[position];
            } while (position != origin);
        searchEntropy++;
    }
}

// Temporary Test Function
function solveOneRecursive() {
    if (solvedSquares == 81) {
        return;
    }

    calcInitialEntropy();
    squares.forEach(square => {
        if (square.entropy == 1) {
            solveOne(square, true);
        }
        if (square.entropy == 2) {
            solvePairs(square, true);
        }
    });
}

function solveOne(square, recurse) {
    if (square.entropy != 1 || solvedSquares == 81) {
        return;
    }

    if (square.cellValue == 0) {
        let c = 0;
        while (!square.possi[c]) {
            c++;
        }
        square.cellValue = square.possi[c];
        square.cellDisplay.innerText = square.cellValue;
        square.cellDisplay.style.color = "black";
        square.entropy = 0;
        square.cellDisplay.onclick = null;
        square.cellDisplay.style.backgroundColor = null;
        solvedSquares++;
        entropyDisplay.innerHTML = " " + (81 - solvedSquares);
    }

    // Rows
    let i = calcRowStart(square.id+1)-1;
    let end_i = i + 9;
    while (i < end_i) {
        checkSquare(squares[i], square, recurse);
        i++;
    }

    // Columns
    let j = calcColumnStart(square.id+1)-1;
    let end_j = j + 73;
    while (j < end_j) {
        checkSquare(squares[j], square, recurse);
        j += 9;
    }

    // SubSquares
    let k = calcSubSquareStart(square.id+1)-1;
    let end_k = k + 21;
    while (k < end_k) {
        checkSquare(squares[k], square, recurse);
        if ((k+1)%3 == 0) {
            k += 7;
        } else {
            k++;
        }
    }
}

function solvePairs(square, recurse) {
        // console.log("solvePairs " + square.possi);
        if (square.entropy != 2 || solvedSquares == 81) {
            return;
        }

        // Rows
        let i = calcRowStart(square.id+1)-1;
        let end_i = i + 9;
        while (i < end_i) {
            if (squares[i].id != square.id && squares[i].possi.toString() == square.possi.toString()) {
                // console.log(squares[i].id + ", " + square.id + ", " + square.possi);
                let p = calcRowStart(square.id+1)-1;
                while (p < end_i) {
                    if (squares[p].id != squares[i].id && squares[p].id != square.id) {
                        checkSquare(squares[p], square, recurse);
                    }
                    p++;
                }
                break;
            }
            i++;
        }
    
        // Columns
        let j = calcColumnStart(square.id+1)-1;
        let end_j = j + 73;
        while (j < end_j) {
            if (squares[j].id != square.id && squares[j].possi.toString() == square.possi.toString()) {
                // console.log(squares[j].id + ", " + square.id + ", " + square.possi);
                let p = calcColumnStart(square.id+1)-1;
                while (p < end_j) {
                    if (squares[p].id != squares[j].id && squares[p].id != square.id) {
                        checkSquare(squares[p], square, recurse);
                    }
                    p += 9;
                }
                break;
            }
            j += 9;
        }
    
        // SubSquares
        let k = calcSubSquareStart(square.id+1)-1;
        let end_k = k + 21;
        while (k < end_k) {
            if (squares[k].id != square.id && squares[k].possi.toString() == square.possi.toString()) {
                // console.log(squares[k].id + ", " + square.id + ", " + square.possi);
                let p = calcSubSquareStart(square.id+1)-1;
                while (p < end_k) {
                    if (squares[p].id != squares[k].id && squares[p].id != square.id) {
                        checkSquare(squares[p], square, recurse);
                    }
                    if ((p+1)%3 == 0) {
                        p += 7;
                    } else {
                        p++;
                    }
                }
                break;
            }
            if ((k+1)%3 == 0) {
                k += 7;
            } else {
                k++;
            }
        }
}

function calcRowStart(value) {
    if (value%9) {
        return value - (value%9) + 1;
    } else {
        return value - 9 + 1;
    }
}

function calcColumnStart(value) {
    if (value%9) {
        return value % 9;
    } else {
        return 9;
    }
}

function calcSubSquareStart(value) {
    let subCol;
    if (value%3) {
        subCol = (value % 3) - 1;
    } else {
        subCol = 2;
    }

    let subRow = (Math.ceil(value/9)-1) % 3;
    // return subCol;
    // return subRow;

    return value - (subRow*9) - subCol;
}

function updateDisplayData(square) {
    // square = squares[0];

    let displayValues = document.getElementById("displayValues");
    // displayValues.style.visibility = "visible";
    displayValues.style.opacity = 1;

    let possi = [];
    let i = 0;

    square.possi.forEach(element => {
        if (element) {
           possi.push(element); 
        }
    });

    displayValues.innerHTML = ('<h1>Grid Position: <span style="font-weight: normal; ">' + square.id + '</span></h1> <h1>Cell Display: <span style="font-weight: normal;">' + square.cellValue + '</span></h1> <h1>Entropy: <span style="font-weight: normal;">' + square.entropy + '</span></h1> <h1>Id: <span style="font-weight: normal;">' + square.id + '</span></h1> <h1>Possibilities: <span style="font-weight: normal; display: block;";>' + possi + '</span></h1>');
}

function clearBoard() {
    solvedSquares = 0;
    entropyDisplay.innerHTML = " " + (81 - solvedSquares);
    squares.forEach(square => {
        square.cellValue = 0;
        square.cellDisplay.innerText = "";
        square.entropy = 9;
        square.possi = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        square.cellDisplay.onclick = null;
        square.cellDisplay.style.backgroundColor = null;
    });
}

// Test/Partial Implementation
function userInitiateOne(square) {
    solveOne(square, false);
}

function userChoosing(square) {
    const buttons = document.getElementById("options");
    while (buttons.hasChildNodes()) {
        buttons.removeChild(buttons.firstChild);
    }

    square.possi.forEach(element => {
        if (element != 0) {
            let button = document.createElement("BUTTON");
            button.innerText = element;
            button.onclick = function() {userChose(square, element, buttons)}
            buttons.appendChild(button);
        }
    });
}

function userChose(square, element) {
    console.log("Hello");
    square.cellValue = element;
    square.entropy = 1;
    // square.possi.forEach(val => {
    //     if (element != val) {
    //         val = 0;
    //     }
    // });
    for (let i = 0; i < square.possi.length; i++) {
        if (element != square.possi[i]) {
            square.possi[i] = 0;
        }
    }
    square.cellDisplay.innerText = element;
    square.cellDisplay.style.color = "black";
    square.cellDisplay.style.backgroundColor = null;
    solvedSquares++;
    entropyDisplay.innerHTML = " " + (81 - solvedSquares);
    square.cellDisplay.onclick = null;

    const buttons = document.getElementById("options");
    while (buttons.hasChildNodes()) {
        buttons.removeChild(buttons.firstChild);
    }

    solveOne(square, true);
}

function checkFullErrors() {
    // checkErrors(squares[3], false);
    // checkErrors(squares[24], true);
    squares.forEach(square => {
        console.log("Error check returned: " + checkErrors(square, true));
    });
}

function checkErrors(square, displayErrors) {
    // displayErrors: boolean
    //  Token value used to display all falures if requested
    //  Otherwise function returns failure on first instance.
    let foundError = false;

    // Rows
    let i = calcRowStart(square.id+1)-1;
    let end_i = i + 9;
    while (i < end_i) {
        // console.log(square.id);
        if (squares[i].id != square.id && squares[i].cellValue == square.cellValue && squares[i].cellValue != 0) {
            console.log("Rows:");
            console.log(squares[i].id + ", " + square.id);
            if (displayErrors) {
                square.cellDisplay.style.backgroundColor = "red";
                squares[i].cellDisplay.style.backgroundColor = "red";
                foundError = true;
            } else {
                return true;
            }
        }
        i++;
    }

    // Columns
    let j = calcColumnStart(square.id+1)-1;
    let end_j = j + 73;
    while (j < end_j) {
        if (squares[j].id != square.id && squares[j].cellValue == square.cellValue && squares[j].cellValue != 0) {
            console.log("Columns:");
            console.log(squares[j].id + ", " + square.id);
            if (displayErrors) {
                square.cellDisplay.style.backgroundColor = "red";
                squares[j].cellDisplay.style.backgroundColor = "red";
                foundError = true;
            } else {
                return true;
            }
        }
        j += 9;
    }

    // SubSquares
    let k = calcSubSquareStart(square.id+1)-1;
    let end_k = k + 21;
    while (k < end_k) {
        if (squares[k].id != square.id && squares[k].cellValue == square.cellValue && squares[k].cellValue != 0) {
            console.log("Squares:");
            console.log(squares[k].id + ", " + square.id);
            if (displayErrors) {
                square.cellDisplay.style.backgroundColor = "red";
                squares[k].cellDisplay.style.backgroundColor = "red";
                foundError = true;
            } else {
                return true;
            }
        }
        if ((k+1)%3 == 0) {
            k += 7;
        } else {
            k++;
        }
    }

    return foundError;

}
// let cellDisplay = document.createElement("div");
// let possibilities = [1, 2, 3, 4, 5, 6, 7, 8, 9];
// let cell = {
//     cellDisplay : cellDisplay,
//     id : total,
//     cellValue : 0,
//     entropy : 9,
//     possi : possibilities
// };