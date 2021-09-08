import React, { useState } from 'react'
import { View, Button, TextInput,Text, TouchableOpacity } from "react-native"
import * as firebase from "firebase";
import '@firebase/auth';
import '@firebase/firestore';
import style from "./style"

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');


    const onSignUp = () => {
        // in doc() is the id of the user id
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((result) => {
            firebase.firestore().collection("users") 
            .doc(firebase.auth().currentUser.uid)
            .set({
                name,
                email
            })
        })
        .catch((error) => {
            console.log(error.message)
            setErrorMessage(error.message);
        })
    }


    return (
        <View>
            <View style={{flexDirection:"row", margin: 10}}>
                <Text style={{fontSize:18, fontWeight:"bold", flex: 1}}>Name: </Text>
                <TextInput 
                    placeholder=" Please enter your name"
                    onChangeText={(text) => setName(text)}
                    style={{borderWidth: 1, height: 40, flex: 3, borderRadius: 5, padding: 10}}
                />
            </View>
            <View style={{flexDirection:"row", margin: 10}}>
                <Text style={{fontSize:18, fontWeight:"bold", flex: 1}}>Email: </Text>
                <TextInput 
                    placeholder=" Please enter your email"
                    onChangeText={(text) => setEmail(text)}
                    style={{borderWidth: 1, height: 40, flex: 3, borderRadius: 5, padding: 10}}
                />
            </View>
            <View style={{flexDirection:"row", margin: 10}}>
                <Text style={{fontSize:18, fontWeight:"bold", flex: 1}}>Password: </Text>
                <TextInput 
                    placeholder=" Please enter your password"
                    secureTextEntry={true}
                    onChangeText={(text) => setPassword(text)}
                    style={{borderWidth: 1, height: 40, flex: 3, borderRadius: 5, padding: 10}}
                />
            </View>
            <TouchableOpacity onPress={() => onSignUp()} style={style.submitButton}>
                <Text style={style.buttonText}>Register</Text>
            </TouchableOpacity>
            
            <Text style={{color: 'red'}}>{errorMessage}</Text>
        </View>
    )
}


export default Register
