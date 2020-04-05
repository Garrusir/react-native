import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

export const StartScreen = ({isPlayerTurn, playerScore, robotScore,clickHandler}) => {
  return (
    <View style={styles.wrap}>
      <View>
        <Text style={styles.description}>Бросайте два кубика и наберите 100 очков быстрее соперника</Text>
      </View>
      <View style={styles.score}>
        <View style={styles.scoreWrap}>
          <Text style={styles.scorePoints} >{ playerScore }</Text>
          <Text>Вы</Text>
        </View>
        <View>
          <Text style={styles.scorePoints} >{ robotScore }</Text>
          <Text>Соперник</Text>
        </View>
      </View>
      <View>
        <Text style={styles.state}>{ isPlayerTurn ? 'Ваш ход' : 'Противник бросает кубик' }</Text>
      </View>
      <Button
      disabled={!isPlayerTurn}
      color="#c56000"
      onPress={clickHandler}
      title="Бросить кубик"
      />
    </View>
    )
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-around',
  },
  description: {
    fontSize: 18,
    marginVertical: 10,
  },
  score: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    fontSize: 21,
  },
  scoreWrap: {
    alignItems: 'center',
  },
  scorePoints: {
    fontSize: 42,
    fontWeight: 'bold',
    marginTop: 20,
  },
  state: {
    textAlign: 'center',
  }
})