import React, { useState } from 'react'
import { StyleSheet, View, Image, Button, TextInput, TouchableOpacity, Text, ScrollView, SliderComponent } from "react-native"
import firebase from "firebase";
import '@firebase/auth';
import '@firebase/firestore';
import { Picker } from "@react-native-picker/picker"


const NewMedication = ({ navigation }) => {
    const [condition, setCondition] = useState("")
    const [pillList, setPillList] = useState([])
    const [currentPill, setCurrentPill] = useState({ name: "", quantity: 0 })
    const addPill = () => {
        setPillList([
            ...pillList,
            { name: currentPill.name, key: currentPill.name, quantity: 0 }
        ])
        setCurrentPill({ name: "", quantity: 0 })
    }

    const handleDelete = (index) => {
        const newPillList = [...pillList]
        newPillList.splice(index, 1)
        setPillList([
            ...newPillList
        ])
    }

    const handleSubmit = () => {
        let currentMedicationList = []
        firebase.firestore().collection("users")
            .doc(firebase.auth().currentUser.uid)
            .get()
            .then(snapshot => {
                if (snapshot.data().medicationList !== undefined) {
                    currentMedicationList = snapshot.data().medicationList
                } else {
                    currentMedicationList = []
                }
                firebase.firestore().collection("users")
                    .doc(firebase.auth().currentUser.uid)
                    .update({
                        medicationList: [
                            ...currentMedicationList,
                            {
                                medicationName: condition,
                                pillList: pillList,
                                finished: false,
                                key: condition
                            }
                        ]
                    })
            })
        setTimeout(() => {
            navigation.push("Medication");
            setCondition('')
            setPillList([])
        }, 1000);
    }


    //console.log(pillList)
    return (
        <ScrollView style={{ margin: 10 }}>
            <Text></Text>
            <Text></Text>
            <Text></Text>
            <Text style={styles.text}>Please enter the condition name:</Text>
            <TextInput
                onChangeText={setCondition}
                value={condition}
                placeholder="Condition Name"
            ></TextInput>
            <Text></Text>
            <View style={{ flexDirection: "row", marginBottom: 30 }}>
                <TextInput
                    onChangeText={(text) => setCurrentPill({ ...currentPill, name: text })}
                    value={currentPill.name}
                    placeholder="Pill name"
                    style={{ flex: 4, padding: 5, borderBottomWidth: 1 }}
                ></TextInput>
                <TouchableOpacity onPress={addPill} style={styles.submitButton}>
                    <Text style={styles.buttonText}>Add Pill</Text>
                </TouchableOpacity>
            </View>
            <ScrollView>
                {pillList.map((item, index) => (
                    <View key={index} style={{ flexDirection: "row" }}>
                        <View style={{ flex: 5 }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{item.name}</Text>
                            <View>
                                <Text>Quantity:</Text>
                                <Picker style={styles.text}
                                    selectedValue={(item.quantity).toString()}
                                    onValueChange={(itemValue, itemIndex) => {
                                        // update the item quantity
                                        item.quantity = parseFloat(itemValue)
                                        setPillList([
                                            ...pillList
                                        ])
                                    }
                                    }>
                                    <Picker.Item label="0 times/day" value="0" />
                                    <Picker.Item label="1 times/day" value="1" />
                                    <Picker.Item label="2 times/day" value="2" />
                                    <Picker.Item label="3 times/day" value="3" />
                                    <Picker.Item label="4 times/day" value="4" />
                                    <Picker.Item label="5 times/day" value="5" />
                                    <Picker.Item label="6 times/day" value="6" />
                                </Picker>
                            </View>
                        </View>
                        <View style={{ flex: 1 }}>
                            <TouchableOpacity onPress={() => handleDelete(index)}>
                                <Text style={styles.underLineText}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                ))}

            </ScrollView>
            <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
                <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>

        </ScrollView>
    )
}


const styles = StyleSheet.create({
    contentContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: "center"
    },
    item: {
        paddingTop: 15,
        paddingBottom: 15,
        paddingHorizontal: 10,
        marginHorizontal: 10,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        width: "80%"
    },
    text: {
        marginTop: 20,
        fontSize: 18
    },
    submitButton: {
        alignSelf: 'center',
        borderWidth: 2,
        borderColor: "#6495ed",
        borderRadius: 5,
        backgroundColor: "#6495ed",
        padding: 10,
        margin: 5,
        flex: 1,
        elevation:5
    },
    buttonText: {
        fontSize: 20,
        color: "white"
    }


});

export default NewMedication