var functions = require("firebase-functions");
var admin = require("firebase-admin");

admin.initializeApp(functions.config().firebase); 

exports.helloWorld = functions.https.onCall(data => {
  var payload = {
    notification: {
      title: "test",
      body: `User ${data.user} has signed in`
    }
  };
  console.log(data.token)
  return admin.messaging().sendToDevice(data.token, payload);
  // return { message: "hello" };
});
