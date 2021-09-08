import React, { useState, useEffect } from 'react'
import { StyleSheet, View,Image, Button, TextInput ,TouchableOpacity, Text, ScrollView } from "react-native"
import {Picker} from "@react-native-picker/picker"
import style from "./style";
import firebase from "firebase";
import '@firebase/auth';
import '@firebase/firestore';
import { RadioButton } from 'react-native-paper';

const FoodAdd = ({ route, navigation }) => {
    const { id, image,label,calorie } = route.params;
    const [selectedLanguage, setSelectedLanguage] = useState("1");
    const [value, setValue] = React.useState('Fruit');


    const calculation = () => {
        let currentFoodResult = []
        let cal = parseFloat(selectedLanguage) * calorie;
        let quantity = parseFloat(selectedLanguage) * 100;
        // firebase.firestore().collection("users")
        // .doc(firebase.auth().currentUser.uid)
        // .get()
        // .then(snapshot => {
        //     if (snapshot.data().foodRecord !== undefined){
        //         currentFoodResult =  snapshot.data().foodRecord
        //         console.log("currentFoodResult" + currentFoodResult)
        //     } 
        //     firebase.firestore().collection("users") 
        //     .doc(firebase.auth().currentUser.uid)
        //     .update({foodRecord: [
        //         ...currentFoodResult,
        //         {name: label, quantity:quantity, category: value, calorie: calorie}
        //     ]})
        // })
        navigation.navigate("NewMeal", {label:label,amount: quantity,calorie:cal, category:value});
    }

    return (
        <View style={{padding:10}}>
            
            <ScrollView>
                <Text></Text>
                <Text></Text>
                <Text></Text>
                <Image style={style.largerImage} source={{ uri: image }} />
                <Text style={style.imageText}>{label}</Text>
                <Text style={style.imageText}>{calorie} kcal/100g</Text>
                <Text style={styles.text}>Quantity:</Text>
                <Picker style={styles.text}
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
                <Text style={styles.text}>Category:</Text>
                <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>
                    <View style={{flexDirection:'row',justifyContent:'space-around'}}>
                        <View style={{flexDirection:'row'}}>
                        <Text>Fruit</Text>
                        <RadioButton value="Fruit" />
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <Text>Vegetable</Text>
                        <RadioButton value="Vegetable" />
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <Text>Protein</Text>
                        <RadioButton value="Protein" />
                    </View>
                    </View>
                    <View style={{flexDirection:'row',justifyContent:'space-around'}}>
                        <View style={{flexDirection:'row'}}>
                        <Text>Dairy</Text>
                        <RadioButton value="Dairy" />
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <Text>Staple</Text>
                        <RadioButton value="Staple" />
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <Text>Sweet</Text>
                        <RadioButton value="Sweet" />
                    </View>
                    </View>
                </RadioButton.Group>


                <View style={{marginTop: 50, marginLeft:100,marginRight:100}}>
                    <Button styles={styles.button} title="Submit" onPress={() => {

                        calculation()
                    }}/>
                    <Text></Text>
                    <Button styles={styles.button} title="Cancel" onPress={() => navigation.navigate('FoodSelection')}/>
                </View>
                
            </ScrollView>
            
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
    }

});

export default FoodAdd