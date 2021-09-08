import React, { useState } from 'react'
import { StyleSheet, View, Image, Button, TextInput, TouchableOpacity, Text, ScrollView, SliderComponent } from "react-native"
import { Picker } from "@react-native-picker/picker"
import firebase from "firebase";
import '@firebase/auth';
import '@firebase/firestore';
import { RadioButton } from 'react-native-paper';

const MedicationAdd = ({ route, navigation }) => {
    const { medication, date } = route.params;
    
    const handleSubmit = () => {
        // let addedFoodList = []
        // let foodResult = []
        // for (let i = 0; i < meal.foodList.length; i++) {
        //     let it = meal.foodList[i]
        //     addedFoodList.push({ name: it.name, quantity: it.quantity, category: it.categoty, calorie: it.calorie, key: Math.random().toString(36).substring(7) })
        // }

        // firebase.firestore().collection("users")
        //     .doc(firebase.auth().currentUser.uid)
        //     .get()
        //     .then(snapshot => {
        //         //dateList: 当前数据库中所有日期的数据， array
        //         //currentDateListIndex: 当前日期的数据在dateList中的index， === -1 means dateList没有当前日期的数据
        //         //currentDateList： 当前日期的数据
        //         if (snapshot.data().dateList !== undefined) {     //有dateList attribute
        //             var dateList = snapshot.data().dateList
        //             var currentDateListIndex = dateList.findIndex((item) => item.date === date)
        //             if (currentDateListIndex >= 0) {           // dateList中有当前日期的数据    
        //                 var currentDateList = dateList[currentDateListIndex]
        //                 if (currentDateList.foodRecord != undefined) {        //如果当前日期中已经有foodrecord， 就把所有已经记录的食物存储到foodResult中
        //                     foodResult = [...currentDateList.foodRecord]
        //                 }
        //                 const updatedFoodRecord = [...foodResult, ...addedFoodList]
        //                 const updatedCurrentDateList = { ...currentDateList, foodRecord: [...updatedFoodRecord] }
        //                 dateList[currentDateListIndex] = updatedCurrentDateList
        //             } else {       //如果dateList中没有当前日期的数据，就直接添加
        //                 dateList = [...dateList, {
        //                     date: date,
        //                     key:date,
        //                     foodRecord: [...addedFoodList]
        //                 }]
        //             }
        //         } else {      //没有dateList attribute
        //             var dateList = [
        //                 {
        //                     date: date,
        //                     key: date,
        //                     foodRecord: [...addedFoodList]
        //                 }
        //             ]
        //         }
        //         firebase.firestore().collection("users")
        //             .doc(firebase.auth().currentUser.uid)
        //             .update({
        //                 dateList: [...dateList]
        //             })
        //     })
        setTimeout(() => { navigation.navigate("Medication") }, 500);

    }


    return (
        <View style={{ padding: 20, margin: 20, fontSize: 20 }}>
            <Text></Text>
            <Text></Text>
            <Text></Text>
            <Text style={{ fontSize: 20, fontWeight: "bold", marginVertical: 20 }}>{medication.medicationName}</Text>
            {medication.pillList.map((item, index) =>
                <View key={index} style={{ flexDirection: 'row', marginVertical: 10 }}>
                    <Text style={{ fontSize: 18 }}>{item.name}: {item.quantity} times/day</Text>
                </View>
            )}
            <View style={{ marginTop: 150 }}>
                <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
                    <Text style={styles.buttonText}>Update</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}
const styles = StyleSheet.create({
    text: {
        marginTop: 20,
        fontSize: 18
    },
    label: {
        fontSize: 20,
        marginBottom: 5,
        marginLeft: 5
    },
    button: {
        width: 200
    },
    submitButton: {
        alignSelf: 'center',
        borderWidth: 2,
        borderColor: "#6495ed",
        borderRadius: 5,
        backgroundColor: "#6495ed",
        padding: 10,
        margin: 5,
        alignItems: "center"
    },
    buttonText: {
        fontSize: 20,
        color: "white"
    },
    editButton: {
        alignSelf: 'center',
        fontSize: 18,
        backgroundColor: "#0066ff",
    }

});

export default MedicationAdd