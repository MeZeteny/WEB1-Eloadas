// Alap MenuItem osztály
class MenuItem {
    constructor(name, price, category) {
        this.name = name;
        this.price = price;
        this.category = category;
    }

    // Metódus az elem megjelenítéséhez
    display() {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'menu-item';
        itemDiv.innerHTML = `
            <h3>${this.name}</h3>
            <p>Ár: ${this.price} Ft</p>
            <p>Kategória: ${this.category}</p>
        `;
        document.body.appendChild(itemDiv);
        return itemDiv;
    }

    // Árváltoztatás metódusa
    updatePrice(newPrice) {
        this.price = newPrice;
        return `Az új ár: ${this.price} Ft`;
    }
}

// Food osztály, amely a MenuItem-ből származik
class Food extends MenuItem {
    constructor(name, price, category, isVegetarian) {
        super(name, price, category);
        this.isVegetarian = isVegetarian;
    }

    // Felülírjuk a display metódust
    display() {
        const itemDiv = super.display();
        const vegInfo = document.createElement('p');
        vegInfo.textContent = `Vegetáriánus: ${this.isVegetarian ? 'Igen' : 'Nem'}`;
        vegInfo.style.color = this.isVegetarian ? 'green' : 'red';
        itemDiv.appendChild(vegInfo);
        return itemDiv;
    }

    // Új metódus csak az ételhez
    toggleVegetarian() {
        this.isVegetarian = !this.isVegetarian;
        return `Vegetáriánus státusz: ${this.isVegetarian ? 'Igen' : 'Nem'}`;
    }
}

// Drink osztály, amely a MenuItem-ből származik
class Drink extends MenuItem {
    constructor(name, price, category, isAlcoholic) {
        super(name, price, category);
        this.isAlcoholic = isAlcoholic;
    }

    // Felülírjuk a display metódust
    display() {
        const itemDiv = super.display();
        const alcoholInfo = document.createElement('p');
        alcoholInfo.textContent = `Alkoholos: ${this.isAlcoholic ? 'Igen' : 'Nem'}`;
        alcoholInfo.style.color = this.isAlcoholic ? 'red' : 'green';
        itemDiv.appendChild(alcoholInfo);
        return itemDiv;
    }

    // Új metódus csak az italhoz
    toggleAlcohol() {
        this.isAlcoholic = !this.isAlcoholic;
        return `Alkoholos státusz: ${this.isAlcoholic ? 'Igen' : 'Nem'}`;
    }
}

// MenuManager osztály a menü kezeléséhez
class MenuManager {
    constructor() {
        this.menuItems = [];
    }

    // Elem hozzáadása
    addItem(item) {
        this.menuItems.push(item);
        return `${item.name} hozzáadva a menühöz.`;
    }

    // Összes elem megjelenítése
    displayAll() {
        document.body.innerHTML = '<h1>Éttermi Menü</h1>';
        this.menuItems.forEach(item => item.display());
    }

    // Elem keresése név alapján
    findItemByName(name) {
        return this.menuItems.find(item => item.name.toLowerCase() === name.toLowerCase());
    }
}