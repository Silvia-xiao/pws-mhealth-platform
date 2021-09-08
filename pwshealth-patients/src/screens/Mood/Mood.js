import React, { useState } from 'react'
import { StyleSheet, View, Image, Button, TextInput, TouchableOpacity, Text, ScrollView, SliderComponent } from "react-native"
import firebase from "firebase";
import '@firebase/auth';
import '@firebase/firestore';
import SliderText from 'react-native-slider-text';
import Slider from '@react-native-community/slider';
import { Picker } from "@react-native-picker/picker";
import { Card } from 'react-native-elements';

const Mood = ({ navigation }) => {
    const [feel, setFeel] = useState(5)
    const [angryFrequency, setAngryFrequency] = useState(0)
    const [reaction, setReaction] = useState([])
    const [chosenReaction, setChosenReaction] = useState()
    const [nightSleep, setNightSleep] = useState(8)
    const [sleepQuality, setSleepQuality] = useState(5)
    const [daytimeSleep, setDaytimeSleep] = useState(2)
    const [date, setDate] = useState(new Date())
    const handleSubmit = () => {
        firebase.firestore().collection("users")
            .doc(firebase.auth().currentUser.uid)
            .update({
                mood: { feel: feel, angryFrequency: angryFrequency, reaction: reaction },
                sleep: { nightSleep: nightSleep, sleepQuality: sleepQuality, daytimeSleep: daytimeSleep }
            })
        navigation.navigate("Homepage")
    }
    const showDatePicker = () => {
        setShow(true);
    };

    return (
        <ScrollView style={{ margin: 10 }}>
            <Text></Text>
            <Text></Text>
            <Text></Text>
            <Text></Text>
            <Text></Text>
            <TouchableOpacity onPress={showDatePicker}>
                <Text style={{ fontSize: 20, fontWeight: "bold", fontStyle:'italic', textDecorationLine: 'underline', color: '#3399ff' }}>{date.toDateString()}</Text>
            </TouchableOpacity>
            <Card style={{padding:5}} elevation={5}>
                <Card.Title style={{ marginTop: 5, fontSize: 24, fontWeight: "bold" }}>Record Mood & Sleep</Card.Title>
                <Card.Divider/>
                {/* <Text style={{fontSize:18,fontWeight: 'bold',marginTop:1}}>How do you feel?</Text> */}
                <Card.Title style={{ marginTop: 5, fontSize: 20, fontWeight: "bold" }}>Mood level:{feel}</Card.Title>
                <Text style={{fontSize:18,marginTop:1}}>0 is sad and 10 is very happy</Text>
                <Slider
                    step={1}
                    minimumValue={0}
                    maximumValue={10}
                    sliderValue={feel}
                    value={feel}
                    onValueChange={slideValue => setFeel(slideValue)}
                    minimumTrackTintColor="#3399ff"
                    maximumTrackTintColor="#3399ff"
                    thumbTintColor="#3399ff"
                />
            {/* <Text style={{fontSize:18,fontWeight: 'bold',marginTop:1}}>Have you been angry?</Text> */}
            {/* <SliderText
                step={1}
                minimumValue={0}
                maximumValue={10}
                sliderValue={angryFrequency}
                value={angryFrequency}
                onValueChange={slideValue => setAngryFrequency(slideValue)}
                minimumTrackTintColor="#3399ff"
                maximumTrackTintColor="#3399ff"
                thumbTintColor="#3399ff"
                minimumValueLabel="Haven't been angry"
                maximumValueLabel="Ten times"
                customCountStyle={{ fontSize: 18 }}
                customLabelStyle={{ fontSize: 15 }}
            /> */}
            <Card.Title style={{ marginTop: 1, fontSize: 20, fontWeight: "bold" }}>Angry times:{angryFrequency} times</Card.Title>
            <Slider
                    step={1}
                    minimumValue={0}
                    maximumValue={10}
                    sliderValue={angryFrequency}
                    value={angryFrequency}
                    onValueChange={slideValue => setAngryFrequency(slideValue)}
                    minimumTrackTintColor="#3399ff"
                    maximumTrackTintColor="#3399ff"
                    thumbTintColor="#3399ff"
                />
                <Card.Title style={{ marginTop: 1, fontSize: 20, fontWeight: "bold" }}>How did you react while angry?</Card.Title>
            {/* <Text >{reaction.join(', ')}</Text> */}
            <Picker style={styles.text}
                selectedValue={chosenReaction}
                onValueChange={(itemValue, itemIndex) => {
                    if (itemValue === "No reaction") {
                        setReaction([])
                    }
                    else if (!reaction.includes(itemValue)) {
                        setReaction([...reaction, itemValue])
                    }
                    setChosenReaction(itemValue)
                }
                }>
                <Picker.Item label="No reaction" value="No reaction" />
                <Picker.Item label="Yell" value="Yell" />
                <Picker.Item label="Cry" value="Cry" />
                <Picker.Item label="Hit others" value="Hit others" />
            </Picker>
            <Card.Title style={{ marginTop: 1, fontSize: 20, fontWeight: "bold" }}>Night Sleep:{nightSleep} hr</Card.Title>
            <Slider
                step={0.25}
                minimumValue={0}
                maximumValue={12}
                value={nightSleep}
                onValueChange={slideValue => setNightSleep(slideValue)}
                minimumTrackTintColor="#3399ff"
                maximumTrackTintColor="#3399ff"
                thumbTintColor="#3399ff"
            />
            <Card.Title style={{ marginTop: 1, fontSize: 20, fontWeight: "bold" }}>Sleep Quality:{sleepQuality}</Card.Title>
            <Slider
                step={0.5}
                minimumValue={0}
                maximumValue={10}
                value={sleepQuality}
                onValueChange={slideValue => setSleepQuality(slideValue)}
                minimumTrackTintColor="#3399ff"
                maximumTrackTintColor="#3399ff"
                thumbTintColor="#3399ff"
            />
            <Card.Title style={{ marginTop: 1, fontSize: 20, fontWeight: "bold" }}>Daytime Sleep:{daytimeSleep} hr</Card.Title>
            <Slider
                step={0.25}
                minimumValue={0}
                maximumValue={12}
                value={daytimeSleep}
                onValueChange={slideValue => setDaytimeSleep(slideValue)}
                minimumTrackTintColor="#3399ff"
                maximumTrackTintColor="#3399ff"
                thumbTintColor="#3399ff"
            />
                <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
            </Card>
            
            
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    container: {
        marginLeft: 15,
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        margin: 5
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 4,
        margin: 10
    },
    nameStyle: {
        fontWeight: 'bold',
        fontSize: 16
    },
    categoryText: {
        marginTop: 10,
        marginBottom: 5,
        fontWeight: 'bold',
        fontSize: 20
    },
    underLineText: {
        fontSize: 15,
        textDecorationLine: 'underline',
        color: 'blue',
        textAlign: 'right',
    },
    heading: {
        marginTop: 20,
        fontSize: 18,
        fontWeight: 'bold'
    },
    text: {
        fontSize: 18
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
        margin: 5
    },
    buttonText: {
        fontSize: 20,
        color: "white"
    }

});

export default Mood