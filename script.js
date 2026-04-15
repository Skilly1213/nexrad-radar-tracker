// script.js

// Initialize the map
const map = L.map('map').setView([37.7749, -122.4194], 5); // Example coordinates

// Add a tile layer (e.g., OpenStreetMap)
// You can replace this with any tile provider you prefer.
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

// Function to fetch NEXRAD radar data
async function fetchRadarData() {
    const response = await fetch('https://api.nexrad-data.com/v1/fetch');
    const data = await response.json();
    return data;
}

// Function to update the radar display on the map
async function updateRadar() {
    const radarData = await fetchRadarData();
    // Process and visualize radar data
    radarData.forEach((storm) => {
        // Example: Adding markers for storm locations
        L.marker([storm.latitude, storm.longitude]).addTo(map)
            .bindPopup(storm.description);
    });
}

// Set up controls to update radar data
document.getElementById('updateRadarButton').addEventListener('click', updateRadar);

// Initial call to load radar data
updateRadar();