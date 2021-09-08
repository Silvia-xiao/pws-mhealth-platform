import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react'
import 'react-native-gesture-handler';
import { StyleSheet, Text, View, LogBox  } from 'react-native';
LogBox.ignoreLogs(['Setting a timer']);
import * as firebase from "firebase"
import '@firebase/auth';
import '@firebase/firestore';
//import {Surface, Shape} from '@react-native-community/art';

const firebaseConfig = {
  apiKey: "AIzaSyA5tl8XYFHmmY_jbpGLthdQR5dWyMUTqhw",
  authDomain: "pws-project-fddff.firebaseapp.com",
  projectId: "pws-project-fddff",
  storageBucket: "pws-project-fddff.appspot.com",
  messagingSenderId: "595620721304",
  appId: "1:595620721304:web:6f9f6ce9de0e1b7b9416ed",
  measurementId: "G-GK5Y29EZCQ"
};
if (firebase.apps.length === 0 ){
  firebase.initializeApp(firebaseConfig);
}

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from "./src/auth/Login/Login";
import RegisterScreen from "./src/auth/Register/Register";
import HomepageScreen from "./src/screens/Homepage/Homepage";
import InitialSettingScreen from "./src/screens/Homepage/InitialSetting";
import FoodScreen from "./src/screens/Food/Food";
import FoodSelectionScreen from "./src/screens/Food/FoodSelection";
import FoodAddScreen from "./src/screens/Food/FoodAdd";
import FoodCategoryScreen from "./src/screens/Food/FoodCategory";
import MealAddScreen from "./src/screens/Food/MealAdd";
import NewMealScreen from "./src/screens/Food/NewMeal";
import MealFoodAddScreen from "./src/screens/Food/MealFoodAdd";
import EditMealScreen from "./src/screens/Food/EditMeal";
import Exercise from "./src/screens/Exercise/Exercise"
import Sleep from "./src/screens/Sleep/Sleep"
import Mood from "./src/screens/Mood/Mood"
import Medication from "./src/screens/Medication/Medication"
import NewMedication from "./src/screens/Medication/NewMedication"
import EditMedication from "./src/screens/Medication/EditMedication"
import MedicationAdd from "./src/screens/Medication/MedicationAdd"
import History from "./src/screens/History/History"
import MessageBoard from "./src/screens/MessageBoard/MessageBoard"

const Stack = createStackNavigator();
const App = ()=> {
  
  const [loaded, setLoaded] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false);
  const [initialSetting, setInitialSetting] = useState(false);
  const [user, setUser] = useState()
  
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user){
        setLoaded(true)
        setLoggedIn(false)
        setInitialSetting(false);
      } else {
        setLoaded(true)
        setUser(user)
        setLoggedIn(true)
        firebase.firestore()
        .collection('users')
        .doc(firebase.auth().currentUser.uid)
        .get()
        .then(snapshot => {
          try {
            if (snapshot.data().hasOwnProperty('height')){
              setInitialSetting(true);
            }
          }
          catch (err){
            console.log(err);
          }
       
        })
      }
    });
    
  }, [initialSetting]);



  if (!loaded) {
    return (
      <View style={{flex: 1, justifyContent: 'center',alignItems: 'center'
    }}>
        <Text>Loading</Text>
      </View>
    )
  }
  if (!loggedIn){
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
          <Stack.Screen name="Register" component={RegisterScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
  if (loggedIn && !initialSetting) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="InitialSetting">
          <Stack.Screen name="InitialSetting" component={InitialSettingScreen} options={{headerShown: false}}/>
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
  

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Homepage"
        screenOptions={{headerShown: false}}> 
        <Stack.Screen name="Homepage" component={HomepageScreen} />
        <Stack.Screen name="Food" component={FoodScreen} />
        <Stack.Screen name="FoodSelection" component={FoodSelectionScreen} />
        <Stack.Screen name="FoodCategory" component={FoodCategoryScreen} />
        <Stack.Screen name="FoodAdd" component={FoodAddScreen} />
        <Stack.Screen name="MealAdd" component={MealAddScreen} />
        <Stack.Screen name="NewMeal" component={NewMealScreen} />
        <Stack.Screen name="MealFoodAdd" component={MealFoodAddScreen} />
        <Stack.Screen name="EditMeal" component={EditMealScreen} />
        <Stack.Screen name="Exercise" component={Exercise} />
        <Stack.Screen name="Sleep" component={Sleep} />
        <Stack.Screen name="Mood" component={Mood} />
        <Stack.Screen name="Medication" component={Medication} />
        <Stack.Screen name="NewMedication" component={NewMedication} />
        <Stack.Screen name="EditMedication" component={EditMedication} />
        <Stack.Screen name="MedicationAdd" component={MedicationAdd} />
        <Stack.Screen name="History" component={History} />
        <Stack.Screen name="MessageBoard" component={MessageBoard} />
      </Stack.Navigator>
    </NavigationContainer>


  );
}


export default App;