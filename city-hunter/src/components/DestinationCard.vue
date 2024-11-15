<script setup>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiMagnify } from '@mdi/js';
import { defineProps, computed } from 'vue';
import { useMapUIStore } from "@/stores/mapUIStore";
const mapUIStore = useMapUIStore();
const DestinationContent = computed(() => mapUIStore.DestinationContent);

</script>

<template>
    <div class="destination-container">
        <svg-icon class="magnify" type="mdi" :path=mdiMagnify></svg-icon>
        <p> To {{ DestinationContent }} </p>
    </div>

</template>


<style scoped>
.destination-container {
    display: flex;
    border-radius: 10px;
    padding: 20px;
    gap: 10px;
    width: 100%;
    overflow: hidden;
    background-color: rgba(0, 0, 0, 0.3);
    color: white;
}
</style>