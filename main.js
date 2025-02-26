// Import Firebase modules
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";
import { app } from "./app.js"; // Import the Firebase app instance from app.js

// Initialize Firebase Auth
const auth = getAuth(app);

// Log Firebase Auth initialization
console.log('Firebase Auth initialized:', auth);

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

// Fetch Google Sheets data (replace with your Google Apps Script URL)
fetch("https://script.google.com/macros/s/AKfycbxas_S6O9k41mRpankgN3L2rL9VimcIEc898rKBrQ79fTPtrnytQMsTDHYWjL54T3gbCw/exec", {
  method: "GET",
  headers: {
    "Content-Type": "application/json"
  }
})
.then(response => response.json())
.then(data => {
  console.log("Data received:", data);
  // Update your UI with the data
})
.catch(error => console.error("Error fetching data:", error));

// Function to display the data in a table
function displayData(data) {
    const container = document.getElementById("data-container");
    container.innerHTML = ""; // Clear previous content

    const table = document.createElement("table");
    table.style.width = "100%";
    table.border = "1";

    // Create table header
    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");
    Object.keys(data[0]).forEach(header => {
        const th = document.createElement("th");
        th.textContent = header;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Create table body
    const tbody = document.createElement("tbody");
    data.forEach(row => {
        const tr = document.createElement("tr");
        Object.values(row).forEach(value => {
            const td = document.createElement("td");
            td.textContent = value;
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });
    table.appendChild(tbody);

    container.appendChild(table);
}
