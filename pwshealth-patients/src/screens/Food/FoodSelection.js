import React, {useState, useEffect} from 'react'
import { useIsFocused } from '@react-navigation/native';
import { FlatList,Button,View,Image, TouchableOpacity, Text, ScrollView } from "react-native";
import useResults from  '../../hook/useResults';
import SearchBar from '../../components/SearchBar';
import style from "./style";
import edamam from "../../api/edamam";
import ResultsDetail from "../../components/ResultDetail";
import { StyleSheet } from 'react-native';
import * as firebase from "firebase"
import '@firebase/auth';
import '@firebase/firestore';
import { Card } from 'react-native-shadow-cards';

const FoodSelection = ({ route, navigation }) => {
    const {date} = route.params;
    const [term, setTerm] = useState('');
    //const [searchApi, results, errorMessage] = useResults();
    const [data, setData] = useState(null);
    const [click,setClick] = useState('Common');
    const [mealData, setMealData] = useState({foodRecord:[{calorie: 0, key: "efvrf"}]});
    const [mealRecord, setMealRecord] = useState(false)
    const [displayCommon, setDisplayCommon] = useState("flex");
    const [updated, setUpdated] = useState(false)
    const isFocused = useIsFocused();
    const fruitUrl = [{key:"1",label:'Apple',image: "https://www.edamam.com/food-img/42c/42c006401027d35add93113548eeaae6.jpg",nutrients: {ENERC_KCAL: 52,CHOCDF: 13.81}},
    {key:"2",label:'Grape',image: "https://www.edamam.com/food-img/ca5/ca55ac74deb991d159942c65777115df.jpg",nutrients: {ENERC_KCAL: 69, CHOCDF: 18.1}},
    {key:"3",label:'Watermelon',image: "https://www.edamam.com/food-img/e83/e83c09ce97ecd44e00b8c561ab682202.jpg",nutrients: {ENERC_KCAL: 30, CHOCDF: 7.55}},
    {key:"4",label:'Banana',image: "https://www.edamam.com/food-img/9f6/9f6181163a25c96022ee3fc66d9ebb11.jpg",nutrients: {ENERC_KCAL: 89, CHOCDF: 22.84}},
    {key:"5",label:'Pear',image: "https://www.edamam.com/food-img/65a/65aec51d264db28bbe27117c9fdaaca7.jpg",nutrients: {ENERC_KCAL: 57, CHOCDF: 15.23}},
    {key:"6",label:'Peach',image: "https://www.edamam.com/food-img/437/4378245cfab2121c9e6eb9e3c3dc9ac8.jpg",nutrients: {ENERC_KCAL: 39, CHOCDF: 9.54}},
    {key:"7",label:'Strawberry',image: "https://www.edamam.com/food-img/00c/00c8851e401bf7975be7f73499b4b573.jpg",nutrients: {ENERC_KCAL: 32, CHOCDF: 7.68}},
    {key:"8",label:'Orange',image: "https://www.edamam.com/food-img/8ea/8ea264a802d6e643c1a340a77863c6ef.jpg",nutrients: {ENERC_KCAL: 47, CHOCDF: 11.75}}];

    const stapleUrl = [{key:"1",label:'Bread',image: "https://www.edamam.com/food-img/886/886960f6ce6ccec5b9163bacf2996853.jpg",nutrients: {ENERC_KCAL: 267, CHOCDF:48.68}},
    {key:"2",label:'Noodles',image: "https://www.edamam.com/food-img/800/800c9c0d7cef6b5474723682ffa2878d.jpg",nutrients: {ENERC_KCAL: 384, CHOCDF:71.27}},
    {key:"3",label:'Bun',image: "https://www.edamam.com/food-img/dbe/dbe3d135d1336ed19703d359e33d58dd.jpg",nutrients: {ENERC_KCAL: 278, CHOCDF: 50.15}},
    {key:"4",label:'Pizza',image: "https://www.edamam.com/food-img/c01/c0150280d71059c23c025f501f502dc0.jpg",nutrients: {ENERC_KCAL: 268, CHOCDF: 29.02}},
    {key:"5",label:'Muffin',image: "https://www.edamam.com/food-img/d3a/d3a5fb564987c6d70e50c99e4c4e3f23.jpg",nutrients: {ENERC_KCAL: 296, CHOCDF: 41.4}}];

    const proteinUrl = [{key:"5",label:'Beef',image: "https://www.edamam.com/food-img/bab/bab88ab3ea40d34e4c8ae35d6b30344a.jpg",nutrients: {ENERC_KCAL: 130, CHOCDF: 0.12}},
        {key:"6",label:'Pork',image: "https://www.edamam.com/food-img/d55/d553f23d42b9c8fb314416ccd5cde3d2.jpg",nutrients: {ENERC_KCAL: 198, CHOCDF: 0}},
        {key:"7",label:'Chicken',image: "https://www.edamam.com/food-img/d33/d338229d774a743f7858f6764e095878.jpg",nutrients: {ENERC_KCAL: 215, CHOCDF: 0}},
        {key:"8",label:'Salmon',image: "https://www.edamam.com/food-img/9a0/9a0f38422e9f21dcedbc2dca0d8209ac.jpg",nutrients: {ENERC_KCAL: 208, CHOCDF: 0}},
        {key:"9",label:'Egg',image: "https://www.edamam.com/food-img/a7e/a7ec7c337cb47c6550b3b118e357f077.jpg",nutrients: {ENERC_KCAL: 143, CHOCDF: 0.72}}]
    const searchApi = async (searchTerm) => {
        //console.log('hi');
        try{
            const response = await edamam.get('', {
                params: {
                    ingr: searchTerm.trim().replace(/\s+/g, '%'),
                    app_id: "d20a87e0",
                    app_key: "9edaeb12df66093dfd386fecc14df6d3",
                }
        });
        //console.log(response.data.parsed[0].food);
        //console.log(response.data)
        setData(response.data.parsed[0].food);
        
        //setResults(response.data);
        } catch (err) {
            console.log(err)
        }  
    };
    
    useEffect(() => {
            try{
                firebase.firestore()
                .collection('users')
                .doc(firebase.auth().currentUser.uid)
                .get()
                .then(snapshot => {
                    let data = snapshot.data()
                    if (data.hasOwnProperty('mealList')){
                        setMealData({...data})
                        if (data.mealList.length > 0){
                            setMealRecord(true)
                        }
                        
                        //console.log(mealData)
                    } else {
                        setMealRecord(false)
                    }
                    
                })
                
            }
            catch(err){
                console.log(err)
                
            }
    }, [updated]);

    const addFood = (passValue) => {
        setUpdated(!updated)
        //console.log("pass "+JSON.stringify(passValue));
        navigation.navigate( "FoodAdd", {image:passValue.image,
            label:passValue.label,
            calorie:passValue.nutrients.ENERC_KCAL,
            date: date,
            carb: passValue.nutrients.CHOCDF
        })
    }

    const foodItem = (data) => {
        if (data !== null) {
            return (
                <View>
                    <TouchableOpacity onPress={()=> addFood(data)}>
                    <View style={styles.container} >
                        <Image style={styles.image} source={{ uri: data.image }} />
                        <Text style={styles.nameStyle}>{data.label}</Text>
                    </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                            setDisplayCommon("flex");
                            setTerm('');
                        }}
                    >
                        <Text style={styles.underLineText}>Reset</Text>
                    </TouchableOpacity>
                </View>
            )
        } else {
            return (
                <View>
                    <Text>There's no matching result. Please change the keyword and try again.</Text>
                    <TouchableOpacity onPress={() => {
                            setDisplayCommon("flex");
                            setTerm('');
                        }}
                    >
                        <Text style={styles.underLineText}>Reset</Text>
                    </TouchableOpacity>
                </View>
            )
        }
    }

    const handleEdit = (index) => {
        navigation.navigate("EditMeal", {index: index, mealList: mealData.mealList, date:date})
        setUpdated(!updated)
    }

    const handleDelete = (index) => {
        const newMealList = [...mealData.mealList]
        newMealList.splice(index,1)
        //console.log(newMealList)
        firebase.firestore().collection("users") 
            .doc(firebase.auth().currentUser.uid)
            .update({mealList: [
                ...newMealList
            ]})
        setUpdated(!updated)
        
        if (newMealList.length === 0){
            setMealRecord(false)
        }
    }

    return (
        <>
            <Text></Text>
            <Text></Text>
            <Text></Text>
            <SearchBar 
                term={term} 
                onTermChange={newTerm => setTerm(newTerm)}
                onTermSubmit={() => {
                        searchApi(term);
                        setDisplayCommon("none");
                    }
                }
            />
            {displayCommon === 'none'? foodItem(data) : <></>}
            <ScrollView style={{display: displayCommon}}>
                {/* <View style={styles.button}>
                    <View style={{marginLeft: 8,width:90}}>
                        <Button title="Common" onPress={() => setClick('Common')}/>
                    </View>
                    <View style={{marginLeft: 2,width: 90}}>
                        <Button title="Favourite" onPress={() => setClick('Meal')}/>
                    </View>
                        
                </View> */}
                <View style={{flexDirection: "row", justifyContent: "center"}}>
                    <TouchableOpacity onPress={() => setClick('Common')} style={styles.submitButton}>
                        <Text style={styles.buttonText}>Common</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setClick('Meal')} style={styles.submitButton}>
                        <Text style={styles.buttonText}>Favourite</Text>
                    </TouchableOpacity>
                </View>
                {click === 'Common'? (
                    <ScrollView>
                    <Text style={styles.categoryText}>Fruit group</Text>
                    <FlatList
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    data={fruitUrl}
                    keyExtractor={(item) => item.key}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity onPress={() => addFood(item)}>
                                <Card style={{ margin: 5, width: 180}}>
                                    <ResultsDetail  result={item} />
                                </Card>
                                
                            </TouchableOpacity>
                        );
                    }}
                    />
                    <Text style={styles.categoryText}>Grains group</Text>
                    <FlatList
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    data={stapleUrl}
                    keyExtractor={(item) => item.key}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity onPress={() => addFood(item)}>
                                <Card style={{ margin: 5, width: 180}}>
                                <ResultsDetail  result={item} />
                                </Card>
                            </TouchableOpacity>
                        );
                    }}
                    />
                    <Text style={styles.categoryText}>Protein group</Text>
                    <FlatList
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    data={proteinUrl}
                    keyExtractor={(item) => item.key}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity onPress={() => addFood(item)}>
                                <Card style={{ margin: 5, width: 180}}>
                                <ResultsDetail  result={item} />
                                </Card>
                            </TouchableOpacity>
                        );
                    }}
                    />
                </ScrollView>
                ): (
                    mealRecord?
                    <View>
                        <ScrollView contentContainerStyle={style.contentContainer}>
                            {mealData.mealList.map((item, index)=> 
                                <TouchableOpacity key={index} onPress={()=> {navigation.navigate("MealAdd",{meal: item, date:date})}}>
                                    <Card style={{padding: 10, margin: 10, width: 350}} elevation={6}>
                                        <View key={index}>
                                            <Text style={style.itemText}>{item.mealName}</Text>
                                            {item.foodList.map((it, index) => 
                                                <>
                                                    <Text key={index} style={style.food}>{it.name} {it.quantity} g</Text>
                                                </>
                                            )}
                                        </View>
                                        <View style={{flexDirection: "row", justifyContent: "flex-end"}}>
                                            <TouchableOpacity style={style.editButton} onPress = {() => handleEdit(index )}>
                                                <Text style={styles.underLineText}>Edit</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={style.deleteButton} onPress={()=> handleDelete(index)}>
                                                <Text style={styles.underLineText}>Delete</Text>
                                            </TouchableOpacity>
                                        
                                        </View>
                                    </Card>
                                </TouchableOpacity>
                            )}
                        </ScrollView>
                        <View style={{width:100,alignSelf:'center',marginEnd:10}}>
                            <TouchableOpacity 
                                onPress={()=>navigation.navigate("NewMeal", {date:date})}
                                style={style.addButton}
                            >
                                <Text style={{fontWeight: "bold", fontSize: 24, color:'#ffffff'}}>ADD</Text>
                            </TouchableOpacity>
                        </View>
                        
                    </View> : 
                    <>
                    <Text>No favourite yet!</Text> 
                    <View style={{width:100,alignSelf:'center',marginEnd:10}}>
                            <TouchableOpacity 
                                onPress={()=>navigation.navigate("NewMeal", {date:date})}
                                style={style.addButton}
                            >
                                <Text style={{fontWeight: "bold", fontSize: 24, color:'#ffffff'}}>ADD</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                )
                
                }
            </ScrollView>
            
            
            
        </>
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
        fontSize: 20,
        padding:10
    },
    button: {
        flexDirection: 'row',
        width: 200,
        alignSelf:'center'
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
    }
});

export default FoodSelection;