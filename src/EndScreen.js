import React from 'react';
import {View, Text, Button, Image, StyleSheet} from 'react-native';

export const EndScreen = ({getWinner, reset}) => {
  return (
    <View style={styles.wrap}>
      <Text>Конец игры</Text>
      {
        getWinner() === 'player' ? renderPlayerWin() : renderRobotWin()
      }
      <Button
      title="Играть еще раз"
      color="#c56000"
      onPress={reset}
      />
    </View>
  );
}

const renderPlayerWin = () => (
  <>
    <Text style={styles.status}>Победа!</Text>

    <Image
    style={styles.icon}
    source={require('../assets/cup.png')}
    />
  </>
  );

const renderRobotWin = () => (
  <>
    <Text style={styles.status}>Поражение!</Text>

    <Image
    style={styles.icon}
    source={require('../assets/sad.png')}
    />
  </>
  );

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  icon: {
    height: 200,
    width: 200,
  },
  status: {
    fontSize: 42,
  }
});