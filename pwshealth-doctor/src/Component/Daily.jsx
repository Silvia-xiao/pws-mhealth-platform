import React, { useState, useEffect } from "react";
import { Card, Row, Col, Table } from 'antd';
import 'antd/dist/antd.css';


function Daily(props) {
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
        { title: "Weight", dataIndex: "weight" },
        { title: "Toilet", dataIndex: "toilet" }
    ]


    return (
        <div style={{ margin: 10 }}>
            {
                patientData.userData.name !== "Choose Patient" ?
                    <Card>
                        <Row>
                            <p><strong>Height: </strong>{patientData.userData.height}</p>
                        </Row>
                        <Row>
                            <p><strong>Exercise: </strong>{patientData.userData.exercise}</p>
                        </Row>
                        {patientData.userData.hasOwnProperty("mood") ?
                            <div>
                                <Row>
                                    <p><strong>Mood:</strong></p>
                                </Row>
                                <Row>
                                    <Col span={6}>
                                        <p><strong>Angry Frequency: </strong>{patientData.userData.mood.angryFrequency}</p>
                                    </Col>
                                    <Col span={6}>
                                        <p><strong>Feel: </strong>{patientData.userData.mood.feel}</p>
                                    </Col>
                                    <Col span={12}>
                                        <p><strong>Reaction: </strong>{patientData.userData.mood.reaction.join(", ")}</p>
                                    </Col>
                                </Row>
                            </div>
                            :
                            <div></div>
                        }
                        <Row>
                            <p><strong>Weight & Toliet:</strong></p>
                        </Row>
                        {
                            patientData.userData.hasOwnProperty("dateList") ?
                                <Table
                                    columns={column}
                                    dataSource={
                                        patientData.userData.dateList.map(item => {
                                            return {
                                                date: item.date,
                                                weight: item.weight ? item.weight : "N/A",
                                                toilet: item.toilet ? item.toilet : "N/A"
                                            }
                                        })
                                    }
                                    size="small"
                                />
                                :
                                <div></div>
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

export default Daily;