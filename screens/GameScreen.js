import { View, StyleSheet, Text, Alert, FlatList, ScrollView } from "react-native";
import React, {useState, useRef, useEffect} from "react";
import Color from "../constant/Color";
import Card from "../components/Card";
import MainButton from "../components/MainButton";
import { Ionicons } from '@expo/vector-icons';


const generateRandom = (min,max,exclude) => {
    min = Math.ceil(min);
    max = Math.ceil(max);
    const rndNum = Math.floor(Math.random() * (max - min)) + min;
    if(rndNum === exclude) {
        return generateRandom(min, max, exclude);
    } else {
        return rndNum;
    }
};




const GameScreen = props => {

    const initilGuess = generateRandom(1,100,props.userNumber)
    const [currentGuess, setCurrentGuess] = useState(initilGuess);
    const [passGuess, setPassGuess] = useState([initilGuess.toString()]);
    

    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    useEffect(() => {
        if(currentGuess === props.userNumber) {
            props.onGameOver(passGuess.length);
        }
    }, [currentGuess, props.userNumber, props.onGameOver]);

    const nextGuessHandler = (direction) => {
        if(direction === 'lower' && currentGuess < props.userNumber || direction === 'greater' && currentGuess > props.userNumber) {
            Alert.alert('Don\'t lie', 'You know this is wromg...',[{text : 'sorry', style: 'cancel'}]);
            return;
        } else {
            if(direction === 'lower') {
                currentHigh.current = currentGuess;
            } else {
                currentLow.current = currentGuess;
            }
            const nextNumber = generateRandom(currentLow.current,currentHigh.current, currentGuess);
            setCurrentGuess(nextNumber);
            setPassGuess((currPassGuess)=>[nextNumber.toString(), ...currPassGuess]);   
        }
    }

    const renderListItem = (lengthList, itemData) => {
        return( 
             <View style={styles.listItem}>
                 <Text style={{color:'white', fontSize : 20}}>#{lengthList - itemData.index}</Text>
                 <Text style={{color:'white', fontSize : 20}}>{itemData.item}</Text>
             </View>
        );
     };

   
    return(
        <ScrollView>
            <View style={styles.container}>
                <Text>Opponent's Game</Text>
                <View style={styles.boxNumber}>
                <Text style={styles.textNumber}>{currentGuess}</Text>
                </View>
                <Card style={{backgroundColor : 'white', alignItems : 'center'}}>
                    <View style={styles.btnContainer}>
                        <MainButton style={styles.btn} onPress={nextGuessHandler.bind(this,'lower')}>
                            <Ionicons name="md-remove"  size={45} color="white"/>
                        </MainButton>
                        <MainButton style={styles.btn} onPress={nextGuessHandler.bind(this,'greater')} >
                            <Ionicons name="md-add"  size={45} color="white"/>
                        </MainButton>
                    </View>
                </Card>
                <View style={styles.listContainer}>
                    
                    <FlatList 
                        contentContainerStyle = {styles.list}
                        keyExtractor = {item => item}
                        data = {passGuess}
                        renderItem = {renderListItem.bind(this, passGuess.length)}
                    />
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container : {
        flex : 1,
        alignItems : 'center'
    },
    boxNumber : {
        marginVertical : 10,
        borderColor : Color.accent,
        borderWidth: 3,
        borderRadius : 3,
        backgroundColor : 'white'
    },
    textNumber : {
        padding : 15,
        color : Color.accent,
        fontSize : 32
    },
    btnContainer : {
        flexDirection : 'row',
        justifyContent: 'space-around',
        width : '80%'
    },
    btn : {
        backgroundColor : Color.primary,
        padding : 5
     },
    listContainer : {
        flex : 1,
        width : '80%'
    }, 
    list : {
        flexGrow : 1,
        width : '100%',
    },
    listItem : {
        flex : 1,
        justifyContent : 'space-around',
        width : '100%',
        paddingHorizontal: 10,
        paddingVertical: 10,
        flexDirection: 'row',
        marginVertical : 3,
        backgroundColor : Color.accent,
        borderRadius : 10
    }
});

export default GameScreen;