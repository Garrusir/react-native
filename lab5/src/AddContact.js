import React from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet
} from "react-native";

export default class AddContact extends React.Component {
  state = {
    firstName: '',
    lastName: '',
    phone: '',
  };

  render() {
    return (
      <View style={styles.container}>
       <TextInput
          style={styles.input}
          placeholder="Имя"
          onChangeText={text => this.setState({ firstName: text })}
          value={this.state.firstName}
        />
        <TextInput
          style={styles.input}
          placeholder="Фамилия"
          onChangeText={text => this.setState({ lastName: text })}
          value={this.state.lastName}
        />
        <TextInput
          style={styles.input}
          placeholder="Телефон"
          onChangeText={text => this.setState({ phone: text })}
          value={this.state.phone}
        />
        <Button title="Добавить" color="#29434e" onPress={() => this.props.onAdd({
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          phone: this.state.phone
        })}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    padding: 20
  }
});
