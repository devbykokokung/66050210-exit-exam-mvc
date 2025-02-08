const foodTypes = ['อาหารสด', 'อาหารดอง', 'อาหารกระป๋อง']; // ประเภทของอาหารที่รองรับ

let table_foodStore = {
    // ข้อมูลของอาหารที่เก็บใน store
    "id": [
        "177145", "440807", "166701", "147797", "657816", "873504", "947674", "766015", "541017", "125277", "303117", "881666", "183465", "850088", "679653", "926995", "955466", "883027", "925286", "287366", "899014", "987322", "550284", "622549", "735067", "118068", "952384", "129618", "294131", "867128", "339929", "754022", "168027", "113072", "707033", "219469", "446020", "587738", "560377", "245350", "689806", "357350", "442980", "794931", "896003", "311380", "622714", "601860", "196490", "575857"
    ],
    "food_type": [
        "อาหารสด", "อาหารดอง", "อาหารสด", "อาหารสด", "อาหารดอง", "อาหารดอง", "อาหารสด", "อาหารกระป๋อง", "อาหารกระป๋อง", "อาหารดอง", "อาหารดอง", "อาหารกระป๋อง", "อาหารสด", "อาหารดอง", "อาหารดอง", "อาหารกระป๋อง", "อาหารกระป๋อง", "อาหารดอง", "อาหารสด", "อาหารกระป๋อง", "อาหารดอง", "อาหารกระป๋อง", "อาหารกระป๋อง", "อาหารกระป๋อง", "อาหารดอง", "อาหารกระป๋อง", "อาหารสด", "อาหารกระป๋อง", "อาหารสด", "อาหารสด", "อาหารสด", "อาหารกระป๋อง", "อาหารสด", "อาหารดอง", "อาหารกระป๋อง", "อาหารดอง", "อาหารกระป๋อง", "อาหารสด", "อาหารกระป๋อง", "อาหารกระป๋อง", "อาหารสด", "อาหารดอง", "อาหารกระป๋อง", "อาหารดอง", "อาหารสด", "อาหารกระป๋อง", "อาหารกระป๋อง", "อาหารดอง", "อาหารกระป๋อง", "อาหารสด"
    ],
    "expires_date": [
        "2016-06-23", "2020-12-25", "2025-01-29", "2015-05-23", "2019-12-01", "2030-01-10", "2027-05-10", "2019-12-30", "2020-02-09", "2023-03-22", "2022-06-26", "2026-08-24", "2016-02-17", "2029-03-13", "2019-05-29", "2016-12-02", "2017-02-26", "2020-05-30", "2023-09-15", "2020-01-16", "2017-05-26", "2027-10-08", "2025-11-22", "2022-05-26", "2025-02-15", "2018-11-10", "2018-10-24", "2026-06-12", "2027-12-12", "2025-04-13", "2016-08-26", "2016-08-19", "2019-09-30", "2026-11-22", "2018-08-21", "2018-11-14", "2022-07-04", "2021-09-14", "2020-04-08", "2018-03-27", "2024-10-16", "2030-06-03", "2024-11-02", "2028-11-11", "2017-04-30", "2024-09-08", "2029-12-20", "2021-01-24", "2024-04-08", "2015-08-24"
    ]
}

let table_foodCheck = {
    // ข้อมูลการตรวจสอบอาหาร
    "transaction_id": [],
    "food_id": [],
    "food_type": [],
    "expires_date": [],
    "food_status": [],
    "checked_date": []
}

function foodStore() {
    return {
        select: (id) => {
            // เลือกข้อมูลอาหารตาม id
            const index = table_foodStore.id.indexOf(id);
            if (index === -1) {
                return null;
            }

            return {
                id: table_foodStore.id[index],
                food_type: table_foodStore.food_type[index],
                expires_date: table_foodStore.expires_date[index]
            };
        },
        selectAll: () => {
            // เลือกข้อมูลอาหารทั้งหมด
            return table_foodStore.id.map((id, index) => ({
                id: id,
                food_type: table_foodStore.food_type[index],
                expires_date: table_foodStore.expires_date[index]
            }));
        }
    }
}

function foodCheck() {
    return {
        select: (id) => {
            // เลือกข้อมูลการตรวจสอบอาหารตาม transaction_id
            const index = table_foodCheck.transaction_id.indexOf(id);
            if (index === -1) {
                return null;
            }

            return {
                transaction_id: table_foodCheck.transaction_id[index],
                food_id: table_foodCheck.food_id[index],
                food_type: table_foodCheck.food_type[index],
                expires_date: table_foodCheck.expires_date[index],
                food_status: table_foodCheck.food_status[index],
                checked_date: table_foodCheck.checked_date[index]
            };
        },
        selectByType: (type) => {
            // เลือกข้อมูลการตรวจสอบอาหารตามประเภท
            console.log(table_foodCheck);

            return table_foodCheck.transaction_id.map((id, index) => ({
                transaction_id: id,
                food_id: table_foodCheck.food_id[index],
                food_type: table_foodCheck.food_type[index],
                expires_date: table_foodCheck.expires_date[index],
                food_status: table_foodCheck.food_status[index],
                checked_date: table_foodCheck.checked_date[index]
            })).filter(item => item.food_type === type);
        },
        selectAll: () => {
            // เลือกข้อมูลการตรวจสอบอาหารทั้งหมด
            return table_foodCheck.transaction_id.map((id, index) => ({
                transaction_id: id,
                food_id: table_foodCheck.food_id[index],
                expires_date: table_foodCheck.expires_date[index],
                food_status: table_foodCheck.food_status[index],
                checked_date: table_foodCheck.checked_date[index]
            }));
        },
        insert: ({
            id: food_id,
            food_type,
            expires_date,
            food_status,
            checked_date
        }) => {
            // เพิ่มข้อมูลการตรวจสอบอาหาร
            console.log(food_id, food_type, expires_date, food_status, checked_date);
            console.log(typeof food_id, typeof food_type, typeof expires_date, typeof food_status, typeof checked_date);

            // ตรวจสอบประเภทข้อมูล
            if (typeof food_id !== 'string' || typeof food_type !== 'string' || typeof expires_date !== 'string' || typeof food_status !== 'string' || typeof checked_date !== 'string') {
                console.log("ไม่สามารถ Insert ได้");
                return false;
            }

            // ตรวจสอบประเภทอาหาร
            if (!foodTypes.includes(food_type)) {
                console.log("ไม่สามารถ Insert ได้");
                return false;
            }

            // ตรวจสอบว่ามีอาหารใน store หรือไม่
            if (!foodStore().select(food_id)) {
                console.log("ไม่สามารถ Insert ได้");
                return false;
            }

            console.log("กำลัง Insert");

            console.log(table_foodCheck.transaction_id);

            // เพิ่มข้อมูลการตรวจสอบอาหาร
            table_foodCheck.transaction_id.push(Number(table_foodCheck.transaction_id.length) + 1);
            table_foodCheck.food_id.push(food_id || null);
            table_foodCheck.food_type.push(food_type || null);
            table_foodCheck.expires_date.push(expires_date || null);
            table_foodCheck.food_status.push(food_status || null);
            table_foodCheck.checked_date.push(checked_date || null);
        },
    }
}

export {
    foodStore,
    foodCheck,
}