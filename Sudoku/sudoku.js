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

function submitted() {
    makeGrid();
    codeParser();
}

function makeGrid() {
    
    if (!gridActive) {
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
                        let cell = {
                            cellDisplay : cellDisplay,
                            id : total,
                            cellValue : 0,
                            entropy : 9
                        };
                        squares[total] = cell;
                        total++;
                        // cellDisplay.innerText = (total);
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
    squares.forEach(element => {
        element.cellValue = 0;
        element.cellDisplay.innerText = "";
        element.entropy = 9;
    });

    // Fill grid with input data
    let i = 0;
    let cur;
    if (startCode) {
        console.log(startCode);
        startCode.forEach(element => {
            cur = squares[i];
            cur.cellValue = element;
            if (element != 0) {
                cur.cellDisplay.innerText = element;
                cur.entropy = 1;
            }
            i++;
        });
    }
}