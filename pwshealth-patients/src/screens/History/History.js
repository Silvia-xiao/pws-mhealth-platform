import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Dimensions, Image, Button, TextInput, TouchableOpacity, Text, ScrollView, SliderComponent } from "react-native"
import { Picker } from "@react-native-picker/picker"
import firebase from "firebase";
import '@firebase/auth';
import '@firebase/firestore';
import { RadioButton } from 'react-native-paper';
import { LineChart, PieChart } from "react-native-chart-kit";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Card } from 'react-native-shadow-cards';
const screenWidth = Dimensions.get("window").width;

const History = ({ navigation }) => {
    const [wholeData, setWholeData] = useState({})
    const [date, setDate] = useState(new Date())
    const [show, setShow] = useState(false);
    const [calorieData, setCalorieData] = useState({
        labels: ["1"],
        datasets: [
            {
                data: [1]
            }
        ]
    })

    const [weightData, setWeightData] = useState({
        labels: ["1"],
        datasets: [
            {
                data: [1]
            }
        ]
    })
    const [foodData, setFoodData] = useState()
    const [foodRecord, setFoodRecord] = useState(false)



    const chartConfig = {
        backgroundGradientFrom: "#FFFFFF",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#FFFFFF",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(54,118,232, ${opacity})`,
        strokeWidth: 5, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
    };

    const handleChange = (event, selectedValue) => {
        setShow(false);
        const currentDate = selectedValue || new Date();
        setDate(currentDate);
    };
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
                    setWholeData(data)
                    if (data.dateList != undefined) {
                        const dateList = data.dateList
                        let calorie_x = []
                        let calorie_y = []
                        let weight_x = []
                        let weight_y = []
                        for (let i = 0; i < dateList.length; i++) {
                            const item = dateList[i]
                            if (item.hasOwnProperty("calorie_daily")) {
                                calorie_x.push(item.date.slice(0, 3))
                                calorie_y.push(item.calorie_daily-1000)
                            }
                        }
                        for (let i = 0; i < dateList.length; i++) {
                            const item = dateList[i]
                            if (item.hasOwnProperty("weight")) {
                                weight_x.push(item.date.slice(0, 3))
                                weight_y.push(item.weight)
                            }
                        }
                        setCalorieData({
                            labels: calorie_x,
                            datasets: [
                                {
                                    data: calorie_y
                                }
                            ]
                        })
                        setWeightData({
                            labels: weight_x,
                            datasets: [
                                {
                                    data: weight_y
                                }
                            ]
                        })
                        // const currentDateIndex = dateList.findIndex((item) => item.date === date.toDateString())
                        // if (currentDateIndex >= 0) {
                        //     const currentDateList = dateList[currentDateIndex]
                        //     console.log(currentDateList)
                        //     if (currentDateList.hasOwnProperty('foodRecord')) {
                        //         var currentDateListFoodRecord = currentDateList.foodRecord
                        //         currentDateListFoodRecord = currentDateListFoodRecord.map(item => {
                        //             item.name = item.name
                        //             item.calorie = item.calorie * (item.quantity / 100)
                        //             item.color = Math.floor(Math.random() * 16777215).toString(16)
                        //             item.legendFontColor = "#7F7F7F"
                        //             item.legendFontSize = 15
                        //         })
                        //         setFoodRecord(true)
                        //         setFoodData(currentDateListFoodRecord)

                        //     } else {
                        //         setFoodRecord(false)
                        //     }
                        // } else {
                        //     setFoodRecord(false)
                        // }


                    }
                })
        }
        catch (err) {
            console.log(err)

        }

    }, [])

    return (
        <ScrollView contentContainerStyle={styles.contentContainer}>
            <Text></Text>
            <Text></Text>
            <Text></Text>
            <Text style={{fontSize:24,fontWeight: 'bold'}} >Data Visualization</Text>
            <View style={{flexDirection: "row", justifyContent: "center",marginTop:10}}>
                    <TouchableOpacity onPress={() => setClick('Common')} style={styles.submitButton}>
                        <Text style={styles.buttonText}>Weekly</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setClick('Meal')} style={styles.submitButton}>
                        <Text style={styles.buttonText}>Monthly</Text>
                    </TouchableOpacity>
                </View>
            
            <Card
                style={{ padding: 10, margin: 10 }}
                elevation={8}
            >
                <Text style={{ fontSize: 18, fontWeight: "bold", alignSelf: "center" }}>Weekly Calorie Consumption Report</Text>
                <LineChart
                    data={calorieData}
                    width={300}
                    height={250}
                    chartConfig={chartConfig}
                />
            </Card>
            <Card
                style={{ padding: 10, margin: 10 }}
                elevation={10}
            >
                <Text style={{ fontSize: 18, fontWeight: "bold", alignSelf: "center" }}>Weekly Weight Report</Text>
                <LineChart
                    data={weightData}
                    width={300}
                    height={250}
                    chartConfig={chartConfig}
                />
            </Card>
            {/* <View>
                <Text>Food</Text>
                <TouchableOpacity onPress={showDatePicker}>
                    <Text style={{ marginTop: 10, fontSize: 20, fontStyle: 'italic', fontWeight: "bold" }}>{date.toDateString()}</Text>
                </TouchableOpacity>
                {show && (
                    <DateTimePicker
                        value={date}
                        mode={"date"}
                        display='default'
                        onChange={handleChange}
                    />
                )}
                { === false ?
                    <Text>No food data for chosen date.</Text>
                    : <PieChart
                        data={foodData}
                        width={screenWidth}
                        height={screenWidth}
                        chartConfig={chartConfig}
                        accessor={"calorie"}
                        backgroundColor={"transparent"}
                        paddingLeft={"15"}
                        center={[10, 50]}
                        absolute
                    />
                }

            </View> */}


        </ScrollView>
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
        borderRadius: 8,
        backgroundColor: "#6495ed",
        padding: 10,
        margin: 5,
        elevation: 5,
        alignItems:"center",
        justifyContent: "center",
        height:45
    },
    buttonText: {
        fontSize: 20,
        color: "white"
    },
    editButton: {
        alignSelf: 'center',
        fontSize: 18,
        backgroundColor: "#0066ff",
    },
    viewShadow: {
        // elevation:1.5,
        // shadowColor: "grey",
        // shadowOffset:{width:1,height:1},
        // shadowOpacity: 1,
        // shadowRadius: 1.5,
        marginTop: 20,
        alignItems: "center"
        // borderColor: "grey"

    },
    contentContainer: {
        alignItems: "center"
    }


});

export default History