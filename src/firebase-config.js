/**
 * To find your Firebase config object:
 *
 * 1. Go to your [Project settings in the Firebase console](https://console.firebase.google.com/project/_/settings/general/)
 * 2. In the "Your apps" card, select the nickname of the app for which you need a config object.
 * 3. Select Config from the Firebase SDK snippet pane.
 * 4. Copy the config object snippet, then add it here.
 */
const config = {
  apiKey: "AIzaSyDwepcaszd99DSmBOS8uVAr7AYwy0gF_Bw",
  authDomain: "photo-tagging-d6f44.firebaseapp.com",
  projectId: "photo-tagging-d6f44",
  storageBucket: "photo-tagging-d6f44.appspot.com",
  messagingSenderId: "978683866319",
  appId: "1:978683866319:web:0c14c957d9fa8190929bba",
};

export function getFirebaseConfig() {
  if (!config || !config.apiKey) {
    throw new Error(
      "No Firebase configuration object provided." +
        "\n" +
        "Add your web app's configuration object to firebase-config.js"
    );
  } else {
    return config;
  }
}
