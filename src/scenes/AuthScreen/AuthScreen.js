import * as React from "react";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  Text
} from "react-native";
import { USER } from "../Navigation/screenCases";
import * as API from "../../services/api";
import { AuthAPI } from "../../services/auth.api";
import { notificationApi } from "../../services/notification.api";

export class AuthScreen extends React.Component {
  unsubscribe = null;
  state = {
    phoneNumber: "",
    isSend: false,
    confirmCode: ""
  };
  async componentDidMount() {
    this.notificationListener = this.startNotificationsListener();
    this.unsubscribe = AuthAPI.userAuthListener(this._checkUser);
  }
  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
    this.notificationDisplayedListener();
    this.notificationListener();
    this.notificationOpenedListener();
  }
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.phoneInput}
          onChangeText={this.onPhoneNumberChange}
          value={this.state.phoneNumber}
        />
        <TouchableHighlight
          style={styles.button}
          onPress={this._inputPhoneNumber}
        >
          <Text style={styles.buttonText}>SIGN IN</Text>
        </TouchableHighlight>
        {this.state.isSend ? (
          <View>
            <TextInput
              style={styles.phoneInput}
              onChangeText={this.onConfirmCodeChange}
              value={this.state.confirmCode}
            />
            <TouchableHighlight
              style={styles.button}
              onPress={this._userConfirm}
            >
              <Text style={styles.buttonText}>CONFIRM</Text>
            </TouchableHighlight>
          </View>
        ) : null}
      </View>
    );
  }
  onPhoneNumberChange = number => {
    this.setState({ phoneNumber: number });
  };
  onConfirmCodeChange = confirmCode => {
    this.setState({ confirmCode });
  };
  _checkUser = user => {
    if (user) {
      const parsedUser = user.toJSON();
      this.props.navigation.navigate(USER, { ...parsedUser });
    } else {
      this.setState({
        phoneNumber: "",
        isSend: false,
        confirmCode: ""
      });
    }
  };
  startNotificationsListener = async () => {
    await notificationApi.notificationListener();
  };
  _inputPhoneNumber = async () => {
    try {
      const { phoneNumber: number } = this.state;
      await AuthAPI.signInByPhone(number);
      this.setState({
        isSend: true
      });
    } catch (e) {
      console.error(e);
    }
  };
  _userConfirm = async () => {
    const { confirmCode } = this.state;
    const phoneNumber = await AuthAPI.userConfirm(confirmCode);
    this._createNotification(phoneNumber);
    this.setState({
      phoneNumber: "",
      isSend: false,
      confirmCode: ""
    });
  };

  _createNotification = async phoneNumber => {
    try {
      const data = { user: phoneNumber };
      await API.callCreateNotificationFunction(data);
    } catch (e) {
      console.error(e);
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
