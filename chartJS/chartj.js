// Várunk, amíg a teljes DOM betöltődik
document.addEventListener('DOMContentLoaded', function() {
    // Táblázat sorok kiválasztása
    const tableRows = document.querySelectorAll('#dataTable tbody tr');
    let selectedRow = null;
    
    // Ellenőrizzük, hogy a canvas elem létezik
    const canvas = document.getElementById('lineChart');
    if (!canvas) {
        console.error('Nem található a lineChart canvas elem!');
        return;
    }
    
    // Diagram inicializálása
    const ctx = canvas.getContext('2d');
    let lineChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Oszlop 1', 'Oszlop 2', 'Oszlop 3', 'Oszlop 4', 'Oszlop 5'],
            datasets: [{
                label: 'Válassz ki egy sort a táblázatból',
                data: [],
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
                fill: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    
    // Sorok eseménykezelői
    tableRows.forEach(row => {
        row.addEventListener('click', () => {
            if (selectedRow) {
                selectedRow.classList.remove('selected');
            }
            
            row.classList.add('selected');
            selectedRow = row;
            
            updateChart(row);
        });
    });
    
    // Diagram frissítése
    function updateChart(row) {
        const cells = row.querySelectorAll('td:not(:first-child)');
        const rowData = Array.from(cells).map(cell => parseInt(cell.textContent));
        const rowLabel = row.querySelector('td:first-child').textContent;
        
        lineChart.data.datasets[0].data = rowData;
        lineChart.data.datasets[0].label = rowLabel;
        lineChart.update();
    }
});