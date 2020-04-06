import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

export const StartScreen = ({isPlayerTurn, playerScore, robotScore, firstDice, secondDice, isDouble,clickHandler}) => {
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
        <Text style={styles.state}>{ isPlayerTurn ? 'Противнику выпало:' : 'Вам выпало' }</Text>
      </View>

      <View style={styles.diceWrap}>
        <Text style={styles.dice}>{ firstDice }</Text>
        <Text style={styles.dice}>{ secondDice }</Text>
      </View>

      <View>
        <Text style={styles.state}>{ isPlayerTurn ? 'Ваш ход' : 'Противник бросает кубик' }</Text>
        <Text style={styles.state}>{ isDouble ? 'Выпал дубль! Кубики будут переброшены' : '' }</Text>
      </View>

      <Button
      disabled={!isPlayerTurn || isDouble}
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
  },
  diceWrap: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dice: {
    backgroundColor: '#fff',
    width: 70,
    height: 70,
    textAlign: 'center',
    lineHeight: 70,
    fontSize: 42,
    margin: 10,
    borderRadius: 2,
    elevation: 5,
  }

})