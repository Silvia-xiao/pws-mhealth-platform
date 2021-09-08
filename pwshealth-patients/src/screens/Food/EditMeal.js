import React, { useState } from 'react'
import { StyleSheet, View, Image, TextInput ,TouchableOpacity, Text, ScrollView } from "react-native"
import {Picker} from "@react-native-picker/picker"
import firebase from "firebase";
import edamam from "../../api/edamam";

const EditMeal = ({route, navigation}) => {
    const { index, mealList, date } = route.params;
    const currentMeal = mealList[index]
    const [mealFoodList, setMealFoodList] = useState(currentMeal.foodList)

    const handleSubmit = () => {
        const newMealList = [...mealList]
        newMealList[index] = {...currentMeal, foodList:mealFoodList }
        firebase.firestore().collection("users") 
            .doc(firebase.auth().currentUser.uid)
            .update({mealList: [
                ...newMealList
            ]})
        setTimeout(() => {
            navigation.push("FoodSelection", {date: date});
        }, 1000);
    }

    const handleDelete = (index) => {
        const newMealFoodList = [...mealFoodList]
        newMealFoodList.splice(index,1)
        setMealFoodList([
            ...newMealFoodList
        ])
    }


    return (
        <>
            <Text style={{fontSize: 25, fontWeight: 'bold'}}>{currentMeal.mealName === "" ? "Meal name undefined": currentMeal.mealName}:</Text>
            <ScrollView>
                {mealFoodList.map((item, index) => (
                    <View key={index} style={{flexDirection: "row"}}>
                        <View style={{flex:5}}>
                            <Text style={{fontSize: 20, fontWeight: 'bold'}}>{item.name}</Text>
                            <View>
                                <Text>Quantity:</Text>
                                <Picker style={styles.text}
                                    selectedValue={(item.quantity/100).toString()}
                                    onValueChange={(itemValue, itemIndex) => {
                                        // update the item quantity
                                        item.quantity = parseFloat(itemValue)*100
                                        setMealFoodList([
                                            ...mealFoodList
                                        ])
                                    }
                                    }>
                                    <Picker.Item label="100g" value="1" />
                                    <Picker.Item label="150g" value="1.5" />
                                    <Picker.Item label="200g" value="2" />
                                    <Picker.Item label="250g" value="2.5" />
                                    <Picker.Item label="300g" value="3" />
                                </Picker>
                                <Text>Category:</Text>
                                <Picker style={styles.text}
                                    selectedValue={item.categoty}
                                    onValueChange={(itemValue, itemIndex) => {
                                        // update the item category
                                        item.categoty = itemValue
                                        setMealFoodList([
                                            ...mealFoodList
                                        ])
                                    }
                                    }>
                                    <Picker.Item label="Fruit" value="Fruit" />
                                    <Picker.Item label="Vegetable" value="Vegetable" />
                                    <Picker.Item label="Protein" value="Protein" />
                                    <Picker.Item label="Diary" value="Diary" />
                                    <Picker.Item label="Staple" value="Staple" />
                                    <Picker.Item label="Sweet" value="Sweet" />
                                </Picker>
                            </View>
                        </View>
                        <View style={{flex:1}}>
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

export default EditMeal