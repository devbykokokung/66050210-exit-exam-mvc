import {
    getFoodStore,
    getFoodCheck
} from './../controllers/FoodController.js';

function displayFoodStore() {
    const data = getFoodStore(); // รับ Database จาก Controller
    const table = document.getElementById('table_food_store');

    table.innerHTML = '';

    data.forEach(item => {
        const row = document.createElement('tr');
        Object.values(item).forEach(value => {
            const cell = document.createElement('td');
            cell.textContent = value;
            row.appendChild(cell);
        });
        table.appendChild(row);
    });
}

function displayFoodCheck(type) {
    const data = getFoodCheck(type);
    const table = document.getElementById('table_food_check');

    table.innerHTML = '';

    data.forEach(item => {
        const row = document.createElement('tr');
        Object.values(item).forEach(value => {
            const cell = document.createElement('td');
            cell.textContent = value;
            row.appendChild(cell);
        });
        table.appendChild(row);
    });
}

function onLoad() {
    displayFoodStore();

    const food_type = document.getElementById('food_type');
    displayFoodCheck(food_type.value);
    food_type.addEventListener('change', (ev) => {
        ev.preventDefault();
        displayFoodCheck(ev.target.value);
    });
}

export {
    onLoad
}