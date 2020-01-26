import { View, StyleSheet, Text, TouchableNativeFeedback, Keyboard, Alert, ScrollView } from "react-native";
import React, {useState} from "react";
import Card from "../components/Card";
import Input from "../components/Input";
import Color from "../constant/Color";
import MainButton from "../components/MainButton";


const StartGameScreen = props => {

    const [enteredValue, setEnteredValue] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const [selectNumber, setSelectNumber] = useState('');

    const inputTextHandler = (inputText) => {
        setEnteredValue(inputText.replace(/[^0-9]/g,''));
    }

    const confirmHandler = () => {
        const chosenNumber = parseInt(enteredValue);
        Keyboard.dismiss();
        if(isNaN(chosenNumber) || chosenNumber === 0 || chosenNumber == 99) {
            Alert.alert(
                'Invalid Number!',
                'Number has to be a number between 1 to 98',
                [{text : "Okay", style : 'destructive', onPress : resetInputTextHandler}]
            );
            return;
        }
        setConfirmed(true);
        setSelectNumber(chosenNumber);
        setEnteredValue('');
    };

    const resetInputTextHandler = () => {
        setEnteredValue('');
        setConfirmed(false);
    };

    let ConfirmedOutput;

    if(confirmed) {
        ConfirmedOutput = (
            <View>
                <Card style={styles.summaryContainer}>
                    <Text style={styles.summaryTitle}>Your Selected</Text>
                    <View style={styles.summaryBox}>
                        <Text style={styles.summaryText}>{selectNumber}</Text>
                    </View>
                    <MainButton style={styles.btnStart} onPress={()=>{props.onStartGame(selectNumber)}} >Start Game</MainButton>
                </Card>
            </View>
        );
    }

    return(
        <ScrollView>
            <TouchableNativeFeedback onPress={()=>Keyboard.dismiss()}>
                <View style={styles.container}>
                    <Text style={styles.textTitle} >Start a new Game</Text>
                    <Card style={styles.Card}>
                        <Text style={styles.text}>Select a Number</Text>
                        <Input
                            onChangeText = {inputTextHandler}
                            value = {enteredValue}
                            autoFocus={true}
                            maxLength={2}
                            autoCapitalize = "none"
                            keyboardType = "number-pad"
                            blurOnSubmit
                            style={styles.input}
                        />
                        
                        <View style={styles.btnContainer}>
                            <MainButton style={styles.btnReset} onPress={resetInputTextHandler}>Reset</MainButton>
                            <MainButton style={styles.btnConfirm} onPress={confirmHandler}>Confirm</MainButton>
                        </View>
                    </Card>
                    {ConfirmedOutput}
                </View>
            </TouchableNativeFeedback>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container : {
        flex : 1,
        alignItems : 'center'
    },
    text : {
        fontSize : 15,
        fontWeight : 'bold',
        color : Color.primary
    },
    textTitle : {
        fontSize : 20,
        fontWeight : 'bold'
    },
    Card : {
        alignItems : 'center',
        backgroundColor : "white",
    },
    btnContainer : {
        marginTop : 15,
        flexDirection: 'row',
        justifyContent : 'space-around',
        width : '80%'
    },
    btnConfirm : {
        backgroundColor : Color.info
    },
    btnReset : {
        backgroundColor : Color.danger
    },
    btnStart : {
        backgroundColor : Color.primary
    },
    summaryContainer : {
        alignItems : 'center',
        backgroundColor : Color.info,
    },
    summaryTitle : {
        color : Color.accent
    },
    summaryText : {
        fontSize : 32,
        fontWeight : 'bold',
        color : Color.accent,
      
    },
    summaryBox : {
        marginVertical : 5,
        borderRadius : 5,
        padding : 10,
        elevation : 3
    }
});

export default StartGameScreen;