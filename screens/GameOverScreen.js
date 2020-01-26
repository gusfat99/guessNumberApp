import { View, StyleSheet, Text, Image, Dimensions, ScrollView, ColorPropType } from "react-native";
import React, {useState} from "react";
import Color from "../constant/Color";
import MainButton from "../components/MainButton";

const GameOverScreen = props => {
    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.imgContainer}>
                    <Image
                        style={styles.imgGamevOver}  
                        source={require('../assets/gameover.png')} />
                </View>
                <Text style={styles.textGameOver} >
                    Your phone needed <Text style={styles.textPoint}>{props.roundGuess}</Text> rounds to guess the number <Text style={styles.textPoint}>{props.selectedNumber}</Text>
                </Text>
                <MainButton style={styles.btnNewGame} onPress = {props.onRestartGame}>Start New Game</MainButton>
                
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center',
    },
    imgContainer : {
        backgroundColor : Color.accent,
        overflow : 'hidden',
        width : 300,
        height : Dimensions.get('window').height/3,
        borderRadius : 18,
        marginVertical : 20,
    },
    imgGamevOver : {
       width : '100%',
       height : '100%'
    },
    textGameOver : {
        fontSize : 18,
        fontWeight : 'bold',
        textAlign : 'center',
        
    },
    textPoint : {
        color : Color.danger,
        fontSize : 19
    },
    btnNewGame : {
        backgroundColor : Color.primary,
        marginVertical: 10,
    }
    
});

export default GameOverScreen;