import React from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet
} from "react-native";

export default class UpdateContact extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);

    this.state = {
      firstName: this.props.contact.firstName || '',
      lastName: this.props.contact.lastName ||  '',
      phone:  this.props.contact.phone || '',
    };
  }

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
        <Button title="Сохранить изменения" color="#29434e" onPress={() => this.props.onSave({
          id: this.props.contact.id,
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