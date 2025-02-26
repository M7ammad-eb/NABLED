// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";

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
const auth = getAuth(app);

// Log Firebase initialization
console.log('Firebase initialized:', app);

// Google Sign-In Provider Configuration
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: 'select_account' // Forces account selection even if one account is available
});

// Google Sign-In
const signInButton = document.getElementById('signInButton');
if (signInButton) {
    signInButton.addEventListener('click', () => {
        console.log('Sign-In button clicked.'); // Debugging: Check if this logs
        signInWithPopup(auth, provider)
            .then((result) => {
                // Signed in successfully
                const user = result.user;
                console.log('Signed in as:', user.displayName);
                // Redirect to the main app page
                window.location.href = 'main.html'; // Replace with your main app page
            })
            .catch((error) => {
                // Handle errors
                console.error('Error signing in:', error.message);
                alert('Error signing in. Please try again.');
            });
    });
} else {
    console.error('Sign-In button not found.');
}

// Check if the user is already signed in
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, redirect to the main app page
        console.log('User is already signed in:', user.displayName);
        window.location.href = 'main.html'; // Replace with your main app page
    } else {
        console.log('No user signed in.');
    }
});
