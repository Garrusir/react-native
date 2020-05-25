import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

export default class Contact extends React.Component {
  render() {
    return (
      <TouchableOpacity 
        style={styles.contact} 
        onPress={() => this.props.onUpdate(this.props.id)} 
        onLongPress={() => this.props.onRemove(this.props.id)}
      >
        <Text style={styles.name}>{this.props.firstName} {this.props.lastName}</Text>
        <Text style={styles.phone}>{this.props.phone}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  contact: {
    flexDirection: 'row',
    borderColor: '#819ca9',
    borderWidth: 1,
    borderRadius: 3,
    padding: 20,
    margin: 6,
    justifyContent: 'space-between',
  }
});