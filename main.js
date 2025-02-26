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
fetch('https://script.google.com/macros/s/AKfycbyxxp42FAt73VYqCzE1r7DiVDyscilJ8NbRi2B-SKj23aIxwnMuTGdtOQO7NIg1FwcFwQ/exec', {
    method: 'GET',
    headers: {
        'Accept': 'application/json',
    }
})
.then(response => {
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
})
.then(data => {
    console.log("Data received:", data);
})
.catch(error => {
    console.error("Error fetching data:", error);
});


// Function to display the data in a table
function displayData(data) {
    const container = document.getElementById("data-container");
    if (!container) {
      console.error("Data container not found."); // Handle missing container
      return;
    }
    container.innerHTML = ""; // Clear previous content

    // Check if data is valid and has at least one row
    if (!data || data.length === 0 || data[0].length === 0) {
        container.textContent = "No data found.";
        return;
    }
    const table = document.createElement("table");
    table.style.width = "100%";
    table.border = "1";


    // Create table header.  Use the *first* row as headers
    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");
    data[0].forEach(header => {  // Iterate over the *first* row
      const th = document.createElement("th");
      th.textContent = header;  // Use the values from the first row
      headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Create table body.  Start from the *second* row (index 1)
    const tbody = document.createElement("tbody");
    for (let i = 1; i < data.length; i++) { // Start from index 1
      const tr = document.createElement("tr");
      data[i].forEach(value => {
        const td = document.createElement("td");
        td.textContent = value;
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    }
    table.appendChild(tbody);

    container.appendChild(table);
}
