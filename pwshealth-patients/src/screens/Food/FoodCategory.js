import React from 'react';
import { FlatList, View,Image, TouchableOpacity, Text, ScrollView } from "react-native";
import style from "./style"
import { Card } from 'react-native-shadow-cards';
const FoodCategory = ({ navigation }) => {


    return <View>
        <ScrollView>
                <Text></Text>
                <Text></Text>
                <Text></Text>
                <View style={style.row}>
                    <TouchableOpacity onPress={()=>navigation.navigate("Fruit")}>
                        <Card style={style.category}>
                            <Image style={style.itemimage}
                                source={require("../../../assets/fruit.png")}
                            />
                            <Text style={style.itemText}>Fruit</Text>
                        </Card>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("Vegetable")} >
                        <View style={style.category}>
                            <Image style={style.itemimage}
                                source={require("../../../assets/vegetable.png")}
                            />
                            <Text style={style.itemText}>vegetable</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={style.row}>
                    <TouchableOpacity onPress={() => navigation.navigate("Milk")}>
                        <View style={style.category}>
                            <Image style={style.itemimage}
                                source={require("../../../assets/milk.png")}
                            />
                            <Text style={style.itemText}>milk</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("Bread")}>
                        <View style={style.category}>
                            <Image style={style.itemimage}
                                source={require("../../../assets/bread.png")}
                            />
                            <Text style={style.itemText}>bread</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={style.row}>
                    <TouchableOpacity onPress={() => navigation.navigate("Meat")}>
                        <View style={style.category}>
                            <Image style={style.itemimage}
                                source={require("../../../assets/meat.png")}
                            />
                            <Text style={style.itemText}>meat</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("Sweet")}>
                        <View style={style.category}>
                            <Image style={style.itemimage}
                                source={require("../../../assets/sweet.png")}
                            />
                            <Text style={style.itemText}>sweet</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
    </View>
};

export default FoodCategory;