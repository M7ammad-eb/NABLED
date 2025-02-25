// Import necessary Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-analytics.js";

// Firebase configuration object
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
const analytics = getAnalytics(app);

// Set up Google Sign-In button
const googleSignInButton = document.getElementById('google-sign-in-btn');

// Sign-In with Google function
googleSignInButton.addEventListener("click", async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    console.log("User signed in:", user);
    alert("Signed in as: " + user.displayName);

    // Redirect to another page upon successful login
    window.location.href = '/dashboard.html';  // Redirect to the dashboard page

  } catch (error) {
    console.error("Error during sign-in:", error);
  }
});

// Check for user authentication state
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User signed in: ", user);
    alert("User signed in: " + user.displayName);
    window.location.href = '/dashboard.html';  // Redirect to another page if already signed in
  } else {
    console.log("No user is signed in.");
  }
});
