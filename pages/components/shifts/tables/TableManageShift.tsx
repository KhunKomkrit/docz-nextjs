import { Flex, Table } from "antd";
import ShiftShortName from "../buttons/ShiftShortName";


interface Props { }

const TableManageShift: React.FC<Props> = ({ }) => {
    const dataSource = [
        {
            id: '1',
            name: 'นาย สมมุติ ใจดี',
            calendar: [
                { date: "2025-01-01 00:00:00", day_th: 'จ.', shift_plans: [{ shift_code: 'SH1' },{ shift_code: 'SH2' },{ shift_code: 'SH3' }] },
                { date: "2025-01-02 00:00:00", day_th: 'อ.', shift_plans: [], shift_leave_data: [{ leave_type_name: 'ลาป่วย' }] },
                { date: "2025-01-03 00:00:00", day_th: 'พ.', shift_plans: [{ shift_code: 'SH1' }] }
            ]
        },
    ];

    const mapColumnDay = dataSource[0].calendar.map((calendar,calenKey) => {
        const day = new Date(calendar.date)
        return {
            title: day.getDate(),
            dataIndex: 'calendar',
            key: 'calendar',
            width: '10%',
            children: [
                {
                    title: `${calendar.day_th}`,
                    dataIndex: 'street',
                    key: 'street',
                    width: '10%',
                    render: (_: any, record: typeof dataSource[0]) => {
                        console.log(record.calendar);

                        return <Flex vertical={true}>
                            {
                              record.calendar[calenKey] &&  record.calendar[calenKey].shift_plans.map((itemShift) => <ShiftShortName
                                    colorCode="#0DAA17"
                                    isCheckBox={true}
                                    isLock={true}
                                    valueCheckBox={true}
                                    onCheckBox={() => { }}
                                    labelShort={`${itemShift.shift_code}`}
                                />)
                            }
                        </Flex>
                    }
                }
            ]
        }
    })

    const columns = [
        {
            title: 'no',
            dataIndex: 'id',
            key: 'id',
            render: (_: any, record: any, key: number) => {
                return ++key
            },
            width: '10%',
        },
        {
            title: 'พนักงาน',
            dataIndex: 'name',
            key: 'name',
            width: '20%',
        },
        ...mapColumnDay
    ];

    return (
        <Table dataSource={dataSource} columns={columns} />
    )
}

export default TableManageShift