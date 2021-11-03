let map;
const markers = [];

function init(){
	const myOptions = {
		zoom      : 14,
		center    : { lat:42.353350,lng:-71.091525},
		mapTypeId : google.maps.MapTypeId.ROADMAP
	};
	const element = document.getElementById('map');
  	map = new google.maps.Map(element, myOptions);
  	addMarkers();
}

async function addMarkers(){
	const locations = await getBusLocations();

	locations.forEach(function(bus){
		const marker = getMarker(bus.id);		
		if (marker){
			moveMarker(marker,bus);
		}
		else{
			addMarker(bus);			
		}
	});

	console.log(new Date());
	setTimeout(addMarkers,15000);
}

async function getBusLocations(){
	const url = 'https://api-v3.mbta.com/vehicles?api_key=ca34f7b7ac8a445287cab52fb451030a&filter[route]=1&include=trip';	
	const response = await fetch(url);
	const json     = await response.json();
	return json.data;
}

function addMarker(bus){
	const icon = getIcon(bus);
	const marker = new google.maps.Marker({
	    position: {
	    	lat: bus.attributes.latitude, 
	    	lng: bus.attributes.longitude
	    },
	    map: map,
	    icon: icon,
	    id: bus.id
	});
	markers.push(marker);
}

function getIcon(bus){
	if (bus.attributes.direction_id === 0) {
		return 'red.png';
	}
	return 'blue.png';	
}

function moveMarker(marker,bus) {
	const icon = getIcon(bus);
	marker.setIcon(icon);

    marker.setPosition( {
    	lat: bus.attributes.latitude, 
    	lng: bus.attributes.longitude
	});
}

function getMarker(id){
	const marker = markers.find(function(item){
		return item.id === id;
	});
	return marker;
}

window.onload = init;