// Import Firebase modules
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";
import { app } from "./app.js"; // Import the Firebase app instance from app.js

// Initialize Firebase Auth
const auth = getAuth(app);

// Sign Out
const signOutButton = document.getElementById('signOutButton');
if (signOutButton) {
    signOutButton.addEventListener('click', () => {
        console.log('Sign-Out button clicked.'); // Debugging: Check if this logs
        signOut(auth)
            .then(() => {
                // Sign-out successful
                console.log('User signed out.');
                // Redirect to the sign-in page
                window.location.href = 'index.html';
            })
            .catch((error) => {
                // Handle errors
                console.error('Error signing out:', error.message);
                alert('Error signing out. Please try again.');
            });
    });
} else {
    console.error('Sign-Out button not found.');
} 
