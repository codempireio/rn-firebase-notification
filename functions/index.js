var functions = require("firebase-functions");
var admin = require("firebase-admin");

admin.initializeApp(functions.config().firebase); // not try

exports.helloWorld = functions.https.onCall(data => {
  var payload = {
    notification: {
      title: "test",
      body: "hello"
    }
  };
  console.log(data.token)
  return admin.messaging().sendToDevice(data.token, payload);
  // return { message: "hello" };
});
