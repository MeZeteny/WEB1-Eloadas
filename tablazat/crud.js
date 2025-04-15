const form = document.getElementById('crud-form');
const tableBody = document.querySelector('#crud-table tbody');
const searchInput = document.getElementById('search');
let rows = [];

    form.addEventListener('submit', e => {
        e.preventDefault();
        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const phone = form.phone.value.trim();
        const city = form.city.value.trim();

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const newRow = { name, email, phone, city };
        rows.push(newRow);
        renderTable();
        form.reset();
    });

    function renderTable() {
        const filtered = rows.filter(row => {
            const term = searchInput.value.toLowerCase();
            return Object.values(row).some(value =>
                value.toLowerCase().includes(term)
            );
        });
        tableBody.innerHTML = filtered.map((row, index) => `
            <tr>
                <td>${row.name}</td>
                <td>${row.email}</td>
                <td>${row.phone}</td>
                <td>${row.city}</td>
                <td>
                    <button onclick="editRow(${index})">Szerkesztés</button>
                    <button onclick="deleteRow(${index})">Törlés</button>
                </td>
            </tr>
        `).join('');
    }

        function deleteRow(index) {
            rows.splice(index, 1);
            renderTable();
        }

        function editRow(index) {
            const row = rows[index];
            form.name.value = row.name;
            form.email.value = row.email;
            form.phone.value = row.phone;
            form.city.value = row.city;
            deleteRow(index);
        }

        searchInput.addEventListener('input', renderTable);

        document.querySelectorAll('#crud-table th[data-column]').forEach(th => {
            th.addEventListener('click', () => {
                const column = th.dataset.column;
                rows.sort((a, b) => a[column].localeCompare(b[column]));
                renderTable();
            });
        });