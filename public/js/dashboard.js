// Import Firebase modules
// Firebase auth and db are already initialized in login.html
const auth = firebase.auth();
const db = firebase.firestore();

// Get DOM elements
const staffEmail = document.getElementById('staffEmail');
const logoutBtn = document.getElementById('logoutBtn');
const equipmentForm = document.getElementById('equipmentForm');
const statusTable = document.getElementById('statusTable');

// Check authentication state
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in
        staffEmail.textContent = `Welcome, ${user.email}`;
        // Load equipment data
        loadEquipmentStatus();
    } else {
        // User is signed out, redirect to login
        window.location.href = 'login.html';
    }
});

// Handle logout
logoutBtn.addEventListener('click', async () => {
    try {
        await signOut(auth);
        window.location.href = 'login.html';
    } catch (error) {
        console.error('Error signing out:', error);
    }
});

// Load and display equipment status
function loadEquipmentStatus() {
    const equipmentRef = collection(db, 'equipment');
    
    // Real-time updates
    onSnapshot(equipmentRef, (snapshot) => {
        statusTable.innerHTML = ''; // Clear existing rows
        
        snapshot.forEach((doc) => {
            const data = doc.data();
            const row = document.createElement('tr');
            
            // Format timestamp
            const timestamp = data.lastUpdated ? data.lastUpdated.toDate() : new Date();
            const formattedTime = timestamp.toLocaleString();
            
            // Add status color
            row.className = getStatusClass(data.status);
            
            row.innerHTML = `
                <td>${data.name}</td>
                <td>${data.status}</td>
                <td>${formattedTime}</td>
                <td>${data.notes || ''}</td>
            `;
            
            statusTable.appendChild(row);
        });
    });
}

// Handle equipment status update
equipmentForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const equipment = document.getElementById('equipmentSelect').value;
    const status = document.getElementById('statusSelect').value;
    const notes = document.getElementById('notes').value;
    
    try {
        // Get equipment document
        const querySnapshot = await getDocs(collection(db, 'equipment'));
        querySnapshot.forEach(async (document) => {
            if (document.data().name.toLowerCase() === equipment) {
                // Update equipment status
                await updateDoc(doc(db, 'equipment', document.id), {
                    status: status,
                    notes: notes,
                    lastUpdated: serverTimestamp()
                });
                
                // Clear form
                equipmentForm.reset();
            }
        });
    } catch (error) {
        console.error('Error updating equipment status:', error);
    }
});

// Helper function to get status color class
function getStatusClass(status) {
    switch (status) {
        case 'available':
            return 'table-success';
        case 'in-use':
            return 'table-warning';
        case 'maintenance':
            return 'table-info';
        case 'out-of-order':
            return 'table-danger';
        default:
            return '';
    }
}
