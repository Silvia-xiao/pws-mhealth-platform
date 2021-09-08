import React, { useState, useEffect } from "react";
import { Card, Row, Col, Input, Button } from 'antd';
import 'antd/dist/antd.css';
import firebase from '../Firebase';
import '@firebase/firestore';
const { TextArea } = Input;


function MessageBoard(props) {
    const [patientData, setPatientData] = useState({ userData: { name: "" } })
    const [patientMessage, setPatientMessage] = useState("No message from patient today.")
    const [doctorMessage, setDoctorMessage] = useState("")

    useEffect(() => {
        try {
            setPatientData(props.info)
            let doctorMessageContent = ""
            let patientMessageContent = "No message from patient today."
            let todayList = []
            if (props.info.userData.hasOwnProperty("dateList")) {
                todayList = props.info.userData.dateList.filter(it => it.date === new Date().toDateString())
                if (todayList.length > 0) {
                    doctorMessageContent = todayList[0].doctorMessage ? todayList[0].doctorMessage : ""
                    patientMessageContent = todayList[0].patientMessage ? todayList[0].patientMessage: "No message from patient today."
                }
            }
            setDoctorMessage(doctorMessageContent)
            setPatientMessage(patientMessageContent)
        } catch (e) {
            console.log(e)
        }
    }, [props.info])

    const handleInput = (e) => {
        setDoctorMessage(e.target.value)
        //console.log(e.target.value)
    }

    const handleSubmit = () => {
        let dateList = []
        if (patientData.userData.dateList !== undefined) {     //有dateList attribute
            dateList = patientData.userData.dateList
            let currentDateListIndex = dateList.findIndex((item) => item.date === new Date().toDateString())
            if (currentDateListIndex >= 0) {           // dateList中有当前日期的数据    
                let currentDateList = dateList[currentDateListIndex]
                currentDateList.doctorMessage = doctorMessage
                dateList[currentDateListIndex] = currentDateList
            } else {       //如果dateList中没有当前日期的数据，就直接添加
                dateList = [...dateList, {
                    date: new Date().toDateString(),
                    key: new Date().toDateString(),
                    doctorMessage: doctorMessage
                }]
            }
        } else {      //没有dateList attribute
            dateList = [
                {
                    date: new Date().toDateString(),
                    key: new Date().toDateString(),
                    doctorMessage: doctorMessage
                }
            ]
        }
        firebase.firestore().collection("users")
            .doc(patientData.id)
            .update(
                {
                    dateList: [...dateList]
                }
            )
    }


    console.log(doctorMessage)
    return (
        <div style={{ margin: 10 }}>

            {
                patientData.userData.name !== "Choose Patient" ?
                    <Card>
                        {
                            patientData.userData.hasOwnProperty("dateList") ?
                                <Col>
                                    <Row>
                                        <p style={{ alignSelf: "start" }}><strong>Patient Message:</strong></p>
                                    </Row>
                                    <Card style={{ border: "solid", borderWidth: 2, borderRadius: "20" }}>
                                        <p>{patientMessage}</p>
                                    </Card>
                                </Col>
                                :
                                <Col>
                                    <Row>
                                        <p style={{ alignSelf: "start" }}><strong>Patient Message:</strong></p>
                                    </Row>
                                    <Card style={{ border: "solid", borderWidth: 2, borderRadius: "20" }}>
                                        <p>No message from patient today.</p>
                                    </Card>
                                </Col>
                        }
                        <br></br>
                        <br></br>
                        <Row>
                            <p style={{ alignSelf: "start" }}><strong>Leave a message for patient:</strong></p>
                        </Row>
                        <Card style={{ border: "solid", borderWidth: 2, borderRadius: "20" }}>
                            <TextArea
                                placeholder="Please leave a message for the patient."
                                allowClear
                                onChange={handleInput}
                                value={doctorMessage}
                                style={{height: "50"}}
                            />
                            <Button onClick={handleSubmit} style={{position: "relative",right: "20", margin: 20}}>Submit</Button>
                        </Card>
                    </Card>
                    :
                    <Card>
                        <p>Please choose patient from the above list.</p>
                    </Card>
            }

        </div>
    )
}

export default MessageBoard;