<script setup>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiMagnify } from '@mdi/js';
</script>

<template>
    <div class="magnify-container" >
        <svg-icon class="magnify" type="mdi" :path=mdiMagnify></svg-icon>
    </div>
</template>

<style scoped>
.magnify-container {
    display: flex;
    padding: 5px;
    border-radius: 100%;
    width: 40px;
    height: 40px;
    background-color: var(--color4);
    color: var(--color2);
    justify-content: center;
    align-items: center;
}
</style>