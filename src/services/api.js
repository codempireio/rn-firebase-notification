import firebase from "react-native-firebase";

export const getUsers = async () => {
  try {
    const data = await firebase
      .database()
      .ref("users/")
      .once("value");
    return data.val();
  } catch (e) {
    console.log(e);
    return null;
  }
};

// export const notificationsListener = async () => {
//   const NotificationOpen = await firebase
//     .notifications()
//     .getInitialNotification();
//   if (NotificationOpen) {
//     const action = NotificationOpen.action;
//     const Notification = NotificationOpen.notification;
//     var seen = [];
//     alert(
//       JSON.stringify(Notification.data, function(key, val) {
//         if (val != null && typeof val == "object") {
//           if (seen.indexOf(val) >= 0) {
//             return;
//           }
//           seen.push(val);
//         }
//         return val;
//       })
//     );
//   }
//   const channel = new firebase.notifications.Android.Channel(
//     "test-channel",
//     "Test Channel",
//     firebase.notifications.Android.Importance.Max
//   ).setDescription("My apps test channel");
//   // Create the channel
//   firebase.notifications().android.createChannel(channel);
//   this.notificationDisplayedListener = firebase
//     .notifications()
//     .onNotificationDisplayed(Notification => {
//       // Process your notification as required
//       // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
//     });
//   this.notificationListener = firebase
//     .notifications()
//     .onNotification(Notification => {
//       // Process your notification as required
//       Notification.android
//         .setChannelId("test-channel")
//         .android.setSmallIcon("ic_launcher");
//       firebase.notifications().displayNotification(Notification);
//     });
//   this.notificationOpenedListener = firebase
//     .notifications()
//     .onNotificationOpened(NotificationOpen => {
//       // Get the action triggered by the notification being opened
//       const action = NotificationOpen.action;
//       // Get information about the notification that was opened
//       const Notification = NotificationOpen.notification;
//       var seen = [];
//       alert(
//         JSON.stringify(Notification.data, function(key, val) {
//           if (val != null && typeof val == "object") {
//             if (seen.indexOf(val) >= 0) {
//               return;
//             }
//             seen.push(val);
//           }
//           return val;
//         })
//       );
//       firebase
//         .notifications()
//         .removeDeliveredNotification(Notification.notificationId);
//     });
// };

export const callCloudFunctionWithData = async (functionName, data) => {
  try {
    const httpsCallable = firebase.functions().httpsCallable(functionName);
    const fcmToken = await firebase.messaging().getToken();
    await httpsCallable({
      token: fcmToken,
      ...data
    });
  } catch(e) {
    console.log(e)
  }
}