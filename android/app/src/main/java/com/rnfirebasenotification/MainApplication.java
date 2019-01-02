package com.rnfirebasenotification;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import io.invertase.firebase.RNFirebasePackage; 
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import io.invertase.firebase.messaging.RNFirebaseMessagingPackage; // firebase-message
import io.invertase.firebase.notifications.RNFirebaseNotificationsPackage; // firebase-notification
import io.invertase.firebase.auth.RNFirebaseAuthPackage; // firebase - auth
import io.invertase.firebase.functions.RNFirebaseFunctionsPackage; // firebase cloud function
import io.invertase.firebase.database.RNFirebaseDatabasePackage; // firebase database
import io.invertase.firebase.firestore.RNFirebaseFirestorePackage; // firestore

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNGestureHandlerPackage(),
          new RNFirebasePackage(),
          new RNFirebaseMessagingPackage(), // firebase-message
          new RNFirebaseNotificationsPackage(), // firebase-notification
          new RNFirebaseAuthPackage(), // firebase - auth
          new RNFirebaseFunctionsPackage(), // firebase cloud function
          new RNFirebaseDatabasePackage(), // firebase database
          new RNFirebaseFirestorePackage() // firestore
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
