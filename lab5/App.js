import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Button,
  FlatList
} from "react-native";
import Constants from "expo-constants";
import * as SQLite from 'expo-sqlite';

import AddContact from './src/AddContact.js';
import UpdateContact from './src/UpdateContact.js';
import Contact from './src/Contact.js';

const db = SQLite.openDatabase("contacts.db");

export default class App extends React.Component {
  state = {
    isAdding: false,
    isUpdating: false,
    contacts: [],
    updatedContact: {}
  };

  componentDidMount() {
    db.transaction(tx => {
      tx.executeSql(
        "create table if not exists contacts (id integer primary key not null, firstName text, lastName text, phone text);"
      );
      tx.executeSql("select * from contacts", [], (_, {rows}) => this.setState({ contacts: rows._array }))
    });
  }

  add = ({ firstName, lastName, phone }) => {
    if (!firstName && !lastName && !phone) {
      return false;
    }

     db.transaction(
      tx => {
        tx.executeSql("insert into contacts (firstName, lastName, phone) values (?, ?, ?)", [firstName, lastName, phone]);
        tx.executeSql("select * from contacts", [], (_, {rows}) => this.setState({ contacts: rows._array }))
      },
      (err) => console.log('ERROR'),
      (suc) => console.log('success')
    );
      this.setState({
        isAdding: false
      })
  }

  remove = (id) => {
    db.transaction(
      tx => {
        tx.executeSql(`delete from contacts where id = ?;`, [id]);
        tx.executeSql("select * from contacts", [], (_, {rows}) => 
          this.setState({ contacts: rows._array }))
      },
      (err) => console.log('ERROR'),
      () => console.log('deleted')
    )
  }

  update = (id) => {
    db.transaction(tx => {
      tx.executeSql(
        `select * from contacts where id = ?;`,
        [id],
        (_, { rows: { _array } }) => this.setState({ updatedContact: _array[0] }, () =>  this.setState({isUpdating: true }))
      );
    });
  }

  save = ({ firstName, lastName, phone, id }) => {
    db.transaction(
      tx => {
        tx.executeSql(`update contacts set firstName = ?, lastName = ?, phone = ? where id = ?;`, [
          firstName, lastName, phone, id
        ]);
        tx.executeSql("select * from contacts", [], (_, {rows}) => {
          // console.log(rows);
          this.setState({ contacts: rows._array })})
      },
      (err) => console.log('ERROR'),
      () => console.log('saved')
    )

    this.setState({
      isUpdating: false
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Контакты</Text>
        {
          !this.state.isAdding && !this.state.isUpdating &&
          <View style={styles.flexRow}>
            <Button title="Добавить Контакт" color="#29434e" onPress={() => this.setState({ isAdding: true })}/>
              <FlatList 
                data={this.state.contacts}
                scrollEnabled={true}
                renderItem={({ item }) =>
                   <Contact 
                     id={item.id} 
                     firstName={item.firstName} 
                     lastName={item.lastName}
                     phone={item.phone}
                     onRemove={this.remove}
                     onUpdate={this.update}
                   />
                 }
                keyExtractor={item => item.id}
              />
          </View>
        }
        {
          this.state.isAdding && <AddContact onAdd={this.add} />
        }
        {
          this.state.isUpdating && <UpdateContact contact={this.state.updatedContact} onSave={this.save} />
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    paddingTop: Constants.statusBarHeight
  },
  heading: {
    fontSize: 20,
    marginBottom: 8,
    fontWeight: "bold",
    textAlign: "center"
  },
});