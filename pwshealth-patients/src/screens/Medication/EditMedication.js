import React, { useState } from 'react'
import { StyleSheet, View, Image, TextInput, TouchableOpacity, Text, ScrollView } from "react-native"
import { Picker } from "@react-native-picker/picker"
import firebase from "firebase";

const EditMedication = ({ route, navigation }) => {
    const { index, medicationList } = route.params;
    const currentMedication = medicationList[index]
    const [pillList, setPillList] = useState(currentMedication.pillList)
    const [currentPill, setCurrentPill] = useState({ name: "", quantity: 0 })

    const handleSubmit = () => {
        const newMedicationList = [...medicationList]
        newMedicationList[index] = { ...currentMedication, pillList: pillList }
        firebase.firestore().collection("users")
            .doc(firebase.auth().currentUser.uid)
            .update({
                medicationList: [
                    ...newMedicationList
                ]
            })
        setTimeout(() => {
            navigation.push("Medication");
        }, 1000);
    }

    const handleDelete = (index) => {
        const newPillList = [...pillList]
        newPillList.splice(index, 1)
        setPillList([
            ...newPillList
        ])
    }

    const addPill = () => {
        setPillList([
            ...pillList,
            {name: currentPill.name, key:currentPill.name, quantity: 0}
        ])
        setCurrentPill({ name: "", quantity: 0 })
    }


    return (
        <>
            <Text></Text>
            <Text></Text>
            <Text></Text>
            <Text style={{ fontSize: 25, fontWeight: 'bold' }}>{currentMedication.medicationName === "" ? "Medication name undefined" : currentMedication.medicationName}:</Text>
            <View style={{flexDirection: "row", marginBottom: 30}}>
                <TextInput
                    onChangeText={(text) => setCurrentPill({ ...currentPill, name: text })}
                    value={currentPill.name}
                    placeholder="Pill name"
                    style={{flex: 4, padding:5, borderBottomWidth: 1}}
                ></TextInput>
                <TouchableOpacity onPress={addPill} style={styles.submitButton}>
                    <Text style={styles.buttonText}>Add Pill</Text>
                </TouchableOpacity>
            </View>
            <ScrollView style={{ marginTop: 20 }}>
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
                                <Text>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                ))}
            </ScrollView>
            <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
                <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
        </>
    )
}

const styles = StyleSheet.create({
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
        margin: 5
    },
    buttonText: {
        fontSize: 20,
        color: "white"
    }
})

export default EditMedication