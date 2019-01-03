import * as React from "react";
import { View, Text, StyleSheet, TouchableHighlight } from "react-native";
import firebase from "react-native-firebase";
import * as API from '../../services/api';

export class User extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.userInfo}>
          <Text>User Info</Text>
        </View>
        <View style={styles.buttonGroup}>
          <TouchableHighlight
            style={{ ...styles.button, backgroundColor: "blue" }}
          >
            <Text>Change Profile</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={this._signOut} style={styles.button}>
            <Text>Sign Out</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={{ ...styles.button, backgroundColor: "red" }}
          >
            <Text>Delete Account</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
  _signOut = () => {
    firebase.auth().signOut();
    this.props.navigation.goBack();
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "stretch"
  },
  userInfo: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonGroup: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around"
  },
  button: {
    width: 100,
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
