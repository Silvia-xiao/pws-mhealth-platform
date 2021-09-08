import React, { useState, useEffect } from 'react'
import { useIsFocused } from '@react-navigation/native';
import { ScrollView, View, TouchableOpacity, Text, Button } from "react-native"
import style from "./style"
import * as Progress from 'react-native-progress';
import * as firebase from "firebase"
import '@firebase/auth';
import '@firebase/firestore';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Card } from 'react-native-shadow-cards';
//import {BoxShadow} from 'react-native-shadow'

const Food = ({ route, navigation }) => {
    //const currentdate = route.params;
    const [foodData, setFoodData] = useState([{ calorie: 0 }]);
    const [foodRecord, setFoodRecord] = useState(false)
    const [goal, setGoal] = useState(0);
    const isFocused = useIsFocused();
    const [date, setDate] = useState(new Date())
    const [show, setShow] = useState(false);
    const [update, setUpdate] = useState(false)


    // const shadowOpt = {
    //     width:200,
    //     height:200,
    //     color:"#000",
    //     border:2,
    //     radius:3,
    //     opacity:0.2,
    //     x:0,
    //     y:3,
    //     style:{marginVertical:5}
    // }

    useEffect(() => {
        // const unsubscribe = navigation.addListener('focus', () => {
        try {
            firebase.firestore()
                .collection('users')
                .doc(firebase.auth().currentUser.uid)
                .get()
                .then(snapshot => {
                    let data = snapshot.data()
                    let tee = data.bmr * parseFloat(data.exercise)
                    //console.log(tee)
                    let tee_pws = (0.6 * tee).toFixed()
                    // console.log(tee)
                    // console.log(tee_pws)
                    setGoal(tee_pws)
                    if (data.hasOwnProperty("dateList")) {
                        const dateList = data.dateList
                        const currentDateIndex = dateList.findIndex((item) => item.date === date.toDateString())
                        if (currentDateIndex >= 0) {
                            const currentDateList = dateList[currentDateIndex]
                            if (currentDateList.hasOwnProperty('foodRecord')) {
                                const currentDateListFoodRecord = currentDateList.foodRecord
                                setFoodRecord(true)
                                setFoodData(currentDateListFoodRecord)
                                //console.log(currentDateListFoodRecord)
                                //setFoodData(currentDateFood)
                            } else {
                                setFoodRecord(false)
                            }
                        } else {
                            setFoodRecord(false)
                        }

                    } else {
                        setFoodRecord(false)
                    }


                })

        }
        catch (err) {
            console.log(err)

        }

    }, [isFocused, update]);
    const took = Math.round((foodData.reduce((prev, item) => prev + item.calorie, 0) / 1440 * 100 + Number.EPSILON) * 100) / 100;
    // console.log("------------date--------------")
    // console.log(date.toLocaleDateString())
    // console.log(date.toDateString())

    const handleChange = (event, selectedValue) => {
        setShow(false);
        const currentDate = selectedValue || new Date();
        setDate(currentDate);
        setUpdate(!update)
    };


    const showDatePicker = () => {
        setShow(true);
    };

    return (
        <ScrollView style={{ margin: 10 }}>
            <Text></Text>
            <Text></Text>
            <Text></Text>
            <View style={{ flexDirection: "row" }}>
                <TouchableOpacity onPress={showDatePicker}>
                    <Text style={{ marginTop: 10, fontSize: 20, fontStyle: 'italic', fontWeight: "bold", marginHorizontal:10, textDecorationLine: 'underline', color: '#3399ff'}}>{date.toDateString()}</Text>
                </TouchableOpacity>
                {/* <Text style={{ marginTop: 10, fontSize: 20, fontStyle: 'italic', fontWeight: "bold" }}>Today is: {date.toDateString()}</Text>
                <TouchableOpacity onPress={showDatePicker} style={{
                    alignSelf: 'center',
                    borderWidth: 2,
                    borderColor: "#6495ed",
                    borderRadius: 5,
                    backgroundColor: "#6495ed",
                    padding: 5,
                    marginHorizontal: 10
                }}>
                    <Text style={style.buttonText}>Change Date</Text>
                </TouchableOpacity> */}
            </View>

            {show && (
                <DateTimePicker
                    value={date}
                    mode={"date"}
                    display='default'
                    onChange={handleChange}
                />
            )}
            
            {foodRecord ?
                <ScrollView contentContainerStyle={style.contentContainer}>
                    <Text style={style.progressBar}>Calorie Intake Goal</Text>
                    <Text style={{ alignSelf: 'flex-end', marginRight: 10, fontSize: 18 }}>Goal: {goal}kcal</Text>
                    <Text style={{ fontSize: 18 }}>Already take {Math.round((foodData.reduce((prev, item) => prev + item.calorie, 0) / goal * 100 + Number.EPSILON) * 100) / 100} %</Text>
                    <View>
                        {took >= 100 ?
                            <Progress.Bar color="rgba(245, 171, 53, 1)" progress={foodData.reduce((prev, item) => prev + item.calorie, 0) / goal} width={300} height={20} />
                            : <Progress.Bar progress={foodData.reduce((prev, item) => prev + item.calorie, 0) / goal} width={300} height={20} />
                        }
                    </View>
                    {/* <Progress.Bar progress={foodData.reduce((prev,item) =>  prev + item.calorie, 0) / 1440} width={300} height={20} /> */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 340 }}>
                        <Text>0%</Text>
                        <Text>100%</Text>
                    </View>
                    <Text></Text>
                    {foodData.filter(item => item.category === 'Fruit').length === 0 ? <></> :
                        <Card style={style.card} elevation={5}>
                            <Text style={style.itemText}>Fruit:</Text>
                            {
                                foodData.filter(item => item.category === 'Fruit').map((item, index) => (
                                    <Text style={style.food} key={index.toString()}>{item.name + ": " + item.quantity + "g  " + item.calorie + "kcal"}</Text>
                                ))
                            }
                        </Card>
                    }
                    {foodData.filter(item => item.category === 'Vegetable').length === 0 ? <></> :
                        <Card style={style.card} elevation={5}>
                            <Text style={style.itemText}>Vegetable:</Text>
                            {
                                foodData.filter(item => item.category === 'Vegetable').map((item, index) => (
                                    <Text style={style.food} key={index.toString()}>{item.name + ": " + item.quantity + "g  " + item.calorie + "kcal"}</Text>
                                ))
                            }
                        </Card>
                    }
                    {foodData.filter(item => item.category === 'Staple').length === 0 ? <></> :
                        <Card style={style.card} elevation={5}>
                            <Text style={style.itemText}>Staple:</Text>
                            {
                                foodData.filter(item => item.category === 'Staple').map((item, index) => (
                                    <Text style={style.food} key={index.toString()}>{item.name + ": " + item.quantity + "g  " + item.calorie + "kcal"}</Text>
                                ))
                            }
                        </Card>
                    }
                    {foodData.filter(item => item.category === 'Protein').length === 0 ? <></> :
                        <Card style={style.card} elevation={5}>
                            <Text style={style.itemText}>Protein:</Text>
                            {
                                foodData.filter(item => item.category === 'Protein').map((item, index) => (
                                    <Text style={style.food} key={index.toString()}>{item.name + ": " + item.quantity + "g  " + item.calorie + "kcal"}</Text>
                                ))
                            }
                        </Card>
                    }
                    {foodData.filter(item => item.category === 'Diary').length === 0 ? <></> :
                        <Card style={style.card} elevation={5}>
                            <Text style={style.itemText}>Diary:</Text>
                            {
                                foodData.filter(item => item.category === 'Diary').map((item, index) => (
                                    <Text style={style.food} key={index.toString()}>{item.name + ": " + item.quantity + "g  " + item.calorie + "kcal"}</Text>
                                ))
                            }
                        </Card>
                    }
                    {foodData.filter(item => item.category === 'Sweet').length === 0 ? <></> :
                        <Card style={style.card} elevation={5}>
                            <Text style={style.itemText}>Sweet:</Text>
                            {
                                foodData.filter(item => item.category === 'Sweet').map((item, index) => (
                                    <Text style={style.food} key={index.toString()}>{item.name + ": " + item.quantity + "g  " + item.calorie + "kcal"}</Text>
                                ))
                            }
                        </Card>
                    }
                </ScrollView> :
                <ScrollView contentContainerStyle={style.contentContainer}>
                    <Text style={style.progressBar}>Calorie Intake Goal</Text>
                    <Text style={{ alignSelf: 'flex-end', marginRight: 10, fontSize: 18 }}>Goal:{goal}kcal</Text>
                    <Text>Already take 0 %</Text>
                    <Progress.Bar progress={0} width={300} height={20} />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 340 }}>
                        <Text>0%</Text>
                        <Text>100%</Text>
                    </View>
                    <Text></Text>
                    <Text style={{fontSize: 20, fontWeight: "bold",marginHorizontal: 30,marginVertical: 20 , color: "grey", alignSelf: "baseline"}}>No food record yet!</Text>
                    <Text style={{fontSize: 20, fontWeight: "bold",marginHorizontal: 30,marginBottom: 20 , color: "grey"}}>Please click the "Add Food" button to make your first food reocrd!</Text>
                </ScrollView>
            }

            <TouchableOpacity
                onPress={() => navigation.navigate("FoodSelection", { date: date.toDateString() })}
                style={style.addButton}
            >
                <Text style={{ fontWeight: "bold", fontSize: 24, color:"#ffffff" }}>ADD</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}


export default Food;