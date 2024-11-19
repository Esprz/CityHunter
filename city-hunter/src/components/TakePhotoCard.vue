<script setup>
import { ref } from 'vue';
import GeneralRewardCard from "@/components/GeneralRewardCard.vue";
import { useMapUIStore } from '@/stores/mapUIStore';
import { useHuntStore } from '@/stores/huntStore';
import { useMapStore } from '@/stores/mapStore';
const task = {
    subtext: "You are here!",
    text: "Take a photo to confirm your arrival",
    buttonText: "Take photo",
    secButtonText: "Upload",
    img: "/rewards/take_photo.svg"
}

const isMobile = ref(false);

function detectDevice() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    isMobile.value = /android|iphone|ipad|mobile/i.test(userAgent);
}

function takePhoto() {
    if (isMobile.value) {
        document.getElementById('cameraInput').click();
    } else {
        alert('Your device does not support camera access. Please upload a file.');
    }
}

function uploadPhoto() {
    document.getElementById('galleryInput').click();
}


const mapUIStore = useMapUIStore()
const huntStore = useHuntStore()
const mapStore = useMapStore()

function handlePhotoSelection(event) {
    const file = event.target.files[0];
    if (file) {
        console.log('File selected:', file);
    }

    console.log('old nextstop',mapUIStore.nextStop);


    for (let i = 0; i < huntStore.huntStores.length; i++) {
        const store = huntStore.huntStores[i];
        if (store.place_id === mapUIStore.nextStop.place_id) {
            huntStore.huntStores[i].visited = true;
            mapStore.removeMarker(store.place_id);
            break;
        }        
    }

    for (let i = 0; i < huntStore.huntStores.length; i++) {
        const store = huntStore.huntStores[i];
        if (!store.visited) {
            mapUIStore.nextStop = store;
            console.log('new nextstop',mapUIStore.nextStop);
            break;
        }
    }

    mapUIStore.showArrivalTask = false;

    let cntVisited = 0;
    const storeNum = huntStore.huntStores.length;
    huntStore.huntStores.forEach((store) => {
        if (store.visited) cntVisited++;
    })
    if (cntVisited >= storeNum / 3 && !mapUIStore.alreadyOneThird) {
        mapUIStore.showOneThirdCard = true;
        mapUIStore.alreadyOneThird = true;
    }
    //if (cntVisited >= storeNum) {
    //    mapUIStore.showCompleteCard = true;
    //}
    console.log(`cntVisited:`,cntVisited);
}

detectDevice();
</script>
<template>
    <v-card class="v-card-style">
        <GeneralRewardCard :text="task.text" :subtext="task.subtext" :img="task.img" :button-text="task.buttonText"
            :buttonFunc="takePhoto" :sec-button-text="task.secButtonText" :secButtonFunc="uploadPhoto" />
        <!-- Hidden inputs for camera and gallery -->
        <input id="cameraInput" type="file" accept="image/*" capture="camera" style="display: none"
            @change="handlePhotoSelection" />
        <input id="galleryInput" type="file" accept="image/*" style="display: none" @change="handlePhotoSelection" />

    </v-card>
</template>


<style scoped>
.v-card-style{
    aspect-ratio: 2/3;
}

</style>