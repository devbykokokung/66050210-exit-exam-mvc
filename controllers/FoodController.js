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
    return foodStore().selectAll(); // ดึงข้อมูลอาหารทั้งหมดจาก foodStore
}

function getFoodCheck(type) {
    return foodCheck().selectByType(type); // ดึงข้อมูลการตรวจสอบอาหารตามประเภท
}

function foodChecker(id) {
    const food = foodStore().select(id); // ดึงข้อมูลอาหารตาม id

    if (!food) {
        return {
            success: false,
            error_message: 'Food not found', // ถ้าไม่พบอาหาร ให้ส่งข้อความแสดงข้อผิดพลาด
        };
    }

    let result;
    console.log(food.food_type); // แสดงประเภทของอาหารใน console
    
    switch (food.food_type) {
        case 'อาหารสด':
            result = FreshFoodChecker(food); // ตรวจสอบอาหารสด
            break;
        case 'อาหารดอง':
            result = PickledFoodChecker(food); // ตรวจสอบอาหารดอง
            break;
        case 'อาหารกระป๋อง':
            result = CannedFoodChecker(food); // ตรวจสอบอาหารกระป๋อง
            break;
        default:
            return {
                success: false,
                error_message: 'Invalid food type', // ถ้าประเภทอาหารไม่ถูกต้อง ให้ส่งข้อความแสดงข้อผิดพลาด
            };
    }

    if (!result.success) {
        return result; // ถ้าผลการตรวจสอบไม่สำเร็จ ให้ส่งผลลัพธ์กลับ
    }

    foodCheck().insert({
        id: food.id,
        food_type: food.food_type,
        expires_date: food.expires_date,
        food_status: result.status,
        checked_date: new Date().toUTCString(), // บันทึกข้อมูลการตรวจสอบอาหาร
    });

    return {
        success: true, // ส่งผลลัพธ์ว่าการตรวจสอบสำเร็จ
    };
}

export {
    getFoodStore,
    foodChecker,
    getFoodCheck
}