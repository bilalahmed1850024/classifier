import React from "react"
import { StyleSheet, Text, View } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Header = () =>{
    return(
        <View>
            icon for the menu
            <View>
                <Text style={style.Header}>
                     Productlist
                </Text>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header:{
        width: "100%",
        height: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    headerText:{
        fontWeight: "bold",
        fontSize: "20",
        color: "#333",
        letterSpacing: 1
        }
})

export default Header