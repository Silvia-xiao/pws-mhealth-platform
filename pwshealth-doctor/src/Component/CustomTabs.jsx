import React, { useState, useEffect } from "react";
import { Tabs, Card, Menu, Dropdown, Row, Col, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import MedicalInfo from "./MedicalInfo"
import Food from "./Food"
import Daily from "./Daily"
import Visualization from "./Visualization"
import MessageBoard from "./MessageBoard"
import firebase from '../Firebase';
import '@firebase/firestore';
const { TabPane } = Tabs;

function CustomTabs(props) {
    const [chosenPatient, setChosenPatient] = useState({userData: { name: "Choose Patient"}})
    const [medicalInfo, setMedicalInfo] = useState([{userData: { name: "xjdsocj"}}])
    const [update, setUpdate] = useState(true)

    useEffect(() => {
        firebase.firestore().collection("users").onSnapshot(snapshot => {
            setMedicalInfo(snapshot.docs.map(doc => ({
                id: doc.id, userData: doc.data()
            })))
        })
        setUpdate(false)
    }, [update])

    const menu = (
        <Menu>
            {
                medicalInfo.map(item => (
                    <Menu.Item key={item.id}>
                        <Button type="link" onClick={() => setChosenPatient(item)}>
                            {item.userData.name}
                        </Button>
                    </Menu.Item>
                ))
            }
        </Menu>
    );

    //console.log(chosenPatient)
    return (
        <div>
            <Card style={{ marginTop: 16 }}>
                <Row>
                    <Col span={5} offset={16}>
                        <p style={{display: "inline"}}>Choose Patient:   </p>
                        <Dropdown overlay={menu}>
                            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                {chosenPatient? chosenPatient.userData.name: "Choose Patient"} <DownOutlined />
                            </a>
                        </Dropdown>
                    </Col>
                </Row>

                <Tabs type="card">
                    <TabPane tab="Medical Info" key="1">
                        <MedicalInfo info={chosenPatient} />
                    </TabPane>
                    <TabPane tab="Food" key="2">
                        <Food info={chosenPatient} />
                    </TabPane>
                    <TabPane tab="Daily" key="3">
                        <Daily info={chosenPatient} />
                    </TabPane>
                    <TabPane tab="Data visualisation" key="4">
                        <Visualization info={chosenPatient}/>
                    </TabPane>
                    <TabPane tab="Message Board" key="5">
                        <MessageBoard info={chosenPatient}/>
                    </TabPane>
                </Tabs>
            </Card>



        </div>
    )
}

export default CustomTabs