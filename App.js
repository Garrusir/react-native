import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { StartScreen } from './src/StartScreen';
import { EndScreen } from './src/EndScreen';


export default function App() {
  const [playerScore, setPlayerScore] = useState(99);
  const [robotScore, setRobotScore] = useState(99);
  const [isPlayerTurn, setPlayerTurn] = useState(true);

  const getRandom = () => {
    return Math.floor(Math.random() * Math.floor(6)+1);
  }

  const addPlayerScore = () => {
    setPlayerScore(prev => prev+getRandom()+getRandom());
    playerScore < 100 ? addRobotScore() : null;
  }

  const addRobotScore = () => {
    setPlayerTurn(false);
    setTimeout(()=> {
      setRobotScore(prev => prev+getRandom()+getRandom());
      setPlayerTurn(true);
    }, 1500);
  }

  const getWinner = () => {
    return playerScore >= 100 ? 'player' : 'robot';
  }

  const reset = () => {
    setPlayerScore(0);
    setRobotScore(0);
    setPlayerTurn(true);
  }


  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleText}>Игра</Text>
      </View>

{
  playerScore < 100 && robotScore < 100 ?
    <StartScreen
    isPlayerTurn={isPlayerTurn}
    playerScore={playerScore}
    robotScore={robotScore}
    clickHandler={ addPlayerScore }/>
    :
    <EndScreen getWinner={getWinner} reset={reset}/>
}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  title: {
    height: 70,
    padding: 10,
    backgroundColor: '#ff8f00',
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleText: {
    fontSize: 21,
  },
});
