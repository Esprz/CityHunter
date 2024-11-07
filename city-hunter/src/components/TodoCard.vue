<script setup>
import { defineProps } from 'vue';
import { mdiWalk, mdiDirections } from '@mdi/js'
import SvgIcon from '@jamescoyle/vue-icon';

const props = defineProps({
    title: String,
    distance: Number,
    time: Number
});

</script>

<template>
    <div class="todo-item-container">

        <img class="shop-image" src="https://github.com/radix-vue.png" />

        <div>
            <h2>{{ title }}</h2>
            <div class="distance">

                <span class="distance-item">
                    <svg-icon  type="mdi" :path=mdiDirections></svg-icon>
                    <p>{{ distance }} km</p>
                </span>

                <span class="distance-item">
                    <svg-icon type="mdi" :path=mdiWalk></svg-icon>
                    <p>{{ time }} min</p>
                </span>
            </div>
        </div>
    </div>
</template>


<style scoped>
.todo-item-container {
    display: flex;
}

.shop-image {
    width: 65px;
    height: 65px;
    margin-right: 20px;
    border-radius: 100%;
}

.distance {
    display: flex;
    justify-content: start;
    margin: 5px;
    color: var(--gray);
}

.distance-item {
    display: flex;
    margin-right: 10px;
}
</style>