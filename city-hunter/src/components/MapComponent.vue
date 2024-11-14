<script setup>
import { onMounted } from "vue";
import { useHuntStore } from "../stores/huntStore";
import { useMapStore } from "../stores/mapStore";
import { loadGoogleMapsAPI } from "@/utils/loadGoogleMapsAPI";

const huntStore = useHuntStore();
const mapStore = useMapStore();

// Render markers
async function renderMarkers() {
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


onMounted(async () => {
  const container = document.querySelector(".map-container");
  if (!mapStore.map3D) {
    await loadGoogleMapsAPI();
    await mapStore.fetchCurrentLocation();
    await mapStore.initMap(container);
    await mapStore.renderCurrentLocation();
  }
  else{
    mapStore.renderMap(container);
  }

  if (!huntStore.fetchedStoreDetails)
    await huntStore.fetchStoreDetails(mapStore.map3D);

  await huntStore.updateStoreDistances(mapStore.currentLocation);

  if(!mapStore.markersRendered)
  await renderMarkers();
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
