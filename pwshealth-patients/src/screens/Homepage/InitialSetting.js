import React, { useState } from 'react'
import { StyleSheet,ScrollView, Button, TextInput, Text, View, TouchableOpacity, Image} from "react-native"
import Slider from '@react-native-community/slider';
import firebase from "firebase"
import '@firebase/auth';
import '@firebase/firestore';
import edamam from "../../api/edamam";
import { RadioButton } from 'react-native-paper';
import {Picker} from "@react-native-picker/picker"
import SearchBar from '../../components/SearchBar';
import RNRestart from 'react-native-restart';

const InitialSetting = ({ navigation }) => {
    const [height, setHeight] = useState(160);
    const [weight, setWeight] = useState(60);
    const [age, setAge] = useState(30);
    const [gender, setGender] = useState('Female');
    const [term, setTerm] = useState('');
    const [data, setData] = useState(null);
    const [favouriteFood, setFavouriteFood] = useState([]);
    const [displayItem, setDisplayItem] = useState("flex");
    const [refresh, setRefresh] = useState(true)
    const [value, setValue] = React.useState("1"); //exercise
    const [mealList, setMealList] = useState([])
    const [condition, setCondition] = useState([])
    const [chosenCondition, setChosenCondition] = useState()
    const [medicationList, setMedicationList] = useState([])

    const searchApi = async (searchTerm) => {
        try{
            const response = await edamam.get('', {
                params: {
                    ingr: searchTerm.trim().replace(/\s+/g, '%'),
                    app_id: "d20a87e0",
                    app_key: "9edaeb12df66093dfd386fecc14df6d3",
                }
        });
        setData(response.data.parsed[0].food);
        
        } catch (err) {
            console.log(err)
        }  
    };

    const foodItem = (data) => {
        if (data !== null) {
            return (
                <View style={{display: displayItem}}>
                    <TouchableOpacity 
                        onPress={()=> {
                            if (!favouriteFood.includes(data.label)){
                                setFavouriteFood([
                                    ...favouriteFood,
                                    data.label
                                ])
                            }
                            setMealList([...mealList, {foodList:[{calorie: data.nutrients.ENERC_KCAL,carb: passValue.nutrients.CHOCDF, key: Date.now(), name: data.label, quantity: 100, categoty: "Fruit"}], mealName: data.label, key: data.label}])
                            setTerm('');
                            setDisplayItem('none')
                            setData(null);
                        }}>
                        <View style={styles.container} >
                            <Image style={styles.image} source={{ uri: data.image }} />
                            <Text style={styles.nameStyle}>{data.label}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                            setTerm('');
                            setDisplayItem('none')
                        }}
                    >
                        <Text style={styles.underLineText}>Reset</Text>
                    </TouchableOpacity>
                </View>
            )
        } else {
            return (
                <View>
                    <TouchableOpacity onPress={() => {
                            setTerm('');
                            setDisplayItem('none')
                        }}
                    >
                        <Text style={styles.underLineText}>Reset</Text>
                    </TouchableOpacity>
                </View>
            )
        }
    }

    const handleSubmit = () => {
        firebase.firestore().collection("users") 
        .doc(firebase.auth().currentUser.uid)
        .update({
            height,
            weight,
            age,
            gender,
            condition,
            favouriteFood,
            mealList,
            medicationList,
            exercise: value,
            bmi: weight / ((height/100)**2),
            bmr: gender === 'male' ? 10*weight + 6.25*height - 5*age + 5 : 10* weight + 6.25* height - 5 * age -161
        })
        //setRefresh(!refresh);
        //RNRestart.Restart();
    }

    const onLogOut = () => {
        firebase.auth().signOut();
    }
    //console.log(mealList)
    return (
        <ScrollView style={{padding: 30}}>
            <Text></Text>
            <Text style={styles.heading}>Physical information</Text>
            <Text style={{fontSize:18,fontWeight: 'bold',marginTop:10}}>Height:{height} cm</Text>
            <Slider
                step={1}
                minimumValue={100}
                maximumValue={200}
                value={height}
                onValueChange={slideValue => setHeight(slideValue)}
                minimumTrackTintColor="#3399ff"
                maximumTrackTintColor="#3399ff"
                thumbTintColor="#3399ff"
            />
            <Text style={{fontSize:18,fontWeight: 'bold',marginTop:10}}>Weight:{weight} kg</Text>
            <Slider
                step={1}
                minimumValue={20}
                maximumValue={150}
                value={weight}
                onValueChange={slideValue => setWeight(slideValue)}
                minimumTrackTintColor="#3399ff"
                maximumTrackTintColor="#3399ff"
                thumbTintColor="#3399ff"
            />
            <Text style={{fontSize:18,fontWeight: 'bold', marginTop:10}}>Age:{age} </Text>
            <Slider
                step={1}
                minimumValue={0}
                maximumValue={100}
                value={age}
                onValueChange={slideValue => setAge(slideValue)}
                minimumTrackTintColor="#3399ff"
                maximumTrackTintColor="#3399ff"
                thumbTintColor="#3399ff"
            />
            <Text style={{fontSize:18,fontWeight: 'bold',marginTop:10,marginBottom:10}}>Gender:</Text>
            <RadioButton.Group onValueChange={newValue => setGender(newValue)} value={gender}>
                <View style={{flexDirection:'row',justifyContent:'space-around'}}>
                    <View style={{flexDirection:'row'}}>
                        <Text>Female</Text>
                            <RadioButton value="Female" />
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <Text>Male</Text>
                        <RadioButton value="Male" />
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <Text>Prefer Not Tell</Text>
                        <RadioButton value="None" />
                    </View>
                </View>  
            </RadioButton.Group>
            <Text style={{fontSize:18,fontWeight: 'bold',marginTop:10}}>Other conditions: {condition.toString()}</Text>
            <Picker style={styles.text}
                selectedValue={chosenCondition}
                onValueChange={(itemValue, itemIndex) =>
                    {
                        if (itemValue === "None of these three"){
                            setCondition([])
                        } else if (!condition.includes(itemValue)) {
                            setCondition([...condition, itemValue])
                            setMedicationList([...medicationList, {finished: false, medicationName: itemValue, key: itemValue, pillList: []}])
                        }
                        setChosenCondition(itemValue)
                    }}>
                <Picker.Item label="None of these three" value="None of these three" />
                <Picker.Item label="Diabetes" value="Diabetes" />
                <Picker.Item label="NAFLD" value="NAFLD" />
                <Picker.Item label="Hypertension" value="Hypertension" />
            </Picker>
            {/* <RadioButton.Group onValueChange={newValue => setCondition(newValue)} value={condition}>
                <View style={{flexDirection:'row',justifyContent:'space-around'}}>
                    <View style={{flexDirection:'row'}}>
                        <Text>Diabetes</Text>
                            <RadioButton value="Diabetes" />
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <Text>NAFLD</Text>
                        <RadioButton value="NAFLD" />
                    </View>
                </View> 
                <View style={{flexDirection:'row',justifyContent:'space-around'}}>
                    <View style={{flexDirection:'row'}}>
                        <Text>hypertension</Text>
                        <RadioButton value="hypertension" />
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <Text>not these three</Text>
                        <RadioButton value="none" />
                    </View>
                </View>  
            </RadioButton.Group> */}
            <Text style={{fontSize:18,fontWeight: 'bold',marginTop:10}}>Favourite Food: {favouriteFood.join(', ')}</Text>
            <SearchBar 
                term={term} 
                onTermChange={newTerm => setTerm(newTerm)}
                onTermSubmit={() => {
                        searchApi(term);
                        setDisplayItem('flex')
                    }
                }
            />
            {foodItem(data)}
            <Text style={{fontSize:18,fontWeight: 'bold',marginTop:5}}>Weekly exercise level: </Text>
            <Text />
                <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>
                            <View style={{flexDirection:'row'}}>
                                <Text>No exercise</Text>
                                <RadioButton value="1.2" />
                            </View>
                            <View style={{flexDirection:'row'}}>
                                <Text>Exercise 1-3 times per week</Text>
                                <RadioButton value="1.375" />
                            </View>
                            <View style={{flexDirection:'row'}}>
                                <Text>Exercise 3-5 times per week</Text>
                                <RadioButton value="1.55" />
                            </View>
            
                            <View style={{flexDirection:'row'}}>
                                <Text>Exercise 6-7 times per week</Text>
                                <RadioButton value="1.725" />
                            </View>
                            <View style={{flexDirection:'row'}}>
                                <Text>Exercise 2 times per day or very active job</Text>
                                <RadioButton value="1.9" />
                            </View>
                    </RadioButton.Group>
            <View style={{flexDirection: "row", justifyContent: "space-around"}}>
                <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onLogOut} style={styles.submitButton}>
                    <Text style={styles.buttonText}>Log Out</Text>
                </TouchableOpacity>
            </View>
            
            
        </ScrollView>
    )
}


const styles = StyleSheet.create({
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
    underLineText: {
        fontSize: 15,
        textDecorationLine: 'underline',
        color: 'blue',
        textAlign: 'right',
      },
    heading: {
        marginTop: 10,
        fontSize: 24,
        fontWeight: 'bold',
        alignSelf:"center"
    },
    text: {
        marginTop: 10,
        fontSize: 15,
        fontWeight: 'bold'
    },
    label: {
        fontSize: 20,
        marginBottom: 5,
        marginLeft: 5
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

});


export default InitialSetting;