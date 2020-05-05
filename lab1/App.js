import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { StartScreen } from './src/StartScreen';
import { EndScreen } from './src/EndScreen';


export default function App() {
  const [playerScore, setPlayerScore] = useState(0);
  const [robotScore, setRobotScore] = useState(0);
  const [isPlayerTurn, setPlayerTurn] = useState(true);
  const [firstDice, setFirstDice] = useState(0);
  const [secondDice, setSecondDice] = useState(0);
  const [isDouble, setIsDouble] = useState(false);


  function getRandom() {
    return Math.floor(Math.random() * Math.floor(6)+1);
  }

  function trowDices() {
    let [first, second] = [getRandom(), getRandom()];
    setFirstDice(first);
    setSecondDice(second);

    if (first === second) {
      setIsDouble(true);
      const interval = setInterval(() => {
        let [first, second] = [getRandom(), getRandom()];
        setFirstDice(first);
        setSecondDice(second);

        if (first !== second) {
          clearInterval(interval);
          setIsDouble(false);
        }
      }, 2000)
    }

    return [first, second];
  }

  const addPlayerScore = () => {
    let [first, second] = trowDices();

    setPlayerScore(prev => prev+first+second);
    playerScore < 100 ? addRobotScore() : null;
  }

  const addRobotScore = () => {
    setPlayerTurn(false);
    setTimeout(() => {
      let [first, second] = trowDices();
      setRobotScore(prev => prev+first+second);
      setPlayerTurn(true);
    }, 2000)
  }

  const getWinner = () => {
    return playerScore >= 100 ? 'player' : 'robot';
  }

  const reset = () => {
    setPlayerScore(0);
    setRobotScore(0);
    setFirstDice(0);
    setSecondDice(0)
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
    firstDice={firstDice}
    secondDice={secondDice}
    isDouble={isDouble}
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
