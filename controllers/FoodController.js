import {
    foodStore,
    foodCheck
} from '../models/Storage.js';

import {
    FreshFoodChecker,
    PickledFoodChecker,
    CannedFoodChecker,
} from "./../models/Food.js";

function getFoodStore() {
    return foodStore().selectAll();
}

function getFoodCheck(type) {
    return foodCheck().selectByType(type);
}

function foodChecker(id) {
    const food = foodStore().select(id);

    if (!food) {
        return {
            success: false,
            error_message: 'Food not found',
        };
    }

    let result;
    console.log(food.food_type);
    
    switch (food.food_type) {
        case 'อาหารสด':
            result = FreshFoodChecker(food);
            break;
        case 'อาหารดอง':
            result = PickledFoodChecker(food);
            break;
        case 'อาหารกระป๋อง':
            result = CannedFoodChecker(food);
            break;
        default:
            return {
                success: false,
                error_message: 'Invalid food type  0',
            };
    }

    if (!result.success) {
        return result;
    }

    foodCheck().insert({
        id: food.id,
        food_type: food.food_type,
        expires_date: food.expires_date,
        food_status: result.status,
        checked_date: new Date().toISOString(),
    });

    return {
        success: true,
    };
}

export {
    getFoodStore,
    foodChecker,
    getFoodCheck
}