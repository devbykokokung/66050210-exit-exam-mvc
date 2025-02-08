import { validateFood } from "./../controllers/FormController.js"
import { foodChecker } from "./../controllers/FoodController.js"
import { displayFoodCheck } from "./FoodView.js"

function FormSubmit(ev) { // ฟังก์ชันสำหรับการส่งฟอร์ม
    ev.preventDefault();
    const form = ev.target;
    const id = ev.target.form_food_id.value.trim();
    const error_element = document.getElementById('form_food_error');
    error_element.innerHTML = '';
    const result = validateFood(id);

    console.log(result);

    if (!result.success) {
        error_element.innerHTML = result.error_message;
        return;
    }

    const food = foodChecker(id);
    console.log(food);

    if (!food.success) {
        error_element.innerHTML = food.error_message;
        return;
    }

    error_element.innerHTML = "<p style='color :black;'>ตรวจสอบสำเร็จ</p>";

    form.reset();

    const food_type = document.getElementById('food_type');
    displayFoodCheck(food_type.value);
}

function onLoad() {
    const form = document.getElementById('form_food');
    form.addEventListener('submit', FormSubmit);
}

export {
    onLoad
}