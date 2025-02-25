// Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
  const analytics = getAnalytics(app);

// Google Sign-In Button
window.onload = function () {
  google.accounts.id.initialize({
    client_id: "YOUR_GOOGLE_CLIENT_ID", // Replace with your Google Client ID
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
