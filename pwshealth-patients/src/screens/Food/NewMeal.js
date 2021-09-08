import React, { useState } from 'react'
import { StyleSheet, View, Image, TextInput ,TouchableOpacity, Text, ScrollView } from "react-native"
import {Picker} from "@react-native-picker/picker"
import SearchBar from '../../components/SearchBar';
import edamam from "../../api/edamam";
import style from "./style";
import firebase from "firebase";
import { RadioButton } from 'react-native-paper';
import { useEffect } from 'react/cjs/react.development';
import Slider from '@react-native-community/slider';

const NewMeal = ({ route, navigation }) => {
    const {date} = route.params;
    const [mealName, setMealName] = useState('');
    const [term, setTerm] = useState('');
    const [data, setData] = useState(null); // food item of search result
    const [mealFoodList, setMealFoodList] = useState([]);
    const [itemDisplay,setItemDisplay] = useState("flex")


    const searchApi = async (searchTerm) => {
        try{
            const response = await edamam.get('', {
                params: {
                    ingr: searchTerm.trim().replace(/\s+/g, '%'),
                    app_id: "d20a87e0",
                    app_key: "9edaeb12df66093dfd386fecc14df6d3",
                }
        });
        //console.log(response.data.parsed[0].food);
        setData(response.data.parsed[0].food);
        setItemDisplay("flex");
        
        } catch (err) {
            console.log(err)
        }  
    };

    const foodItem = (data) => {
        if (data !== null) {
            return (
                <View>
                    <TouchableOpacity onPress={()=> addFood(data)} style={{display: itemDisplay}}>
                    <View style={styles.container} >
                        <Image style={styles.image} source={{ uri: data.image }} />
                        <Text style={styles.nameStyle}>{data.label}</Text>
                    </View>
                    </TouchableOpacity>
                </View>
            )
        } else {
            return (
                <View>
                    <Text style={{display: itemDisplay === 'flex'? "none" : "flex"}}>There's no matching result. Please change the keyword and try again.</Text>
                    {/* <TouchableOpacity onPress={() => {
                            setTerm('');
                        }}
                    >
                        <Text style={styles.underLineText}>Reset</Text>
                    </TouchableOpacity> */}
                </View>
            )
        }
    }

    const addFood = (passValue) => {
        // navigation.navigate( "MealFoodAdd", {image:passValue.image,
        //     label:passValue.label,
        //     calorie:passValue.nutrients.ENERC_KCAL})
        setItemDisplay("none");
        setTerm('');
        const key = mealFoodList.length.toString()
        setMealFoodList([
            ...mealFoodList,
            {name: passValue.label, calorie: passValue.nutrients.ENERC_KCAL, key:key, quantity: 100, categoty: "Fruit", carb: passValue.nutrients.CHOCDF}
        ])
    }
    
    const handleSubmit = () => {
        let currentMealList = []
        firebase.firestore().collection("users")
        .doc(firebase.auth().currentUser.uid)
        .get()
        .then(snapshot => {
            if (snapshot.data().mealList !== undefined){
                currentMealList =  snapshot.data().mealList
            } else {
                currentMealList = []
            }
            firebase.firestore().collection("users") 
            .doc(firebase.auth().currentUser.uid)
            .update({mealList: [
                ...currentMealList,
                {mealName:mealName,
                foodList:mealFoodList,
                key:mealName}
            ]})
        })
        setTimeout(() => {
            navigation.push("FoodSelection", {date: date});
            setMealName('')
            setMealFoodList([])
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
            <Text></Text>
            <Text></Text>
            <Text></Text>
            <Text style={styles.text}>Please enter the meal name:</Text>
            <TextInput
                onChangeText={setMealName}
                value={mealName}
                placeholder="Meal Name"
            ></TextInput>
            <Text style={styles.text}>Please search the food in {mealName} :</Text>
            <TouchableOpacity onPress={() => {
                    setTerm('');
                }}
            >
                <Text style={styles.underLineText}>Reset</Text>
            </TouchableOpacity>
            <SearchBar 
                term={term} 
                onTermChange={newTerm => setTerm(newTerm)}
                onTermSubmit={() => {
                        searchApi(term);
                    }
                }
            />
            {foodItem(data)}
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
                                <Text style={styles.underLineText}>Delete</Text>
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
    label: {
        fontSize: 20,
        marginBottom: 5,
        marginLeft: 5
    },
    button: {
        width: 200
    },
    container: {
        marginLeft: 15,
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        margin: 5
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 4,
        margin: 10
    },
    nameStyle: {
        fontWeight: 'bold',
        fontSize: 16
    },
    categoryText: {
        marginTop:10,
        marginBottom: 5,
        fontWeight: 'bold',
        fontSize: 20
    },
    button: {
        flexDirection: 'row',
        width: 200,
        alignSelf:'center'
    },
    underLineText: {
        fontSize: 15,
        textDecorationLine: 'underline',
        color: 'blue',
        textAlign: 'right',
    },
    submitButton: {
        alignSelf: 'center',
        borderWidth: 2,
        borderColor: "#6495ed",
        borderRadius: 5,
        backgroundColor: "#6495ed",
        padding: 10,
        margin: 5,
        elevation:5,
        marginBottom:20
    },
    buttonText: {
        fontSize: 20,
        color: "white"
    }

});

export default NewMeal