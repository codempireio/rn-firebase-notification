import * as React from "react";
import firebase from "react-native-firebase";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  Text
} from "react-native";
import { USER } from "../Navigation/screenCases";

export class AuthScreen extends React.Component {
  constructor(props) {
    super(props);
    this.unsubscribe = null;
    this.state = {
      user: null,
      phoneNumber: ""
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

    this.unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user: user.toJSON() });
        this.props.navigation.navigate(USER, { ...user.toJSON() });
      } else {
        this.setState({
          user: null,
          phoneNumber: ""
        });
      }
    });
  }
  componentWillUnmount() {
    if (this.unsubscribe) this.unsubscribe();
    this.notificationDisplayedListener();
    this.notificationListener();
    this.notificationOpenedListener();
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.phoneInput}
          onChangeText={number => this.setState({ phoneNumber: number })}
          value={this.state.phoneNumber}
        />
        <TouchableHighlight style={styles.button} onPress={this._authByPhone}>
          <Text style={styles.buttonText}>SIGN IN</Text>
        </TouchableHighlight>
      </View>
    );
  }
  _authByPhone = async () => {
    try {
      const { phoneNumber: number } = this.state;
      const result = await firebase.auth().signInWithPhoneNumber(number);
      const code = "777777";
      const user = await result.confirm(code);
      console.log(user.toJSON());
      this._createNotification(user.toJSON().phoneNumber);
    } catch (e) {
      console.log(e);
    }
  };
  _createNotification = async phoneNumber => {
    try {
      const httpsCallable = firebase.functions().httpsCallable("helloWorld");
      const fcmToken = await firebase.messaging().getToken();
      await httpsCallable({
        token: fcmToken,
        user: phoneNumber
      });
    } catch (e) {
      console.log(e);
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  phoneInput: {
    height: 40,
    width: 200,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 15
  },
  button: {
    width: 100,
    height: 45,
    borderWidth: 1,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonText: {
    color: "red",
    fontWeight: "bold"
  }
});
