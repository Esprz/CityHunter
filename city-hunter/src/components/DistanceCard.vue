<script setup>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiTimerAlertOutline, mdiDirections, mdiWalk } from '@mdi/js';
import { defineProps, computed } from 'vue';
import { useMapUIStore } from "@/stores/mapUIStore";
const mapUIStore = useMapUIStore();
const DistanceContent = computed(() => mapUIStore.DistanceContent);

import { useEventStore } from '@/stores/eventStore'

const eventStore = useEventStore();

</script>

<template>
    <div class="dist-card-container">
        <div class="dist-container">
            <span class="distance-item">
                <span class="distance-title">
                    <svg-icon type="mdi" :path=mdiDirections></svg-icon>
                    <h4>Distance</h4>
                </span>
                <p>{{ DistanceContent.distance }}</p>
            </span>

            <v-divider :thickness="1" class="border-opacity-100" vertical></v-divider>

            <span class="distance-item">
                <span class="distance-title">
                    <svg-icon type="mdi" :path=mdiWalk></svg-icon>
                    <h4>Walk Time</h4>
                </span>
                <p>{{ DistanceContent.walkTime }}</p>
            </span>
        </div>
        <div class="timer">
            <svg-icon type="mdi" :path=mdiTimerAlertOutline></svg-icon>
            <p>{{ eventStore.formattedCountdown }}</p>
        </div>
    </div>

</template>


<style scoped>
.dist-card-container {
    display: flex;
    gap: 30px;
    justify-content: space-between;
    width: 100%;
    overflow: hidden;
    color: white;
}

.dist-container {
    display: flex;
    gap: 10px;
    padding: 10px;
    width: 75%;
    justify-content: space-evenly;
    border-radius: 10px;
    background-color: rgb(0, 49, 209);
    border: 1.5px solid #738EE6;
}

.distance-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    ;
}

.distance-title {
    display: flex;
    gap: 10px;
}

.timer {
    background-color: var(--color2);
    width: 75px;
    height: 75px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    color: white;
    border-radius: 100%;
    padding: 10px;
    border: 2px solid #B35000;
}

p{
    font-weight: 550;
}

</style>