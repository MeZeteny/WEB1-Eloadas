// MenuManager példányosítása
const menuManager = new MenuManager();

// Példa adatok hozzáadása
menuManager.addItem(new Food('Margherita Pizza', 2490, 'Pizza', true));
menuManager.addItem(new Food('Húsos Pizza', 2890, 'Pizza', false));
menuManager.addItem(new Drink('Cola', 590, 'Üdítő', false));
menuManager.addItem(new Drink('Sör', 890, 'Alkoholos ital', true));

// Gombok kezelése
document.getElementById('displayBtn').addEventListener('click', () => {
    menuManager.displayAll();
    addItemControls();
});

document.getElementById('addFoodBtn').addEventListener('click', () => {
    const name = prompt('Étel neve:');
    const price = parseInt(prompt('Ár (Ft):'));
    const category = prompt('Kategória:');
    const isVeg = confirm('Vegetáriánus?');
    
    if (name && !isNaN(price) && category) {
        const newFood = new Food(name, price, category, isVeg);
        alert(menuManager.addItem(newFood));
    } else {
        alert('Érvénytelen adatok!');
    }
});

document.getElementById('addDrinkBtn').addEventListener('click', () => {
    const name = prompt('Ital neve:');
    const price = parseInt(prompt('Ár (Ft):'));
    const category = prompt('Kategória:');
    const isAlc = confirm('Alkoholos?');
    
    if (name && !isNaN(price) && category) {
        const newDrink = new Drink(name, price, category, isAlc);
        alert(menuManager.addItem(newDrink));
    } else {
        alert('Érvénytelen adatok!');
    }
});

// Egyedi vezérlők hozzáadása minden menü elemhez
function addItemControls() {
    document.querySelectorAll('.menu-item').forEach(itemDiv => {
        const name = itemDiv.querySelector('h3').textContent;
        const item = menuManager.findItemByName(name);
        
        const controlsDiv = document.createElement('div');
        controlsDiv.className = 'item-controls';
        
        if (item instanceof Food) {
            const vegBtn = document.createElement('button');
            vegBtn.textContent = 'Vegetáriánus váltás';
            vegBtn.addEventListener('click', () => {
                alert(item.toggleVegetarian());
                menuManager.displayAll();
                addItemControls();
            });
            controlsDiv.appendChild(vegBtn);
        }
        
        if (item instanceof Drink) {
            const alcBtn = document.createElement('button');
            alcBtn.textContent = 'Alkoholos váltás';
            alcBtn.addEventListener('click', () => {
                alert(item.toggleAlcohol());
                menuManager.displayAll();
                addItemControls();
            });
            controlsDiv.appendChild(alcBtn);
        }
        
        const priceInput = document.createElement('input');
        priceInput.type = 'number';
        priceInput.placeholder = 'Új ár';
        priceInput.style.width = '80px';
        
        const priceBtn = document.createElement('button');
        priceBtn.textContent = 'Ár módosítása';
        priceBtn.addEventListener('click', () => {
            const newPrice = parseInt(priceInput.value);
            if (!isNaN(newPrice)) {
                alert(item.updatePrice(newPrice));
                menuManager.displayAll();
                addItemControls();
            }
        });
        
        controlsDiv.appendChild(priceInput);
        controlsDiv.appendChild(priceBtn);
        itemDiv.appendChild(controlsDiv);
    });
}