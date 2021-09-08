import React, { useState, useEffect } from "react";
import { Card, Row, Col } from 'antd';
import { Line } from '@ant-design/charts';
import 'antd/dist/antd.css';


function Visualisation(props) {
    const [patientData, setPatientData] = useState({ userData: { name: "" } })

    useEffect(() => {
        try {
            setPatientData(props.info)
        } catch (e) {
            console.log(e)
        }
    }, [props.info])

    const weight = () => {
        const data = patientData.userData.dateList.slice(-5).map(item => {
            return {
                Date: item.date.slice(-11),
                Weight: item.weight ? item.weight : 0
            }
        })
        const config = {
            data,
            height: 400,
            xField: 'Date',
            yField: 'Weight',
            point: {
                size: 5,
                shape: 'diamond',
            }
        }
        return data ?
            <Card>
                <p><strong>Weight - Date</strong></p>
                <Line {...config} />
            </Card>
            :
            <p><strong>No recent record for weight.</strong></p>
    }
    const calorie = () => {
        const data = patientData.userData.dateList.slice(-7).map(item => {
            return {
                Date: item.date.slice(-11),
                Calorie: item.calorie_daily ? item.calorie_daily - 1000 : -1000
            }
        })
        const config = {
            data,
            height: 400,
            xField: 'Date',
            yField: 'Calorie',
            point: {
                size: 5,
                shape: 'diamond',
            }
        }
        return data ?
            <Card>
                <p><strong>Calorie - Date</strong></p>
                <Line {...config} />
            </Card>
            :
            <p><strong>No recent record for calorie.</strong></p>
    }

    return (
        <div style={{ margin: 10 }}>
            {
                patientData.userData.name !== "Choose Patient" ?
                    <Card>
                        {
                            patientData.userData.hasOwnProperty("dateList") ?
                                <Row>
                                    <Col span={11}>
                                        {
                                            patientData.userData.hasOwnProperty("dateList") ?
                                                weight()
                                                :
                                                <div></div>
                                        }
                                    </Col>
                                    <Col span={11} offset={2}>
                                        {
                                            patientData.userData.hasOwnProperty("dateList") ?
                                                calorie()
                                                :
                                                <div></div>
                                        }
                                    </Col>
                                </Row> :
                                <div><strong>No recent record for weight and calorie.</strong></div>
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

export default Visualisation;