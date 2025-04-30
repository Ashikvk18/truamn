// Get Firestore instance
const db = firebase.firestore();
const equipmentRef = db.collection('equipment');

// Equipment categories
const categories = {
    cardio: ['treadmill', 'elliptical', 'exercise-bike', 'stair-master', 'rowing-machine'],
    weights: ['pec-deck', 'leg-press', 'chest-press', 'lat-pulldown', 'shoulder-press', 'leg-extension', 'leg-curl', 'cable-machine'],
    freeWeights: ['squat-rack', 'bench-press', 'dumbbells', 'olympic-platform'],
    functional: ['smith-machine', 'power-rack', 'kettlebells', 'battle-ropes']
};

// Status counters
let statusCounts = {
    available: 0,
    'in-use': 0,
    maintenance: 0,
    'out-of-order': 0
};

// Get status color class
function getStatusClass(status) {
    switch (status) {
        case 'available':
            return 'bg-success';
        case 'in-use':
            return 'bg-warning text-dark';
        case 'maintenance':
            return 'bg-info';
        case 'out-of-order':
            return 'bg-danger';
        default:
            return '';
    }
}

// Create equipment card
function createEquipmentCard(data, id) {
    const card = document.createElement('div');
    card.className = 'card status-card mb-2';
    
    const statusClass = getStatusClass(data.status);
    const lastUpdated = data.lastUpdated ? new Date(data.lastUpdated.toDate()).toLocaleString() : 'N/A';
    
    card.innerHTML = `
        <div class="card-body p-2">
            <div class="d-flex justify-content-between align-items-center">
                <h6 class="card-title mb-0">${data.name}</h6>
                <span class="badge ${statusClass}">${data.status.charAt(0).toUpperCase() + data.status.slice(1).replace('-', ' ')}</span>
            </div>
            <small class="text-muted d-block mt-1">Last updated: ${lastUpdated}</small>
            ${data.notes ? `<small class="text-muted d-block">Notes: ${data.notes}</small>` : ''}
        </div>
    `;
    
    return card;
}

// Update status counts
function updateStatusCounts(status) {
    statusCounts[status]++;
    document.getElementById('availableCount').textContent = statusCounts['available'];
    document.getElementById('inUseCount').textContent = statusCounts['in-use'];
    document.getElementById('maintenanceCount').textContent = statusCounts['maintenance'];
    document.getElementById('outOfOrderCount').textContent = statusCounts['out-of-order'];
}

// Reset status counts
function resetStatusCounts() {
    statusCounts = {
        available: 0,
        'in-use': 0,
        maintenance: 0,
        'out-of-order': 0
    };
}

// Real-time equipment status updates
equipmentRef.onSnapshot((snapshot) => {
    // Reset containers and counts
    document.getElementById('cardioEquipment').innerHTML = '';
    document.getElementById('weightMachines').innerHTML = '';
    document.getElementById('freeWeights').innerHTML = '';
    document.getElementById('functionalTraining').innerHTML = '';
    resetStatusCounts();
    
    snapshot.forEach((doc) => {
        const data = doc.data();
        const card = createEquipmentCard(data, doc.id);
        
        // Update status counts
        updateStatusCounts(data.status);
        
        // Add card to appropriate container
        if (categories.cardio.includes(doc.id)) {
            document.getElementById('cardioEquipment').appendChild(card);
        } else if (categories.weights.includes(doc.id)) {
            document.getElementById('weightMachines').appendChild(card);
        } else if (categories.freeWeights.includes(doc.id)) {
            document.getElementById('freeWeights').appendChild(card);
        } else if (categories.functional.includes(doc.id)) {
            document.getElementById('functionalTraining').appendChild(card);
        }
    });
});
