// Get Firebase instances
const auth = firebase.auth();
const db = firebase.firestore();

// Get DOM elements
const staffEmail = document.getElementById('staffEmail');
const logoutBtn = document.getElementById('logoutBtn');
const equipmentForm = document.getElementById('equipmentForm');
const statusTable = document.getElementById('statusTable');

// Equipment collection reference
const equipmentRef = db.collection('equipment');

// Initialize equipment if not exists
async function initializeEquipment() {
    // First, delete all existing documents
    const snapshot = await equipmentRef.get();
    const batch = db.batch();
    
    snapshot.forEach((doc) => {
        batch.delete(doc.ref);
    });
    
    await batch.commit();

    // Now add our proper equipment
    const equipment = [
        // Cardio Equipment
        { id: 'treadmill', name: 'Treadmill' },
        { id: 'elliptical', name: 'Elliptical' },
        { id: 'exercise-bike', name: 'Exercise Bike' },
        { id: 'stair-master', name: 'Stair Master' },
        { id: 'rowing-machine', name: 'Rowing Machine' },
        
        // Weight Machines
        { id: 'pec-deck', name: 'Pec Deck' },
        { id: 'leg-press', name: 'Leg Press' },
        { id: 'chest-press', name: 'Chest Press' },
        { id: 'lat-pulldown', name: 'Lat Pulldown' },
        { id: 'shoulder-press', name: 'Shoulder Press' },
        { id: 'leg-extension', name: 'Leg Extension' },
        { id: 'leg-curl', name: 'Leg Curl' },
        { id: 'cable-machine', name: 'Cable Machine' },
        
        // Free Weights Area
        { id: 'squat-rack', name: 'Squat Rack' },
        { id: 'bench-press', name: 'Bench Press' },
        { id: 'dumbbells', name: 'Dumbbells Set' },
        { id: 'olympic-platform', name: 'Olympic Platform' },
        
        // Functional Training
        { id: 'smith-machine', name: 'Smith Machine' },
        { id: 'power-rack', name: 'Power Rack' },
        { id: 'kettlebells', name: 'Kettlebells Set' },
        { id: 'battle-ropes', name: 'Battle Ropes' }
    ];

    const newBatch = db.batch();
    
    equipment.forEach((item) => {
        const docRef = equipmentRef.doc(item.id);
        newBatch.set(docRef, {
            name: item.name,
            status: 'available',
            notes: '',
            lastUpdated: firebase.firestore.FieldValue.serverTimestamp()
        });
    });

    await newBatch.commit();
    console.log('Equipment initialized successfully');
}

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

// Handle authentication
auth.onAuthStateChanged((user) => {
    if (user) {
        staffEmail.textContent = `Welcome, ${user.email}`;
        initializeEquipment(); // Initialize equipment when user logs in
    } else {
        window.location.href = 'login.html';
    }
});

// Handle logout
logoutBtn.addEventListener('click', async () => {
    try {
        await auth.signOut();
        window.location.href = 'login.html';
    } catch (error) {
        console.error('Error signing out:', error);
    }
});

// Handle equipment form submission
equipmentForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const equipment = document.getElementById('equipmentSelect').value;
    const status = document.getElementById('statusSelect').value;
    const notes = document.getElementById('notes').value;
    
    try {
        // Get the equipment name from the select element
        const equipmentName = document.getElementById('equipmentSelect').options[
            document.getElementById('equipmentSelect').selectedIndex
        ].text;

        await equipmentRef.doc(equipment).set({
            name: equipmentName,
            status: status,
            notes: notes,
            lastUpdated: firebase.firestore.FieldValue.serverTimestamp(),
            updatedBy: auth.currentUser.email
        });
        
        // Clear form
        equipmentForm.reset();
        alert('Status updated successfully!');
    } catch (error) {
        console.error('Error updating status:', error);
        alert('Error updating status. Please try again.');
    }
});

// Real-time equipment status updates
equipmentRef.onSnapshot((snapshot) => {
    statusTable.innerHTML = '';
    
    snapshot.forEach((doc) => {
        const data = doc.data();
        const row = document.createElement('tr');
        
        // Add appropriate status color
        row.classList.add(getStatusClass(data.status));
        
        row.innerHTML = `
            <td>${data.name}</td>
            <td>${data.status.charAt(0).toUpperCase() + data.status.slice(1).replace('-', ' ')}</td>
            <td>${data.lastUpdated ? new Date(data.lastUpdated.toDate()).toLocaleString() : 'N/A'}</td>
            <td>${data.notes || 'No notes'}</td>
        `;
        
        statusTable.appendChild(row);
    });
});
