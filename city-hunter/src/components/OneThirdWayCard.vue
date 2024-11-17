<script setup>
import { useMapUIStore } from '@/stores/mapUIStore';
import GeneralButton from './GeneralButton.vue';
import { ref } from 'vue';
const mapUIStore = useMapUIStore()

const thumbDark = ref(true);
const thumbColor = ref(false);
const animateImage = ref(false);

setTimeout(() => {
    thumbDark.value = false;
    thumbColor.value = true;

    setTimeout(() => {
        animateImage.value = true;
    }, 0);
}, 500);

const image = [
    "/rewards/thumb_dark.svg",
    "/rewards/thumb_color.svg",
    "/rewards/celebrate.svg",
];

const nextStop = () => {
    mapUIStore.showOneThirdCard = false;
}
</script>

<template>
    <v-card class="v-card-style">
        <div>
            <div class="general-reward-card">
                <img v-if="thumbDark" :src="image[0]" class="foreground-image" />
                <img v-if="thumbColor" :src="image[1]" class="foreground-image" />
                <img :src="image[2]" :class="['background-image', { 'image-animate': animateImage }]" />
                <p> Great job! Keep going~ </p>
                <h2> You're 1/3 of the way through your hunt!</h2>
                <GeneralButton text="Next stop" :click-event="nextStop" />
            </div>
        </div>
    </v-card>
</template>


<style scoped>
.foreground-image {
    z-index: 2;
    width: 50%;
    position: relative;
    margin: 20px auto;
    transition: all 2s ease-in-out;
}

.background-image {
    z-index: 1;
    width: 50%;
    top: 15%;
    position: absolute;
    align-items: center;
}

.image-animate {
    transform: scale(1.5);
    transition: transform 2s ease-in-out;
}

</style>