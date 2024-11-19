<script setup>
import { useMapUIStore } from '@/stores/mapUIStore';
import { computed, onMounted } from 'vue';
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiClose, mdiExportVariant } from '@mdi/js';
import MagnifyButton from './MagnifyButton.vue'
import GeneralButton from './GeneralButton.vue';
import { useMapStore } from '@/stores/mapStore';
import { useEventStore } from '@/stores/eventStore';


const mapUIStore = useMapUIStore();
const mapStore = useMapStore();
const eventStore = useEventStore();

const isEnrolled = computed(() => eventStore.isEnrolled);
const storeInfo = computed(() => mapUIStore.StoreDetailsContent);

//console.log(storeInfo.photos);

const getDirection = async () => {
    console.log(`Navigating to ${storeInfo.name}...`);
    mapUIStore.showTodoCard = false;
    mapUIStore.showNavBar = false;
    const element = document.querySelector('.map-background');
    if (element) {
        element.style.height = '100vh';
    }
    mapUIStore.inactiveStoreDetails();
    await mapStore.calculateAndDisplayRoute({
        lat: mapStore.destination.lat,
        lng: mapStore.destination.lng,
    });    
    
    console.log(`Arrived at ${storeInfo.name}`);
}

const maximizeDescription = () => {
    mapUIStore.expandStoreDetails = true;
    const element = document.querySelector('.bottom-sheet__content');
    if (element) {
        element.style.height = '100vh';
        element.style.transition = 'height 0.3s ease-in-out';
    }
}
const restoreWindow = () => {
    mapUIStore.expandStoreDetails = false;
    const element = document.querySelector('.bottom-sheet__content');
    if (element) {
        element.style.height = 'var(--half-expand-bottom-sheet-height)';
        element.style.transition = 'height 0.3s ease-in-out';
    }
}

onMounted(() => {
    if (!mapUIStore.expandStoreDetails) restoreWindow();
})


</script>

<template>
    <div class="store-details-card">
        <div class="store-details-header">
            <h1>{{ storeInfo.name }}</h1>
            <MagnifyButton v-if="!mapUIStore.expandStoreDetails" @click="maximizeDescription" style="background-color: var(--color3);"/>            
            <div v-else>
                <svg-icon class="store-details-icon" type="mdi" :path=mdiExportVariant></svg-icon>
                <svg-icon class="store-details-icon" type="mdi" :path=mdiClose @click="restoreWindow"></svg-icon>
            </div>
        </div>
        <p>{{ storeInfo.rating || '4.3' }} ★</p>
        <p class="description">{{ storeInfo.description }}</p>
        <div class="photo-container">
            <img v-for="(photo, index) in storeInfo.photos" :key="index"
                :class="[index < 2 ? 'full-width' : 'half-width', 'photo-common']" :src="photo" />
        </div>
    </div>
    <div class="get-direction-wrapper">
        <GeneralButton v-if="isEnrolled" class="get-direction" text="Get Directions" :click-event="getDirection" />
    </div>
</template>

<style scoped>
.get-direction-wrapper {
    position: absolute;
    bottom: 0;
    padding: 15px;
    width: 100%;
    background-color: white;
}

.get-direction {
    width: 100%;
    color: white;
}

.store-details-card {
    width: 100vw;
    padding: 20px;
}

.store-details-header {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;

    div {
        display: flex;
        gap: 10px;
    }

    .store-details-icon {
        width: 40px;
        height: 40px;
        background-color: #F5F5F5;
        border-radius: 100%;
        padding: 5px;
    }
}

.description {
    width: 100%;
}

.photo-container {
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;
    gap: 10px;
}

.photo-common {
    margin-bottom: 10px;
    border-radius: 20px;
    object-fit: cover;
}

.full-width {
    width: 100%;
    aspect-ratio: 16 / 9;
}

.half-width {
    width: calc(50% - 5px);
    aspect-ratio: 1 / 1;
}
</style>