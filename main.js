// Initialize Google API client library
function loadGoogleAPI() {
    gapi.load("client:auth2", () => {
        gapi.client.init({
            apiKey: "AIzaSyBeEM1BCOVVIS9MNur7GsTT9NVymQSC3O0", // Optional, if needed
            clientId: "789022171426-oohp7v5so6ssupr50s3ppss0nl4cg9nm.apps.googleusercontent.com", // Replace with your OAuth Client ID
            discoveryDocs: ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
            scope: "https://www.googleapis.com/auth/spreadsheets.readonly" // Only read access
        }).then(() => {
            console.log("Google API initialized successfully");
            // Check if the user is already signed in
            const authInstance = gapi.auth2.getAuthInstance();
            if (authInstance.isSignedIn.get()) {
                const user = authInstance.currentUser.get();
                console.log('User already signed in:', user.getBasicProfile().getName());
                fetchData(); // Fetch data after sign-in
            } else {
                console.log('User not signed in.');
            }
        }).catch(error => {
            console.error("Error initializing Google API:", error);
        });
    });
}

// Sign-in user and handle the OAuth flow
function signIn() {
    const authInstance = gapi.auth2.getAuthInstance();
    authInstance.signIn().then(user => {
        console.log("Signed in as:", user.getBasicProfile().getName());
        fetchData(); // Fetch data once the user signs in
    }).catch(error => {
        console.error("Error signing in:", error);
        alert('Error signing in. Please try again.');
    });
}

// Fetch data from Google Sheets
function fetchData() {
    const sheetId = "1lxjoly4fuuRLEycqsfeRMm-uB5XdRbFkxC5JqlgtXn8"; // Replace with your actual Sheet ID
    const range = "Inventory"; // Specify the range you want to access

    gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: sheetId,
        range: range
    }).then(response => {
        console.log("Data retrieved from Google Sheets:", response.result.values);
        displayData(response.result.values); // Display data in your app
    }).catch(error => {
        console.error("Error fetching data from Google Sheets:", error);
    });
}

// Display fetched data on the page (you can customize this)
function displayData(data) {
    const dataContainer = document.getElementById("dataContainer");
    dataContainer.innerHTML = ""; // Clear existing content

    if (data.length === 0) {
        dataContainer.innerHTML = "No data found.";
    } else {
        const table = document.createElement("table");
        data.forEach(row => {
            const tr = document.createElement("tr");
            row.forEach(cell => {
                const td = document.createElement("td");
                td.textContent = cell;
                tr.appendChild(td);
            });
            table.appendChild(tr);
        });
        dataContainer.appendChild(table); // Append table to container
    }
}

// Load the Google API client library and initialize everything
function initApp() {
    loadGoogleAPI();
}

// Handle sign-out functionality (optional)
function signOut() {
    const authInstance = gapi.auth2.getAuthInstance();
    authInstance.signOut().then(() => {
        console.log("User signed out.");
    }).catch(error => {
        console.error("Error signing out:", error);
    });
}

// Add the Sign-In button in HTML
document.getElementById("signInButton").addEventListener("click", signIn);
document.getElementById("signOutButton").addEventListener("click", signOut);

// Initialize the app once the page is loaded
window.onload = initApp;
