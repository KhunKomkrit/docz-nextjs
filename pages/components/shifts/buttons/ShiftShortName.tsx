import { LockFilled } from '@ant-design/icons';
import { Card, Checkbox, Flex, Space } from 'antd'
import styled from 'styled-components';

import React from 'react';

interface Props {
    colorCode: string,
    isCheckBox: boolean,
    isLock: boolean,
    valueCheckBox: boolean,
    labelShort: string,
    onCheckBox: Function
}

const CustomCard = styled(Card)`
  .ant-card-body {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
  }
`;

/**
 * ปุ่ม ShiftShortName ใช้สำหรับแสดงปุ่มกะงาน พร้อมตัวเลือก checkbox
 * 
 * @param {string} colorCode - รหัสสีของปุ่ม
 * @param {boolean} isCheckBox - แสดง CheckBox หรือไม่
 * @param {boolean} isLock - ล็อกปุ่มหรือไม่
 * @param {boolean} valueCheckBox - ค่าของ CheckBox
 * @param {string} labelShort - ชื่อย่อของปุ่ม
 * @param {string} onCheckBox - Function CallBack
 */
const ShiftShortName: React.FC<Props> = ({
    colorCode = '#0DAA17',
    isCheckBox = true,
    isLock = true,
    valueCheckBox = true,
    labelShort = 'SH0',
    onCheckBox
}) => {
    return (
        <CustomCard style={{
            width: "100%",
            backgroundColor: colorCode
        }} >
            <Flex justify="center" align="center" >
                <Flex vertical={true} style={{textAlign: "center"}}>
                    <Flex vertical={false}>
                        <Space>
                            {isLock && <span><LockFilled/></span>}
                            {isCheckBox && <Checkbox checked={valueCheckBox} onChange={(e) => onCheckBox(e)} />}
                        </Space>
                    </Flex>
                    <span>{labelShort}</span>
                </Flex>
            </Flex>
        </CustomCard>
    )
}

export default ShiftShortName
