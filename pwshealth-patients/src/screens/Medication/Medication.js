import React, { useState, useEffect } from 'react'
import { StyleSheet, View, TouchableOpacity, Text, ScrollView, CheckBox } from "react-native"
import firebase from "firebase";
import '@firebase/auth';
import '@firebase/firestore';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from "@react-native-picker/picker"
import { TextInput } from 'react-native-gesture-handler';
import { Card } from 'react-native-shadow-cards';

const Medication = ({ navigation }) => {
    const [medicationData, setMedicationData] = useState({ medicationList: [{ pillList: [{ key: "chuih" }] }] })
    const [display, setDisplay] = useState(false)
    const [updated, setUpdated] = useState(false)
    const [date, setDate] = useState(new Date())
    const [show, setShow] = useState(false);
    const [bloodSugar, setBloodSugar] = useState(4.0)
    const [bloodPressure, setBloodPressure] = useState('80/120')

    useEffect(() => {
        try {
            firebase.firestore()
                .collection('users')
                .doc(firebase.auth().currentUser.uid)
                .get()
                .then(snapshot => {
                    let data = snapshot.data()
                    if (data.hasOwnProperty('medicationList')) {
                        setMedicationData({ ...data })
                        if (data.medicationList.length > 0) {
                            setDisplay(true)
                        }
                    } else {
                        setDisplay(false)
                    }
                })

        }
        catch (err) {
            console.log(err)

        }
    }, [updated])

    const handleEdit = (index) => {
        navigation.navigate("EditMedication", { index: index, medicationList: medicationData.medicationList })
        setUpdated(!updated)
    }

    const handleDelete = (index) => {
        const newMedicationList = [...medicationData.medicationList]
        newMedicationList.splice(index, 1)
        firebase.firestore().collection("users")
            .doc(firebase.auth().currentUser.uid)
            .update({
                medicationList: [
                    ...newMedicationList
                ]
            })
        setUpdated(!updated)

        if (newMedicationList.length === 0) {
            setDisplay(false)
        }
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
        <ScrollView >
            <Text></Text>
            <Text></Text>
            <Text></Text>
            {/* <Text></Text> */}
            <TouchableOpacity onPress={showDatePicker}>
                <Text style={{ marginTop: 10, fontSize: 20, fontStyle: 'italic', fontWeight: "bold", marginHorizontal: 10, textDecorationLine: 'underline', color: '#3399ff' }}>{date.toDateString()}</Text>
            </TouchableOpacity>

            {show && (
                <DateTimePicker
                    value={date}
                    mode={"date"}
                    display='default'
                    onChange={handleChange}
                />
            )}
            {display ?
                <ScrollView contentContainerStyle={styles.contentContainer}>
                    {medicationData.medicationList.map((item, index) =>
                        <TouchableOpacity key={index} onPress={() => { navigation.navigate("MedicationAdd", { medication: item, date: date.toDateString() }) }}>
                            <Card style={{padding: 10, margin: 10, width: 350}} elevation={5}>
                                <View key={index}>
                                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                    <Text style={styles.itemText}>{item.medicationName}</Text>
                                    {/* <CheckBox
                                        value={item.finished}
                                        onValueChange={(itemValue) => {
                                            item.finished = itemValue
                                            setMedicationData({ ...medicationData })
                                            firebase.firestore().collection("users")
                                                .doc(firebase.auth().currentUser.uid)
                                                .update({
                                                    medicationList: [
                                                        ...medicationData.medicationList
                                                    ]
                                                })
                                        }}
                                    /> */}
                                </View>
                                {item.pillList.map((it, index) =>
                                    <View style={{ flexDirection: "row" }}>
                                        <Text key={index} style={styles.food}>{it.name}: {it.quantity} times/day</Text>
                                        <CheckBox
                                        value={item.finished}
                                        onValueChange={(itemValue) => {
                                            item.finished = itemValue
                                            setMedicationData({ ...medicationData })
                                            firebase.firestore().collection("users")
                                                .doc(firebase.auth().currentUser.uid)
                                                .update({
                                                    medicationList: [
                                                        ...medicationData.medicationList
                                                    ]
                                                })
                                        }}
                                    />
                                    </View>
                                )}
                                {(item.medicationName === "Diabetes") ?
                                    <View style={{ flexDirection: "row", marginVertical: 15 }}>
                                        <Text style={{  flex: 2 }}>Blood Sugar: </Text>
                                        <TextInput
                                            placeholder=" Please enter your blood sugar"
                                            onChangeText={(text) => setBloodSugar(text)}
                                            style={{ borderWidth: 1, height: 40, flex: 4, borderRadius: 5, padding: 10,borderColor: 'gray' }}
                                        />
                                    </View>
                                    : <View></View>
                                }
                                {(item.medicationName === "Hypertension") ?
                                    <View style={{ flexDirection: "row", marginVertical: 15 }}>
                                        <Text style={{  flex: 2 }}>Blood Pressure: </Text>
                                        <TextInput
                                            placeholder=" Please enter your blood pressure"
                                            onChangeText={(text) => setBloodPressure(text)}
                                            style={{ borderWidth: 1, height: 40, flex: 4, borderRadius: 5, padding: 10,borderColor: 'gray' }}
                                        />
                                    </View>
                                    : <View></View>
                                }
                            </View>
                            <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
                                <TouchableOpacity style={styles.editButton} onPress={() => handleEdit(index)}>
                                    <Text style={styles.underLineText}>Edit</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(index)}>
                                    <Text style={styles.underLineText}>Delete</Text>
                                </TouchableOpacity>
                            </View>
                            </Card>
                            
                        </TouchableOpacity>

                    )}
                </ScrollView>

                :

                <View>
                    <Text></Text>
                    <Text style={{fontSize: 20, fontWeight: "bold",marginHorizontal: 30,marginVertical: 20 , color: "grey", alignSelf: "baseline"}}>No medication record task yet!</Text>
                    <Text style={{fontSize: 20, fontWeight: "bold",marginHorizontal: 30,marginBottom: 20 , color: "grey"}}>Please click the "Add Food" button to make your medication record task!</Text>
                </View>
                
                

            }
            <View style={{ width: 100, alignSelf: 'center' }}>
                <TouchableOpacity
                    onPress={() => navigation.navigate("NewMedication")}
                    style={styles.addButton}
                >
                    <Text style={{ fontWeight: "bold", fontSize: 24, color: '#ffffff' }}>ADD</Text>
                </TouchableOpacity>
            </View>
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
    addButton: {
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: "center",
        padding: 10,
        borderRadius: 100,
        backgroundColor: 'lightgray',
        margin: 10,
        elevation:5,
        backgroundColor: '#6495ed'
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
        width: 350
    },
    itemText: {
        fontWeight: "bold",
        fontSize: 20
    },
    food: {
        fontSize: 15
    },
    editButton: {
        width: 70,
        height: 30,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#6495ed',
        marginHorizontal: 5,
        elevation:5
    },
    deleteButton: {
        width: 70,
        height: 30,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#6495ed',
        marginHorizontal: 5,
        elevation:5

    },
    underLineText: {
        fontSize: 15,
        color: 'white',
        textAlign: 'right',
        fontWeight: "bold"
    },
    submitButton: {
        alignSelf: 'center',
        borderWidth: 2,
        borderColor: "#6495ed",
        borderRadius: 5,
        backgroundColor: "#6495ed",
        padding: 10,
        margin: 5,
        flex: 1
    },
    buttonText: {
        fontSize: 20,
        color: "white"
    }

});

export default Medication