// public/js/script.js
document.addEventListener('DOMContentLoaded', () => {
    const uploadForm = document.querySelector('#upload-form');
    const tableContainer = document.querySelector('#table-container');
    const csvTable = document.querySelector('#csv-table');

    uploadForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(uploadForm);
        try {
            const response = await fetch('/csv/upload', {
                method: 'POST',
                body: formData,
            });
            if (!response.ok) {
                throw new Error('Upload failed.');
            }
            const data = await response.json();
            displayTable(data);
        } catch (error) {
            console.error(error);
        }
    });

    function displayTable(data) {
        // Clear existing table content
        csvTable.innerHTML = '';

        if (data.length === 0) {
            tableContainer.style.display = 'none';
            return;
        }

        // Create table headers dynamically from CSV columns
        const headers = Object.keys(data[0]);
        const headerRow = document.createElement('tr');
        headers.forEach((header) => {
            const th = document.createElement('th');
            th.textContent = header;
            headerRow.appendChild(th);
        });
        csvTable.appendChild(headerRow);

        // Create table rows
        data.forEach((row) => {
            const tr = document.createElement('tr');
            headers.forEach((header) => {
                const td = document.createElement('td');
                td.textContent = row[header];
                tr.appendChild(td);
            });
            csvTable.appendChild(tr);
        });

        tableContainer.style.display = 'block';
    }
});
