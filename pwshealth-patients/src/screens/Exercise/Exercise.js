import React, { useState } from 'react'
import { StyleSheet, ScrollView, View, Button, TouchableOpacity, ViewBase } from "react-native";
import { Provider, Text } from 'react-native-paper';
import { RadioButton } from 'react-native-paper';
import firebase from "firebase";
import '@firebase/auth';
import '@firebase/firestore';
import DateTimePicker from '@react-native-community/datetimepicker';
import Slider from '@react-native-community/slider';
import { Card } from 'react-native-elements';

const Exercise = ({ navigation }) => {
    const [visible, setVisible] = useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const saveData = () => {
        setVisible(false);
    }
    const containerStyle = { backgroundColor: 'white', padding: 20 };
    const [sport, setSport] = React.useState('Basketball');
    const [time, setTime] = React.useState('30');
    const [value, setValue] = React.useState('1');
    const [date, setDate] = useState(new Date())
    const [show, setShow] = useState(false);
    const [height, setHeight] = useState(160);
    const [weight, setWeight] = useState(60);
    const [toilet, setToilet] = useState(5);

    const handleSubmit = () => {
        firebase.firestore()
            .collection('users')
            .doc(firebase.auth().currentUser.uid)
            .get()
            .then(snapshot => {
                let dateList = []
                if (snapshot.data().dateList !== undefined) {     //有dateList attribute
                    dateList = snapshot.data().dateList
                    let currentDateListIndex = dateList.findIndex((item) => item.date === date.toDateString())
                    if (currentDateListIndex >= 0) {           // dateList中有当前日期的数据    
                        let currentDateList = dateList[currentDateListIndex]
                        currentDateList.weight = weight
                        currentDateList.toilet = toilet
                        dateList[currentDateListIndex] = currentDateList
                    } else {       //如果dateList中没有当前日期的数据，就直接添加
                        dateList = [...dateList, {
                            date: new Date().toDateString(),
                            key: new Date().toDateString(),
                            weight: weight,
                            toilet: toilet
                        }]
                    }
                } else {      //没有dateList attribute
                    dateList = [
                        {
                            date: new Date().toDateString(),
                            key: new Date().toDateString(),
                            weight: weight,
                            toilet: toilet
                        }
                    ]
                }
                firebase.firestore().collection("users")
                    .doc(firebase.auth().currentUser.uid)
                    .update({
                        dateList: [...dateList],
                        height: height,
                        exercise: value
                    })
            })
        setTimeout(() => { navigation.navigate("Homepage") }, 500);
    }

    const handleChange = (event, selectedValue) => {
        setShow(false);
        const currentDate = selectedValue || new Date();
        setDate(currentDate);
    };
    const showDatePicker = () => {
        setShow(true);
    };

    return (
        <View style={{ margin: 10 }}>
            <Text></Text>
            <Text></Text>
            <Text></Text>
            <Text></Text>
            {/* <ScrollView contentContainerStyle={style.contentContainer}> */}
            {/* <Text style={style.progressBar}>Calorie Consume Goal</Text>
                <Text style={{alignSelf: 'flex-end', marginRight:10}}>Goal:1440kcal</Text>
                <Text>Already take 30%</Text>
                <Progress.Bar progress={0.3} width={300} height={20} />
                <View style={{flexDirection:'row',justifyContent: 'space-between', width: 340}}>
                    <Text>0%</Text>
                    <Text>100%</Text>
                </View>
                <Text></Text>
                <Portal>
                    <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle} dismissable={false}>
                    <Text style={{alignSelf:'center', fontSize: 18, marginBottom: 30 }}>Add new exercise</Text>
                    <Text style={{marginTop: 10, marginBottom: 10}}>Exercise name</Text>
                    <Picker style={styles.text}
                    selectedValue={sport}
                    onValueChange={(itemValue, itemIndex) =>
                        setSport(itemValue)
                    }>
                    <Picker.Item label="Basketball" value="Basketball" />
                    <Picker.Item label="Football" value="Football" />
                    <Picker.Item label="Jogging" value="Jogging" />
                    <Picker.Item label="Swimming" value="Swimming" />
                    <Picker.Item label="Badminton" value="Badminton" />
                    </Picker>
                    <Text style={{marginTop: 10, marginBottom: 10}}>Exercise time</Text>
                    <Picker style={styles.text}
                    selectedValue={time}
                    onValueChange={(itemValue, itemIndex) =>
                        setTime(itemValue)
                    }>
                    <Picker.Item label="30mins" value="30" />
                    <Picker.Item label="60mins" value="60" />
                    <Picker.Item label="90mins" value="90" />
                    <Picker.Item label="120mins" value="120" />
                    <Picker.Item label="other.." value="" />
                    </Picker>
                    <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                        <Button onPress={saveData} title="Save"/>
                        <Button onPress={hideModal} title="Cancel"/>
                    </View>
                    </Modal>
                </Portal>
                <View style={style.item}>
                    <Text style={style.itemText}>Fruit:</Text>
                    <Text>Apple: 200g 104kcal</Text>
                    <View style={{flexDirection: 'row', alignSelf: 'flex-end'}}>
                        <Button onPress={saveData} title="Edit"/>
                        <Button onPress={hideModal} title="Delete"/>
                    </View>
                </View>
            </ScrollView>
            <TouchableOpacity 
                onPress={showModal}
                style={style.addButton}
            >
                <Text>ADD</Text>
            </TouchableOpacity> */}

            <TouchableOpacity onPress={showDatePicker}>
                <Text style={{ marginTop: 10, fontSize: 20, fontStyle: 'italic', fontWeight: "bold", textDecorationLine: 'underline', color: '#3399ff' }}>{date.toDateString()}</Text>
            </TouchableOpacity>

            {show && (
                <DateTimePicker
                    value={date}
                    mode={"date"}
                    display='default'
                    onChange={handleChange}
                />
            )}
            <Card style={{padding:5}} elevation={5}>
                <Card.Title style={{ marginTop: 5, fontSize: 20, fontWeight: "bold" }}>Weekly exercise level: </Card.Title>
                <Card.Divider/>
            <View style={styles.radioButton}>
                <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontSize: 18 }}>No exercise</Text>
                        <RadioButton value="1.2" />
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontSize: 18 }}>Exercise 1-3 times per week</Text>
                        <RadioButton value="1.375" />
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontSize: 18 }}>Exercise 3-5 times per week</Text>
                        <RadioButton value="1.55" />
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontSize: 18 }}>Exercise 6-7 times per week</Text>
                        <RadioButton value="1.725" />
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontSize: 18 }}>Exercise 2 times per day</Text>
                        <RadioButton value="1.9" />
                    </View>
                </RadioButton.Group>
                <Card.Divider/>
                <Card.Title style={{ marginTop: 5, fontSize: 20, fontWeight: "bold" }}>Height:{height} cm</Card.Title>
                <Slider
                    step={1}
                    minimumValue={100}
                    maximumValue={200}
                    value={height}
                    onValueChange={slideValue => setHeight(slideValue)}
                    minimumTrackTintColor="#3399ff"
                    maximumTrackTintColor="#3399ff"
                    thumbTintColor="#3399ff"
                />
                <Card.Title style={{ marginTop: 5, fontSize: 20, fontWeight: "bold" }}>Weight:{weight} kg</Card.Title>
                <Slider
                    step={1}
                    minimumValue={20}
                    maximumValue={150}
                    value={weight}
                    onValueChange={slideValue => setWeight(slideValue)}
                    minimumTrackTintColor="#3399ff"
                    maximumTrackTintColor="#3399ff"
                    thumbTintColor="#3399ff"
                />
                <Card.Title style={{ marginTop: 5, fontSize: 20, fontWeight: "bold" }}>Toilet Times:{toilet} times</Card.Title>
                <Slider
                    step={1}
                    minimumValue={0}
                    maximumValue={20}
                    value={toilet}
                    onValueChange={slideValue => setToilet(slideValue)}
                    minimumTrackTintColor="#3399ff"
                    maximumTrackTintColor="#3399ff"
                    thumbTintColor="#3399ff"
                />

            </View>
            <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
                <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
            </Card>
            

            
        </View>
    );
};

const styles = StyleSheet.create({
    text: {
        marginTop: 10,
        fontSize: 18,
        color: '#ffffff'
    },
    label: {
        fontSize: 20,
        marginBottom: 5,
        marginLeft: 5
    },
    submitButton: {
        alignSelf: 'center',
        borderWidth: 2,
        borderColor: "#6495ed",
        borderRadius: 5,
        backgroundColor: "#6495ed",
        padding: 10,
        marginTop: 30,
        elevation:5
    },
    buttonText: {
        fontSize: 20,
        color: "white"
    },
    radioButton: {
    },
    radioButtonText: {
        flexDirection: 'row',
        marginLeft: 30,

    }
});

export default Exercise;
