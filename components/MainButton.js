import { View, StyleSheet, Text, TouchableHighlight } from "react-native";
import React, {useState} from "react";

const MainButton = props => {
    return (
        <TouchableHighlight onPress={props.onPress}>
            <View style={{...styles.btn, ...props.style}} >
                <Text style={styles.btnText}>{props.children}</Text>
            </View>
        </TouchableHighlight>

    );
};

const styles = StyleSheet.create({
    btn : {
        height : 35,
        width : '100%',
        color : 'white',
        paddingHorizontal: 10,
        elevation : 5,
        alignItems: 'center',
        justifyContent : "center",
        borderRadius: 4,
    },
    btnText : {
        fontSize : 16,
        color : 'white',
    }
});

export default MainButton;