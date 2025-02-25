import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-analytics.js";

// Firebase configuration
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
const auth = getAuth();
const analytics = getAnalytics(app);

// Get the sign-in button element
const googleSignInButton = document.getElementById("google-sign-in");
googleSignInButton.addEventListener("click", async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    // User is signed in, let's check the user info
    const user = result.user;
    console.log("Signed in as:", user.displayName);
    // After successful sign-in, handle UI updates or redirect
    window.location.href = '/dashboard.html';  // Redirect to the next page (e.g., dashboard)
  } catch (error) {
    console.error("Error during sign-in:", error);
  }
});

// Listen for auth state changes to track the user login status
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User signed in:", user);
    // Redirect to the dashboard page if user is signed in
    window.location.href = '/dashboard.html';  // Change this to your desired page
  } else {
    console.log("User not signed in.");
    // Optionally, show a login button or message here
  }
});
