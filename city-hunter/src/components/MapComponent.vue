<script setup>
import { onMounted } from "vue";
import { useHuntStore } from "../stores/huntStore";
import { useMapStore } from "../stores/mapStore";
import { loadGoogleMapsAPI } from "@/utils/loadGoogleMapsAPI";

const huntStore = useHuntStore();
const mapStore = useMapStore();

// Render markers
async function renderMarkers() {
  if (!mapStore.map3D) return;
  await Promise.all(
    huntStore.huntStores.map(async (store) => {
      if (!store.visited) {
        await mapStore.addMarker({
          id: store.place_id,
          position: { lat: store.lat, lng: store.lng },
          label: store.name,
          avatar: store.avatar,
        });
      }
    })
  );

  mapStore.markersRendered = true;
}

// Fit bounds 
function fitBounds() {
  if (!mapStore.map3D) return;

  const bounds = {
    north: -Infinity,
    south: Infinity,
    east: -Infinity,
    west: Infinity,
  };

  huntStore.huntStores.map((store) => {
    if (!store.visited) {
      bounds.north = Math.max(bounds.north, store.lat);
      bounds.south = Math.min(bounds.south, store.lat);
      bounds.east = Math.max(bounds.east, store.lng);
      bounds.west = Math.min(bounds.west, store.lng);
    }
  })

  const center = {
    lat: (bounds.north + bounds.south) / 2,
    lng: (bounds.east + bounds.west) / 2,
    altitude: 0
  };

  const latRange = bounds.north - bounds.south;
  const lngRange = bounds.east - bounds.west;
  const maxRange = Math.max(latRange, lngRange) * 200000; // Adjust scale factor

  // Adjust Map3DElement properties
  mapStore.map3D.center = center;
  mapStore.map3D.range = maxRange; 
}

onMounted(async () => {
  const container = document.querySelector(".map-container");
  if (!mapStore.map3D) {
    await loadGoogleMapsAPI();
    await mapStore.fetchCurrentLocation();
    await mapStore.initMap(container);
    await mapStore.renderCurrentLocation();
  }
  else {
    mapStore.renderMap(container);
  }

  if (!huntStore.fetchedStoreDetails)
    await huntStore.fetchStoreDetails(mapStore.map3D);

  await huntStore.updateStoreDistances(mapStore.currentLocation);

  if (!mapStore.markersRendered)
    await renderMarkers();
  fitBounds();
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
