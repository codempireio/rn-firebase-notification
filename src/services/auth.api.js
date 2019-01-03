import firebase from "react-native-firebase";

class Auth {
  // TODO: fix it, done
  _userPhone = null;
  signInByPhone = async number => {
    try {
      _userPhone = await firebase.auth().signInWithPhoneNumber(number);
    } catch (e) {
      console.log(e);
    }
  };
  userConfirm = async confirmCode => {
    try {
      const user = await _userPhone.confirm(confirmCode);
      const phoneNumber = user.toJSON().phoneNumber;
      return phoneNumber;
    } catch (e) {
      console.log(e);
    }
  };
  userAuthListener = (successCallback) => {
    return firebase.auth().onAuthStateChanged(successCallback);
  };
}

export const AuthAPI = new Auth();
