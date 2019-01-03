import firebase from "react-native-firebase";

class NotificationApi {
  notificationListener = async () => {
    const androidChannelId = "test-channel";
    const notification = await firebase.notifications().onNotification();
    this._createChannel(androidChannelId);
    notification.android
      .setChannelId(androidChannelId)
      .android.setSmallIcon("ic_launcher");
      firebase.notifications().displayNotification(notification);
  };
  _getToken = async () => {
    const token = await firebase.messaging().getToken()
    return token;
  }
  _requestPermission = async () => {
    const permission = await firebase.messaging().requestPermission();
    return permission;
  };
  _checkPermission = async () => {
    const isEnable = await firebase.messaging().hasPermission();
  };
  _createChannel = channelId => {
    const channel = new firebase.notifications.Android.Channel(
      channelId,
      "Test Channel",
      firebase.notifications.Android.Importance.Max
    ).setDescription("My apps test channel");
    firebase.notifications().android.createChannel(channel);
  };
}

export const NotificationApi = new NotificationApi();
