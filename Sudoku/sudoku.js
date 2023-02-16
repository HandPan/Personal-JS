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

function makeGrid() {
    
    const sudokuGrid = document.getElementById("sudokuGrid");

    let total = 0;
    for (let i = 0; i < 9; i++) {
        let largeCell = document.createElement("div");
        sudokuGrid.appendChild(largeCell).className = "sub-grid-item";
    }
    // console.log(sudokuGrid);

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

    // for (let i = 0; i < 81; i++) {
    //     squares[i].cellValue = 5;
    // }

    // for (let i = 0; i < 81; i++) {
    //     let curSquare = squares[i];
    //     curSquare.cellDisplay.innerText = curSquare.cellValue;
    // }

    console.log(squares);

    document.getElementById("testButton").innerHTML = "It Worked!";
}
