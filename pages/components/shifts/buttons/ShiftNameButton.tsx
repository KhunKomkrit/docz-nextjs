import { Button } from 'antd'

import React from 'react';

interface Props {
    /** demo */
    colorCode: string,
    isCheckBox: boolean,
    isLock: boolean,
    valueCheckBox: boolean,
    labelShort: string
}

/**
 * ปุ่ม ShiftNameButton ใช้สำหรับแสดงปุ่มกะงาน พร้อมตัวเลือก checkbox
 * 
 * @param {string} colorCode - รหัสสีของปุ่ม
 * @param {boolean} isCheckBox - แสดง CheckBox หรือไม่
 * @param {boolean} isLock - ล็อกปุ่มหรือไม่
 * @param {boolean} valueCheckBox - ค่าของ CheckBox
 * @param {string} labelShort - ชื่อย่อของปุ่ม
 */
const ShiftNameButton: React.FC<Props> = ({
    colorCode = '#0DAA17',
    isCheckBox = true,
    isLock = true,
    valueCheckBox = true,
    labelShort = 'SH0'
}) => {
    return (
        <Button color="primary" variant="solid" block>
            {labelShort}
        </Button>
    )
}

export default ShiftNameButton