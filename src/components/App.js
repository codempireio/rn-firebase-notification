import React, { Component } from "react";
import { Platform, StyleSheet, TextInput, View, Button } from "react-native";
import firebase from "react-native-firebase";

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});

export default class App extends Component {
  constructor() {
    super();
    this.unsubscribe = null;
    this.state = {
      user: null,
      phoneNumber: "",
    };
  }
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

    // User listener
    this.unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user: user.toJSON() });
        console.log(this.state.user, 'from CDM');
      } else {
        // User has been signed out, reset the state
        this.setState({
          user: null,
          phoneNumber: "",
        });
      }
    });
  }
  componentWillUnmount() {
    this.notificationDisplayedListener();
    this.notificationListener();
    this.notificationOpenedListener();
    if (this.unsubscribe) this.unsubscribe();
  }
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={{
            height: 40,
            width: 200,
            borderColor: "gray",
            borderWidth: 1
          }}
          onChangeText={number => this.setState({ phoneNumber: number })}
          value={this.state.phoneNumber}
          editable={true}
        />
        <Button onPress={this._authByPhone} title="Sign In" color="#841584" />
        <Button onPress={this._signOut} title="Sign Out" color='red'/>
      </View>
    );
  }
  _signOut = () => {
    firebase.auth().signOut();
    console.log(this.state.user);
  };
  _authByPhone = async () => {
    const { phoneNumber: number } = this.state;
    const result = await firebase.auth().signInWithPhoneNumber(number);
    const code = "777777";
    const user = await result.confirm(code);
    console.log(user.toJSON());
    const httpsCallable = firebase.functions().httpsCallable("helloWorld");
    const fcmToken = await firebase.messaging().getToken();
    console.log(fcmToken);
    httpsCallable({ token: fcmToken, user: this.state.user.phoneNumber })
      .then(data => {
        debugger;
        console.log(data); // hello world
      })
      .catch(httpsError => {
        debugger;
      });
  };
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
