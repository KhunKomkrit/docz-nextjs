import {  Flex, Table } from "antd";
import ShiftShortName from "../buttons/ShiftShortName";
import { Key, useState, useMemo } from "react";
import { TableRowSelection } from "antd/es/table/interface";

interface Props {
    dataSource: Array<object>,
    onSelectChange?: (selectedRows: number[]) => void;
}

interface DataType {
    id: number;
    name: string,
    calendar: {shift_plans: []}[]
  }


const TableManageShift: React.FC<Props> = ({ dataSource, onSelectChange }) => {
    const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);
    const [selectedShifts, setSelectedShifts] = useState<{[key: string]: {[key: string]: boolean}}>({});

    const isRowSelected = useMemo(() => {
        const selectedSet = new Set(selectedRowKeys);
        return (recordId: number) => selectedSet.has(recordId);
    }, [selectedRowKeys]);

    const handleShiftCheckbox = (recordId: number, date: string, shiftCode: string, checked: boolean) => {
        const shiftKey = `${recordId}-${date}-${shiftCode}`;
        setSelectedShifts(prev => ({
            ...prev,
            [recordId]: {
                ...(prev[recordId] || {}),
                [shiftKey]: checked
            }
        }));
    };

    const mapColumnDay = useMemo(() => {
        return (dataSource[0] as any).calendar.map((calendar: {date: string}, calenKey: number) => {
            const day = new Date(calendar.date)
            return {
                title: day.getDate(),
                dataIndex: 'calendar',
                key: `calendar-${calenKey}`,
                width: 20,
                align: 'center',
                onHeaderCell: () => ({
                    style: {
                        textAlign: 'center',
                        fontWeight: 500,

                    }
                }),
                onCell: () => ({
                    style: {
                        padding: '0px'
                    }
                }),
                children: [
                    {
                        title: day.toLocaleDateString('th-TH', { weekday: 'short' }),
                        dataIndex: ['calendar', calenKey, 'shift_plans'],
                        key: `shift-${calenKey}`,
                        align: 'center',
                        onHeaderCell: () => ({
                            style: {
                                textAlign: 'center',
                                fontWeight: 500,
                            }
                        }),
                        onCell: () => ({
                            style: {
                                padding: '0px'
                            }
                        }),
                        render: (_: any, record: DataType) => {
                            const shifts = record.calendar[calenKey]?.shift_plans || [];
                            let isSelected = isRowSelected(record.id);

                            if (!isSelected && selectedShifts[record.id]) {
                                setSelectedShifts(prev => {
                                    const newState = { ...prev };
                                    delete newState[record.id];
                                    return newState;
                                });
                            }

                            return (
                                <Flex vertical>
                                    {shifts.map((itemShift: any, index: number) => {
                                        const shiftKey = `${record.id}-${calendar.date}-${itemShift.shift_code}`;
                                        
                                        const showCheckbox = !itemShift.is_lock && 
                                                           !itemShift.shift_code.includes('OFF') && 
                                                           isSelected;

                                        if (isSelected && selectedShifts[record.id]?.[shiftKey] === undefined && showCheckbox) {
                                            handleShiftCheckbox(record.id, calendar.date, itemShift.shift_code, true);
                                        }

                                        return (
                                            <ShiftShortName             
                                                key={`${calenKey}-${index}`}
                                                colorCode={`${itemShift.shift_color}`}
                                                isCheckBox={showCheckbox}
                                                isLock={itemShift.is_lock}
                                                valueCheckBox={selectedShifts[record.id]?.[shiftKey] || false}
                                                onCheckBox={(e: any) => {
                                                    handleShiftCheckbox(
                                                        record.id,
                                                        calendar.date,
                                                        itemShift.shift_code,
                                                        e.target.checked
                                                    );
                                                }}
                                                labelShort={itemShift.shift_code}
                                            />
                                        );
                                    })}
                                </Flex>
                            );
                        }
                    }
                ]
            }
        });
    }, [dataSource, selectedRowKeys, selectedShifts]);

    const columns = [
        {
            title: '#',
            dataIndex: 'id',
            key: 'id',
            render: (_: any, __: any, index: number) => index + 1,
            width: 10,
            fixed: 'left',

        },
        {
            title: 'พนักงาน',
            dataIndex: 'name',
            key: 'name',
            width: 150,
            fixed: 'left'
        },
        ...mapColumnDay
    ];

    const handleSelectChange = (newSelectedRowKeys: number[], newSelectedRow: DataType[]) => {
        setSelectedRowKeys(newSelectedRowKeys);
        if (newSelectedRowKeys.length === 0) {
            setSelectedShifts({});
        }
        onSelectChange?.(newSelectedRowKeys);
    };

    const rowSelection: TableRowSelection<DataType> = {
        selectedRowKeys,
        onChange: (selectedRowKeys: Key[], selectedRows: DataType[]) => handleSelectChange(selectedRowKeys as number[],selectedRows),
        selections: [
          Table.SELECTION_ALL,
          Table.SELECTION_INVERT,
          Table.SELECTION_NONE,
        ]
    }
    return (
        <Table<DataType> 
            rowSelection={rowSelection} 
            dataSource={dataSource as readonly DataType[]} 
            columns={columns}
            rowKey={(record) => record.id}
            scroll={{ x: 'max-content' }}
        />
    )
}

export default TableManageShift