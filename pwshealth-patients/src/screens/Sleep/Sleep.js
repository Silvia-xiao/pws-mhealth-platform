import React, { useState } from 'react'
import { StyleSheet, View,Image, Button, TextInput ,TouchableOpacity, Text, ScrollView, SliderComponent } from "react-native"
import firebase from "firebase";
import '@firebase/auth';
import '@firebase/firestore';
import Slider from '@react-native-community/slider';

const Sleep = ({ navigation }) => {
    const [nightSleep, setNightSleep] = useState(8)
    const [sleepQuality, setSleepQuality] = useState(5)
    const [daytimeSleep, setDaytimeSleep] = useState(2)
    const handleSubmit = () => {
        firebase.firestore().collection("users") 
            .doc(firebase.auth().currentUser.uid)
            .update({sleep: {nightSleep: nightSleep, sleepQuality:sleepQuality, daytimeSleep:daytimeSleep }})
        navigation.navigate("Homepage")
    }
    
    return (
        <View style={{margin:10}}>
            <Text></Text>
            <Text></Text>
            <Text></Text>
            <Text style={{marginTop: 30,fontSize: 20, fontStyle: 'italic', fontWeight: "bold"}}>Record your sleep:</Text>
            <Text style={styles.text}>Night Sleep:{nightSleep} hr</Text>
            <Slider
                step={0.25}
                minimumValue={0}
                maximumValue={12}
                value={nightSleep}
                onValueChange={slideValue => setNightSleep(slideValue)}
                minimumTrackTintColor="#00DFC9"
                maximumTrackTintColor="#d3d3d3"
                thumbTintColor="#00DFC9"
            />
            <Text style={styles.text}>Sleep Quality:{sleepQuality}</Text>
            <Slider
                step={0.5}
                minimumValue={0}
                maximumValue={10}
                value={sleepQuality}
                onValueChange={slideValue => setSleepQuality(slideValue)}
                minimumTrackTintColor="#00DFC9"
                maximumTrackTintColor="#d3d3d3"
                thumbTintColor="#00DFC9"
            />
            <Text style={styles.text}>Daytime Sleep:{daytimeSleep} hr</Text>
            <Slider
                step={0.25}
                minimumValue={0}
                maximumValue={12}
                value={daytimeSleep}
                onValueChange={slideValue => setDaytimeSleep(slideValue)}
                minimumTrackTintColor="#00DFC9"
                maximumTrackTintColor="#d3d3d3"
                thumbTintColor="#00DFC9"
            />
            <View style = {{marginTop: 250}}>
                <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
            </View>
        </View>
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
        marginTop:10,
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
        marginVertical: 15,
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

export default Sleep