const spreadsheet = document.getElementById('spreadsheet');
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const addButton = document.getElementById('addButton');
const deleteButton = document.getElementById('deleteButton');
const saveButton = document.getElementById('saveButton');
const exportPdfButton = document.getElementById('exportPdfButton');

// Add event listener for search button
searchButton.addEventListener('click', searchItems);

// Add event listener for add button
addButton.addEventListener('click', addItem);

// Add event listener for delete button
deleteButton.addEventListener('click', deleteItem);

// Add event listener for save button
saveButton.addEventListener('click', saveData);

// Add event listener for export PDF button
exportPdfButton.addEventListener('click', exportPdf);

// Export PDF function
function exportPdf() {
  const doc = new jspdf.jsPDF();
  const tableElement = spreadsheet.cloneNode(true);

  // Remove empty row from the cloned table
  const emptyRow = tableElement.getElementsByClassName('empty-row')[0];
  if (emptyRow) {
    tableElement.removeChild(emptyRow);
  }

  // Add table to the PDF
  doc.html(tableElement, {
    callback: function(pdf) {
      // Save the PDF file to the user's desktop
      const fileName = 'spreadsheet_data.pdf';
      pdf.save(fileName);
    },
    x: 10,
    y: 10,
    html2canvas: {
      scale: 0.5
    }
  });
}

// Save data function
function saveData() {
  const data = [];
  const rows = spreadsheet.getElementsByTagName('tr');

  // Skip header row
  for (let i = 1; i < rows.length; i++) {
    const cells = rows[i].getElementsByTagName('td');
    const rowData = [];

    for (let j = 0; j < cells.length; j++) {
      rowData.push(cells[j].textContent);
    }

    data.push(rowData);
  }

  // Save data to localStorage
  localStorage.setItem('spreadsheetData', JSON.stringify(data));
  alert('Data saved successfully!');
}

// Search function
function searchItems() {
  const searchTerm = searchInput.value.toLowerCase();
  const rows = spreadsheet.getElementsByTagName('tr');

  for (let i = 1; i < rows.length; i++) {
    const cells = rows[i].getElementsByTagName('td');
    let shouldHide = true;

    for (let j = 0; j < cells.length; j++) {
      const cellValue = cells[j].textContent.toLowerCase();
      if (cellValue.includes(searchTerm)) {
        shouldHide = false;
        break;
      }
    }

    if (shouldHide) {
      rows[i].style.display = 'none';
    } else {
      rows[i].style.display = '';
    }
  }
}

// Add item function
function addItem() {
  const newRow = spreadsheet.insertRow(-1);
  const columnCount = spreadsheet.rows[0].cells.length;

  for (let i = 0; i < columnCount; i++) {
    const newCell = newRow.insertCell(i);
    newCell.contentEditable = true;
  }
}

// Delete item function
function deleteItem() {
  const rows = spreadsheet.getElementsByTagName('tr');
  const rowsToDelete = [];
  const tbody = spreadsheet.tBodies[0] || spreadsheet.createElement('tbody');

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    const checkbox = row.insertCell(0);
    const checkboxInput = document.createElement('input');
    checkboxInput.type = 'checkbox';
    checkbox.appendChild(checkboxInput);

    checkboxInput.addEventListener('change', function() {
      if (this.checked) {
        rowsToDelete.push(row);
      } else {
        const index = rowsToDelete.indexOf(row);
        if (index !== -1) {
          rowsToDelete.splice(index, 1);
        }
      }
    });
  }

  const confirmDelete = confirm('Are you sure you want to delete the selected items?');
  if (confirmDelete) {
    for (const row of rowsToDelete) {
      tbody.removeChild(row);
    }
  }
}