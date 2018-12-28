import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import firebase from "react-native-firebase";

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});

export default class App extends Component {
  async componentDidMount() {
    const NotificationOpen = await firebase
      .notifications()
      .getInitialNotification();
    if (NotificationOpen) {
      const action = NotificationOpen.action;
      const Notification = NotificationOpen.notification;
      var seen = [];
      alert(
        JSON.stringify(Notification.data, function(key, val) {
          if (val != null && typeof val == "object") {
            if (seen.indexOf(val) >= 0) {
              return;
            }
            seen.push(val);
          }
          return val;
        })
      );
    }
    const channel = new firebase.notifications.Android.Channel(
      "test-channel",
      "Test Channel",
      firebase.notifications.Android.Importance.Max
    ).setDescription("My apps test channel");
    // Create the channel
    firebase.notifications().android.createChannel(channel);
    this.notificationDisplayedListener = firebase
      .notifications()
      .onNotificationDisplayed(Notification => {
        // Process your notification as required
        // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
      });
    this.notificationListener = firebase
      .notifications()
      .onNotification(Notification => {
        // Process your notification as required
        Notification.android
          .setChannelId("test-channel")
          .android.setSmallIcon("ic_launcher");
        firebase.notifications().displayNotification(Notification);
      });
    this.notificationOpenedListener = firebase
      .notifications()
      .onNotificationOpened(NotificationOpen => {
        // Get the action triggered by the notification being opened
        const action = NotificationOpen.action;
        // Get information about the notification that was opened
        const Notification = NotificationOpen.notification;
        var seen = [];
        alert(
          JSON.stringify(Notification.data, function(key, val) {
            if (val != null && typeof val == "object") {
              if (seen.indexOf(val) >= 0) {
                return;
              }
              seen.push(val);
            }
            return val;
          })
        );
        firebase
          .notifications()
          .removeDeliveredNotification(Notification.notificationId);
      });
  }
  componentWillUnmount() {
    this.notificationDisplayedListener();
    this.notificationListener();
    this.notificationOpenedListener();
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Hello to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
