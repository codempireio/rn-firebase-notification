import firebase from "react-native-firebase";

class Auth {
  // TODO: fix it, done
  _userPhone = null;
  signInByPhone = async number => {
    try {
      this._userPhone = await firebase.auth().signInWithPhoneNumber(number);
    } catch (e) {
      console.error(e);
    }
  };
  userConfirm = async confirmCode => {
    try {
      const user = await this._userPhone.confirm(confirmCode);
      const phoneNumber = user.toJSON().phoneNumber;
      return phoneNumber;
    } catch (e) {
      console.error(e);
    }
  };
  userAuthListener = (successCallback) => {
    return firebase.auth().onAuthStateChanged(successCallback);
  };
}

export const AuthAPI = new Auth();
