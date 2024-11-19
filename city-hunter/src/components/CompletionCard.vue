<script setup>
import { useMapUIStore } from '@/stores/mapUIStore';
import GeneralButton from './GeneralButton.vue';
import { ref } from 'vue';
const mapUIStore = useMapUIStore()

const animateImage = ref(false);


setTimeout(() => {
    animateImage.value = true;
}, 5);

const image = [
    "/rewards/trophy_award.svg",
    "/rewards/light_and_hexagon.svg",
];

const getReward = () => {
    mapUIStore.showCompleteCard = false;
    mapUIStore.showCouponReedemCard = true;
}
</script>

<template>
    <v-card class="v-card-style">
        <div >
            <div class="image-container">
                <img :src="image[0]" class="foreground-image" :class="{ 'image-animate': animateImage }" />
                <img :src="image[1]" class="background-image" :class="{ 'background-animate': animateImage }"  />
            </div>
            <div class="general-reward-card">
                <p> Wow, congratulations!</p>
                <h2>You've outpaced 80% of participants!</h2>
                <p>Time</p>
                <h3>2:30:46</h3>
                <p>Your Footsteps</p>
                <h3>Golden Backery</h3>
                <GeneralButton text="Get my reward" :click-event="getReward" />
            </div>
        </div>
    </v-card>

</template>


<style scoped>
.image-container{
    width: 100%;
    aspect-ratio: 3 / 2;
    position: relative; 
    overflow: hidden; 
    margin: 0 auto; 
    display: flex;
    justify-content: center; 
    align-items: center; 
}
.foreground-image {
    z-index: 2;
    width: 25%;
    position: relative;
    margin: 10px auto;
    transition: all 1s ease-in-out;
}

.background-image {
    z-index: 1;
    width: 100%;
    height: 130%;
    position: absolute;
    align-items: center;
}

.image-animate {
    transform: scale(1.8);
    transition: transform 2s ease-in-out;
}

.background-animate {
    transform: scaleX(1.8);
    transition: transform 2s ease-in-out;
}

.general-reward-card {
  display: flex;
  flex-direction: column;
  padding: 40px;
  padding-top: 0;
  padding-bottom: 20px;
  gap: 10px;
  justify-content: space-evenly;
  align-items: center;
  text-align: center;
  position: relative;

  p {
    color: var(--gray);
  }

}
</style>