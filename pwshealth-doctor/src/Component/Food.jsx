import React, { useState, useEffect } from "react";
import { Card, Table } from 'antd';
import 'antd/dist/antd.css';


function Food(props) {
    const [patientData, setPatientData] = useState({ userData: { name: "" } })

    useEffect(() => {
        try {
            setPatientData(props.info)
        } catch (e) {
            console.log(e)
        }
    }, [props.info])

    const column = [
        { title: "Date", dataIndex: "date" },
        { title: "Food", dataIndex: "food" },
        { title: "Calorie Daily", dataIndex: "calorie_daily" },
        { title: "Calorie Total", dataIndex: "calorie_total" }
    ]

    return (
        <div style={{ margin: 10 }}>
            {
                patientData.userData.name !== "Choose Patient" ?
                    <Card>
                        {
                            patientData.userData.hasOwnProperty("dateList") ?
                                <Table
                                    columns={column}
                                    dataSource={patientData.userData.dateList.map(item => {
                                        return {
                                            date: item.date,
                                            food: item.foodRecord? item.foodRecord.map(it => it.name).join(", "): "",
                                            calorie_daily: Math.round((item.calorie_daily - 1000) * 100) / 100 ,
                                            calorie_total: item.foodRecord? item.foodRecord.reduce((prev, it) => prev + it.calorie, 0) : ""
                                        }
                                    })}
                                    size="small"
                                />
                                :
                                <p>No food record for current patient.</p>
                        }

                    </Card>
                    :
                    <Card>
                        <p>Please choose patient from the above list.</p>
                    </Card>
            }
        </div>
    )
}

export default Food;