import { View, StyleSheet, Text } from "react-native";
import React, {useState} from "react";
import Color from "../constant/Color";

const Card = props => {
    return(
        <View style={{...styles.Card,...props.style}}>
            {props.children}
        </View>
    );
};

const styles = StyleSheet.create({
    Card : {
        width : '80%',
        borderRadius : 6,
        // shadowColor: 'black',
        // shadowOffset : {height : 6, width : 0},
        // shadowOpacity : 0.5,
        elevation : 4,
        padding : 25,
        marginVertical : 10
        
    }
});

export default Card;