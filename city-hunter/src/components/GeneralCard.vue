<script setup>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiMagnify } from '@mdi/js';
import { defineProps } from 'vue';
import MagnifyButton from './MagnifyButton.vue'
const props = defineProps({
    title: String,
    ifMagnify: Boolean,
    magnifyAction:Function,
});
</script>

<template>
    <div class="card">
        <div class="card-top">
            <h3> {{ title }} </h3>
            <MagnifyButton  v-if="ifMagnify" @click="magnifyAction"/>
        </div>
        <div class="card-bottom">
        </div>
    </div>
</template>


<style scoped>
.card {
    border-radius: 20px 20px 0 0;
    padding: 0;
    width: 100%;
    overflow: hidden;
}

.card-top {
    border-radius: 20px 20px 0 0;
    padding: 15px;
    background-color: var(--color3);
    display: flex;
    justify-content: space-between;
    overflow: hidden;
}

.card-bottom {
    padding: 10px;
    background-color: white;
}
</style>