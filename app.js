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
firebase.initializeApp(firebaseConfig);

// Handle Google Sign-In
function handleCredentialResponse(response) {
    const credential = firebase.auth.GoogleAuthProvider.credential(response.credential);
    firebase.auth().signInWithCredential(credential)
        .then((result) => {
            const user = result.user;
            document.getElementById("user-info").innerText = `Hello, ${user.displayName}`;
            document.getElementById("signOutBtn").style.display = "block";
        })
        .catch((error) => {
            console.error("Login Error:", error);
        });
}

// Handle Sign Out
document.getElementById("signOutBtn").addEventListener("click", () => {
    firebase.auth().signOut().then(() => {
        document.getElementById("user-info").innerText = "";
        document.getElementById("signOutBtn").style.display = "none";
    }).catch((error) => {
        console.error("Sign Out Error:", error);
    });
});
