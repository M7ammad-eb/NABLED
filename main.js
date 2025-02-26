// Import Firebase modules
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";
import { app } from "./app.js"; // Import the Firebase app instance from app.js

// Initialize Firebase Auth
const auth = getAuth(app);

// Log Firebase Auth initialization
console.log('Firebase Auth initialized:', auth);

// Fetch data from Google Sheets
const sheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQhx959g4-I3vnLw_DBvdkCrZaJao7EsPBJ5hHe8-v0nv724o5Qsjh19VvcB7qZW5lvYmNGm_QvclFA/pub?output=csv';
let items = []; // Store fetched items

fetch(sheetUrl)
    .then(response => response.text())
    .then(data => {
        // Convert CSV to JSON
        items = csvToJson(data);
        console.log('Items:', items);
        // Display all items initially
        displayItems(items);
    })
    .catch(error => {
        console.error('Error fetching sheet data:', error);
    });

// Helper function to convert CSV to JSON
function csvToJson(csv) {
    const lines = csv.split('\n');
    const headers = lines[0].split(',');
    return lines.slice(1).map(line => {
        const values = line.split(',');
        return headers.reduce((obj, header, index) => {
            obj[header.trim()] = values[index].trim();
            return obj;
        }, {});
    });
}

// Display items in the app
function displayItems(items) {
    const itemList = document.getElementById('itemList');
    itemList.innerHTML = items.map(item => `
        <div class="item">
            <h3>${item.Name}</h3>
            <p>ID: ${item.ID}</p>
            <p>Price: ${item.Price}</p>
        </div>
    `).join('');
}

// Search functionality
const searchButton = document.getElementById('searchButton');
if (searchButton) {
    searchButton.addEventListener('click', () => {
        const query = document.getElementById('searchBox').value.toLowerCase();
        const filteredItems = items.filter(item =>
            item.ID.toLowerCase().includes(query) || item.Name.toLowerCase().includes(query)
        );
        displayItems(filteredItems);
    });
}

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
