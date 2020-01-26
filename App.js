import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import StartGameScereen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';  
import Header from './components/Header';
import Color from './constant/Color';
import { AppLoading } from 'expo';
import GameOverScreen from './screens/GameOverScreen';


const fetchFont = () => {
  Font.loadAsync({
      'open-sans' : require('./assets/fonts/OpenSans-Regular.ttf'),
      'open-sans-bold' : require('./assets/fonts/OpenSans-Bold.ttf')  
  });
};

export default function App() {

  const [dataLoaded, setDataLoaded] = useState(false);
  const [userNumber, setUserNumber] = useState();
  const [roundGuess, setRoundGuess] = useState(0);


  if(!dataLoaded) {
    <AppLoading
      startAsync = {fetchFont}
      onFinish = {()=>setDataLoaded(true)}
      onError = {(e)=>Console.log(e)}
    />
  }
  const startGameHandler = number => {
    setUserNumber(number);
  };

  const onGameOverHandler = (roundGuess) => {
    setRoundGuess(roundGuess);
  };

  const onRestartGameHandler = () => {
    setRoundGuess(0);
    setUserNumber(null);
  }

  let content = <StartGameScereen onStartGame={startGameHandler} />;
  if(userNumber && roundGuess <= 0) {
    content = <GameScreen userNumber = {userNumber} onGameOver={onGameOverHandler} />;
  } else if(roundGuess > 0) {
    content = <GameOverScreen roundGuess = {roundGuess} selectedNumber={userNumber} onRestartGame = {onRestartGameHandler} />
  }

  return (
    <View style={styles.container}>
      <Header title="Guess Number App" />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.light,
  },
});
