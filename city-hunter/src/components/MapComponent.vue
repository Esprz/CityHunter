<script setup>
import { onMounted } from "vue";
import { useHuntStore } from "../stores/huntStore";
import { useMapStore } from "../stores/mapStore";
import { loadGoogleMapsAPI } from "@/utils/loadGoogleMapsAPI";
import { useMapUIStore } from "@/stores/mapUIStore";

const mapUIStore = useMapUIStore();
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
          avatar: store.frameAvatar,
        });

        const marker = mapStore.markersMap.get(store.place_id);
        //console.log(store.place_id);
        //console.log(mapStore.markersMap.get(store.place_id));
        if (!marker.hasListener)
          marker.addEventListener('gmp-click', (event) => {
            // TODO: Do some work here. `event.position` can be used to get coordinates of the
            // click. `event.target.position` can be used to get marker's position.
            mapUIStore.activeStoreDetails(store);
            mapUIStore.inactiveDistance();
            mapUIStore.activeDestination(store.name);
            mapStore.destination = event.position;
            mapStore.map3D.center = {
              lat: event.position.lat,
              lng: event.position.lng,
              altitude: 10
            }
            mapStore.map3D.tilt = 30;
            mapStore.map3D.range = 300;
            mapStore.drawBuildingOutlineFromCenter(event.position)          });
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
  else {
    mapStore.renderMap(container);
  }


  //console.log(document.querySelectorAll('gmp-marker-3d'))

  if (!huntStore.fetchedStoreDetails)
    await huntStore.fetchStoreDetails(mapStore.map3D);
  //console.log(document.querySelectorAll('gmp-marker-3d'))
  await huntStore.updateStoreDistances(mapStore.currentLocation);
  //console.log(document.querySelectorAll('gmp-marker-3d'))

  if (!mapStore.markersRendered)
    await renderMarkers();

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
