mapboxgl.accessToken =
    "pk.eyJ1IjoiZGV2c3lsdmEiLCJhIjoiY2wzbG1nZ2huMDJucTNrbzh0cWVkbGxvbiJ9.dMth7KKrXNCC0TucNl0Lpw";
  
const map = new mapboxgl.Map({
  container: "map", // container ID
  style: "mapbox://styles/mapbox/streets-v11", // style URL
  center: [-71.157895, 42.707741], // starting position [lng, lat]
  zoom: 9, // starting zoom
});

// Fetch stores from API
async function getStores() {
  const res = await fetch('/api/v1/stores');
  const data = await res.json();

  const stores = data.data.map(store => {
    return {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [
          store.location.coordinates[0],
          store.location.coordinates[1]
        ]
      },
      properties: {
        storeId: store.storeId,
        icon: 'shop'
      }
    };
  });

  loadMap(stores);
}

// Load map with stores
function loadMap(stores) {
  map.on('load', function() {
    map.addLayer({
      id: 'points',
      type: 'symbol',
      source: {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: stores
        }
      },
      layout: {
        'icon-image': '{icon}-15',
        'icon-size': 1.5,
        'text-field': '{storeId}',
        'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
        'text-offset': [0, 0.9],
        'text-anchor': 'top'
      }
    });
  });
}

getStores();