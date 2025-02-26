// Import Firebase modules
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";
import { app } from "./app.js"; // Import the Firebase app instance from app.js

// Initialize Firebase Auth
const auth = getAuth(app);

// Log Firebase Auth initialization
console.log('Firebase Auth initialized:', auth);

// Fetch data from Google Sheets
const sheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQhx959g4-I3vnLw_DBvdkCrZaJao7EsPBJ5hHe8-v0nv724o5Qsjh19VvcB7qZW5lvYmNGm_QvclFA/pubhtml';
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
    const headers = lines[0].split(',').map(header => header.trim()); // Trim headers
    return lines.slice(1).map(line => {
        const values = line.split(',');
        return headers.reduce((obj, header, index) => {
            obj[header] = values[index].trim();
            return obj;
        }, {});
    });
}

// Display items in the app
function displayItems(items) {
    const itemList = document.getElementById('itemList');
    itemList.innerHTML = items.map(item => `
        <div class="item" data-id="${item['كود الصنف']}">
            <h3>${item['اسم الصنف']}</h3>
            <p>ID: ${item['كود الصنف']}</p>
            <p>Wholesale Price: ${item['سعر الجملة']}</p>
        </div>
    `).join('');

    // Add click event listeners to items
    document.querySelectorAll('.item').forEach(item => {
        item.addEventListener('click', () => {
            const itemId = item.getAttribute('data-id');
            const selectedItem = items.find(i => i['كود الصنف'] === itemId);
            displayItemDetails(selectedItem);
        });
    });
}

// Display item details
function displayItemDetails(item) {
    const itemList = document.getElementById('itemList');
    itemList.innerHTML = `
        <div class="item-details">
            <h2>${item['اسم الصنف']}</h2>
            <p>ID: ${item['كود الصنف']}</p>
            <img src="${item['الصورة']}" alt="${item['اسم الصنف']}" style="max-width: 100%; height: auto;">
            <p>Description: ${item['المواصفات']}</p>
            <p>Wholesale Price: ${item['سعر الجملة']}</p>
            <h3>Branch Prices:</h3>
            <ul>
                <li>الرياض: ${item['الرياض']}</li>
                <li>جدة: ${item['جدة']}</li>
                <li>الدمام: ${item['الدمام']}</li>
                <li>مكة المكرمة: ${item['مكة المكرمة']}</li>
                <li>حفر الباطن: ${item['حفر الباطن']}</li>
                <li>سكاكا: ${item['سكاكا']}</li>
                <li>المدينة المنورة: ${item['المدينة المنورة']}</li>
                <li>الجنوب: ${item['الجنوب']}</li>
                <li>فرع 11: ${item['فرع 11']}</li>
                <li>فرع 12: ${item['فرع 12']}</li>
                <li>فرع 13: ${item['فرع 13']}</li>
                <li>فرع 14: ${item['فرع 14']}</li>
                <li>فرع 15: ${item['فرع 15']}</li>
            </ul>
            <button id="backButton">Back</button>
        </div>
    `;

    // Add back button functionality
    const backButton = document.getElementById('backButton');
    if (backButton) {
        backButton.addEventListener('click', () => {
            displayItems(items);
        });
    }
}

// Search functionality
const searchButton = document.getElementById('searchButton');
if (searchButton) {
    searchButton.addEventListener('click', () => {
        const query = document.getElementById('searchBox').value.toLowerCase();
        const filteredItems = items.filter(item =>
            item['كود الصنف'].toLowerCase().includes(query) || item['اسم الصنف'].toLowerCase().includes(query)
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
