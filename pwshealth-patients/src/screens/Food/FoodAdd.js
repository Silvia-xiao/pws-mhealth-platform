import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Image, Button, TextInput, TouchableOpacity, Text, ScrollView } from "react-native"
import { Picker } from "@react-native-picker/picker"
import style from "./style";
import firebase, { firestore } from "firebase";
import '@firebase/auth';
import '@firebase/firestore';
import { RadioButton } from 'react-native-paper';
import { Card } from 'react-native-shadow-cards';

const FoodAdd = ({ route, navigation }) => {
    const { id, image, label, calorie, date, carb } = route.params;
    const [selectedLanguage, setSelectedLanguage] = useState("1");
    const [value, setValue] = React.useState('Fruit');


    const calculation = () => {
        let foodResult = []     //存储当前日期的foodlist中已有的食物
        let dateList = []
        //let currentDateFoodList = []
        let cal = parseFloat(selectedLanguage) * calorie;
        console.log(selectedLanguage)
        console.log(cal)
        let quantity = parseFloat(selectedLanguage) * 100;
        firebase.firestore().collection("users")
            .doc(firebase.auth().currentUser.uid)
            .get()
            .then(snapshot => {
                //dateList: 当前数据库中所有日期的数据， array
                //currentDateListIndex: 当前日期的数据在dateList中的index， === -1 means dateList没有当前日期的数据
                //currentDateList： 当前日期的数据
                if (snapshot.data().dateList !== undefined) {     //有dateList attribute
                    dateList = snapshot.data().dateList
                    let currentDateListIndex = dateList.findIndex((item) => item.date === date)
                    if (currentDateListIndex >= 0) {           // dateList中有当前日期的数据    
                        let currentDateList = dateList[currentDateListIndex]
                        if (currentDateList.foodRecord != undefined) {        //如果当前日期中已经有foodrecord， 就把所有已经记录的食物存储到foodResult中
                            foodResult = [...currentDateList.foodRecord]
                        }
                        const updatedFoodRecord = [...foodResult, { name: label, quantity: quantity, category: value, calorie: cal,carb: carb, key: Math.random().toString(36).substring(7) }]
                        const updatedCurrentDateList = { ...currentDateList, foodRecord: [...updatedFoodRecord] }
                        dateList[currentDateListIndex] = updatedCurrentDateList
                    } else {       //如果dateList中没有当前日期的数据，就直接添加
                        dateList = [...dateList, {
                            date: date,
                            key:date,
                            foodRecord: [{ name: label, quantity: quantity, category: value, calorie: cal, carb: carb, key: Math.random().toString(36).substring(7) }]
                        }]
                    }
                } else {      //没有dateList attribute
                    dateList = [
                        {
                            date: date,
                            key:date,
                            foodRecord: [{ name: label, quantity: quantity, category: value, calorie: cal,carb: carb, key: Math.random().toString(36).substring(7) }]
                        }
                    ]
                }
                firebase.firestore().collection("users")
                        .doc(firebase.auth().currentUser.uid)
                        .update({
                            dateList: [...dateList]
                        })
                setTimeout(() => { navigation.navigate("Food") }, 1000);

            })
    }

    return (
        <View style={{ padding: 10 }}>
            <ScrollView>
                <Text></Text>
                <Text></Text>
                <Text></Text>
                <Text></Text>
                <Text></Text>
                    <Image style={style.largerImage} source={{ uri: image }} />
                    <Text style={style.imageText}>{label}</Text>
                    <Text style={style.imageText}>{calorie} kcal/100g</Text>
                
                <Text style={styles.text}>Quantity:</Text>
                <View style={{borderWidth:0.5, borderRadius:5, width:340,marginLeft:25}}>
                    <Picker 
                    selectedValue={selectedLanguage}
                    onValueChange={(itemValue, itemIndex) =>
                        setSelectedLanguage(itemValue)
                    }>
                    <Picker.Item label="100g" value="1" />
                    <Picker.Item label="150g" value="1.5" />
                    <Picker.Item label="200g" value="2" />
                    <Picker.Item label="250g" value="2.5" />
                    <Picker.Item label="300g" value="3" />
                    </Picker>
                </View>
                
                <Text style={styles.text}>Category:</Text>
                <View>
                    <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.category}>Fruit</Text>
                            <RadioButton value="Fruit" />
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.category}>Vegetable</Text>
                            <RadioButton value="Vegetable" />
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.category}>Protein</Text>
                            <RadioButton value="Protein" />
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.category}>Dairy</Text>
                            <RadioButton value="Dairy" />
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.category}>Staple</Text>
                            <RadioButton value="Staple" />
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.category}>Sweet</Text>
                            <RadioButton value="Sweet" />
                        </View>
                    </View>
                    </RadioButton.Group>
                </View>
                


                <View style={{ marginTop: 50, marginLeft: 100, marginRight: 100 }}>
                    {/* <Button styles={styles.button} title="Submit" onPress={() => {

                        calculation()
                    }}/> */}
                    <View style={{ flexDirection: "row" }}>
                        <TouchableOpacity onPress={calculation} style={styles.submitButton}>
                            <Text style={styles.buttonText}>Submit</Text>
                        </TouchableOpacity>
                        <Text></Text>
                        {/* <Button styles={styles.button} title="Cancel" onPress={() => navigation.navigate('FoodSelection',{date: date})}/> */}
                        <TouchableOpacity onPress={() => navigation.navigate('FoodSelection', { date: date })} style={styles.submitButton}>
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>

                </View>

            </ScrollView>

        </View>
    )
}
const styles = StyleSheet.create({
    text: {
        marginTop: 20,
        marginBottom: 5,
        fontSize: 20,
        fontWeight: "bold",
        alignSelf:'center'
    },
    category: {
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
        borderRadius: 10,
        backgroundColor: "#6495ed",
        padding: 10,
        margin: 5,
        elevation:5
    },
    buttonText: {
        fontSize: 20,
        color: "white"
    }

});

export default FoodAdd