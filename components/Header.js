import { View, StyleSheet, Text } from "react-native";
import React from 'react';
import Color from "../constant/Color";

const Header = (props) => {
    return(
        <View style={styles.header}>
            <Text style={styles.headerText}>{props.title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    header : {
        backgroundColor : Color.primary,
        height : 100,
        width : '100%',
        alignItems : "center",
        justifyContent : 'center',
        marginBottom : 10,
        elevation : 6,
    },
    headerText : {
        color : 'white',
        fontSize : 18,
        fontWeight: 'bold',
    }
});

export default Header;