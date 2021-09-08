import React, { useState, useEffect } from "react";
import { Card, Row, Col, Table } from 'antd';
import 'antd/dist/antd.css';

function MedicalInfo(props) {
    const [patientData, setPatientData] = useState({ userData: { name: "" } })

    useEffect(() => {
        try {
            setPatientData(props.info)
        } catch (e) {
            console.log(e)
        }
    }, [props.info])


    //console.log(patientData)

    return (
        <div style={{ margin: 10 }}>
            {
                patientData.userData.name !== "Choose Patient" ?
                    <Card>
                        <Row>
                            <Col span={6}>
                                <p><strong>Name:</strong> {patientData.userData.name ? patientData.userData.name : ""}</p>
                            </Col>
                            <Col span={6}>
                                <p><strong>Age:</strong> {patientData.userData.age ? patientData.userData.age : "N/A"}</p>
                            </Col>
                            <Col span={6}>
                                <p><strong>Gender:</strong> {patientData.userData.gender ? patientData.userData.gender : "N/A"}</p>
                            </Col>
                            <Col span={6}>
                                <p><strong>Tracking Days:</strong> {patientData.userData.dateList ? patientData.userData.dateList.length : "0"}</p>
                            </Col>
                        </Row>
                        <br></br>
                        {
                            patientData.userData.hasOwnProperty("medicationList") ?
                                patientData.userData.medicationList.map((item, index) => (
                                    <Row>
                                        <Col span={3}>
                                            <p>Condition {index + 1}: </p>
                                        </Col>
                                        <Col span={18}>
                                            <Row>
                                                <Col span={3}>
                                                    <p>{item.medicationName}</p>
                                                </Col>
                                            </Row>
                                            {
                                                item.hasOwnProperty("pillList") ?
                                                    <div>
                                                        <Table 
                                                            columns={[
                                                                {title: "Pill Name", dataIndex: "pillName"},
                                                                {title: "Frequency", dataIndex: "frequency"}
                                                            ]}
                                                            dataSource={item.pillList.map(it => (
                                                                {
                                                                    pillName: it.name,
                                                                    frequency: it.quantity
                                                                }
                                                            ))}
                                                            size="small"
                                                            pagination={{position:["none", "none"]}}
                                                        />
                                                        <br></br>
                                                    </div>
                                                    :
                                                    <div></div>
                                            }
                                        </Col>
                                    </Row>
                                ))
                                :
                                <Row></Row>
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

export default MedicalInfo