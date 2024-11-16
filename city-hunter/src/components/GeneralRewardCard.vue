<script setup>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiMagnify } from '@mdi/js';
import { defineProps } from 'vue';
import MagnifyButton from './MagnifyButton.vue'
import GeneralButton from './GeneralButton.vue';
const props = defineProps({
    subtext: String,
    text: String,
    buttonText: String,
    buttonFunc: Function ||null,
    secButtonText: String || null,
    secButtonFunc: Function || null,
    img: String,
});
</script>

<template>
    <div class="general-reward-card">
        <img :src="img" class="full-width"/>
        <p>{{ subtext }}</p>
        <h2>{{ text }}</h2>
        <GeneralButton :text="buttonText" :click-event="buttonFunc" class="full-width"/>
        <GeneralButton v-if="secButtonText" class="sec-reward-button full-width" :text="secButtonText" :click-event="secButtonFunc" />
    </div>
</template>


<style scoped>
.sec-reward-button{
    color: var(--color2);
    background-color: var(--color3);
}
.general-reward-card{
    display: flex;
    flex-direction: column;
    padding: 40px;
    gap: 10px;
    justify-content: space-evenly;
    text-align: center;
}
.full-width{
    width: 100%;
}


</style>