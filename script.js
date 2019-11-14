const mheader = document.querySelector('#m-header');
const mbody = document.querySelector('#m-body');
// Global variable to store de id's of the rows.
// This is how i get te values on the inputs to create
// the logic matrix on the localstorage
var idElements = [];

$(document).ready(function() {
  createTable();
});

// ==============HTML TABLE MATRIX==============//

// Create HTML table
function createTable() {
  var matrix = getMatrix();
  cleanTable();

  var rowsH = '<th scope="col">#</th>';
  var rowsB = '';
  idElements = [];
  matrix.forEach((row, i) => {
    var idRows = [];
    rowsH += `<th scope="col">${i}</th>`;
    rowsB += `<tr>\n
      <th scope="row">${i}</th>\n`;
    row.forEach((column, j) => {
      rowsB += `<td><input type="number" class="form-control w-100" id="element${i}-${j}" value="${column}"></td>\n`;
      idRows.push(`element${i}-${j}`);
    });
    idElements.push(idRows);
    rowsB += `</tr>`;
  });
  mheader.innerHTML = rowsH;
  mbody.innerHTML = rowsB;
}

// Reset HTML table
function cleanTable() {
  mheader.innerHTML = '';
  mbody.innerHTML = '';
}

// ==============LOCALSTORAGE LOGIC MATRIX==============//

// Increase matrix on localStorage
function increaseMatrix() {
  storeMatrix();
  var matrix = getMatrix().map(row => {
    row.push('1');
    return row;
  });
  matrix.push(new Array(matrix.length + 1).fill('1'));
  localStorage.setItem('matrix', JSON.stringify(matrix));
  createTable();
}

// Decrease matrix on localStorage
function decreaseMatrix() {
  storeMatrix();
  var storedMatrix = getMatrix();
  // Minimun size is 1x1
  if (storedMatrix.length == 1) return;
  var matrix = storedMatrix.map(row => {
    row.pop();
    return row;
  });
  matrix.pop();
  localStorage.setItem('matrix', JSON.stringify(matrix));
  createTable();
}

// Store matrix on localSorage
function storeMatrix() {
  var matrix = idElements.map(row => {
    var temp = row.map(element => {
      var val = document.querySelector(`#${element}`).value;
      return val;
    });
    return temp;
  });
  localStorage.setItem('matrix', JSON.stringify(matrix));
}

// Get matrix from localStorage
function getMatrix() {
  var matrix = !!localStorage.getItem('matrix')
    ? JSON.parse(localStorage.getItem('matrix'))
    : [[1, 1], [1, 1]];
  return matrix;
}
