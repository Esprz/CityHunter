<script setup>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiMapMarker } from '@mdi/js';
import { defineProps, computed } from 'vue';
import { useMapUIStore } from "@/stores/mapUIStore";
const mapUIStore = useMapUIStore();
const DestinationContent = computed(() => mapUIStore.DestinationContent);

</script>

<template>
    <div class="destination-container">
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