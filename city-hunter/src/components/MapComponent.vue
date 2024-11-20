<script setup>
import { onMounted } from "vue";
import { loadGoogleMapsAPI } from "@/utils/loadGoogleMapsAPI";
import { useHuntStore } from "../stores/huntStore";
import { useMapStore } from "../stores/mapStore";
import { useMapUIStore } from "@/stores/mapUIStore";

const mapUIStore = useMapUIStore();
const huntStore = useHuntStore();
const mapStore = useMapStore();

onMounted(async () => {
  const container = document.querySelector(".map-container");
  if (!mapStore.map3D) {
    await loadGoogleMapsAPI();
    await mapStore.fetchCurrentLocation();
    await mapStore.initMap(container);
    //await mapStore.renderCurrentLocation();
  }
  else {
    mapStore.renderMap(container);
  }


  //console.log(document.querySelectorAll('gmp-marker-3d'))

  if (!huntStore.fetchedStoreDetails)
    await huntStore.fetchStoreDetails(mapStore.map3D);
  //console.log(document.querySelectorAll('gmp-marker-3d'))
  await huntStore.updateStoreDistances(mapStore.currentLocation);
  //console.log(document.querySelectorAll('gmp-marker-3d'))

  // if (!mapStore.markersRendered)
  // await renderMarkers();

  //console.log(document.querySelectorAll('gmp-marker-3d'))
  mapStore.fitBounds();
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
