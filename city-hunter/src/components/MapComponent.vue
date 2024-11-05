<script setup>
import { onMounted } from "vue";
import { useHuntStore } from "../stores/huntStore";
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiCircle } from '@mdi/js';

const store = useHuntStore();
let map3D = null;

// Initialize the 3D map
async function initMap3D() {
  if (!store.currentLocation) {
    console.error("Current location is not available.");
    return;
  }
  const { Map3DElement, Marker3DElement } = await google.maps.importLibrary("maps3d");
  const { PinElement } = await google.maps.importLibrary("marker");

  // Initialize the map
  map3D = new Map3DElement({
    center: {
      lat: store.currentLocation.lat,
      lng: store.currentLocation.lng,
      altitude: 0
    },
    tilt: 67.5,
    range: 300,
  });
  const container = document.querySelector(".map-container");
  container.appendChild(map3D);
  store.setMap3D(map3D);




  const parser = new DOMParser();
  const pinSvgString = '<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><g filter="url(#filter0_d_232_3051)"><path d="M20 32C20 25.3726 25.3726 20 32 20C38.6274 20 44 25.3726 44 32C44 38.6274 38.6274 44 32 44C25.3726 44 20 38.6274 20 32Z" fill="#FF7200"/><path d="M21 32C21 25.9249 25.9249 21 32 21C38.0751 21 43 25.9249 43 32C43 38.0751 38.0751 43 32 43C25.9249 43 21 38.0751 21 32Z" stroke="white" stroke-width="2"/></g><defs><filter id="filter0_d_232_3051" x="0" y="0" width="64" height="64" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feMorphology radius="10" operator="dilate" in="SourceAlpha" result="effect1_dropShadow_232_3051"/><feOffset/><feGaussianBlur stdDeviation="5"/><feComposite in2="hardAlpha" operator="out"/><feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.447059 0 0 0 0 0 0 0 0 0.3 0"/><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_232_3051"/><feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_232_3051" result="shape"/></filter></defs></svg>';

  const pinSvg =
    parser.parseFromString(pinSvgString, 'image/svg+xml').documentElement;
  const templateForSvg = document.createElement('template');
  templateForSvg.content.append(pinSvg);


  const currentMarker = new Marker3DElement({
    position: store.currentLocation,
    label: "You are here",
  });

  currentMarker.append(templateForSvg);
  map3D.append(currentMarker);

  // Add existing markers
  renderMarkers({ Marker3DElement, PinElement });

  // Add click event listener for new markers
  map3D.addEventListener("click", (event) => {
    const { latLng } = event.detail || {};
    if (latLng) {
      const newMarker = { lat: latLng.lat(), lng: latLng.lng(), altitude: 0 };
      store.addMarker(newMarker); // Add marker to the store
      renderMarkers({ Marker3DElement, PinElement }); // Re-render markers
    }
  });
}

// Render markers
function renderMarkers({ Marker3DElement, PinElement }) {
  // Clear existing markers
  map3D.innerHTML = "";

  // Add each marker to the map
  store.markers.forEach((marker) => {
    const pin = new PinElement({
      scale: 1.5,
      background: "#FBBC04",
      glyph: "📍",
    });

    const markerElement = new Marker3DElement({
      position: marker,
    });

    markerElement.append(pin);
    map3D.append(markerElement);
  });
}

async function fetchRoute(origin, destination) {
  const directionsService = new google.maps.DirectionsService();

  const request = {
    origin: origin,
    destination: destination,
    travelMode: google.maps.TravelMode.DRIVING, // 可选：DRIVING, WALKING, BICYCLING, TRANSIT
  };

  return new Promise((resolve, reject) => {
    directionsService.route(request, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        resolve(result); // 返回路线数据
      } else {
        reject("Failed to fetch route: " + status);
      }
    });
  });
}

async function init3DMapWithNavigation() {
  const { Map3DElement } = await google.maps.importLibrary("maps3d");

  // 初始化 3D Map
  const map3D = new Map3DElement({
    center: { lat: 37.7749, lng: -122.4194 },
    tilt: 67.5,
    range: 5000,
  });

  const container = document.querySelector(".map-container");
  container.appendChild(map3D);

  // 起点和终点
  const origin = { lat: 37.7749, lng: -122.4194 };
  const destination = { lat: 37.7849, lng: -122.4094 };

  // 获取导航路径
  const route = await fetchRoute(origin, destination);

  // 在 3D Map 上渲染路径
  renderRouteOn3DMap(map3D, route);
}

function animateMarker(marker, path) {
  let index = 0;

  function move() {
    if (index < path.length) {
      marker.setAttribute("position", `${path[index].lat},${path[index].lng}`);
      index++;
      setTimeout(move, 200); // 调整速度
    }
  }

  move();
}




onMounted(async () => {
  await store.fetchCurrentLocation();
  await initMap3D();
  await store.fetchStoreDetails(store.map3D);
});

</script>

<template>
  <div class="map-container"></div>
</template>

<style scoped>
.map-container {
  width: 100%;
  height: 100%;
}
</style>
