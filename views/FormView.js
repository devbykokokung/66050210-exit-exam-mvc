import { validateFood } from "./../controllers/FormController.js"
import { foodChecker } from "./../controllers/FoodController.js"

function FormSubmit(ev) {
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

    form.reset();
}

function onLoad() {
    const form = document.getElementById('form_food');
    form.addEventListener('submit', FormSubmit);
}

export {
    onLoad
}