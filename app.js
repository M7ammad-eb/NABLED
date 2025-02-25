// Import Firebase SDKs
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAzgx1Ro6M7Bf58dgshk_7Eflp-EtZc9io",
  authDomain: "nab-led.firebaseapp.com",
  projectId: "nab-led",
  storageBucket: "nab-led.appspot.com",
  messagingSenderId: "789022171426",
  appId: "1:789022171426:web:2d8dda594b1495be26457b",
  measurementId: "G-W58SF16RJ6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Function to handle Google Sign-In
function signInWithGoogle() {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      console.log("User signed in: ", user);
      document.getElementById("user-info").textContent = `Signed in as: ${user.displayName}`;
      toggleSignInUI(false); // Hide the sign-in button after success
    })
    .catch((error) => {
      console.error("Error signing in: ", error.message);
    });
}

// Function to sign out the user
function signOutUser() {
  signOut(auth)
    .then(() => {
      console.log("User signed out.");
      document.getElementById("user-info").textContent = "";
      toggleSignInUI(true); // Show the sign-in button again
    })
    .catch((error) => {
      console.error("Error signing out: ", error.message);
    });
}

// Function to toggle UI elements based on sign-in state
function toggleSignInUI(isSignedIn) {
  if (isSignedIn) {
    document.getElementById("sign-in-btn").style.display = "block";
    document.getElementById("sign-out-btn").style.display = "none";
  } else {
    document.getElementById("sign-in-btn").style.display = "none";
    document.getElementById("sign-out-btn").style.display = "block";
  }
}

// Check the user's sign-in status
onAuthStateChanged(auth, (user) => {
  if (user) {
    document.getElementById("user-info").textContent = `Signed in as: ${user.displayName}`;
    toggleSignInUI(false);
  } else {
    document.getElementById("user-info").textContent = "";
    toggleSignInUI(true);
  }
});

// Event listener for the sign-in button
document.getElementById("sign-in-btn")?.addEventListener("click", signInWithGoogle);

// Event listener for the sign-out button
document.getElementById("sign-out-btn")?.addEventListener("click", signOutUser);
