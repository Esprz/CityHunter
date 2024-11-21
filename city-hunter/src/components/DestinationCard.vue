<script setup>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiMapMarker } from '@mdi/js';
import { defineProps, computed } from 'vue';
import { useMapUIStore } from "@/stores/mapUIStore";
import { useMapStore } from '@/stores/mapStore';
const mapStore = useMapStore();
const mapUIStore = useMapUIStore();
const DestinationContent = computed(() => mapUIStore.DestinationContent);
const clickEvent = () => {
    const destination = mapUIStore.nextStop;
    const marker = mapStore.markersMap.get(destination.place_id);
    const event = new Event('gmp-click');
    marker.dispatchEvent(event);
}
</script>

<template>
    <div class="destination-container" @click="clickEvent">
        <svg-icon class="magnify" type="mdi" :path=mdiMapMarker></svg-icon>
        <p> {{ DestinationContent }} </p>
    </div>

</template>


<style scoped>
.destination-container {
    display: flex;
    border-radius: 10px;
    padding: 15px;
    gap: 10px;
    width: 100%;
    overflow: hidden;
    background-color: rgba(0, 0, 0, 0.4);
    color: white;
    border: 1.5px solid #F8F8F8;
    align-items: center;
}

p {
    font-weight: 550;
    font-size: 18px;
}
</style>