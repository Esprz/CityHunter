<script setup>
import { defineProps } from 'vue';
import { mdiArrowRight } from '@mdi/js'
import SvgIcon from '@jamescoyle/vue-icon';
const props = defineProps({
    title: String,
    goNext: Function,
});

</script>

<template>
    <div class="tutorial-card">
        <h2 class="tutorial-header">{{ title }}</h2>
        <div class="tutorial-next">
            <p>Let's Keey Going!</p>
            <svg-icon @click=goNext type="mdi" :path="mdiArrowRight"></svg-icon>
        </div>
    </div>
</template>


<style scoped>


</style>