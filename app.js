// Check if Firebase is initialized
if (!firebase.apps.length) {
    console.error('Firebase is not initialized.');
} else {
    console.log('Firebase is initialized.');
}

// Google Sign-In
const signInButton = document.getElementById('signInButton');
if (signInButton) {
    signInButton.addEventListener('click', () => {
        console.log('Sign-In button clicked.'); // Debugging: Check if this logs
        auth.signInWithPopup(provider)
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
auth.onAuthStateChanged((user) => {
    if (user) {
        // User is signed in, redirect to the main app page
        console.log('User is already signed in:', user.displayName);
        window.location.href = 'main.html'; // Replace with your main app page
    } else {
        console.log('No user signed in.');
    }
});
