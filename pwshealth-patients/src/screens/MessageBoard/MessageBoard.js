import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Image, Button, TextInput, TouchableOpacity, Text, ScrollView, SliderComponent } from "react-native"
import firebase from "firebase";
import '@firebase/auth';
import '@firebase/firestore';
import Slider from '@react-native-community/slider';
import { Card } from 'react-native-shadow-cards';
import { Picker } from "@react-native-picker/picker";

const Sleep = ({ navigation }) => {
    const [data, setData] = useState({ userData: { name: "" } })
    const [doctorMessage, setDoctorMessage] = useState("No message from doctor today.")
    const [patientMessage, setPatientMessage] = useState("")
    const [date, setDate] = useState(new Date())
    

    const showDatePicker = () => {
        setShow(true);
    };

    useEffect(() => {
        try {
            firebase.firestore()
                .collection('users')
                .doc(firebase.auth().currentUser.uid)
                .get()
                .then(snapshot => {
                    let data = snapshot.data()
                    let patientMessageContent = ""
                    let doctorMessageContent = "No message from doctor today."
                    let todayList = []
                    if (data.hasOwnProperty("dateList")) {
                        todayList = data.dateList.filter(it => it.date === new Date().toDateString())
                        if (todayList.length > 0) {
                            patientMessageContent = todayList[0].patientMessage ? todayList[0].patientMessage : ""
                            doctorMessageContent = todayList[0].doctorMessage ? todayList[0].doctorMessage : "No message from doctor today."
                        }
                    }
                    setData(data)
                    setPatientMessage(patientMessageContent)
                    setDoctorMessage(doctorMessageContent)
                })
        }
        catch (err) {
            console.log(err)
        }
    }, [])

    const handleInput = (e) => {
        setPatientMessage(e)
        //console.log(e)
    }

    const handleSubmit = () => {
        let dateList = []
        if (data.dateList !== undefined) {     //有dateList attribute
            dateList = data.dateList
            let currentDateListIndex = dateList.findIndex((item) => item.date === new Date().toDateString())
            if (currentDateListIndex >= 0) {           // dateList中有当前日期的数据    
                let currentDateList = dateList[currentDateListIndex]
                currentDateList.patientMessage = patientMessage
                dateList[currentDateListIndex] = currentDateList
            } else {       //如果dateList中没有当前日期的数据，就直接添加
                dateList = [...dateList, {
                    date: new Date().toDateString(),
                    key: new Date().toDateString(),
                    patientMessage: patientMessage
                }]
            }
        } else {      //没有dateList attribute
            dateList = [
                {
                    date: new Date().toDateString(),
                    key: new Date().toDateString(),
                    patientMessage: patientMessage
                }
            ]
        }
        firebase.firestore().collection("users")
            .doc(firebase.auth().currentUser.uid)
            .update(
                {
                    dateList: [...dateList]
                }
            )
        setTimeout(() => { navigation.navigate("Homepage") }, 500);
    }


    return (
        <View style={{ margin: 10 }}>
            <Text></Text>
            <Text></Text>
            <Text></Text>
            <Text></Text>
            <Text></Text>
            <TouchableOpacity onPress={showDatePicker}>
                <Text style={{ fontSize: 20, fontWeight: "bold", fontStyle:'italic', textDecorationLine: 'underline', color: '#3399ff' }}>{date.toDateString()}</Text>
            </TouchableOpacity>
            <Card style={{ padding: 10, margin: 20, width: 350 }} elevation={5}>
                <Text style={{
                    fontWeight: "bold",
                    fontSize: 20
                }}>Doctor Message: </Text>
                <Text>{doctorMessage}</Text>
            </Card>
            <Card style={{ padding: 10, marginHorizontal: 20, width: 350, height: 400 }} elevation={5}>
                <Text style={{
                    fontWeight: "bold",
                    fontSize: 20
                }}>Leave a message for doctor: </Text>
                <TextInput
                    onChangeText={handleInput}
                    value={patientMessage}
                    multiline={true}
                    placeholder="Please leave a message for doctor."
                    style={{ flex: 4, padding: 10, borderWidth: 1, borderStyle: "solid", borderRadius: 5, marginVertical: 10 }}
                ></TextInput>
                <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
            </Card>
        </View>
    )
}


const styles = StyleSheet.create({
    submitButton: {
        alignSelf: 'center',
        borderWidth: 2,
        borderColor: "#6495ed",
        borderRadius: 5,
        backgroundColor: "#6495ed",
        padding: 10,
        margin: 5,
        elevation: 5,
        height: 50
    },
    buttonText: {
        fontSize: 20,
        color: "white"
    }
});


export default Sleep;