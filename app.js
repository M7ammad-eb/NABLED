// Firebase configuration (using your provided configuration)
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
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

console.log("Firebase App initialized:", app);
console.log("Firebase Auth initialized:", auth);

// Google Sheets API Key and Spreadsheet ID (replace with your actual values)
const googleSheetsApiKey = "YOUR_GOOGLE_SHEETS_API_KEY"; //You still need to add this and the sheet ID.
const spreadsheetId = "YOUR_SPREADSHEET_ID"; //You still need to add this and the sheet ID.
const range = "Sheet1!A:Z"; // Adjust the range as needed

// Get DOM elements
const signInButton = document.getElementById("sign-in-button");
const testButton = document.getElementById("test-button");
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

console.log("signInButton:", signInButton);

// Event listeners
signInButton.addEventListener("click", () => {
    console.log("Sign-in button event triggered!");
    signInWithGoogle();
});

testButton.addEventListener("click", () => {
    console.log("Test button clicked!");
});

searchButton.addEventListener("click", handleSearch);

// Google Sign-In function
async function signInWithGoogle() {
  console.log("signInWithGoogle() function called");
  const provider = new firebase.auth.GoogleAuthProvider();
  try {
    console.log("Attempting sign-in");
    await auth.signInWithPopup(provider);
    const user = auth.currentUser;
    console.log("User signed in:", user);
    // You can now access user.email, user.uid, etc.
    //get user branch here.
    const branch = await getUserBranch(user.email);
    console.log("User Branch:", branch);

    //hide login button.
    signInButton.style.display = "none";
  } catch (error) {
    console.error("Sign-in error:", error);
  }
}

// Function to get user's branch from Google Sheets or Firebase
async function getUserBranch(userEmail) {

    const sheetData = await fetchGoogleSheetsData();
    for(let row of sheetData){
        if(row[0] === userEmail){ //assuming email is in the first column
            return row[1]; //assuming branch is in the second column
        }
    }
    return null; //user not found.
}

// Search function
function handleSearch() {
  const searchQuery = searchInput.value.trim();
    if (searchQuery) {
        // Redirect to results page with search query
        window.location.href = `results.html?q=${encodeURIComponent(searchQuery)}`;
    }
}

// Function to fetch data from Google Sheets
async function fetchGoogleSheetsData() {
  try {
    const response = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${googleSheetsApiKey}`
    );
    const data = await response.json();
    return data.values;
  } catch (error) {
    console.error("Error fetching Google Sheets data:", error);
    return [];
  }
}

// Check if user is already signed in
auth.onAuthStateChanged((user) => {
  if (user) {
    console.log("User is already signed in:", user);
    signInButton.style.display = "none";
    getUserBranch(user.email).then(branch => {
        console.log("User Branch:", branch);
    });
  } else {
    console.log("User is signed out");
  }
});
