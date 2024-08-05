// Selecting the game board element
const gameBoard = document.querySelector("#gameboard");
const width = 8; // Width of the board (8x8)

// Array of starting pieces (64 pieces total)
const startPieces = [
    rook, knight, bishop, queen, king, bishop, knight, rook,
    pawn, pawn, pawn, pawn, pawn, pawn, pawn, pawn,
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    pawn, pawn, pawn, pawn, pawn, pawn, pawn, pawn,
    rook, knight, bishop, queen, king, bishop, knight, rook,
];

// Function to create and display the chessboard
function createBoard() {
    startPieces.forEach((piece, index) => {
        const square = document.createElement('div');
        square.classList.add('square');
        square.innerHTML = piece;
        square.firstChild?.setAttribute('draggable', true);
        square.setAttribute('square-id', index);

        // Determine the row and color
        const row = Math.floor(index / width);
        const isEvenRow = row % 2 === 0;
        const isEvenIndex = index % 2 === 0;

        // Set the square color based on its position
        square.classList.add(isEvenRow ? (isEvenIndex ? 'cream' : 'gray') : (isEvenIndex ? 'gray' : 'cream'));

        // Add piece color based on row
        if (piece && index <= 15) {
            // First two rows (black pieces)
            square.querySelectorAll('svg').forEach(svg => svg.classList.add('black'));
        } else if (piece && index >= 48) {
            // Last two rows (white pieces)
            square.querySelectorAll('svg').forEach(svg => svg.classList.add('white'));
        }

        // Append the square to the game board
        gameBoard.append(square);
    });
}

// Create the chessboard
createBoard();

// Add event listeners to all squares
const allSquares = document.querySelectorAll(".square");

allSquares.forEach(square => {
    square.addEventListener('dragstart', dragStart);
    square.addEventListener('dragover', dragOver);
    square.addEventListener('drop', dragDrop);
    square.addEventListener('dragend', dragEnd);
});

// Variables to keep track of drag state
let startPositionId;
let draggedElement;

// Function to handle the drag start event
function dragStart(event) {
    startPositionId = event.target.parentNode.getAttribute('square-id');
    draggedElement = event.target;
    draggedElement.classList.add('dragging'); // Add class for z-index
}

// Function to handle the drag over event
function dragOver(event) {
    event.preventDefault(); // Necessary to allow dropping
}

// Function to handle the drop event
function dragDrop(event) {
    event.stopPropagation();
    event.target.append(draggedElement); // Move the dragged element
}

// Function to handle the drag end event
function dragEnd(event) {
    draggedElement.classList.remove('dragging'); // Remove class after drag ends
}
