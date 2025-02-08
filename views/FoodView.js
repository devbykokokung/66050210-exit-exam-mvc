import {
    getFoodStore,
    getFoodCheck
} from './../controllers/FoodController.js';

function displayFoodStore() { // ฟังก์ชันสำหรับการแสดงข้อมูลอาหาร
    const data = getFoodStore(); // รับ Database จาก Controller
    const table = document.getElementById('table_food_store');

    table.innerHTML = '';

    data.forEach(item => {
        // แสดงข้อมูลอาหาร
        const row = document.createElement('tr');
        Object.values(item).forEach(value => {
            const cell = document.createElement('td');
            cell.textContent = value;
            row.appendChild(cell);
        });
        table.appendChild(row);
    });
}

function displayFoodCheck(type) { // ฟังก์ชันสำหรับการแสดงข้อมูลการตรวจสอบอาหาร
    const data = getFoodCheck(type); // รับ Database จาก Controller
    const table = document.getElementById('table_food_check');

    table.innerHTML = '';

    let expiredCount = 0;
    let okCount = 0;

    data.forEach(item => {
        // แสดงข้อมูลอาหารที่ตรวจสอบแล้ว
        const row = document.createElement('tr');
        Object.values(item).forEach(value => {
            const cell = document.createElement('td');
            cell.textContent = value;
            row.appendChild(cell);
        });
        table.appendChild(row);

        // นับจำนวนอาหารที่หมดอายุและยังใช้ได้
        if (item.food_status === 'EXPIRED') {
            expiredCount++;
        }
        if (item.food_status === 'OK') {
            okCount++;
        }
    });

    const report = document.getElementById('food_report');

    report.innerHTML = '';

    const reportParagraph = document.createElement('p');
    reportParagraph.innerText = `รายงานการตรวจสอบอาหารประเภท ${type}`;
    report.appendChild(reportParagraph);

    const expiredText = document.createElement('p');
    expiredText.innerText = `จำนวนอาหารหมดอายุ: ${expiredCount}`;
    report.appendChild(expiredText);

    const okText = document.createElement('p');
    okText.innerText = `จำนวนอาหารที่ยังใช้ได้: ${okCount}`;
    report.appendChild(okText);
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
    displayFoodCheck,
    onLoad
}