<script setup>
import { defineProps } from 'vue';
import { mdiArrowRightBold, mdiArrowDownBold } from '@mdi/js';
import SvgIcon from '@jamescoyle/vue-icon';

const props = defineProps({
    title: String,
    goNext: Function,
});
</script>

<template>
    <div class="tutorial-card">
        <div class="tutorial-text-container">
            <h2>{{ title }}</h2>
            <div class="tutorial-next">
                <p>Let's Keep Going!</p>
                <svg-icon @click="goNext" type="mdi" :path="mdiArrowRightBold" class="icon icon-right"></svg-icon>
                <svg-icon @click="goNext" type="mdi" :path="mdiArrowDownBold" class="icon icon-down"></svg-icon>
            </div>
        </div>
        <img class="guide-cat" src="/guide_cat.svg" alt="Guide Cat" />
    </div>
</template>

<style scoped>
.tutorial-card {
    position: absolute;
    top: 30%;
    margin: auto 0;
    max-width: 300px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    z-index: 3;
}

.tutorial-text-container {
    background-color: #f8d9e6;
    padding: 20px;
    border-radius: 20px 20px 0 20px;
    z-index: 3;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border-bottom: 5px solid var(--color2);
}


h2 {
    line-height: 1.4;
}

.tutorial-next {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: var(--color2);
    margin-top: 10px;
}

.tutorial-next p {
    margin: 0;
    font-size: 14px;
    font-weight: bold;
}


.icon {
    width: 30px;
    height: 30px;
    cursor: pointer;
    transition: transform 0.2s ease-in-out;
    color: var(--color-text);
}

.icon-down {
    display: none;
}

.svg-icon:hover {
    transform: scale(1.2);
}


.guide-cat {
    position: absolute;
    bottom: -150px;
    right: -20px;
    width: 100px;
    z-index: 3;
}
</style>
