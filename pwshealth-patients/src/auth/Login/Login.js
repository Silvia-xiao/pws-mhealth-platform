import React, { useState } from 'react'
import { View, Button, TextInput, Text, TouchableOpacity } from "react-native"
import firebase from "firebase"
import style from "./style"

const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const onSignIn = () => {
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then((result) => {
            //console.log(result)
        })
        .catch((error) => {
            console.log(error)
        })
    }

    const navigateToRegister = () => {
        navigation.navigate("Register")
    }

    return (
        <View style={style.container}>
            <Text style={{fontSize: 30, fontWeight: "bold", alignSelf: "center", margin: 30, fontStyle: 'italic'}}>Welcome</Text>
            <View style={{borderWidth: 1, borderRadius: 5}}>
                <View style={{flexDirection:"row", margin: 10}}>
                    <Text style={{fontSize:18, fontWeight:"bold", flex: 1}} >Email: </Text>
                    <TextInput 
                        placeholder=" Please enter your email"
                        onChangeText={(text) => setEmail(text)}
                        style={{borderWidth: 1, height: 40, flex:3, borderRadius: 5, padding: 10}}
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
                
                <TouchableOpacity onPress={() => onSignIn()} style={style.submitButton}>
                    <Text style={style.buttonText}>Sign In</Text>
                </TouchableOpacity>
                <Text style={{margin: 10}}>Don't have an account?</Text>
                <TouchableOpacity onPress={() => navigateToRegister()} style={style.submitButton}>
                    <Text style={style.buttonText}>Register</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}


export default Login
