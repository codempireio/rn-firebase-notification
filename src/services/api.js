import firebase from "react-native-firebase";

export const getUsers = async () => {
  try {
    const data = await firebase
      .database()
      .ref("users/")
      .once("value");
    return data.val();
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const callCreateNotificationFunction = async (data) => {
  try {
    const functionName = 'userSingInNotification';
    const httpsCallable = firebase.functions().httpsCallable(functionName);
    const fcmToken = await firebase.messaging().getToken();
    await httpsCallable({
      token: fcmToken,
      ...data
    });
  } catch(e) {
    console.error(e)
  }
}