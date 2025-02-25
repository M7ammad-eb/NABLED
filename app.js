// Google Sign-In
const signInButton = document.getElementById('signInButton');
if (signInButton) {
    signInButton.addEventListener('click', () => {
        const provider = new firebase.auth.GoogleAuthProvider();
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
}

// Check if the user is already signed in
auth.onAuthStateChanged((user) => {
    if (user) {
        // User is signed in, redirect to the main app page
        window.location.href = 'main.html'; // Replace with your main app page
    }
});
