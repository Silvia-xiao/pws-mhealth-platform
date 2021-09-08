import React from "react";
import { ProfileTwoTone } from '@ant-design/icons'
import { Row, Col } from 'antd';
import CustomTabs from './CustomTabs'
import 'antd/dist/antd.css';

function MainPage() {
    

    return (
        <div style={{ padding: 20 }}>
            <div style={{ textAlign: "right" }}>
                <Row>
                    <Col span={5} offset={18}>
                        <ProfileTwoTone style={{ display: "inline", fontSize: 20, marginRight: 4 }} />
                        <p style={{ display: "inline", fontSize: 20 }}>Hi! Doctor name.</p>
                    </Col>
                </Row>
            </div>
            <div>
                <CustomTabs style={{ padding: 0 }}/>
            </div>

        </div>
    )
}

export default MainPage