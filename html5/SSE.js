const colorPicker = document.getElementById('colorPicker');
const colorDisplay = document.getElementById('colorDisplay');
const statusDisplay = document.getElementById('status');

// Szimulált SSE forrás
function simulateSSE() {
    statusDisplay.textContent = "Kapcsolódva szimulált SSE szerverhez";

    // Szimuláljuk az SSE kapcsolatot
    setInterval(() => {
        // Véletlenszerű szín generálása
        const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);

        // Az EventSource "message" eseményének szimulálása
        const event = { data: JSON.stringify({ color: randomColor }) };
        handleSSEMessage(event);
    }, 10000);
    
}

// SSE üzenet kezelése
function handleSSEMessage(event) {
    try {
        const data = JSON.parse(event.data);
        if (data.color) {
            colorDisplay.style.backgroundColor = data.color;
            colorPicker.value = data.color;
            statusDisplay.textContent = `Utolsó frissítés: ${new Date().toLocaleTimeString()}`;
        }
    } catch (e) {
        console.error("Hiba az üzenet feldolgozásában:", e);
    }
}

// Színváltoztató eseménykezelő (csak lokálisan változtat)
colorPicker.addEventListener('input', () => {
    const color = colorPicker.value;
    colorDisplay.style.backgroundColor = color;
    statusDisplay.textContent = `Helyi színváltoztatás: ${color}`;
});

// Szimulált SSE indítása
simulateSSE();