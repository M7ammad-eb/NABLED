// Import the functions you need from the Firebase SDK
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// Firebase configuration (replace with your actual Firebase config)
const firebaseConfig = {
  apiKey: "AIzaSyAzgx1Ro6M7Bf58dgshk_7Eflp-EtZc9io",
  authDomain: "nab-led.firebaseapp.com",
  projectId: "nab-led",
  storageBucket: "nab-led.firebasestorage.app",
  messagingSenderId: "789022171426",
  appId: "1:789022171426:web:2d8dda594b1495be26457b",
  measurementId: "G-W58SF16RJ6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Handle Google sign-in
function onSignIn(googleUser) {
  const profile = googleUser.getBasicProfile();
  const user = googleUser.getAuthResponse();
  
  console.log("ID: " + profile.getId());
  console.log("Name: " + profile.getName());
  console.log("Image URL: " + profile.getImageUrl());
  console.log("Email: " + profile.getEmail());
  
  // If you'd like to store the user data in Firebase Auth:
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      console.log("User signed in:", user);
      // You can now store user data in your app (e.g., save in a database)
    })
    .catch((error) => {
      console.error("Error signing in:", error.message);
    });
}

// Optional: You can listen for state changes and sign out if needed
auth.onAuthStateChanged(function(user) {
  if (user) {
    console.log("Signed in as:", user.displayName);
  } else {
    console.log("User not signed in.");
  }
});
