function foodIdValidator(foodId) {
    const result = {
        success: false,
        error_message: null,
    }

    const foodId_length = foodId.length;
    const regex = /^[1-9]\d{5}$/;

    // ตรวจสอบความยาวของ foodId ต้องเท่ากับ 6
    if (foodId_length !== 6) {
        result.error_message = 'Invalid length';
        return result;
    }

    // ตรวจสอบรูปแบบของ foodId ต้องตรงกับ regex ที่กำหนด
    if (!regex.test(foodId)) {
        result.error_message = 'Invalid format';
        return result;
    }

    result.success = true;
    return result;
}

function FreshFoodChecker(food) {
    const { food_type, expires_date } = food;

    // ตรวจสอบประเภทของอาหาร ต้องเป็น 'อาหารสด'
    if (food_type !== 'อาหารสด') {
        return {
            success: false,
            error_message: 'Invalid food type',
        };
    }

    const currentDate = new Date();
    const expireDate = new Date(expires_date);

    // ตรวจสอบวันหมดอายุ ถ้าวันหมดอายุน้อยกว่าหรือเท่ากับวันปัจจุบัน แสดงว่าอาหารหมดอายุแล้ว
    if (expireDate <= currentDate) {
        return {
            success: true,
            error_message: null,
            status: 'EXPIRED',
        };
    }

    return {
        success: true,
        error_message: null,
        status: 'OK',
    };
}

function PickledFoodChecker(food) {
    const { food_type, expires_date } = food;

    // ตรวจสอบประเภทของอาหาร ต้องเป็น 'อาหารดอง'
    if (food_type !== 'อาหารดอง') {
        return {
            success: false,
            error_message: 'Invalid food type',
        };
    }

    const currentDate = new Date();
    const expireDate = new Date(expires_date);

    // ตรวจสอบวันหมดอายุ ถ้าปีหรือเดือนของวันหมดอายุน้อยกว่าปีหรือเดือนของวันปัจจุบัน แสดงว่าอาหารหมดอายุแล้ว
    if (expireDate.getFullYear() < currentDate.getFullYear() ||
        (expireDate.getFullYear() === currentDate.getFullYear() && expireDate.getMonth() < currentDate.getMonth())) {
        return {
            success: true,
            error_message: null,
            status: 'EXPIRED',
        };
    }

    return {
        success: true,
        error_message: null,
        status: 'OK',
    };
}

function CannedFoodChecker(food) {
    const { food_type, expires_date } = food;

    // ตรวจสอบประเภทของอาหาร ต้องเป็น 'อาหารกระป๋อง'
    if (food_type !== 'อาหารกระป๋อง') {
        return {
            success: false,
            error_message: 'Invalid food type',
        };
    }

    const currentDate = new Date();
    const expireDate = new Date(expires_date);
    const exprieCalculated = new Date(`${expireDate.getFullYear() + 1}-9-31`);

    // ตรวจสอบวันหมดอายุ
    if (exprieCalculated <= currentDate) {
        return {
            success: true,
            error_message: null,
            status: 'EXPIRED',
        };
    }

    return {
        success: true,
        error_message: null,
        status: 'OK',
    };
}

export {
    foodIdValidator,
    FreshFoodChecker,
    PickledFoodChecker,
    CannedFoodChecker,
}