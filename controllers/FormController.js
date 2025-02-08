import {  foodIdValidator } from '../models/Food.js';

function validateFood(food) {
    const result = {
        success: false,
        error_message: null,
    }

    const validator = foodIdValidator(food);

    console.log(validator);
    

    if (!validator.success) {
        result.error_message = validator.error_message;
        return result;
    }

    result.success = true;

    return result
}

export {
    validateFood,
}