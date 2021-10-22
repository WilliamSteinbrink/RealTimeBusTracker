mapboxgl.accessToken = 'pk.eyJ1Ijoid2lsbGlhbWZzIiwiYSI6ImNrdXg0NGI0aDZvajQyd256Z3B3d3J2MGMifQ.JC2y6d1Og9p7Tpq6KMAWjw';

const markers = [];

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-71.101,42.358],
    zoom: 14
})

function newMarker (bus) {
	const marker = new mapboxgl.Marker()
		.setLngLat([bus.attributes.latitude, bus.attributes.longitude])
		.addTo(map);
	markers.push(marker);
}

async function run(){
    // get bus data    
	const locations = await getBusLocations();
	console.log(new Date());
	console.log(locations);

	// timer
	setTimeout(run, 15000);
}

// Request bus data from MBTA
async function getBusLocations(){
	const url = 'https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip';
	const response = await fetch(url);
	const json     = await response.json();
	return json.data;
}

run();