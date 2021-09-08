import React, { useState } from 'react'
import { useIsFocused } from '@react-navigation/native';
import { View, Button, Image, TouchableOpacity, Text, ScrollView, StyleSheet } from "react-native"
import style from "./style"
import * as firebase from "firebase"
import InitialSetting from './InitialSetting';
import { useEffect } from 'react/cjs/react.development';
import { Card } from 'react-native-shadow-cards';

const Homepage = ({ navigation }) => {
    const [exercise, setExercise] = useState("Exercise");
    const [advice, setAdvice] = useState();
    const [userName, setUserName] = useState();
    //const [degree, setDegree] = useState(0);
    //const [bmiDegree, setBmiDegree] = useState();
    //const [calorieDegree, setCalorieDegree] = useState();
    //const [confidence, setConfidence] = useState();
    //const [situation, setSituation] = useState();
    const weight = 0.5;
    const threshold = 0.8;
    const isFocused = useIsFocused();
    let rangeCalorieNeg = [0, 0, 250, 750];//add 1000 to calorie_daily for easy calculation
    let rangeCalorieBal = [250, 750, 1250, 1750];
    let rangeCaloreiPos = [1250, 1750, 0, 0];
    const onLogOut = () => {
        firebase.auth().signOut();
    }

    const calculateDegree = (range, value) => {
        let d = 0
        if (range[0] == range[1])//double check for left open, only with one shoulder
        {
            d = Math.max(Math.min((range[3] - value) / (range[3] - range[2]), 1), 0);
            //setDegree(d);
        }
        else if (range[0] != range[1] && (range[2] != range[3])) {
            //degree=Math.max(Math.min(((value-range[0])/(range[1]-range[0]))    ));
            if (value < range[0] || value > range[3]) {
                //setDegree(0);
                d = 0
            }
            if (value >= range[1] && value <= range[2]) {
                //setDegree(1);
                d = 1
            }
            if (value >= range[0] && value < range[1]) {
                d = (value - range[0]) / (range[1] - range[0]);
                //setDegree(d);
            }
            if (value > range[2] && value <= range[3]) {
                d = (range[3] - value) / (range[3] - range[2]);
                //setDegree(d);
            }
        }
        else if (range[2] == range[3])//type=rightopen, only with one shoulder
        {
            d = Math.max(Math.min((value - range[0]) / (range[1] - range[0]), 1), 0);
            //setDegree(d);
        }
        return d
    }

    const getBMIDegree = (bmi,rangeBMIBalance,rangeBMILow,rangeBMIHigh) => {
        let bmiDegree = 0
        if (bmi <= rangeBMIBalance[0]) {
            const degree = calculateDegree(rangeBMILow, bmi);
            //setBmiDegree(d);
            bmiDegree = degree
        }
        if (bmi > rangeBMIBalance[0] && bmi < rangeBMIBalance[1]) {
            const degree = calculateDegree(rangeBMILow, bmi);
            let d1 = degree;
            const degree2 = calculateDegree(rangeBMIBalance, bmi);
            let d2 = degree2;
            //setBmiDegree(Math.max(d1, d2));
            bmiDegree = Math.max(d1, d2)
        }
        if (bmi >= rangeBMIBalance[1] && bmi <= rangeBMIBalance[2]) {
            const degree = calculateDegree(rangeBMIBalance, bmi);
            //setBmiDegree(degree);
            bmiDegree = degree
        }
        if (bmi > rangeBMIBalance[2] && bmi < rangeBMIBalance[3]) {
            const degree = calculateDegree(rangeBMIBalance, bmi);
            let d1 = degree;
            const degree2 = calculateDegree(rangeBMIHigh, bmi);
            let d2 = degree2;
            //setBmiDegree(Math.max(d1, d2));
            bmiDegree = Math.max(d1, d2)
        }
        if (bmi >= rangeBMIBalance[3]) {
            const degree = calculateDegree(rangeBMIHigh, bmi);
            //setBmiDegree(degree);
            bmiDegree = degree
        }
        return bmiDegree
    }
    const getCalorieDegree = (calorie) => {
        let calorieDegree = 0
        if (calorie <= 250) {
            const degree = calculateDegree(rangeCalorieNeg, calorie);
            //setCalorieDegree(degree);
            calorieDegree = degree
        }
        if (calorie > 250 && calorie < 750) {
            const degree = calculateDegree(rangeCalorieNeg, calorie);
            let d1 = degree;
            const degree2 = calculateDegree(rangeCalorieBal, calorie);
            let d2 = degree2;
            //setCalorieDegree(Math.max(d1, d2));
            calorieDegree = Math.max(d1, d2)
        }
        if (calorie >= 750 && calorie <= 1250) {
            const degree = calculateDegree(rangeCalorieBal, calorie);
            //setCalorieDegree(degree);
            calorieDegree = degree
        }
        if (calorie > 1250 && calorie < 1750) {
            const degree = calculateDegree(rangeCalorieBal, calorie);
            let d1 = degree;
            const degree2 = calculateDegree(rangeCaloreiPos, calorie);
            let d2 = degree;
            //setCalorieDegree(Math.max(d1, d2));
            calorieDegree = Math.max(d1, d2)
        }
        if (calorie >= 1750) {
            const degree = calculateDegree(rangeCaloreiPos, calorie);
            //setCalorieDegree(degree);
            calorieDegree = degree
        }
        return calorieDegree
    }

    const getSituation = (confidence,bmi,range, calorie) => {
        let situation = 0
        if (bmi <= range[0]) {
            if (calorie<=250){
                //setSituation(5);
                situation = 5
            }
            if (calorie > 250 && calorie <= 500){
                // setSituation(5);
                situation = 5
            }
            if (calorie > 500 && calorie <= 750){
                //setSituation(4);
                situation = 4
            }
            if (calorie > 750 && calorie <= 1500){
                //setSituation(4);
                situation = 4
            }
            if (calorie > 1500){
                //setSituation(4);
                situation = 4
            }
        }
        if (bmi <= range[0]+1 && bmi > range[0]) {//low bmi
            if (calorie<=250){
                //setSituation(5);
                situation = 5
            }
            if (calorie > 250 && calorie <= 500){
                //setSituation(5);
                situation = 5
            }
            if (calorie > 500 && calorie <= 750 && confidence < 0.8){
                //setSituation(5);
                situation = 5
            }
            if(calorie > 500 && calorie <= 750 && confidence >= 0.8){
                //setSituation(5);
                situation = 5
            }
            if(calorie > 750){
                //setSituation(4);
                situation = 4
            }
        }
        if (bmi > range[0]+1 && bmi < range[0]+2) {
            if (calorie<=250){
                //setSituation(4);
                situation = 4
            }
            if (calorie > 250 && calorie <= 500 && confidence < 0.8){
                //setSituation(5);
                situation = 5
            }
            if (calorie > 250 && calorie <= 500 && confidence >= 0.8){
                //setSituation(4);
                situation = 4
            }
            if(calorie > 500 && calorie <= 750 && confidence < 0.8){
                //setSituation(4);
                situation = 4
            }
            if(calorie > 500 && calorie <= 750 && confidence >= 0.8){
                //setSituation(3);
                situation = 3
            }
            if(calorie > 750){
                //setSituation(3);
                situation = 3
            }
        }
        if (bmi >= range[0]+2 && bmi <= range[1]) {
            if (calorie<=250){
                //setSituation(3);
                situation = 3
            }
            if (calorie > 250 && calorie <= 500 && confidence < 0.8){
                //setSituation(4);
                situation = 4
            }
            if (calorie > 250 && calorie <= 500 && confidence >= 0.8){
                //setSituation(3);
                situation = 3
            }
            if(calorie > 500 && calorie <= 750 && confidence < 0.8){
                //setSituation(3);
                situation = 3
            }
            if(calorie > 500 && calorie <= 750 && confidence >= 0.8){
                //setSituation(3);
                situation = 3
            }
            if(calorie > 750){
                //setSituation(3);
                situation = 3
            }
        }
        if (bmi > range[1] && bmi < range[1]+1) {
            if (calorie<=250){
                //setSituation(4);
                situation = 4
            }
            if (calorie > 250 && calorie <= 500 && confidence < 0.8){
                //setSituation(3);
                situation = 3
            }
            if (calorie > 250 && calorie <= 500 && confidence >= 0.8){
                //setSituation(4);
                situation = 4
            }
            if(calorie > 500 ){
                //setSituation(3);
                situation = 3
            }
        }
        if (bmi > range[1]+1 && bmi < range[1]+2) {
            if (calorie<=250 && confidence < 0.8){
                //setSituation(3);
                situation = 3
            }
            if (calorie<=250 && confidence >= 0.8){
                //setSituation(2);
                situation = 2
            }
            if(calorie > 250 && calorie <= 1500){
                //setSituation(2);
                situation = 2
            }
            if(calorie > 1500 && calorie <= 1750 && confidence < 0.8){
                //setSituation(2);
                situation = 2
            }
            if(calorie > 1500 && calorie <= 1750 && confidence >= 0.8){
                //setSituation(1);
                situation = 1
            }
            if(calorie >=1750){
                //setSituation(1);
                situation = 1
            }
        }
        if (bmi >= range[1]+2){
            if (calorie<=1250){
                //setSituation(2);
                situation = 2
            }
            if(calorie > 1250 && calorie < 1500 && confidence >= 0.8){
                //setSituation(2);
                situation = 2
            }
            if(calorie > 1250 && calorie < 1500 && confidence < 0.8){
                //setSituation(1);
                situation = 1
            }
            if(calorie >= 1500 ){
                //setSituation(1);
                situation = 1
            }
        }
        return situation
    }
    const getConfidence = (bmiDegree,calorieDegree) => {
        return bmiDegree * weight + calorieDegree * weight
    }
    useEffect(() => {
        firebase.firestore()
            .collection('users')
            .doc(firebase.auth().currentUser.uid)
            .get()
            .then(snapshot => {
                let data = snapshot.data();
                let tee = data.bmr * parseFloat(data.exercise)
                console.log('exercise'+data.exercise)
                console.log('tee' + tee)
                let tee_pws = 0.6 * tee
                console.log('tee_pws' + tee_pws)
                // let calorie_daily = typeof data.foodRecord === "undefined" ? (0 - tee_pws) : (data.foodRecord.reduce((prev, item) => prev + item.calorie, 0) - tee_pws)
                // calorie_daily += 1000;
                let calorie_daily = 0
                let carb = 0
                let condition = snapshot.data().condition
                if (snapshot.data().dateList !== undefined) {
                    dateList = snapshot.data().dateList
                    let currentDateListIndex = dateList.findIndex((item) => item.date === new Date().toDateString())
                    if (currentDateListIndex >= 0) {
                        let currentDateList = dateList[currentDateListIndex]
                        if (currentDateList.foodRecord != undefined) {
                            calorie_daily = currentDateList.foodRecord.reduce((prev, item) => prev + item.calorie, 0) - tee_pws
                            carb = currentDateList.foodRecord.reduce((prev, item) => prev + item.carb, 0)
                        } else {
                            calorie_daily = 0 - tee_pws
                        }
                    } else {
                        calorie_daily = 0 - tee_pws
                    }
                } else {
                    calorie_daily = 0 - tee_pws
                }
                console.log('calorignal' + calorie_daily + "/ carb: " + carb)
                calorie_daily += 1000;
                let age = data.age;
                let bmi = data.bmi;
                const gender = data.gender;
                let threshold = 0.8;
                // age > 20
                let rangeBMIBalance20 = [17.5, 19.5, 24, 26];
                let rangeBMILow20 = [0, 0, 17.5, 19.5];
                let rangeBMIHigh20 = [24, 26, 0, 0];
                // age  = 2 - 20 / male 
                let rangeBMIBalanceMale = [[13.8, 15.8, 17.1, 19.1],[13.4, 15.4, 16.4, 18.4],[13,15,16,18],[12.8, 14.8,15.8, 17.8],[12.7, 14.7, 16, 18], [12.7, 14.7, 16.4, 18.4], [12.8, 14.8, 17, 19],[12.8, 14.8, 17.6, 19.6],[13.2, 15.2, 18.4, 20.4], [13.6, 15.6, 19.2, 21.2],[14, 16, 20, 22]
            [14.4, 16.4, 20.8, 22.8], [15, 17, 21.6, 23.6], [15.5, 17.5, 22.4, 24.4], [16.1, 18.1, 23.2, 25.2], [16.7, 18.7, 23.9, 25.9], [17.2, 19.2, 24.6, 26.6], [17.7, 19.7, 25.3, 27.3], [18.1, 20.1, 26, 28]]
                let rangeBMILowMale = [[0,0,13.8,15.8], [0,0, 13.4, 15.4],[0,0,13,15], [0,0,12.8, 14.8], [0,0,12.7, 14.7], [0,0,12.7, 14.7],[0,0, 12.8, 14.8],[0,0, 12.8, 14.8],[0,0,13.2, 15.2],[0,0, 13.6, 15.6], [0,0, 14,16], [0,0, 14.4, 16.4],[0,0, 15,17], [0,0, 15.5,17.5],[0,0, 16.1, 18.1],
            [0,0, 16.7, 18.7], [0,0, 17.2, 19.2],[0,0, 17.7, 19.7], [0,0,18.1,20.1]]
                let rangeBMIHighMale = [[17.1, 19.1,0,0], [16.4, 18.4,0,0], [16,18,0,0],[15.8, 17.8,0,0],[16, 18, 0,0],[16.4, 18.4,0,0],[17, 19, 0,0],[17.6, 19.6,0,0],[18.4, 20.4,0,0],[19.2, 21.2, 0,0],[20,22,0,0],[20.8, 22.8,0,0],[21.6, 23.6,0,0],[22.4, 24.4,0,0],[23.2, 25.2,0,0],[23.9, 25.9,0,0],
            [24.6, 26.6,0,0],[25.3, 27.3,0,0],[26,28,0,0]]
                // age  = 2 - 20 / female 
                let rangeBMIBalanceFemale = [[13.4, 15.4, 18.1, 20.1], [13, 15, 16.2, 18.2], [12.7, 14.7, 15.8, 17.8], [12.5, 14.5,15.8, 17.8], [12.4, 14.4, 16.1, 18.1],[12.4, 14.4, 16.6, 18.6],[12.5,14.5,17.3,19.3], [12.7, 14.7, 18.1, 20.1], [13,15,18.9, 20.9],[13.2, 15.2, 19.8, 21.8], [13.8, 15.8, 20.7, 22.7], [14.3, 16.3, 21.6, 23.6],
            [14.8, 16.8, 22.3, 24.3], [15.3, 17.3, 23, 25], [15.8, 17.8, 23.6, 25.6], [16.2, 18.2, 24.2, 26.2], [16.6, 18.6, 24.6, 26.6],[16.8, 18.8, 25.1, 27.1],[16.8, 18.8, 25.5, 27.5]]
                let rangeBMILowFemale = [[0,0,13.4, 15.4],[0,0,13,15], [0,0,12.7, 14.7], [0,0,12.5, 14.5], [0,0,12.4, 14.4], [0,0,12.4, 14.4],[0,0,12.5,14.5],[0,0,12.7,14.7],[0,0,13,15],[0,0,13.2, 15.2],[0,0,13.8,15.8],[0,0,14.3,16.3], [0,0,14.8, 16.8], [0,0,15.3, 17.3], [0,0,15.8, 17.8],[0,0,16.2, 18.2],
            [0,0, 16.6,18.6], [0,0,16.8, 18.8],[0,0,16.8, 18.8]]
                let rangeBMIHighFemale = [[18.1, 20.1,0,0], [16.2, 18.2,0,0], [15.8, 17.8,0,0], [15.8, 17.8,0,0],[16.1,18.1,0,0], [16.6,18.6,0,0], [17.3,19.3,0,0],[18.1,20.1,0,0],[18.9, 20.9,0,0], [19.8, 21.8, 0,0],[20.8, 22.8,0,0], [20.7, 22.7, 0,0], [21.6, 23.6,0,0],[22.3, 24.3,0,0],[22, 24, 0,0],[23.6,25.6,0,0],
            [24.2,26.2,0,0],[24.6, 26.6,0,0],[25.1,27.1,0,0],[25.5, 27.5,0,0]]

                let bmiDegree = 0
                // get BMI degree
                if (age > 20){
                    bmiDegree = getBMIDegree(bmi,rangeBMIBalance20,rangeBMILow20,rangeBMIHigh20);
                } else {
                    if (gender === "Female"){
                        bmiDegree = getBMIDegree(bmi,rangeBMIBalanceFemale[age - 2],rangeBMILowFemale[age - 2],rangeBMIHighFemale[age - 2]);
                    } else {
                        bmiDegree = getBMIDegree(bmi,rangeBMIBalanceMale[age - 2],rangeBMILowMale[age - 2],rangeBMIHighMale[age - 2]);
                    }
                }
                
                setUserName(data.name);
                const calorieDegree = getCalorieDegree(calorie_daily);
                console.log("calorie_daily " + calorie_daily);
                console.log("calDegree " + calorieDegree);
                console.log("bmiDegree " + bmiDegree);
                const confidence = getConfidence(bmiDegree, calorieDegree);
                console.log("confidence " + confidence);

                let sit = 0
                if (age > 20){
                    sit = getSituation(confidence,bmi,[rangeBMIBalance20[0], rangeBMIBalance20[2]],calorie_daily);
                } else {
                    if (gender === "Female"){
                        sit = getSituation(confidence,bmi,[rangeBMIBalanceFemale[age-2][0], rangeBMIBalanceFemale[age-2][2]],calorie_daily);
                    } else {
                        sit = getSituation(confidence,bmi,[rangeBMIBalanceMale[age-2][0], rangeBMIBalanceMale[age-2][2]],calorie_daily);
                    }
                }
                console.log("sit " + sit)
                if (sit===5) {
                    setAdvice("Too slim is also not a healthy condition:)")
                }
                if (sit===4) {
                    setAdvice("Awesome! You are doing really great, keep this healthy way! Just do not be too slim:)")
                }
                if (sit===3) {
                    setAdvice("Awesome! You are doing really great, keep this healthy way!")
                }
                if (sit===2) {
                    setAdvice("Wow, you achieved a balanced diet, but maybe lose weight a bit can help you become healthier.")
                }
                if (sit===1) {
                    setAdvice("Hey, losing some weight might help you be healthier! Why not give it a try?")
                }
                if (carb > 25 && condition.includes("Diabetes") && sit===1) {
                    setAdvice("Hi, losing weight is necessary now, also eating more vegetables and less staple will be better for Diabetes!")
                }
                // if(data.hasOwnProperty("medicatoinList") ){
                //     const sample = data.medicationList.filter(item => item.medicationName === "Diabetes")
                //     if (sample.length > 0){

                //     }
                // }
                let dateList = []
                if (snapshot.data().dateList !== undefined) {     //有dateList attribute
                    dateList = snapshot.data().dateList
                    let currentDateListIndex = dateList.findIndex((item) => item.date === new Date().toDateString())
                    if (currentDateListIndex >= 0) {           // dateList中有当前日期的数据    
                        let currentDateList = dateList[currentDateListIndex]
                        currentDateList.calorie_daily = calorie_daily
                        dateList[currentDateListIndex] = currentDateList
                    } else {       //如果dateList中没有当前日期的数据，就直接添加
                        dateList = [...dateList, {
                            date: new Date().toDateString(),
                            key: new Date().toDateString(),
                            calorie_daily: calorie_daily
                        }]
                    }
                } else {      //没有dateList attribute
                    dateList = [
                        {
                            date: new Date().toDateString(),
                            key: new Date().toDateString(),
                            calorie_daily: calorie_daily
                        }
                    ]
                }

                firebase.firestore().collection("users")
                    .doc(firebase.auth().currentUser.uid)
                    .update({
                        dateList: [...dateList]
                    })



            })
    }, [isFocused])
    //console.log(situation)
    // console.log(calorieDegree)


    return (
        <View>
            <ScrollView>
                <View>
                    <Text></Text>
                    <Text></Text>
                    <Text></Text>
                    <View style={style.recommondationBoard}>
                        <Text style={style.recommendationTitle}>Hi {userName}</Text>
                        <Text style={style.recommendation}>{advice}</Text>
                    </View>
                </View>
                <View>

                </View>
                <View style={style.row}>
                    <TouchableOpacity onPress={() => navigation.navigate("Food")}>
                        <Card style={style.card} elevation={10}>
                            <Image style={style.itemimage}
                                source={require("../../../assets/food.png")}
                            />
                            <Text style={style.itemText}>Food</Text>
                        </Card>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("Exercise")} >
                        <Card style={style.card} elevation={10}>
                            <Image style={style.itemimage}
                                source={require("../../../assets/exercise.png")}
                            />
                            <Text style={style.itemText}>Exercise</Text>
                        </Card>
                    </TouchableOpacity>
                </View>
                <View style={style.row}>
                    <TouchableOpacity onPress={() => navigation.navigate("Mood")}>
                        <Card style={style.card} elevation={10}>
                            <Image style={style.itemimage}
                                source={require("../../../assets/mood.png")}
                            />
                            <Text style={style.itemText}>Mood & Sleep</Text>
                        </Card>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("Medication")}>
                        <Card style={style.card} elevation={10}>
                            <Image style={style.itemimage}
                                source={require("../../../assets/medication.png")}
                            />
                            <Text style={style.itemText}>Medication</Text>
                        </Card>
                    </TouchableOpacity>
                </View>
                <View style={style.row}>
                    <TouchableOpacity onPress={() => navigation.navigate("MessageBoard")}>
                        <Card style={style.card} elevation={10}>
                            <Image style={style.itemimage}
                                source={require("../../../assets/message.png")}
                            />
                            <Text style={style.itemText}>Message Board</Text>
                        </Card>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("History")}>
                        <Card style={style.card} elevation={10}>
                            <Image style={style.itemimage}
                                source={require("../../../assets/history.png")}
                            />
                            <Text style={style.itemText}>History</Text>
                        </Card>
                    </TouchableOpacity>
                </View>
                {/* <Button 
                    title="Log Out"
                    onPress={() => onLogOut()}>
                </Button> */}
                <TouchableOpacity onPress={() => onLogOut()} style={styles.submitButton}>
                    <Text style={styles.buttonText}>Log Out</Text>
                </TouchableOpacity>
            </ScrollView>

        </View>
    )
}

const styles = StyleSheet.create({
    submitButton: {
        alignSelf: 'center',
        borderWidth: 2,
        borderColor: "#6495ed",
        borderRadius: 5,
        backgroundColor: "#6495ed",
        padding: 10,
        margin: 5,
        elevation: 8
    },
    buttonText: {
        fontSize: 20,
        color: "white"
    }

});

export default Homepage;