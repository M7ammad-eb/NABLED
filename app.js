// Firebase Configuration (Replace with your real Firebase keys)
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
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Google Sign-In Button
window.onload = function () {
  google.accounts.id.initialize({
    client_id: "789022171426-82jp2174bbu0lcqrbc7c07qul0fu7oma.apps.googleusercontent.com",
    callback: handleCredentialResponse
  });

  google.accounts.id.renderButton(
    document.getElementById("signInDiv"),
    { theme: "outline", size: "large" }
  );

  google.accounts.id.prompt();
};

// Handle Google Sign-In
function handleCredentialResponse(response) {
  console.log("Google Token ID:", response.credential);

  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider)
    .then((result) => {
      const user = result.user;
      console.log("User signed in:", user.displayName, user.email);
    })
    .catch((error) => {
      console.error("Sign-in error:", error.message);
    });
}
