var functions = require("firebase-functions");
var admin = require("firebase-admin");

admin.initializeApp(functions.config().firebase); 

exports.userSingInNotification = functions.https.onCall(data => {
  var payload = {
    notification: {
      title: "test",
      body: `User ${data.user} has signed in`
    }
  };
  return admin.messaging().sendToDevice(data.token, payload);
});
